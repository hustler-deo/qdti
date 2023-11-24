/***
 *
 *   DASHBOARD
 *   Template dashboard example demonstrating various components inside a view.
 *
 **********/
import Card from '@mui/material/Card'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  isEdge,
  Handle,
  removeElements,
  addEdge,
  MiniMap,
  Controls
} from 'react-flow-renderer'
import { useHistory } from 'react-router-dom'
import ColorSelectorNode from '../DataBlocks/ColorSelectorNode'

import { CSVReader } from 'react-papaparse'

import Button from '@mui/material/Button'

const buttonRef = React.createRef()

const elementsFinalCustom = [
  {
    id: '1',
    type: 'specialA',
    position: { x: 60, y: 100 },
    data: { text: 'Input File Node' }
  },
  {
    id: '2',
    type: 'specialB',
    position: { x: 470, y: 150 },
    data: { text: 'Filter Node' }
  },
  {
    id: '3',
    type: 'specialC',
    position: { x: 790, y: 200 },
    data: { text: 'Barchart Node' }
  },
  {
    id: '4',
    type: 'specialD',
    position: { x: 1150, y: 250 },
    data: { text: 'Stats Node' }
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#000' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
    animated: true,
    style: { stroke: '#000' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#000' }
  }
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#7cc2ae',
    width: 800,
    height: 600
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9999
  }
}

export default function FinalStepwiseFlow () {
  const history = useHistory()

  const [stateElements2, setStateElements2] = useState(elementsFinalCustom)
  const reactFlowWrapper2 = useRef(null)

  const onConnect2 = useCallback(
    params =>
      setStateElements2(els =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)
      ),
    []
  )
  //** */

  useEffect(() => {}, [])

  const CustomNodeComponentInputFile = () => {
    return (
      <>
        <div
          style={{
            background: '#e8aa7c',
            color: '#FFF',
            height: '140px',
            width: '300px'
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Add File
          </h3>
          <CSVReader
            ref={buttonRef}
            // onFileLoad={handleOnFileLoad}
            // onError={handleOnError}
            noClick
            noDrag
            // onRemoveFile={handleOnRemoveFile}
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
                  // onClick={handleOpenDialog}
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
                  {file && file.name}
                </div>
                <Button
                  style={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingLeft: 20,
                    paddingRight: 20
                  }}
                  // onClick={handleRemoveFile}
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
          style={{
            right: '-19px',
            top: '57%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '140px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentFilterBlock = d1 => {
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
        <div
          style={{
            background: '#e8aa7c',
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentBarchartBlock = d1 => {
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
            height: '112px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
        <div
          style={{
            background: '#e8aa7c',
            color: '#FFF',
            height: '110px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Barchart
          </h3>
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
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
            height: '112px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentStatsBlock = d1 => {
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
            height: '112px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
        <div
          style={{
            background: '#e8aa7c',
            color: '#FFF',
            height: '110px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Stats</h3>
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {'<- Connect to dataset'}
          </p>
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
            height: '112px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const nodeTypes2 = {
    selectorNode: ColorSelectorNode,
    specialA: CustomNodeComponentInputFile,
    specialB: CustomNodeComponentFilterBlock,
    specialC: CustomNodeComponentBarchartBlock,
    specialD: CustomNodeComponentStatsBlock
  }

  return (
    <div className='dndflow'>
      <ReactFlowProvider>
        <div className='reactflow-wrapper' ref={reactFlowWrapper2}>
          <ReactFlow
            elements={stateElements2}
            style={{ height: 500, width: '100%', padding: '0' }}
            nodeTypes={nodeTypes2}
            onConnect={onConnect2}
            defaultZoom={0}
          >
            <MiniMap
              nodeStrokeColor={n => {
                if (n.type === 'specialA') return '#0041d0'
                if (n.type === 'specialB') return '#0041d0'
                if (n.type === 'specialC') return '#0041d0'
                if (n.type === 'specialD') return '#ff0072'
              }}
              nodeColor={n => {
                // if (n.type === 'selectorNode') return bgColor;
                return '#fff'
              }}
            />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}
