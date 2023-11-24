var retrievedObject = localStorage.getItem('W9ChartData')
var retrievedObject2 = localStorage.getItem('W9Operations')

console.log('retrievedObject: ', JSON.parse(retrievedObject))
console.log('retrievedObject2: ', JSON.parse(retrievedObject2))

var widgetData = JSON.parse(retrievedObject)
console.log('widgetData>', widgetData)
var chartDataBox = JSON.parse(retrievedObject2).data
var chartOperations = JSON.parse(retrievedObject2).operations

console.log(
  'retrievedObject??: ',
  JSON.parse(chartDataBox).columns,
  JSON.parse(chartOperations).xColumn
)
var columns = JSON.parse(chartDataBox).columns
var colX = JSON.parse(chartOperations).xColumn
var colY = JSON.parse(chartOperations).yColumn
var colZ = JSON.parse(chartOperations).zColumn

var xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
var yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]

// Define Data
var data = widgetData

// Define Layout
var layout = {
  xaxis: { title: columns[colX] },
  yaxis: { title: columns[colY] }
  //   title: 'House Prices vs. Size'
}

// Display using Plotly
Plotly.newPlot('myPlot9', data, layout)
