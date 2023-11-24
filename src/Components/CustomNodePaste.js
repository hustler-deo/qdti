import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodePaste (props) {
  const removeStyle = {
    position: 'absolute',
    top: 20,
    right: 25,
    cursor: 'pointer',
    color: 'white'
  }

  return (
    <>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '300px',
          width: '300px',
          padding: 4
        }}
      >
        {props.close == 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={props.setNodeDsp}
          >
            x
          </span>
        )}
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 4 }}>
          Copy Text
        </h3>
        <select onChange={props.selCpChange}>
          <option value='JSON'>JSON</option>
          <option value='CSV'>CSV</option>
          <option value='TEXT'>TEXT</option>
        </select>
        <br />
        <textarea onChange={props.cpTextFunc} cols={32} rows={12}></textarea>
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
          height: '300px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
