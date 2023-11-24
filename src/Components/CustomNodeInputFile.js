import React, { useEffect, useState } from 'react'
import { Handle } from 'react-flow-renderer'
import Button from '@mui/material/Button'
import { CSVReader, readString, jsonToCSV } from 'react-papaparse'
import configData from '../config.json'

export default function CustomNodeComponentInputFile (props) {
  const removeStyle = {
    position: 'absolute',
    top: 28,
    right: 20,
    cursor: 'pointer',
    color: 'white'
  }
  const buttonRef = React.createRef()
  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  return (
    <>
      <div
        style={{
          background: configData.NODE_COLORS.BODY,
          color: '#FFF',
          height: '140px',
          width: '300px'
        }}
      >
        <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
          Add File
        </h3>
        {props.close == 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={props.setNodeDsp}
          >
            x
          </span>
        )}
        <CSVReader
          ref={buttonRef}
          onFileLoad={props.onFileLoad}
          onError={props.onError}
          noClick
          noDrag
          onRemoveFile={props.onRemoveFile}
        >
          {({ file }) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
                width: '100%'
              }}
            >
              <Button
                type='button'
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '80%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse file
              </Button>
              <div
                style={{
                  height: 45,
                  overflow: 'hidden',
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '90%'
                }}
              >
                {file && props.file == '' ? file.name : props.file}
              </div>
              <Button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={handleRemoveFile}
              >
                {' '}
                X{' '}
              </Button>
            </div>
          )}
        </CSVReader>
      </div>
      <Handle
        type='source'
        position='right'
        id='1'
        onConnect={props.onConnect}
        style={{
          right: '-19px',
          top: '56%',
          borderRadius: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          height: '142px',
          width: '20px',
          backgroundColor: configData.NODE_COLORS.HANDLE
        }}
      ></Handle>
    </>
  )
}
