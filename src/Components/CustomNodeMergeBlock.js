import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeMergeBlock (props) {
  const removeStyle = {
    position: 'absolute',
    top: 20,
    right: 25,
    cursor: 'pointer',
    color: 'white'
  }

  return (
    <>
      <Handle
        type='target'
        position='left'
        id='a'
        isValidConnection={connection => connection.source === '1'}
        onConnect={params => console.log('handle onConnect', params)}
        style={{
          left: '-10px',
          top: '45%',
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          height: '20px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
      <Handle
        type='target'
        position='left'
        id='a'
        isValidConnection={connection => connection.source === '1'}
        onConnect={params => console.log('handle onConnect', params)}
        style={{
          left: '-10px',
          top: '70%',
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          height: '20px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '160px',
          width: '220px',
          margin: 10
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Merge</h3>
        <select
          style={{
            padding: 10,
            marginTop: 2,
            marginLeft: 10,
            background: 'transparent',
            border: '1px solid #FFF'
          }}
        >
          <option value=''>{'<- Connect to dataset'}</option>
        </select>
        <select
          style={{
            padding: 10,
            marginTop: 8,
            marginLeft: 10,
            background: 'transparent',
            border: '1px solid #FFF'
          }}
        >
          <option value=''>{'<- Connect to dataset'}</option>
        </select>
        <p>merged 0 rows</p>
      </div>
      {props.close == 1 && (
        <span className='remove' style={removeStyle} onClick={props.setNodeDsp}>
          x
        </span>
      )}
      <Handle
        type='source'
        position='right'
        id='a'
        style={{
          right: '-10px',
          top: '52%',
          borderRadius: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          height: '160px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
