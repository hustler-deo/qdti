import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function StylethebuttonsBlock (props) {
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
  const [box1, setBox1] = useState('')
  var box = []

  useEffect(() => {
    box.push(props.x)
    box.push(props.y)

    setBox1(box)
    console.log('box->', props.box)
    // console.log('box->', box)
  }, [props.x, props.y])

  useEffect(() => {}, [box1])
  var button_layer_1_height = 1.12
  var button_layer_2_height = 1.0
  var updatemenus = [
    {
      buttons: [
        {
          args: ['type', 'surface'],
          label: '3D Surface',
          method: 'restyle'
        },
        {
          args: ['type', 'heatmap'],
          label: 'Heatmap',
          method: 'restyle'
        },
        {
          args: ['type', 'contour'],
          label: 'Contour',
          method: 'restyle'
        }
      ],
      direction: 'left',
      pad: { r: 10, t: 50 },
      showactive: true,
      type: 'buttons',
      x: 0.15,
      xanchor: 'left',
      y: button_layer_2_height,
      yanchor: 'top',
      font: { color: '#5072a8' }
    },
    {
      buttons: [
        {
          args: ['reversescale', true],
          label: 'Reverse',
          method: 'restyle'
        },
        {
          args: ['reversescale', false],
          label: 'Undo Reverse',
          method: 'restyle'
        }
      ],
      direction: 'down',
      pad: { r: 10, t: 80 },
      showactive: true,
      type: 'dropdown',
      x: 0.56,
      xanchor: 'left',
      y: button_layer_2_height,
      yanchor: 'top',
      active: 1,
      font: { color: '#5072a8' }
    },
    {
      buttons: [
        {
          args: [{ 'contours.showlines': false, type: 'contour' }],
          label: 'Hide lines',
          method: 'restyle'
        },
        {
          args: [{ 'contours.showlines': true, type: 'contour' }],
          label: 'Show lines',
          method: 'restyle'
        }
      ],
      direction: 'down',
      pad: { r: 10, t: 10 },
      showactive: true,
      type: 'dropdown',
      x: 0.78,
      xanchor: 'left',
      y: button_layer_2_height,
      yanchor: 'top',
      font: { color: '#5072a8' }
    },
    {
      buttons: [
        {
          args: ['colorscale', 'Viridis'],
          label: 'Viridis',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Electric'],
          label: 'Electric',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Earth'],
          label: 'Earth',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Hot'],
          label: 'Hot',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Jet'],
          label: 'Jet',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Portland'],
          label: 'Portland',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Rainbow'],
          label: 'Rainbow',
          method: 'restyle'
        },
        {
          args: ['colorscale', 'Blackbody'],
          label: 'Blackbody',
          method: 'restyle'
        },

        {
          args: ['colorscale', 'Cividis'],
          label: 'Cividis',
          method: 'restyle'
        }
      ],
      direction: 'left',
      pad: { r: 10, t: 10 },
      showactive: true,
      type: 'buttons',
      x: 0.15,
      xanchor: 'left',
      y: button_layer_1_height,
      yanchor: 'top',
      active: 1,
      bgcolor: '#aaaaaa',
      bordercolor: '#FFFFFF'
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
          Style the buttons
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
                    z: box1,
                    type: 'surface',
                    colorscale: 'Viridis'
                  }
                ]}
                layout={{
                  width: 300,
                  height: 290,
                  margin: { t: 5, b: 0, l: 0, r: 0 },
                  updatemenus: updatemenus,

                  scene: {
                    bgcolor: 'white',
                    aspectratio: { x: 0.5, y: 0.5, z: 0.5 },
                    aspectmode: 'manual'
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
          style={
            props.main === true
              ? { marginTop: 80, marginLeft: -50 }
              : { marginTop: -65, marginLeft: -150 }
          }
          data={[
            {
              z: box1,
              type: 'surface',
              colorscale: 'Viridis'
            }
          ]}
          layout={{
            width: props.main === true ? 800 : 320,
            height: props.main === true ? 550 : 320,
            margin:
              props.main === true
                ? { t: 50, b: 0, l: 50, r: 0 }
                : { t: 5, b: 0, l: 0, r: 0 },
            updatemenus: updatemenus,

            scene: {
              bgcolor: 'white',
              aspectratio: { x: 0.5, y: 0.5, z: 0.5 },
              aspectmode: 'manual'
            }
          }}
          config={{
            displaylogo: false,
            displayModeBar: true
          }}
        />
      ) : (
        <div style={{ marginTop: props.main === true ? 350 : 90 }}>
          <div>
            This Graph requires x and y axis data containing numbers only
          </div>
        </div>
      )}
    </div>
  )
}
