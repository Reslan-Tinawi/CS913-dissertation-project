// Load Spain boundaries (level 0) from FAO/GAUL
var spain = ee.FeatureCollection("FAO/GAUL/2015/level0")
    .filter(ee.Filter.eq('ADM0_NAME', 'Spain'));

// Load TerraClimate dataset
var startDate = ee.Date('1998-01-01');
var endDate = ee.Date('2023-12-31');
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
    .filter(ee.Filter.date(startDate, endDate));

// Function to prepare monthly data
var prepareMonthlyData = function (image) {
    // Convert temperature from tenths of degrees Celsius to degrees Celsius
    var tmmnCelsius = image.select('tmmn').multiply(0.1).rename('tmmn');
    var tmmxCelsius = image.select('tmmx').multiply(0.1).rename('tmmx');

    return image.select(['pr', 'pet', 'aet', 'soil'])
        .addBands(tmmnCelsius)
        .addBands(tmmxCelsius)
        .set('date', ee.Date(image.get('system:time_start')).format('yyyy-MM-dd'));
};

var monthlyData = dataset.map(prepareMonthlyData);

var zonalstats = function (image, regions) {
    var date = ee.Date(image.get('date'));
    var scale = image.projection().nominalScale();
    var mean = image.reduceRegions({
        collection: regions,
        reducer: ee.Reducer.mean(),
        scale: scale
    });

    // Select and rename required properties
    return mean.map(function (feature) {
        return ee.Feature(null, {
            'community': feature.get('community'),
            'province': feature.get('province'),
            'precipitation': feature.get('pr'),
            'potential_evapotranspiration': feature.get('pet'),
            'actual_evapotranspiration': feature.get('aet'),
            'soil_moisture': feature.get('soil'),
            'min_temperature': feature.get('tmmn'),
            'max_temperature': feature.get('tmmx'),
            'date': date
        });
    });
};

// Perform zonal statistics for each month
var monthlyStats = monthlyData.map(function (image) {
    return zonalstats(image, provinces);
}).flatten();

// Select only the necessary properties for export
var columnsToExport = ['community', 'province', 'precipitation', 'potential_evapotranspiration', 'actual_evapotranspiration', 'soil_moisture', 'min_temperature', 'max_temperature', 'date'];
var finalStats = monthlyStats.select(columnsToExport);

// Export results
Export.table.toDrive({
    collection: finalStats,
    description: "SpainClimateDataMonthly",
    fileNamePrefix: "SpainClimateDataMonthly",
    fileFormat: 'CSV'
});

// Visualize the result for the last image in the collection
var lastImage = ee.Image(monthlyData.sort('system:time_start', false).first());
Map.centerObject(spain, 6);
Map.addLayer(lastImage.select('pr').clip(spain),
    { min: 0, max: 100, palette: ['white', 'blue'] },
    'Last Month Precipitation');

// Add provinces to the map
Map.addLayer(provinces, { color: 'black' }, 'Provinces');

// Print total number of features and date range
print('Total number of provinces:', provinces.size());
print('Date range:', startDate.format('yyyy-MM-dd').getInfo(),
    'to', endDate.format('yyyy-MM-dd').getInfo());
