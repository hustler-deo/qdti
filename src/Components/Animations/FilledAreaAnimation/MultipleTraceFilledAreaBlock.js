import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function MultipleTraceFilledAreaBlock (props) {
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
    annotations2=[]
    setAnnotations([])
  }, [props.chartSubType])

  useEffect(() => {
    // console.log('www?',props.existingWidget,props.addedAnnotations)
    if(props.annotedChartType === props.chartSubType){
    annotations2=props.addedAnnotations
    setAnnotations(props.addedAnnotations)
    }
 
  }, [props.existingWidget])

   const annotate = e => {
  if(props.operationIndex2 != 18)
    return
    
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
  // function unpack (rows, key) {
  //   return rows.map(function (row) {
  //     return row[key]
  //   })
  // }
  const [node1, setNode1] = useState(false)
  var trace1, trace2, data
  var frames = []
  // var x = props.x
  // var y = props.y
  // var x2 = props.x
  // var y2 = props.y
  const get = () => {
    // var x = unpack(props.data, 'Date')
    // var y = unpack(props.data, 'AAPL.High')
    // var x2 = unpack(props.data, 'Date')
    // var y2 = unpack(props.data, 'AAPL.Low')
    // console.log('KKK', props.x)
    var n = 100
    for (var i = 0; i < n; i++) {
      frames[i] = {
        data: [
          { x: [], y: [] },
          { x: [], y: [] }
        ]
      }
      frames[i].data[1].x = props.x.slice(0, i + 1)
      frames[i].data[1].y = props.y.slice(0, i + 1)
      frames[i].data[0].x = props.x.slice(0, i + 1)
      frames[i].data[0].y = props.y.slice(0, i + 1)
    }

    trace2 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Color1',
      fill: 'tonexty',
      x: frames[5].data[1].x,
      y: frames[5].data[1].y,
      line: { color: props.color1 ? props.color1 : 'grey' }
    }

    trace1 = {
      type: 'scatter',
      mode: 'lines',
      name: 'Color2',
      x: frames[5].data[0].x,
      y: frames[5].data[0].y,
      line: { color: props.color2 ? props.color2 : 'lightgrey' }
    }

    data = [trace1, trace2]

    Plotly.newPlot('graph20', data, layout, {
      displaylogo: false,
      displayModeBar: true
    }).then(function () {
      Plotly.addFrames('graph20', frames)
    })
  }

  var layout = {
    // title: 'Multiple Trace Filled-Area Animation',
    width: props.main === true ? 900 : 350,
    height: props.main === true ? 500 : 300,
    xaxis: {
      autoRange: true,
      title: props.xName,
      // range: [frames[99].data[0].x[0], frames[99].data[0].x[99]],
      showgrid: false
    },
    yaxis: {
      //  range: [120, 140],
      title: props.yName,
      autoRange: true,
      showgrid: false
    },
    legend: {
      orientation: 'h',
      x: 0.7,
      y: 1.2,
      xanchor: 'left'
    },
    updatemenus: [
      {
        x: 0.5,
        y: 0,
        yanchor: 'top',
        xanchor: 'center',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: { t: 70, r: 10 },
        buttons: [
          {
            method: 'animate',
            args: [
              null,
              {
                fromcurrent: true,
                transition: {
                  duration: 0
                },
                frame: {
                  duration: 160,
                  redraw: false
                }
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
                transition: {
                  duration: 0
                },
                frame: {
                  duration: 0,
                  redraw: false
                }
              }
            ],
            label: 'Pause'
          }
        ]
      }
    ]
  }

  useEffect(() => {
    if (props.x) get()
  }, [props.color1, props.color2])
  // useEffect(() => {
  //   Plotly.newPlot('graph20', data, layout).then(function () {
  //     Plotly.addFrames('graph20', frames)
  //   })
  // }, [])
  useEffect(() => {
    if (props.x != undefined) get()
    else setNode1(true)
  }, [props.x != undefined])

  useEffect(() => {
    if (props.x) get()
  }, [node1 == false])
  
useEffect(() => {
    //  console.log('added??', annotations)
      if ( props.getAnnotations)
      props.getAnnotations(annotations)
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
          Multiple Trace Filled-Area
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div
              id='graph20'
              style={{
                marginTop: -50,
                marginLeft: -10,
                height: 300,
                width: 350
              }}
            ></div>
            {/* <Plot
              style={{ marginTop: -75 }}
              data={[
                {
                  type: 'scatter',
                  x: props.data[0],
                  y: props.data,
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
            /> */}
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
      <div
        id='graph20'
        style={
          props.main === true
            ? { marginTop: 130, height: 600, width: 750, marginLeft: 50 }
            : { marginTop: -60, height: 300 }
        }
      ></div>
    </div>
  )
}
