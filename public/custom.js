unlayer.registerTool({
  name: 'my_tool',
  label: 'Widget',
  icon: 'fa-object-group',
  usageLimit: 10,
  supportedDisplayModes: ['web', 'email'],
  options: {},
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render (values) {
        return `<html> <body> hi</body></html>`
      }
    }),
    exporters: {
      web: function (values) {
        return `<html> <head>  <script src='https://cdn.plot.ly/plotly-2.14.0.min.js'></script> </head>  <body> <div id='myDiv'></div> <script> var trace1 = { x: [1, 2, 3, 4, 5], y: [1, 6, 3, 6, 1], type: 'line', name: 'Team A', text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'], marker: { size: 12 } }; var trace2 = { x: [1.5, 2.5, 3.5, 4.5, 5.5], y: [4, 1, 7, 1, 4], mode: 'markers', type: 'scatter', name: 'Team B', text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'], marker: { size: 12 } }; var data = [ trace1, trace2 ]; var layout = { xaxis: { range: [ 0.75, 5.25 ] }, yaxis: { range: [0, 8] }, title:'Data Labels Hover' }; Plotly.newPlot('myDiv', data, layout); </script> </body></html>`
      },
      email: function (values) {
        return `<html> <head>  <script src='https://cdn.plot.ly/plotly-2.14.0.min.js'></script> </head>  <body> <div id='myDiv'></div> <script> var trace1 = { x: [1, 2, 3, 4, 5], y: [1, 6, 3, 6, 1], type: 'line', name: 'Team A', text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'], marker: { size: 12 } }; var trace2 = { x: [1.5, 2.5, 3.5, 4.5, 5.5], y: [4, 1, 7, 1, 4], mode: 'markers', type: 'scatter', name: 'Team B', text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'], marker: { size: 12 } }; var data = [ trace1, trace2 ]; var layout = { xaxis: { range: [ 0.75, 5.25 ] }, yaxis: { range: [0, 8] }, title:'Data Labels Hover' }; Plotly.newPlot('myDiv', data, layout); </script> </body></html>`
      }
    },
    head: { css: function (values) {}, js: function (values) {} }
  }
})
