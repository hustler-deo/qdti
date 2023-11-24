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
import Modal from 'react-modal'
//import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Chart } from 'react-google-charts'
import '../CustomFlows/DnDFlow'
// import DataTable from 'react-data-table-component';
// import * as XLSX from 'xlsx';
import { CSVReader, readString, jsonToCSV } from 'react-papaparse'
// import 'chartkick/chart.js'
import ColorSelectorNode from './ColorSelectorNode'
import Spreadsheet from 'react-spreadsheet'
import JSONViewer from 'react-json-viewer'
import Tabletop from 'tabletop'
import MiniDrawer from '../MiniDrawer'
import CustomNodeBarchartBlock from '../Components/CustomNodeBarchartBlock'
import CustomNodeInputFile from '../Components/CustomNodeInputFile'
import CustomNodePaste from '../Components/CustomNodePaste'
import CustomNodeHttpReq from '../Components/CustomNodeHttpReq'
import CustomNodeFilterBlock from '../Components/CustomNodeFilterBlock'
import CustomNodeGroupBlock from '../Components/CustomNodeGroupBlock'
import CustomNodeMergeBlock from '../Components/CustomNodeMergeBlock'
import CustomNodeSliceBlock from '../Components/CustomNodeSliceBlock'
import CustomNodeRenameBlock from '../Components/CustomNodeRenameBlock'
import CustomNodeSortBlock from '../Components/CustomNodeSortBlock'
import CustomNodeHistogramBlock from '../Components/CustomNodeHistogramBlock'
import CustomNodeScatterplotBlock from '../Components/CustomNodeScatterplotBlock'
import CustomNodeTimeseriesBlock from '../Components/CustomNodeTimeseriesBlock'
import CustomNodeStatsBlock from '../Components/CustomNodeStatsBlock'
import CustomNodeExportBlock from '../Components/CustomNodeExportBlock'
import CustomNodeSheets from '../Components/CustomNodeSheets'

// import './index.css';

const exampleData = [
  [
    { value: '1' },
    { value: 'Home Page' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'Done' },
    { value: '' },
    { value: 'Pooja' },
    { value: '' },
    { value: 'Medium' }
  ],
  [
    { value: '2' },
    { value: 'Mega menu Complete' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'Done' },
    { value: '' },
    { value: 'Abdul' },
    { value: 'Code Merge Pending' },
    { value: 'Medium' }
  ],
  [
    { value: '3' },
    { value: 'Product landing page' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'Done' },
    { value: '' },
    { value: 'Pooja' },
    { value: 'Code Merge Pending' },
    { value: 'Medium' }
  ],
  [
    { value: '4' },
    { value: 'product listing page + Quick View option' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'Done' },
    { value: '' },
    { value: 'Pooja' },
    { value: 'Code Merge Pending' },
    { value: 'HIGH' }
  ],
  [
    { value: '5' },
    { value: 'Product decription page' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'Done' },
    { value: '' },
    { value: 'Pooja' },
    { value: 'Code Merge Pending' },
    { value: 'Medium' }
  ],
  [
    { value: '6' },
    { value: 'Services landing page' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'In-Progress' },
    { value: '' },
    { value: 'Abdul' },
    { value: '' },
    { value: 'Medium' }
  ],
  [
    { value: '7' },
    { value: 'Services listing page' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'In Progress' },
    { value: '' },
    { value: 'Pooja' },
    { value: '' },
    { value: 'HIGH' }
  ],
  [
    { value: '8' },
    { value: 'Services description' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'In Progress' },
    { value: '' },
    { value: 'Pooja' },
    { value: '' },
    { value: 'Medium' }
  ],
  [
    { value: '9' },
    { value: 'Empty bag screen' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'In Progress' },
    { value: '' },
    { value: 'Abdul' },
    { value: '' },
    { value: 'Medium' }
  ],
  [
    { value: '10' },
    { value: 'Service time slot selection' },
    { value: 'Done' },
    { value: 'Sent' },
    { value: 'In Progress' },
    { value: '' },
    { value: 'Abdul' },
    { value: '' },
    { value: 'HIGH' }
  ]
]

var arr = {
  median: function (array) {
    array.sort(function (a, b) {
      return a - b
    })
    var mid = array.length / 2
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2
  }
}

