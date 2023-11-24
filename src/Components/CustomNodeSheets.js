import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeSheets (props) {
  return (
    <>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '160px',
          width: '250px',
          padding: 4
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 2 }}>
          Google Sheet Id
        </h3>
        <input
          onChange={props.onChange}
          style={{ padding: 6, width: '90%' }}
        ></input>
        <button
          style={{ background: '#CCC', marginTop: '10px', padding: '8px' }}
          onClick={props.onClick}
        >
          {props.btnText}
        </button>
      </div>
      <Handle
        type='source'
        position='right'
        id='a'
        style={{
          right: '-10px',
          top: '50%',
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
