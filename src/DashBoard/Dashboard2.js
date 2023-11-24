import React, { useRef, useContext, useState, useEffect } from "react";
import { Card, Animate } from "../Components/lib";
import ClassComp from "./widgets";
import Spreadsheet from "react-spreadsheet";
import MiniDrawer from "../MiniDrawer";
import { useHistory, useParams, useLocation } from "react-router-dom";
// Auth context
import { AuthContext } from "../context";

import axios from "axios";
import configData from "../config.json";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TableRows from "@mui/icons-material/TableRows";
import IntegrationInstructions from "@mui/icons-material/IntegrationInstructions";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CSVLink, CSVDownload } from "react-csv";

import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MergeIcon from "@mui/icons-material/Merge";
import GroupsIcon from "@mui/icons-material/Groups";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import AlbumIcon from "@mui/icons-material/Album";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import CloseIcon from "@mui/icons-material/Close";
import DangerousIcon from "@mui/icons-material/Dangerous";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DemoDashboard from "../DashBoard/DemoDashboard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ReactDOMServer from "react-dom/server";

var array4;
var columns;
var temp9 = [];
var pageHTML, tempEl;
var xaxisNumeric, yaxisNumeric, zaxisNumeric;
var drill = 0;

const actions = [
  { icon: <FilterAltIcon />, name: "Filter" },
  { icon: <MergeIcon />, name: "Merge" },
  { icon: <GroupsIcon />, name: "Group" },
  { icon: <LineAxisIcon />, name: "Slice" },
  { icon: <ImportExportIcon />, name: "Sort" },
  { icon: <EditIcon />, name: "Rename Columns" },
  { icon: <MergeTypeIcon />, name: "Record Merge" },
  { icon: <ContentCopyIcon />, name: "Duplicate" },
  { icon: <ScreenSearchDesktopIcon />, name: "Fuzzy Search" },
  { icon: <AlbumIcon />, name: "Standardization" },
  { icon: <FindReplaceIcon />, name: "Replace Null" },
  { icon: <DangerousIcon />, name: "Incomplete" },
  { icon: <FormatTextdirectionLToRIcon />, name: "Formatted" },
  { icon: <FormatShapesIcon />, name: "Case Format" },
  { icon: <AssessmentIcon />, name: "Discrete Range" },
];

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const RangeView = ({ cell }) => (
  <input
    type="range"
    value={cell.value}
    disabled
    style={{ pointerEvents: "none" }}
  />
);

const RangeEdit = ({ cell, onChange }) => (
  <input
    type="range"
    onChange={(e) => {
      onChange({ ...cell, value: e.target.value });
    }}
    value={cell.value || 0}
    autoFocus
  />
);
const prepareData = (result) => {
  temp9.push("");
  console.log("In useeff", temp9.length, result[0].length);

  for (var k = 0; temp9.length < result[0].length; k++) {
    // console.log('In for', temp.length,data[0].length)

    if (k == 0 && result[0][k]) {
      temp9.push(result[0][k]);
      temp9.push(result[0][k]);
    }
    if (k == 1 && result[0][k]) {
      temp9.push(result[0][k]);
      temp9.push(result[0][k]);
    }
    if (k == 2 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 3 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 4 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 5 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 6 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 7 && result[0][k]) {
      temp9.push(result[0][k]);
    }

    if (temp9.length == result[0].length - 1) temp9.push(result[0][0]);
    else temp9.push(result[0][k]);
  }
  //console.log('preparedData-', temp9)
};

let sampleData2 = [
  [
    { value: "John" },
    { value: "Doe" },
    { value: "120 jefferson st." },
    { value: "Riverside" },
    { value: " NJ" },
    { value: " 08075" },
  ],
  [
    { value: "Jack" },
    { value: "Blankman" },
    { value: "220 hobo Av." },
    { value: "Phila" },
    { value: " PA" },
    { value: "09119" },
  ],
  [
    { value: 'John "Da Man"' },
    { value: "Jet" },
    { value: "120 Jefferson St." },
    { value: "Riverside" },
    { value: " NJ" },
    { value: "08075" },
  ],
  [
    { value: "Stephen" },
    { value: "McGinnis" },
    { value: '7452 Terrace "At the Plaza" road' },
    { value: "SomeTown" },
    { value: "SD" },
    { value: " 91234" },
  ],
  [
    { value: "" },
    { value: "Repici" },
    { value: "" },
    { value: "SomeTown" },
    { value: " SD" },
    { value: " 00298" },
  ],
  [
    { value: 'Joan "the bone", Anne' },
    { value: "Tyler" },
    { value: "9th, at Terrace plc" },
    { value: "Desert City" },
    { value: "CO" },
    { value: "00123" },
  ],
  [{ value: "" }],
];