const elementsCustom = [
  {
    id: '2',
    type: 'special',
    position: { x: 60, y: 100 },
    isHidden: true,
    data: { text: 'Input FIle Node' },
    data2: { label: [] }
  },
  {
    id: '3',
    type: 'special2',
    isHidden: true,
    position: { x: 500, y: 100 },
    data: { text: 'COpy Paste Node' },
    data2: { label: [] }
  },
  {
    id: '4',
    type: 'special3',
    isHidden: true,
    position: { x: 100, y: 220 },
    data: { text: 'Sheets Node' },
    data2: { label: [] }
  },
  {
    id: '5',
    type: 'special4',
    isHidden: true,
    position: { x: 850, y: 0 },
    data: { text: 'Url Node' },
    data2: { label: [] }
  },
  {
    id: '6',
    type: 'special5',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Filter Node' },
    data2: { label: [] }
  },
  {
    id: '7',
    type: 'special6',
    isHidden: true,
    position: { x: 350, y: 70 },
    data: { text: 'Slice Node' },
    data2: { label: [] }
  },
  {
    id: '8',
    type: 'special7',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Slice Node' },
    data2: { label: [] }
  },
  {
    id: '9',
    type: 'special8',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Slice Node' },
    data2: { label: [] }
  },
  {
    id: '10',
    type: 'special9',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Slice Node' },
    data2: { label: [] }
  },
  {
    id: '11',
    type: 'special10',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Rename Column Node' },
    data2: { label: [] }
  },
  {
    id: '12',
    type: 'special11',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Barchart Node' },
    data2: { label: [] }
  },
  {
    id: '13',
    type: 'special12',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Histogram Node' },
    data2: { label: [] }
  },
  {
    id: '14',
    type: 'special13',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Scatterplot Node' },
    data2: { label: [] }
  },
  {
    id: '15',
    type: 'special14',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Timeseries Node' },
    data2: { label: [] }
  },
  {
    id: '16',
    type: 'special15',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Stats Node' },
    data2: { label: [] }
  },
  {
    id: '17',
    type: 'special16',
    isHidden: true,
    position: { x: 350, y: 0 },
    data: { text: 'Export Node' },
    data2: { label: [] }
  }
]

