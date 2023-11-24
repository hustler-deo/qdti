import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function AnimatingtheLayoutBlock (props) {
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

  function zoom () {
    var min = 0.45 * Math.random()
    var max = 0.55 + 0.45 * Math.random()
    Plotly.animate(
      'graph4',
      {
        layout: {
          xaxis: { range: [min, max] },
          yaxis: { range: [min, max] }
        }
      },
      {
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        }
      }
    )
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
                height: '310px',
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
          Animating the Layout
        </h3>
        <div style={{ marginTop: -10 }}>
          <button id='randomize' onClick={() => zoom()}>
            Zoom!
          </button>
        </div>

        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div style={{ marginTop: -50, height: 240 }}>
              <Plot
                divId='graph4'
                style={{ marginTop: -50 }}
                data={[
                  {
                    x: props.x,
                    y: props.y,
                    mode: 'marker'
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
                height: '310px',
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
        <Plot
          divId='graph4'
          style={
            props.main === true
              ? { marginTop: 80, marginLeft: 40 }
              : { marginTop: -75 }
          }
          data={[
            {
              x: props.x,
              y: props.y,
              mode: 'marker',
              marker: {
                color: props.color1
              }
            }
          ]}
          layout={{
            width: props.main === true ? 800 : 300,
            height: props.main === true ? 500 : 280,
            margin: props.main === true ? { l: 150 } : null
          }}
          config={{
            displaylogo: false,
            displayModeBar: true
          }}
        />
      </div>
      <div style={{ marginTop: props.main === true ? 10 : 15 }}>
        <button id='randomize' onClick={() => zoom()}>
          Zoom!
        </button>
      </div>
    </>
  )
}
