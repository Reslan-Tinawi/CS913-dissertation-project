// Load Spain boundaries (level 0) from FAO/GAUL
var spain = ee.FeatureCollection("FAO/GAUL/2015/level0")
  .filter(ee.Filter.eq('ADM0_NAME', 'Spain'));

// Define the MOD13Q1.061 NDVI and EVI dataset.
var startDate = ee.Date('1998-01-01');
var endDate = ee.Date('2022-12-31');
var dataset = ee.ImageCollection('MODIS/061/MOD13Q1')
    .filter(ee.Filter.date(startDate, endDate));

// Function to prepare monthly data
var prepareMonthlyData = function(image) {
  var ndvi = image.select('NDVI').multiply(0.0001).rename('NDVI');
  var evi = image.select('EVI').multiply(0.0001).rename('EVI');
  
  return image.addBands(ndvi).addBands(evi)
    .set('date', ee.Date(image.get('system:time_start')).format('yyyy-MM-dd'));
};

var monthlyData = dataset.map(prepareMonthlyData);

// Function to compute zonal statistics for each province
var zonalstats = function (image, regions) {
    var date = ee.Date(image.get('date'));
    var scale = 250; // MOD13Q1 has a 250m resolution
    var mean = image.reduceRegions({
        collection: regions, 
        reducer: ee.Reducer.mean(),
        scale: scale
    });
    
    // Select and rename required properties
    return mean.map(function(feature) {
      return ee.Feature(null, {
        'community': feature.get('community'),
        'province': feature.get('province'),
        'NDVI': feature.get('NDVI'),
        'EVI': feature.get('EVI'),
        'date': date
      });
    });
};

// Perform zonal statistics for each month
var monthlyStats = monthlyData.map(function(image) {
  return zonalstats(image, spain_provinces);
}).flatten();

// Select only the necessary properties for export
var columnsToExport = ['community', 'province', 'NDVI', 'EVI', 'date'];
var finalStats = monthlyStats.select(columnsToExport);

// Export results
Export.table.toDrive({
    collection: finalStats,
    description: "SpainVegetationIndicesMonthly",
    fileNamePrefix: "SpainVegetationIndicesMonthly",
    fileFormat: 'CSV'
});

// Visualize the result for the last image in the collection
var lastImage = ee.Image(monthlyData.sort('system:time_start', false).first());
Map.centerObject(spain, 6);
Map.addLayer(lastImage.select('NDVI').clip(spain), 
  {min: 0, max: 1, palette: ['white', 'green']}, 
  'Last Month NDVI');

// Add provinces to the map
Map.addLayer(spain_provinces, {color: 'black'}, 'Provinces');

// Print total number of features and date range
print('Total number of provinces:', spain_provinces.size());
print('Date range:', startDate.format('yyyy-MM-dd').getInfo(), 
      'to', endDate.format('yyyy-MM-dd').getInfo());
