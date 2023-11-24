import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function FilledAreaAnimationBlock (props) {
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
  var frames = [],
    temp = [],
    temp2 = []
  var x, y
  var n = 100
  const [node1, setNode1] = useState(false)
  useEffect(() => {
    //  console.log('$$$$$', props.x !== undefined)
    if (props.x !== undefined) {
      x = props.x
      y = props.y
      get()
    }
    //   if (props.x !== undefined) setNode1(true)
  }, [props.x])

  // useEffect(() => {
  //   if (props.x && props.y) {
  //     get()
  //     x = props.x
  //     y = props.y
  //   }
  // }, [node1 == true])

  const get = () => {
    for (var i = 0; i < n; i++) {
      frames[i] = { data: [{ x: [], y: [] }] }

      frames[i].data[0].x = x.slice(0, i + 1)
      frames[i].data[0].y = y.slice(0, i + 1)
    }

    Plotly.newPlot(
      'graph19',
      [
        {
          x: frames[1].data[0].x,
          y: frames[1].data[0].y,
          fill: 'tozeroy',
          type: 'scatter',
          mode: 'lines',
          line: { color: props.color1 }
        }
      ],
      {
        // title: 'Filled-Area Animation',
        xaxis: {
          autorange: true
          // type: 'date',
          //   range: [frames[99].data[0].x[0], frames[99].data[0].x[99]]
        },
        yaxis: {
          autorange: true
          // range: [0, 90]
        },
        layout: {
          width: props.main === true ? 900 : 350,
          height: props.main === true ? 570 : 360,
          xaxis: {
            title: props.xName
          },
          yaxis: {
            title: props.yName
          }
        },

        updatemenus: [
          {
            x: 0.4,
            y: 0,
            yanchor: 'top',
            xanchor: 'right',
            showactive: false,
            direction: 'left',
            type: 'buttons',
            pad: { t: 50, r: 10 },
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
      },
      { displaylogo: false, displayModeBar: true }
    ).then(function () {
      Plotly.addFrames('graph19', frames)
    })
  }

  
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
          Filled-Area-Animation
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}

        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div
              id='graph19'
              style={{
                marginTop: -50,
                marginLeft: -20,
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
        id='graph19'
        style={
          props.main === true
            ? { marginTop: 100, height: 500, width: 800, marginLeft: 65 }
            : { marginTop: -60, height: 300 }
        }
      ></div>
    </div>
  )
}
