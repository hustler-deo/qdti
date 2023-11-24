import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeGroupBlock (props) {
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
          top: '52%',
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          height: '180px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
      {props.close == 1 && (
        <span className='remove' style={removeStyle} onClick={props.setNodeDsp}>
          x
        </span>
      )}
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '180px',
          width: '220px',
          margin: 10
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Group Block
        </h3>
        <p style={{ marginLeft: 10, marginBottom: 2 }}>Column Name</p>
        {!props.data ? (
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
        ) : (
          <select
            onChange={props.onChange}
            style={{
              marginTop: -4,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            <option style={{ fontSize: 14 }} value={0}>
              {props.column1}
            </option>
            <option style={{ fontSize: 14 }} value={1}>
              {props.column2}
            </option>
            <option style={{ fontSize: 14 }} value={2}>
              {props.column3}
            </option>
            <option style={{ fontSize: 14 }} value={3}>
              {props.column4}
            </option>
            <option style={{ fontSize: 14 }} value={4}>
              {props.column5}
            </option>
            <option style={{ fontSize: 14 }} value={5}>
              {props.column6}
            </option>
            <option style={{ fontSize: 14 }} value={6}>
              {props.column7}
            </option>
            <option style={{ fontSize: 14 }} value={7}>
              {props.column8}
            </option>
          </select>
        )}

        <div>
          <button
            style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
            // onClick={}
          >
            Group
          </button>
        </div>
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
          height: '180px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
