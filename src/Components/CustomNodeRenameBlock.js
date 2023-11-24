import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeRenameBlock (props) {
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
          top: '53%',
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          height: '110px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '110px',
          width: '220px',
          margin: 10
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Rename Column
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <select
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100
            }}
          >
            <option value=''>{'Connect...'}</option>
          </select>
          <select
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 105
            }}
          >
            <option style={{ fontSize: 12 }} value=''>
              {'new name'}
            </option>
          </select>
        </div>
      </div>
      <Handle
        type='source'
        position='right'
        id='a'
        style={{
          right: '-10px',
          top: '53%',
          borderRadius: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          height: '110px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
