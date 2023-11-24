import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function Multiple3DSubplotsBlock (props) {
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
  // var x = [],
  //   y = [],
  //   z = []
  // useEffect(() => {
  //   x = props.x.shift()
  //   y = props.y.shift()
  //   z = props.z.shift()
  // }, [])
  console.log('DATA-', props.x, props.y, props.z, props.IsDataNumeric)

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
          Multiple 3D Subplots
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
                style={{ marginTop: -55 }}
                data={[
                  {
                    opacity: 0.5,
                    color: 'rgba(255,127,80,0.7)',
                    type: 'mesh3d',
                    x: props.x,
                    y: props.y,
                    z: props.z,
                    scene: 'scene1'
                  }
                ]}
                layout={{
                  width: 300,
                  height: 300,
                  scene1: {
                    domain: {
                      x: props.x,
                      y: props.y
                    }
                  },
                  // scene2: {
                  //   domain: {
                  //     x: props.x,
                  //     y: props.y
                  //   }
                  // },
                  margin: {
                    l: 60,
                    r: 0,
                    b: 0,
                    t: 80,
                    pad: 0
                  }
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
                  height: 290
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
              ? { marginTop: 92, marginLeft: 0 }
              : { marginTop: -55, marginLeft: 30 }
          }
          data={[
            {
              opacity: 0.5,
              color: props.color1,
              type: 'mesh3d',
              x: props.x,
              y: props.y,
              z: props.z,
              scene: 'scene1'
            }
          ]}
          layout={{
            width: props.main === true ? 850 : 320,
            height: props.main === true ? 500 : 320,
            scene1: {
              domain: {
                x: props.x,
                y: props.y
              }
            },
            margin: {
              l: 0,
              r: 0,
              b: 0,
              t: 0,
              pad: 0
            },
            annotations: annotations ? annotations : null
          }}
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
