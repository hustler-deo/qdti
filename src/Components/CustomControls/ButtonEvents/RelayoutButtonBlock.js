import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function RelayoutButtonBlock (props) {
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
  var button_layer_height = 1.2
  var cluster0 = {
    type: 'circle',
    xref: 'x',
    yref: 'y',
    x0: Math.min(...props.x),
    y0: Math.min(...props.y),
    x1: Math.max(...props.x),
    y1: Math.max(...props.y),
    opacity: 0.25,
    line: { color: '#835AF1' },
    fillcolor: '#835AF1'
  }

  var cluster1 = {
    type: 'circle',
    xref: 'x',
    yref: 'y',
    x0: Math.min(...props.x),
    y0: Math.min(...props.x),
    x1: Math.max(...props.y),
    y1: Math.max(...props.y),
    opacity: 0.25,
    line: { color: '#7FA6EE' },
    fillcolor: '#7FA6EE'
  }

  var updatemenus = [
    {
      buttons: [
        {
          args: ['shapes', []],
          label: 'None',
          method: 'relayout'
        },
        {
          args: ['shapes', [cluster0]],
          label: 'Cluster 0',
          method: 'relayout'
        },
        {
          args: ['shapes', [cluster1]],
          label: 'Cluster 1',
          method: 'relayout'
        },
        {
          args: ['shapes', [cluster0, cluster1]],
          label: 'All',
          method: 'relayout'
        }
      ],
      direction: 'left',
      pad: { r: 10, t: 8 },
      showactive: true,
      type: 'buttons',
      //  x: props.block ? -0.3 : 2.1,
      xanchor: 'left',
      y: props.block ? button_layer_height : button_layer_height + -0.09,
      yanchor: 'top'
    }
  ]
  
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
          Relayout Button
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              overflow: 'hidden',
              height: 300,
              width: 320
            }}
          >
            <Plot
              style={{ marginTop: -75 }}
              data={[
                {
                  x: props.x,
                  y: props.y,
                  mode: 'markers',
                  name: '',
                  marker: { color: '#835AF1' }
                },
                {
                  x: props.x,
                  y: props.y,
                  mode: 'markers',
                  name: '',
                  marker: { color: '#7FA6EE' }
                },
                {
                  x: props.x,
                  y: props.y,
                  mode: 'markers',
                  name: '',
                  marker: { color: '#B8F7D4' }
                }
              ]}
              layout={{
                width: 310,
                height: 290,
                updatemenus: updatemenus,
                showlegend: false
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
      style={
        props.main === true
          ? {
              marginTop: 115,
              marginLeft: 50
            }
          : {
              marginTop: -65,
              marginLeft: -130
            }
      }
      data={[
        {
          x: props.x,
          y: props.y,
          mode: 'markers',
          name: '',
          marker: { color: '#835AF1' }
        },
        {
          x: props.x,
          y: props.y,
          mode: 'markers',
          name: '',
          marker: { color: '#7FA6EE' }
        },
        {
          x: props.x,
          y: props.y,
          mode: 'markers',
          name: '',
          marker: { color: '#B8F7D4' }
        }
      ]}
      layout={{
        width: props.main === true ? 800 : 500,
        height: props.main === true ? 550 : 290,
        margin: { l: 160 },
        updatemenus: updatemenus,
        showlegend: false
      }}
      config={{
        displaylogo: false,
        displayModeBar: true
      }}
    />
  )
}
