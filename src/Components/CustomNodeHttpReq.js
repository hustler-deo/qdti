import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Handle } from 'react-flow-renderer'
import configData from '../config.json'
export default function CustomNodeHttpReq (props) {
  const [cpText3, setCpText3] = useState('')

  const cpTextFunc3 = e => {
    console.log('In the CP function ' + e.target.value)
    setCpText3(e.target.value)
  }

  const getDataFromUrl = () => {
    // Do some things with props or state
    console.log(cpText3)
    fetch(cpText3)
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
          console.log(error)
        }
      )
  }
  return (
    <>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '150px',
          width: '300px',
          padding: 4
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 4 }}>
          Http Request Url
        </h3>

        <input
          onChange={cpTextFunc3}
          style={{ padding: 4, width: '90%', marginBottom: '-40px' }}
        ></input>
        <button
          style={{ background: '#CCC', marginTop: '8px', padding: '6px' }}
          onClick={getDataFromUrl}
        >
          Load Data
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
          height: '150px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      >
        {/* <div style={{}}></div> */}
      </Handle>
    </>
  )
}