const testData = [
  { text: 'Man', value: 500 },
  { text: 'Woman', value: 300 },
  { text: 'Man2', value: 500 },
  { text: 'Woman2', value: 300 },
  { text: 'Man3', value: 500 },
  { text: 'Woman3', value: 300 }
]
const d = [
  ['Age', 'Weight'],
  ['value', '5.5'],
  ['value', '12']
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

// let id = 0;
// const getId = () => `dndnode_${id++}`;
Modal.setAppElement(document.getElementById('root'))

function init () {
  Tabletop.init({
    key: '2PACX-1vSARJKvpJqXydRqji4kHZhoDiEvMIu1-mPKlHnVP8ClMlb4Qd2luRZdf6rqrcjpCzQjMnK0SjCWEan9',
    simpleSheet: true
  }).then(function (data, tabletop) {
    console.log(data)
  })
}
window.addEventListener('DOMContentLoaded', init)

export function DnDFlow2 () {
  var result
  var min
  var max
  var sum
  var avg
  var columns,
    column1,
    column2,
    column3,
    column4,
    column5,
    column6,
    column7,
    column8
  var sc,
    s,
    l,
    sortType = '0',
    newColumnName = '',
    condition,
    input

  const inputOptions = {
    section1: [
      {
        title: 'File',
        subtitle: 'Handles CSV, json,geojson or topojson files.',
        onpress: () => {
          onAdd()
        }
      },
      {
        title: 'Paste',
        subtitle:
          'Paste input: string, number, csv, json, geojson or topojson.',
        onpress: () => {
          onAdd2()
        }
      },
      {
        title: 'Http Request',
        subtitle: 'Loads data via a http request.',
        onpress: () => {
          onAdd3()
        }
      }
    ],
    section2: [
      {
        title: 'Sheets',
        subtitle: 'Loads data from google sheets.',
        onpress: () => {
          onAdd4()
        }
      },
      {
        title: 'Example Data',
        subtitle: 'Some example data for playing around with data blocks.',
        onpress: () => {
          applyExpData()
        }
      }
    ]
  }

  const transformOptions = {
    section1: [
      {
        title: 'Filter',
        subtitle: 'Groups a data set based on a given column name.',
        onpress: () => {
          onAdd5()
        }
      },
      {
        title: 'Merge',
        subtitle: 'Merges two data sets based on the given column names.',
        onpress: () => {
          onAdd6()
        }
      },
      {
        title: 'Group',
        subtitle: 'Groups a data set based on a given column name.',
        onpress: () => {
          onAdd7()
        }
      }
    ],
    section2: [
      {
        title: 'Slice',
        subtitle: 'Slices a data set based on indices.',
        onpress: () => {
          onAdd8()
        }
      },
      {
        title: 'Sort',
        subtitle: 'Sorts data based on a given column.',
        onpress: () => {
          onAdd9()
        }
      },
      {
        title: 'Rename Columns',
        subtitle: 'Renames multiple columns.',
        onpress: () => {
          onAdd10()
        }
      }
    ]
  }

  const visualizationOptions = {
    section1: [
      {
        title: 'Barchart',
        subtitle: 'Displays a Barchart of given x and y column names.',
        onpress: () => {
          onAdd11()
        }
      },
      {
        title: 'Histogram',
        subtitle: 'Displays a histogram of a given column name.',
        onpress: () => {
          onAdd12()
        }
      },
      {
        title: 'Scatterplot',
        subtitle: 'Displays a scatterplot of given x and y column names.',
        onpress: () => {
          onAdd13()
        }
      }
    ],
    section2: [
      {
        title: 'Time Series',
        subtitle:
          'Displays a Timeseries line chart of given x and y column names.',
        onpress: () => {
          onAdd14()
        }
      }
    ]
  }

  const miscOptions = {
    section1: [
      {
        title: 'Stats',
        subtitle:
          'Gives you min, max, avg, mean and count of a given column name.',
        onpress: () => {
          onAdd15()
          Workflow()
        }
      },
      {
        title: 'Export',
        subtitle: 'Lets you export data as csv, json or geojson.',
        onpress: () => {
          onAdd16()
          Workflow()
        }
      }
    ]
  }

  const [node1, setNode1] = useState('')
  const [node2, setNode2] = useState('')
  const [node3, setNode3] = useState('')
  const [node4, setNode4] = useState('')

  const elementsFinalCustom = [
    {
      id: '1',
      type: node1,
      isHidden: false,
      position: { x: 60, y: 100 },
      data: { text: '' }
    },
    {
      id: '2',
      type: node2,
      isHidden: false,
      position: { x: 470, y: 150 },
      data: { text: '' }
    },
    {
      id: '3',
      type: node3,
      isHidden: false,
      position: { x: 790, y: 200 },
      data: { text: '' }
    },
    {
      id: '4',
      type: node4,
      isHidden: false,
      position: { x: 1150, y: 250 },
      data: { text: '' }
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

  let subtitle
  const [showWorkflow, setShowworkFLow] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [nodeName, setNodeName] = useState('Node 1')
  const [selectedColumn, setSelectedColumn] = useState(0)
  const [startIndex, setstartIndex] = useState(0)
  const [lastIndex, setlastIndex] = useState(1)
  const [ascending, setAscending] = useState(true)
  const [dt, setDt] = useState([])
  const [dt2, setDt2] = useState([])
  const [dsp, setDsp] = useState('1')
  const [cpText, setCpText] = useState('')
  const [cpText2, setCpText2] = useState('')
  const [cpText3, setCpText3] = useState('')
  const [expData, setExpData] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [connect, setConnect] = useState(false)
  const [display, setDisplay] = useState(false)
  const [stateElements2, setStateElements2] = useState(elementsFinalCustom)
  const [stateElements, setStateElements] = useState(elementsCustom)
  const [selCpText, setSelCpText] = useState('JSON')
  const [btnText, setBtnText] = useState('Load Data')
  const [spreadSheetUrl, setSpreadSheetUrl] = useState('')
  const [spreadSheetData, setSpreadSheetData] = useState('')
  // const [sortType, setSortType] = useState('asc');
  const reactFlowWrapper = useRef(null)

  const onConnect = params => setStateElements(els => addEdge(params, els))
  const onConnect2 = useCallback(
    params =>
      setStateElements2(els =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)
      ),
    []
  )
  useEffect(() => {
    setStateElements(els =>
      els.map(e => {
        e.id === dsp && (e.isHidden = false)
        return e
      })
    )
  }, [isHidden, dsp, cpText3, dt, startIndex, lastIndex])

  useEffect(() => {
    setStateElements(els =>
      els.map(el => {
        if (el.id === '12' || el.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change

          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            text: nodeName
          }
        }

        return el
      })
    )
  }, [setStateElements, dt])

  useEffect(() => {
    console.log(node1, node2, node3, node4)
    setStateElements2(els =>
      els.map(e => {
        if (e.id == '1') e.type = node1
        if (e.id == '2') e.type = node2
        if (e.id == '3') e.type = node3
        if (e.id == '4') e.type = node4

        return e
      })
    )
  }, [showWorkflow])

  const handleOnFileLoad = data => {
    setExpData(false)
    console.log('---------------------------')

    var temp = []
    data.map(e => {
      var temp1 = []
      e.data.map(e2 => {
        temp1.push({ value: e2 })
      })
      temp.push(temp1)
    })
    setDt(temp)

    result = data.map(e => e.data)
    //  console.log(JSON.stringify(result));
    setDt2(result)
    // result2 = JSON.stringify(result);
    // console.log(JSON.stringify(result2));

    var j = 1
    for (var k = 1; k < result.length; k++) {
      if (selectedColumn == 1) {
        j = 1
        min = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] < min) {
            min = result[i][1]
          }
        }
      }
      if (selectedColumn == 2) {
        j = 2
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (selectedColumn == 3) {
        j = 3
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (selectedColumn == 4) {
        j = 4
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (selectedColumn == 5) {
        j = 5
        min = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] < min) {
            min = result[i][1]
          }
        }
      }
      if (selectedColumn == 6) {
        j = 6
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (selectedColumn == 7) {
        j = 7
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (selectedColumn == 8) {
        j = 8
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
    }

    //for max
    var j = 1
    for (var k = 1; k < result.length; k++) {
      if (selectedColumn == 1) {
        j = 1
        max = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] > max) {
            max = result[i][1]
          }
        }
      }
      if (selectedColumn == 2) {
        j = 2
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (selectedColumn == 3) {
        j = 3
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (selectedColumn == 4) {
        j = 4
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (selectedColumn == 5) {
        j = 5
        max = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] > max) {
            max = result[i][1]
          }
        }
      }
      if (selectedColumn == 6) {
        j = 6
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (selectedColumn == 7) {
        j = 7
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (selectedColumn == 8) {
        j = 8
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
    }
    sum = 0
    var count = 0
    var j = selectedColumn
    var num

    for (var i = 1; i < result.length; i++) {
      num = parseInt(result[i][j])
      sum = sum + num
      count++
    }
    avg = sum / count

    //sort for median
    // var j = selectedColumn;
    // var median;
    // var done = false;

    // while (!done) {
    //   done = true;
    //   for (var i = 2; i < result.length; i += 1) {
    //     if (result[i - 1][j] > result[i][j]) {
    //       done = false;
    //       var tmp = result[i - 1][j];
    //       result[i - 1][j] = result[i][j];
    //       result[i][j] = tmp;
    //     }
    //   }
    // }
    // var sorted = result

    // const mid = Math.ceil(sorted.length / 2);

    // median =
    //   sorted.length % 2 == 0 ? (sorted[mid] + sorted[mid - 1]) / 2 : sorted[mid - 1];

    // for (var i = 2; i < result.length; i++) {
    //   const middle = Math.floor(sorted[i][j].length / 2);
    //   if (sorted[i][j].length % 2 === 0) {
    //     return (sorted[middle - 1] + sorted[middle]) / 2;
    //   }
    //   median = sorted[middle];
    // }
    //console.log("median: ", median);

    columns = result.slice(0, 1)
    const c1 = columns[0]
    column1 = c1[0]
    column2 = c1[1]
    column3 = c1[2]
    column4 = c1[3]
    column5 = c1[4]
    column6 = c1[5]
    column7 = c1[6]
    column8 = c1[7]
    // var max = arr.max(result)
    // console.log(min)
    // console.log(max)

    console.log(selectedColumn)
    console.log(min)
    console.log(max)
    console.log(avg)
    console.log(sum)
    console.log(result)
    console.log(data)

    // console.log(result[1][1])
    // console.log(result[2][1])
    console.log('---------------------------')
  }

  const saveFlow = () => {
    fetch('https://52.32.42.135:4141/users/')
      .then(res => res.json())
      .then(json => {
        console.log('I am in saved FLow ')
        setShowworkFLow(json)
        // this.setState({
        //     items: json,
        //     DataisLoaded: true
        // });
      })
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = data => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleChange = event => {
    setSelectedColumn(event.target.value)
    sc = event.target.value

    var j = 1
    for (var k = 1; k < result.length; k++) {
      if (sc == 1) {
        j = 1
        min = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] < min) {
            min = result[i][1]
          }
        }
      }
      if (sc == 2) {
        j = 2
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (sc == 3) {
        j = 3
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (sc == 4) {
        j = 4
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (sc == 5) {
        j = 5
        min = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] < min) {
            min = result[i][1]
          }
        }
      }
      if (sc == 6) {
        j = 6
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (sc == 7) {
        j = 7
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
      if (sc == 8) {
        j = 8
        min = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] < min) {
            min = result[i][j]
          }
        }
      }
    }

    //for max
    var j = 1
    for (var k = 1; k < result.length; k++) {
      if (sc == 1) {
        j = 1
        max = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] > max) {
            max = result[i][1]
          }
        }
      }
      if (sc == 2) {
        j = 2
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (sc == 3) {
        j = 3
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (sc == 4) {
        j = 4
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (sc == 5) {
        j = 5
        max = result[1][1]
        for (var i = 1; i < result.length; i++) {
          if (result[i][1] > max) {
            max = result[i][1]
          }
        }
      }
      if (sc == 6) {
        j = 6
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (sc == 7) {
        j = 7
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
      if (sc == 8) {
        j = 8
        max = result[1][j]
        for (var i = 1; i < result.length; i++) {
          if (result[i][j] > max) {
            max = result[i][j]
          }
        }
      }
    }

    sum = 0
    var count = 0
    var j = sc
    var num

    for (var i = 1; i < result.length; i++) {
      num = parseInt(result[i][j])
      sum = sum + num
      count++
    }
    avg = sum / count

    //sort
    var j = selectedColumn
    console.log('j-', j)
    var sorted
    var done = false

    while (!done) {
      done = true
      for (var i = 2; i < result.length; i += 1) {
        if (result[i - 1][j] > result[i][j]) {
          done = false
          var tmp = result[i - 1][j]
          result[i - 1][j] = result[i][j]
          result[i][j] = tmp
        }
      }
    }
    sorted = result
  }

  const handleSortType = event => {
    sortType = event.target.value
    console.log('sortt-', sortType)
  }

  const handleRenameColumn = event => {
    setSelectedColumn(event.target.value)
    var column = event.target.value

    result[(0, 0)][column] = newColumnName
  }

  const handleFilter = event => {
    var column = event.target.value
    var done = false
    var result4 = []
    result4.push(result[(0, 0)])
    console.log(result4)
    while (!done) {
      done = true
      for (var i = 2; i < result.length; i += 1) {
        if (condition == 0) {
          if (result[i - 1][column] == input) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 1) {
          if (result[i - 1][column] != input) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 2) {
          if (parseInt(result[i - 1][column]) == parseInt(input)) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 3) {
          if (parseInt(result[i - 1][column]) > parseInt(input)) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 4) {
          if (parseInt(result[i - 1][column]) >= parseInt(input)) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 5) {
          if (parseInt(result[i - 1][column]) < parseInt(input)) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 6) {
          if (parseInt(result[i - 1][column]) <= parseInt(input)) {
            result4.push(result[i - 1])
          }
        }
      }
    }

    console.log('filtered', result4)
    //converted for displaying data
    var temp2 = []
    result4.map(e => {
      var temp3 = []
      e.map(e2 => {
        temp3.push({ value: e2 })
      })
      temp2.push(temp3)
    })
    console.log(temp2)
    setDt(temp2) //display data
  }

  const handleFilterCondition = event => {
    condition = event.target.value
  }

  const showData = () => {
    //converted for displaying data
    var temp2 = []
    result.map(e => {
      var temp3 = []
      e.map(e2 => {
        temp3.push({ value: e2 })
      })
      temp2.push(temp3)
    })
    console.log(temp2)
    setDt(temp2)
    console.log('....')
  }

  const handleGroup = event => {
    var column = event.target.value
    var done = false

    // while (!done) {
    //     done = true;
    //     for (var i = 2; i < result.length; i += 1) {

    //     }
    // }
  }

  const handleSortAsc = event => {
    setSelectedColumn(event.target.value)
    var j = event.target.value
    //sort``
    console.log('sc--', event.target.value)
    var sorted
    var done = false

    while (!done) {
      done = true
      for (var i = 2; i < result.length; i += 1) {
        if (parseInt(result[i - 1][j]) > parseInt(result[i][j])) {
          done = false
          var tmp = result[i - 1][j]
          result[i - 1][j] = result[i][j]
          result[i][j] = tmp
        }
      }
    }
    sorted = result
    console.log(result[(0, 0)][0])
    console.log('sorted-', sorted)

    //converted for displaying data
    var temp2 = []
    sorted.map(e => {
      var temp3 = []
      e.map(e2 => {
        temp3.push({ value: e2 })
      })
      temp2.push(temp3)
    })
    console.log(temp2)
    setDt(temp2)
    console.log('....')
  }

  const handleSortDesc = event => {
    setSelectedColumn(event.target.value)
    setAscending(event.target.value)
    var j = event.target.value
    //sort
    console.log(event.target.value)
    var sorted
    var done = false

    while (!done) {
      done = true
      for (var i = 2; i < result.length; i += 1) {
        if (parseInt(result[i - 1][j]) < parseInt(result[i][j])) {
          done = false
          var tmp = result[i - 1][j]
          result[i - 1][j] = result[i][j]
          result[i][j] = tmp
        }
      }
    }
    sorted = result
    console.log('sorted-', sorted)

    //converted for displaying data
    var temp2 = []
    sorted.map(e => {
      var temp3 = []
      e.map(e2 => {
        temp3.push({ value: e2 })
      })
      temp2.push(temp3)
    })
    console.log(temp2)
    setDt(temp2)
    console.log('....')
  }

  const handleSlice = () => {
    //slice
    // console.log('start', startIndex)
    // console.log('last', lastIndex)

    var p = result.slice(s, l)
    console.log('sliced', p)

    var t2 = []
    p.map(e => {
      var t3 = []
      e.map(e2 => {
        t3.push({ value: e2 })
      })
      t2.push(t3)
    })
    console.log(t2)
    setDt(t2)
    console.log('....')
  }

  const CustomNodeComponentInputFile = () => {
    return (
      <CustomNodeInputFile
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        onRemoveFile={handleOnRemoveFile}
        onConnect={params => {
          setConnect(true)
        }}
      />
    )
  }

  const CustomNodeComponentPaste = d1 => {
    return <CustomNodePaste selCpText={selCpChange} cpTextFunc={cpTextFunc} />
  }

  let fetchSheetData = () => {
    console.log('I reached here ')
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSARJKvpJqXydRqji4kHZhoDiEvMIu1-mPKlHnVP8ClMlb4Qd2luRZdf6rqrcjpCzQjMnK0SjCWEan9/pubhtml?gid=0&single=true',
      simpleSheet: true
    })
      .then(data => {
        setSpreadSheetData(data)
        console.log(JSON.stringify(data, null, 2))
      })
      .catch(err => console.warn(err))
  }

  const CustomNodeComponentSheets = d1 => {
    return (
      <CustomNodeSheets
        onChange={cpTextFunc2}
        onClick={fetchSheetData}
        btnText={btnText}
      />
    )
  }

  const CustomNodeComponentHttpReq = d1 => {
    return <CustomNodeHttpReq />
  }

  const CustomNodeComponentFilterBlock = d1 => {
    return (
      // <CustomNodeFilterBlock />
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
            height: '220px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Filter Block
          </h3>
          <p style={{ marginLeft: 10, marginBottom: 0 }}>Column Name</p>
          <select
            onChange={handleFilter}
            style={{
              marginTop: -12,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            <option style={{ fontSize: 14 }} value={0}>
              {column1}
            </option>
            <option style={{ fontSize: 14 }} value={1}>
              {column2}
            </option>
            <option style={{ fontSize: 14 }} value={2}>
              {column3}
            </option>
            <option style={{ fontSize: 14 }} value={3}>
              {column4}
            </option>
            <option style={{ fontSize: 14 }} value={4}>
              {column5}
            </option>
            <option style={{ fontSize: 14 }} value={5}>
              {column6}
            </option>
            <option style={{ fontSize: 14 }} value={6}>
              {column7}
            </option>
            <option style={{ fontSize: 14 }} value={7}>
              {column8}
            </option>
          </select>

          <p style={{ marginLeft: 10, marginBottom: 0, marginTop: 8 }}>
            Condition
          </p>
          <select
            onChange={handleFilterCondition}
            style={{
              marginTop: -4,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            <option style={{ fontSize: 14 }} value={0}>
              {'text is exactly'}
            </option>
            <option style={{ fontSize: 14 }} value={1}>
              {'text is not exactly'}
            </option>
            <option style={{ fontSize: 14 }} value={2}>
              {'number equals'}
            </option>
            <option style={{ fontSize: 14 }} value={3}>
              {'number is greater than'}
            </option>
            <option style={{ fontSize: 14 }} value={4}>
              {'number is greater than or equals'}
            </option>
            <option style={{ fontSize: 14 }} value={5}>
              {'number is lesser than'}
            </option>
            <option style={{ fontSize: 14 }} value={6}>
              {'number is lesser than or equals'}
            </option>
          </select>

          <input
            style={{ marginLeft: 10, marginBottom: 2, marginTop: 10 }}
            type={'text'}
            defaultValue={null}
            onChange={e => (input = e.target.value)}
          />
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
            height: '220px',
            width: '20px',
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentGroupBlock = d1 => {
    return (
      <CustomNodeGroupBlock
        data={result}
        onChange={handleGroup}
        column1={column1}
        column2={column2}
        column3={column3}
        column4={column4}
        column5={column5}
        column6={column6}
        column7={column7}
        column8={column8}
      />
    )
  }

  const CustomNodeComponentMergeBlock = d1 => {
    return <CustomNodeMergeBlock />
  }

  const CustomNodeComponentSliceBlock = d1 => {
    return (
      // <CustomNodeSliceBlock />
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
        <div
          style={{
            background: '#e8aa7c',
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Slice</h3>
          {result ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <input
            style={{ marginLeft: 10, marginBottom: 2 }}
            type={'text'}
            defaultValue={startIndex}
            onChange={e => (s = e.target.value)}
          />
          <input
            style={{ marginLeft: 10, marginBottom: 0 }}
            type={'text'}
            defaultValue={lastIndex}
            onChange={e => (l = e.target.value)}
          />
          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleSlice}
            >
              Slice
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentRenameBlock = d1 => {
    return (
      // <CustomNodeRenameBlock />
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
            Rename Column
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <select
              onChange={handleRenameColumn}
              style={{
                marginTop: -4,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 100,
                marginLeft: 4
              }}
            >
              <option style={{ fontSize: 14 }} value={0}>
                {column1}
              </option>
              <option style={{ fontSize: 14 }} value={1}>
                {column2}
              </option>
              <option style={{ fontSize: 14 }} value={2}>
                {column3}
              </option>
              <option style={{ fontSize: 14 }} value={3}>
                {column4}
              </option>
              <option style={{ fontSize: 14 }} value={4}>
                {column5}
              </option>
              <option style={{ fontSize: 14 }} value={5}>
                {column6}
              </option>
              <option style={{ fontSize: 14 }} value={6}>
                {column7}
              </option>
              <option style={{ fontSize: 14 }} value={7}>
                {column8}
              </option>
            </select>

            <input
              style={{
                marginTop: -4,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 100,
                marginBottom: 2
              }}
              type={'text'}
              defaultValue={''}
              onChange={e => (newColumnName = e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              style={{
                background: '#CCC',
                marginTop: '4px',
                padding: '0px',
                width: 60,
                alignSelf: 'center'
              }}
              onClick={showData}
            >
              Rename
            </button>
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentSortBlock = d1 => {
    return (
      // <CustomNodeSortBlock
      //   onChange={sortType === 'asc' ? handleSortAsc : handleSortDesc}
      //   column1={column1}
      //   column2={column2}
      //   column3={column3}
      //   column4={column4}
      //   column5={column5}
      //   column6={column6}
      //   column7={column7}
      //   column8={column8}
      // />

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
            backgroundColor: '#945a30'
          }}
        ></Handle>
        <div
          style={{
            background: '#e8aa7c',
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
              onChange={sortType === '0' ? handleSortAsc : handleSortDesc}
              style={{
                marginTop: 10,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 150,
                marginLeft: 10
              }}
            >
              <option style={{ fontSize: 14 }} value={0}>
                {column1}
              </option>
              <option style={{ fontSize: 14 }} value={1}>
                {column2}
              </option>
              <option style={{ fontSize: 14 }} value={2}>
                {column3}
              </option>
              <option style={{ fontSize: 14 }} value={3}>
                {column4}
              </option>
              <option style={{ fontSize: 14 }} value={4}>
                {column5}
              </option>
              <option style={{ fontSize: 14 }} value={5}>
                {column6}
              </option>
              <option style={{ fontSize: 14 }} value={6}>
                {column7}
              </option>
              <option style={{ fontSize: 14 }} value={7}>
                {column8}
              </option>
            </select>
            <div
              style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 10 }}
            >
              Order:
            </div>
            <select
              onChange={handleSortType}
              style={{
                marginTop: 10,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 105,
                marginLeft: 10
              }}
            >
              <option style={{ fontSize: 12 }} value={'0'}>
                {'Ascending'}
              </option>
              <option style={{ fontSize: 12 }} value={'1'}>
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
            backgroundColor: '#945a30'
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentBarchartBlock = d1 => {
    return <>{<CustomNodeBarchartBlock data={result} />}</>
  }

  const CustomNodeComponentHistogramBlock = d1 => {
    return <CustomNodeHistogramBlock data={result} />
  }

  const CustomNodeComponentScatterplotBlock = d1 => {
    return <CustomNodeScatterplotBlock data={result} />
  }

  const CustomNodeComponentTimeseriesBlock = d1 => {
    return <CustomNodeTimeseriesBlock data={result} />
  }

  const CustomNodeComponentStatsBlock = d1 => {
    return (
      <CustomNodeStatsBlock
        onChange={handleChange}
        selected={selectedColumn}
        column1={column1}
        column2={column2}
        column3={column3}
        column4={column4}
        column5={column5}
        column6={column6}
        column7={column7}
        column8={column8}
        min={min}
        max={max}
        sum={sum}
        avg={avg}
        data={result}
      />
    )
  }

  const CustomNodeComponentExportBlock = d1 => {
    return <CustomNodeExportBlock data={result} />
  }

  const nodeTypes = {
    selectorNode: ColorSelectorNode,
    special: CustomNodeComponentInputFile,
    special2: CustomNodeComponentPaste,
    special3: CustomNodeComponentSheets,
    special4: CustomNodeComponentHttpReq,
    special5: CustomNodeComponentFilterBlock,
    special6: CustomNodeComponentMergeBlock,
    special7: CustomNodeComponentGroupBlock,
    special8: CustomNodeComponentSliceBlock,
    special9: CustomNodeComponentSortBlock,
    special10: CustomNodeComponentRenameBlock,
    special11: CustomNodeComponentBarchartBlock,
    special12: CustomNodeComponentHistogramBlock,
    special13: CustomNodeComponentScatterplotBlock,
    special14: CustomNodeComponentTimeseriesBlock,
    special15: CustomNodeComponentStatsBlock,
    special16: CustomNodeComponentExportBlock
  }

  const cpTextFunc2 = e => {
    setCpText2(e.target.value)
  }
  const cpTextFunc = e => {
    selCpText === 'JSON'
      ? setCpText(JSON.parse(e.target.value))
      : selCpText === 'CSV'
      ? setCpText(readString(e.target.value))
      : setCpText(e.target.value)
  }

  const selCpChange = e => {
    setSelCpText(e.target.value)
    console.log(e.target.value)
  }
  function applyExpData () {
    closeModal()
    setExpData(true)
  }
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.style.color = '#FFF'
  }
  function closeModal () {
    setIsOpen(false)
  }

  let onAdd = () => {
    closeModal()
    setNode1('special')
    setDsp('2')
    setStateElements(elementsCustom)
  }
  let onAdd2 = () => {
    closeModal()
    setNode1('special2')
    setDsp('3')
    setStateElements(elementsCustom)
  }
  let onAdd3 = () => {
    closeModal()
    setNode1('special4')
    setDsp('5')
    setStateElements(elementsCustom)
  }
  let onAdd4 = () => {
    closeModal()
    setNode1('special3')
    setDsp('4')
    setStateElements(elementsCustom)
  }
  let onAdd5 = () => {
    closeModal()
    setNode2('special5')
    setDsp('6')
    setStateElements(elementsCustom)
  }
  let onAdd6 = () => {
    closeModal()
    setNode2('special6')
    setDsp('7')
    setStateElements(elementsCustom)
  }
  let onAdd7 = () => {
    closeModal()
    setNode2('special7')
    setDsp('8')
    setStateElements(elementsCustom)
  }
  let onAdd8 = () => {
    closeModal()
    setNode2('special8')
    setDsp('9')
    setStateElements(elementsCustom)
  }
  let onAdd9 = () => {
    closeModal()
    setNode2('special9')
    setDsp('10')
    setStateElements(elementsCustom)
  }
  let onAdd10 = () => {
    closeModal()
    setNode2('special10')
    setDsp('11')
    setStateElements(elementsCustom)
  }
  let onAdd11 = () => {
    closeModal()
    setNode3('special11')
    setDsp('12')
    setStateElements(elementsCustom)
  }
  let onAdd12 = () => {
    closeModal()
    setNode3('special12')
    setDsp('13')
    setStateElements(elementsCustom)
  }
  let onAdd13 = () => {
    closeModal()
    setNode3('special13')
    setDsp('14')
    setStateElements(elementsCustom)
  }
  let onAdd14 = () => {
    closeModal()
    setNode3('special14')
    setDsp('15')
    setStateElements(elementsCustom)
  }
  let onAdd15 = () => {
    closeModal()
    setNode4('special15')
    setDsp('16')
    setStateElements(elementsCustom)
  }
  let onAdd16 = () => {
    closeModal()
    setNode4('special16')
    setDsp('17')
    setStateElements(elementsCustom)
  }

  const Workflow = () => {
    setShowworkFLow(true)
  }

  return (
    <>
      <MiniDrawer />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div style={{ display: 'flex' }}>
          <h2
            ref={_subtitle => (subtitle = _subtitle)}
            style={{ color: '#FFF' }}
          >
            Block Library
          </h2>
          <button
            onClick={closeModal}
            style={{ height: 28, marginLeft: 570, marginTop: 28 }}
          >
            X
          </button>
        </div>

        <div
          style={{
            width: '30%',
            height: 100,
            display: 'inline-block',
            color: '#FFF',
            verticalAlign: 'top'
          }}
        >
          <h3>Input</h3>
          <h3>Transform</h3>
          <h3>Visualization</h3>
          <h3>Statistics & Export</h3>
        </div>
        <div
          style={{
            width: '70%',
            height: 480,
            display: 'inline-block',
            color: '#FFF',
            verticalAlign: 'top',
            overflow: 'scroll'
          }}
        >
          <h2>Input</h2>

          <div
            style={{
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
              display: 'flex'
            }}
          >
            {inputOptions.section1.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div style={{ width: '100%', marginTop: '10px', display: 'flex' }}>
            {inputOptions.section2.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <h2>Transform</h2>
          <div
            style={{
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
              display: 'flex'
            }}
          >
            {transformOptions.section1.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div style={{ width: '100%', marginTop: '10px', display: 'flex' }}>
            {transformOptions.section2.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <h2>Visualization</h2>
          <div
            style={{
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
              display: 'flex'
            }}
          >
            {visualizationOptions.section1.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div style={{ width: '100%', marginTop: '10px', display: 'flex' }}>
            {visualizationOptions.section2.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>

          <h2>Statistics & Export</h2>
          <div
            style={{
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px',
              display: 'flex'
            }}
          >
            {miscOptions.section1.map((row, index) => (
              <div
                onClick={row.onpress}
                style={{
                  padding: '10px',
                  width: '30%',
                  height: 160,
                  background: '#e8a97c',
                  display: 'inline-block',
                  marginRight: 10
                }}
              >
                <h3 style={{ color: '#FFF' }}>{row.title}</h3>
                <p style={{ color: '#FFF', fontSize: '14px' }}>
                  {row.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {showWorkflow ? (
        <div
          style={{
            marginLeft: 80,
            border: '1px solid #CCC',
            width: '90%',
            background: '#FFF',
            overflow: 'scroll'
          }}
        >
          <div className='dndflow'>
            <ReactFlowProvider>
              <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                <ReactFlow
                  elements={stateElements2}
                  style={{ height: 500, width: '100%', padding: '0' }}
                  nodeTypes={nodeTypes}
                  onConnect={onConnect2}
                >
                  <MiniMap
                    nodeStrokeColor={n => {
                      if (n.type === node1) return '#0041d0'
                      if (n.type === node2) return '#0041d0'
                      if (n.type === node3) return '#0041d0'
                      if (n.type === node4) return '#ff0072'
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
        </div>
      ) : (
        <div
          style={{
            marginLeft: 80,
            border: '1px solid #CCC',
            width: '90%',
            background: '#FFF',
            overflow: 'scroll'
          }}
        >
          <div className='dndflow'>
            <ReactFlowProvider>
              <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                <button
                  onClick={openModal}
                  style={{
                    borderRadius: '15px',
                    background: '#CCC',
                    position: 'absolute',
                    marginTop: '-15px',
                    padding: 7,
                    zIndex: 9999
                  }}
                >
                  + block
                </button>
                <ReactFlow
                  elements={stateElements}
                  style={{ height: 500, width: '100%', padding: '0' }}
                  nodeTypes={nodeTypes}
                  onConnect={onConnect}
                >
                  <MiniMap
                    nodeStrokeColor={n => {
                      if (n.type === 'input') return '#0041d0'
                      // if (n.type === 'selectorNode') return bgColor;
                      if (n.type === 'output') return '#ff0072'
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
        </div>
      )}
      <div
        style={{
          width: '90%',
          height: '300px',
          background: '#FFF',
          overflow: 'scroll',
          marginLeft: '10%'
        }}
      >
        {selCpText === 'JSON' && cpText != {} && dsp === '3' ? (
          <JSONViewer json={cpText} />
        ) : selCpText === 'CSV' && cpText != '' && dsp === '3' ? (
          <Spreadsheet data={cpText} />
        ) : selCpText === 'TEXT' && cpText != '' && dsp === '3' ? (
          <p>{JSON.stringify(cpText)}</p>
        ) : expData ? (
          <Spreadsheet data={exampleData} />
        ) : (
          <Spreadsheet data={dt} />
        )}
      </div>
    </>
  )
}
