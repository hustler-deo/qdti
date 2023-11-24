import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../config.json'

var annotations2 = []
export default function HeatmapwithUnequalBlockSizesBlock (props) {
  const removeStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
    color: 'white'
  }

  const [box1, setBox1] = useState('')
  var box = []
  const [text, setText] = useState(false)
  const [annotations, setAnnotations] = useState([])

  var traceBox = [
    {
      x: props.x,
      y: props.y,
      z: box1,
      type: 'heatmap',
      colorscale: 'Viridis'
    }
  ]
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
  var axisTemplate = {
    //   range: [0, 1.6],
    autorange: true,
    showgrid: false,
    zeroline: false,
    linecolor: 'black',
    showticklabels: false,
    ticks: ''
  }

  useEffect(() => {
    box.push(props.x)
    box.push(props.y)
    setBox1(box)

    // console.log('box->', box)
  }, [])

  useEffect(() => {}, [box1])

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
                background: configData.NODE_COLORS.BODY,
                color: '#FFF',
                height: '110px',
                width: '220px',
                margin: 10
              }
        }
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Heatmap with Unequal Block Sizes
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: 'hidden', height: 300 }}>
            {props.IsDataNumeric === true ? (
              <Plot
                style={{ marginTop: -75 }}
                data={[
                  {
                    x: props.x,
                    y: props.y,
                    z: box1,
                    type: 'heatmap',
                    colorscale: 'Viridis'
                  }
                ]}
                layout={{
                  width: 300,
                  height: 290,
                  // margin: {
                  //   t: 200,
                  //   r: 200,
                  //   b: 200,
                  //   l: 200
                  // },
                  xaxis: axisTemplate,
                  yaxis: axisTemplate,
                  showlegend: false,
                  width: 300,
                  height: 290,
                  autosize: false
                }}
                config={{
                  displaylogo: false,
                  displayModeBar: true
                }}
              />
            ) : (
              <div
                style={{
                  overflow: 'hidden',
                  height: 300
                }}
              >
                <div style={{ marginTop: 90 }}>
                  This Graph requires x and y axis data containing numbers only
                </div>
              </div>
            )}
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
      {props.IsDataNumeric === true ? (
        <Plot
          onClick={annotate}
          style={
            props.main === true
              ? { marginTop: 80, marginLeft: -50 }
              : { marginTop: -65, marginLeft: -150 }
          }
          data={[
            {
              x: props.x,
              y: props.y,
              z: box1,
              type: 'heatmap',
              colorscale: 'Viridis'
            }
          ]}
          layout={
            props.main === true
              ? {
                  annotations: annotations ? annotations : null,
                  width: 900,
                  height: 600,
                  // margin: {
                  //   t: 200,
                  //   r: 200,
                  //   b: 200,
                  //   l: 200
                  // },
                  xaxis: axisTemplate,
                  yaxis: axisTemplate,
                  showlegend: false,

                  autosize: false
                }
              : {
                  width: 300,
                  height: 290,
                  // margin: {
                  //   t: 200,
                  //   r: 200,
                  //   b: 200,
                  //   l: 200
                  // },
                  xaxis: axisTemplate,
                  yaxis: axisTemplate,
                  showlegend: false,

                  autosize: false
                }
          }
          config={{
            displaylogo: false,
            displayModeBar: true
          }}
        />
      ) : (
        <div>
          <div style={{ marginTop: props.main === true ? 350 : 90 }}>
            This Graph requires x and y axis data containing numbers only
          </div>
        </div>
      )}
    </div>
  )
}
