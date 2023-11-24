import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { BarChart } from 'react-chartkick'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../config.json'
var annotations2 = []
export default function BasicTreemapsBlock (props) {
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
  const [data2, setData2] = React.useState([])
  // const [mount, setMount] = React.useState(false)

  // useEffect(() => {
  //   setMount(true)
  // }, [])
  // useEffect(() => {}, [data2])
  var temp = []
  // useEffect(() => {
  //   if (props.data) {
  //     console.log('HERE', props.data4)
  //     // temp.push('')
  //     // //  console.log('In useeff', temp.length, props.data[0].length)
  //     // for (var k = 0; temp.length < props.data[0].length; k++) {
  //     //   // console.log('In for', temp.length, props.data[0].length)

  //     //   if (k == 0) {
  //     //     temp.push(props.data[0][k])
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 1) {
  //     //     temp.push(props.data[0][k])
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 2) {
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 3) {
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 4) {
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 5) {
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 6) {
  //     //     temp.push(props.data[0][k])
  //     //   }
  //     //   if (k == 7) {
  //     //     temp.push(props.data[0][k])
  //     //   }

  //     //   if (temp.length == props.data[0].length - 1) temp.push(props.data[0][0])
  //     //   // if ((k = 3)) {
  //     //   //   temp.push(props.data[0][2])
  //     //   // }
  //     //   //  if (temp.length <= props.data[0].length) temp.push(props.data[0][k])
  //     // }
  //     // console.log('TE', props.data[0], temp)
  //     // setData2(temp)
  //   }
  // }, [mount])

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
          Basic TreeMaps
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div id='myDiv' style={{ overflow: 'hidden', height: 300 }}>
            <Plot
              style={{ marginTop: -50 }}
              data={[
                {
                  type: 'treemap',
                  labels: props.data[0],
                  parents: props.data2
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
          ? { marginTop: 80, marginLeft: 40 }
          : { marginTop: -50, marginLeft: -60 }
      }
      data={
        props.useLegend
          ? traces
          : [
              {
                type: 'treemap',
                labels: props.data[0],
                parents: props.data2
              }
            ]
      }
      layout={
        props.main === true
          ? {
              annotations: annotations ? annotations : null,
              width: 900,
              height: 600
            }
          : { width: 500, height: 350 }
      }
      config={{
        displaylogo: false,
        displayModeBar: true
      }}
    />
  )
}
