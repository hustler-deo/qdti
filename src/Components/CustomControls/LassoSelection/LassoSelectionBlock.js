import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function LassoSelectionBlock (props) {
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
  var N = 1000
  var color1 = '#7b3294'
  var color1Light = '#c2a5cf'
  var colorX = '#ffa7b5'
  var colorY = '#fdae61'
  var x = props.x
  var y = props.y
  const lasso = eventData => {
    x = []
    y = []

    var colors = []
    for (var i = 0; i < N; i++) colors.push(color1Light)

    console.log(eventData.points)

    eventData.points.forEach(function (pt) {
      x.push(pt.x)
      y.push(pt.y)
      colors[pt.pointNumber] = color1
    })

    Plotly.restyle(
      lasso,
      {
        x: [x, y],
        xbins: {}
      },
      [1, 2]
    )

    Plotly.restyle(lasso, 'marker.color', [colors], [0])
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
          Lasso Selection
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: 'hidden', height: 300 }}>
            <Plot
              onSelected={lasso}
              style={{ marginTop: -75 }}
              data={[
                {
                  type: 'scatter',
                  mode: 'markers',
                  x: x,
                  y: y,
                  xaxis: 'x',
                  yaxis: 'y',
                  marker: { color: color1, size: 10 }
                }
              ]}
              layout={{
                width: 300,
                height: 290,
                title:
                  'Lasso around the scatter points to see sub-distributions',
                dragmode: 'lasso',
                xaxis: {
                  zeroline: false
                },
                yaxis: {
                  domain: [0.55, 1]
                },
                xaxis2: {
                  domain: [0, 0.45],
                  anchor: 'y2'
                },
                yaxis2: {
                  domain: [0, 0.45],
                  anchor: 'x2'
                },
                xaxis3: {
                  domain: [0.55, 1],
                  anchor: 'y3'
                },
                yaxis3: {
                  domain: [0, 0.45],
                  anchor: 'x3'
                }
              }}
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
    <Plot
      onSelected={lasso}
      style={
        props.main === true
          ? { marginTop: 120, marginLeft: 60 }
          : { marginTop: -75 }
      }
      data={
        props.useLegend
          ? traces
          : [
              {
                type: 'scatter',
                mode: 'markers',
                x: x,
                y: y,
                xaxis: 'x',
                yaxis: 'y',
                marker: { color: props.color1, size: 10 }
              }
            ]
      }
      layout={{
        width: props.main === true ? 800 : 300,
        height: props.main === true ? 980 : 290,
        title: 'Lasso around the scatter points to see sub-distributions',
        dragmode: 'lasso',
        xaxis: {
          zeroline: false
        },
        yaxis: {
          domain: [0.55, 1]
        },
        xaxis2: {
          domain: [0, 0.45],
          anchor: 'y2'
        },
        yaxis2: {
          domain: [0, 0.45],
          anchor: 'x2'
        },
        xaxis3: {
          domain: [0.55, 1],
          anchor: 'y3'
        },
        yaxis3: {
          domain: [0, 0.45],
          anchor: 'x3'
        }
      }}
      config={{
        displaylogo: false,
        displayModeBar: true
      }}
    />
  )
}
