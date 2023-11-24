import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeSortBlock (props) {
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
          height: '200px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '200px',
          width: '220px',
          margin: 10
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Sort</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column'
          }}
        >
          <div style={{ alignSelf: 'flex-start', marginLeft: 10 }}>
            Column Name:
          </div>
          <select
            onChange={props.onChange}
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 150,
              marginLeft: 10
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
          <div
            style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 }}
          >
            Order:
          </div>
          <select
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 105,
              marginLeft: 10
            }}
          >
            <option style={{ fontSize: 12 }} value={0}>
              {'Ascending'}
            </option>
            <option style={{ fontSize: 12 }} value={1}>
              {'Descending'}
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
          top: '52%',
          borderRadius: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          height: '200px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
