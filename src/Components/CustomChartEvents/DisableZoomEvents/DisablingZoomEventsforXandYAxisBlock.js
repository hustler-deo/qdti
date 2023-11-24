import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function DisablingZoomEventsforXandYAxisBlock (props) {
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
  var traces = [
    {
      x: props.x,
      y: props.y,
      marker: {
        color: props.color1
      }
    }
  ]
  useEffect(() => {
    processData(traces)
  }, [props.x, props.y, props.color1])
  function processData (allRows) {
    console.log(allRows)
    var x = [],
      y = [],
      standard_deviation = []

    for (var i = 0; i < allRows.length; i++) {
      var row = allRows[i]
      x.push(row['AAPL_x'])
      y.push(row['AAPL_y'])
    }
    console.log('X', x, 'Y', y, 'SD', standard_deviation)
    makePlotly(x, y, standard_deviation)
  }

  function makePlotly (x, y, standard_deviation) {
    var plotDiv = document.getElementById('plot')

    var layout = {
      yaxis: { fixedrange: true },
      xaxis: { fixedrange: true },
      margin: props.main === true ? { l: 190 } : null

      //   title: 'Disabling Axis Zoom using Plotly JS'
    }
    var config = {
      displaylogo: false,
      displayModeBar: true
    }
    Plotly.newPlot('graph10', traces, layout, config, { showSendToCloud: true })
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
          Disabling Zoom Events for X and Y Axis
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div id='graph10' style={{ marginTop: -50, height: 240 }}>
              {/* <Plot
                divId='graph10'
                style={{ marginTop: -75 }}
                data={[
                  {
                    x: traces
                  }
                ]}
                layout={{
                  width: 300,
                  height: 290,
                  yaxis: { fixedrange: true },
                  xaxis: { fixedrange: true }
                }}
                config={{
                  displaylogo: false
                }}
              /> */}
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
    <div
      id='graph10'
      style={
        props.main === true
          ? { marginTop: 80, marginLeft: -60, height: 600, width: 900 }
          : { marginTop: -60, height: 340 }
      }
    >
      {/* <Plot
                divId='graph10'
                style={{ marginTop: -75 }}
                data={[
                  {
                    x: traces
                  }
                ]}
                layout={{
                  width: 300,
                  height: 290,
                  yaxis: { fixedrange: true },
                  xaxis: { fixedrange: true }
                }}
                config={{
                  displaylogo: false
                }}
              /> */}
    </div>
  )
}
