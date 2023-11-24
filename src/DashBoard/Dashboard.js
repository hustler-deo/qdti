import React, { useState, useRef, useEffect, useContext } from "react";
import { Card, Animate } from "../Components/lib";
import Widgets from "./widgets";
import Spreadsheet from "react-spreadsheet";
import MiniDrawer from "../MiniDrawer";
import { CsvToHtmlTable } from "react-csv-to-table";
import { JsonToTable } from "react-json-to-table";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import TableRows from "@mui/icons-material/TableRows";
import CircularProgress from "@mui/material/CircularProgress";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";

import { CSVLink } from "react-csv";
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
import DangerousIcon from "@mui/icons-material/Dangerous";
import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { AuthContext } from "../context";

let array4, columns;
var temp9 = [];
var pageHTML, tempEl;
var xaxisNumeric, yaxisNumeric, zaxisNumeric;

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

  for (var k = 0; temp9.length < result[0].length - 1; k++) {
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
    if (k == 8 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 9 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 10 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 11 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 12 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 13 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 14 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 15 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 16 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 17 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 18 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 19 && result[0][k]) {
      temp9.push(result[0][k]);
    }
    if (k == 20 && result[0][k]) {
      temp9.push(result[0][k]);
    }

    if (temp9.length == result[0].length - 1) temp9.push(result[0][0]);
    else temp9.push(result[0][k]);
  }
  //console.log('preparedData-', temp9)
};

// const MyComponent = (dt) => {
//   // console.log(dt)
//   let { data } = dt;
//   return <Spreadsheet data={data} />;
// };

var xAxis, yAxis, zAxis, xbox, ybox, zbox;

var temp2 = [];
var box = [],
  box1 = [],
  box3 = [],
  box4 = [],
  box5 = [];

export default function Dashboard(props) {
  const [finalData, setFinalData] = useState({});
  const [data, setData] = useState([]);
  const [xyAxisdata, setxyAxisData] = useState([]);
  const [vdata, setVData] = useState([]);
  const [count, setCount] = useState();
  const [update, setUpdate] = useState(false);
  const [showError, setShowError] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  let tmp;
  var length;

  const csvLink = useRef();
  const csvLink2 = useRef();
  const pdfRef = useRef(null);
  const [alignment, setAlignment] = useState("");

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const handleChange = (event, newAlignment) => {
    // console.log('toggle-', newAlignment)
    setAlignment(newAlignment);
  };
  var x = [],
    y = [],
    z = [];
  var temp = [];

  const handler = () => {
    setUpdate(!update);
  };

  const _exportPdf = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      document.body.appendChild(canvas); // if you want see your screenshot in body.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a2", false);
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
    csvLink2.current.link.click();
  };

  const exportHtml = () => {
    // pageHTML = document.documentElement.outerHTML
    pageHTML = window.document.getElementById("capture").innerHTML;
    tempEl = document.createElement("a");

    tempEl.href = "data:attachment/text," + encodeURI(pageHTML);
    tempEl.target = "_blank";
    tempEl.download = "thispage.html";
    tempEl.click();
  };
  useEffect(() => {
    console.log("DASHBOARD UPDATED--");
  }, []);

  useEffect(() => {
    // const { id } = useParams();
    if (id != ":") {
      console.log("In dash-", props?.fromFlow, props?.flowId);
      console.log(id);
      localStorage.setItem("FlowID", props?.fromFlow ? props?.flowId : id);

      axios
        .post(configData.API_URL + "personalAccount/users/getFinalData", {
          flowId: props?.fromFlow ? props?.flowId : id,
        })
        .then((response) => {
          tmp = JSON.parse(response.data.data.charts);
          global.charts = JSON.parse(response.data.data.charts);

          console.log("charts-", global.charts);

          array4 = JSON.parse(response.data.data.data[0].data);
          console.log("IMPdata", array4);
          columns = array4[0];
          setData(array4);
          array4.map((e) => {
            if (e[0]) x.push(e[0]);
            if (e[1]) y.push(e[1]);
            if (e[2]) z.push(e[2]);
            return e;
          });
          xAxis = x;
          yAxis = y;
          zAxis = z;

          xaxisNumeric = !xAxis.some(isNaN);

          yaxisNumeric = !yAxis.some(isNaN);

          zaxisNumeric = !zAxis.some(isNaN);
          // console.log('IMP-', JSON.parse(response.data.data.data[0].data))
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
          console.log("ghm Data", ghm);
          setFinalData(ghm);

          // console.log('array4', array4)
          // prepareData(array4);

          // }
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              history.push("/My_Data_Flows");
            }, 2000);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              history.push("/My_Data_Flows");
            }, 2000);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              history.push("/My_Data_Flows");
            }, 2000);
          }
        });
    } else {
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
      columns = location.state[0];
      console.log("HIII", location.state, id, columns);
      setData(location.state);

      location.state.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xaxisNumeric = !xAxis.some(isNaN);

      yaxisNumeric = !yAxis.some(isNaN);

      zaxisNumeric = !zAxis.some(isNaN);
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
      console.log("ghm Data", ghm);
      setFinalData(ghm);

      // prepareData(location.state);
    }
  }, []);

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer hideSideBar={true} />

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
                  {finalData?.length > 0 && data && global.charts ? (
                    <Widgets
                      data={finalData}
                      data2={data}
                      data3={global.charts}
                      data4={columns}
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
                      fromFlow={props.fromFlow}
                    />
                  ) : (
                    <Box
                      sx={{
                        marginTop: props.fromFlow ? "-1.8%" : "15%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <CircularProgress sx={{ color: "#0BAFFF" }} />
                    </Box>
                  )}
                </Card>
              </div>
            </div>
          </Animate>

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
              style={{ height: 100, alignItems: "center", padding: 15 }}
              severity={"error"}
            >
              Flow not created properly! Please open another flow.
            </Alert>
          </Dialog>
        </>
      ) : (
        history.push("/Login")
      )}
    </>
  );
}
