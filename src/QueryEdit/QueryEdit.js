import React, { useState, useEffect, useRef, useContext } from "react";
import Spreadsheet from "react-spreadsheet";
import "codemirror/lib/codemirror.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { format } from "sql-formatter";
import { CSVLink } from "react-csv";
import Box from "@mui/material/Box";
import MiniDrawer from "../MiniDrawer";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import SvgIcon from "@mui/material/SvgIcon";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../context";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import {
  Save,
  Folder,
  FlashOn,
  DoDisturb,
  CleaningServices,
  SavedSearch,
  FlashAuto,
  BlurOn,
  GridOn,
  QueryBuilder,
  Sync,
  Build,
  FileDownload,
} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import GradingIcon from "@mui/icons-material/Grading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import HighlightIcon from "@mui/icons-material/Highlight";

import configData from "../config.json";

import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

var Highlighter = require("react-highlighter");
require("codemirror/mode/sql/sql");

var tempbox2 = [];
var dataBox = [];
let box1 = [];
let flag = 0,
  flag2 = 0;
export default function QueryEdit() {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 220,
    borderRadius: "5px",
  };
  const modalstyle2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 250,
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
  };

  const modalstyle3 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 580,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 395,
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
  };

  const exampleData = [
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
    [
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
    ],
  ];

  const [allSchemas, setAllSchemas] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [open, setOpen] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [num, setNum] = useState();
  const [on, setOn] = useState(true);
  const [showInputOption, setShowInputOption] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [rows, setRow] = useState(exampleData);
  const [rows2, setRow2] = useState(exampleData);
  const [openModal, setOpenModal] = useState(false);
  const [fileName, setFileName] = useState("");

  const [selectedDb2, setSelectedDb2] = useState("");
  const [selectedDb3, setSelectedDb3] = useState("");
  const [selectedDb4, setSelectedDb4] = useState("");
  const [selectedDatasource, setselectedDatasource] = useState("");
  const [selectedDatasourceId, setSelectedDatasourceId] = useState("");
  const [datasource, setDataSource] = useState([]);
  const [datasourceName, setDataSourceName] = useState("");
  const [openDatasourceModal, setOpenDataSourceModal] = useState(false);
  const [openDatasourceModal2, setOpenDataSourceModal2] = useState(false);
  const [openDatasourceModal3, setOpenDataSourceModal3] = useState(false);
  const [modalopened, setModalOpened] = useState(false);

  const [opentree, setOpentree] = useState(true);
  const [opentree2, setOpentree2] = useState();
  const [schmeasChanged, setSchemasChanged] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [cursorLine, setCursorLine] = useState([]);
  const [tables, setTables] = useState([]);
  const [tables1, setTables1] = useState([]);
  const [tables2, setTables2] = useState([]);
  const [columns1, setColumns1] = useState([]);
  const [columns2, setColumns2] = useState([]);
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [selectedTable, setSelectedtable] = useState("");
  const [selectedTable1, setSelectedtable1] = useState("");
  const [selectedTable2, setSelectedtable2] = useState("");
  const [joinQueryType, setJoinQueryType] = useState("");
  const [cursorLineQuery, setCursorLineQuery] = useState([]);
  const [containerName, setcontainerName] = useState([]);

  const [databaseName, setDbName] = useState();
  const [tableName1, setTableName1] = useState();

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [flowIdPresent, setFlowIdPresent] = useState(true);
  const [nofileName, setNofileName] = useState(false);
  const [noDatasetName, setNoDatasetName] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [columnResize, setColumnResize] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [columnSelection, setColumnSelection] = useState(false);
  const [rowSelection, setRowSelection] = useState(false);
  const [fillHandle, setFillHandle] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);

  const [highlight1, setHighlight] = React.useState();
  const [highlightOn, setHighlightOn] = React.useState(false);

  const [dt, setDt] = useState([]);
  const [rowsData, setrowsData] = React.useState();
  const [rowsDataBackup, setrowsDataBackup] = React.useState();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [columnData, setColumnData] = React.useState();

  const [showError, setShowError] = React.useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const authContext = useContext(AuthContext);
  const history = useHistory();

  var cursonLine1;
  const beforeCursor = (e) => {
    let cursorPosition = 0;
    let str = query;
    let str1 = str.substring(cursorPosition).split("\n");

    console.log("before cursor", cursonLine1);
    setCursorLineQuery(str1[cursorLine]);
    cursonLine1 = str1[cursorLine];
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFile = (e) => {
    const content = e.target.result;
    // console.log('file content', content)
    setQuery(content);
    // You can set content in state and show it in render.
  };

  const handleChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = handleFile;
    fileData.readAsText(file);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([query], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName + ".sql";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const codemirrorRef = useRef();

  var options = {
    mode: "SQL",
    lineNumbers: true,
    tabSize: 2,
    smartIndent: true,
    height: 100,
    theme: "default height200",
    autoFocus: true,
    lineWrapping: true.valueOf,
    color: "black",
  };

  const findWord = () => {
    let result = query.match(searchWord);
  };

  const formatQuery = () => {
    setQuery(format(query));
    //  console.log('format check', format(query))
  };

  const executeSelectedQuery = (mode) => {
    console.log("cursorlinequery", cursonLine1);
    console.log("selectedlinequery", selectedQuery);

    axios
      .post(
        configData.API_URL + "personalAccount/database/query_editor",
        {
          id: localStorage.getItem("ConnectionId").toString(),
          query1: mode === 1 ? selectedQuery : cursonLine1,
        },
        {}
      )
      .then((response) => {
        //   console.log('executeselected Query api', response.data.data)

        let abc = response.data.data;
        let def = [],
          ghm = [],
          tmp1 = [],
          ghm2 = [],
          def2 = [];
        // abc.map((e) => {
        //   def = [];
        //   for (const [key, value] of Object.entries(e)) {
        //     // console.log(`${key}: ${value}`);
        //     def.push({ value: value });
        //   }
        //   ghm.push(def);
        // });

        tmp1.push(abc[0]);
        //     console.log('check columns', tmp1)
        tmp1.map((e) => {
          def2 = [];

          for (const [key, value] of Object.entries(e)) {
            // console.log(`${key}: ${value}`);

            def2.push({ value: key });
          }
          ghm2.push(def2);
        });

        abc.map((e) => {
          def = [];

          for (const [key, value] of Object.entries(e)) {
            // console.log(`${key}: ${value}`);

            def.push({ value: value });
          }
          ghm.push(def);
        });

        ghm.unshift(ghm2.flat());
        // console.log("ghm2", ghm);
        setRow(ghm);
        setRow2(ghm);
        setUpDataForGrid(ghm);
        setShowSuccess(true);
        setInProgress(false);

        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          setShowError(true);
          setInProgress(false);
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          setShowError(true);
          setInProgress(false);
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          setShowError(true);
          setInProgress(false);
          console.log(error.message);
        }
      });
  };
  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }

  const selectText = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    const selectedlines = e.target.value.substring(start, end);
    console.log("User selected query", selectedlines);
    setSelectedQuery(selectedlines);
  };

  window.onselect = selectText;

  useEffect(() => {
    // if (data && data.length > 0)
    // setUpDataForGrid(data)
  }, [data]);

  useEffect(() => {
    findWord();
  }, [searchWord]);

  useEffect(() => {
    console.log("rerender..");
  }, [allSchemas]);

  useEffect(() => {
    let c = window.getSelection();
    // console.log("selQuery?", c.toString());
    setSelectedQuery(c?.toString());
  }, [window.onselect]);

  useEffect(() => {
    // console.log('CHECK', allSchemas[0] && allSchemas[0].label[0])
    if (allSchemas.length === 1) {
      if (localStorage.getItem("ConnectionId") === "91") {
        showTables2(allSchemas[0] && allSchemas[0].label[0], 0);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label[0]);
      } else {
        showTables2(allSchemas[0] && allSchemas[0].label, 0);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label);
      }

      if (localStorage.getItem("ConnectionId") === "91") {
        showTables2(allSchemas[0] && allSchemas[0].label[0], 1);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label[0]);
      } else {
        showTables2(allSchemas[0] && allSchemas[0].label, 1);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label);
      }

      if (localStorage.getItem("ConnectionId") === "91") {
        showTables2(allSchemas[0] && allSchemas[0].label[0], 2);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label[0]);
      } else {
        showTables2(allSchemas[0] && allSchemas[0].label, 2);
        setSelectedDb2(allSchemas[0] && allSchemas[0].label);
      }
    }
  }, [allSchemas && modalopened === true]);

  useEffect(() => {
    console.log("CID", localStorage.getItem("ConnectionId"));
    showDatabases();
  }, []);

  const limitrows = () => {
    if (num === "Dont Limit") {
      setRow(rows2);
      setUpDataForGrid(rows2);
    } else {
      let end = parseInt(num) + 1;
      var data = rows2.slice(0, end);
      setRow(data);
      setUpDataForGrid(data);
    }
    // console.log('check rows', data)
  };

  const replaceSpaceWithDot = () => {
    if (on === true) {
      let string = query;
      string = string.replace(/ /g, ".");
      setQuery(string);
    } else if (on === false) {
      let string = query;
      string = string.replace(/\./g, " ");
      setQuery(string);
    }
  };

  useEffect(() => {
    console.log("Numm", num);
    limitrows();
  }, [num]);

  useEffect(() => {
    console.log("filename", fileName);
  }, [fileName]);

  useEffect(() => {
    viewAllDatasource();
  }, []);

  // const handleSearch = () => {
  //   console.log("IOOI", data2);
  //   let data3 = convertData(rowsDataBackup);
  //   console.log("data???", data3);
  //   let data1 = data2;
  //   let d2 = [];

  //   data1.map((e) => {
  //     let t = [];
  //     e.map((e2) => {
  //       t.push({ value: e2 });
  //     });
  //     d2.push(t);
  //   });
  //   // console.log('CCC', d2, rows)
  //   let columns = d2[0];
  //   dataBox =
  //     d2 &&
  //     d2.filter((obj) =>
  //       Object.values(obj)
  //         .flat()
  //         .some((v) =>
  //           v.value.toString().toLowerCase().includes(searchInput.toLowerCase())
  //         )
  //     );
  //   console.log("after searched1", dataBox);
  //   dataBox.unshift(columns);
  //   // setData(dataBox);

  //   setUpDataForGrid(dataBox);
  //   console.log("searched>", dataBox);

  //   // if (searchInput === '') storeDatasourceResult(selectedDatasourceId)
  // };

  const handleSearch = () => {
    let data1 = convertData(rowsDataBackup);
    let d2 = [];
    data1.map((e) => {
      let t = [];
      e.map((e2) => {
        t.push({ value: e2 });
      });
      d2.push(t);
    });
    // console.log('CCC', d2, rows)
    let columns = d2[0];
    dataBox =
      d2 &&
      d2.filter((obj) =>
        Object.values(obj)
          .flat()
          .some((v) =>
            v.value.toString().toLowerCase().includes(searchInput.toLowerCase())
          )
      );
    console.log("after searched1", dataBox);
    dataBox.unshift(columns);
    setData(dataBox);
    setUpDataForGrid(dataBox);
    console.log("searched>", dataBox);

    // if (searchInput === '') storeDatasourceResult(selectedDatasourceId)
  };

  useEffect(() => {
    console.log("searchRow", searchInput);
    if (searchInput != "") handleSearch();
  }, [searchInput]);

  const showDatabases = () => {
    console.log(
      "CHECK SHOWConnection->",
      localStorage.getItem("googleSheetId").toString(),
      localStorage.getItem("ConnectionId").toString()
    );
    axios
      .post(
        configData.API_URL + "personalAccount/database/show_databases",
        localStorage.getItem("ConnectionId") === "106"
          ? {
              id: localStorage.getItem("ConnectionId").toString(),
              sheet_id: localStorage.getItem("googleSheetId").toString(),
            }
          : {
              id: localStorage.getItem("ConnectionId"),
            },
        {}
      )
      .then((response) => {
        if (localStorage.getItem("ConnectionId").toString() === 112) {
          //  console.log('show database api', response.data.data)
          setAllSchemas(response.data.data);
        } else if (localStorage.getItem("ConnectionId") === "106") {
          // console.log(
          //   'show database api--',
          //   localStorage.getItem('googleSheetId').toString(),
          //   response
          // )
          console.log("RR+", response.data.data);
          setAllSchemas(response.data.data);
        } else {
          console.log("show database api", response.data.data);
          setAllSchemas(response.data.data);
        }

        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const showTables = (dbname, index, mode) => {
    console.log("hit", allSchemas[index]?.tableId);
    // console.log(
    //   'Inside shoTables',
    //   dbname,
    //   index,
    //   localStorage.getItem('ConnectionId'),
    //   allSchemas[index].survey_id,
    //   mode,
    //   containerName
    // )
    axios
      .post(
        configData.API_URL + "personalAccount/database/show_tables",
        localStorage.getItem("ConnectionId") === "116"
          ? {
              id: localStorage.getItem("ConnectionId"),
              dbname: dbname,
              sheet_id: allSchemas[index].sheet_id,
            }
          : localStorage.getItem("ConnectionId") === "118"
          ? {
              id: localStorage.getItem("ConnectionId"),
              dbname: dbname,
              transmission_id: dbname,
            }
          : localStorage.getItem("ConnectionId") === "125"
          ? {
              id: localStorage.getItem("ConnectionId"),
              dbname: dbname,
              survey_id: allSchemas[index].survey_id,
            }
          : localStorage.getItem("ConnectionId") === "120"
          ? {
              id: localStorage.getItem("ConnectionId"),
              sid: dbname,
            }
          : localStorage.getItem("ConnectionId") === "121"
          ? {
              id: localStorage.getItem("ConnectionId"),
              subject: dbname,
            }
          : localStorage.getItem("ConnectionId") === "129"
          ? {
              id: localStorage.getItem("ConnectionId"),
              title: dbname,
            }
          : localStorage.getItem("ConnectionId") === "106"
          ? {
              id: localStorage.getItem("ConnectionId"),
              sheet_id: allSchemas[index].label,
            }
          : localStorage.getItem("ConnectionId") === "132"
          ? mode === 1
            ? {
                id: localStorage.getItem("ConnectionId"),
                blobName: dbname,
                containerName: containerName,
              }
            : {
                id: localStorage.getItem("ConnectionId"),
                containerName: dbname,
              }
          : localStorage.getItem("ConnectionId") === "135"
          ? mode === 1
            ? {
                id: localStorage.getItem("ConnectionId"),
                blobName: dbname,
                containerName: containerName,
              }
            : {
                id: localStorage.getItem("ConnectionId"),
                containerName: dbname,
              }
          : localStorage.getItem("ConnectionId") === "102"
          ? {
              id: localStorage.getItem("ConnectionId"),
              collectionName: dbname,
            }
          : localStorage.getItem("ConnectionId") === "133"
          ? {
              id: localStorage.getItem("ConnectionId"),
              tableName: dbname,
              PartitionKey: "102",
              RowKey: "11",
            }
          : localStorage.getItem("ConnectionId") === "142"
          ? {
              id: localStorage.getItem("ConnectionId"),
              fileName: dbname,
            }
          : localStorage.getItem("ConnectionId") === "103"
          ? {
              id: localStorage.getItem("ConnectionId"),
              dataName: dbname,
            }
          : localStorage.getItem("ConnectionId") === "255"
          ? {
              id: localStorage.getItem("ConnectionId"),
              tId: allSchemas[index]?.tableId,
            }
          : localStorage.getItem("ConnectionId") === "148"
          ? {
              id: localStorage.getItem("ConnectionId"),
              account_id: allSchemas[index].nodeId,
            }
          : localStorage.getItem("ConnectionId") === "117"
          ? {
              id: localStorage.getItem("ConnectionId"),
              customer_id: allSchemas[index].nodeId,
            }
          : localStorage.getItem("ConnectionId") === "105"
          ? {
              id: localStorage.getItem("ConnectionId"),
              github_repo: allSchemas[index].label,
            }
          : {
              id: localStorage.getItem("ConnectionId"),
              dbname: dbname,
            },

        {}
      )
      .then((response) => {
        let temp2 = [];
        if (
          // localStorage.getItem('ConnectionId') === 108 ||
          localStorage.getItem("ConnectionId") === "134"
        )
          temp2.push(response.data.data);
        // if (localStorage.getItem('ConnectionId') === 103) {
        //   console.log('UY', response.data.data)
        //   temp2.push(response.data.data.d)
        // }
        if (localStorage.getItem("ConnectionId") === "133") {
          temp2.push(response.data.data);
        }

        let abc =
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "134"
            ? temp2
            : localStorage.getItem("ConnectionId").toString() === "112"
            ? response.data.data.records
            : localStorage.getItem("ConnectionId").toString() === "113"
            ? response.data.data.records
            : localStorage.getItem("ConnectionId").toString() === "116"
            ? response.data.data.rows
            : localStorage.getItem("ConnectionId").toString() == "125"
            ? response.data.data.pages[0].questions
            : // localStorage.getItem('ConnectionId').toString() === 129
            // ? response.data.data.cardTypes
            localStorage.getItem("ConnectionId").toString() === "132"
            ? response.data.data[2].data1
            : localStorage.getItem("ConnectionId").toString() === "135"
            ? response.data.data[2].data1
            : // : localStorage.getItem('ConnectionId').toString() === 103
            // ? temp2
            localStorage.getItem("ConnectionId").toString() === "133"
            ? temp2
            : response.data.data;
        console.log(
          "show tables api",
          response.data.data,
          localStorage.getItem("ConnectionId")
        );
        if (
          localStorage.getItem("ConnectionId") === "102" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "133" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "116" ||
          localStorage.getItem("ConnectionId") === "118" ||
          localStorage.getItem("ConnectionId") === "120" ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "129" ||
          (localStorage.getItem("ConnectionId") === "132" && mode === 1) ||
          (localStorage.getItem("ConnectionId") === "135" && mode === 1) ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "144" ||
          localStorage.getItem("ConnectionId") === "145" ||
          localStorage.getItem("ConnectionId") === "146" ||
          localStorage.getItem("ConnectionId") === "147" ||
          localStorage.getItem("ConnectionId") === "148" ||
          localStorage.getItem("ConnectionId") === "149" ||
          localStorage.getItem("ConnectionId") === "150" ||
          localStorage.getItem("ConnectionId") === "151" ||
          localStorage.getItem("ConnectionId") === "152" ||
          localStorage.getItem("ConnectionId") === "153" ||
          localStorage.getItem("ConnectionId") === "154" ||
          localStorage.getItem("ConnectionId") === "155" ||
          localStorage.getItem("ConnectionId") === "156" ||
          localStorage.getItem("ConnectionId") === "157" ||
          localStorage.getItem("ConnectionId") === "158" ||
          localStorage.getItem("ConnectionId") === "159" ||
          localStorage.getItem("ConnectionId") === "160" ||
          localStorage.getItem("ConnectionId") === "161" ||
          localStorage.getItem("ConnectionId") === "162" ||
          localStorage.getItem("ConnectionId") === "163" ||
          localStorage.getItem("ConnectionId") === "164" ||
          localStorage.getItem("ConnectionId") === "165" ||
          localStorage.getItem("ConnectionId") === "166" ||
          localStorage.getItem("ConnectionId") === "167" ||
          localStorage.getItem("ConnectionId") === "168" ||
          localStorage.getItem("ConnectionId") === "169" ||
          localStorage.getItem("ConnectionId") === "171" ||
          localStorage.getItem("ConnectionId") === "172" ||
          localStorage.getItem("ConnectionId") === "173" ||
          localStorage.getItem("ConnectionId") === "174" ||
          localStorage.getItem("ConnectionId") === "175" ||
          localStorage.getItem("ConnectionId") === "176" ||
          localStorage.getItem("ConnectionId") === "177" ||
          localStorage.getItem("ConnectionId") === "178" ||
          localStorage.getItem("ConnectionId") === "179" ||
          localStorage.getItem("ConnectionId") === "180" ||
          localStorage.getItem("ConnectionId") === "181" ||
          localStorage.getItem("ConnectionId") === "182" ||
          localStorage.getItem("ConnectionId") === "183" ||
          localStorage.getItem("ConnectionId") === "184" ||
          localStorage.getItem("ConnectionId") === "185" ||
          localStorage.getItem("ConnectionId") === "186" ||
          localStorage.getItem("ConnectionId") === "187" ||
          localStorage.getItem("ConnectionId") === "188" ||
          localStorage.getItem("ConnectionId") === "189" ||
          localStorage.getItem("ConnectionId") === "190" ||
          localStorage.getItem("ConnectionId") === "191" ||
          localStorage.getItem("ConnectionId") === "192" ||
          localStorage.getItem("ConnectionId") === "193" ||
          localStorage.getItem("ConnectionId") === "194" ||
          localStorage.getItem("ConnectionId") === "195" ||
          localStorage.getItem("ConnectionId") === "196" ||
          localStorage.getItem("ConnectionId") === "197" ||
          localStorage.getItem("ConnectionId") === "198" ||
          localStorage.getItem("ConnectionId") === "199" ||
          localStorage.getItem("ConnectionId") === "200" ||
          localStorage.getItem("ConnectionId") === "201" ||
          localStorage.getItem("ConnectionId") === "202" ||
          localStorage.getItem("ConnectionId") === "203" ||
          localStorage.getItem("ConnectionId") === "204" ||
          localStorage.getItem("ConnectionId") === "205" ||
          // localStorage.getItem('ConnectionId') === '3' ||
          // localStorage.getItem('ConnectionId') === '4' ||
          // localStorage.getItem('ConnectionId') === '89' ||
          // localStorage.getItem('ConnectionId') === '90' ||
          localStorage.getItem("ConnectionId") === "91" ||
          localStorage.getItem("ConnectionId") === "92" ||
          localStorage.getItem("ConnectionId") === "93" ||
          localStorage.getItem("ConnectionId") === "94" ||
          localStorage.getItem("ConnectionId") === "95" ||
          localStorage.getItem("ConnectionId") === "96" ||
          localStorage.getItem("ConnectionId") === "97" ||
          localStorage.getItem("ConnectionId") === "98" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "104" ||
          localStorage.getItem("ConnectionId") === "105" ||
          localStorage.getItem("ConnectionId") === "106" ||
          localStorage.getItem("ConnectionId") === "107" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "109" ||
          localStorage.getItem("ConnectionId") === "110" ||
          localStorage.getItem("ConnectionId") === "111" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "114" ||
          localStorage.getItem("ConnectionId") === "115" ||
          // localStorage.getItem('ConnectionId') === '116' ||
          localStorage.getItem("ConnectionId") === "117" ||
          // localStorage.getItem('ConnectionId') === '118' ||
          localStorage.getItem("ConnectionId") === "119" ||
          // localStorage.getItem('ConnectionId') === '120' ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "122" ||
          localStorage.getItem("ConnectionId") === "123" ||
          localStorage.getItem("ConnectionId") === "124" ||
          localStorage.getItem("ConnectionId") === "125" ||
          localStorage.getItem("ConnectionId") === "126" ||
          localStorage.getItem("ConnectionId") === "127" ||
          localStorage.getItem("ConnectionId") === "128" ||
          localStorage.getItem("ConnectionId") === "129" ||
          localStorage.getItem("ConnectionId") === "130" ||
          localStorage.getItem("ConnectionId") === "131" ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "135" ||
          localStorage.getItem("ConnectionId") === "136" ||
          localStorage.getItem("ConnectionId") === "137" ||
          localStorage.getItem("ConnectionId") === "138" ||
          // localStorage.getItem('ConnectionId') === '139' ||
          localStorage.getItem("ConnectionId") === "140" ||
          localStorage.getItem("ConnectionId") === "141" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "207" ||
          localStorage.getItem("ConnectionId") === "211" ||
          localStorage.getItem("ConnectionId") === "212" ||
          localStorage.getItem("ConnectionId") === "213" ||
          localStorage.getItem("ConnectionId") === "214" ||
          localStorage.getItem("ConnectionId") === "215" ||
          localStorage.getItem("ConnectionId") === "216" ||
          localStorage.getItem("ConnectionId") === "217" ||
          // localStorage.getItem('ConnectionId') === '218' ||
          // localStorage.getItem('ConnectionId') === '219' ||
          localStorage.getItem("ConnectionId") === "220" ||
          localStorage.getItem("ConnectionId") === "221" ||
          // localStorage.getItem('ConnectionId') === '222' ||
          localStorage.getItem("ConnectionId") === "223" ||
          localStorage.getItem("ConnectionId") === "224" ||
          localStorage.getItem("ConnectionId") === "225" ||
          localStorage.getItem("ConnectionId") === "226" ||
          localStorage.getItem("ConnectionId") === "227" ||
          localStorage.getItem("ConnectionId") === "228" ||
          localStorage.getItem("ConnectionId") === "229" ||
          // localStorage.getItem('ConnectionId') === '230' ||
          // localStorage.getItem('ConnectionId') === '231' ||
          localStorage.getItem("ConnectionId") === "232" ||
          localStorage.getItem("ConnectionId") === "209" ||
          localStorage.getItem("ConnectionId") === "233" ||
          localStorage.getItem("ConnectionId") === "208" ||
          localStorage.getItem("ConnectionId") === "210" ||
          localStorage.getItem("ConnectionId") === "206" ||
          // localStorage.getItem('ConnectionId') === '234' ||
          // localStorage.getItem('ConnectionId') === '235' ||
          localStorage.getItem("ConnectionId") === "236" ||
          localStorage.getItem("ConnectionId") === "237" ||
          localStorage.getItem("ConnectionId") === "117" ||
          localStorage.getItem("MainConnectionId") === "313" ||
          localStorage.getItem("ConnectionId") === "255"
        ) {
          //console.log('DATA', response.data.data)

          if (localStorage.getItem("ConnectionId") === "142") {
            var temp4 = Object.keys(abc);

            console.log("JD", response.data.data[temp4[0]]);
            var t5 = [];
            t5.push(response.data.data[temp4[0]]);
            abc = t5;
          }
          if (localStorage.getItem("ConnectionId") === "125") {
            console.log("abc", abc);
            //   abc.map((e)=> {
            //      let heading =e.headings[0].heading
            //    heading = e.headings[0]
            //  //   console.log('E',e.headings[0].heading)
            //   })
          }

          //  console.log('HERE..', abc)
          // setData(abc);
          setUpDataForGrid(abc);
          var def2 = [];
          let def = [],
            ghm = [];
          abc.map((e) => {
            def = [];
            if (e) var t1 = Object.keys(e);
            t1.map((f) => {
              if (f != null && typeof f != "object") def.push({ value: f });
              else if (
                f != null &&
                typeof f === "object" &&
                typeof f === "array"
              )
                def.push({ value: Object.values(f) });
            });
          });
          ghm.push(def);
          //  console.log('SEE', ghm)

          abc.map((e) => {
            def2 = [];
            if (e) var t2 = Object.values(e);

            t2.map((f) => {
              if (f != null && typeof f != "object") {
                def2.push({ value: f });
              } else if (
                f != null &&
                typeof f === "object" &&
                typeof f === "array"
              )
                def2.push({ value: Object.values(f) });
            });
            ghm.push(def2);
          });

          setRow(ghm);
          setRow2(ghm);
        } else {
          console.log("ppp", abc);
          if (localStorage.getItem("MainConnectionId") === "310") {
            tempbox2 = [];
            tempbox2.push(abc[0].data);
            // setData(tempbox2);
            setUpDataForGrid(tembbox2);
          }

          var p = allSchemas;

          response.data.data.forEach((o, i) => {
            p.find((o) => o.nodeId === p[index].nodeId).children.push(o);
          });

          //   console.log('changed allschemas', p)
          setSchemasChanged(!schmeasChanged);
          setAllSchemas(p);
        }
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const showTables2 = (dbname, mode) => {
    console.log("dbname...", dbname, localStorage.getItem("ConnectionId"));
    axios
      .post(
        configData.API_URL + "personalAccount/database/show_tables",
        {
          id: localStorage.getItem("ConnectionId"),
          dbname: dbname,
        },
        {}
      )
      .then((response) => {
        //  console.log('show tables api', response.data.data)
        if (mode === 0) setSelectedtable(response.data.data[0].label);
        if (mode === 1) setTables1(response.data.data);
        if (mode === 2) setTables2(response.data.data);
        //   console.log('show tables---', tables)

        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const describeTable = (tableName, mode) => {
    console.log(
      "from desc table api",
      localStorage.getItem("ConnectionId"),
      tableName,
      mode
    );
    axios
      .post(
        configData.API_URL + "personalAccount/database/describe_table",
        {
          id: localStorage.getItem("ConnectionId"),
          dbname: mode === 0 ? selectedDb3 : selectedDb4,
          table_name: tableName,
        },
        {}
      )
      .then((response) => {
        console.log("describe table api", response.data.data);
        if (mode === 0) setColumns1(response.data.data);
        else if (mode === 1) setColumns2(response.data.data);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const executeQuery = (ModQuery) => {
    console.log("Excecute QUERY-", ModQuery, query.toString());
    axios
      .post(
        configData.API_URL + "personalAccount/database/query_editor",

        {
          id: localStorage.getItem("ConnectionId").toString(),
          query1: ModQuery ? ModQuery : query.toString(),
        },
        {}
      )
      .then((response) => {
        console.log("execute Query api", response.data.data);

        let abc =
          localStorage.getItem("ConnectionId").toString() === 91
            ? response.data.data.rows
            : response.data.data;
        let def = [],
          def2 = [],
          ghm = [],
          ghm2 = [],
          tmp1 = [];

        if (localStorage.getItem("ConnectionId").toString() === 91) {
          response.data.data.metaData.map((e) => {
            def2 = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def2.push({ value: value });
            }
            ghm2.push(def2);
          });

          abc.map((e) => {
            def = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def.push({ value: value });
            }
            ghm.push(def);
          });
          //     console.log('ghm', ghm2.flat())
          ghm.unshift(ghm2.flat());
          //     console.log('ghm2', ghm)
          setRow(ghm);
          setRow2(ghm);
          dataBox = rows;
          setInProgress(false);
        } else {
          tmp1.push(abc[0]);
          //     console.log('check columns', tmp1)
          tmp1.map((e) => {
            def2 = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def2.push({ value: key });
            }
            ghm2.push(def2);
          });

          abc.map((e) => {
            def = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def.push({ value: value });
            }
            ghm.push(def);
          });
          //    console.log('ghm', ghm2.flat())
          // if (localStorage.getItem('ConnectionId').toString() != 267)
          // console.log('ghm1', ghm)
          ghm.unshift(ghm2.flat());
          console.log("ghm2", ghm);
          setRow(ghm);
          setRow2(ghm);
          setUpDataForGrid(ghm);
          setShowSuccess(true);
          setInProgress(false);
        }
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log("ERROR1", error.response);
          // window.alert("Something Went Wrong! Please check your query");
          setShowError(true);
          setInProgress(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("ERROR2", error.request);
          // window.alert("Something Went Wrong! Please check your query");
          setShowError(true);
          setInProgress(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("ERROR3", error.message);
          // window.alert("Something Went Wrong! Please check your query");
          setShowError(true);
          setInProgress(false);
        }
      });
  };

  const viewAllDatasource = () => {
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_datasource_names",

        {
          id:
            localStorage.getItem("ConnectionId") &&
            localStorage.getItem("ConnectionId").toString(),
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("all datasources api", response.data.data);
        setDataSource(response.data.data);
        setOpenDialog(false);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
          setOpenDialog(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setOpenDialog(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
          setOpenDialog(false);
        }
      });
  };

  const storeDatasource = () => {
    console.log("in store", data, localStorage.getItem("ConnectionId"));
    axios
      .post(
        configData.API_URL + "personalAccount/database/stored_datasource",

        localStorage.getItem("ConnectionId") === "102" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "133" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "104" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "106" ||
          localStorage.getItem("ConnectionId") === "116" ||
          localStorage.getItem("ConnectionId") === "118" ||
          localStorage.getItem("ConnectionId") === "120" ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "125" ||
          localStorage.getItem("ConnectionId") === "129" ||
          localStorage.getItem("ConnectionId") === "132" ||
          localStorage.getItem("ConnectionId") === "135" ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "123" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "144" ||
          localStorage.getItem("ConnectionId") === "145" ||
          localStorage.getItem("ConnectionId") === "146" ||
          localStorage.getItem("ConnectionId") === "147" ||
          localStorage.getItem("ConnectionId") === "148" ||
          localStorage.getItem("ConnectionId") === "149" ||
          localStorage.getItem("ConnectionId") === "150" ||
          localStorage.getItem("ConnectionId") === "151" ||
          localStorage.getItem("ConnectionId") === "152" ||
          localStorage.getItem("ConnectionId") === "153" ||
          localStorage.getItem("ConnectionId") === "154" ||
          localStorage.getItem("ConnectionId") === "155" ||
          localStorage.getItem("ConnectionId") === "156" ||
          localStorage.getItem("ConnectionId") === "157" ||
          localStorage.getItem("ConnectionId") === "158" ||
          localStorage.getItem("ConnectionId") === "159" ||
          localStorage.getItem("ConnectionId") === "160" ||
          localStorage.getItem("ConnectionId") === "161" ||
          localStorage.getItem("ConnectionId") === "162" ||
          localStorage.getItem("ConnectionId") === "163" ||
          localStorage.getItem("ConnectionId") === "164" ||
          localStorage.getItem("ConnectionId") === "165" ||
          localStorage.getItem("ConnectionId") === "166" ||
          localStorage.getItem("ConnectionId") === "167" ||
          localStorage.getItem("ConnectionId") === "168" ||
          localStorage.getItem("ConnectionId") === "169" ||
          localStorage.getItem("ConnectionId") === "171" ||
          localStorage.getItem("ConnectionId") === "172" ||
          localStorage.getItem("ConnectionId") === "173" ||
          localStorage.getItem("ConnectionId") === "174" ||
          localStorage.getItem("ConnectionId") === "175" ||
          localStorage.getItem("ConnectionId") === "176" ||
          localStorage.getItem("ConnectionId") === "177" ||
          localStorage.getItem("ConnectionId") === "178" ||
          localStorage.getItem("ConnectionId") === "179" ||
          localStorage.getItem("ConnectionId") === "180" ||
          localStorage.getItem("ConnectionId") === "181" ||
          localStorage.getItem("ConnectionId") === "182" ||
          localStorage.getItem("ConnectionId") === "183" ||
          localStorage.getItem("ConnectionId") === "184" ||
          localStorage.getItem("ConnectionId") === "185" ||
          localStorage.getItem("ConnectionId") === "186" ||
          localStorage.getItem("ConnectionId") === "187" ||
          localStorage.getItem("ConnectionId") === "188" ||
          localStorage.getItem("ConnectionId") === "189" ||
          localStorage.getItem("ConnectionId") === "190" ||
          localStorage.getItem("ConnectionId") === "191" ||
          localStorage.getItem("ConnectionId") === "192" ||
          localStorage.getItem("ConnectionId") === "193" ||
          localStorage.getItem("ConnectionId") === "194" ||
          localStorage.getItem("ConnectionId") === "195" ||
          localStorage.getItem("ConnectionId") === "196" ||
          localStorage.getItem("ConnectionId") === "197" ||
          localStorage.getItem("ConnectionId") === "198" ||
          localStorage.getItem("ConnectionId") === "199" ||
          localStorage.getItem("ConnectionId") === "200" ||
          localStorage.getItem("ConnectionId") === "201" ||
          localStorage.getItem("ConnectionId") === "202" ||
          localStorage.getItem("ConnectionId") === "203" ||
          localStorage.getItem("ConnectionId") === "204" ||
          localStorage.getItem("ConnectionId") === "205" ||
          localStorage.getItem("ConnectionId") === "3" ||
          localStorage.getItem("ConnectionId") === "89" ||
          localStorage.getItem("ConnectionId") === "90" ||
          localStorage.getItem("ConnectionId") === "91" ||
          localStorage.getItem("ConnectionId") === "92" ||
          localStorage.getItem("ConnectionId") === "93" ||
          localStorage.getItem("ConnectionId") === "94" ||
          localStorage.getItem("ConnectionId") === "95" ||
          localStorage.getItem("ConnectionId") === "96" ||
          localStorage.getItem("ConnectionId") === "97" ||
          localStorage.getItem("ConnectionId") === "98" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "104" ||
          // localStorage.getItem('ConnectionId') === '105' ||
          localStorage.getItem("ConnectionId") === "106" ||
          localStorage.getItem("ConnectionId") === "107" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "109" ||
          localStorage.getItem("ConnectionId") === "110" ||
          localStorage.getItem("ConnectionId") === "111" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "114" ||
          localStorage.getItem("ConnectionId") === "115" ||
          localStorage.getItem("ConnectionId") === "116" ||
          localStorage.getItem("ConnectionId") === "117" ||
          localStorage.getItem("ConnectionId") === "118" ||
          localStorage.getItem("ConnectionId") === "119" ||
          localStorage.getItem("ConnectionId") === "120" ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "122" ||
          localStorage.getItem("ConnectionId") === "123" ||
          localStorage.getItem("ConnectionId") === "124" ||
          localStorage.getItem("ConnectionId") === "125" ||
          localStorage.getItem("ConnectionId") === "126" ||
          localStorage.getItem("ConnectionId") === "127" ||
          localStorage.getItem("ConnectionId") === "128" ||
          localStorage.getItem("ConnectionId") === "129" ||
          localStorage.getItem("ConnectionId") === "130" ||
          localStorage.getItem("ConnectionId") === "131" ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "135" ||
          localStorage.getItem("ConnectionId") === "136" ||
          localStorage.getItem("ConnectionId") === "137" ||
          localStorage.getItem("ConnectionId") === "138" ||
          localStorage.getItem("ConnectionId") === "139" ||
          localStorage.getItem("ConnectionId") === "140" ||
          localStorage.getItem("ConnectionId") === "141" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "207" ||
          localStorage.getItem("ConnectionId") === "211" ||
          localStorage.getItem("ConnectionId") === "212" ||
          localStorage.getItem("ConnectionId") === "213" ||
          localStorage.getItem("ConnectionId") === "214" ||
          localStorage.getItem("ConnectionId") === "215" ||
          localStorage.getItem("ConnectionId") === "216" ||
          localStorage.getItem("ConnectionId") === "217" ||
          // localStorage.getItem('ConnectionId') === '218' ||
          // localStorage.getItem('ConnectionId') === '219' ||
          localStorage.getItem("ConnectionId") === "220" ||
          localStorage.getItem("ConnectionId") === "221" ||
          // localStorage.getItem('ConnectionId') === '222' ||
          localStorage.getItem("ConnectionId") === "223" ||
          localStorage.getItem("ConnectionId") === "224" ||
          localStorage.getItem("ConnectionId") === "225" ||
          localStorage.getItem("ConnectionId") === "226" ||
          localStorage.getItem("ConnectionId") === "227" ||
          localStorage.getItem("ConnectionId") === "228" ||
          localStorage.getItem("ConnectionId") === "229" ||
          // localStorage.getItem('ConnectionId') === '230' ||
          // localStorage.getItem('ConnectionId') === '231' ||
          localStorage.getItem("ConnectionId") === "232" ||
          localStorage.getItem("ConnectionId") === "209" ||
          localStorage.getItem("ConnectionId") === "233" ||
          localStorage.getItem("ConnectionId") === "208" ||
          localStorage.getItem("ConnectionId") === "210" ||
          localStorage.getItem("ConnectionId") === "206" ||
          // localStorage.getItem('ConnectionId') === '234' ||
          // localStorage.getItem('ConnectionId') === '235' ||
          localStorage.getItem("MainConnectionId") === "313" ||
          localStorage.getItem("MainConnectionId") === "310" ||
          localStorage.getItem("ConnectionId") === "236" ||
          localStorage.getItem("ConnectionId") === "237" ||
          localStorage.getItem("ConnectionId") === "148"
          ? {
              id: localStorage.getItem("ConnectionId").toString(),
              datasource_name: datasourceName,
              data1: data,
              users_account_id: localStorage.getItem("account_id"),
            }
          : {
              id: parseInt(localStorage.getItem("ConnectionId")),
              datasource_name: datasourceName,
              query: query.toString(),
              users_account_id: localStorage.getItem("account_id"),
            },
        {}
      )
      .then((response) => {
        console.log("store datasource api", query, response, data);
        setOpen(true);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const storeDatasourceResult = (index) => {
    console.log("+++++RR", index);
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_datasource_result",
        {
          datasource_id: index,
        },
        {}
      )
      .then((response) => {
        console.log(
          " datasource result api",
          JSON.parse(response.data.data[0].result)
        );
        var tempData = JSON.parse(response.data.data[0].result);
        // setData(tempData);
        setUpDataForGrid(tempData, 2);
        setDt(tempData);
        setQuery(response.data.data[0].query);
        console.log("came ee e e ");
        let abc =
          localStorage.getItem("ConnectionId").toString() === 91
            ? tempData.rows
            : parseInt(localStorage.getItem("ConnectionId")) === 267
            ? tempData.rows
            : localStorage.getItem("ConnectionId").toString() === 125
            ? tempData.pages[0].questions
            : localStorage.getItem("ConnectionId").toString() === 116
            ? tempData.rows
            : tempData;

        let def = [],
          def2 = [],
          ghm2 = [],
          ghm = [],
          tmp1 = [];

        if (localStorage.getItem("ConnectionId").toString() === 91) {
          tempData.metaData.map((e) => {
            def2 = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def2.push({ value: value });
            }
            ghm2.push(def2);
          });

          // setData(abc);
          setUpDataForGrid(abc);

          abc.map((e) => {
            def = [];

            for (const [key, value] of Object.entries(e)) {
              // console.log(`${key}: ${value}`);

              def.push({ value: value });
            }
            ghm.push(def);
          });
          //    console.log('ghm', ghm2.flat())
          ghm.unshift(ghm2.flat());
          console.log("ghm2", ghm);
          dataBox = ghm;
          setRow(ghm);
          setRow2(ghm);
        } else if (
          localStorage.getItem("ConnectionId") === "102" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "133" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "104" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "106" ||
          localStorage.getItem("ConnectionId") === "116" ||
          localStorage.getItem("ConnectionId") === "118" ||
          localStorage.getItem("ConnectionId") === "120" ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "125" ||
          localStorage.getItem("ConnectionId") === "129" ||
          localStorage.getItem("ConnectionId") === "132" ||
          localStorage.getItem("ConnectionId") === "135" ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "123" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "144" ||
          localStorage.getItem("ConnectionId") === "145" ||
          localStorage.getItem("ConnectionId") === "146" ||
          localStorage.getItem("ConnectionId") === "147" ||
          localStorage.getItem("ConnectionId") === "148" ||
          localStorage.getItem("ConnectionId") === "149" ||
          localStorage.getItem("ConnectionId") === "150" ||
          localStorage.getItem("ConnectionId") === "151" ||
          localStorage.getItem("ConnectionId") === "152" ||
          localStorage.getItem("ConnectionId") === "153" ||
          localStorage.getItem("ConnectionId") === "154" ||
          localStorage.getItem("ConnectionId") === "155" ||
          localStorage.getItem("ConnectionId") === "156" ||
          localStorage.getItem("ConnectionId") === "157" ||
          localStorage.getItem("ConnectionId") === "158" ||
          localStorage.getItem("ConnectionId") === "159" ||
          localStorage.getItem("ConnectionId") === "160" ||
          localStorage.getItem("ConnectionId") === "161" ||
          localStorage.getItem("ConnectionId") === "162" ||
          localStorage.getItem("ConnectionId") === "163" ||
          localStorage.getItem("ConnectionId") === "164" ||
          localStorage.getItem("ConnectionId") === "165" ||
          localStorage.getItem("ConnectionId") === "166" ||
          localStorage.getItem("ConnectionId") === "167" ||
          localStorage.getItem("ConnectionId") === "168" ||
          localStorage.getItem("ConnectionId") === "169" ||
          localStorage.getItem("ConnectionId") === "171" ||
          localStorage.getItem("ConnectionId") === "172" ||
          localStorage.getItem("ConnectionId") === "173" ||
          localStorage.getItem("ConnectionId") === "174" ||
          localStorage.getItem("ConnectionId") === "175" ||
          localStorage.getItem("ConnectionId") === "176" ||
          localStorage.getItem("ConnectionId") === "177" ||
          localStorage.getItem("ConnectionId") === "178" ||
          localStorage.getItem("ConnectionId") === "179" ||
          localStorage.getItem("ConnectionId") === "180" ||
          localStorage.getItem("ConnectionId") === "181" ||
          localStorage.getItem("ConnectionId") === "182" ||
          localStorage.getItem("ConnectionId") === "183" ||
          localStorage.getItem("ConnectionId") === "184" ||
          localStorage.getItem("ConnectionId") === "185" ||
          localStorage.getItem("ConnectionId") === "186" ||
          localStorage.getItem("ConnectionId") === "187" ||
          localStorage.getItem("ConnectionId") === "188" ||
          localStorage.getItem("ConnectionId") === "189" ||
          localStorage.getItem("ConnectionId") === "190" ||
          localStorage.getItem("ConnectionId") === "191" ||
          localStorage.getItem("ConnectionId") === "192" ||
          localStorage.getItem("ConnectionId") === "193" ||
          localStorage.getItem("ConnectionId") === "194" ||
          localStorage.getItem("ConnectionId") === "195" ||
          localStorage.getItem("ConnectionId") === "196" ||
          localStorage.getItem("ConnectionId") === "197" ||
          localStorage.getItem("ConnectionId") === "198" ||
          localStorage.getItem("ConnectionId") === "199" ||
          localStorage.getItem("ConnectionId") === "200" ||
          localStorage.getItem("ConnectionId") === "201" ||
          localStorage.getItem("ConnectionId") === "202" ||
          localStorage.getItem("ConnectionId") === "203" ||
          localStorage.getItem("ConnectionId") === "204" ||
          localStorage.getItem("ConnectionId") === "205" ||
          localStorage.getItem("ConnectionId") === "3" ||
          localStorage.getItem("ConnectionId") === "89" ||
          localStorage.getItem("ConnectionId") === "90" ||
          localStorage.getItem("ConnectionId") === "91" ||
          localStorage.getItem("ConnectionId") === "92" ||
          localStorage.getItem("ConnectionId") === "93" ||
          localStorage.getItem("ConnectionId") === "94" ||
          localStorage.getItem("ConnectionId") === "95" ||
          localStorage.getItem("ConnectionId") === "96" ||
          localStorage.getItem("ConnectionId") === "97" ||
          localStorage.getItem("ConnectionId") === "98" ||
          localStorage.getItem("ConnectionId") === "99" ||
          localStorage.getItem("ConnectionId") === "103" ||
          localStorage.getItem("ConnectionId") === "104" ||
          // localStorage.getItem('ConnectionId') === '105' ||
          localStorage.getItem("ConnectionId") === "106" ||
          localStorage.getItem("ConnectionId") === "107" ||
          localStorage.getItem("ConnectionId") === "108" ||
          localStorage.getItem("ConnectionId") === "109" ||
          localStorage.getItem("ConnectionId") === "110" ||
          localStorage.getItem("ConnectionId") === "111" ||
          localStorage.getItem("ConnectionId") === "112" ||
          localStorage.getItem("ConnectionId") === "113" ||
          localStorage.getItem("ConnectionId") === "114" ||
          localStorage.getItem("ConnectionId") === "115" ||
          localStorage.getItem("ConnectionId") === "116" ||
          localStorage.getItem("ConnectionId") === "117" ||
          localStorage.getItem("ConnectionId") === "118" ||
          localStorage.getItem("ConnectionId") === "119" ||
          localStorage.getItem("ConnectionId") === "120" ||
          localStorage.getItem("ConnectionId") === "121" ||
          localStorage.getItem("ConnectionId") === "122" ||
          localStorage.getItem("ConnectionId") === "123" ||
          localStorage.getItem("ConnectionId") === "124" ||
          localStorage.getItem("ConnectionId") === "125" ||
          localStorage.getItem("ConnectionId") === "126" ||
          localStorage.getItem("ConnectionId") === "127" ||
          localStorage.getItem("ConnectionId") === "128" ||
          localStorage.getItem("ConnectionId") === "129" ||
          localStorage.getItem("ConnectionId") === "130" ||
          localStorage.getItem("ConnectionId") === "131" ||
          localStorage.getItem("ConnectionId") === "134" ||
          localStorage.getItem("ConnectionId") === "135" ||
          localStorage.getItem("ConnectionId") === "136" ||
          localStorage.getItem("ConnectionId") === "137" ||
          localStorage.getItem("ConnectionId") === "138" ||
          localStorage.getItem("ConnectionId") === "139" ||
          localStorage.getItem("ConnectionId") === "140" ||
          localStorage.getItem("ConnectionId") === "141" ||
          localStorage.getItem("ConnectionId") === "142" ||
          localStorage.getItem("ConnectionId") === "143" ||
          localStorage.getItem("ConnectionId") === "207" ||
          localStorage.getItem("ConnectionId") === "211" ||
          localStorage.getItem("ConnectionId") === "212" ||
          localStorage.getItem("ConnectionId") === "213" ||
          localStorage.getItem("ConnectionId") === "214" ||
          localStorage.getItem("ConnectionId") === "215" ||
          localStorage.getItem("ConnectionId") === "216" ||
          localStorage.getItem("ConnectionId") === "217" ||
          // localStorage.getItem('ConnectionId') === '218' ||
          // localStorage.getItem('ConnectionId') === '219' ||
          localStorage.getItem("ConnectionId") === "220" ||
          localStorage.getItem("ConnectionId") === "221" ||
          // localStorage.getItem('ConnectionId') === '222' ||
          localStorage.getItem("ConnectionId") === "223" ||
          localStorage.getItem("ConnectionId") === "224" ||
          localStorage.getItem("ConnectionId") === "225" ||
          localStorage.getItem("ConnectionId") === "226" ||
          localStorage.getItem("ConnectionId") === "227" ||
          localStorage.getItem("ConnectionId") === "228" ||
          localStorage.getItem("ConnectionId") === "229" ||
          // localStorage.getItem('ConnectionId') === '230' ||
          // localStorage.getItem('ConnectionId') === '231' ||
          localStorage.getItem("ConnectionId") === "232" ||
          localStorage.getItem("ConnectionId") === "209" ||
          localStorage.getItem("ConnectionId") === "233" ||
          localStorage.getItem("ConnectionId") === "101" ||
          localStorage.getItem("ConnectionId") === "208" ||
          localStorage.getItem("ConnectionId") === "210" ||
          localStorage.getItem("ConnectionId") === "206" ||
          // localStorage.getItem('ConnectionId') === '234' ||
          // localStorage.getItem('ConnectionId') === '235' ||
          localStorage.getItem("ConnectionId") === "236" ||
          localStorage.getItem("ConnectionId") === "237" ||
          localStorage.getItem("ConnectionId") === "148"
        ) {
          // setQuery(JSON.stringify(response.data.data))
          console.log("checkData", abc);
          let def = [],
            ghm = [];
          // setData(abc);
          setUpDataForGrid(abc);
          // abc.map(e => {
          //   def = []

          //   var t1 = Object.keys(e)
          //   t1.map(f => {
          //     if (f != null && typeof f != 'object') def.push({ value: f })
          //     else if (f != null && typeof f === 'object')
          //       def.push({ value: Object.values(f) })
          //   })
          // })
          // ghm.push(def)
          // abc.map(e => {
          //   def = []
          //   var t2 = Object.values(e)
          //   t2.map(f => {
          //     if (f != null && typeof f != 'object') def.push({ value: f })
          //     else if (f != null && typeof f === 'object')
          //       def.push({ value: Object.values(f) })
          //   })
          //   ghm.push(def)
          // })

          // console.log('ghm>', ghm)
          // setRow(ghm)
          // setRow2(ghm)
        } else {
          // setUpDataForGrid(abc)
          // tmp1.push(abc[0])
          // tmp1.map(e => {
          //   def2 = []
          //   for (const [key, value] of Object.entries(e)) {
          //     // console.log(`${key}: ${value}`);
          //     def2.push({ value: key })
          //   }
          //   ghm2.push(def2)
          // })
          // abc.map(e => {
          //   def = []
          //   for (const [key, value] of Object.entries(e)) {
          //     // console.log(`${key}: ${value}`);
          //     def.push({ value: value })
          //   }
          //   ghm.push(def)
          // })
          // //  console.log('ghm', ghm2.flat())
          // // if (localStorage.getItem('ConnectionId') != '267')
          // ghm.unshift(ghm2.flat())
          // // console.log('ghm2', ghm)
          // setRow(ghm)
          // setRow2(ghm)
        }

        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };
  const renderTree = (nodes) => {
    return nodes.map((el) => {
      //  console.log('el', el.lable ? true : false)
      return (
        <TreeItem
          disabled={el.children && el.children.length === 0 ? false : true}
          key={el.nodeId}
          nodeId={el.nodeId.toString()}
          label={el.label}
        >
          {Array.isArray(el.children) && el.children.length > 0
            ? renderTree(el.children) //<-- recursion in case children has values
            : null}
        </TreeItem>
      );
    });
  };

  const renderTree2 = (nodes) => {
    return nodes.map((el) => {
      return (
        <TreeItem
          style={{ marginLeft: 20 }}
          sx={{
            "&:hover, &:focus": {
              bgcolor: "#eddd98",
            },
          }}
          key={el.id}
          nodeId={el.id.toString()}
          label={el.name}
          icon={
            <img
              src={"/sqlserver.png"}
              style={{ marginleft: 90 }}
              height={20}
              width={20}
            />
          }
        ></TreeItem>
      );
    });
  };

  const handleClick = (Id) => {
    console.log("NodeId>", Id);
    setOpentree2(Id);
    setOpentree(!opentree);
  };

  const generateQuery = () => {
    if (localStorage.getItem("ConnectionId") === 99) {
      setQuery("select * from " + "dbo" + "." + selectedTable + ";");
    } else if (localStorage.getItem("ConnectionId") === 101) {
      setQuery("select * from " + "public" + "." + selectedTable + ";");
    } else if (localStorage.getItem("ConnectionId") === 91) {
      setQuery("select * from " + "system" + "." + selectedTable + ";");
    } else {
      setQuery("select * from " + selectedDb2 + "." + selectedTable + ";");
    }
  };

  const generateQuery2 = () => {
    setQuery(
      "SELECT * FROM " +
        selectedTable1 +
        " " +
        "INNER JOIN " +
        selectedTable2 +
        " " +
        "ON " +
        selectedTable1 +
        "." +
        column1 +
        "=" +
        selectedTable2 +
        "." +
        column2
    );
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseModal2 = () => setOpenDataSourceModal(false);
  const handleCloseModal3 = () => setOpenDataSourceModal2(false);
  const handleCloseModal4 = () => setOpenDataSourceModal3(false);

  const handleFocus = (d) => {
    // console.log('focues', d)
    if (highlightOn) {
      d.borderColor = "#00ff00";
      box1.push(d);
      // console.log('focuesbox', box1)
      setHighlight(box1);
    }
  };

  const handleColumnResize = (ci, width) => {
    setColumnData((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };

  const simpleHandleContextMenu = (
    selectedRowIds,
    selectedColIds,
    selectionMode,
    menuOptions
  ) => {
    return menuOptions;
  };

  useEffect(() => {
    console.log("ROWS>", rowsData);
    if (rowsData) convertData(rowsData);
  }, [rowsData]);

  useEffect(() => {}, [highlight1]);

  useEffect(() => {}, [highlightOn]);

  useEffect(() => {
    console.log("2111", rowsDataBackup);
  }, [rowsDataBackup]);

  const convertData = (data) => {
    let box2 = [];
    data.map((e, i) => {
      let box = [];
      e.cells.map((e2) => {
        box.push(e2.text);
      });
      box2.push(box);
    });
    console.log("data<<<2", box2);
    setData(box2);

    return box2;
  };

  const handleChanges = (changes) => {
    setrowsData((prevPeople) => applyChangesToPeople(changes, prevPeople));
  };
  const applyChangesToPeople = (changes, prevPeople) => {
    // console.log('nnned', changes)
    changes.forEach((change) => {
      const personIndex = change?.rowId;
      const fieldName = change?.columnId;
      // console.log('nnned2', personIndex, fieldName, prevPeople)
      // const data = [...prevPeople]
      const targetIndex = prevPeople.findIndex((f) =>
        f.cells.find((e) => e.id === change.rowId)
      );
      let targetColumn = prevPeople[0].cells.findIndex(
        (f) => f.text === fieldName
      );
      // console.log('target', targetColumn, targetIndex, prevPeople[targetIndex])
      prevPeople[targetIndex].cells[targetColumn] = change.newCell;
      // console.log('target data', data)
    });
    return [...prevPeople];
  };

  const setUpDataForGrid = (data, mode) => {
    console.log("Check Data>>", mode === 2, data);
    let abc = data;
    let def = [],
      ghm = [];
    // setData(abc);

    abc.map((e) => {
      def = [];
      var t1;

      if (mode === 2) t1 = Object.keys(abc[0]);
      else t1 = Object.values(abc[0]);

      t1.map((e) => {
        if (e.value === undefined) def.push({ value: e });
        else def.push({ value: e?.value });
      });
    });

    // console.log('check def1',def)

    ghm.push(def);
    // ghm.shift()
    console.log("check def2", ghm);

    let dt = abc.slice(1, abc.length);
    dt.map((e) => {
      def = [];
      var t2 = Object.values(e);
      // console.log('TTT2',t2)
      // if (flag === 1)
      // console.log('TTT2',t2)
      t2.map((f) => {
        if (f != null && typeof f != "object") def.push({ value: f });
        if (f != null && typeof f === "object") {
          // console.log('fff', f)
          def.push({ value: Object.values(f) });
        }
      });
      ghm.push(def);
    });

    // console.log('ghm>', ghm)
    let dataBox = [];
    ghm.map((e) => {
      let t = [];
      e.map((e2) => {
        t.push(e2.value);
      });

      dataBox.push(t);
    });

    // console.log('final>', dataBox)
    // console.log('final1>', flag, dataBox)
    let d1 = [...dataBox];
    let columns = d1[0];
    let columnsBox = [];
    let cells = [];
    // console.log('Check c-', columns)
    columns?.map((e) => {
      columnsBox.push({
        columnId: e,
        width: 150,
        resizable: true,
        reorderable: true,
      });
      // console.log('WHat is',typeof e)
      cells.push({
        type: "header",
        text: typeof e === "array" ? e[0] : e,
      });
    });

    setColumnData(columnsBox);

    let rowsBox = [];

    rowsBox.push({
      rowId: "header",
      cells: cells,
    });
    let c = 0;

    let data1 = [...dataBox];
    data1.shift();

    // console.log('caaaam', data1)
    data1.map((e) => {
      let cells1 = [];
      e.map((e2) => {
        // console.log('eeee2',e2,e2)
        cells1.push({
          id: c,
          type: "text",
          text: typeof e2 === "string" ? e2 : e2.toString(),
        });

        // console.log('In ExploreCols', cells1)
      });

      rowsBox.push({
        rowId: c,
        cells: cells1,
      });
      c++;
    });

    console.log("Data for grid>", rowsBox);
    setrowsData(rowsBox);
    if (flag === 1) setrowsDataBackup(rowsBox);
    if (flag === 0) flag = 1;
    else if (flag === 1) flag = 2;
  };

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div>
            <div
              style={{
                marginTop: -98,
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "12%",
                  height: "70px",
                  border: "4px solid #C1D9EC",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  marginLeft: "120px",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "20px",
                    marginRight: "20px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={"/copy&.png"}
                    style={{ height: "30px", width: "38px" }}
                  ></img>
                  <div style={{ fontSize: "13px" }}>Close & Apply</div>
                  <img
                    src={"/chevron.png"}
                    style={{ width: "38px", height: "20px" }}
                  ></img>
                </div>
              </div>
              <div style={{ width: "5%" }}></div>
              <div
                style={{
                  width: "70%",
                  backgroundColor: "#C1D9EC",
                  height: "80px",
                  marginRight: "25px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "12px",
                  paddingLeft: "8px",
                }}
              >
                <div
                  style={{
                    height: "78%",
                    backgroundColor: "white",
                    margin: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "20%" }}>
                      <img src={"/q1.png"} style={{ height: "30px" }}></img>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        width: "70%",
                        marginLeft: "-10px",
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      New source
                    </div>
                    <img
                      src={"/chevron.png"}
                      style={{ width: "10%", marginLeft: "10px" }}
                    ></img>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "20%" }}>
                      <img src={"/q2.png"} style={{ height: "30px" }}></img>
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        width: "70%",
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Recent source
                    </div>
                    <img src={"/chevron.png"} style={{ width: "10%" }}></img>
                  </div>
                </div>
                <div
                  style={{
                    height: "75%",
                    backgroundColor: "white",
                    margin: "5px",
                    width: "140px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderTopLeftRadius: "12px",
                  }}
                >
                  <div style={{ marginTop: "5px" }}>
                    <img
                      src={"/enterdata.png"}
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontFamily: "Trebuchet MS",
                      marginTop: "6px",
                    }}
                  >
                    Enter Data
                  </div>
                </div>
                <div
                  style={{
                    height: "75%",
                    backgroundColor: "white",
                    margin: "5px",
                    width: "140px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <div style={{ marginTop: "5px" }}>
                    <img
                      src={"/enterdata.png"}
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontFamily: "Trebuchet MS",
                      marginTop: "6px",
                    }}
                  >
                    Refresh Data
                  </div>
                </div>

                <div>
                  {localStorage.getItem("FromWidget") == 0 || undefined ? (
                    <Button
                      sx={{
                        color: "#ffff",
                        fontSize: "13px",
                        bgcolor: "#0aafff",
                        border: "none",
                        marginLeft: "25px",
                        fontWeight: "bolder",
                        "&:hover, &:focus": {
                          bgcolor: "#067ab4",
                          color: "white",
                        },
                      }}
                      size="medium"
                      onClick={() => {
                        history.push("/Create_Flow");
                      }}
                      variant="outlined"
                    >
                      Create a flow
                    </Button>
                  ) : null}
                </div>
                <Button
                  style={{ border: "0.5px solid #0aafff" }}
                  sx={{
                    bgcolor: "#ffff",
                    color: "#0aafff",
                    fontSize: "13px",
                    fontWeight: "bolder",
                    ml: 4,
                    "&:hover, &:focus": {
                      bgcolor: "#067ab4",
                      color: "white",
                    },
                  }}
                  size="medium"
                  onClick={() => {
                    if (localStorage.getItem("FlowID") === null) {
                      setFlowIdPresent(false);
                      return;
                    }
                    //  history.push(
                    //     "/Widget Dashboard/new/" + global.subscription_id
                    //   );
                    else {
                      if (data?.length > 0) {
                        alert("Data Not available");
                        return;
                      }

                      history.push({
                        pathname:
                          "/Widget Dashboard/new_widget/" +
                          global.subscription_id,
                        state: data,
                        new: true,
                      });
                    }
                  }}
                  variant="outlined"
                >
                  Create New Widget
                </Button>
                <div
                  style={{
                    position: "absolute",
                    marginLeft: "20%",
                  }}
                >
                  {!flowIdPresent && (
                    <Alert
                      style={{ height: 32, alignItems: "center" }}
                      severity={"error"}
                    >
                      Select a flow from batches first
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              // marginTop: -50,
              width: "100%",
              display: "flex",
            }}
          ></div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "25%", backgroundColor: "#C1D9EC" }}>
                <Box
                  sx={{
                    marginLeft: 10,
                    width: "100%",
                    height: 460,
                    border: "0.5px solid #CCC",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: 48,
                      // backgroundColor: "#cccccc",
                    }}
                  >
                    <div
                      style={{
                        color: "#067ab4",
                        fontWeight: "500",
                        textAlign: "left",
                        marginLeft: 20,
                        alignSelf: "center",
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Schemas
                    </div>
                    <Sync
                      sx={{
                        height: 25,
                        marginLeft: "37%",
                        alignSelf: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setOpenDialog(true);
                        showDatabases();
                        viewAllDatasource();
                      }}
                      style={{ color: "#4a4949" }}
                    />
                  </div>

                  <List
                    sx={{
                      width: "72%",
                      // margin: '0px auto',
                      height: 370,
                      bgcolor: "white",
                      overflowY: "scroll",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    {allSchemas.map((row, index) => (
                      <>
                        <ListItemButton
                          style={{
                            height: 50,
                            width: 500,
                            overflow: "auto",
                          }}
                          sx={{
                            "&:hover, &:focus": {
                              bgcolor: "#C1D9EC",
                            },
                          }}
                          key={row.nodeId}
                          onClick={() => {
                            setcontainerName(row?.label);
                            console.log("DB name>", row?.label, index);
                            setDbName(row?.label);
                            // if (row.children[0] === undefined)
                            //   showTables(row.label, index)

                            handleClick(row.nodeId);
                          }}
                        >
                          <ListItemText
                            style={{ marginLeft: 30 }}
                            primary={row.label}
                          />

                          {opentree2 === row.nodeId && opentree === false ? (
                            <MinusSquare
                              style={{ position: "absolute", marginLeft: -5 }}
                            />
                          ) : (
                            <PlusSquare
                              style={{ position: "absolute", marginLeft: -5 }}
                            />
                          )}
                        </ListItemButton>

                        <Collapse
                          in={opentree2 === row.nodeId && opentree === false}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {row.children &&
                              row.children.map((row, index) => (
                                <ListItemButton
                                  sx={{
                                    pl: 4,
                                    height: 40,
                                  }}
                                  onClick={() => {
                                    console.log("table name", row?.label);
                                    setTableName1(row?.label);
                                    setQuery(
                                      `select * from ${databaseName}.${row?.label};`
                                    );
                                    executeQuery(
                                      `select * from ${databaseName}.${row?.label};`
                                    );
                                    // showTables(row.label, index)
                                    // if (
                                    //   row.children &&
                                    //   row.children[0] === undefined
                                    // )
                                    //   showTables(row.label, index, 1)
                                    handleClick(row.nodeId);
                                    if (
                                      localStorage.getItem(
                                        "MainConnectionId"
                                      ) === "310"
                                    ) {
                                      var def2 = [];
                                      let def = [],
                                        ghm = [];
                                      tempbox2.map((e) => {
                                        def = [];
                                        if (e) var t1 = Object.keys(e);
                                        t1.map((f) => {
                                          if (f != null && typeof f != "object")
                                            def.push({ value: f });
                                          else if (
                                            f != null &&
                                            typeof f === "object" &&
                                            typeof f === "array"
                                          )
                                            def.push({
                                              value: Object.values(f),
                                            });
                                        });
                                      });
                                      ghm.push(def);

                                      tempbox2.map((e) => {
                                        def2 = [];
                                        if (e) var t2 = Object.values(e);

                                        t2.map((f) => {
                                          if (
                                            f != null &&
                                            typeof f != "object"
                                          ) {
                                            def2.push({ value: f });
                                          } else if (
                                            f != null &&
                                            typeof f === "object" &&
                                            typeof f === "array"
                                          )
                                            def2.push({
                                              value: Object.values(f),
                                            });
                                        });
                                        ghm.push(def2);
                                      });
                                      setRow(ghm);
                                    }
                                  }}
                                >
                                  <ListItemText
                                    style={{
                                      color: "black",
                                      marginTop: "10px",
                                      marginLeft: 25,
                                      fontSize: "10px",
                                    }}
                                    primary={row.label}
                                  />
                                </ListItemButton>
                              ))}
                          </List>
                        </Collapse>
                      </>
                    ))}
                  </List>
                </Box>
                <Box
                  sx={{
                    marginTop: -4.2,
                    marginLeft: 10,
                    // maxHeight: 400,
                    height: "60.9vh",
                    width: "18vw",
                    maxWidth: "100%",
                    bgcolor: "#f4f4f4",
                    overflow: "scroll",
                    border: "0.5px solid #CCC",
                  }}
                >
                  <div
                    style={{
                      height: 45,
                      width: 320,
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#C1D9EC",
                    }}
                  >
                    <div
                      style={{
                        color: "#067ab4",
                        textAlign: "left",
                        marginLeft: 20,
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                        fontWeight: "500",
                      }}
                    >
                      Datasets
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <TreeView
                      aria-label="Datasources"
                      defaultCollapseIcon={<PlusSquare />}
                      defaultExpandIcon={<PlusSquare />}
                      sx={{
                        flexGrow: 1,
                        maxWidth: 400,
                        height: "100%",
                        overflowY: "scroll",
                        color: "#0e0e0e",
                        textAlign: "left",
                        marginLeft: -2,
                      }}
                      selected={selectedDatasource}
                      onNodeSelect={(event, index) => {
                        console.log("selcted", event.target.value, index);
                        setselectedDatasource(event.target.innerText);
                        setSelectedDatasourceId(index);
                        storeDatasourceResult(index);
                      }}
                    >
                      {renderTree2(datasource && datasource)}
                    </TreeView>
                  </div>
                </Box>
              </div>

              <div
                style={{
                  height: 80,
                  width: "75%",
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                  backgroundColor: "white",
                  marginLeft: 0.5,
                }}
              >
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    padding: 4,
                  }}
                >
                  {/* <Tooltip
                    title="Open a script file in this editor"
                    placement="bottom-start"
                  >
                    <Folder
                      sx={{ height: 25 }}
                      onClick={() => setShowInputOption(true)}
                      style={{
                        color: "#4a4949",
                        marginLeft: 6,
                        marginRight: 6,
                      }}
                    />
                  </Tooltip> */}

                  {/* <Tooltip
                    title="Save the script to the file"
                    placement="bottom-start"
                  >
                    <Save
                      sx={{ height: 25 }}
                      onClick={() => setOpenModal(true)}
                      style={{ color: "#4a4949", marginRight: 6 }}
                    />
                  </Tooltip> */}

                  <Tooltip
                    title="Execute the selected portion of the script or everything, if there is no selection"
                    placement="bottom-start"
                  >
                    <span>
                      <IconButton
                        style={{ marginLeft: -4 }}
                        color="inherit"
                        edge="start"
                        disabled={
                          selectedQuery === ""
                            ? query === ""
                            : selectedQuery === ""
                        }
                      >
                        {/* <FlashOn
                          sx={{ height: 25 }}
                          onClick={() => {
                            setInProgress(true);
                            if (selectedQuery === "") executeQuery();
                            else executeSelectedQuery(1);
                          }}
                          style={{ color: "#4a4949", marginRight: 6 }}
                        /> */}
                        <button
                          onClick={() => {
                            console.log(
                              "check query is selected",
                              selectedQuery,
                              selectedQuery ? true : false
                            );
                            setInProgress(true);
                            if (selectedQuery) executeSelectedQuery(1);
                            else executeQuery();
                          }}
                          style={{
                            height: "40px",
                            width: "120px",
                            borderRadius: "3px",
                            backgroundColor: "#0BAFFF",
                            color: "white",
                            fontWeight: "bolder",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 10,
                            cursor: "pointer",
                          }}
                        >
                          <PlayArrowOutlinedIcon
                            style={{ marginLeft: "-10px" }}
                          />
                          <span style={{ fontSize: "12px" }}>Run Query</span>
                        </button>
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip
                    title="Beautify/reformate the SQL script"
                    placement="bottom-start"
                  >
                    <button
                      onClick={() => formatQuery()}
                      style={{
                        height: "40px",
                        width: "120px",
                        borderRadius: "3px",
                        backgroundColor: "white",
                        color: "#0BAFFF",
                        fontWeight: "bolder",
                        border: "1px solid #0BAFFF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                        cursor: "pointer",
                      }}
                    >
                      <FormatColorTextOutlinedIcon sx={{ color: "#0BAFFF" }} />
                      <span style={{ fontSize: "12px" }}>Format Query</span>
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Open a script file in this editor"
                    placement="bottom-start"
                  >
                    <Folder
                      sx={{ height: 25 }}
                      onClick={() => setShowInputOption(true)}
                      style={{
                        color: "#0aafff",
                        marginLeft: 14,
                        cursor: "pointer",
                        // marginRight: 6
                      }}
                    />
                  </Tooltip>

                  <Tooltip
                    title="Save the script to the file"
                    placement="bottom-start"
                  >
                    <Save
                      sx={{ height: 25, marginLeft: 2 }}
                      onClick={() => setOpenModal(true)}
                      style={{ color: "#0aafff", cursor: "pointer" }}
                    />
                  </Tooltip>
                  <Tooltip
                    title="Stop the query being excuted (The connection the DB server will not be started and any open transactions will remain open)"
                    placement="bottom-start"
                  >
                    <DoDisturb
                      sx={{ height: 25, marginLeft: 6 }}
                      style={{
                        color: "#0aafff",
                        marginLeft: 10,
                        cursor: "pointer",
                        // marginRight: 6
                      }}
                      onClick={() => {
                        setInProgress(false);
                      }}
                    />
                  </Tooltip>

                  <Tooltip
                    title="Execute the statement under the keyboard cursor"
                    placement="bottom-start"
                  >
                    <span>
                      <IconButton
                        color="inherit"
                        edge="start"
                        sx={{
                          width: 40,
                          ml: "4px",
                        }}
                      >
                        <FlashAuto
                          sx={{
                            height: 25,
                            color: "#0aafff",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            beforeCursor();
                            executeSelectedQuery(2);
                            setInProgress(true);
                          }}
                        />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Box>
                    <FormControl
                      variant="standard"
                      style={{
                        marginTop: 3,
                        marginLeft: 10,
                        marginRight: 12,
                        width: 140,
                        color: "white",
                      }}
                    >
                      <select
                        value={num}
                        onChange={(e) => {
                          setNum(e.target.value);
                        }}
                        style={{
                          height: 30,
                          borderRadius: 8,
                          fontSize: "14px",
                          fontFamily: "Trebuchet MS",
                        }}
                      >
                        <option
                          value={"Dont Limit"}
                          onChange={(e) => setNum(rows.length)}
                        >
                          Dont't Limit
                        </option>
                        <option
                          value={5}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 5 rows
                        </option>
                        <option
                          value={50}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 50 rows
                        </option>
                        <option
                          value={100}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 100 rows
                        </option>
                        <option
                          value={200}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 200 rows
                        </option>
                        <option
                          value={300}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 300 rows
                        </option>
                        <option
                          value={400}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 400 rows
                        </option>
                        <option
                          value={500}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 500 rows
                        </option>
                        <option
                          value={600}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 600 rows
                        </option>
                        <option
                          value={700}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 700 rows
                        </option>
                        <option
                          value={800}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 800 rows
                        </option>
                        <option
                          value={900}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 900 rows
                        </option>
                        <option
                          value={1000}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 1000 rows
                        </option>
                        <option
                          value={50000}
                          onChange={(e) => setNum(e.target.value)}
                        >
                          Limit to 50000 rows
                        </option>
                      </select>
                    </FormControl>
                  </Box>

                  <Tooltip
                    title="Show the Find panel to the editor"
                    placement="bottom-start"
                  >
                    <SavedSearch
                      sx={{ height: 25 }}
                      onClick={() => setShowSearchBar(!showSearchBar)}
                      style={{
                        color: "#0aafff",
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>

                  <Tooltip
                    title="Toggle display of invisible charecters (spaces, tabs, newlines)"
                    placement="bottom-start"
                  >
                    <BlurOn
                      sx={{ height: 25 }}
                      onClick={() => {
                        setOn(!on);
                        replaceSpaceWithDot();
                      }}
                      style={
                        on === true
                          ? {
                              color: "#0aafff",
                              marginRight: 10,
                              cursor: "pointer",
                            }
                          : {
                              color: "#0aafff",
                              marginRight: 10,
                              cursor: "pointer",
                            }
                      }
                    />
                  </Tooltip>

                  <Tooltip
                    title="Generate select query for selected table"
                    placement="bottom-start"
                  >
                    <QueryBuilder
                      sx={{ height: 25 }}
                      onClick={() => {
                        setOpenDataSourceModal(true);
                        setModalOpened(true);
                      }}
                      style={{
                        color: "#0aafff",
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>

                  <Tooltip
                    title="Generate join query for selected table"
                    placement="bottom-start"
                  >
                    <Build
                      sx={{ height: 25 }}
                      onClick={() => {
                        setOpenDataSourceModal2(true);
                      }}
                      style={{
                        color: "#0aafff",
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>

                  <div
                    style={{
                      position: "absolute",
                      right: "-74px",
                      top: 130,
                    }}
                  >
                    {showInputOption && (
                      <div>
                        <input
                          type="file"
                          accept=".sql"
                          onChange={(e) => handleChangeFile(e.target.files[0])}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      zIndex: 2,
                      marginLeft: 700,
                      marginTop: 90,
                      position: "absolute",
                    }}
                  >
                    {showSearchBar && (
                      <div>
                        <input
                          style={{
                            height: 26,
                            border: "0.5px solid gray",
                            backgroundColor: "#6f7e87",
                            width: "200px",
                            padding: "10px",
                            fontSize: 14,
                            outline: "none",
                            borderRadius: 10,
                            color: "white",
                          }}
                          type="search"
                          placeholder="Find"
                          onChange={(event) => {
                            setSearchWord(event.target.value);
                          }}
                          value={searchWord}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{ height: 1, width: "100%", backgroundColor: "#CCC" }}
                ></div>

                <CodeMirror
                  autoCursor={true}
                  ref={codemirrorRef}
                  value={query}
                  onBeforeChange={(editor, data, value) => {
                    setQuery(value);
                  }}
                  options={options}
                  onCursor={(editor, data) => {
                    setCursorLine(data.line);
                  }}
                />

                <div
                  style={{ height: 1, width: "100%", backgroundColor: "#CCC" }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#e3e3e3",
                    height: 285,
                  }}
                >
                  <div>
                    <Highlighter
                      style={{
                        padding: 10,
                        color: "#0aafff",
                        height: 110,
                        overflow: "scroll",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                      search={searchWord}
                    >
                      {query}
                    </Highlighter>
                  </div>
                  <div
                    style={{
                      marginTop: -1,
                      height: 45,
                      width: "100%",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "370px",
                        marginLeft: "10px",
                      }}
                    >
                      <Tooltip title="Edit Mode">
                        <div
                          style={{
                            backgroundColor: editMode ? "#067AB4" : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setEditMode(!editMode)}
                        >
                          <IconButton>
                            <EditIcon sx={{ color: editMode && "white" }} />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Tooltip title="Column Resizing">
                        <div
                          style={{
                            backgroundColor: columnResize
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setColumnResize(!columnResize)}
                        >
                          <IconButton>
                            <SwapHorizIcon
                              sx={{ color: columnResize && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Sticky Header">
                        <div
                          style={{
                            backgroundColor: stickyHeader
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setStickyHeader(!stickyHeader)}
                        >
                          <IconButton>
                            <DragHandleIcon
                              sx={{ color: stickyHeader && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Column Selection">
                        <div
                          style={{
                            backgroundColor: columnSelection
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setColumnSelection(!columnSelection)}
                        >
                          <IconButton>
                            <PhotoSizeSelectSmallIcon
                              sx={{ color: columnSelection && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Row Selection">
                        <div
                          style={{
                            backgroundColor: rowSelection
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setRowSelection(!rowSelection)}
                        >
                          <IconButton>
                            <HighlightAltIcon
                              sx={{ color: rowSelection && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Fill Handle">
                        <div
                          style={{
                            backgroundColor: fillHandle ? "#067AB4" : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setFillHandle(!fillHandle)}
                        >
                          <IconButton>
                            <GradingIcon
                              sx={{ color: fillHandle && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Context Menu">
                        <div
                          style={{
                            backgroundColor: contextMenu
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setContextMenu(!contextMenu)}
                        >
                          <IconButton>
                            <ContentCopyIcon
                              sx={{ color: contextMenu && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>

                      <Tooltip title="Highlight">
                        <div
                          style={{
                            backgroundColor: highlightOn
                              ? "#067AB4"
                              : "#C1D9EC",
                            borderRadius: "8px",
                          }}
                          onClick={() => setHighlightOn(!highlightOn)}
                        >
                          <IconButton>
                            <HighlightIcon
                              sx={{ color: highlightOn && "white" }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </div>

                    <div>
                      <CSVLink data={data && data}>
                        <text
                          style={{
                            color: "#4a4949",
                            marginLeft: 18,
                            fontFamily: "Trebuchet MS",
                            fontSize: "13px",
                          }}
                        >
                          Export
                        </text>
                      </CSVLink>
                    </div>
                    <FileDownload
                      sx={{ height: 22 }}
                      onClick={() => console.log("clicked")}
                      style={{
                        color: "#0aafff",
                        marginTop: 2,
                        marginLeft: 8,
                        marginRight: 10,
                      }}
                    />

                    <text
                      style={{
                        color: "#4a4949",
                        marginLeft: 12,
                        fontFamily: "Trebuchet MS",
                        fontSize: "13px",
                      }}
                    >
                      Save Dataset
                    </text>
                    <Folder
                      sx={{ height: 25 }}
                      style={{
                        color: "#0aafff",
                        marginLeft: 10,
                        marginRight: 40,
                        cursor: "pointer",
                      }}
                      onClick={() => setOpenDataSourceModal3(true)}
                    />
                    <div
                      style={{
                        color: "#4a4949",
                        marginLeft: 12,
                        marginRight: 10,
                        fontFamily: "Trebuchet MS",
                        fontSize: "13px",
                      }}
                    >
                      Filter Rows:
                    </div>
                    <div>
                      <input
                        style={{
                          height: 30,
                          border: "0.5px solid gray",
                          backgroundColor: "white",
                          width: "200px",
                          padding: "10px",
                          fontSize: 14,
                          outline: "none",
                          borderRadius: 10,
                          color: "#4a4949",
                        }}
                        type="search"
                        placeholder="Search"
                        onChange={(event) => setSearchInput(event.target.value)}
                        value={searchInput}
                      />
                    </div>

                    {inProgress && (
                      <Box
                        sx={{
                          marginLeft: "35%",
                          marginBottom: 85,
                          position: "absolute",
                        }}
                      >
                        <CircularProgress
                          sx={{ size: 5, thickness: 6, color: "#0BAFFF" }}
                        />
                      </Box>
                    )}

                    <Snackbar
                      open={open}
                      autoHideDuration={1500}
                      onClose={handleClose}
                    >
                      <Alert elevation={6} variant="filled" severity="success">
                        DataSource saved Successfully!
                      </Alert>
                    </Snackbar>

                    <Snackbar
                      open={showSuccess}
                      autoHideDuration={1500}
                      onClose={() => setShowSuccess(false)}
                    >
                      <Alert elevation={6} variant="filled" severity="success">
                        Query Successful!
                      </Alert>
                    </Snackbar>
                  </div>
                  <div
                    style={{
                      height: "46vh",
                      width: "74.2vw",
                      marginLeft: -2,
                      marginTop: 0,
                      backgroundColor: "white",
                      overflow: "scroll",
                      border: "0.1px solid #c3c3c3",
                    }}
                  >
                    {/* <Spreadsheet data={rows && rows} /> */}
                    {rowsData && (
                      <ReactGrid
                        rows={rowsData}
                        columns={columnData}
                        enableRangeSelection={fillHandle ? true : false}
                        enableFillHandle={fillHandle ? true : false}
                        enableFullWidthHeader
                        enableRowSelection={rowSelection ? true : false}
                        enableColumnSelection={columnSelection ? true : false}
                        stickyTopRows={stickyHeader ? 1 : 0}
                        onColumnResized={
                          columnResize ? handleColumnResize : null
                        }
                        onCellsChanged={editMode ? handleChanges : null}
                        onContextMenu={simpleHandleContextMenu}
                        onFocusLocationChanged={handleFocus}
                        highlights={highlightOn ? highlight1 : []}
                      />
                    )}
                    <Modal
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalstyle}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <text style={{ marginTop: 25 }}>
                            Enter name of the file to download
                          </text>
                          <TextField
                            style={{ marginTop: 15 }}
                            id="outlined-basic"
                            size="small"
                            value={fileName}
                            placeholder="Enter File Name"
                            onChange={(event) =>
                              setFileName(event.target.value)
                            }
                            label="File Name"
                            variant="outlined"
                          />
                          <div style={{ marginTop: 15 }}>
                            <Button
                              sx={{
                                bgcolor: "#067AB4",
                                color: "white",
                                "&:hover, &:focus": {
                                  bgcolor: "#0BAFFF",
                                  color: "white",
                                },
                              }}
                              onClick={() => {
                                if (fileName === "") {
                                  setNofileName(true);
                                  return;
                                } else {
                                  downloadTxtFile();
                                  setNofileName(false);
                                  handleCloseModal();
                                }
                              }}
                              variant="outlined"
                            >
                              Save
                            </Button>
                          </div>
                          {nofileName && (
                            <Alert
                              style={{
                                height: 30,
                                marginTop: 10,
                                alignItems: "center",
                              }}
                              severity={"info"}
                            >
                              Please Enter Filename
                            </Alert>
                          )}
                        </div>
                      </Box>
                    </Modal>

                    <Modal
                      open={openDatasourceModal3}
                      onClose={handleCloseModal4}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalstyle}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <text style={{ marginTop: 25 }}>
                            Enter name of the datasource to save
                          </text>
                          <TextField
                            style={{ marginTop: 15 }}
                            id="outlined-basic"
                            size="small"
                            value={datasourceName}
                            onChange={(event) =>
                              setDataSourceName(event.target.value)
                            }
                            label="DataSource Name"
                            variant="outlined"
                          />
                          <div style={{ marginTop: 15 }}>
                            <Button
                              sx={{
                                bgcolor: "#067AB4",
                                color: "white",
                                "&:hover, &:focus": {
                                  bgcolor: "#0BAFFF",
                                  color: "white",
                                },
                              }}
                              onClick={() => {
                                if (datasourceName === "") {
                                  setNoDatasetName(true);
                                  return;
                                }
                                storeDatasource();
                                handleCloseModal4();
                                setNoDatasetName(false);
                                setTimeout(() => viewAllDatasource(), 2000);
                              }}
                              variant="outlined"
                            >
                              Save
                            </Button>
                          </div>
                          {noDatasetName && (
                            <Alert
                              style={{
                                height: 30,
                                marginTop: 10,
                                alignItems: "center",
                              }}
                              severity={"info"}
                            >
                              Please Enter Dataset Name
                            </Alert>
                          )}
                        </div>
                      </Box>
                    </Modal>

                    <Modal
                      open={openDatasourceModal}
                      onClose={handleCloseModal2}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalstyle2}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <text style={{ marginTop: 25, fontSize: 14 }}>
                              Select Schema
                            </text>
                            <select
                              onChange={(e) => {
                                setSelectedDb2(e.target.value);
                                console.log(e.target.value);
                              }}
                              style={{
                                marginTop: 10,
                                background: "lightgray",
                                border: "1px solid #FFF",
                                width: 150,
                                marginLeft: 10,
                                height: 25,
                              }}
                            >
                              {allSchemas &&
                                allSchemas.map((ele) => (
                                  <option
                                    style={{ fontSize: 14, height: 25 }}
                                    value={ele.label}
                                  >
                                    {ele.label}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <text style={{ marginTop: 25, fontSize: 14 }}>
                              select Table
                            </text>
                            <select
                              onChange={(e) => {
                                console.log("table-", e.target.value);
                                setSelectedtable(e.target.value);
                              }}
                              style={{
                                marginTop: 10,
                                background: "lightgray",
                                border: "1px solid #FFF",
                                width: 150,
                                marginLeft: 10,
                                height: 25,
                              }}
                            >
                              {allSchemas.map(
                                (ele) =>
                                  ele.label == selectedDb2 &&
                                  ele.children.map((ele) => (
                                    <option
                                      style={{ fontSize: 14, height: 25 }}
                                      value={ele.label}
                                    >
                                      {ele.label}
                                    </option>
                                  ))
                              )}
                            </select>
                          </div>
                          <div style={{ marginTop: 25, alignSelf: "center" }}>
                            <Button
                              sx={{
                                bgcolor: "#067AB4",
                                color: "white",
                                "&:hover, &:focus": {
                                  bgcolor: "#0BAFFF",
                                  color: "white",
                                },
                              }}
                              onClick={() => {
                                handleCloseModal2();
                                generateQuery();
                              }}
                              variant="outlined"
                            >
                              Generate Query
                            </Button>
                          </div>
                        </div>
                      </Box>
                    </Modal>

                    <Modal
                      open={openDatasourceModal2}
                      onClose={handleCloseModal3}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalstyle3}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <text style={{ marginTop: 25, fontSize: 14 }}>
                                Select Schema 1
                              </text>
                              <select
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  setSelectedDb3(e.target.value);
                                }}
                                style={{
                                  marginTop: 10,
                                  background: "lightgray",
                                  border: "1px solid #FFF",
                                  width: 150,
                                  marginRight: 15,
                                  height: 25,
                                }}
                              >
                                {allSchemas &&
                                  allSchemas.map((ele) => (
                                    <option
                                      style={{ fontSize: 14, height: 25 }}
                                      value={ele.label}
                                    >
                                      {ele.label}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <text style={{ marginTop: 25, fontSize: 14 }}>
                                select Table1
                              </text>
                              <select
                                onChange={(e) => {
                                  setSelectedtable1(e.target.value);
                                  describeTable(e.target.value, 0);
                                }}
                                style={{
                                  marginTop: 10,
                                  background: "lightgray",
                                  border: "1px solid #FFF",
                                  width: 150,
                                  height: 25,
                                }}
                              >
                                {allSchemas.map(
                                  (ele) =>
                                    ele.label == selectedDb3 &&
                                    ele.children.map((ele) => (
                                      <option
                                        style={{ fontSize: 14, height: 25 }}
                                        value={ele.label}
                                      >
                                        {ele.label}
                                      </option>
                                    ))
                                )}
                              </select>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <text style={{ marginTop: 25, fontSize: 14 }}>
                                Select Schema 2
                              </text>
                              <select
                                onChange={(e) => {
                                  // showTables2(e.target.value, 2)
                                  setSelectedDb4(e.target.value);
                                }}
                                style={{
                                  marginTop: 10,
                                  background: "lightgray",
                                  border: "1px solid #FFF",
                                  width: 150,
                                  marginRight: 15,
                                  height: 25,
                                }}
                              >
                                {allSchemas &&
                                  allSchemas.map((ele) => (
                                    <option
                                      style={{ fontSize: 14, height: 25 }}
                                      value={ele.label}
                                    >
                                      {ele.label}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <text style={{ marginTop: 25, fontSize: 14 }}>
                                select Table2
                              </text>
                              <select
                                onChange={(e) => {
                                  setSelectedtable2(e.target.value);
                                  describeTable(e.target.value, 1);
                                }}
                                style={{
                                  marginTop: 10,
                                  background: "lightgray",
                                  border: "1px solid #FFF",
                                  width: 150,
                                  height: 25,
                                }}
                              >
                                {allSchemas.map(
                                  (ele) =>
                                    ele.label == selectedDb4 &&
                                    ele.children.map((ele) => (
                                      <option
                                        style={{ fontSize: 14, height: 25 }}
                                        value={ele.label}
                                      >
                                        {ele.label}
                                      </option>
                                    ))
                                )}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <text style={{ marginTop: 25, fontSize: 14 }}>
                              select Column1
                            </text>
                            <select
                              onChange={(e) => {
                                setColumn1(e.target.value);
                              }}
                              style={{
                                marginTop: 10,
                                background: "lightgray",
                                border: "1px solid #FFF",
                                width: 150,
                                height: 25,
                              }}
                            >
                              {columns1 &&
                                columns1.map((ele) => (
                                  <option
                                    style={{ fontSize: 14, height: 25 }}
                                    value={ele.id}
                                  >
                                    {ele.label}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <text style={{ marginTop: 25, fontSize: 14 }}>
                              select Column2
                            </text>
                            <select
                              onChange={(e) => {
                                setColumn2(e.target.value);
                              }}
                              style={{
                                marginTop: 10,
                                background: "lightgray",
                                border: "1px solid #FFF",
                                width: 150,
                                height: 25,
                              }}
                            >
                              {columns2 &&
                                columns2.map((ele) => (
                                  <option
                                    style={{ fontSize: 14, height: 25 }}
                                    value={ele.id}
                                  >
                                    {ele.label}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <text
                            style={{
                              alignSelf: "center",
                              marginLeft: -20,
                              marginTop: 25,
                              fontSize: 14,
                            }}
                          >
                            select Query Type
                          </text>
                          <select
                            onChange={(e) => {
                              setJoinQueryType(e.target.value);
                            }}
                            style={{
                              marginTop: 10,
                              background: "lightgray",
                              border: "1px solid #FFF",
                              width: 150,
                              height: 25,
                              alignSelf: "center",
                            }}
                          >
                            <option
                              style={{ fontSize: 14, height: 20 }}
                              value={0}
                            >
                              {"Inner Join"}
                            </option>
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={1}
                            >
                              {"Left Outer Join"}
                            </option>
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={2}
                            >
                              {"Right Outer Join"}
                            </option>
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={3}
                            >
                              {"Full Outer Join"}
                            </option>
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={4}
                            >
                              {"Cross Join"}
                            </option>
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={5}
                            >
                              {"Self Join"}
                            </option>
                          </select>
                        </div>
                        <div
                          style={{
                            marginTop: 25,
                            alignSelf: "center",
                            marginBottom: 10,
                          }}
                        >
                          <Button
                            sx={{
                              bgcolor: "#067AB4",
                              color: "white",
                              "&:hover, &:focus": {
                                bgcolor: "#0BAFFF",
                                color: "white",
                              },
                            }}
                            onClick={() => {
                              handleCloseModal3();
                              generateQuery2();
                            }}
                            variant="outlined"
                          >
                            Generate Query
                          </Button>
                        </div>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Dialog
            open={openDialog}
            // onClose={handleCloseDialog}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "hidden",
              },
            }}
          >
            <CircularProgress sx={{ color: "#0BAFFF" }} />
          </Dialog>

          <Dialog
            open={showError}
            onClose={() => setShowError(false)}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "hidden",
              },
            }}
          >
            <Alert
              style={{ height: 70, alignItems: "center", padding: 10 }}
              severity={"error"}
            >
              Something went wrong. Please check your query.
            </Alert>
          </Dialog>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
}
