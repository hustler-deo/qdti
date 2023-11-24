import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function ThreeDMeshCubeBlock (props) {
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
    annote.z = e.points[0].z
    // annote.xref = 'x'
    // annote.yref = 'y'
    annote.text = props.annotation
    annote.showarrow = true
    annote.arrowhead = 7
    annote.ax = 0
    annote.ay = -75

    annotations2.push({ ...annote })
    setAnnotations(annotations2)
    setTimeout(() => setText(!text), 1000)
  }
  var myArray, unique, x1, y1, z1
  var t1 = []
  var obj = {}
  const [u1, setU1] = useState()
  const [traces, setTraces] = useState()
  var traceBox = [
    {
      type: 'mesh3d',
      x: props.x,
      y: props.y,
      z: props.z,
      i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
      j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
      k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
      intensity: [
        0,
        0.14285714285714285,
        0.2857142857142857,
        0.42857142857142855,
        0.5714285714285714,
        0.7142857142857143,
        0.8571428571428571,
        1
      ],
      colorscale: [
        [0, 'rgb(255, 0, 255)'],
        [0.5, 'rgb(0, 255, 0)'],
        [1, 'rgb(0, 0, 255)']
      ],
      marker: { color: props.color1 }
    }
  ]
  var c1 = [],
    c2 = [],
    c3 = [],
    c4 = [],
    c5 = [],
    c6 = [],
    c7 = [],
    c8 = [],
    c9 = [],
    c10 = [],
    c11 = [],
    c12 = [],
    c13 = [],
    c14 = [],
    c15 = [],
    c16 = [],
    c17 = [],
    c18 = [],
    c19 = [],
    c20 = []

  useEffect(() => {
    myArray = props.z
    if (myArray) {
      unique = myArray.filter((v, i, a) => a.indexOf(v) === i)
      console.log('unique', unique)
      setU1(unique)
    }
  }, [props.z])

  const getSelectedColumnData = column => {
    let cValues =
      column == 0
        ? c1
        : column == 1
        ? c2
        : column == 2
        ? c3
        : column == 3
        ? c4
        : column == 4
        ? c5
        : column == 5
        ? c6
        : column == 6
        ? c7
        : column == 7
        ? c8
        : column == 8
        ? c9
        : column == 9
        ? c10
        : column == 10
        ? c11
        : column == 11
        ? c12
        : column == 12
        ? c13
        : column == 13
        ? c14
        : column == 14
        ? c15
        : column == 15
        ? c16
        : column == 16
        ? c17
        : column == 17
        ? c18
        : column == 18
        ? c19
        : column == 19
        ? c20
        : null
    return cValues
  }

  const addTraces = () => {
    u1.map((e, i) => {
      ;(c1 = []),
        (c2 = []),
        (c3 = []),
        (c4 = []),
        (c5 = []),
        (c6 = []),
        (c7 = []),
        (c8 = []),
        (c9 = []),
        (c10 = []),
        (c11 = []),
        (c12 = []),
        (c13 = []),
        (c14 = []),
        (c15 = []),
        (c16 = []),
        (c17 = []),
        (c18 = []),
        (c19 = []),
        (c20 = [])
      let tx = props.data.filter((item, index) => item.includes(e))
      //  console.log('tx', tx)
      tx.map(e => {
        if (e[0]) c1.push(e[0])
        if (e[1]) c2.push(e[1])
        if (e[2]) c3.push(e[2])
        if (e[3]) c4.push(e[3])
        if (e[4]) c5.push(e[4])
        if (e[5]) c6.push(e[5])
        if (e[6]) c7.push(e[6])
        if (e[7]) c8.push(e[7])
        if (e[8]) c9.push(e[8])
        if (e[9]) c10.push(e[9])
        if (e[10]) c11.push(e[10])
        if (e[11]) c12.push(e[11])
        if (e[12]) c13.push(e[12])
        if (e[13]) c14.push(e[13])
        if (e[14]) c15.push(e[14])
        if (e[15]) c16.push(e[15])
        if (e[16]) c17.push(e[16])
        if (e[17]) c18.push(e[17])
        if (e[18]) c19.push(e[18])
        if (e[19]) c20.push(e[19])
        return e
      })

      x1 = getSelectedColumnData(props.columnX)
      y1 = getSelectedColumnData(props.columnY)
      z1 = getSelectedColumnData(props.columnZ)
      //console.log('CHCHC', c2)
      ;(obj = {
        x: x1,
        y: y1,
        z: z1,
        type: 'mesh3d',

        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: [
          0,
          0.14285714285714285,
          0.2857142857142857,
          0.42857142857142855,
          0.5714285714285714,
          0.7142857142857143,
          0.8571428571428571,
          1
        ],
        name: e
        // marker: { color: z1 }
      }),
        t1.push(obj)
    })
    //console.log('t1', t1)
    setTraces(t1)
  }
  useEffect(() => {
    if (u1) addTraces()
  }, [props.z && props.useLegend == true && u1])

  useEffect(() => {
    onTrigger()
  }, [props.color1 || props.color2 || traces])

  const onTrigger = event => {
    // traceBox.push(trace_1)
    // traceBox.push(trace_2)
    if (props.parentCallback)
      props.parentCallback(props.useLegend ? traces : traceBox)
  }

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
          3D Mesh Cube
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
                    type: 'mesh3d',
                    x: x1,
                    y: y1,
                    z: z1,
                    i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
                    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
                    k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
                    intensity: [
                      0,
                      0.14285714285714285,
                      0.2857142857142857,
                      0.42857142857142855,
                      0.5714285714285714,
                      0.7142857142857143,
                      0.8571428571428571,
                      1
                    ],
                    colorscale: [
                      [0, 'rgb(255, 0, 255)'],
                      [0.5, 'rgb(0, 255, 0)'],
                      [1, 'rgb(0, 0, 255)']
                    ]
                  }
                ]}
                layout={{ width: 300, height: 290 }}
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
          onClick={annotate}
          style={
            props.main === true
              ? { marginTop: 80, marginLeft: -50 }
              : { marginTop: -75, marginLeft: 25 }
          }
          data={
            props.useLegend
              ? traces
              : [
                  {
                    type: 'mesh3d',
                    x: props.x,
                    y: props.y,
                    z: props.z,
                    i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
                    j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
                    k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
                    intensity: [
                      0,
                      0.14285714285714285,
                      0.2857142857142857,
                      0.42857142857142855,
                      0.5714285714285714,
                      0.7142857142857143,
                      0.8571428571428571,
                      1
                    ],
                    colorscale: [
                      [0, 'rgb(255, 0, 255)'],
                      [0.5, 'rgb(0, 255, 0)'],
                      [1, 'rgb(0, 0, 255)']
                    ],
                    marker: { color: props.color1 }
                  }
                ]
          }
          layout={{
            width: props.main === true ? 900 : 300,
            height: props.main === true ? 570 : 290,
            scene: {
              annotations: annotations ? annotations : null
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
