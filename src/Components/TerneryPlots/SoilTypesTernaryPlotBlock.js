import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import { BarChart } from 'react-chartkick'
import Plot from 'react-plotly.js'
import configData from '../../config.json'

var annotations2 = []
export default function SoilTypesTernaryPlotBlock (props) {
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

  function makeAxis (title) {
    return {
      title: title,
      ticksuffix: '%',
      min: 0.01,
      linewidth: 2,
      ticks: 'outside',
      ticklen: 8,
      showgrid: true
    }
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
                height: '305px',
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
                height: '305px',
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
          Soil Types Ternary Plot
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
                  y: props.y,
                  type: 'scatterternary',
                  mode: 'markers',
                  a: props.data[1],
                  b: props.data[2],
                  c: props.data[3],
                  text: props.data[0],
                  marker: {
                    symbol: 100,
                    color: '#DB7365',
                    size: 14,
                    line: { width: 2 }
                  }
                }
              ]}
              layout={{
                width: 300,
                height: 315,
                ternary: {
                  sum: 100,
                  aaxis: makeAxis('test1'),
                  baxis: makeAxis('test2'),
                  caxis: makeAxis('test3')
                },
                showlegend: false,

                width: 300,
                annotations: [
                  {
                    showarrow: false,
                    // text: 'Replica of Daven Quinn\'s <a href="http://bl.ocks.org/davenquinn/988167471993bc2ece29">block</a>',
                    x: 0.15,
                    y: 1.1
                  }
                ]
              }}
              config={{
                displaylogo: false,
                displayModeBar: true
              }}
            />
            {/* <BarChart data={props.data} width='300px' height='200px' /> */}
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
                height: '305px',
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
        style={
          props.main === true
            ? { marginTop: 80, marginLeft: -50 }
            : { marginTop: -75, marginLeft: 25 }
        }
        data={[
          {
            x: props.x,
            y: props.y,
            type: 'scatterternary',
            mode: 'markers',
            a: props.data[1],
            b: props.data[2],
            c: props.data[3],
            text: props.data[0],
            marker: {
              symbol: 100,
              color: '#DB7365',
              size: 14,
              line: { width: 2 }
            }
          }
        ]}
        layout={{
          width: 300,
          height: 315,
          ternary: {
            sum: 100,
            aaxis: makeAxis('test1'),
            baxis: makeAxis('test2'),
            caxis: makeAxis('test3')
          },
          showlegend: false,

          width: 300,
          annotations: [
            {
              showarrow: false,
              // text: 'Replica of Daven Quinn\'s <a href="http://bl.ocks.org/davenquinn/988167471993bc2ece29">block</a>',
              x: 0.15,
              y: 1.1
            }
          ]
        }}
        config={{
          displaylogo: false,
          displayModeBar: true
        }}
      />
    </div>
  )
}
