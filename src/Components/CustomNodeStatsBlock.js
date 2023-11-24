import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import configData from '../config.json'
var annotations2 = []
export default function CustomNodeStatsBlock (props) {
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

  return (
    <>
      <Handle
        type='target'
        position='left'
        id='a'
        isValidConnection={connection => connection.source === '1'}
        onConnect={params => console.log('handle onConnect', params)}
        style={
          props.columns
            ? {
                left: '-10px',
                top: '51.5%',
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: '281px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
            : {
                left: '-10px',
                top: '51.5%',
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: '162px',
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
          props.columns
            ? {
                background: configData.NODE_COLORS.BODY,
                color: '#FFF',
                height: '280px',
                width: '250px',
                margin: 10
              }
            : {
                background: '#e8aa7c',
                color: '#FFF',
                height: '160px',
                width: '220px',
                margin: 10
              }
        }
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Stats</h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
        )}
        <Box sx={{ minWidth: 120, height: 10, marginTop: 1, marginLeft: 2 }}>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">age</InputLabel> */}
            <select
              style={{
                marginTop: 1,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 150,
                marginLeft: 40
              }}
              defaultValue={props.selected}
              // label="age"
              onChange={props.onChange}
            >
              {props.columns &&
                props.columns.map((value, index) => {
                  return (
                    <option style={{ fontSize: 14 }} key={index} value={index}>
                      {value}
                    </option>
                  )
                })}
              {/* <option value={0}>{props.column1}</option>
              <option value={1}>{props.column2}</option>
              <option value={2}>{props.column3}</option>
              <option value={3}>{props.column4}</option>
              <option value={4}>{props.column5}</option>
              <option value={5}>{props.column6}</option>
              <option value={6}>{props.column7}</option>
              <option value={7}>{props.column8}</option> */}
            </select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 140, marginTop: 0.5, marginLeft: 5 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginTop: 10 }}>
              <div style={{ marginTop: 14, color: 'black' }}>Min: </div>
              <div style={{ marginTop: 10, color: 'black' }}>Max: </div>
              <div style={{ marginTop: 14, color: 'black' }}>Sum: </div>
              <div style={{ marginTop: 10, color: 'black' }}>Avg: </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ marginTop: 14, color: 'black' }}>{props.min} </div>
              <div style={{ marginTop: 10, color: 'black' }}>{props.max} </div>
              <div style={{ marginTop: 14, color: 'black' }}>{props.sum} </div>
              <div style={{ marginTop: 10, color: 'black' }}>{props.avg} </div>
            </div>
          </div>
        </Box>
      </div>
      <Handle
        type='source'
        position='right'
        id='a'
        style={
          props.columns
            ? {
                right: '-10px',
                top: '51.5%',
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: '281px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
            : {
                right: '-10px',
                top: '53%',
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: '162px',
                width: '20px',
                backgroundColor: configData.NODE_COLORS.HANDLE
              }
        }
      ></Handle>
    </>
  )
}
