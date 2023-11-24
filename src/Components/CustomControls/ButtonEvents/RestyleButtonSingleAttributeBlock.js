import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function RestyleButtonSingleAttributeBlock (props) {
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
    console.log('box->', props.x)
  }, [props.x, props.y])

  useEffect(() => {}, [box1])

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
        }
      ],
      direction: 'left',
      pad: { l: -35, r: 0, t: 46 },
      showactive: true,
      type: 'buttons',
      x: 0.1,
      xanchor: 'left',
      y: 1.1,
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
                height: '350px',
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
                height: '350px',
                width: '320px',
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
          Restyle Button Single Attribute
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div id='graph18' style={{ overflow: 'hidden', height: 350 }}>
            {props.IsDataNumeric === true ? (
              <Plot
                divId='graph18'
                style={{ marginTop: -45 }}
                data={[
                  {
                    z: box1,
                    type: 'surface',
                    colorscale: 'Viridis'
                  }
                ]}
                layout={{
                  width: 320,
                  height: 330,
                  autosize: false,
                  margin: { t: 20, b: 0, l: 30, r: 0 },
                  updatemenus: updatemenus,
                  //  annotations: annotations,
                  scene: {
                    xaxis: {
                      gridcolor: 'rgb(255, 255, 255)',
                      zerolinecolor: 'rgb(255, 255, 255)',
                      showbackground: true,
                      backgroundcolor: 'rgb(230, 230,230)'
                    },
                    yaxis: {
                      gridcolor: 'rgb(255, 255, 255)',
                      zerolinecolor: 'rgb(255, 255, 255)',
                      showbackground: true,
                      backgroundcolor: 'rgb(230, 230, 230)'
                    },
                    zaxis: {
                      gridcolor: 'rgb(255, 255, 255)',
                      zerolinecolor: 'rgb(255, 255, 255)',
                      showbackground: true,
                      backgroundcolor: 'rgb(230, 230,230)'
                    },
                    aspectratio: { x: 1, y: 1, z: 0.7 },
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
                height: '350px',
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
          divId='graph18'
          style={{ marginTop: props.main === true ? 110 : -45 }}
          data={[
            {
              z: box1,
              type: 'surface',
              colorscale: 'Viridis'
            }
          ]}
          layout={{
            width: props.main === true ? 800 : 320,
            height: props.main === true ? 480 : 320,
            autosize: false,
            margin: { t: 20, b: 0, l: props.main === true ? 50 : 30, r: 0 },
            updatemenus: updatemenus,
            //  annotations: annotations,
            scene: {
              xaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230,230)'
              },
              yaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230, 230)'
              },
              zaxis: {
                gridcolor: 'rgb(255, 255, 255)',
                zerolinecolor: 'rgb(255, 255, 255)',
                showbackground: true,
                backgroundcolor: 'rgb(230, 230,230)'
              },
              aspectratio: { x: 1, y: 1, z: 0.7 },
              aspectmode: 'manual'
            }
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
