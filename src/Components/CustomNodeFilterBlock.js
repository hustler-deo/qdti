import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeFilterBlock (props) {
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
          top: '75%',
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
          height: '140px',
          width: '220px',
          margin: 10
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Filter Block
        </h3>
        <p style={{ marginLeft: 10, marginBottom: 0 }}>Column Name</p>
        <select
          style={{
            padding: 10,
            marginLeft: 10,
            background: 'transparent',
            border: '1px solid #FFF'
          }}
        >
          <option value=''>{'<- Connect to dataset'}</option>
        </select>
      </div>
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
          height: '140px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
