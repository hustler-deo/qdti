import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function UpdateButtonBlock (props) {
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

  var button_layer_2_height = 1.2

  var updatemenus = [
    {
      buttons: [
        {
          args: [
            { visible: [true, true, false, false] },
            { title: 'Yahoo High' }
          ],
          label: 'High',
          method: 'update'
        },
        {
          args: [
            { visible: [false, false, true, true] },
            { title: 'Yahoo Low' }
          ],
          label: 'Low',
          method: 'update'
        },
        {
          args: [{ visible: [true, true, true, true] }, { title: 'Yahoo' }],
          label: 'Both',
          method: 'update'
        },
        {
          args: [
            { visible: [true, false, true, false] },
            { title: 'Yahoo', annotations: [] }
          ],
          label: 'Reset',
          method: 'update'
        }
      ],
      direction: 'left',
      pad: { r: 15, t: 2 },
      showactive: true,
      type: 'buttons',
      x: 0.1,
      xanchor: 'left',
      y: button_layer_2_height,
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
          Update Button
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
                  mode: 'lines',
                  name: 'High',
                  marker: { color: '#33CFA5' }
                },
                {
                  x: props.x,
                  y: props.data.map(a => a),
                  mode: 'lines',
                  name: 'Low Average',
                  line: { color: '#33CFA5', dash: 'dash' },
                  visible: false
                },
                {
                  x: props.x,
                  y: props.y,
                  name: 'Low',
                  mode: 'lines',
                  marker: { color: '#F06A6A' }
                }
              ]}
              layout={{
                width: 300,
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
    <div>
      <Plot
        style={
          props.main === true
            ? { marginTop: 80, marginLeft: 50 }
            : { marginTop: -75, marginLeft: 0 }
        }
        data={[
          {
            x: props.x,
            y: props.y,
            mode: 'lines',
            name: 'High',
            marker: { color: props.colo1 }
          },
          {
            x: props.x,
            y: props.data.map(a => a),
            mode: 'lines',
            name: 'Low Average',
            line: { color: props.color2, dash: 'dash' },
            visible: false
          },
          {
            x: props.x,
            y: props.y,
            name: 'Low',
            mode: 'lines',
            marker: { color: props.color1 }
          }
        ]}
        layout={{
          width: props.main === true ? 800 : 400,
          height: props.main === true ? 570 : 300,
          updatemenus: updatemenus,
          showlegend: false
        }}
        config={{
          displaylogo: false,
          displayModeBar: true
        }}
      />
    </div>
  )
}
