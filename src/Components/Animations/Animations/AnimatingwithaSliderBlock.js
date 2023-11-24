import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function AnimatingwithaSliderBlock (props) {
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
  var frames = []
  var sliderSteps = []
  var flag = 0
  useEffect(() => {
    if (props.x) flag = 1
    if (flag == 1) get()
  }, [props.x])

  const get = () => {
    for (i = 0; i < props.x.length; i++) {
      frames.push({
        //    name: years[i],
        data: props.x[i]
      })
    }

    for (var i = 0; i < props.x.length; i++) {
      sliderSteps.push({
        method: 'animate',
        label: props.x[i],
        args: [
          null,
          {
            mode: 'immediate',
            transition: { duration: 300 },
            frame: { duration: 300, redraw: false }
          }
        ]
      })
    }

    console.log('sliderSteps', sliderSteps)
  }
  var layout = {
    width: props.main === true ? 880 : 300,
    height: props.main === true ? 570 : 280,
    margin: props.main === true ? { l: 190 } : null,
    // xaxis: {
    //   title: 'Life Expectancy',
    //   range: [30, 85]
    // },
    // yaxis: {
    //   title: 'GDP per Capita',
    //   type: 'log'
    // },
    hovermode: 'closest',
    // We'll use updatemenus (whose functionality includes menus as
    // well as buttons) to create a play button and a pause button.
    // The play button works by passing `null`, which indicates that
    // Plotly should animate all frames. The pause button works by
    // passing `[null]`, which indicates we'd like to interrupt any
    // currently running animations with a new list of frames. Here
    // The new list of frames is empty, so it halts the animation.
    updatemenus: [
      {
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
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
                mode: 'immediate',
                fromcurrent: true,
                transition: { duration: 1000 },
                frame: { duration: 600, redraw: false }
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
                transition: { duration: 0 },
                frame: { duration: 0, redraw: false }
              }
            ],
            label: 'Pause'
          }
        ]
      }
    ],
    // Finally, add the slider and use `pad` to position it
    // nicely next to the buttons.
    sliders: [
      {
        pad: { l: 130, t: 55 },
        currentvalue: {
          visible: true,
          //  prefix: 'Year:',
          xanchor: 'right',
          font: { size: 20, color: '#666' }
        },
        steps: sliderSteps
      }
    ]
  }

  // useEffect(() => {
  //   // Create the plot:
  //   Plotly.newPlot('graph5', {
  //     data: props.data,
  //     layout: layout,
  //     config: { showSendToCloud: true },
  //     frames: frames
  //   })
  // }, [])

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
          Animating with a Slider
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div id='graph5' style={{ marginTop: -50, height: 240 }}>
              <Plot
                divId='graph5'
                style={{ marginTop: -50 }}
                frames={frames}
                data={[
                  {
                    x: props.x,
                    y: props.y
                  }
                ]}
                layout={layout}
                config={{
                  displaylogo: false,
                  displayModeBar: true,
                  showSendToCloud: true
                }}
              />
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
    <div>
      <div id='graph5'>
        <Plot
          divId='graph5'
          style={
            props.main === true
              ? { marginTop: 65, marginLeft: -20 }
              : { marginTop: -75 }
          }
          frames={frames}
          data={[
            {
              x: props.x,
              y: props.y,
              marker: {
                color: props.color1
              }
            }
          ]}
          layout={{
            width: props.main === true ? 880 : 300,
            height: props.main === true ? 570 : 280,
            margin: props.main === true ? { l: 190 } : null,
            // xaxis: {
            //   title: 'Life Expectancy',
            //   range: [30, 85]
            // },
            // yaxis: {
            //   title: 'GDP per Capita',
            //   type: 'log'
            // },
            hovermode: 'closest',
            // We'll use updatemenus (whose functionality includes menus as
            // well as buttons) to create a play button and a pause button.
            // The play button works by passing `null`, which indicates that
            // Plotly should animate all frames. The pause button works by
            // passing `[null]`, which indicates we'd like to interrupt any
            // currently running animations with a new list of frames. Here
            // The new list of frames is empty, so it halts the animation.
            updatemenus: [
              {
                x: 0,
                y: 0,
                yanchor: 'top',
                xanchor: 'left',
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
                        mode: 'immediate',
                        fromcurrent: true,
                        transition: { duration: 1000 },
                        frame: { duration: 600, redraw: false }
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
                        transition: { duration: 0 },
                        frame: { duration: 0, redraw: false }
                      }
                    ],
                    label: 'Pause'
                  }
                ]
              }
            ],
            // Finally, add the slider and use `pad` to position it
            // nicely next to the buttons.
            sliders: [
              {
                pad: { l: 130, t: 55 },
                currentvalue: {
                  visible: true,
                  //  prefix: 'Year:',
                  xanchor: 'right',
                  font: { size: 20, color: '#666' }
                },
                steps: sliderSteps
              }
            ]
          }}
          config={{
            displaylogo: false,
            displayModeBar: true,
            showSendToCloud: true
          }}
        />
      </div>
    </div>
  )
}
