import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
var traces = []
export default function AnimatingwithaSliderBlock (props) {
  const removeStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
    color: 'white'
  }

  const [text, setText] = useState(false)
  const [annotations, setAnnotations] = useState([])

  useEffect(() => {
    annotations2 = []
    setAnnotations([])
  }, [props.chartSubType])

  useEffect(() => {
    // console.log('www?',props.existingWidget,props.addedAnnotations)
    if (props.annotedChartType === props.chartSubType) {
      annotations2 = props.addedAnnotations
      setAnnotations(props.addedAnnotations)
    }
  }, [props.existingWidget])

  const annotate = e => {
    if (props.operationIndex2 != 18) return

    var annote = {}
    annote.x = e.points[0].x
    annote.y = e.points[0].y
    annote.xref = 'x'
    annote.yref = 'y'
    annote.text = props.annotation
    annote.showarrow = true
    annote.arrowhead = 7
    annote.ax = 0
    annote.ay = -40

    annotations2.push({ ...annote })
    setAnnotations(annotations2)
    setText(!text)
  }

  var frames = []
  var sliderSteps = []
  useEffect(() => {
    console.log('Hit this')
    get()
  }, [])

  const get = () => {
    // for (var i = 0; i < props.x; i++) {
    //   frames.push(
    //     //    name: years[i],
    //     props.x[i]
    //   )
    // }

    // for (var i = 0; i < props.x; i++) {
    //   sliderSteps.push({
    //     method: 'animate',
    //     label: props.x[i],
    //     args: [
    //       null,
    //       {
    //         mode: 'immediate',
    //         transition: { duration: 300 },
    //         frame: { duration: 300, redraw: false }
    //       }
    //     ]
    //   })
    // }
    // Go through each row, get the right trace, and append the data:

    //   var lookup = {}
    //   function getData (year, continent) {
    //     var byYear, trace
    //     if (!(byYear = lookup[year])) {
    //       byYear = lookup[year] = {}
    //     }
    //     // If a container for this year + continent doesn't exist yet,
    //     // then create one:
    //     if (!(trace = byYear[continent])) {
    //       trace = byYear[continent] = {
    //         x: [],
    //         y: [],
    //         id: [],
    //         text: [],
    //         marker: { size: [] }
    //       }
    //     }
    //     return trace
    //   }

    //   props.data.map((e, i) => {
    //     console.log('??', e[1])

    //     var trace = getData(e[1], e[2])
    //     trace.text.push(e[1])
    //     trace.id.push(e[1])
    //     trace.x.push(e[1])
    //     trace.y.push(e[2])
    //     trace.marker.size.push(e[2])
    //   })

    //   // Get the group names:
    //   // var years = Object.keys(lookup)
    //   // // In this case, every year includes every continent, so we
    //   // // can just infer the continents from the *first* year:
    //   // var firstYear = lookup[years[0]]
    //   // var continents = Object.keys(firstYear)

    //   for (var i = 0; i < continents.length; i++) {
    //     var data = firstYear[continents[i]]
    //     // One small note. We're creating a single trace here, to which
    //     // the frames will pass data for the different years. It's
    //     // subtle, but to avoid data reference problems, we'll slice
    //     // the arrays to ensure we never write any new data into our
    //     // lookup table:
    //     traces.push({
    //       name: continents[i],
    //       x: data.x.slice(),
    //       y: data.y.slice(),
    //       id: data.id.slice(),
    //       text: data.text.slice(),
    //       mode: 'markers',
    //       marker: {
    //         size: data.marker.size.slice(),
    //         sizemode: 'area',
    //         sizeref: 200000
    //       }
    //     })
    //   }

    //   console.log('traces?', traces)
    //   // Create a frame for each year. Frames are effectively just
    //   // traces, except they don't need to contain the *full* trace
    //   // definition (for example, appearance). The frames just need
    //   // the parts the traces that change (here, the data).
    //   var frames = []
    //   for (i = 0; i < props.x.length; i++) {
    //     frames.push({
    //       name: props.x[i],
    //       data: props.x.map(function () {
    //         return getData(props.x[i], props.y[i])
    //       })
    //     })
    //   }
    //   console.log('frames?', frames)
    //   // Now create slider steps, one for each frame. The slider
    //   // executes a plotly.js API command (here, Plotly.animate).
    //   // In this example, we'll animate to one of the named frames
    //   // created in the above loop.
    //   var sliderSteps = []
    //   for (var i = 0; i < props.x.length; i++) {
    //     sliderSteps.push({
    //       method: 'animate',
    //       label: props.x[i],
    //       args: [
    //         props.x[i],
    //         {
    //           mode: 'immediate',
    //           transition: { duration: 300 },
    //           frame: { duration: 300, redraw: false }
    //         }
    //       ]
    //     })
    //   }

    var lookup = {}
    function getData (year, continent) {
      var byYear, trace
      if (!(byYear = lookup[year])) {
        byYear = lookup[year] = {}
      }
      // If a container for this year + continent doesn't exist yet,
      // then create one:
      if (!(trace = byYear[continent])) {
        trace = byYear[continent] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: { size: [] }
        }
      }
      return trace
    }

    // Go through each row, get the right trace, and append the data:
    for (var i = 1; i < props.data.length; i++) {
      var datum = props.data[i]
      // console.log('See?', datum)
      var trace = getData(datum[0], datum[1])
      trace.text.push(datum[0])
      trace.id.push(datum[0])
      trace.x.push(datum[0])
      trace.y.push(datum[1])
      trace.marker.size.push(datum[1])
    }

    // Get the group names:
    var years = Object.keys(lookup)
    // In this case, every year includes every continent, so we
    // can just infer the continents from the *first* year:
    var firstYear = lookup[years[0]]
    var continents = Object.keys(firstYear)

    // Create the main traces, one for each continent:
    var traces = []
    for (i = 0; i < continents.length; i++) {
      var data = firstYear[continents[i]]
      // One small note. We're creating a single trace here, to which
      // the frames will pass data for the different years. It's
      // subtle, but to avoid data reference problems, we'll slice
      // the arrays to ensure we never write any new data into our
      // lookup table:
      traces.push({
        name: continents[i],
        x: data.x.slice(),
        y: data.y.slice(),
        id: data.id.slice(),
        text: data.text.slice(),
        mode: 'markers',
        marker: {
          size: data.marker.size.slice(),
          sizemode: 'area',
          sizeref: 200000
        }
      })
    }

    // Create a frame for each year. Frames are effectively just
    // traces, except they don't need to contain the *full* trace
    // definition (for example, appearance). The frames just need
    // the parts the traces that change (here, the data).
    var frames = []
    for (i = 0; i < years.length; i++) {
      frames.push({
        name: years[i],
        data: continents.map(function (continent) {
          return getData(years[i], continent)
        })
      })
    }

    // Now create slider steps, one for each frame. The slider
    // executes a plotly.js API command (here, Plotly.animate).
    // In this example, we'll animate to one of the named frames
    // created in the above loop.
    var sliderSteps = []
    for (var i = 0; i < 50; i++) {
      sliderSteps.push({
        method: 'animate',
        label: i,
        args: [
          i,
          {
            mode: 'immediate',
            transition: { duration: 300 },
            frame: { duration: 300, redraw: false }
          }
        ]
      })
      console.log('oh..', sliderSteps)
    }
  }

  console.log('sliders', sliderSteps)
  var layout = {
    width: props.main === true ? 880 : 300,
    height: props.main === true ? 570 : 280,
    margin: props.main === true ? { l: 190 } : null,
    // xaxis: {
    //   title: 'Life Expectancy',
    //   range: [30, 85]
    // },
    // yaxis: {
    //   title: 'GDP per Capita',
    //   type: 'log'
    // },
    hovermode: 'closest',
    // We'll use updatemenus (whose functionality includes menus as
    // well as buttons) to create a play button and a pause button.
    // The play button works by passing `null`, which indicates that
    // Plotly should animate all frames. The pause button works by
    // passing `[null]`, which indicates we'd like to interrupt any
    // currently running animations with a new list of frames. Here
    // The new list of frames is empty, so it halts the animation.
    updatemenus: [
      {
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: { t: 87, r: 10 },
        buttons: [
          {
            method: 'animate',
            args: [
              null,
              {
                mode: 'immediate',
                fromcurrent: true,
                transition: { duration: 300 },
                frame: { duration: 500, redraw: false }
              }
            ],
            label: 'Play'
          },
          {
            method: 'animate',
            args: [
              [null],
              {
                mode: 'immediate',
                transition: { duration: 0 },
                frame: { duration: 0, redraw: false }
              }
            ],
            label: 'Pause'
          }
        ]
      }
    ],
    // Finally, add the slider and use `pad` to position it
    // nicely next to the buttons.
    sliders: [
      {
        pad: { l: 130, t: 55 },
        currentvalue: {
          visible: true,
          //  prefix: 'Year:',
          xanchor: 'right',
          font: { size: 20, color: '#666' }
        },
        steps: sliderSteps
      }
    ]
  }

  var myArray, unique
  var t1 = []
  var obj = {}
  const [u1, setU1] = useState()
  // const [traces, setTraces] = useState()
  var traceBox = [
    {
      x: props.x,
      y: props.y,
      marker: {
        color: props.color1
      }
    }
  ]
  var c1 = [],
    c2 = [],
    c3 = [],
    c4 = [],
    c5 = [],
    c6 = [],
    c7 = [],
    c8 = [],
    c9 = [],
    c10 = [],
    c11 = [],
    c12 = [],
    c13 = [],
    c14 = [],
    c15 = [],
    c16 = [],
    c17 = [],
    c18 = [],
    c19 = [],
    c20 = []

  useEffect(() => {
    myArray = props.z
    if (myArray) {
      unique = myArray.filter((v, i, a) => a.indexOf(v) === i)
      console.log('unique', unique)
      setU1(unique)
    }
  }, [props.z])

  const getSelectedColumnData = column => {
    let cValues =
      column == 0
        ? c1
        : column == 1
        ? c2
        : column == 2
        ? c3
        : column == 3
        ? c4
        : column == 4
        ? c5
        : column == 5
        ? c6
        : column == 6
        ? c7
        : column == 7
        ? c8
        : column == 8
        ? c9
        : column == 9
        ? c10
        : column == 10
        ? c11
        : column == 11
        ? c12
        : column == 12
        ? c13
        : column == 13
        ? c14
        : column == 14
        ? c15
        : column == 15
        ? c16
        : column == 16
        ? c17
        : column == 17
        ? c18
        : column == 18
        ? c19
        : column == 19
        ? c20
        : null
    return cValues
  }

  const addTraces = () => {
    u1.map((e, i) => {
      ;(c1 = []),
        (c2 = []),
        (c3 = []),
        (c4 = []),
        (c5 = []),
        (c6 = []),
        (c7 = []),
        (c8 = []),
        (c9 = []),
        (c10 = []),
        (c11 = []),
        (c12 = []),
        (c13 = []),
        (c14 = []),
        (c15 = []),
        (c16 = []),
        (c17 = []),
        (c18 = []),
        (c19 = []),
        (c20 = [])
      let tx = props.data.filter((item, index) => item.includes(e))
      //  console.log('tx', tx)
      tx.map(e => {
        if (e[0]) c1.push(e[0])
        if (e[1]) c2.push(e[1])
        if (e[2]) c3.push(e[2])
        if (e[3]) c4.push(e[3])
        if (e[4]) c5.push(e[4])
        if (e[5]) c6.push(e[5])
        if (e[6]) c7.push(e[6])
        if (e[7]) c8.push(e[7])
        if (e[8]) c9.push(e[8])
        if (e[9]) c10.push(e[9])
        if (e[10]) c11.push(e[10])
        if (e[11]) c12.push(e[11])
        if (e[12]) c13.push(e[12])
        if (e[13]) c14.push(e[13])
        if (e[14]) c15.push(e[14])
        if (e[15]) c16.push(e[15])
        if (e[16]) c17.push(e[16])
        if (e[17]) c18.push(e[17])
        if (e[18]) c19.push(e[18])
        if (e[19]) c20.push(e[19])
        return e
      })

      let x1 = getSelectedColumnData(props.columnX)
      let y1 = getSelectedColumnData(props.columnY)
      let z1 = getSelectedColumnData(props.columnZ)
      //console.log('CHCHC', c2)
      ;(obj = {
        x: x1,
        y: y1,
        type: 'scatter',
        mode: 'markers',
        name: e
        // marker: { color: z1 }
      }),
        t1.push(obj)
    })
    //console.log('t1', t1)
    // setTraces(t1)
  }
  useEffect(() => {
    if (u1) addTraces()
  }, [props.z && props.useLegend == true && u1])

  useEffect(() => {
    onTrigger()
  }, [props.color1 || props.color2])

  const onTrigger = event => {
    // traceBox.push(trace_1)
    // traceBox.push(trace_2)
    if (props.parentCallback) props.parentCallback(traceBox)
  }

  useEffect(() => {
    //  console.log('added??', annotations)
    if (props.getAnnotations) props.getAnnotations(annotations)
  }, [text])

  return props.block ? (
    <>
      <Handle
        type='target'
        position='left'
        id='a'
        isValidConnection={connection => connection.source === '1'}
        onConnect={params => console.log('handle onConnect', params)}
        style={
          props.data
            ? {
                left: '-10px',
                top: '51%',
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: '300px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
            : {
                left: '-10px',
                top: '53%',
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: '112px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
        }
      ></Handle>
      {props.close == 1 && (
        <span className='remove' style={removeStyle} onClick={props.setNodeDsp}>
          x
        </span>
      )}
      <div
        style={
          props.data
            ? {
                background: configData.NODE_COLORS.BODY,
                color: '#FFF',
                height: '300px',
                width: '300px',
                margin: 10
              }
            : {
                background: '#e8aa7c',
                color: '#FFF',
                height: '110px',
                width: '220px',
                margin: 10
              }
        }
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Animating with a Slider
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: 'hidden', height: 300 }}>
            <Plot
              style={{ marginTop: -75 }}
              data={[
                {
                  type: 'scatter',
                  x: props.x,
                  y: props.y,
                  mode: 'markers',
                  transforms: [
                    {
                      type: 'filter',
                      target: 'y',
                      operation: '>',
                      value: 4
                    }
                  ]
                }
              ]}
              layout={{ width: 300, height: 290 }}
              config={{
                displaylogo: false,
                displayModeBar: true
              }}
            />
          </div>
        </div>
      </div>

      <Handle
        type='source'
        position='right'
        id='a'
        style={
          props.data
            ? {
                right: '-10px',
                top: '51%',
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: '300px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
            : {
                right: '-10px',
                top: '53%',
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: '112px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
        }
      ></Handle>
    </>
  ) : (
    <div>
      <Plot
        divId='graph5'
        style={
          props.main === true
            ? { marginTop: 65, marginLeft: -20 }
            : { marginTop: -75 }
        }
        frames={frames}
        data={[
          {
            x: props.x,
            y: props.y,
            marker: {
              color: props.color1
            }
          }
        ]}
        layout={layout}
        config={{
          displaylogo: false,
          displayModeBar: true,
          showSendToCloud: true
        }}
      />
    </div>
  )
}
