import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Plot from 'react-plotly.js'
import Plotly from 'plotly.js'
import configData from '../../../config.json'

var annotations2 = []
export default function FrameGroupsandAnimationModesBlock (props) {
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
  const [node1, setNode1] = useState(false)

  var i, j, t, x, y, name
  var frames = []
  var nFrames = 10
  var n = 80
  var reverseFrames = []

  useEffect(() => {
    if (props.x != undefined) plotGraph()
    else setNode1(true)
  }, [props.x != undefined])

  useEffect(() => {
    if (props.x && props.y) plotGraph()
  }, [node1 == false])

  const plotGraph = () => {
    for (i = 0; i < nFrames; i++) {
      var fill = 0.1 + (0.9 * i) / (nFrames - 1)
      x = [-1]
      y = [0]

      // A wave across the top:
      for (j = 0; j < n; j++) {
        t = j / (n - 1)
        x.push(-1 - fill + (2 + 2 * fill) * t)
        y.push(fill + 0.05 * Math.sin(t * Math.PI * 2 * i))
      }

      // Close the loop to draw the water:
      x.push(1, -1)
      y.push(0, 0)

      // Choose a name:
      name = 'frame' + i

      // Store it in an array so we can animate in reverse order:
      reverseFrames.unshift(name)

      // Create the frame:
      frames.push({
        name: name,
        data: [{ x: x, y: y }],
        group: i < nFrames / 2 ? 'lower' : 'upper'
      })
    }
    Plotly.newPlot(
      'graph7',
      [
        {
          // Set up the initial water:
          x: props.x,
          y: props.y,
          name: 'Color1',
          mode: 'lines',
          fill: 'toself',
          showlegend: false,
          line: { simplify: false, color: props.color1 },
          marker: {
            color: props.color1
          }
        },
        {
          // Draw a glass:
          x: props.x,
          y: props.y,
          name: 'Color2',
          mode: 'lines',
          fill: 'toself',
          showlegend: false,
          fillcolor: 'rgba(0, 0, 0, 0.1)',
          line: { color: props.color2 },
          marker: {
            color: props.color2
          }
        }
      ],
      {
        xaxis: { autorange: true, title: props.xName },
        yaxis: { autorange: true, title: props.yName }
      },
      { showSendToCloud: true, displaylogo: false, displayModeBar: true }
    ).then(function () {
      // Add the frames so we can animate them:
      Plotly.addFrames('graph7', frames)
    })
  }

  useEffect(() => {
    plotGraph()
  }, [props.color1, props.color2])

  // Stop the animation by animating to an empty set of frames:
  function stopAnimation () {
    Plotly.animate('graph7', [], { mode: 'next' })
  }

  function startAnimation (groupOrFrames, mode) {
    Plotly.animate('graph7', groupOrFrames, {
      transition: {
        duration: 500,
        easing: 'linear'
      },
      frame: {
        duration: 500,
        redraw: false
      },
      mode: mode
    })
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
          Frame Groups and Animation Modes
        </h3>
        <div style={{ display: 'flex' }}>
          <code>group:</code>
          <button onClick={() => startAnimation(null, 'immediate')}>
            <code>null</code> (all frames)
          </button>
          <button onClick={() => startAnimation(reverseFrames, 'immediate')}>
            <code>[frames in reverse]</code>
          </button>
          <button onClick={() => stopAnimation()}>
            <code>[]</code> (stop)
          </button>
          <button onClick={() => startAnimation('lower', 'immediate')}>
            <code>'lower'</code>
          </button>
          {/* <button onClick={() => startAnimation('upper', 'immediate')}>
            <code>'upper'</code>
          </button>
          <br></br>
          <code>mode:</code>
          <button onClick={() => startAnimation(null, 'immediate')}>
            <code>'immediate'</code>
          </button>
          <button onClick={() => startAnimation(null, 'next')}>
            <code>'next'</code>
          </button>
          <button onClick={() => startAnimation(null, 'afterall')}>
            <code>'afterall'</code>
          </button> */}
        </div>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <div style={{ overflow: 'hidden', height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div id='graph7' style={{ marginTop: -50, height: 200 }}></div>
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
    <>
      <div
        style={
          props.main
            ? {
                zIndex: 2,
                display: 'flex',
                marginTop: 180,
                marginLeft: 120,
                postion: 'absolute'
              }
            : {
                zIndex: 2,
                display: 'flex',
                marginTop: 200,
                marginLeft: 8,
                postion: 'absolute'
              }
        }
      >
        <code>group:</code>
        <button onClick={() => startAnimation(null, 'immediate')}>
          <code>null</code> (all frames)
        </button>
        <button onClick={() => startAnimation(reverseFrames, 'immediate')}>
          <code>[frames in reverse]</code>
        </button>
        <button onClick={() => stopAnimation()}>
          <code>[]</code> (stop)
        </button>
        <button onClick={() => startAnimation('lower', 'immediate')}>
          <code>'lower'</code>
        </button>
        <button onClick={() => startAnimation('upper', 'immediate')}>
          <code>'upper'</code>
        </button>
        <br></br>
        {/* <code>mode:</code>
        <button onClick={() => startAnimation(null, 'immediate')}>
          <code>'immediate'</code>
        </button>
        <button onClick={() => startAnimation(null, 'next')}>
          <code>'next'</code>
        </button>
        <button onClick={() => startAnimation(null, 'afterall')}>
          <code>'afterall'</code>
        </button> */}
      </div>

      <div style={{ zIndex: 1 }}>
        <div style={{ marginTop: -65 }}>
          <div
            id='graph7'
            style={
              props.main === true
                ? { marginTop: 65, marginLeft: 100, width: 700, height: 450 }
                : { marginTop: -320, marginLeft: 15, height: 260, width: 400 }
            }
          ></div>
        </div>
      </div>
    </>
  )
}
