import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function USABubbleMap (props) {
  // console.log('Branch values', props.data)
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

  const [values, setValues] = useState([])
  const [size, setSize] = useState(false)
  var t1 = []
  useEffect(() => {
    props.z.map(e => {
      if (e < 100) t1.push(10)
      if (e > 100 && e < 500) t1.push(20)
      if (e > 500 && e < 1000) t1.push(30)
      if (e > 1000 && e < 5000) t1.push(40)
    })

    // console.log('t1>', t1)
    setSize(true)
    setValues(t1)
  }, [props.z])

  useEffect(() => {}, [size === true])

  useEffect(() => {}, [values])
  var data = [
    {
      type: 'scattergeo',
      locationmode: 'USA-states',
      lat: props.x,
      lon: props.y,
      hoverinfo: 'text',
      text: props.z,
      marker: {
        size: values,
        line: {
          color: 'black',
          width: 2
        }
      }
    }
  ]

  var layout = {
    title: '2014 US City Populations',
    width: 900,
    height: 650,
    showlegend: false,
    geo: {
      scope: 'USA',
      projection: {
        type: 'albers usa'
      },
      //  showcountries: true,
      showland: true,
      landcolor: 'rgb(217, 217, 217)',
      subunitwidth: 1,
      countrywidth: 1,
      subunitcolor: 'rgb(255,255,255)',
      countrycolor: 'rgb(255,255,255)'
    }
  }

  useEffect(() => {
    //  console.log('added??', annotations)
    if (props.getAnnotations) props.getAnnotations(annotations)
  }, [text])

  useEffect(() => {
    onTrigger()
  }, [])

  const onTrigger = event => {
    if (props.parentCallback) props.parentCallback(data)
  }
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
          USA Bubble Map
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: 'hidden', height: 300 }}>
            <Plot
              style={{ marginTop: -75 }}
              data={data}
              layout={layout}
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
              marginTop: 80,
              marginLeft: -50
            }
          : {
              marginTop: -65,
              marginLeft: -150
            }
      }
      data={data}
      layout={layout}
      config={{
        displaylogo: false,
        displayModeBar: true
      }}
    />
  )
}
