// Load Spain country boundary
var spain_boundary = ee.FeatureCollection("FAO/GAUL/2015/level0")
    .filter(ee.Filter.eq('ADM0_NAME', 'Spain'));

// Load Spain admin level 2 boundaries
var spain_admin_2 = ee.FeatureCollection("FAO/GAUL/2015/level2")
    .filter(ee.Filter.eq('ADM0_NAME', 'Spain'));

// Load the TerraClimate ImageCollection for the extended date range and filter it by the Spain boundary
var terraClimateImageCollection = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
    .filterDate('2000-01-01', '2023-12-31')
    .filterBounds(spain_boundary);

// Select the 'pr' band for precipitation data
var precipitation = terraClimateImageCollection.select('pr');

// Reduce the Image Collection by region (Admin level 2) using mean reducer
var regionalMeans = precipitation.map(function (image) {
    var date = image.date().format('YYYY-MM-dd');
    return image.reduceRegions({
        collection: spain_admin_2,
        reducer: ee.Reducer.mean(),
        scale: 5000  // Adjust the scale according to the resolution of the data and the needed accuracy
    }).map(function (feature) {
        return feature
            .set('date', date)
            .set('province_name', feature.get('ADM2_NAME'))
            .set('average_precipitation', feature.get('mean'));
    });
}).flatten(); // Flatten to get a simple FeatureCollection

// Print the results
// print('Regional means of Precipitation:', regionalMeans);

// Optionally, export the data
Export.table.toDrive({
    collection: regionalMeans,
    description: 'ExtendedMonthlyPrecipitationByProvince',
    fileFormat: 'CSV',
    selectors: ['date', 'province_name', 'average_precipitation'] // Only export these columns
});

// Add a visual representation of the Precipitation for verification
Map.addLayer(precipitation.first(), { min: 0, max: 200, palette: ['blue', 'lime', 'yellow'] }, 'Precipitation January 2000');
Map.centerObject(spain_boundary, 6); // Adjust zoom level as necessary


// second part

var spain = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017")
    .filter(ee.Filter.eq('country_na', 'Spain'));

var spain_admin_2 = ee.FeatureCollection("FAO/GAUL/2015/level2")
    .filter(ee.Filter.eq('ADM0_NAME', 'Spain'));

var dataset = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
    .filterDate('2000-01-01', '2023-12-31')
    .filterBounds(spain);

var waterBalance = dataset.map(function (image) {
    var pr = image.select('pr'); // Precipitation
    var pet = image.select('pet'); // Potential evapotranspiration
    var wb = pr.subtract(pet); // Water balance
    return image.addBands(wb.rename('wb')).clip(spain);
});

var monthlyWB = waterBalance.map(function (image) {
    return image.select('wb').reduceRegions({
        collection: spain_admin_2,
        reducer: ee.Reducer.mean(),
        scale: 5000
    }).map(function (feature) {
        return feature.set('date', image.date().format('YYYY-MM-dd'))
            .set('province_name', feature.get('ADM2_NAME'))
            .set('mean', feature.get('mean'));
    });
}).flatten();

Export.table.toDrive({
    collection: monthlyWB,
    description: 'Spain_Avg_Water_Balance',
    fileFormat: 'CSV',
    selectors: ['date', 'province_name', 'mean'] // Ensure these are the columns you export
});