const MyComponent = (dt) => {
  // console.log(dt)
  let { data } = dt;
  return <Spreadsheet data={data} />;
};

var xAxis,
  yAxis,
  zAxis,
  xbox,
  ybox,
  zbox,
  xColumn,
  yColumn,
  zColumn,
  graphType,
  operation;
var data2, dashboardBox;
var widgetData;
var widgetDataTempBox;
var temp2 = [];
var box = [],
  box1 = [],
  box3 = [],
  box4 = [],
  box5 = [];
var c1 = [],
  c2 = [],
  c3 = [],
  c3 = [],
  c4 = [],
  c5 = [],
  c6 = [],
  c7 = [],
  c7 = [],
  c8 = [],
  c9 = [],
  c10 = [],
  c11 = [],
  c12 = [],
  c13 = [],
  c14 = [],
  c15 = [],
  c16 = [],
  c17 = [],
  c18 = [],
  c19 = [],
  c20 = [];
var widgetId;
export default function Dashboard2(props) {
  const [finalData, setFinalData] = useState();
  const [existingWidget, setExistingWidget] = useState(false);
  const [data, setData] = useState([]);
  const [xyAxisdata, setxyAxisData] = useState([]);
  const [vdata, setVData] = useState([]);
  const [count, setCount] = useState();
  const [update, setUpdate] = useState(false);
  const [notSaved, setNotSaved] = useState(true);
  const [isWidgetSaved, setIsWidgetSaved] = useState(false);
  const [description, setDescription] = useState(false);
  const [existingWidgetData, setExistingWidgetData] = useState();

  const [columns2, setColumns2] = useState([]);

  const { id } = useParams();
  let tmp;
  var length;

  const csvLink = useRef();
  const csvLink2 = useRef();
  const pdfRef = useRef(null);
  const [alignment, setAlignment] = useState("data");
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const handleChange = (event, newAlignment) => {
    // console.log('toggle-', newAlignment)
    setAlignment(newAlignment);
  };
  var x = [],
    y = [],
    z = [];

  var temp = [];

  const _exportPdf = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      //  document.body.appendChild(canvas) // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      pdf.save("download.pdf");
    });
  };

  const exportCSV = () => {
    //  <CSVDownload data={data && data} target='_blank' />
    console.log("CSV");
    csvLink.current.link.click();
  };
  const exportCSV2 = () => {
    //  <CSVDownload data={data && data} target='_blank' />
    //   console.log('CSV')
    csvLink2.current.link.click();
  };

  useEffect(() => {
    console.log("$$$", id, location?.new);
    if (
      location.state &&
      id != "new_widget"
      // ||
      // (location.state && id != 'new')
    ) {
      setExistingWidget(true);
      setDescription(location.state?.desc);
      //   console.log('location.state.drill', location.state.drill)
      if (location.state?.drill == 1) drill = 1;
      console.log("WidgetID", location.state.id);
      widgetId = location.state?.id;
      dashboardBox = location.state?.data;
      widgetDataTempBox =
        dashboardBox.data && JSON.parse(dashboardBox.data).result;
      widgetData = dashboardBox.data && JSON.parse(dashboardBox.data).result;

      // console.log("data with columns?", JSON.parse(dashboardBox.data).result);ZZ
      // console.log("Data$?", JSON.parse(dashboardBox.data).result);
      dashboardBox.data &&
        setExistingWidgetData(JSON.parse(dashboardBox.data).result);
      // console.log("pp", JSON.parse(location.state.data.operations).xColumn);
      columns = dashboardBox.data && JSON.parse(dashboardBox.data).columns;
      setColumns2(columns);
      console.log("data?", columns);
      //  columns = widgetData[0]
      xColumn = JSON.parse(location.state?.data?.operations).xColumn;
      yColumn = JSON.parse(location.state?.data?.operations).yColumn;
      zColumn = JSON.parse(location.state?.data?.operations).zColumn;
      graphType = JSON.parse(location.state?.data?.operations).graphType;
      operation = JSON.parse(location.state?.data?.operations).operation.typeId;
      //  console.log('location.state Id-', JSON.parse(location.state.data).columns)
      //  columns = JSON.parse(dashboardBox.data).columns
      widgetId = location.state.id;
      console.log("DASHBOARD UPDATED, wID", widgetId);
    }
  }, []);

  useEffect(() => {
    console.log("Id$$$$", id);

    if (id === "new_widget") {
      let arr;
      let charts = [
        {
          id: "20",
          type: "special20",
          title: "Line And Scatter Plot",
        },
        {
          id: "58",
          type: "special58",
          title: "Basic Overlaid Area Chart",
        },
        {
          id: "34",
          type: "special34",
          title: "Basic Bar Chart",
        },
      ];

      global.charts = charts;
      (x = []),
        (y = []),
        (z = []),
        (c1 = []),
        (c2 = []),
        (c3 = []),
        (c4 = []),
        (c5 = []),
        (c6 = []),
        (c7 = []),
        (c8 = []),
        (c9 = []),
        (c10 = []),
        (c11 = []),
        (c12 = []),
        (c13 = []),
        (c14 = []),
        (c15 = []),
        (c16 = []),
        (c17 = []),
        (c18 = []),
        (c19 = []),
        (c20 = []);
      //  console.log('whatsthis', response.data)
      let box = [...location.state];
      let b2 = [...location.state];
      array4 = [...location.state];
      columns = b2[0];
      console.log("IMPdata>", box);
      setData(box);
      array4.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });

      xAxis = x;
      yAxis = y;
      zAxis = z;
      let xAxistmp = x;
      let yAxistmp = y;
      let zAxistmp = z;
      xAxistmp.shift();
      yAxistmp.shift();
      zAxistmp.shift();

      var numRegex = /^[0-9.,]+$/;

      xaxisNumeric = !xAxistmp.some(isNaN);

      yaxisNumeric = !yAxistmp.some(isNaN);

      zaxisNumeric = !zAxistmp.some(isNaN);

      let abc = location.state;
      let def = [],
        ghm = [];
      abc.map((e) => {
        def = [];
        e.map((f) => {
          if (f != null && typeof f != "object") def.push({ value: f });
          else if (f != null && typeof f == "object")
            def.push({ value: Object.values(f) });
        });
        ghm.push(def);
      });
      setFinalData(ghm);
      // prepareData(box);
      arr = array4;
      // console.log('new widget data', array4)
      // setData(box)

      arr = arr.slice(1);

      for (let k = 0, j = 0; j <= arr[0].length; k++) {
        if (k == arr.length) {
          j++, (k = 0);
        }
        if (j == 0) c1.push(arr[k][j]);
        else if (j == 1) c2.push(arr[k][j]);
        else if (j == 2) c3.push(arr[k][j]);
        else if (j == 3) c4.push(arr[k][j]);
        else if (j == 4) c5.push(arr[k][j]);
        else if (j == 5) c6.push(arr[k][j]);
        else if (j == 6) c7.push(arr[k][j]);
        else if (j == 7) c8.push(arr[k][j]);
        else if (j == 8) c9.push(arr[k][j]);
        else if (j == 9) c10.push(arr[k][j]);
        else if (j == 10) c11.push(arr[k][j]);
        else if (j == 11) c12.push(arr[k][j]);
        else if (j == 12) c13.push(arr[k][j]);
        else if (j == 13) c14.push(arr[k][j]);
        else if (j == 14) c15.push(arr[k][j]);
        else if (j == 15) c16.push(arr[k][j]);
        else if (j == 16) c17.push(arr[k][j]);
        else if (j == 17) c18.push(arr[k][j]);
        else if (j == 18) c19.push(arr[k][j]);
        else if (j == 19) c20.push(arr[k][j]);

        //  console.log('ghm', ghm)
      }
    } else if (
      (location.state === undefined && id == "new") ||
      (location.state === "Deep" && id == "new")
    ) {
      console.log("NEW widget");
      let arr;
      console.log(
        "new widget>>",
        location.state === undefined,
        location.state,
        localStorage.getItem("FlowID")
      );
      axios
        .post(configData.API_URL + "personalAccount/users/getFinalData", {
          flowId: localStorage.getItem("FlowID").toString(),
        })
        .then((response) => {
          tmp = JSON.parse(response.data.data.charts);
          // console.log('getFinalData-', tmp)
          global.charts = JSON.parse(response.data.data.charts);
          (x = []),
            (y = []),
            (z = []),
            (c1 = []),
            (c2 = []),
            (c3 = []),
            (c4 = []),
            (c5 = []),
            (c6 = []),
            (c7 = []),
            (c8 = []),
            (c9 = []),
            (c10 = []),
            (c11 = []),
            (c12 = []),
            (c13 = []),
            (c14 = []),
            (c15 = []),
            (c16 = []),
            (c17 = []),
            (c18 = []),
            (c19 = []),
            (c20 = []);
          //  console.log('whatsthis', response.data)
          let box = JSON.parse(response.data.data.data[0].data);
          array4 = JSON.parse(response.data.data.data[0].data);
          columns = array4[0];
          console.log("IMPdata", array4);

          array4.map((e) => {
            if (e[0]) x.push(e[0]);
            if (e[1]) y.push(e[1]);
            if (e[2]) z.push(e[2]);
            return e;
          });

          xAxis = x;
          yAxis = y;
          zAxis = z;
          let xAxistmp = x;
          let yAxistmp = y;
          let zAxistmp = z;
          xAxistmp.shift();
          yAxistmp.shift();
          zAxistmp.shift();

          var numRegex = /^[0-9.,]+$/;

          xaxisNumeric = !xAxistmp.some(isNaN);

          yaxisNumeric = !yAxistmp.some(isNaN);

          zaxisNumeric = !zAxistmp.some(isNaN);

          // console.log(
          //   'Numeric-',
          //   xaxisNumeric,
          //   yaxisNumeric,
          //   zaxisNumeric,
          //   !xAxistmp.some(isNaN)
          // )
          //   console.log('IMP-', JSON.parse(response.data.data.data[0].data))
          let abc = JSON.parse(response.data.data.data[0].data);
          let def = [],
            ghm = [];
          abc.map((e) => {
            def = [];
            e.map((f) => {
              if (f != null && typeof f != "object") def.push({ value: f });
              else if (f != null && typeof f == "object")
                def.push({ value: Object.values(f) });
            });
            ghm.push(def);
          });
          // console.log('came new widget data', abc)
          // console.log('..new widget data1', ghm)

          setFinalData(ghm);
          // prepareData(array4);
          arr = array4;
          console.log("-new widget data-", array4);

          setData(array4);

          arr = array4.slice(1);
          // console.log('came here2')
          // console.log('..new widget data3', array4)

          for (let k = 0, j = 0; j <= arr[0].length; k++) {
            if (k == arr.length) {
              j++, (k = 0);
            }
            if (j == 0) c1.push(arr[k][j]);
            else if (j == 1) c2.push(arr[k][j]);
            else if (j == 2) c3.push(arr[k][j]);
            else if (j == 3) c4.push(arr[k][j]);
            else if (j == 4) c5.push(arr[k][j]);
            else if (j == 5) c6.push(arr[k][j]);
            else if (j == 6) c7.push(arr[k][j]);
            else if (j == 7) c8.push(arr[k][j]);
            else if (j == 8) c9.push(arr[k][j]);
            else if (j == 9) c10.push(arr[k][j]);
            else if (j == 10) c11.push(arr[k][j]);
            else if (j == 11) c12.push(arr[k][j]);
            else if (j == 12) c13.push(arr[k][j]);
            else if (j == 13) c14.push(arr[k][j]);
            else if (j == 14) c15.push(arr[k][j]);
            else if (j == 15) c16.push(arr[k][j]);
            else if (j == 16) c17.push(arr[k][j]);
            else if (j == 17) c18.push(arr[k][j]);
            else if (j == 18) c19.push(arr[k][j]);
            else if (j == 19) c20.push(arr[k][j]);

            //  console.log('ghm', ghm)
          }
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
    } else {
      (x = []),
        (y = []),
        (z = []),
        (c1 = []),
        (c2 = []),
        (c3 = []),
        (c4 = []),
        (c5 = []),
        (c6 = []),
        (c7 = []),
        (c8 = []),
        (c9 = []),
        (c10 = []),
        (c11 = []),
        (c12 = []),
        (c13 = []),
        (c14 = []),
        (c15 = []),
        (c16 = []),
        (c17 = []),
        (c18 = []),
        (c19 = []),
        (c20 = []);

      setTimeout(() => {
        if (location.state || id != "new") {
          // console.log('existing widget', columns)

          setExistingWidget(true);
          let def = [],
            ghm = [];
          widgetDataTempBox.map((e) => {
            def = [];
            e.map((f) => {
              if (f != null && typeof f != "object") def.push({ value: f });
              else if (f != null && typeof f == "object")
                def.push({ value: Object.values(f) });
            });
            ghm.push(def);
          });
          // prepareData(widgetDataTempBox);
          let arr;
          arr = widgetData;
          // console.log('DATA BEFORE?', widgetData)
          xAxis = JSON.parse(location.state.data.data).x;
          yAxis = JSON.parse(location.state.data.data).y;
          zAxis = JSON.parse(location.state.data.data).z;
          columns = JSON.parse(location.state.data.data).columns;
          setColumns2(columns);
          setFinalData(ghm);
          arr = arr.slice(1);
          for (let k = 0, j = 0; j <= arr[0].length; k++) {
            if (k == arr.length) {
              j++, (k = 0);
            }
            if (j == 0) c1.push(arr[k][j]);
            else if (j == 1) c2.push(arr[k][j]);
            else if (j == 2) c3.push(arr[k][j]);
            else if (j == 3) c4.push(arr[k][j]);
            else if (j == 4) c5.push(arr[k][j]);
            else if (j == 5) c6.push(arr[k][j]);
            else if (j == 6) c7.push(arr[k][j]);
            else if (j == 7) c8.push(arr[k][j]);
            else if (j == 8) c9.push(arr[k][j]);
            else if (j == 9) c10.push(arr[k][j]);
            else if (j == 10) c11.push(arr[k][j]);
            else if (j == 11) c12.push(arr[k][j]);
            else if (j == 12) c13.push(arr[k][j]);
            else if (j == 13) c14.push(arr[k][j]);
            else if (j == 14) c15.push(arr[k][j]);
            else if (j == 15) c16.push(arr[k][j]);
            else if (j == 16) c17.push(arr[k][j]);
            else if (j == 17) c18.push(arr[k][j]);
            else if (j == 18) c19.push(arr[k][j]);
            else if (j == 19) c20.push(arr[k][j]);
          }
        }
      }, 2000);
      //console.log('checking c1', c1)
    }
  }, []);

  const handleCallback = (childData) => {
    console.log("childdata...", childData);
    setIsWidgetSaved(childData);
  };

  return (
    <>
      {authContext.isLoggedIn || id != undefined || id != null ? (
        <>
          <MiniDrawer
            isWidgetSaved={isWidgetSaved}
            appBar={true}
            hideSideBar={true}
          />

          <Animate type="pop">
            <div style={{ marginLeft: 60 }}>
              <CSVLink
                data={data && data}
                ref={csvLink}
                target="_blank"
              ></CSVLink>
              <CSVLink
                data={xyAxisdata && xyAxisdata}
                ref={csvLink2}
                target="_blank"
              ></CSVLink>

              <div id="capture" ref={pdfRef}>
                <Card>
                  {finalData && (
                    <DemoDashboard
                      existingWidget={existingWidget}
                      data={finalData}
                      data2={
                        existingWidget && existingWidgetData
                          ? existingWidgetData
                          : data
                      }
                      data3={global.charts}
                      data4={columns2}
                      selectedCharts={global.charts}
                      widgetsCount={global.charts && global.charts.length}
                      x={xAxis}
                      y={yAxis}
                      z={zAxis}
                      xaxisNumeric={xaxisNumeric}
                      yaxisNumeric={yaxisNumeric}
                      zaxisNumeric={zaxisNumeric}
                      box={box}
                      box1={box1}
                      box3={box3}
                      box4={box4}
                      box5={box5}
                      xbox={xbox}
                      ybox={ybox}
                      zbox={zbox}
                      columns={columns}
                      c1={c1}
                      c2={c2}
                      c3={c3}
                      c4={c4}
                      c5={c5}
                      c6={c6}
                      c7={c7}
                      c8={c8}
                      c9={c9}
                      c10={c10}
                      c11={c11}
                      c12={c12}
                      c13={c13}
                      c14={c14}
                      c15={c15}
                      c16={c16}
                      c17={c17}
                      c18={c18}
                      c19={c19}
                      c20={c20}
                      xColumn={xColumn}
                      yColumn={yColumn}
                      zColumn={zColumn}
                      graphType={graphType}
                      operation={operation}
                      widgetBox={dashboardBox}
                      widgetId={widgetId}
                      drill={drill}
                      parentCallback={handleCallback}
                      notSaved={notSaved}
                      description={description}
                      fromImport={location?.new}
                      columns2={columns2}
                    />
                  )}
                </Card>
              </div>
            </div>
          </Animate>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
}
