import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../config.json'

var annotations2 = []
export default function SimpleCandleStickChartBlock (props) {
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
  var trace1 = {
    x: props.data[0],

    close: props.data[0],

    decreasing: { line: { color: '#7F7F7F' } },

    high: props.data[1],

    increasing: { line: { color: '#17BECF' } },

    line: { color: 'rgba(31,119,180,1)' },

    low: props.data[2],

    open: props.data[3],

    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
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
          Simple CandleStick Chart
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
              data={[
                {
                  x: props.x,
                  close: props.data.flat(),
                  high: props.data.flat(),
                  low: props.data.flat(),
                  open: props.data.flat(),

                  // cutomise colors
                  increasing: { line: { color: '#7F7F7F' } },
                  decreasing: { line: { color: '#17BECF' } },

                  type: 'candlestick',
                  xaxis: 'x',
                  yaxis: 'y'
                }
              ]}
              layout={{
                width: 300,
                height: 290,
                dragmode: 'zoom',
                margin: {
                  r: 10,
                  t: 25,
                  b: 40,
                  l: 60
                },
                showlegend: false,
                xaxis: {
                  autorange: true,
                  domain: props.data
                  //domain: props.data,
                  //    range: props.data[0],
                  //  rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
                  //  title: 'Date'
                  // type: 'date'
                },
                yaxis: {
                  autorange: true,
                  domain: props.data,
                  //domain: props.data,
                  //     range: [114.609999778, 137.410004222],
                  type: 'linear'
                }
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
    <div>
      <Plot
        onClick={annotate}
        style={props.main === true ? { marginTop: 80 } : { marginTop: -75 }}
        data={[
          {
            x: props.x,
            close: props.data.flat(),
            high: props.data.flat(),
            low: props.data.flat(),
            open: props.data.flat(),

            // cutomise colors
            increasing: { line: { color: '#7F7F7F' } },
            decreasing: { line: { color: '#17BECF' } },

            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            marker: { color: props.color1 }
          }
        ]}
        layout={{
          width: props.main === true ? 850 : 300,
          height: props.main === true ? 570 : 300,

          dragmode: 'zoom',
          margin:
            props.main === true
              ? {
                  r: 10,
                  t: 75,
                  b: 40,
                  l: 150
                }
              : {
                  r: 10,
                  t: 25,
                  b: 40,
                  l: 60
                },
          showlegend: false,
          xaxis: {
            autorange: true,
            domain: props.data
            //domain: props.data,
            //    range: props.data[0],
            //  rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']},
            //  title: 'Date'
            // type: 'date'
          },
          yaxis: {
            autorange: true,
            domain: props.data,
            //domain: props.data,
            //     range: [114.609999778, 137.410004222],
            type: 'linear'
          },
          annotations: annotations ? annotations : null
        }}
        config={{
          displaylogo: false,
          displayModeBar: true
        }}
      />
    </div>
  )
}
