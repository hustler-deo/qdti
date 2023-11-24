import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function MapAnimationsBlock (props) {
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
  function filter_and_unpack (rows, key, year) {
    return rows && rows.filter(row => row['year'] == year).map(row => row[key])
  }

  var frames = []
  var slider_steps = []

  var n = 11
  var num = 1952
  for (var i = 0; i <= n; i++) {
    var z = filter_and_unpack(props.x, 'lifeExp', num)
    var locations = filter_and_unpack(props.x, 'iso_alpha', num)
    frames[i] = {
      data: [{ z: z, locations: locations, text: locations }],
      name: num
    }
    slider_steps.push({
      label: num.toString(),
      method: 'animate',
      args: [
        [num],
        {
          mode: 'immediate',
          transition: { duration: 300 },
          frame: { duration: 300 }
        }
      ]
    })
    num = num + 5
  }

  var data = [
    {
      type: 'choropleth',
      locationmode: 'world',
      locations: frames[0].data[0].locations,
      z: frames[0].data[0].z,
      text: frames[0].data[0].locations,
      zauto: false,
      zmin: 30,
      zmax: 90
    }
  ]
  var layout = {
    //  title: 'World Life Expectency<br>1952 - 2007',
    geo: {
      scope: 'world',
      countrycolor: 'rgb(255, 255, 255)',
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      showlakes: true,
      lakecolor: 'rgb(255, 255, 255)',
      subunitcolor: 'rgb(255, 255, 255)',
      lonaxis: {},
      lataxis: {}
    },
    updatemenus: [
      {
        x: 0.1,
        y: 0,
        yanchor: 'top',
        xanchor: 'right',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: { t: 87, r: 10 },
        buttons: [
          {
            method: 'animate',
            args: [
              null,
              {
                fromcurrent: true,
                transition: {
                  duration: 200
                },
                frame: {
                  duration: 500
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
                  duration: 0
                }
              }
            ],
            label: 'Pause'
          }
        ]
      }
    ],
    sliders: [
      {
        active: 0,
        steps: slider_steps,
        x: 0.1,
        len: 0.9,
        xanchor: 'left',
        y: 0,
        yanchor: 'top',
        pad: { t: 50, b: 10 },
        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {
            size: 20,
            color: '#666'
          }
        },
        transition: {
          duration: 300,
          easing: 'cubic-in-out'
        }
      }
    ]
  }
  useEffect(() => {
    Plotly.newPlot('graph21', data, layout).then(function () {
      Plotly.addFrames('graph21', frames)
    })
  }, [])
  
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
          Map Animations
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div id='graph21' style={{ marginTop: -50, height: 240 }}></div>
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
      <div id='graph21' style={{ marginTop: -50, height: 240 }}></div>
    </div>
  )
}
