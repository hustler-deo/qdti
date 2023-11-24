import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function AnimatingSequencesofFramesBlock (props) {
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

  function startAnimation () {
    Plotly.animate('graph2', ['frame1', 'frame2'], {
      frame: [{ duration: 1500 }, { duration: 500 }],
      transition: [
        { duration: 800, easing: 'elastic-in' },
        { duration: 100, easing: 'cubic-in' }
      ],
      mode: 'afterall'
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
          Animating Sequences of Frames
        </h3>
        <div style={{ marginTop: -10 }}>
          <button onClick={() => startAnimation()}>Animate!</button>
        </div>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div style={{ marginTop: -50, height: 300, overflow: 'hidden' }}>
              <Plot
                divId='graph2'
                style={{ marginTop: -40 }}
                frames={[
                  {
                    data: [{ x: props.y, y: props.x }],
                    name: 'frame1'
                  },
                  {
                    data: [{ x: props.x, y: props.y }],
                    name: 'frame2'
                  }
                ]}
                data={[
                  {
                    x: props.x,
                    y: props.y
                  }
                ]}
                layout={{ width: 300, height: 280 }}
                config={{
                  displaylogo: false,
                  displayModeBar: true
                }}
              />
            </div>
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
    <>
      <div>
        <div>
          {/* {true && (
            <button style={{ marginTop: -20 }} onClick={() => startAnimation()}>
              Animate!
            </button>
          )} */}
          <Plot
            divId='graph2'
            style={
              props.main === true
                ? { marginTop: 70, marginLeft: -20 }
                : { marginTop: -70 }
            }
            frames={[
              {
                data: [{ x: props.y, y: props.x }],
                name: 'frame1'
              },
              {
                data: [{ x: props.x, y: props.y }],
                name: 'frame2'
              }
            ]}
            data={[
              {
                x: props.x,
                y: props.y,
                marker: {
                  color: props.color1
                }
              }
            ]}
            layout={{
              width: props.main === true ? 880 : 360,
              height: props.main === true ? 500 : 300,
              margin: props.main === true ? { l: 190 } : null
            }}
            config={{
              displaylogo: false,
              displayModeBar: true
            }}
          />
        </div>
        {true && (
          <button
            style={{ marginTop: props.main === true ? 20 : -40 }}
            onClick={() => startAnimation()}
          >
            Animate!
          </button>
        )}
      </div>
    </>
  )
}
