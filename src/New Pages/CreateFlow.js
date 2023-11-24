import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import MiniDrawer from "../MiniDrawer";
import Select from "react-select";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Spreadsheet from "react-spreadsheet";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import bgImg from "../Connector box 2.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select2 from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import { elementsCustom } from "../../src/graphDataForStepwise";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Radium, { StyleRoot } from "radium";
import FuzzySearch from "fuzzy-search";
import { ReactGrid, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import CircularProgress from "@mui/material/CircularProgress";
import { fadeIn } from "react-animations";

import moment from "moment";
// Auth context
import { AuthContext } from "../context";

import configData from "../../src/config.json";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { indexOf } from "lodash";
import Dashboard from "../DashBoard/Dashboard";
import ImportDataset from "../Import Dataset/ImportDataset";

import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import GradingIcon from "@mui/icons-material/Grading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import HighlightIcon from "@mui/icons-material/Highlight";

import Button from "@mui/material/Button";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFF",
    width: 990,
    height: 480,
    zIndex: 4,
  },
  overlay: {
    background: "rgba(0,0,0,0.5)",
    zIndex: 9999,
  },
  ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: "#7cc2ae",
  },
};

const styles = {
  fadeIn: {
    animation: "x 1.2s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
};

const options = [
  { value: "Column1", label: "Column1" },
  { value: "Column2", label: "Column2" },
  { value: "Column3", label: "Column3" },
  { value: "Column4", label: "Column4" },
  { value: "Column5", label: "Column5" },
  { value: "Column6", label: "Column6" },
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ]

var xaxisNumeric,
  yaxisNumeric,
  zaxisNumeric,
  xbox,
  ybox,
  zbox,
  scolumn,
  flag = 0;
var xyData;
var xAxis, yAxis, zAxis;
var databases = [];
var tempElements = [];
var nodeBox2 = [];
var tempArray = [];
var close1 = 1;
var close2 = 1;
var close3 = 1;
var close4 = 1;
let fromFlow = 0;
var column, column2;
var exceldata;
var xmldata;
var pdfdata;
var parquetdata;
var jsondata;
var columns;
var inputOptionsBox;
const exampleData2 = [
  [
    "GEO Region",
    "GEO Summary",
    "Cargo Type Code",
    "Cargo Weight LBS",
    "Operating Airline",
    "Published Airline",
    "Activity Type Code",
    "Cargo Aircraft Type",
    "ï»¿Cargo Metric TONS",
    "Operating Airline IATA Code",
    "Published Airline IATA Code",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    45423,
    "ABX Air",
    "ABX Air",
    "Deplaned",
    "Freighter",
    20.604,
    "GB",
    "GB",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    106869,
    "ABX Air",
    "ABX Air",
    "Enplaned",
    "Freighter",
    48.476,
    "GB",
    "GB",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    55427,
    "ATA Airlines",
    "ATA Airlines",
    "Deplaned",
    "Passenger",
    25.142,
    "TZ",
    "TZ",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    50278,
    "ATA Airlines",
    "ATA Airlines",
    "Deplaned",
    "Passenger",
    22.806,
    "TZ",
    "TZ",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    74183,
    "ATA Airlines",
    "ATA Airlines",
    "Enplaned",
    "Passenger",
    33.649,
    "TZ",
    "TZ",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    347558,
    "ATA Airlines",
    "ATA Airlines",
    "Enplaned",
    "Passenger",
    157.652,
    "TZ",
    "TZ",
  ],
  [
    "Canada",
    "International",
    "Cargo",
    47025,
    "Air Canada",
    "Air Canada",
    "Deplaned",
    "Passenger",
    21.331,
    "AC",
    "AC",
  ],
  [
    "Canada",
    "International",
    "Express",
    7234,
    "Air Canada",
    "Air Canada",
    "Deplaned",
    "Passenger",
    3.281,
    "AC",
    "AC",
  ],
  [
    "Canada",
    "International",
    "Mail",
    29762,
    "Air Canada",
    "Air Canada",
    "Deplaned",
    "Passenger",
    13.5,
    "AC",
    "AC",
  ],
  [
    "Canada",
    "International",
    "Cargo",
    37291,
    "Air Canada",
    "Air Canada",
    "Enplaned",
    "Passenger",
    16.915,
    "AC",
    "AC",
  ],
  [
    "Canada",
    "International",
    "Express",
    6707,
    "Air Canada",
    "Air Canada",
    "Enplaned",
    "Passenger",
    3.042,
    "AC",
    "AC",
  ],
  [
    "Canada",
    "International",
    "Mail",
    67831,
    "Air Canada",
    "Air Canada",
    "Enplaned",
    "Passenger",
    30.768,
    "AC",
    "AC",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    1127590,
    "Air China",
    "Air China",
    "Deplaned",
    "Passenger",
    511.475,
    "CA",
    "CA",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    353098,
    "Air China",
    "Air China",
    "Enplaned",
    "Passenger",
    160.165,
    "CA",
    "CA",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    464002,
    "Air France",
    "Air France",
    "Deplaned",
    "Passenger",
    210.471,
    "AF",
    "AF",
  ],
  [
    "Europe",
    "International",
    "Mail",
    38810,
    "Air France",
    "Air France",
    "Deplaned",
    "Passenger",
    17.604,
    "AF",
    "AF",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    423069,
    "Air France",
    "Air France",
    "Enplaned",
    "Passenger",
    191.904,
    "AF",
    "AF",
  ],
  [
    "Europe",
    "International",
    "Mail",
    100001,
    "Air France",
    "Air France",
    "Enplaned",
    "Passenger",
    45.36,
    "AF",
    "AF",
  ],
  [
    "Australia / Oceania",
    "International",
    "Cargo",
    317156,
    "Air New Zealand",
    "Air New Zealand",
    "Deplaned",
    "Passenger",
    143.862,
    "NZ",
    "NZ",
  ],
  [
    "Australia / Oceania",
    "International",
    "Mail",
    11548,
    "Air New Zealand",
    "Air New Zealand",
    "Deplaned",
    "Passenger",
    5.238,
    "NZ",
    "NZ",
  ],
  [
    "Australia / Oceania",
    "International",
    "Cargo",
    221652,
    "Air New Zealand",
    "Air New Zealand",
    "Enplaned",
    "Passenger",
    100.541,
    "NZ",
    "NZ",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    153748,
    "Alaska Airlines",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    69.74,
    "AS",
    "AS",
  ],
  [
    "US",
    "Domestic",
    "Express",
    3713,
    "Alaska Airlines",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    1.684,
    "AS",
    "AS",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    295930,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    134.234,
    "AS",
    "AS",
  ],
  [
    "US",
    "Domestic",
    "Express",
    3367,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    1.527,
    "AS",
    "AS",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    28705,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    13.021,
    "AS",
    "AS",
  ],
  [
    "Canada",
    "International",
    "Cargo",
    34206,
    "Alaska Airlines",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    15.516,
    "AS",
    "AS",
  ],
  [
    "Canada",
    "International",
    "Cargo",
    21031,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    9.54,
    "AS",
    "AS",
  ],
  [
    "Canada",
    "International",
    "Mail",
    48979,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    22.217,
    "AS",
    "AS",
  ],
  [
    "Mexico",
    "International",
    "Cargo",
    99222,
    "Alaska Airlines",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    45.007,
    "AS",
    "AS",
  ],
  [
    "Mexico",
    "International",
    "Express",
    140,
    "Alaska Airlines",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    0.064,
    "AS",
    "AS",
  ],
  [
    "Mexico",
    "International",
    "Cargo",
    16838,
    "Alaska Airlines",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    7.638,
    "AS",
    "AS",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    820116,
    "All Nippon Airways",
    "All Nippon Airways",
    "Deplaned",
    "Passenger",
    372.005,
    "NH",
    "NH",
  ],
  [
    "Asia",
    "International",
    "Mail",
    95590,
    "All Nippon Airways",
    "All Nippon Airways",
    "Deplaned",
    "Passenger",
    43.36,
    "NH",
    "NH",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    347156,
    "All Nippon Airways",
    "All Nippon Airways",
    "Enplaned",
    "Passenger",
    157.47,
    "NH",
    "NH",
  ],
  [
    "Asia",
    "International",
    "Mail",
    190201,
    "All Nippon Airways",
    "All Nippon Airways",
    "Enplaned",
    "Passenger",
    86.275,
    "NH",
    "NH",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    1745713,
    "American Airlines",
    "American Airlines",
    "Deplaned",
    "Passenger",
    791.855,
    "AA",
    "AA",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    394829,
    "American Airlines",
    "American Airlines",
    "Deplaned",
    "Passenger",
    179.094,
    "AA",
    "AA",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    2610403,
    "American Airlines",
    "American Airlines",
    "Enplaned",
    "Passenger",
    1184.079,
    "AA",
    "AA",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    867692,
    "American Airlines",
    "American Airlines",
    "Enplaned",
    "Passenger",
    393.585,
    "AA",
    "AA",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    46448,
    "Ameriflight",
    "Ameriflight",
    "Deplaned",
    "Freighter",
    21.069,
    "A8",
    "A8",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    13271,
    "Ameriflight",
    "Ameriflight",
    "Enplaned",
    "Freighter",
    6.02,
    "A8",
    "A8",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    377597,
    "Asiana Airlines",
    "Asiana Airlines",
    "Deplaned",
    "Freighter",
    171.278,
    "OZ",
    "OZ",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    646310,
    "Asiana Airlines",
    "Asiana Airlines",
    "Deplaned",
    "Passenger",
    293.166,
    "OZ",
    "OZ",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    392733,
    "Asiana Airlines",
    "Asiana Airlines",
    "Enplaned",
    "Freighter",
    178.144,
    "OZ",
    "OZ",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    672216,
    "Asiana Airlines",
    "Asiana Airlines",
    "Enplaned",
    "Passenger",
    304.917,
    "OZ",
    "OZ",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    1159652,
    "Astar Air Cargo",
    "Astar Air Cargo",
    "Deplaned",
    "Freighter",
    526.018,
    "ER",
    "ER",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    1535268,
    "Astar Air Cargo",
    "Astar Air Cargo",
    "Enplaned",
    "Freighter",
    696.398,
    "ER",
    "ER",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    11,
    "Atlantic Southeast Airlines",
    "Delta Air Lines",
    "Deplaned",
    "Passenger",
    0.005,
    "EV",
    "DL",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    1021909,
    "British Airways",
    "British Airways",
    "Deplaned",
    "Passenger",
    463.538,
    "BA",
    "BA",
  ],
  [
    "Europe",
    "International",
    "Mail",
    15096,
    "British Airways",
    "British Airways",
    "Deplaned",
    "Passenger",
    6.848,
    "BA",
    "BA",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    776831,
    "British Airways",
    "British Airways",
    "Enplaned",
    "Passenger",
    352.371,
    "BA",
    "BA",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    1029715,
    "Cargolux Airlines",
    "Cargolux Airlines",
    "Deplaned",
    "Freighter",
    467.079,
    "CV",
    "CV",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    786402,
    "Cargolux Airlines",
    "Cargolux Airlines",
    "Enplaned",
    "Freighter",
    356.712,
    "CV",
    "CV",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    920693,
    "Cathay Pacific",
    "Cathay Pacific",
    "Deplaned",
    "Freighter",
    417.626,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    241333,
    "Cathay Pacific",
    "Cathay Pacific",
    "Deplaned",
    "Passenger",
    109.469,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Mail",
    129473,
    "Cathay Pacific",
    "Cathay Pacific",
    "Deplaned",
    "Passenger",
    58.729,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    1110414,
    "Cathay Pacific",
    "Cathay Pacific",
    "Enplaned",
    "Freighter",
    503.684,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    251430,
    "Cathay Pacific",
    "Cathay Pacific",
    "Enplaned",
    "Passenger",
    114.049,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Express",
    3,
    "Cathay Pacific",
    "Cathay Pacific",
    "Enplaned",
    "Passenger",
    0.001,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Mail",
    251430,
    "Cathay Pacific",
    "Cathay Pacific",
    "Enplaned",
    "Passenger",
    114.049,
    "CX",
    "CX",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    2108144,
    "China Airlines",
    "China Airlines",
    "Deplaned",
    "Freighter",
    956.254,
    "CI",
    "CI",
  ],
  [
    "Asia",
    "International",
    "Mail",
    66167,
    "China Airlines",
    "China Airlines",
    "Deplaned",
    "Freighter",
    30.013,
    "CI",
    "CI",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    2065410,
    "China Airlines",
    "China Airlines",
    "Enplaned",
    "Freighter",
    936.87,
    "CI",
    "CI",
  ],
  [
    "Asia",
    "International",
    "Mail",
    47294,
    "China Airlines",
    "China Airlines",
    "Enplaned",
    "Freighter",
    21.453,
    "CI",
    "CI",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    315657,
    "China Cargo Airlines",
    "China Cargo Airlines",
    "Deplaned",
    "Freighter",
    143.182,
    "CK",
    "CK",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    403914,
    "China Cargo Airlines",
    "China Cargo Airlines",
    "Enplaned",
    "Freighter",
    183.215,
    "CK",
    "CK",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    722328,
    "Delta Air Lines",
    "Delta Air Lines",
    "Deplaned",
    "Passenger",
    327.648,
    "DL",
    "DL",
  ],
  [
    "US",
    "Domestic",
    "Express",
    531960,
    "Delta Air Lines",
    "Delta Air Lines",
    "Deplaned",
    "Passenger",
    241.297,
    "DL",
    "DL",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    160118,
    "Delta Air Lines",
    "Delta Air Lines",
    "Deplaned",
    "Passenger",
    72.63,
    "DL",
    "DL",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    64769,
    "Delta Air Lines",
    "Delta Air Lines",
    "Enplaned",
    "Passenger",
    29.379,
    "DL",
    "DL",
  ],
  [
    "US",
    "Domestic",
    "Express",
    1481410,
    "Delta Air Lines",
    "Delta Air Lines",
    "Enplaned",
    "Passenger",
    671.968,
    "DL",
    "DL",
  ],
  [
    "US",
    "Domestic",
    "Mail",
    213104,
    "Delta Air Lines",
    "Delta Air Lines",
    "Enplaned",
    "Passenger",
    96.664,
    "DL",
    "DL",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    3343546,
    "EVA Airways",
    "EVA Airways",
    "Deplaned",
    "Combi",
    1516.632,
    "BR",
    "BR",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    97764,
    "EVA Airways",
    "EVA Airways",
    "Deplaned",
    "Passenger",
    44.346,
    "BR",
    "BR",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    2123959,
    "EVA Airways",
    "EVA Airways",
    "Enplaned",
    "Combi",
    963.428,
    "BR",
    "BR",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    62104,
    "EVA Airways",
    "EVA Airways",
    "Enplaned",
    "Passenger",
    28.17,
    "BR",
    "BR",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    215807,
    "Evergreen International Airlines",
    "Evergreen International Airlines",
    "Deplaned",
    "Freighter",
    97.89,
    "EZ",
    "EZ",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    8985408,
    "Federal Express",
    "Federal Express",
    "Deplaned",
    "Freighter",
    4075.781,
    "FX",
    "FX",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    7879802,
    "Federal Express",
    "Federal Express",
    "Enplaned",
    "Freighter",
    3574.278,
    "FX",
    "FX",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    37720,
    "Frontier Airlines",
    "Frontier Airlines",
    "Deplaned",
    "Passenger",
    17.11,
    "F9",
    "F9",
  ],
  [
    "US",
    "Domestic",
    "Express",
    11381,
    "Frontier Airlines",
    "Frontier Airlines",
    "Deplaned",
    "Passenger",
    5.162,
    "F9",
    "F9",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    79810,
    "Frontier Airlines",
    "Frontier Airlines",
    "Enplaned",
    "Passenger",
    36.202,
    "F9",
    "F9",
  ],
  [
    "US",
    "Domestic",
    "Express",
    1664,
    "Frontier Airlines",
    "Frontier Airlines",
    "Enplaned",
    "Passenger",
    0.755,
    "F9",
    "F9",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    147814,
    "Hawaiian Airlines",
    "Hawaiian Airlines",
    "Deplaned",
    "Passenger",
    67.048,
    "HA",
    "HA",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    420021,
    "Hawaiian Airlines",
    "Hawaiian Airlines",
    "Enplaned",
    "Passenger",
    190.522,
    "HA",
    "HA",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    26270,
    "Horizon Air",
    "Alaska Airlines",
    "Deplaned",
    "Passenger",
    11.916,
    "QX",
    "AS",
  ],
  [
    "US",
    "Domestic",
    "Cargo",
    5330,
    "Horizon Air",
    "Alaska Airlines",
    "Enplaned",
    "Passenger",
    2.418,
    "QX",
    "AS",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    11856,
    "Icelandair (Inactive)",
    "Icelandair (Inactive)",
    "Deplaned",
    "Passenger",
    5.378,
    "FI",
    "FI",
  ],
  [
    "Europe",
    "International",
    "Cargo",
    82208,
    "Icelandair (Inactive)",
    "Icelandair (Inactive)",
    "Enplaned",
    "Passenger",
    37.29,
    "FI",
    "FI",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    1464911,
    "Japan Airlines",
    "Japan Airlines",
    "Deplaned",
    "Freighter",
    664.484,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    490152,
    "Japan Airlines",
    "Japan Airlines",
    "Deplaned",
    "Passenger",
    222.333,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Mail",
    168662,
    "Japan Airlines",
    "Japan Airlines",
    "Deplaned",
    "Freighter",
    76.505,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Mail",
    56433,
    "Japan Airlines",
    "Japan Airlines",
    "Deplaned",
    "Passenger",
    25.598,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    1554286,
    "Japan Airlines",
    "Japan Airlines",
    "Enplaned",
    "Freighter",
    705.024,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Cargo",
    520057,
    "Japan Airlines",
    "Japan Airlines",
    "Enplaned",
    "Passenger",
    235.898,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Mail",
    186902,
    "Japan Airlines",
    "Japan Airlines",
    "Enplaned",
    "Freighter",
    84.779,
    "JL",
    "JL",
  ],
  [
    "Asia",
    "International",
    "Mail",
    62537,
    "Japan Airlines",
    "Japan Airlines",
    "Enplaned",
    "Passenger",
    28.367,
    "JL",
    "JL",
  ],
];
var c1 = [],
  c2 = [],
  c3 = [],
  c4 = [],
  c5 = [],
  c6 = [],
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
var nodeBox = [];
var mynode = [];
var dataset1, dataset2;
var result, min, max, sum, avg;
var sc,
  s = 0,
  l = 1,
  newColumnName = "",
  condition,
  input,
  fuzzyInput;
let box1 = [];
let typeId;
const CreateFlow = () => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const location = useLocation();
  var columns2;

  var temp9 = [];
  var x = [],
    y = [],
    z = [];

  const [cname, setCname] = React.useState("agecc");
  const [newFieldName, setNewFieldName] = useState("");

  const [rowsData, setrowsData] = React.useState();
  const [columnData, setColumnData] = React.useState();

  // const rows3 = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, [cname]: 10 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, [cname]: 10 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, [cname]: 10 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, [cname]: 10 },
  //   {
  //     id: 5,
  //     lastName: 'Targaryen',
  //     firstName: 'Daenerys',
  //     age: null,
  //     [cname]: 10
  //   },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150, [cname]: 10 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, [cname]: 10 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, [cname]: 10 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, [cname]: 10 }
  // ]

  // const columns3 = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'firstName', headerName: 'First name', width: 130 },
  //   { field: 'lastName', headerName: 'Last name', width: 130 },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 90
  //   },
  //   {
  //     field: cname,
  //     headerName: cname,
  //     type: 'number',
  //     width: 90
  //   },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: params =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`
  //   }
  // ]
  const [orignalFile, setOriginalFile] = useState("");
  const [alertType, setAlertType] = useState();
  const [containNull, setContainNull] = useState(0);
  const [isExampleData, setisExampleData] = useState(false);

  const [replaceInput, setReplaceInput] = useState("");

  let subtitle, fileInfo1;

  // const [rowsData, setrowsData] = React.useState(rows3)
  // const [columnData, setColumnData] = React.useState(columns3)

  const [dupCheck, setDupCheck] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [plusclick, setplusclick] = useState(false);
  const [plusclick1, setplusclick1] = useState(false);
  const [plusclick3, setplusclick3] = useState(false);
  const [plusclick4, setplusclick4] = useState(false);
  const [newpg1, setnewpg1] = useState(false);
  const [newpg2, setnewpg2] = useState(false);
  const [newpg3, setnewpg3] = useState(false);
  const [newpg4, setnewpg4] = useState(false);
  const [newpg5, setnewpg5] = useState(false);
  const [newpg6, setnewpg6] = useState(false);

  const [txtchng, settextchng] = useState("Ingest your data sources");

  // Avoid a layout jump when reaching the last page with empty rows.

  const [clickedShape, setclickedShape] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [myborder, setborder] = useState(-1);
  const [aggFunction, setAggFunction] = React.useState("");
  const [column1, setColumn1] = React.useState("");
  const [fixborder, setfixborder] = useState(-1);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [flowsData, setFlowsData] = useState([]);
  const [flowsDataTemp, setFlowsDataTemp] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searched, setSearched] = useState("");
  const [account_id, setAccount_id] = useState(
    localStorage.getItem("account_id")
  );

  const [sortType, setSortType] = useState(-1);
  const [desc, setDesc] = useState();
  const [selectedCol, setSelectedCol] = useState();
  const [columnsBox2, setColumnsBox2] = useState(columns);

  const [inComplete, setInComplete] = useState(false);
  const [checkedColumn, setCheckedColumn] = useState(false);
  const [case1, setCase] = useState(-1);

  const [isFilter, setIsFilter] = useState(false);
  const [isSlice, setIsSlice] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  const [isDiscrete, setIsDiscrete] = useState(false);
  const [isMerge, setIsMerge] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [isSort, setIssort] = useState(false);
  const [isCheckIncomplete, setIsCheckComplete] = useState(false);
  const [isReplaceNull, setIsReplaceNull] = useState(false);
  const [isCaseFormat, setIsCaseFormat] = useState(false);
  const [isFuzzySearch, setIsFuzzySearch] = useState(false);
  const [error, setError] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const modalStyle = {
    position: "relative",
    top: "26%",
    left: "33%",
    bgcolor: "#C1D9EC",
    border: "1px solid #000",
    boxShadow: 24,
    height: isFilter || isMerge ? 400 : isRename ? 320 : isGroup ? 320 : 300,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "10px",
  };
  const requestSearch = (event) => {
    // console.log('searched!', event.target.value)
    setSearched(event.target.value);
    if (event.target.value === "") getData();

    var filteredRows = flowsDataTemp.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFlowsData(filteredRows);
  };

  useEffect(() => {
    console.log("SUBID-", global.subscription_id);
    console.log(localStorage.getItem("account_id"));
    getData();
    localStorage.setItem("CLEAR", 1);
  }, []);

  useEffect(() => {
    if (newpg6) getData();
  }, [newpg6]);

  useEffect(() => {
    mynode = [];
  }, []);

  useEffect(() => {
    console.log("columnsBox2", columnsBox2);
  }, [columnsBox2]);

  const handleRequestSort = (event, property) => {
    // console.log('Insort....', property)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getData = () => {
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/retriveMyFlows?id=" +
          account_id
      )
      .then((response) => {
        console.log(response.data);
        setFlowsDataTemp(response.data.data);
        console.log("FLOWS->", response.data.data);
        setFlowsData(response.data.data);
        // return response.data.data;
        console.log(
          "I am in the response of response data -------------" +
            response.data.data.length
        );
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

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 1) {
      if (b.name < a.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 2) {
      if (b.name < a.description) {
        return -1;
      }
      if (b.name > a.description) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 3) {
      if (b.created_at < a.created_at) {
        return -1;
      }
      if (b.created_at > a.created_at) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 4) {
      if (b.updated_at < a.updated_at) {
        return -1;
      }
      if (b.updated_at > a.updated_at) {
        return 1;
      }
      return -1;
    }
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function showborder(index) {
    setborder(index);
  }
  function removeborder() {
    setborder(0);
  }
  function showfixborder(row, index) {
    setfixborder(index);
  }
  const colourStyles = {
    menuList: (styles) => ({
      ...styles,
      background: "white",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#067ab4" : isSelected ? "#0aafff" : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const headCells = [
    { id: 1, name: "Batch Name" },
    { id: 2, name: "Description" },
    { id: 3, name: "Created Date" },
    { id: 4, name: "Execution Time" },
    { id: 5, name: "Action" },
  ];

  const EnhancedTableHead = (props) => {
    const {
      order,
      orderBy,

      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow role="checkbox">
          {headCells.map((headCell) => (
            <TableCell
              style={
                headCell.id == 5
                  ? { backgroundColor: "#067ab4" }
                  : {
                      backgroundColor: "#C1D9EC",
                      fontFamily: "Trebuchet MS",
                    }
              }
              align="left"
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                style={
                  headCell.id == 1
                    ? { marginLeft: 60, fontFamily: "Trebuchet MS" }
                    : headCell.id == 2
                    ? { marginLeft: 20, fontFamily: "Trebuchet MS" }
                    : headCell.id == 5
                    ? { marginLeft: "40%", fontFamily: "Trebuchet MS" }
                    : headCell.id == 4
                    ? { marginLeft: 30, fontFamily: "Trebuchet MS" }
                    : { marginLeft: 10, fontFamily: "Trebuchet MS" }
                }
                align={headCell.id == 5 ? "right" : "left"}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.name}
                {orderBy === headCell.id ? (
                  <Box component="span">{order === "desc" ? "" : ""}</Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [isSelected2, setIsSelected2] = useState(false);
  const [dsp, setDsp] = useState("1");
  const [dspNo, setDspNo] = useState(false);
  const [nodeType, setNodeType] = useState("");
  const [stateElements, setStateElements] = useState(elementsCustom);
  const validationMessageRef = useRef();
  const [graphAlreadySelected, setGraphAlreadySelected] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alignment, setAlignment] = React.useState("web");
  const [activeStep, setActiveStep] = React.useState(2);
  const [fileimg, setfileimg] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [dt, setDt] = useState([]);

  const [highlight, setHighlight] = React.useState();
  const [highlightOn, setHighlightOn] = React.useState(false);

  const [editMode, setEditMode] = useState(false);
  const [columnResize, setColumnResize] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [columnSelection, setColumnSelection] = useState(false);
  const [rowSelection, setRowSelection] = useState(false);
  const [fillHandle, setFillHandle] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);

  const [updated, setUpdated] = useState(false);

  const [data, setData] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  var inputOptionsBox;

  const buttonRef = React.createRef();
  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const { subscription_id } = useParams();
  var inputOptionsBox;
  useEffect(() => {
    // console.log("subscription_id", subscription_id);
    // if (subscription_id === "price_1LfOlnSBwqDDsny7nprdkWUQ") {
    //   inputOptionsBox = inputOptions.section1.filter(
    //     (item) => item.title != "Select DataSet"
    //   );
    //   // console.log('inputOptionsBox', inputOptionsBox)
    // } else if (
    //   subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8" ||
    //   subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra" ||
    //   subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra"
    // ) {
    inputOptionsBox = inputOptions.section1;
    // console.log('inputOptionsBox', inputOptionsBox)
    // }
  }, []);

  useEffect(() => {
    console.log("dataBackup", dataBackup);
  }, [dataBackup]);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#FFF";
  }
  function closeModal() {
    setIsOpen(false);
  }
  var inputOptions = {
    section1: [
      {
        title: "File",
        subtitle: "Handles CSV, json,geojson or topojson files.",
        img: "/File03.png",
        onpress: () => {
          onAdd();
        },
      },
      {
        title: "Paste",
        subtitle:
          "Paste input: string, number, csv, json, geojson or topojson.",
        img: "/Paste02.png",
        onpress: () => {
          onAdd2();
        },
      },
      {
        title: "Example Data",
        subtitle: "Some example data for playing around with data blocks.",
        img: "/ExampleData.png",
        onpress: () => {
          applyExpData();
        },
      },
      {
        title: "Select DataSet",
        subtitle: "Select DataSet",
        img: "/DataSources.png",
        onpress: () => {
          onAdd3();
        },
      },
    ],
  };

  const transformOptions = {
    section1: [
      {
        title: "Filter",
        subtitle: "Groups a data set based on a given column name.",
        img: "/Filter02.png",
        onpress: () => {
          onAdd5();
        },
      },
      {
        title: "Merge",
        subtitle: "Merges two data sets based on the given column names.",
        img: "/Merge.png",
        onpress: () => {
          onAdd6();
        },
      },
    ],
    section2: [
      {
        title: "Group",
        subtitle: "Groups a data set based on a given column name.",
        img: "/Group.png",
        onpress: () => {
          onAdd7();
        },
      },

      {
        title: "Slice",
        subtitle: "Slices a data set based on indices.",
        img: "/Slice.png",
        onpress: () => {
          onAdd8();
        },
      },
    ],
    section3: [
      {
        title: "Sort",
        subtitle: "Sorts data based on a given column.",
        img: "/Sort.png",
        onpress: () => {
          onAdd9();
        },
      },
      {
        title: "Rename Columns",
        subtitle: "Renames multiple columns.",
        img: "/RenameColumn.png",
        onpress: () => {
          onAdd10();
        },
      },
    ],
    section4: [
      {
        title: "Duplicate",
        subtitle: "Removes the duplicate rows from data set",
        img: "/Duplicate.png",
        onpress: () => {
          onAdd82();
        },
      },
      {
        title: "Fuzzy Search",
        subtitle: "Checks the fuzzy search ",
        img: "/FuzzySearch.png",
        onpress: () => {
          onAdd83();
        },
      },
    ],
    section5: [
      {
        title: "Standardization",
        subtitle: "Standardizes the data Sets",
        img: "/standard.png",
        onpress: () => {
          onAdd84();
        },
      },
      {
        title: "Replace Null",
        subtitle: "Replaces Null object ",
        img: "/Replace.png",
        onpress: () => {
          onAdd85();
        },
      },
    ],
    section6: [
      {
        title: "InComplete",
        subtitle: "Checks for incomplete rows ",
        img: "/Incomplete.png",
        onpress: () => {
          onAdd86();
        },
      },
      {
        title: "Formatted",
        subtitle: "Checks for Formation done ",
        img: "/Formatted.png",
        onpress: () => {
          onAdd87();
        },
      },
    ],
    section7: [
      {
        title: "Case Format",
        subtitle: "CHecks for case format.",
        img: "/TextFormatting.png",
        onpress: () => {
          onAdd88();
        },
      },
      {
        title: "Discrete Range",
        subtitle: "Checks the discreet range in dataset.",
        img: "/DiscreateRange.png",
        onpress: () => {
          onAdd89();
        },
      },
    ],
  };

  const visualizationOptions = {
    section1: [
      {
        id: "20",
        title: "Line And Scatter Plot",
        subtitle: "Displays a Barchart of given x and y column names.",
        img: "/LineAndScatterPlot.png",
        onpress: () => {
          onAddNode("special20", "20", "Line And Scatter Plot");
        },
      },
      {
        id: "21",
        title: "Data Labels Hover",
        subtitle: "Displays a histogram of a given column name.",
        img: "/DataLabelsAndHover.png",
        onpress: () => {
          onAddNode("special21", "21", "Data Labels Hover");
        },
      },
      {
        id: "22",
        title: "Data Labels on The Plot",
        subtitle: "Displays a scatterplot of given x and y column names.",
        img: "/DataLabelsOnThePlot.png",

        onpress: () => {
          onAddNode("special22", "22", "Data Labels on The Plot");
        },
      },
      {
        id: "23",
        title: "Scatter Plot with a Color Dimension",
        subtitle: "Displays a scatterplot of given x and y column names.",
        img: "/ScatterPlotWithColorDimention.png",
        onpress: () => {
          onAddNode("special23", "23", "Scatter Plot with a Color Dimension");
        },
      },
    ],

    section2: [
      {
        id: "49",
        title: "Time Series",
        subtitle:
          "Displays a Timeseries line chart of given x and y column names.",
        onpress: () => {
          onAddNode("special49", "49");
        },
      },
      {
        id: "51",
        title: "Binning",
        subtitle: "Customise data source for Bin chart",
        onpress: () => {
          onAddNode("special51", "51");
        },
      },
      {
        title: "Number Profiler",
        subtitle:
          "Take user input to do the aggregate profiling (Sum, Count, Minimum, Maximum and Average)",
        onpress: () => {
          onAdd51();
        },
      },
    ],
    section3: [
      {
        id: "24",
        title: "Basic Line Plot",
        subtitle: "",
        img: "/LineChart01.png",
        onpress: () => {
          onAddNode("special24", "24", "Basic Line Plot");
        },
      },
      {
        id: "25",
        title: "Line and Scatter Plot",
        subtitle: "",
        img: "/LineChart02.png",
        onpress: () => {
          onAddNode("special25", "25", "Line and Scatter Plot");
        },
      },
      {
        id: "26",
        title: "Adding Names to Line and Scatter Plot",
        subtitle: "",
        img: "/LineChart03.png",
        onpress: () => {
          onAddNode("special26", "26", "Adding Names to Line and Scatter Plot");
        },
      },
      {
        id: "27",
        title: "Line and Scatter Styling",
        subtitle: "",
        img: "/LineChart04.png",
        onpress: () => {
          onAddNode("special27", "27", "Line and Scatter Styling");
        },
      },
      {
        id: "28",
        title: "Styled Line Plot",
        subtitle: "",
        img: "/LineChart05.png",
        onpress: () => {
          onAddNode("special28", "28", "Styled Line Plot");
        },
      },
      {
        id: "29",
        title: "Colored and Styled Scatter Plot",
        subtitle: "",
        img: "/LineChart06.png",
        onpress: () => {
          onAddNode("special29", "29", "Colored and Styled Scatter Plot");
        },
      },
      {
        id: "30",
        title: "Line Shape Options for Interpolation",
        subtitle: "",
        img: "/LineChart07.png",
        onpress: () => {
          onAddNode("special30", "30", "Line Shape Options for Interpolation");
        },
      },
      {
        id: "31",
        title: "Graph and Axes Titles",
        subtitle: "",
        img: "/LineChart08.png",
        onpress: () => {
          onAddNode("special31", "31", "Graph and Axes Titles");
        },
      },
      {
        id: "32",
        title: "Line Dash",
        subtitle: "",
        img: "/LineChart09.png",
        onpress: () => {
          onAddNode("special32", "32", "Line Dash");
        },
      },
      {
        id: "33",
        title: "Connect Gaps Between Data",
        subtitle: "",
        img: "/LineChart10.png",
        onpress: () => {
          onAddNode("special33", "33", "Connect Gaps Between Data");
        },
      },
    ],

    section5: [
      {
        id: "34",
        title: "Basic Bar Chart",
        subtitle: "",
        img: "/Barchart01.png",
        onpress: () => {
          onAddNode("special34", "34", "Basic Bar Chart");
        },
      },
      {
        id: "35",
        title: "Grouped Bar Chart",
        subtitle: "",
        img: "/Barchart02.png",
        onpress: () => {
          onAddNode("special35", "35", "Grouped Bar Chart");
        },
      },
      {
        id: "36",
        title: "Stacked Bar Chart",
        subtitle: "",
        img: "/Barchart03.png",
        onpress: () => {
          onAddNode("special36", "36", "Stacked Bar Chart");
        },
      },
      {
        id: "37",
        title: "Bar chart with Hover Text",
        subtitle: "",
        img: "/Barchart04.png",
        onpress: () => {
          onAddNode("special37", "37", "Bar chart with Hover Text");
        },
      },
      {
        id: "38",
        title: "Bar Charts with Direct Labels",
        subtitle: "",
        img: "/Barchart05.png",
        onpress: () => {
          onAddNode("special38", "38", "Bar Charts with Direct Labels");
        },
      },
      {
        id: "39",
        title: "Grouped Bar Chart with Direct Labels",
        subtitle: "",
        img: "/Barchart06.png",
        onpress: () => {
          onAddNode("special39", "39", "Grouped Bar Chart with Direct Labels");
        },
      },
      {
        id: "40",
        title: "Bar Chart with Rotated Labels",
        subtitle: "",
        img: "/Barchart07.png",
        onpress: () => {
          onAddNode("special40", "40", "Bar Chart with Rotated Labels");
        },
      },
      {
        id: "41",
        title: "Customizing Individual Bar Colors",
        subtitle: "",
        img: "/Barchart08.png",
        onpress: () => {
          onAddNode("special41", "41", "Customizing Individual Bar Colors");
        },
      },
      {
        id: "42",
        title: "Customizing Individual Bar Widths",
        subtitle: "",
        img: "/Barchart09.png",
        onpress: () => {
          onAddNode("special42", "42", "Customizing Individual Bar Widths");
        },
      },
      {
        id: "43",
        title: "Customizing Individual Bar Base",
        subtitle: "",
        img: "/Barchart10.png",
        onpress: () => {
          onAddNode("special43", "43", "Customizing Individual Bar Base");
        },
      },
      {
        id: "44",
        title: "Colored and Styled Bar Chart",
        subtitle: "",
        img: "/Barchart11.png",
        onpress: () => {
          onAddNode("special44", "44", "Colored and Styled Bar Chart");
        },
      },
      {
        id: "45",
        title: "Waterfall Bar Chart",
        subtitle: "",
        img: "/Barchart12.png",
        onpress: () => {
          onAddNode("special45", "45", "Waterfall Bar Chart");
        },
      },
      {
        id: "46",
        title: "Bar Chart with Relative Barmode",
        subtitle: "",
        img: "/Barchart13.png",
        onpress: () => {
          onAddNode("special46", "46", "Bar Chart with Relative Barmode");
        },
      },
    ],
    section4: [
      {
        title: "Box Plot",
        subtitle: "",
        img: "/boxPlot01.png",
        onpress: () => {
          onAdd14();
        },
      },
      {
        title: "K mean Cluster",
        subtitle: "",
        onpress: () => {
          onAdd14();
        },
      },
      {
        title: "Data Source Comparision",
        subtitle: "",
        onpress: () => {
          onAdd14();
        },
      },
    ],
    section4: [
      {
        title: "Edit Mode Show Record",
        subtitle: "",
        onpress: () => {
          onAdd14();
        },
      },
    ],
    section6: [
      {
        id: "47",
        title: "Basic Pie Chart",
        subtitle: ".",
        img: "/Pie01.png",
        onpress: () => {
          onAddNode("special47", "47", "Basic Pie Chart");
        },
      },
      {
        id: "48",
        title: "Pie Chart Subplots",
        subtitle: "",
        img: "/Pie02.png",
        onpress: () => {
          onAddNode("special48", "48", "Pie Chart Subplots");
        },
      },
      {
        id: "49",
        title: "Donut Chart",
        subtitle: "",
        img: "/Pie03.png",
        onpress: () => {
          onAddNode("special49", "49", "Donut Chart");
        },
      },
      {
        id: "50",
        title: "Automatically Adjust Margins",
        subtitle: "",
        img: "/Pie04.png",
        onpress: () => {
          onAddNode("special50", "50", "Automatically Adjust Margins");
        },
      },
      {
        id: "51",
        title: "Control Text Orientation Inside Pie Chart Sectors",
        subtitle: "",
        img: "/Pie05.png",
        onpress: () => {
          onAddNode(
            "special51",
            "51",
            "Control Text Orientation Inside Pie Chart Sectors"
          );
        },
      },
    ],
    section7: [
      {
        id: "52",
        title: "Marker Size on Bubble Charts",
        subtitle: ".",
        img: "/Bubble01.png",
        onpress: () => {
          onAddNode("special52", "52", "Marker Size on Bubble Charts");
        },
      },
      {
        id: "53",
        title: "Marker Size and Color on Bubble Charts",
        subtitle: ".",
        img: "/Bubble02.png",
        onpress: () => {
          onAddNode(
            "special53",
            "53",
            "Marker Size and Color on Bubble Charts"
          );
        },
      },
      {
        id: "54",
        title: "Hover Text on Bubble Charts",
        subtitle: ".",
        img: "/Bubble03.png",
        onpress: () => {
          onAddNode("special54", "54", "Hover Text on Bubble Charts");
        },
      },
      {
        id: "55",
        title: "Bubble Size Scaling on Charts",
        subtitle: ".",
        img: "/Bubble04.png",
        onpress: () => {
          onAddNode("special55", "55", "Bubble Size Scaling on Charts");
        },
      },
      {
        id: "56",
        title: "Marker Size, Color, and Symbol as an Array",
        subtitle: ".",
        img: "/Bubble05.png",
        onpress: () => {
          onAddNode(
            "special56",
            "56",
            "Marker Size, Color, and Symbol as an Array"
          );
        },
      },
    ],
    section8: [
      {
        id: "57",
        title: "Categorical Dot Plot",
        subtitle: ".",
        img: "/dot.png",
        onpress: () => {
          onAddNode("special57", "57", "Categorical Dot Plot");
        },
      },
    ],
    section9: [
      {
        id: "58",
        title: "Basic Overlaid Area Chart",
        subtitle: ".",
        img: "/FilledArea01.png",
        onpress: () => {
          onAddNode("special58", "58", "Basic Overlaid Area Chart");
        },
      },
      {
        id: "59",
        title: "Overlaid Area Chart Without Boundary Line",
        subtitle: ".",
        img: "/FilledArea02.png",
        onpress: () => {
          onAddNode(
            "special59",
            "59",
            "Overlaid Area Chart Without Boundary Line"
          );
        },
      },
      {
        id: "60",
        title: "Stacked Area Chart",
        subtitle: ".",
        img: "/FilledArea03.png",
        onpress: () => {
          onAddNode("special60", "60", "Stacked Area Chart");
        },
      },
      {
        id: "61",
        title: "Normalized Stacked Area Chart",
        subtitle: ".",
        img: "/FilledArea04.png",
        onpress: () => {
          onAddNode("special61", "61", "Normalized Stacked Area Chart");
        },
      },
      {
        id: "62",
        title: "Select Hover Points",
        subtitle: ".",
        img: "/FilledArea05.png",
        onpress: () => {
          onAddNode("special62", "62", "Select Hover Points");
        },
      },
    ],
    section10: [
      {
        id: "63",
        title: "Basic Horizontal Bar Chart",
        subtitle: ".",
        img: "/HorizontalBar01.png",
        onpress: () => {
          onAddNode("special63", "63", "Basic Horizontal Bar Chart");
        },
      },
      {
        id: "64",
        title: "Colored Bar Chart",
        subtitle: ".",
        img: "/HorizontalBar02.png",
        onpress: () => {
          onAddNode("special64", "64", "Colored Bar Chart");
        },
      },
      {
        id: "65",
        title: "Bar Chart with Line Plot",
        subtitle: ".",
        img: "/HorizontalBar03.png",
        onpress: () => {
          onAddNode("special65", "65", "Bar Chart with Line Plot");
        },
      },
    ],
    section11: [
      {
        id: "68",
        title: "Basic Sunburst chart",
        subtitle: ".",
        img: "/sunburst01.png",
        onpress: () => {
          onAddNode("special68", "68", "Basic Sunburst chart");
        },
      },
      {
        id: "69",
        title: "Branchvalues",
        subtitle: ".",
        img: "/sunburst02.png",
        onpress: () => {
          onAddNode("special69", "69", "Branchvalues");
        },
      },
      {
        id: "70",
        title: "Sunburst with Repeated Labels",
        subtitle: ".",
        img: "/sunburst03.png",
        onpress: () => {
          onAddNode("special70", "70", "Sunburst with Repeated Labels");
        },
      },
      {
        id: "71",
        title: "Large Number of Slices",
        subtitle: ".",
        img: "/sunburst05.png",
        onpress: () => {
          onAddNode("special71", "71", "Large Number of Slices");
        },
      },
      {
        id: "72",
        title: "Control Text Orientation Inside Sunburst Chart Sectors",
        subtitle: ".",
        img: "/sunburst06.png",
        onpress: () => {
          onAddNode(
            "special72",
            "72",
            "Control Text Orientation Inside Sunburst Chart Sectors"
          );
        },
      },
    ],
    section12: [
      {
        id: "73",
        title: "Sankey Diagrams",
        subtitle: ".",
        img: "/sankey01.png",
        onpress: () => {
          onAddNode("special73", "73", "Sankey Diagrams");
        },
      },
      {
        id: "77",
        title: "Style Sankey Diagram",
        subtitle: ".",
        img: "/sankey05.png",
        onpress: () => {
          onAddNode("special77", "77", "Style Sankey Diagram");
        },
      },
    ],
    section13: [
      {
        id: "66",
        title: "Basic Point Cloud",
        subtitle: ".",
        img: "/POintCloud01.png",
        onpress: () => {
          onAddNode("special66", "66", "Basic Point Cloud");
        },
      },
      {
        id: "67",
        title: "Styled Point Cloud",
        subtitle: ".",
        img: "/POintCloud02.png",
        onpress: () => {
          onAddNode("special67", "67", "Styled Point Cloud");
        },
      },
    ],
    section14: [
      {
        id: "234",
        title: "Basic TreeMaps",
        subtitle: ".",
        img: "/treemap01.png",
        onpress: () => {
          onAddNode("special234", "234", "Basic TreeMaps");
        },
      },
      {
        id: "235",
        title: "Set Different Attributes in TreeMap",
        subtitle: ".",
        img: "/treemap02.png",
        onpress: () => {
          onAddNode("special235", "235", "Set Different Attributes in TreeMap");
        },
      },
      {
        id: "236",
        title: "Set Color of Treemap Sectorss",
        subtitle: ".",
        img: "/treemap03.png",
        onpress: () => {
          onAddNode("special236", "236", "Set Color of Treemap Sectorss");
        },
      },
      {
        id: "237",
        title: "Nested Layers in Treemap",
        subtitle: ".",
        img: "/treemap04.png",
        onpress: () => {
          onAddNode("special237", "237", "Nested Layers in Treemap");
        },
      },
    ],
    section15: [
      {
        id: "238",
        title: "A Contour and Scatter Plot of the Method of Steepest Descent",
        subtitle: ".",
        img: "/MultipleChartType01.png",
        onpress: () => {
          onAddNode(
            "special238",
            "238",
            "A Contour and Scatter Plot of the Method of Steepest Descent"
          );
        },
      },
      {
        id: "239",
        title: "Line Chart and a Bar Chart",
        subtitle: ".",
        img: "/MultipleChartType02.png",
        onpress: () => {
          onAddNode("special239", "239", "Line Chart and a Bar Chart");
        },
      },
    ],
    section16: [
      {
        id: "240",
        title: "WebGL",
        subtitle: ".",
        img: "/WebglWithSVG01.png",
        onpress: () => {
          onAddNode("special240", "240", "WebGL");
        },
      },
      {
        id: "241",
        title: "WebGL with 1 Million points",
        subtitle: ".",
        img: "/WebglWithSVG02.png",
        onpress: () => {
          onAddNode("special241", "241", "WebGL with 1 Million points");
        },
      },
      {
        id: "242",
        title: "WebGL with many traces",
        subtitle: ".",
        img: "/WebglWithSVG03.png",
        onpress: () => {
          onAddNode("special242", "242", "WebGL with many traces");
        },
      },
    ],
    section17: [
      {
        id: "81",
        title: "Basic Symmetric Error Bars",
        subtitle: ".",
        img: "/error01.png",
        onpress: () => {
          onAddNode("special81", "81", "Basic Symmetric Error Bars");
        },
      },
      {
        id: "82",
        title: "Bar Chart with Error Bars",
        subtitle: ".",
        img: "/error02.png",
        onpress: () => {
          onAddNode("special82", "82", "Bar Chart with Error Bars");
        },
      },
      {
        id: "83",
        title: "Horizontal Error Bars",
        subtitle: ".",
        img: "/error03.png",
        onpress: () => {
          onAddNode("special83", "83", "Horizontal Error Bars");
        },
      },
      {
        id: "84",
        title: "Asymmetric Error Bars",
        subtitle: ".",
        img: "/error04.png",
        onpress: () => {
          onAddNode("special84", "84", "Asymmetric Error Bars");
        },
      },
      {
        id: "85",
        title: "Colored and Styled Error Bars",
        subtitle: ".",
        img: "/error05.png",
        onpress: () => {
          onAddNode("special85", "85", "Colored and Styled Error Bars");
        },
      },
      {
        id: "86",
        title: "Error Bars as a Percentage of the y-Value",
        subtitle: ".",
        img: "/error06.png",
        onpress: () => {
          onAddNode(
            "special86",
            "86",
            "Error Bars as a Percentage of the y-Value"
          );
        },
      },
      {
        id: "87",
        title: "Asymmetric Error Bars with a Constant Offset",
        subtitle: ".",
        img: "/error07.png",
        onpress: () => {
          onAddNode(
            "special87",
            "87",
            "Asymmetric Error Bars with a Constant Offset"
          );
        },
      },
    ],
    section18: [
      {
        id: "88",
        title: "Basic Box Plot",
        subtitle: ".",
        img: "/boxPlot01.png",
        onpress: () => {
          onAddNode("special88", "88", "Basic Box Plot");
        },
      },
      {
        id: "89",
        title: "Box Plot That Displays the Underlying Data",
        subtitle: ".",
        img: "/boxPlot02.png",
        onpress: () => {
          onAddNode(
            "special89",
            "89",
            "Box Plot That Displays the Underlying Data"
          );
        },
      },
      {
        id: "90",
        title: "Horizontal Box Plot",
        subtitle: ".",
        img: "/boxPlot03.png",
        onpress: () => {
          onAddNode("special90", "90", "Horizontal Box Plot");
        },
      },
      {
        id: "91",
        title: "Grouped Box Plot",
        subtitle: ".",
        img: "/boxPlot04.png",
        onpress: () => {
          onAddNode("special91", "91", "Grouped Box Plot");
        },
      },
      {
        id: "92",
        title: "Box Plot Styling Outliners",
        subtitle: ".",
        img: "/boxPlot05.png",
        onpress: () => {
          onAddNode("special92", "92", "Box Plot Styling Outliners");
        },
      },
      {
        id: "93",
        title: "Box Plot Styling Mean and Standard Deviation",
        subtitle: ".",
        img: "/boxPlot06.png",
        onpress: () => {
          onAddNode(
            "special93",
            "93",
            "Box Plot Styling Mean and Standard Deviation"
          );
        },
      },
      {
        id: "94",
        title: "Grouped Horizontal Box Plot",
        subtitle: ".",
        img: "/boxPlot07.png",
        onpress: () => {
          onAddNode("special94", "94", "Grouped Horizontal Box Plot");
        },
      },
      {
        id: "95",
        title: "Colored Box Plot",
        subtitle: ".",
        img: "/boxPlot08.png",
        onpress: () => {
          onAddNode("special95", "95", "Colored Box Plot");
        },
      },
      {
        id: "97",
        title: "Rainbow Box Plot",
        subtitle: ".",
        img: "/boxPlot10.png",
        onpress: () => {
          onAddNode("special97", "97", "Rainbow Box Plot");
        },
      },
    ],
    section19: [
      {
        id: "98",
        title: "Basic Histogram",
        subtitle: ".",
        img: "/hitogram01.png",
        onpress: () => {
          onAddNode("special98", "98", "Basic Histogram");
        },
      },
      {
        id: "99",
        title: "Horizontal Histogram",
        subtitle: ".",
        img: "/hitogram02.png",
        onpress: () => {
          onAddNode("special99", "99", "Horizontal Histogram");
        },
      },
      {
        id: "100",
        title: "Overlaid Histogram",
        subtitle: ".",
        img: "/hitogram03.png",
        onpress: () => {
          onAddNode("special100", "100", "Overlaid Histogram");
        },
      },
      {
        id: "101",
        title: "Stacked Histogram",
        subtitle: ".",
        img: "/hitogram04.png",
        onpress: () => {
          onAddNode("special101", "101", "Stacked Histogram");
        },
      },
      {
        id: "102",
        title: "Colored and Styled Histograms",
        subtitle: ".",
        img: "/hitogram05.png",
        onpress: () => {
          onAddNode("special102", "102", "Colored and Styled Histograms");
        },
      },
      {
        id: "103",
        title: "Cumulative Histogram",
        subtitle: ".",
        img: "/hitogram06.png",
        onpress: () => {
          onAddNode("special103", "103", "Cumulative Histogram");
        },
      },
      {
        id: "104",
        title: "Normalized Histogram",
        subtitle: ".",
        img: "/hitogram07.png",
        onpress: () => {
          onAddNode("special104", "104", "Normalized Histogram");
        },
      },
      {
        id: "105",
        title: "Specify Binning Function",
        subtitle: ".",
        img: "/hitogram08.png",
        onpress: () => {
          onAddNode("special105", "105", "Specify Binning Function");
        },
      },
    ],
    section20: [
      {
        id: "106",
        title: "2D Histogram Contour Plot with Histogram Subplots",
        subtitle: ".",
        img: "/2dDensityPlot01.png",
        onpress: () => {
          onAddNode(
            "special106",
            "106",
            "2D Histogram Contour Plot with Histogram Subplots"
          );
        },
      },
      {
        id: "107",
        title: "2D Histogram Contour Plot with Slider Control",
        subtitle: ".",
        img: "/2dDensityPlot02.png",
        onpress: () => {
          onAddNode(
            "special107",
            "107",
            "2D Histogram Contour Plot with Slider Control"
          );
        },
      },
    ],
    section21: [
      {
        id: "108",
        title: "Filled Lines",
        subtitle: ".",
        img: "/ContinuesErrorBars01.png",
        onpress: () => {
          onAddNode("special108", "108", "Filled Lines");
        },
      },
      {
        id: "109",
        title: "Asymmetric Error Bars with a Constant Offset",
        subtitle: ".",
        img: "/ContinuesErrorBars02.png",
        onpress: () => {
          onAddNode(
            "special109",
            "109",
            "Asymmetric Error Bars with a Constant Offset"
          );
        },
      },
    ],
    section22: [
      {
        id: "110",
        title: "Simple Contour Plot",
        subtitle: ".",
        img: "/ContourPlot01.png",
        onpress: () => {
          onAddNode("special110", "110", "Simple Contour Plot");
        },
      },
      {
        id: "111",
        title: "Basic Contour Plot",
        subtitle: ".",
        img: "/ContourPlot02.png",
        onpress: () => {
          onAddNode("special111", "111", "Basic Contour Plot");
        },
      },
      {
        id: "112",
        title: "Setting X and Y Coordinates in a Contour Plot",
        subtitle: ".",
        img: "/ContourPlot03.png",
        onpress: () => {
          onAddNode(
            "special112",
            "112",
            "Setting X and Y Coordinates in a Contour Plot"
          );
        },
      },
      {
        id: "113",
        title: "Color Scale for Contour Plot",
        subtitle: ".",
        img: "/ContourPlot04.png",
        onpress: () => {
          onAddNode("special113", "113", "Color Scale for Contour Plot");
        },
      },
      {
        id: "114",
        title: "Customizing Size and Range of a Contour Plots Contours",
        subtitle: ".",
        img: "/ContourPlot05.png",
        onpress: () => {
          onAddNode(
            "special114",
            "114",
            "Customizing Size and Range of a Contour Plots Contours"
          );
        },
      },
      {
        id: "115",
        title: "Customizing Spacing Between X and Y Ticks",
        subtitle: ".",
        img: "/ContourPlot06.png",
        onpress: () => {
          onAddNode(
            "special115",
            "115",
            "Customizing Spacing Between X and Y Ticks"
          );
        },
      },
      {
        id: "116",
        title: "Connect the Gaps between Null Values in the Z Matrix",
        subtitle: ".",
        img: "/ContourPlot07.png",
        onpress: () => {
          onAddNode(
            "special116",
            "116",
            "Connect the Gaps between Null Values in the Z Matrix"
          );
        },
      },
      {
        id: "120",
        title: "Smoothing Contour Lines",
        subtitle: ".",
        img: "/ContourPlot08.png",
        onpress: () => {
          onAddNode("special120", "120", "Smoothing Contour Lines");
        },
      },
      {
        id: "121",
        title: "Smooth Contour Coloring",
        subtitle: ".",
        img: "/ContourPlot08.png",
        onpress: () => {
          onAddNode("special121", "121", "Smooth Contour Coloring");
        },
      },
      {
        id: "122",
        title: "Contour Lines",
        subtitle: ".",
        img: "/ContourPlot09.png",
        onpress: () => {
          onAddNode("special122", "122", "Contour Lines");
        },
      },
      {
        id: "123",
        title: "Contour Line Labels",
        subtitle: ".",
        img: "/ContourPlot10.png",
        onpress: () => {
          onAddNode("special123", "123", "Contour Line Labels");
        },
      },
      {
        id: "124",
        title: "Custom Color scale for Contour Plot",
        subtitle: ".",
        img: "/ContourPlot11.png",
        onpress: () => {
          onAddNode("special124", "124", "Custom Color scale for Contour Plot");
        },
      },
      {
        id: "125",
        title: "Color Bar Title",
        subtitle: ".",
        img: "/ContourPlot12.png",
        onpress: () => {
          onAddNode("special125", "125", "Color Bar Title");
        },
      },
      {
        id: "126",
        title: "Color Bar size",
        subtitle: ".",
        img: "/ContourPlot13.png",
        onpress: () => {
          onAddNode("special126", "126", "Color Bar size");
        },
      },
      {
        id: "127",
        title: "Styling Color Bar Ticks for Contour Plots",
        subtitle: ".",
        img: "/ContourPlot14.png",
        onpress: () => {
          onAddNode(
            "special127",
            "127",
            "Styling Color Bar Ticks for Contour Plots"
          );
        },
      },
    ],
    section23: [
      {
        id: "128",
        title: "Basic Heatmap",
        subtitle: ".",
        img: "/HeatMaps01.png",
        onpress: () => {
          onAddNode("special128", "128", "Basic Heatmap");
        },
      },
      {
        id: "129",
        title: "Heatmap with Categorical Axis Labels",
        subtitle: ".",
        img: "/HeatMaps02.png",
        onpress: () => {
          onAddNode(
            "special129",
            "129",
            "Heatmap with Categorical Axis Labels"
          );
        },
      },
      {
        id: "130",
        title: "Annotated Heatmap",
        subtitle: ".",
        img: "/HeatMaps03.png",
        onpress: () => {
          onAddNode("special130", "130", "Annotated Heatmap");
        },
      },
      {
        id: "131",
        title: "Heatmap with Unequal Block Sizes",
        subtitle: ".",
        img: "/HeatMaps04.png",
        onpress: () => {
          onAddNode("special131", "131", "Heatmap with Unequal Block Sizes");
        },
      },
    ],

    section25: [
      {
        id: "134",
        title: "Adding Dimensions",
        subtitle: ".",
        img: "/ParallelCoordinatePlot01.png",
        onpress: () => {
          onAddNode("special134", "134", "Adding Dimensions");
        },
      },
      {
        id: "135",
        title: "Basic Parallel Coordinates Plot",
        subtitle: ".",
        img: "/ParallelCoordinatePlot02.png",
        onpress: () => {
          onAddNode("special135", "135", "Basic Parallel Coordinates Plot");
        },
      },
      {
        id: "136",
        title: "Annotated Parallel Coordinates Plot",
        subtitle: ".",
        img: "/ParallelCoordinatePlot03.png",
        onpress: () => {
          onAddNode("special136", "136", "Annotated Parallel Coordinates Plot");
        },
      },
      {
        id: "137",
        title: "Advanced Parallel Coordinates Plot",
        subtitle: ".",
        img: "/ParallelCoordinatePlot04.png",
        onpress: () => {
          onAddNode("special137", "137", "Advanced Parallel Coordinates Plot");
        },
      },
    ],
    section26: [
      {
        id: "138",
        title: "Logarithmic Axes",
        subtitle: ".",
        img: "/LogPlots01.png",
        onpress: () => {
          onAddNode("special138", "138", "Logarithmic Axes");
        },
      },
    ],
    section27: [
      {
        id: "139",
        title: "Basic Waterfall Chart",
        subtitle: ".",
        img: "/WaterfallCharts01.png",
        onpress: () => {
          onAddNode("special139", "139", "Basic Waterfall Chart");
        },
      },
      {
        id: "140",
        title: "Multi Category Waterfall Chart",
        subtitle: ".",
        img: "/WaterfallCharts02.png",
        onpress: () => {
          onAddNode("special140", "140", "Multi Category Waterfall Chart");
        },
      },
      {
        id: "141",
        title: "Horizontal Waterfall Chart",
        subtitle: ".",
        img: "/WaterfallCharts03.png",
        onpress: () => {
          onAddNode("special141", "141", "Horizontal Waterfall Chart");
        },
      },
      {
        id: "142",
        title: "Style Waterfall Chart",
        subtitle: ".",
        img: "/WaterfallCharts04.png",
        onpress: () => {
          onAddNode("special142", "142", "Style Waterfall Chart");
        },
      },
    ],
    section28: [
      {
        id: "143",
        title: "A Single Angular Gauge Chart",
        subtitle: ".",
        img: "/Indicators01.png",
        onpress: () => {
          onAddNode("special143", "143", "A Single Angular Gauge Chart");
        },
      },
      {
        id: "144",
        title: "Bullet Gauge",
        subtitle: ".",
        img: "/Indicators02.png",
        onpress: () => {
          onAddNode("special144", "144", "Bullet Gauge");
        },
      },
      {
        id: "145",
        title: "Showing Information above Your Chart",
        subtitle: ".",
        img: "/Indicators03.png",
        onpress: () => {
          onAddNode(
            "special145",
            "145",
            "Showing Information above Your Chart"
          );
        },
      },
      {
        id: "146",
        title: "Data Cards/ Big Numbers",
        subtitle: ".",
        img: "/Indicators04.png",
        onpress: () => {
          onAddNode("special146", "146", "Data Cards/ Big Numbers");
        },
      },
    ],
    section29: [
      {
        id: "147",
        title: "Simple Candlestick Chart",
        subtitle: ".",
        img: "/CandleStickChart01.png",
        onpress: () => {
          onAddNode("special147", "147", "Simple Candlestick Chart");
        },
      },
      {
        id: "148",
        title: "Candlestick Chart without Rangeslider",
        subtitle: ".",
        img: "/CandleStickChart02.png",
        onpress: () => {
          onAddNode(
            "special148",
            "148",
            "Candlestick Chart without Rangeslider"
          );
        },
      },
      {
        id: "149",
        title: "Customise Candlestick Chart with Shapes and Annotations",
        subtitle: ".",
        img: "/CandleStickChart03.png",
        onpress: () => {
          onAddNode(
            "special149",
            "149",
            "Customise Candlestick Chart with Shapes and Annotations"
          );
        },
      },
      {
        id: "150",
        title: "Customizing Candlestick Chart Colors",
        subtitle: ".",
        img: "/CandleStickChart04.png",
        onpress: () => {
          onAddNode(
            "special150",
            "150",
            "Customizing Candlestick Chart Colors"
          );
        },
      },
      {
        id: "151",
        title: "Add Range Selector",
        subtitle: ".",
        img: "/CandleStickChart05.png",
        onpress: () => {
          onAddNode("special151", "151", "Add Range Selector");
        },
      },
    ],
    section30: [
      {
        id: "152",
        title: "Basic Funnel Plot",
        subtitle: ".",
        img: "/FunnelAndFunnelAreaChart01.png",
        onpress: () => {
          onAddNode("special152", "152", "Basic Funnel Plot");
        },
      },
      {
        id: "153",
        title: "Setting Marker Size and Color",
        subtitle: ".",
        img: "/FunnelAndFunnelAreaChart02.png",
        onpress: () => {
          onAddNode("special153", "153", "Setting Marker Size and Color");
        },
      },
      {
        id: "154",
        title: "Stacked Funnel",
        subtitle: ".",
        img: "/FunnelAndFunnelAreaChart03.png",
        onpress: () => {
          onAddNode("special154", "154", "Stacked Funnel");
        },
      },
      {
        id: "155",
        title: "Funnel Area Plot",
        subtitle: ".",
        img: "/FunnelAndFunnelAreaChart04.png",
        onpress: () => {
          onAddNode("special155", "155", "Funnel Area Plot");
        },
      },
      {
        id: "156",
        title: "Multi Funnel area",
        subtitle: ".",
        img: "/FunnelAndFunnelAreaChart05.png",
        onpress: () => {
          onAddNode("special156", "156", "Multi Funnel area");
        },
      },
    ],
    section31: [
      {
        id: "157",
        title: "Date Strings",
        subtitle: ".",
        img: "/TimeSeries01.png",
        onpress: () => {
          onAddNode("special157", "157", "Date Strings");
        },
      },
      {
        id: "158",
        title: "Basic Time Series",
        subtitle: ".",
        img: "/TimeSeries02.png",
        onpress: () => {
          onAddNode("special158", "158", "Basic Time Series");
        },
      },
      {
        id: "159",
        title: "Manually Set Range",
        subtitle: ".",
        img: "/TimeSeries03.png",
        onpress: () => {
          onAddNode("special159", "159", "Manually Set Range");
        },
      },
      {
        id: "160",
        title: "Time Series with Rangeslider",
        subtitle: ".",
        img: "/TimeSeries04.png",
        onpress: () => {
          onAddNode("special160", "160", "Time Series with Rangeslider");
        },
      },
    ],
    section32: [
      {
        id: "161",
        title: "3D Scatter Plot",
        subtitle: ".",
        img: "/3DScatterPlot01.png",
        onpress: () => {
          onAddNode("special161", "161", "3D Scatter Plot");
        },
      },
      {
        id: "162",
        title: "Basic Ribbon Plot",
        subtitle: ".",
        img: "/BasicLinePlot.png",
        onpress: () => {
          onAddNode("special162", "162", "Basic Ribbon Plot");
        },
      },
    ],
    sectionSub3D: [
      {
        id: "163",
        title: "Topographical 3D Surface Plot",
        subtitle: ".",
        img: "/3DSurfacePlots01.png",
        onpress: () => {
          onAddNode("special163", "163", "Topographical 3D Surface Plot");
        },
      },
      {
        id: "164",
        title: "Surface Plot With Contours",
        subtitle: ".",
        img: "/3DSurfacePlots02.png",
        onpress: () => {
          onAddNode("special164", "164", "Surface Plot With Contours");
        },
      },
      {
        id: "165",
        title: "Multiple 3D Surface Plots",
        subtitle: ".",
        img: "/3DSurfacePlots03.png",
        onpress: () => {
          onAddNode("special165", "165", "Multiple 3D Surface Plots");
        },
      },
    ],
    section33: [
      {
        id: "166",
        title: "Simple 3D Mesh Plot",
        subtitle: ".",
        img: "/3DMeshPlots01.png",
        onpress: () => {
          onAddNode("special166", "166", "Simple 3D Mesh Plot");
        },
      },
      {
        id: "167",
        title: "3D Mesh Plot with Alphahull",
        subtitle: ".",
        img: "/3DMeshPlots02.png",
        onpress: () => {
          onAddNode("special167", "167", "3D Mesh Plot with Alphahull");
        },
      },
      {
        id: "168",
        title: "3D Mesh Tetrahedron",
        subtitle: ".",
        img: "/3DMeshPlots03.png",
        onpress: () => {
          onAddNode("special168", "168", "3D Mesh Tetrahedron");
        },
      },
      {
        id: "169",
        title: "3D Mesh Cube",
        subtitle: ".",
        img: "/3DMeshPlots04.png",
        onpress: () => {
          onAddNode("special169", "169", "3D Mesh Cube");
        },
      },
    ],
    section34: [
      {
        id: "170",
        title: "3D Line Plot",
        subtitle: ".",
        img: "/3DLinePlot01.png",
        onpress: () => {
          onAddNode("special170", "170", "3D Line Plot");
        },
      },
      {
        id: "171",
        title: "3D Line + Markers Plot",
        subtitle: ".",
        img: "/3DLinePlot02.png",
        onpress: () => {
          onAddNode("special171", "171", "3D Line + Markers Plot");
        },
      },
      {
        id: "172",
        title: "3D Line Spiral Plot",
        subtitle: ".",
        img: "/3DLinePlot03.png",
        onpress: () => {
          onAddNode("special172", "172", "3D Line Spiral Plot");
        },
      },
      {
        id: "173",
        title: "3D Random Walk Plot",
        subtitle: ".",
        img: "/3DLinePlot04.png",
        onpress: () => {
          onAddNode("special173", "173", "3D Random Walk Plot");
        },
      },
    ],
    section35a: [
      {
        id: "174",
        title: "Simple Subplot",
        subtitle: ".",
        img: "/SubPlots01.png",
        onpress: () => {
          onAddNode("special174", "174", "Simple Subplot");
        },
      },
      {
        id: "175",
        title: "Custom Sized Subplot",
        subtitle: ".",
        img: "/SubPlots02.png",
        onpress: () => {
          onAddNode("special175", "175", "Custom Sized Subplot");
        },
      },
      {
        id: "176",
        title: "Multiple Subplots",
        subtitle: ".",
        img: "/SubPlots03.png",
        onpress: () => {
          onAddNode("special176", "176", "Multiple Subplots");
        },
      },
      {
        id: "177",
        title: "Subplots with Shared Axes",
        subtitle: ".",
        img: "/SubPlots04.png",
        onpress: () => {
          onAddNode("special177", "177", "Subplots with Shared Axes");
        },
      },
      {
        id: "178",
        title: "Stacked Subplots",
        subtitle: ".",
        img: "/SubPlots05.png",
        onpress: () => {
          onAddNode("special178", "178", "Stacked Subplots");
        },
      },
      {
        id: "179",
        title: "Stacked Subplots with a Shared X-Axis",
        subtitle: ".",
        img: "/SubPlots06.png",
        onpress: () => {
          onAddNode(
            "special179",
            "179",
            "Stacked Subplots with a Shared X-Axis"
          );
        },
      },
      {
        id: "180",
        title: "Multiple Custom Sized Subplots",
        subtitle: ".",
        img: "/SubPlots07.png",
        onpress: () => {
          onAddNode("special180", "180", "Multiple Custom Sized Subplots");
        },
      },
    ],
    section35: [
      {
        id: "181",
        title: "Simple Inset Plot",
        subtitle: ".",
        img: "/InsetPlots01.png",
        onpress: () => {
          onAddNode("special181", "181", "Simple Inset Plot");
        },
      },
    ],
    section36: [
      {
        id: "182",
        title: "Multiple 3D Subplots",
        subtitle: ".",
        img: "/3DSubPlots01.png",
        onpress: () => {
          onAddNode("special182", "182", "Multiple 3D Subplots");
        },
      },
    ],
    section37: [
      {
        id: "183",
        title: "Mixed Subplots",
        subtitle: ".",
        img: "/3DMixedSubPlots.png",
        onpress: () => {
          onAddNode("special183", "183", "Mixed Subplots");
        },
      },
    ],
    section38: [
      {
        id: "184",
        title: "Table and Chart Subplot",
        subtitle: ".",
        img: "/TableSubPlots01.png",
        onpress: () => {
          onAddNode("special184", "184", "Table and Chart Subplot");
        },
      },
    ],
    section39: [
      {
        id: "186",
        title: "Binding to Click Events",
        subtitle: ".",
        img: "/ClickEvents02.png",
        onpress: () => {
          onAddNode("special186", "186", "Binding to Click Events");
        },
      },
      {
        id: "187",
        title: "Create annotation on click event",
        subtitle: ".",
        img: "/LineAndScatterPlot.png",
        onpress: () => {
          onAddNode("special187", "187", "Create annotation on click event");
        },
      },
    ],
    section40: [
      // {
      //   title: 'Hover Event Data',
      //   subtitle: '.',
      //   img: '/HoverEvents01.png',
      //   onpress: () => {
      //     onAddNode('special188', '188')
      //   }
      // },
      {
        id: "189",
        title: "Capturing Hover Events: Data",
        subtitle: ".",
        img: "/HoverEvents02.png",
        onpress: () => {
          onAddNode("special189", "189", "Capturing Hover Events: Data");
        },
      },
      {
        id: "190",
        title: "Capturing Hover Events: Pixels",
        subtitle: ".",
        img: "/HoverEvents03.png",
        onpress: () => {
          onAddNode("special190", "190", "Capturing Hover Events: Pixels");
        },
      },
      {
        id: "191",
        title: "Triggering Hover Events",
        subtitle: ".",
        img: "/HoverEvents04.png",
        onpress: () => {
          onAddNode("special191", "191", "Triggering Hover Events");
        },
      },
      {
        id: "192",
        title: "Coupled Hover Events",
        subtitle: ".",
        img: "/HoverEvents05.png",
        onpress: () => {
          onAddNode("special192", "192", "Coupled Hover Events");
        },
      },
      {
        id: "193",
        title: "Combined Click and Hover Events",
        subtitle: ".",
        img: "/LineAndScatterPlot.png",
        onpress: () => {
          onAddNode("special193", "193", "Combined Click and Hover Events");
        },
      },
    ],
    section41: [
      {
        id: "194",
        title: "Binding to Zoom Events",
        subtitle: ".",
        img: "/ZoomEvents01.png",
        onpress: () => {
          onAddNode("special194", "194", "Binding to Zoom Events");
        },
      },
    ],
    section42: [
      {
        id: "195",
        title: "Disabling Zoom Events for X Axis",
        subtitle: ".",
        img: "/ZoomEventsDisable01.png",
        onpress: () => {
          onAddNode("special195", "195", "Disabling Zoom Events for X Axis");
        },
      },
      {
        id: "196",
        title: "Disabling Zoom Events for X and Y Axis",
        subtitle: ".",
        img: "/ZoomEventsDisable02.png",
        onpress: () => {
          onAddNode(
            "special196",
            "196",
            "Disabling Zoom Events for X and Y Axis"
          );
        },
      },
    ],
    section43: [
      {
        id: "197",
        title: "Filter",
        subtitle: ".",
        img: "/Filter01.png",
        onpress: () => {
          onAddNode("special197", "197", "Filter");
        },
      },
      {
        id: "198",
        title: "Groupby",
        subtitle: ".",
        img: "/GroupBy01.png",
        onpress: () => {
          onAddNode("special198", "198", "Groupby");
        },
      },
    ],
    section44: [
      {
        id: "199",
        title: "Aggregations",
        subtitle: ".",
        img: "/Aggregations01.png",
        onpress: () => {
          onAddNode("special199", "199", "Aggregations");
        },
      },
      {
        id: "200",
        title: "Aggregate Functions",
        subtitle: ".",
        img: "/Aggregations02.png",
        onpress: () => {
          onAddNode("special200", "200", "Aggregate Functions");
        },
      },
      {
        id: "201",
        title: "Histogram Binning",
        subtitle: ".",
        img: "/Aggregations03.png",
        onpress: () => {
          onAddNode("special201", "201", "Histogram Binning");
        },
      },
    ],
    section46: [
      {
        id: "208",
        title: "Add Two Dropdown Menus to a Chart with Plotly.js",
        subtitle: ".",
        img: "/DropDownEvents01.png",
        onpress: () => {
          onAddNode(
            "special208",
            "208",
            "Add Two Dropdown Menus to a Chart with Plotly.js"
          );
        },
      },
    ],
    section47: [
      {
        title: "Add Two Dropdown Menus to a Chart with Plotly.js",
        subtitle: ".",
        img: "/LineAndScatterPlot.png",
        onpress: () => {},
      },
      {
        title: "Bind dropdown events to Plotly.js charts",
        subtitle: ".",
        img: "/LineAndScatterPlot.png",
        onpress: () => {},
      },
    ],
    section48: [
      {
        id: "210",
        title: "Restyle Button Single Attribute",
        subtitle: ".",
        img: "/ButtonEvents01.png",
        onpress: () => {
          onAddNode("special210", "210", "Restyle Button Single Attribute");
        },
      },
      {
        id: "211",
        title: "Restyle Button Multiple Attributes",
        subtitle: ".",
        img: "/ButtonEvents02.png",
        onpress: () => {
          onAddNode("special211", "211", "Restyle Button Multiple Attributes");
        },
      },
      {
        id: "212",
        title: "Relayout Button",
        subtitle: ".",
        img: "/ButtonEvents02.png",
        onpress: () => {
          onAddNode("special212", "212", "Relayout Button");
        },
      },
      {
        id: "213",
        title: "Update Button",
        subtitle: ".",
        img: "/ButtonEvents03.png",
        onpress: () => {
          onAddNode("special213", "213", "Update Button");
        },
      },
      {
        id: "215",
        title: "Style the buttons",
        subtitle: ".",
        img: "/ButtonEvents05.png",
        onpress: () => {
          onAddNode("special215", "215", "Style the buttons");
        },
      },
    ],
    section49: [
      {
        id: "216",
        title: "Basic Slider",
        subtitle: ".",
        img: "/SliderEvents01.png",
        onpress: () => {
          onAddNode("special216", "216", "Basic Slider");
        },
      },
      {
        id: "219",
        title: "Bind Components to the Appearance of a Plot",
        subtitle: ".",
        img: "/SliderEvents02.png",
        onpress: () => {
          onAddNode(
            "special219",
            "219",
            "Bind Components to the Appearance of a Plot"
          );
        },
      },
      {
        id: "220",
        title: "Add a Play Button to Control a Slider",
        subtitle: ".",
        img: "/SliderEvents03.png",
        onpress: () => {
          onAddNode(
            "special220",
            "220",
            "Add a Play Button to Control a Slider"
          );
        },
      },
    ],
    section50a: [
      {
        id: "221",
        title: "Lasso Selection",
        subtitle: ".",
        img: "/LassoSelection01.png",
        onpress: () => {
          onAddNode("special221", "221", "Lasso Selection");
        },
      },
    ],
    section50: [
      {
        id: "222",
        title: "Basic Range Slider on Time Series",
        subtitle: ".",
        img: "/RangeSliderAndSelector01.png",
        onpress: () => {
          onAddNode("special222", "222", "Basic Range Slider on Time Series");
        },
      },
    ],
    section51: [
      {
        id: "224",
        title: "Animating the Layout",
        subtitle: ".",
        img: "/Animation02.png",
        onpress: () => {
          onAddNode("special224", "224", "Animating the Layout");
        },
      },
      {
        id: "225",
        title: "Defining Named Frames with Plotly.addFrames",
        subtitle: ".",
        img: "/Animation03.png",
        onpress: () => {
          onAddNode(
            "special225",
            "225",
            "Defining Named Frames with Plotly.addFrames"
          );
        },
      },
      {
        id: "226",
        title: "Animating Sequences of Frames",
        subtitle: ".",
        img: "/Animation04.png",
        onpress: () => {
          onAddNode("special226", "226", "Animating Sequences of Frames");
        },
      },
      {
        id: "227",
        title: "Animating Many Frames Quickly",
        subtitle: ".",
        img: "/Animation05.png",
        onpress: () => {
          onAddNode("special227", "227", "Animating Many Frames Quickly");
        },
      },
      {
        id: "228",
        title: "Object Constancy",
        subtitle: ".",
        img: "/Animation06.png",
        onpress: () => {
          onAddNode("special228", "228", "Object Constancy");
        },
      },
      {
        id: "229",
        title: "Frame Groups and Animation Modes",
        subtitle: ".",
        img: "/Animation07.png",
        onpress: () => {
          onAddNode("special229", "229", "Frame Groups and Animation Modes");
        },
      },
    ],
    section53: [
      {
        id: "231",
        title: "Filled-Area-Animation",
        subtitle: ".",
        img: "/FielledAreaAnimation01.png",
        onpress: () => {
          onAddNode("special231", "231", "Filled-Area-Animation");
        },
      },
      {
        id: "232",
        title: "Multiple Trace Filled-Area",
        subtitle: ".",
        img: "/FielledAreaAnimation02.png",
        onpress: () => {
          onAddNode("special232", "232", "Multiple Trace Filled-Area");
        },
      },
    ],
    section54: [
      {
        id: "233",
        title: "Map Animations",
        subtitle: ".",
        img: "/MapAnimation01.png",
        onpress: () => {
          onAddNode("special233", "233", "Map Animations");
        },
      },
    ],
  };
  let onAddNode = (node_type, nodeId, nodeTitle) => {
    console.log("On graph select");
    // console.log('NodeBox2 Length', nodeBox.length)
    // if (IsNumericString == true) {
    if (nodeBox2.length < 6) {
      if (nodeBox.includes(node_type) === true) {
        // setGraphAlreadySelected(true);
        console.log("came here", mynode, node_type);
        nodeBox = nodeBox.filter((e) => e != node_type);
        mynode = mynode.filter((e) => e != nodeId);
        nodeBox2 = nodeBox2.filter((e) => e.type != node_type);
        console.log("came here2", mynode, nodeBox, nodeBox2);
        // setTimeout(
        //   () =>
        //     validationMessageRef.current?.scrollIntoView({ block: "start" }),
        //   800
        // );

        // setTimeout(() => setGraphAlreadySelected(false), 3500);
        return;
      }
      if (nodeBox.includes(node_type) !== true) {
        console.log("NODEBOX --", nodeBox, mynode);
        nodeBox.push(node_type);
        mynode.push(nodeId);
        nodeBox2.push({
          id: nodeId,
          type: node_type,
          title: nodeTitle && nodeTitle,
        });

        setNode3(node_type);
        setNodeType(node_type);
        setIsSelected2(true);
      }
      console.log("NODEBOX 2 #####", nodeBox2);
      console.log("NODEBOX  #####", nodeBox);
      console.log("mynode  #####", mynode);
      closeModal();
      setDsp(nodeId);
      setDspNo(false);
      setStateElements(elementsCustom);
    } else {
      window.alert("Cannot add more graphs!");
      closeModal();
    }
  };
  const miscOptions = {
    section1: [
      {
        title: "Stats",
        subtitle:
          "Gives you min, max, avg, mean and count of a given column name.",
        img: "/Stats02.png",
        onpress: () => {
          onAdd15();
        },
      },
      {
        title: "Export",
        subtitle: "Lets you export data as csv, json or geojson.",
        img: "/Export02.png",
        onpress: () => {
          onAdd16();
        },
      },
    ],
  };

  const handleOnFileLoad = (data, fileInfo, originalFile) => {
    console.log("check FileInfo", fileInfo);
    fileInfo1 = fileInfo;
    setOriginalFile(fileInfo);
    // let filetype = fileInfo.name.substring(
    //   fileInfo.name.length - 4,
    //   fileInfo.name.length
    // )
    let filetype = fileInfo.name.substr(fileInfo.name.indexOf(".") + 1);
    console.log("FileType-", filetype, filetype === "xlsx");

    typeId =
      filetype === "xls" ||
      filetype === "xlsx" ||
      filetype === "xlsm" ||
      filetype === "xlsb" ||
      filetype === "xltx" ||
      filetype === "xltm" ||
      filetype === "xlt" ||
      filetype === "xlam" ||
      filetype === "xla" ||
      filetype === "xlw" ||
      filetype === "xlr"
        ? 2
        : filetype === "xml"
        ? 3
        : filetype === "json"
        ? 4
        : filetype === "pdf"
        ? 6
        : filetype === "parquet"
        ? 7
        : 1;

    console.log("FileTypeID-", typeId);
    setfileimg(typeId);
    global.type_id = typeId;

    setExpData(false);

    // console.log("----------Data", data);

    var temp = [];
    data.map((e) => {
      var temp1 = [];
      e.data.map((e2) => {
        temp1.push({ value: e2 });
        return e2;
      });
      temp.push(temp1);
      return e;
    });
    setDt(temp);
    setData(temp);

    result = data.map((e) => e.data);
    // console.log("RESULT>", result);

    if (global.type_id === 1) {
      console.log("DATA FORMAT-", result);
      columns = result.slice(0, 1);
      // const C1 = columns[0];
      // console.log("columns-typeId1", columns[0]);
      columns2 = columns[0];
      columns = columns[0];
      setColumnsBox(columns);
      setColumnsBox2(columns);
    }

    handleNext();
    setTimeout(() => {
      setnewpg1(false);
    }, 5000);

    console.log("---------------------------handleFileEnd");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const getFileData = (data, fileInfo) => {
    console.log("getFILE", data, fileInfo);
    setDataBackup(data);
    fileInfo1 = fileInfo;
    var temp = [];
    result = data;
    data.map((e) => {
      var temp1 = [];
      e.map((e2) => {
        temp1.push({ value: e2 });
        return e2;
      });
      temp.push(temp1);
      return e;
    });

    setDt(temp);
    setUpDataForGrid(data);
    setData(temp);

    let col = result.slice(0, 1);
    columns = col[0];
    handleNext();
    setTimeout(() => {
      setnewpg1(false);
    }, 5000);
  };

  const getDatasetData = (data) => {
    setOpenDialog(true);
    // console.log("getDataset Data", data);
    setDataBackup(data);
    // fileInfo1 = fileInfo;
    var temp = [];
    result = data;
    data.map((e) => {
      var temp1 = [];
      e.map((e2) => {
        temp1.push({ value: e2 });
        return e2;
      });
      temp.push(temp1);
      return e;
    });

    setDt(temp);
    setUpDataForGrid(data);
    setData(temp);

    let col = result.slice(0, 1);
    columns = col[0];
    handleNext();
    setOpenDialog(false);
    setTimeout(() => {
      setnewpg1(false);
    }, 5000);
  };

  const handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    // console.log(data)
    console.log("---------------------------");
  };

  const [columnsBox, setColumnsBox] = useState(["1", "2", "3"]);

  const [isNumeric, setIsNumeric] = useState(false);
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [node3, setNode3] = useState("");
  const [node4, setNode4] = useState("");

  const [openModal1, setOpenModal1] = useState(false);
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpenModal1(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpenDialog(false);
  };
  const elementsFinalCustom = [
    {
      id: "1",
      type: node1,
      isHidden: false,
      position: { x: 60, y: 100 },
      data: { text: "" },
    },
    {
      id: "2",
      type: node2,
      isHidden: false,
      position: { x: 470, y: 150 },
      data: { text: "" },
    },
    {
      id: "3",
      type: node3,
      isHidden: false,
      position: { x: 790, y: 200 },
      data: orignalFile ? orignalFile : null,
    },
    {
      id: "4",
      type: node4,
      isHidden: false,
      position: { x: 1150, y: 250 },
      data: { text: "" },
    },
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#000" },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "a",
      animated: true,
      style: { stroke: "#000" },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: true,
      style: { stroke: "#000" },
    },
  ];

  const prepareData = () => {
    console.log("In PrepareData", result);
    // console.log('--DATA', dt, result)
    temp9.push("");
    //  console.log('In useeff', temp.length,data[0].length)

    for (let k = 0; temp9.length < result[0].length - 1; k++) {
      //console.log('In for', temp9.length, result[0].length)

      if (k === 0) {
        temp9.push(result[0][k]);
        temp9.push(result[0][k]);
      }
      if (k === 1) {
        temp9.push(result[0][k]);
        temp9.push(result[0][k]);
      }
      if (k === 2) {
        temp9.push(result[0][k]);
      }
      if (k === 3) {
        temp9.push(result[0][k]);
      }
      if (k === 4) {
        temp9.push(result[0][k]);
      }
      if (k === 5) {
        temp9.push(result[0][k]);
      }
      if (k === 6) {
        temp9.push(result[0][k]);
      }
      if (k === 7) {
        temp9.push(result[0][k]);
      }

      if (k === 8) {
        temp9.push(result[0][k]);
      }
      if (k === 9) {
        temp9.push(result[0][k]);
      }
      if (k === 10) {
        temp9.push(result[0][k]);
      }
      if (k === 11) {
        temp9.push(result[0][k]);
      }
      if (k === 12) {
        temp9.push(result[0][k]);
      }
      if (k === 13) {
        temp9.push(result[0][k]);
      }
      if (k === 14) {
        temp9.push(result[0][k]);
      }
      if (k === 15) {
        temp9.push(result[0][k]);
      }
      if (k === 16) {
        temp9.push(result[0][k]);
      }
      if (k === 17) {
        temp9.push(result[0][k]);
      }
      if (k === 18) {
        temp9.push(result[0][k]);
      }
      if (k === 19) {
        temp9.push(result[0][k]);
      }
      if (k === 20) {
        temp9.push(result[0][k]);
      }
      if (temp9.length == result[0].length - 1) temp9.push(result[0][0]);
      else temp9.push(result[0][k]);
    }

    setDt2(temp9);
  };
  const [showCloseIcon, setShowCloseIcon] = React.useState(false);
  const [myFlowId, setMyFlowId] = React.useState(0);

  const handleNext = () => {
    if (flowName === "") {
      setNoFlowName(true);
      handleClickOpen();
      setAlertType(1);

      return;
    }
    if (flowName.length > 128) {
      handleClickOpen();
      setAlertType(3);

      return;
    }
    // if (flowDescription.length > 256) {
    //   handleClickOpen()
    //   setAlertType(4)

    //   return
    // }
    // if (/[^-_a-zA-Z0-9\s]/.test(flowName)) {
    //   setAlertType(2)
    //   handleClickOpen()
    //   return
    // }

    var n = 0;
    setShowCloseIcon(true);

    if (activeStep === 0) {
      tempElements.push({
        id: "1",
        type: node1,
        isHidden: false,
        position: { x: 400, y: 40 },
        data: orignalFile ? orignalFile : null,
      });
      close1 = 0;
      //   console.log('id1', tempElements)
    }
    if (activeStep === 1) {
      tempElements.push({
        id: "2",
        type: node2,
        isHidden: false,
        position: { x: 800, y: 50 },
        data: { text: "No duplicates found" },
      });
      close2 = 0;
      //    console.log('id2', tempElements)
    }
    if (activeStep === 2) {
      //  console.log('id3-checkNodebox', nodeBox)

      while (n < nodeBox.length) {
        tempElements.push({
          id: (n + 3).toString(),
          type: nodeBox[n],
          isHidden: false,
          position: {
            x: 1190,
            y:
              n === 0
                ? (n + 2) * 30
                : n === 1
                ? (n + 2) * 80
                : n === 2
                ? (n + 2) * 100
                : (n + 2) * 120,
          },
          data: result && result,
        });
        n++;
      }
      close3 = 0;

      //   console.log('id3', tempElements)
    }
    if (activeStep === 3) {
      tempElements.push({
        id: (nodeBox.length + 3).toString(),
        type: node4,
        isHidden: false,
        position: { x: 1600, y: 60 },
        data: result && result,
      });
      if (nodeBox.length === 1) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-4",
            source: "3",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      } else if (nodeBox.length === 2) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-5",
            source: "3",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e4-5",
            source: "4",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      } else if (nodeBox.length === 3) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-5",
            source: "2",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-6",
            source: "3",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e4-6",
            source: "4",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e5-6",
            source: "5",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      } else if (nodeBox.length === 4) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-5",
            source: "2",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-6",
            source: "2",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-7",
            source: "3",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e4-7",
            source: "4",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e5-7",
            source: "5",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e6-7",
            source: "6",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      } else if (nodeBox.length === 5) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-5",
            source: "2",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-6",
            source: "2",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-7",
            source: "2",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-8",
            source: "3",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e4-8",
            source: "4",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e5-8",
            source: "5",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e6-8",
            source: "6",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e7-8",
            source: "7",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      } else if (nodeBox.length === 6) {
        tempElements.push(
          {
            id: "e1-2",
            source: "1",
            target: "2",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-3",
            source: "2",
            target: "3",
            sourceHandle: "a",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-4",
            source: "2",
            target: "4",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-5",
            source: "2",
            target: "5",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-6",
            source: "2",
            target: "6",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-7",
            source: "2",
            target: "7",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e2-8",
            source: "2",
            target: "8",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e3-9",
            source: "3",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e4-9",
            source: "4",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e5-9",
            source: "5",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e6-9",
            source: "6",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e7-9",
            source: "7",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          },
          {
            id: "e8-9",
            source: "8",
            target: "9",
            animated: true,
            style: { stroke: "#000" },
          }
        );
      }
      //   console.log('id4', tempElements)
      //   console.log('CHECK UPDATED', tempElements, nodeBox)
      close4 = 0;
      setStateElements2(tempElements);
    }

    if (activeStep === 4) {
      history.push("/My Flows");
    }
    let fid = 0;
    const formData = new FormData();
    console.log("I am in the Handle Next -----------");
    //    console.log(dt)

    formData.append("file_name", fileInfo1);
    formData.append("name", flowName);
    formData.append("description", flowDescription);
    formData.append("type", global.type_id);
    formData.append("account_id", localStorage.getItem("account_id"));
    formData.append("operation_type", 1);
    formData.append("step_number", activeStep + 1);
    formData.append("flowId", myFlowId);
    formData.append("data", activeStep === 1 ? JSON.stringify(dt) : null);
    formData.append(
      "selected_charts",
      activeStep === 2 ? JSON.stringify(nodeBox2) : null
    );
    //  console.log('FORM->', formData)
    console.log("FORM->", Array.from(formData.entries()));
    axios
      .post(
        configData.API_URL + "personalAccount/users/saveStepWiseFlow",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        //   console.log('I am in next RRRR', response, response.data.data.id)
        //  console.log('STEp IDCHECK', response.data.data.id)
        if (activeStep === 0) {
          console.log("FLOW ID", response.data.data.id);
          fid = response.data.data.id;
          setMyFlowId(fid);
        }
        console.log(
          "TYPEID and data",
          global.type_id,
          global.type_id === 2,
          response.data.data
        );

        if (global.type_id === 2 && activeStep === 0) {
          console.log("DATA....?", exceldata);
          exceldata = response.data.data.parsedData;
          const array6 = exceldata.map((obj) => Object.values(obj));
          console.log("DATA....", array6);
          //  console.log('Columns%%', array6[0])
          exceldata = array6;
          columns = array6[0];
          columns2 = columns;
          console.log("columns??", columns);

          setColumnsBox(columns);
          setColumnsBox2(columns);

          setDt(exceldata);
          convertDataForDisplay(exceldata);
          setUpDataForGrid(exceldata);
        } else if (global.type_id === 3 && activeStep === 0) {
          console.log("parsed-", Object.keys(response.data.data.parsedData[0]));
          var key1 = Object.keys(response.data.data.parsedData[0]);
          console.log(
            "key1-",
            Object.keys(response.data.data.parsedData[0][key1])
          );

          var key2 = Object.keys(response.data.data.parsedData[0][key1]);
          console.log("key2-", key2);
          if (key2.length > 1) {
            console.log("what-", response.data.data.parsedData[0][key1]);
            let k2 = Object.keys(response.data.data.parsedData[0][key1]);
            console.log("see-", response.data.data.parsedData[0][key1][k2[2]]);
            if (
              typeof response.data.data.parsedData[0][key1][k2[0]] === "array"
            )
              key2 = key2[0];
            else if (
              typeof response.data.data.parsedData[0][key1][k2[1]] === "array"
            )
              key2 = key2[1];
            else if (
              typeof response.data.data.parsedData[0][key1][k2[2]] === "array"
            )
              key2 = key2[2];

            console.log("PP-", key2);
          } else key2 = Object.keys(response.data.data.parsedData[0][key1]);

          var dataWithKeys = response.data.data.parsedData[0][key1][key2];
          //   console.log('key-data', dataWithKeys)
          // console.log('key-data...', response.data.data.parsedData[0])
          //  var ch1 = Object.keys(response.data.data.parsedData[0])
          // console.log('xml data', response.data.data.parsedData[0][ch1[0]], ch1)

          let def4 = [];
          let def5 = [];
          let temp1;

          console.log("dataWithKeys", dataWithKeys);
          for (const [key, value] of Object.entries(dataWithKeys)) {
            console.log("val-", key, value);
            columns = Object.keys(value).flat();
            // console.log('Check??', Object.keys(value).flat())

            // console.log('Check->', Object.values(value).flat())
            temp1 = Object.values(value).flat();
            def5 = [];
            temp1.map((e) => {
              // console.log('checkE', e, typeof e === 'object')
              if (typeof e === "object") {
                let t1 = Object.keys(e);
                // console.log('checkE->', e[t1])
                def5.push(e[t1]);
                //    def4.push(def5)
              } else {
                //def5.push(e)
                def5.push(e);
              }
              def4.push(def5);
            });
          }
          //  console.log('xmldata', def4)
          xmldata = def4;

          setDt(xmldata);
          convertDataForDisplay(xmldata);
          setUpDataForGrid(xmldata);
          setColumnsBox(columns);
          setColumnsBox2(columns);
        } else if (global.type_id === 4 && activeStep === 0) {
          var keys;
          console.log("jsondata>", response.data.data.parsedData);
          // let key = Object.keys(response.data.data.parsedData);
          // console.log("jsondata2>", key);
          let jsonbox = response.data.data.parsedData;
          let def5 = [];

          console.log("jsonbox>", jsonbox);

          jsonbox?.map((e) => {
            //  console.log('json1-', e)
            keys = Object.keys(e);
            let values = Object.values(e);
            def5.push(values);
          });
          def5.unshift(keys);
          jsondata = def5;
          console.log("jsondata**", jsondata);
          setDt(jsondata);
          convertDataForDisplay(jsondata);
          setUpDataForGrid(jsondata);

          columns = jsondata.slice(0, 1);
          const C1 = columns[0];
          columns2 = columns[0];
          columns = columns[0];
          setColumnsBox(columns);
          setColumnsBox2(columns);
        } else if (global.type_id === 6 && activeStep === 0) {
          pdfdata = response.data.data.parsedData;
          console.log("pdf->", response.data.data.parsedData);

          const newData = pdfdata;
          console.log("pdfdataCheck", newData);
          pdfdata = newData;
          setDt(newData);
          convertDataForDisplay(pdfdata);
          setUpDataForGrid(pdfdata);

          columns = pdfdata.slice(0, 1);
          const C1 = columns[0];
          // console.log('C1....', C1[0])
          columns2 = columns[0];
          columns = columns[0];
          setColumnsBox(columns);
          setColumnsBox2(columns);
        } else if (global.type_id === 7 && activeStep === 0) {
          // console.log(
          //   'parquetdata',
          //   response.data.data.parsedData[0].schema.fieldList
          // )
          let def4 = [];
          for (const [value] of Object.entries(
            response.data.data.parsedData[0].schema.fieldList
          )) {
            def4.push(Object.keys(value));
            def4.push(Object.values(value).flat());
          }
          //   console.log('parquetdata**', def4)
          parquetdata = def4;
          // console.log('parquetdata**', parquetdata)
          setDt(parquetdata);
          convertDataForDisplay(exceldata);
          setUpDataForGrid(exceldata);

          columns = parquetdata.slice(0, 1);
          const C1 = columns[0];
          //  console.log('C1....', C1[0])
          columns2 = columns[0];
          columns = columns[0];
          setColumnsBox(columns);
          setColumnsBox2(columns);
        }
        // else {
        //   dataBackup = result;
        // }

        return response.data.data;
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

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // scrollToTop()
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
    if (activeStep === 1) close1 = 1;
    if (activeStep === 2) close2 = 1;
    if (activeStep === 3) close3 = 1;
    if (activeStep === 4) close4 = 1;
  };

  const [dt2, setDt2] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [cpText, setCpText] = useState("");
  const [expData, setExpData] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [stateElements2, setStateElements2] = useState(elementsFinalCustom);
  const [selCpText, setSelCpText] = useState("JSON");
  const [isSelected, setIsSelected] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);

  const reactFlowWrapper = useRef(null);

  const [visible, setVisible] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [flowDescription, setFlowDescription] = useState("");
  const [startIndex, setstartIndex] = useState(0);
  const [lastIndex, setlastIndex] = useState(1);

  const [renameColumn, setRenameColumn] = useState("");
  const [sortType1, setSortType1] = useState(-1);
  const [fuzzyCount, setFuzzyCount] = useState(0);

  const [fuzzyInput2, setFuzzyInput2] = useState();

  const [noFlowName, setNoFlowName] = useState(true);

  const onConnect = (params) => setStateElements((els) => addEdge(params, els));
  const onConnect2 = useCallback(
    (params) =>
      setStateElements2((els) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, els)
      ),
    []
  );

  useEffect(() => {
    setStateElements((els) =>
      els.map((e) => {
        e.id === dsp && (e.isHidden = false);
        return e;
      })
    );
  }, [isHidden, dsp]);

  useEffect(() => {
    setStateElements((els) =>
      els.map((e) => {
        e.type === nodeType &&
          (dspNo === true ? (e.isHidden = true) : (e.isHidden = false));
        return e;
      })
    );
  }, [nodeType, dspNo]);

  useEffect(() => {
    // console.log('clear?', localStorage.getItem('CLEAR'))
    tempElements = [];
    setNode2("");
    setNodeType("");
    nodeBox = [];
    nodeBox2 = [];
    close1 = 1;
    close2 = 1;
    close3 = 1;
    close4 = 1;
    setActiveStep(0);
    setDspNo(true);
    setStateElements((els) =>
      els.map((e) => {
        // console.log('E$', e)
        e.isHidden = true;
        return e;
      })
    );
    // }
  }, []);

  useEffect(() => {
    // console.log('selected node', node1, node2, node3, node4)
    setStateElements2((els) =>
      els.map((e) => {
        if (e.id === "1") e.type = node1;
        if (e.id === "2") e.type = node2;
        if (e.id === "3") e.type = node3;
        if (e.id === "4") e.type = node4;

        return e;
      })
    );
  }, [node1, node2, node3, node4]);

  useEffect(() => {
    console.log("Activestep", activeStep);
    scrollToTop();
  }, [activeStep]);

  useEffect(() => {
    console.log("CloseIcon..", showCloseIcon);
  }, [showCloseIcon]);

  useEffect(() => {
    console.log("finalstateelements", stateElements2);
  }, [stateElements2]);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  useEffect(() => {
    console.log("DT->", dt);
  }, [dt]);

  const scrollToTop = () => {
    console.log("SCROLLED");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    });
  };
  // useEffect(() => {
  //   console.log('subscription_id', subscription_id)
  //   if (subscription_id === 'price_1LfOlnSBwqDDsny7nprdkWUQ') {
  //     inputOptionsBox = inputOptions.section1.filter(
  //       item => item.title != 'Select DataSet'
  //     )
  //     // console.log('inputOptionsBox', inputOptionsBox)
  //   } else if (
  //     subscription_id === 'price_1LfOnUSBwqDDsny71PPaevJ8' ||
  //     subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra' ||
  //     subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra'
  //   ) {
  //     inputOptionsBox = inputOptions.section1
  //     // console.log('inputOptionsBox', inputOptionsBox)
  //   }
  // }, [])
  const handleFocus = (d) => {
    // console.log('focues', d)
    if (highlightOn) {
      d.borderColor = "#00ff00";
      box1.push(d);
      // console.log('focuesbox', box1)
      setHighlight(box1);
    }
  };

  useEffect(() => {
    console.log("ROWS>", rowsData);
    if (rowsData) convertData(rowsData);
  }, [rowsData]);

  useEffect(() => {}, [highlight]);

  useEffect(() => {}, [highlightOn]);

  const convertData = (data) => {
    let box2 = [];
    data.map((e, i) => {
      let box = [];
      // console.log('iiio', e)
      e.cells.map((e2) => {
        box.push(e2.text);
      });
      box2.push(box);
    });
    // console.log('data<<<', box2)
    result = box2;
    setDt(box2);
  };

  const setUpDataForGrid = (data, mode) => {
    console.log("check dtata", flag, data);
    setUpdatedData(data);

    let columns = data[0];
    console.log("check ccc", columns);
    setColumnsBox2(columns);

    let columnsBox = [];
    let cells = [];
    columns.map((e) => {
      columnsBox.push({
        columnId: e,
        width: 150,
        resizable: true,
        reorderable: true,
      });
      cells.push({
        type: "header",
        text: e,
      });
    });

    setColumnData(columnsBox);

    let rowsBox = [];

    rowsBox.push({
      rowId: "header",
      cells: cells,
    });
    let c = 0;

    let data1 = [...data];
    data1.shift();
    data1.map((e) => {
      let cells1 = [];
      e.map((e2) => {
        cells1.push({
          id: c,
          type: "text",
          text: typeof e2 === "string" ? e2 : e2?.toString(),
        });

        // console.log('In ExploreCols', cells1)
      });

      rowsBox.push({
        rowId: c,
        cells: cells1,
      });
      c++;
    });

    console.log("In ExploreCols", rowsBox);
    setrowsData(rowsBox);
    flag = 1;
  };

  const setUpDataForGrid2 = (data, columns) => {
    // console.log("check data2", data, columns);
    let d1 = data;
    d1.shift();
    d1.unshift(columns);

    // let columns = data[0];
    // console.log("check ccc", columns);
    console.log("check data2", d1, columns);
    setUpdatedData(d1);

    let columnsBox = [];
    let cells = [];
    columns.map((e) => {
      columnsBox.push({
        columnId: e,
        width: 150,
        resizable: true,
        reorderable: true,
      });
      cells.push({
        type: "header",
        text: e,
      });
    });

    setColumnData(columnsBox);

    let rowsBox = [];

    rowsBox.push({
      rowId: "header",
      cells: cells,
    });
    let c = 0;

    let data1 = [...data];
    data1.shift();
    data1.map((e) => {
      let cells1 = [];
      e.map((e2) => {
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

    console.log("In ExploreCols", rowsBox);
    setrowsData(rowsBox);
    flag = 1;
  };

  const convertDataForDisplay = (data) => {
    let temp2 = [];
    data.map((e) => {
      let temp3 = [];
      e.map((e2) => {
        temp3.push({ value: e2 });
        return e2;
      });
      temp2.push(temp3);
      return e;
    });
    setData(temp2);

    console.log("TRR", temp2);
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

  const simpleHandleContextMenu = (
    selectedRowIds,
    selectedColIds,
    selectionMode,
    menuOptions
  ) => {
    return menuOptions;
  };

  const MyComponent = (props) => {
    // useEffect(() => {
    //   console.log('changed!!', props.data)
    // }, [props.data])
    return (
      <div
        style={{
          width: window.innerWidth - 160,
          height: window.innerHeight / 1.3,
          overflow: "scroll",
          marginTop: 20,
        }}
      >
        {/* <Spreadsheet data={props.data && props.data} /> */}
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
            onColumnResized={columnResize ? handleColumnResize : null}
            onCellsChanged={editMode ? handleChanges : null}
            onContextMenu={simpleHandleContextMenu}
            onFocusLocationChanged={handleFocus}
            highlights={highlightOn ? highlight : []}
          />
        )}
      </div>
    );
  };

  const findMedian = () => {
    let cValues = getSelectedColumnData();
    cValues.shift();
    cValues.sort(function (a, b) {
      return a - b;
    });
    var mid = cValues.length / 2;
    return mid % 1 ? cValues[mid - 0.5] : (cValues[mid - 1] + cValues[mid]) / 2;
  };

  const findVariance = () => {
    let cValues = getSelectedColumnData();

    if (!cValues.length) {
      return 0;
    }
    cValues.shift();
    cValues.sort();
    console.log("IMP vals", cValues);
    const sum = cValues.reduce((acc, val) => acc + val);
    const { length: num } = cValues;
    const median = sum / num;
    let variance = 0;
    cValues.forEach((num) => {
      variance += (num - median) * (num - median);
    });
    variance /= num;
    return variance;
  };

  const findMin = () => {
    let cValues = getSelectedColumnData();
    let min = cValues[1];

    for (let i = 2; i < cValues.length; i++) {
      if (cValues[i] < min) {
        min = cValues[i];
      }
    }

    return min;
  };

  const findMax = () => {
    let cValues = getSelectedColumnData();
    let max = cValues[1];

    for (let i = 2; i < cValues.length; i++) {
      if (cValues[i] > max) {
        max = cValues[i];
      }
    }

    return max;
  };

  const findAvg = () => {
    let cValues = getSelectedColumnData();
    cValues.shift();
    // console.log('check cdata', cValues)

    const average = cValues.reduce((acc, v, i, a) => acc + v / a.length, 0);

    return average;
  };

  const findSum = () => {
    let cValues = getSelectedColumnData();
    cValues.shift();
    // console.log('check cdata', cValues)

    const sum = cValues.reduce((a, b) => parseInt(a) + parseInt(b));

    return sum;
  };

  const getSelectedColumnData = () => {
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
    dt?.map((e) => {
      if (e[0]) c1.push(e[0]);
      if (e[1]) c2.push(e[1]);
      if (e[2]) c3.push(e[2]);
      if (e[3]) c4.push(e[3]);
      if (e[4]) c5.push(e[4]);
      if (e[5]) c6.push(e[5]);
      if (e[6]) c7.push(e[6]);
      if (e[7]) c8.push(e[7]);
      if (e[8]) c9.push(e[8]);
      if (e[9]) c10.push(e[9]);
      if (e[10]) c11.push(e[10]);
      if (e[11]) c12.push(e[11]);
      if (e[12]) c13.push(e[12]);
      if (e[13]) c14.push(e[13]);
      if (e[14]) c15.push(e[14]);
      if (e[15]) c16.push(e[15]);
      if (e[16]) c17.push(e[16]);
      if (e[17]) c18.push(e[17]);
      if (e[18]) c19.push(e[18]);
      if (e[19]) c20.push(e[19]);
    });

    let cValues =
      column1 == 0
        ? c1
        : column1 == 1
        ? c2
        : column1 == 2
        ? c3
        : column1 == 3
        ? c4
        : column1 == 4
        ? c5
        : column1 == 5
        ? c6
        : column1 == 6
        ? c7
        : column1 == 7
        ? c8
        : column1 == 8
        ? c9
        : column1 == 9
        ? c10
        : column1 == 10
        ? c11
        : column1 == 11
        ? c12
        : column1 == 12
        ? c13
        : column1 == 13
        ? c14
        : column1 == 14
        ? c15
        : column1 == 15
        ? c16
        : column1 == 16
        ? c17
        : column1 == 17
        ? c18
        : column1 == 18
        ? c19
        : column1 == 19
        ? c20
        : null;
    return cValues;
  };
  const handleShape = () => {
    let arr = updatedData;
    if (aggFunction === 1) {
      let avg = findAvg();
      console.log("Avg?", avg);
      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(avg);
        if (k == 0) arr[k].pop(newFieldName);
      }

      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }
    if (aggFunction === 2) {
      // let count = countDistinct(arr, arr?.length)
      let count = arr?.length;

      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else if (arr[k][column1] != undefined) arr[k].push(count);
        if (k == 0) arr[k].pop(newFieldName);
      }
      // console.log('done--', arr)
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }
    if (aggFunction === 3) {
      let cValues = getSelectedColumnData();

      let count = countDistinct(cValues, cValues?.length);
      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else if (arr[k][column1] != undefined) arr[k].push(count);
        if (k == 0) arr[k].pop(newFieldName);
      }
      // console.log('done--', arr)
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }
    if (aggFunction === 4) {
      let max = findMax();

      for (let k = 0; k < arr.length; k++) {
        // console.log('before', arr[k])
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(max);

        if (k == 0) arr[k].pop(newFieldName);
        // console.log('after', arr[k])
      }
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }
    if (aggFunction === 5) {
      let min = findMin();

      for (let k = 0; k < arr.length; k++) {
        // console.log('before', arr[k])
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(min);

        if (k == 0) arr[k].pop(newFieldName);
        // console.log('after', arr[k])
      }
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }

    if (aggFunction === 7) {
      let sum = findSum();
      console.log("SUM?", sum);

      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(sum);
        if (k == 0) arr[k].pop(newFieldName);
      }
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }

    if (aggFunction === 6) {
      let median = findMedian();
      console.log("median?", median);

      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(median);
        if (k == 0) arr[k].pop(newFieldName);
      }
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }

    if (aggFunction === 8) {
      let variance = findVariance();
      console.log("variance?", variance);

      for (let k = 0, j = 0; k < arr.length; k++) {
        if (k == 0) arr[k].push(newFieldName);
        else arr[k].push(variance);
        if (k == 0) arr[k].pop(newFieldName);
      }
      columns.push(newFieldName);
      convertDataForDisplay(arr);
      setUpDataForGrid2(arr, columns);
    }
  };

  function countDistinct(arr, n) {
    let res = 1;

    // Pick all elements one by one
    for (let i = 1; i < n; i++) {
      let j = 0;
      for (j = 0; j < i; j++) if (arr[i] === arr[j]) break;

      // If not printed earlier, then print it
      if (i === j) res++;
    }
    return res;
  }

  const handleDuplicate = (event) => {
    console.log("I am in dup check 9293u49589308401048201940299019401400200");
    //   console.log('I am in dup ', exceldata) //before on result variable duplicate performed, changed to datasetData
    // console.log('CHECK0', d1)
    // console.log(result)
    // console.log(dt)
    console.log("RESULT2>", result);
    var duplicateIndex = _.findIndex(
      global.type_id === 1 || orignalFile === ""
        ? result
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : result,
      function (value, index, collection) {
        var equal = _.isEqual.bind(undefined, value);
        return _.findIndex(collection.slice(0, index), equal) !== -1;
      }
    );
    if (global.type_id === 1) {
      if (duplicateIndex != -1) result.splice(duplicateIndex, 1);
      console.log("after dup", result);
      setDt(result);
      convertDataForDisplay(result);
      setUpDataForGrid(result);
      result.map((e) => {
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
      // if (IsNumericString == false) setIsNumeric(false)
      // else if (IsNumericString == true) setIsNumeric(true)
    } else if (global.type_id === 2) {
      if (duplicateIndex != -1) exceldata.splice(duplicateIndex, 1);

      let array = exceldata.map((obj) => Object.values(obj));
      exceldata = array;
      console.log("CHECK1", exceldata);
      convertDataForDisplay(exceldata);
      setUpDataForGrid(exceldata);

      // setDt(exceldata)
      exceldata.map((e) => {
        // console.log('EE', e[0], e[1])
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
    } else if (global.type_id === 3) {
      if (duplicateIndex != -1) xmldata.splice(duplicateIndex, 1);
      console.log("CHECK0", xmldata);
      let array = xmldata.map((obj) => Object.values(obj));
      xmldata = array;
      console.log("CHECK1", xmldata);
      setDt(xmldata);
      xmldata.map((e) => {
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
      console.log("CHECK1", xAxis, yAxis);
    } else if (typeId === 6) {
      //console.log('beforeDuplicate', pdfdata)
      if (duplicateIndex != -1) pdfdata.splice(duplicateIndex, 1);
      let array = pdfdata.map((obj) => Object.values(obj));
      pdfdata = array;
      //    console.log('CHECK1', pdfdata)
      setDt(pdfdata);
      pdfdata.map((e) => {
        console.log("Echeck", e[0], e);
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
      console.log("CHECK1", xAxis, yAxis);
    } else if (global.type_id === 7) {
      if (duplicateIndex != -1) parquetdata.splice(duplicateIndex, 1);
      setDt(parquetdata);
      parquetdata.map((e) => {
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
    } else if (global.type_id === 4) {
      console.log("beforeDup", jsondata);
      if (duplicateIndex != -1) jsondata.splice(duplicateIndex, 1);
      setDt(jsondata);
      jsondata.map((e) => {
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
    } else {
      if (global.type_id === "ExampleData") result = exampleData2;

      console.log(
        "checking?",
        global.type_id === "ExampleData",
        global.type_id
      );
      if (duplicateIndex != -1) result.splice(duplicateIndex, 1);
      setDt(result);
      result.map((e) => {
        x.push(e[0]);
        y.push(e[1]);
        z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
      console.log("XYZAxesNumeric-", xaxisNumeric, yaxisNumeric, zaxisNumeric);
    }
    prepareData();

    setDupCheck(duplicateIndex);
  };

  const handleSlice = (event) => {
    console.log("beforeSlice", typeId, updatedData, result);
    if (global.type_id === 1) {
      console.log("Sliced", s, l, typeof l, parseInt(l) + 1);
      let data1 = updatedData;
      data1.shift();
      result = data1.slice(s, parseInt(l) + 1);
      console.log("afterSlice", updatedData, typeId, result);
      setDt(result);
      result.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (global.type_id === 2) {
      exceldata = exceldata.slice(s, l);
      setDt(exceldata);
      exceldata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (global.type_id === 3) {
      console.log("Xmldata", xmldata);
      xmldata = xmldata.slice(s, l);
      setDt(xmldata);
      xmldata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (global.type_id === 6) {
      console.log("pdfdata>", pdfdata);
      pdfdata = pdfdata.slice(s, l);
      setDt(pdfdata);
      pdfdata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (activeStep === 4) {
      result = dt.slice(s, l);
      setDt(result);
      result.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (global.type_id === 7) {
      parquetdata = parquetdata.slice(s, l);
      setDt(parquetdata);
      parquetdata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (global.type_id === 4) {
      jsondata = jsondata.slice(s, l);
      setDt(jsondata);
      jsondata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else {
      if (global.type_id === "ExampleData") result = exampleData2;
      result = result.slice(s, l);
      console.log("Sliced here", result.slice(s, l));
      setDt(result);
      result.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();
      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    }
    console.log("column>", global.type_id, typeId, result, columns);
    result.unshift(columns);
    convertDataForDisplay(result);
    setUpDataForGrid(result);
    prepareData();
    setIsSlice(false);
    setIsDiscrete(false);
    console.log("....");
    // console.log('activestep', activeStep)
    // console.log('activestep', myFlowId)
  };
  const handleStandardization = () => {
    result =
      typeId === (1 || orignalFile === "")
        ? result
        : typeId === 2
        ? exceldata
        : typeId === 3
        ? xmldata
        : typeId === 4
        ? jsondata
        : typeId === 6
        ? pdfdata
        : typeId === 7
        ? parquetdata
        : typeId === "ExampleData"
        ? exampleData2
        : result;

    result.shift();
    const searcher = new FuzzySearch(result, [], {
      caseSensitive: false,
    });
    const res = searcher.search(fuzzyInput);
    setFuzzyCount(res.length);
    result = res;
    result.unshift(columns);
    //  console.log(res)
    setDt(result);
    convertDataForDisplay(result);
    setUpDataForGrid(result);

    result.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
      z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsStandard(false);
  };

  const handleFilter = (event) => {
    column = event.target.value;
    console.log("selectC-", column);
  };

  const filter = () => {
    var dataContainer =
      global.type_id === (1 || orignalFile === "")
        ? result
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === "ExampleData"
        ? exampleData2
        : result;
    var done = false;
    var result4 = [];
    result4.push(dataContainer[(0, 0)]);
    //  console.log(result4)
    while (!done) {
      done = true;
      for (let i = 2; i < dataContainer.length; i += 1) {
        if (condition == 0) {
          if (dataContainer[i - 1][column] === input) {
            result4.push(result[i - 1]);
          }
        }
        if (condition == 1) {
          if (dataContainer[i - 1][column] !== input) {
            result4.push(dataContainer[i - 1]);
          }
        }
        if (condition == 2) {
          if (parseInt(dataContainer[i - 1][column]) === parseInt(input)) {
            result4.push(dataContainer[i - 1]);
          }
        }
        if (condition == 3) {
          if (parseInt(dataContainer[i - 1][column]) > parseInt(input)) {
            result4.push(dataContainer[i - 1]);
          }
        }
        if (condition == 4) {
          if (parseInt(dataContainer[i - 1][column]) >= parseInt(input)) {
            result4.push(dataContainer[i - 1]);
          }
        }
        if (condition == 5) {
          if (parseInt(dataContainer[i - 1][column]) < parseInt(input)) {
            result4.push(dataContainer[i - 1]);
          }
        }
        if (condition == 6) {
          if (parseInt(dataContainer[i - 1][column]) <= parseInt(input)) {
            result4.push(dataContainer[i - 1]);
          }
        }
      }
    }

    console.log("filtered-", result4);
    result = result4;
    convertDataForDisplay(result);
    setUpDataForGrid(result);
    setDt(result4);
    result.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();

    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsFilter(false);
    //converted for displaying data
    // var temp2 = []
    // result4.map(e => {
    //   var temp3 = []
    //   e.map(e2 => {
    //     temp3.push({ value: e2 })
    //     return e2
    //   })
    //   temp2.push(temp3)
    //   return e
    // })
    // console.log('check data---', temp2)
  };

  const handleFilterCondition = (event) => {
    condition = event.target.value;
  };

  const viewAllDatasource = () => {
    console.log(
      "checkk",
      localStorage.getItem("ConnectionId"),
      localStorage.getItem("account_id")
    );
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_datasource_names",
        {
          id: parseInt(localStorage.getItem("ConnectionId")),
          account_id: localStorage.getItem("account_id"),
        },
        {}
      )
      .then((response) => {
        console.log("all datasources api", response.data);

        databases = response.data.data;
        //  console.log('daaaaaa', databases[0].id)
        storeDatasourceResult("e", 2);
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

  const storeDatasourceResult = (event, mode, dataset) => {
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_datasource_result",
        mode === 2
          ? {
              datasource_id: databases[0].id.toString(),
            }
          : {
              datasource_id: event.target.value.toString(),
            },
        {}
      )
      .then((response) => {
        // console.log(' datasource result api', response)
        // console.log(
        //   ' datasource result api',
        //   JSON.parse(response.data.data[0].result)
        // )
        console.log("check ConnID", localStorage.getItem("ConnectionId"));
        const tempArray2 = JSON.parse(response.data.data[0].result);
        // let abc = JSON.parse(response.data.data[0].result)
        let abc =
          localStorage.getItem("ConnectionId") === 91
            ? tempArray2.rows
            : tempArray2;
        let def3 = [],
          array6 = [];
        if (localStorage.getItem("ConnectionId") === 91) {
          // console.log('rowsdata', tempArray2.rows)
          // console.log('MeTA', tempArray2.metaData)

          for (const [value] of Object.entries(tempArray2.metaData)) {
            def3.push(value.name);
          }
          tempArray2.rows.unshift(def3);
          //  console.log('CheckCOLUMNS', def3, tempArray2.rows)
          result = tempArray2.rows;
        } else if (localStorage.getItem("ConnectionId") === 104) {
          const array6 = Object.keys(abc[0]);
          const array7 = abc.map((obj) => Object.values(obj));
          console.log("Columns", array6, array7);
          array7.unshift(array6);
          result = array7;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          //   console.log('DATA..', result)
        } else if (localStorage.getItem("ConnectionId") === 116) {
          const array6 = Object.keys(abc.rows[0]);
          const array7 = abc.rows.map((obj) => Object.values(obj));
          //  console.log('Columns', array6, array7)
          array7.unshift(array6);
          result = array7;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          //   console.log('DATA..', result)
        } else if (localStorage.getItem("ConnectionId") === 118) {
          //    const array6 = Object.keys(abc.rows[0])
          const array7 = abc.map((obj) => Object.values(obj));
          //    console.log('Columns', array6, array7)
          //   array7.unshift(array6)
          result = array7;
          //  console.log('DATA..', result)
        } else if (localStorage.getItem("ConnectionId") === 125) {
          const array6 = Object.keys(abc.pages[0]);
          const array7 = abc.pages.map((obj) => Object.values(obj));
          //   console.log('Columns', array6)
          array7.unshift(array6);
          result = array7;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          // console.log('DATA..', result)
        } else if (localStorage.getItem("ConnectionId") === 129) {
          const array6 = Object.keys(abc.cardTypes[0]);
          // console.log('WHATis this',abc)
          const array7 = abc.cardTypes.map((obj) => Object.values(obj));
          //  console.log('Columns', array6)
          array7.unshift(array6);
          result = array7;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          // console.log('DATA..', result)
        } else if (localStorage.getItem("ConnectionId") == 267) {
          const array6 = Object.keys(abc.rows[0]);
          const array7 = abc.rows.map((obj) => Object.values(obj));
          console.log("Columns%%%", array6, array7);
          array7.unshift(array6);
          result = array7;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          //   console.log('DATA..', result)
        } else {
          console.log("Using Dataset", dataset);
          if (dataset) {
            const array6 = Object.keys(abc[0]);
            const array7 = abc.map((obj) => Object.values(obj));
            //   console.log('Columns', array6, array7)
            array7.unshift(array6);
            result = array7;
            columns = array6;
            columns2 = array6;
            setColumnsBox(array6);
            setColumnsBox2(array6);

            if (dataset === 1) {
              dataset1 = result;
            }

            if (dataset === 2) {
              dataset2 = result;
            }
            console.log("DATA.C.", columns);
          }
        }

        if (localStorage.getItem("ConnectionId") === 91) {
          array6 = def3;
          // else array6 = Object.keys(abc[0])
          // columns2 = array6[0]

          const C1 = array6;
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

  useEffect(() => {
    flag = 0;
    viewAllDatasource();
  }, []);

  const handleMerge = () => {
    //   console.log('datasets?', dataset1, dataset2)
    // let merged = Array.from(new Set(dataset1.concat(dataset2)))
    //       var f1,f2
    // dataset1.map((e1,i)=> {

    //     dataset2.map((e2,j) => {
    //  console.log('F1',i,j)
    // //     f1.map((e3)=> {
    // // e2.push(e3)
    // //     })
    //     })
    // })

    var tdataset2 = dataset2;
    for (var p = 0; p < dataset1.length; p++) {
      dataset1[p].map((e) => {
        tdataset2[p].push(e);
      });
    }
    //console.log('seee?',tdataset2)

    result = tdataset2;

    setDt(result);
    convertDataForDisplay(result);
    setUpDataForGrid(result);

    result.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);

    prepareData();
    setIsMerge(false);
  };

  const handleGroup = (event) => {
    // var column = event.target.value
    //var done = false
    const databox =
      global.type_id === (1 || orignalFile === "")
        ? updatedData
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === "ExampleData"
        ? dt
        : updatedData;

    // console.log('c1>>', column2)
    var newArr = databox.reduce((acc, cur) => {
      // console.log('ooo', acc, cur)
      const idx = acc.findIndex((arr) => arr[0] === cur[column2]);
      if (idx != -1) acc[idx][1] += cur[column];
      else acc.push([cur[column2], cur[column]]);

      return acc;
    }, []);

    let t9 = newArr[0];
    // console.log('t9', t9)
    setColumnsBox2(t9);

    columns = t9;

    newArr = newArr.slice(1, newArr.length);
    newArr.unshift(t9);
    result = newArr;

    setDt(result);
    console.log("Checl dddd", result);
    // convertDataForDisplay(result);
    setUpDataForGrid(result);

    result.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
      z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();

    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);

    setIsGroup(false);
    // console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
  };

  const handleRenameColumn = (event) => {
    setSelectedColumn(event.target.value);
  };

  const rename = () => {
    const databox =
      global.type_id === (1 || orignalFile === "")
        ? updatedData
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === "ExampleData"
        ? exampleData2
        : updatedData;

    databox[(0, 0)][selectedColumn] = newColumnName;
    setColumnsBox2(databox[0]);
    let array5 = databox.map((obj) => Object.values(obj));

    result = array5;
    setDt(array5);
    convertDataForDisplay(array5);
    setUpDataForGrid(array5);

    console.log("renamed", result);
    result.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsRename(false);
  };

  const handleSortAsc = (event) => {
    setSelectedColumn(event.target.value);
    setSelectedCol(event.target.value);
    var tmpBox;
    var Regex = /^[a-zA-Z ]+$/;
    var j = event.target.value;
    //sort
    const databox =
      global.type_id === (1 || orignalFile === "")
        ? updatedData
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === "ExampleData"
        ? exampleData2
        : updatedData;
    console.log(event.target.value);
    var sorted;
    var tmp;
    var done = false;

    // if (flag == 0) {
    tmpBox = databox;
    tmpBox.shift();
    // }

    sorted = tmpBox.sort((a, b) => {
      if (Regex.test(a[j]) && Regex.test(b[j])) {
        if (a[j] && b[j]) return a[j].localeCompare(b[j]);
      } else {
        return parseInt(a[j]) - parseInt(b[j]);
      }
    });

    // if (flag == 0)
    sorted.unshift(columns);
    sorted = databox;
    console.log("sorted-", sorted);
    sorted.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    //converted for displaying data
    var temp2 = [];
    sorted.map((e) => {
      var temp3 = [];
      e.map((e2) => {
        temp3.push({ value: e2 });
        return e2;
      });
      temp2.push(temp3);
      return e;
    });
    console.log(temp2);
    setDt(sorted);
    convertDataForDisplay(sorted);
    setUpDataForGrid(sorted);
    result = sorted;
    prepareData();
    setIssort(false);
    console.log("....");
  };

  const handleSortDesc = (event) => {
    setSelectedColumn(event.target.value);
    setSelectedCol(event.target.value);

    var tmpBox;
    var Regex = /^[a-zA-Z ]+$/;
    var j = event.target.value;
    setSelectedCol(event.target.value);
    //sort
    const databox =
      global.type_id === (1 || orignalFile === "")
        ? updatedData
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === "ExampleData"
        ? exampleData2
        : updatedData;
    console.log(event.target.value);
    var tmp;
    var sorted;
    var done = false;

    // if (flag == 0) {
    tmpBox = databox;
    tmpBox.shift();
    // }
    sorted = tmpBox.sort((a, b) => {
      if (Regex.test(b[j]) && Regex.test(a[j])) {
        if (a[j] && b[j]) return b[j].localeCompare(a[j]);
      } else {
        return parseInt(b[j]) - parseInt(a[j]);
      }
    });

    // if (flag == 0)
    sorted.unshift(columns);

    sorted = databox;
    console.log("sortedDSC-", sorted);
    sorted.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();

    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    //converted for displaying data
    var temp2 = [];
    sorted.map((e) => {
      var temp3 = [];
      e.map((e2) => {
        temp3.push({ value: e2 });
        return e2;
      });
      temp2.push(temp3);
      return e;
    });
    //  console.log(temp2)
    setDt(sorted);
    convertDataForDisplay(sorted);
    setUpDataForGrid(sorted);

    result = sorted;
    prepareData();
    setIssort(false);
    console.log("....");
  };

  const handleSortType = (event) => {
    setSortType(event.target.value);
    setSortType1(event.target.value);

    if (event.target.value == 1) setDesc(true);
    else if (event.target.value == 0) setDesc(false);
    //  sortType = event.target.value
    // console.log('sortt-', sortType)
  };

  const handleReplaceNull = (event) => {
    // console.log(result)
    var p =
      typeId === (1 || orignalFile === "")
        ? updatedData
        : typeId === 2
        ? exceldata
        : typeId === 3
        ? xmldata
        : typeId === 4
        ? jsondata
        : typeId === 6
        ? pdfdata
        : typeId === 7
        ? parquetdata
        : typeId === "ExampleData"
        ? exampleData2
        : updatedData;

    var t2 = [];
    p.map((e) => {
      var t3 = [];
      // console.log('wwww', e)
      e.map((e2) => {
        if (
          e2 === "NULL" ||
          e2 === "" ||
          e2 === " " ||
          e2 === "Null" ||
          e2 === undefined ||
          e2 === null ||
          e2 == undefined ||
          e2 == ""
        ) {
          t3.push(replaceInput);
        } else {
          t3.push(e2);
        }
        return e2;
      });
      t2.push(t3);
      return e;
    });
    console.log(t2);
    console.log("....................");
    convertDataForDisplay(t2);
    setUpDataForGrid(t2);
    setDt(t2);
    result = t2;
    result.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
      z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsReplaceNull(false);
  };

  const checkIncomplete = (event) => {
    setInComplete(false);
    setCheckedColumn(false);
    scolumn = event.target.value;
  };

  const handleCheckIncomplete = (mode) => {
    var databox2;
    setCheckedColumn(true);
    if (typeId === 1) {
      databox2 = updatedData;
      console.log("DATA$?", result);
      setDt(result);
      databox2 = databox2.slice(s, l);
      // console.log('Sliced', result.slice(s, l))

      result.map((e) => {
        console.log("eee?", scolumn, e[scolumn]);
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      result.map((e) => {
        //  console.log('EE?', e)
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      //  console.log('checl xaxis', xAxis)

      xAxis = x;
      yAxis = y;
      zAxis = z;
      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    }

    if (typeId === 2) {
      result = exceldata;
      databox2 = exceldata;
      setDt(exceldata);

      exceldata.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      exceldata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (typeId === 3) {
      console.log("Xmldata", xmldata);
      result = xmldata;
      setDt(xmldata);

      xmldata.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });
      xmldata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (typeId === 6) {
      console.log("pdfdata>", pdfdata);
      result = pdfdata;
      setDt(pdfdata);

      pdfdata.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      pdfdata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (activeStep === 4) {
      setDt(result);

      result.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      result.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (typeId === 7) {
      result = parquetdata;
      setDt(parquetdata);

      parquetdata.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      parquetdata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else if (typeId === 4) {
      result = jsondata;
      setDt(jsondata);

      jsondata.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      jsondata.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    } else {
      if (typeId === "ExampleData") result = exampleData2;
      setDt(result);
      // console.log('Sliced', result.slice(s, l))

      result.map((e) => {
        // console.log('eee?', e[scolumn] === '', e[scolumn])
        if (
          e[scolumn] === "" ||
          e[scolumn] === null ||
          e[scolumn] === " " ||
          e[scolumn] === undefined
        )
          setInComplete(true);
      });

      setDt(result);
      convertDataForDisplay(result);
      setUpDataForGrid(result);

      result.map((e) => {
        if (e[0]) x.push(e[0]);
        if (e[1]) y.push(e[1]);
        if (e[2]) z.push(e[2]);
        return e;
      });
      xAxis = x;
      yAxis = y;
      zAxis = z;

      xbox = xAxis;
      ybox = yAxis;
      zbox = zAxis;
      xbox.shift();
      ybox.shift();
      zbox.shift();

      xaxisNumeric = !xbox.some(isNaN);

      yaxisNumeric = !ybox.some(isNaN);

      zaxisNumeric = !zbox.some(isNaN);
    }

    prepareData();
    setIsCheckComplete(false);
  };

  const caseFormat = (event) => {
    var databox2 = [];
    var databox =
      typeId === (1 || orignalFile === "")
        ? updatedData
        : typeId === 2
        ? exceldata
        : typeId === 3
        ? xmldata
        : typeId === 4
        ? jsondata
        : typeId === 6
        ? pdfdata
        : typeId === 7
        ? parquetdata
        : typeId === "ExampleData"
        ? exampleData2
        : updatedData;
    var tColumns = databox[0];
    var done = false;
    var Regex = /^[a-zA-Z ]+$/;

    while (!done) {
      let t = undefined;
      done = true;
      for (let i = 1; i < databox.length; i += 1) {
        var tempBox = [];
        // console.log('C---', databox[i])
        databox[i].forEach((e) => {
          if (Regex.test(e)) {
            if (e != null) {
              if (case1 == 0) t = e.toLowerCase();
              else t = e.toUpperCase();
              tempBox.push(t);
            }
          } else {
            tempBox.push(e);
          }
        });
        databox2.push(tempBox);
      }
    }
    databox2.unshift(tColumns);
    result = databox2;
    setDt(result);
    convertDataForDisplay(result);
    setUpDataForGrid(result);
    console.log("Format", result);

    result.map((e) => {
      if (e[0]) x.push(e[0]);
      if (e[1]) y.push(e[1]);
      if (e[2]) z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();

    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsCaseFormat(false);
  };

  const handleCaseType = (event) => {
    setCase(event.target.value);
  };

  const handleFuzzySearch = (event) => {
    console.log("I am in Fuzzy Search 177283892918180", typeId, updatedData);
    console.log(fuzzyInput);
    result =
      typeId === (1 || orignalFile === "")
        ? updatedData
        : typeId === 2
        ? exceldata
        : typeId === 3
        ? xmldata
        : typeId === 4
        ? jsondata
        : typeId === 6
        ? pdfdata
        : typeId === 7
        ? parquetdata
        : typeId === "ExampleData"
        ? exampleData2
        : updatedData;
    result.shift();
    const searcher = new FuzzySearch(result, [], {
      caseSensitive: false,
    });
    const res = searcher.search(fuzzyInput);
    setFuzzyCount(res.length);
    result = res;
    //  console.log(res)
    result.unshift(columns);
    setDt(result);
    convertDataForDisplay(result);
    setUpDataForGrid(result);
    result.map((e) => {
      x.push(e[0]);
      y.push(e[1]);
      z.push(e[2]);
      return e;
    });
    xAxis = x;
    yAxis = y;
    zAxis = z;

    xbox = xAxis;
    ybox = yAxis;
    zbox = zAxis;
    xbox.shift();
    ybox.shift();
    zbox.shift();
    xaxisNumeric = !xbox.some(isNaN);

    yaxisNumeric = !ybox.some(isNaN);

    zaxisNumeric = !zbox.some(isNaN);
    prepareData();
    setIsFuzzySearch(false);
  };
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          {newpg1 === true ? (
            <>
              <StyleRoot>
                <div style={styles.fadeIn}>
                  <div
                    style={{
                      paddingLeft: "8%",
                      marginTop: "-65px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h2
                      style={{
                        alignSelf: "flex-start",
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Choose Data Source
                    </h2>
                    <p style={{ textAlign: "left" }}>
                      Create a flow to Ingest, transform and visualize your
                      data.
                    </p>
                    <div
                      style={{
                        height: "70px",
                        width: "97%",
                        backgroundColor: "#C1D9EC",
                        display: "flex",
                        alignSelf: "center",
                        borderRadius: "20px",
                        marginLeft: "-4%",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="FLow Name"
                        style={{
                          background: "rgba(255, 255, 255, 0.94)",
                          border: "0.7px solid rgba(0, 0, 0, 0.8)",
                          borderRadius: "16.2547px",
                          width: "20%",
                          height: "46px",
                          textAlign: "left",
                          paddingLeft: "16px",
                          marginLeft: "20px",
                          color: "#404040",
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                          top: "30px",
                        }}
                        value={flowName}
                        onChange={(e) => {
                          console.log("changed??");
                          setFlowName(e.target.value);
                          // console.log('wow', /^[A-Z]{2}\d{7}$/.test(e.target.value))
                          setError("");
                          setNoFlowName(false);
                        }}
                      />

                      {error && <Alert severity="error">{error}</Alert>}
                      {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <Alert
                      style={{
                        margin: 10,
                        height: 40,
                        alignItems: "center",
                        fontFamily: "Trebuchet MS",
                      }}
                      severity={"error"}
                    >
                      {alertType === 1
                        ? "Please enter widget title"
                        : alertType === 2
                        ? "Flow name must not contain special characters except hyphen and underscore"
                        : alertType === 3
                        ? "Flow name must be less than 128 characters"
                        : alertType === 4
                        ? "Description must be less than 256 characters"
                        : ""}
                    </Alert>

                    <DialogActions>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                  </Dialog> */}

                      <input
                        type="text"
                        placeholder="Description(optional)"
                        style={{
                          background: "rgba(255, 255, 255, 0.94)",
                          border: "0.7px solid rgba(0, 0, 0, 0.8)",
                          borderRadius: "16.2547px",
                          width: "60%",
                          height: "46px",
                          marginLeft: "120px",
                          textAlign: "left",
                          paddingLeft: "16px",
                          color: "#404040",
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                          top: "30px",
                        }}
                        onChange={(e) => {
                          console.log("changed??");
                          setFlowDescription(e.target.value);
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginTop: "26px",
                        alignSelf: "center",
                        width: "95%",
                      }}
                    >
                      <div
                        style={{
                          marginRight: "10px",
                          textAlign: "left",
                          marginLeft: "-18px",
                        }}
                      >
                        Data sources can be a variety of things, including
                        databases, files, and web services. The ingested data
                        can be structured or unstructured. The data can be
                        processed and analyzed to extract insights.
                      </div>
                      <div style={{ display: "flex", marginRight: "10px" }}>
                        {/* <CSVReader
                      ref={buttonRef}
                      onFileLoad={handleOnFileLoad}
                      onError={handleOnError}
                      noClick
                      noDrag
                      onRemoveFile={handleRemoveFile}
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
                          <button
                            style={{
                              background: '#0aafff',
                              border: '0.839161px solid #DEC7C7',
                              width: '95px',
                              color: 'white',
                              fontWeight: '600',
                              height: '40px',
                              marginRight: '10px',
                              boxShadow:
                                '(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              padding: 8,
                              fontSize: '14px'
                            }}
                            onClick={e => {
                              if (flowName.trim() === '') {
                                setError('Please enter flow name.')
                                return
                              } else {
                                handleOpenDialog(e)
                              }
                            }}
                            // onClick={() => setnewpg1(false)}
                          >
                            UPLOAD
                          </button>
                          <div
                            style={{
                              height: 45,
                              overflow: 'hidden',
                              lineHeight: 2.5,
                              marginTop: 35,
                              marginBottom: 5,
                              paddingLeft: 13,
                              paddingTop: 3,
                              width: '90%'
                            }}
                          >
                            {file ? file.name : ''}
                          </div>
                        </div>
                      )}
                    </CSVReader> */}
                      </div>
                    </div>
                    <ImportDataset
                      subscription_id={global.subscription_id}
                      fromFlow={true}
                      getFileData={getFileData}
                      getDatasetData={getDatasetData}
                    />
                  </div>
                </div>
              </StyleRoot>
            </>
          ) : newpg2 === true ? (
            <StyleRoot>
              <div style={styles.fadeIn}>
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "-100px",
                    }}
                  >
                    <h2
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: "8%",
                      }}
                    >
                      Transform Data
                    </h2>
                    <div
                      style={{
                        alignSelf: "flex-start",
                        marginLeft: "8%",
                        fontWeight: "400",
                        marginTop: "5px",
                      }}
                    >
                      Create a flow to Ingest, transform and visualize your
                      data.
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "8%",
                      marginTop: "2%",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          backgroundColor: "#0aafff",
                          width: "8vw",
                          padding: 5,
                          color: "white",
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleNext();
                          setnewpg2(false);
                        }}
                      >
                        Next
                      </div>
                      {/* <div
                    style={{
                      backgroundColor: "#0aafff",
                      marginTop: "15px",
                      backgroundColor: "#0aafff",
                      width: "8vw",
                      padding: 5,
                      color: "white",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      console.log("backupDATA>", dataBackup);
                      setUpDataForGrid(dataBackup);
                    }}
                  >
                    Reset
                  </div> */}
                      {/* <div
                  style={{
                    marginTop: '8px',
                    border: '2.45429px solid #0aafff',
                    width: '8vw',
                    padding: 5,
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </div> */}
                    </div>
                    <div
                      style={{
                        border: "3.45429px solid #067ab4",
                        height: 90,
                        width: "85%",
                        borderRadius: "13px",
                        marginLeft: "3%",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "90%",
                        }}
                      >
                        <div
                          style={{ marginLeft: "2%", cursor: "pointer" }}
                          onClick={() => setclickedShape(!clickedShape)}
                        >
                          <div
                            style={{
                              backgroundColor: "#C1D9EC",
                              borderRadius: "58px",
                              height: "32px",
                            }}
                          >
                            {!clickedShape && (
                              <ModeEditIcon
                                fontSize="small"
                                sx={{ color: "#0aafff" }}
                              />
                            )}
                          </div>

                          <div
                            style={{
                              backgroundColor: "#067ab4",
                              borderRadius: "0px 0px 58px 58px",
                            }}
                          >
                            <div
                              style={{
                                color: "white",
                                height: "32px",
                                fontSize: "13px",
                                padding: "6px",
                                position: "relative",
                                top: -5,
                              }}
                            >
                              Shape
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "1%",
                            }}
                          >
                            <div
                              style={{
                                // borderRadius: "4px",
                                // borderImageSource:
                                //   "linear-gradient(to left, #00C853, #B2FF59)",
                                // border: "4px solid",
                                // borderImageSlice: "1",
                                // borderWidth: "5px",
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsFilter(true)}
                            >
                              Filter
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsMerge(true)}
                            >
                              Merge
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsGroup(true)}
                            >
                              Group
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsSlice(true)}
                            >
                              Slice
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIssort(true)}
                            >
                              Sort
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsRename(true)}
                            >
                              Rename Column
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDuplicate()}
                            >
                              Duplicate
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsFuzzySearch(true)}
                            >
                              Fuzzy Search
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",
                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsStandard(true)}
                            >
                              Standardization
                            </div>

                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsReplaceNull(true)}
                            >
                              Replace Null
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsCheckComplete(true)}
                            >
                              Incomplete
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => console.log("formated")}
                            >
                              Formatted
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "100%",
                              width: "10%",
                              marginLeft: "2%",
                            }}
                          >
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsCaseFormat(true)}
                            >
                              Case Format
                            </div>
                            <div
                              style={{
                                borderWidth: "4px",
                                borderStyle: "solid",
                                borderImage:
                                  "linear-gradient(to bottom, #067ab4,#C1D9EC) 1",

                                borderRadius: "50em",
                                width: "100px",
                                height: "30px",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsDiscrete(true)}
                            >
                              Discrete Range
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#0aafff",
                            marginTop: "5px",
                            color: "white",
                            padding: "8px",
                            border: "4.03497px solid #067ab4",
                            borderRadius: "12px",
                            marginBottom: "2px",
                            marginLeft: "10px",
                            marginRight: "8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          Query Edit
                        </div>
                      </div>
                      <div
                        style={{
                          color: "#4D4D4D",
                          height: "32px",
                          fontSize: "12px",
                          padding: "5px",
                          position: "absolute",
                          left: "70%",
                          top: "90%",
                          width: "100px",
                          border: "2.4px solid #0aafff",
                          borderRadius: "15px",
                          backgroundColor: "white",
                        }}
                      >
                        Column
                      </div>
                    </div>
                  </div>

                  {clickedShape && (
                    <div
                      style={{
                        marginLeft: "8%",
                        height: "35vh",
                        width: "88vw",
                        marginTop: "1%",
                        marginBottom: "1%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#C7EDEF",
                          height: "28vh",
                          width: "88vw",
                          marginTop: "1%",
                          marginBottom: "1%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            backgroundColor: "#CCC",
                            width: "100%",
                            height: "30px",
                          }}
                        >
                          <div
                            style={{
                              color: "white",
                              backgroundColor: "#2a5b84",
                              width: "120px",
                              height: "30px",
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Shapes Using
                          </div>
                          {/* <ToggleButtonGroup
                        sx={{ backgroundColor: 'white' }}
                        color='primary'
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label='Platform'
                      >
                        <ToggleButton value='Slice'>Slice</ToggleButton>
                        <ToggleButton value='Deduplicate'>
                          Deduplicate
                        </ToggleButton>
                        <ToggleButton value='Group By'>Group By</ToggleButton>
                      </ToggleButtonGroup> */}
                        </div>
                      </div>

                      {/* <div
                    style={{
                      marginTop: '-17%',
                      width: '90%',
                      marginLeft: '1%',
                      zIndex: 100
                    }}
                  >
                    <div
                      style={{
                        marginTop: 2,
                        marginBottom: 5,
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {'COLUMNS (EXISTIING)'}
                    </div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      styles={colourStyles}
                      isMulti
                    />
                  </div> */}

                      <div
                        style={{
                          marginTop: 10,
                          display: "flex",
                          alignItems: "center",
                          marginTop: "-12%",
                          width: "90%",
                          marginLeft: "1%",
                          zIndex: 100,
                        }}
                      >
                        <div>
                          <Box
                            sx={{
                              maxHeight: 20,
                              marginLeft: 2,
                            }}
                          >
                            <FormControl style={{ width: "35vw" }} size="small">
                              <InputLabel
                                id="demo-simple-select-label"
                                style={{ fontSize: "14px", fontWeight: "500" }}
                              >
                                {"COLUMNS (AGGREGATES)"}
                              </InputLabel>
                              <Select2
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={aggFunction}
                                label="COLUMNS (AGGREGATES)"
                                size="small"
                                onChange={(e) => {
                                  setAggFunction(e.target.value);
                                }}
                              >
                                <MenuItem value={1}>Average</MenuItem>
                                <MenuItem value={2}>Count</MenuItem>
                                <MenuItem value={3}>Count Distinct</MenuItem>
                                {/* <MenuItem value={4}>First</MenuItem>
                      <MenuItem value={5}>Last</MenuItem> */}
                                <MenuItem value={4}>Max</MenuItem>
                                <MenuItem value={5}>Min</MenuItem>
                                <MenuItem value={6}>Median</MenuItem>
                                <MenuItem value={7}>Sum</MenuItem>
                                <MenuItem value={8}>Variance</MenuItem>
                              </Select2>
                            </FormControl>
                          </Box>
                        </div>
                        <div
                          style={{
                            marginLeft: 40,
                            marginTop: 18,
                            marginRight: 10,
                          }}
                        >
                          of
                        </div>
                        <div>
                          <Box
                            sx={{
                              maxHeight: 20,
                              marginLeft: 2,
                            }}
                          >
                            <FormControl style={{ width: 200 }} size="small">
                              <InputLabel labelId="demo-simple-select-label">
                                Columns
                              </InputLabel>
                              <Select2
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={column1}
                                label="Columns"
                                size="small"
                                onChange={(e) => setColumn1(e.target.value)}
                              >
                                {columns?.map((item, index) => (
                                  <MenuItem value={index}>{item}</MenuItem>
                                ))}
                              </Select2>
                            </FormControl>
                          </Box>
                        </div>

                        <div
                          style={{
                            marginLeft: 15,
                            marginTop: 15,
                            marginRight: 13,
                          }}
                        >
                          as
                        </div>

                        <TextField
                          style={{ width: "20vw" }}
                          id="standard-basic"
                          label="Name"
                          variant="standard"
                          value={newFieldName}
                          onChange={(e) => setNewFieldName(e.target.value)}
                        />
                      </div>

                      <div
                        style={{
                          width: "65px",
                          height: "34px",
                          padding: 5,
                          backgroundColor: "#fdf6c5",
                          borderRadius: "12px",
                          marginTop: "13px",
                          cursor: "pointer",
                          marginLeft: "80%",
                          fontSize: "16px",
                          color: "#0aafff",
                        }}
                        onClick={() => {
                          handleShape();
                        }}
                      >
                        Apply
                      </div>
                    </div>
                  )}
                  <div>
                    {dupCheck !== 0 && dupCheck !== -1 ? (
                      <p
                        style={{
                          marginLeft: 10,
                          marginBottom: 0,
                          top: 15,
                          position: "relative",
                        }}
                      >
                        {"Duplicate found at row number - " +
                          (dupCheck + 1) +
                          "\n and removed"}
                      </p>
                    ) : (
                      dupCheck === -1 && (
                        <p
                          style={{
                            marginLeft: 10,
                            marginBottom: 0,
                            top: 15,
                            position: "relative",
                          }}
                        >
                          {"No Duplicates found"}
                        </p>
                      )
                    )}

                    <div
                      style={{
                        width: "86vw",
                        marginLeft: "9%",
                        marginTop: "5%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* <DataGrid
                  rows={rowsData}
                  columns={columnData}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10]}
                /> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          alignSelf: "flex-end",
                          marginRight: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "450px",
                            // marginTop: '18px',
                            marginLeft: "16%",
                          }}
                        >
                          <Tooltip title="Edit Mode">
                            <div
                              style={{
                                backgroundColor: editMode
                                  ? "#067AB4"
                                  : "#C1D9EC",
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
                              onClick={() =>
                                setColumnSelection(!columnSelection)
                              }
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
                                backgroundColor: fillHandle
                                  ? "#067AB4"
                                  : "#C1D9EC",
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
                      </div>
                      <MyComponent />
                    </div>
                  </div>
                </>
              </div>
            </StyleRoot>
          ) : newpg3 === true ? (
            <StyleRoot>
              <div style={styles.fadeIn}>
                <>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingLeft: "100px",
                      marginTop: "-90px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          textAlign: "left",
                          // fontWeight: 'bold',
                          fontFamily: "Trebuchet MS",
                        }}
                      >
                        SELECT VISUALS
                      </h2>
                      <div>
                        Create a flow to Ingest, transform and visualize your
                        data.
                      </div>
                    </div>
                    <div style={{ display: "flex", marginRight: "12px" }}>
                      <button
                        style={{
                          background: "#0aafff",
                          border: "0.839161px solid #DEC7C7",
                          width: "90px",
                          color: "white",
                          fontWeight: "bold",
                          height: "40px",
                          marginRight: "25px",
                          boxShadow:
                            "(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleNext();
                          setnewpg3(false);
                        }}
                      >
                        NEXT
                      </button>
                      {/* <button
                    style={{
                      background: "white",
                      border: "0.839161px solid #DEC7C7",
                      width: "90px",
                      color: "#0aafff",
                      fontWeight: "bold",
                      height: "40px",
                      boxShadow:
                        "(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))",
                      borderRadius: "6px",
                    }}
                  >
                    BACK
                  </button> */}
                    </div>
                  </div>
                  <div style={{ display: "flex", paddingLeft: "100px" }}>
                    {activeStep === 0 ? (
                      <div
                        ref={(_subtitle) => (subtitle = _subtitle)}
                        style={{ paddingLeft: "100px" }}
                      >
                        <h2
                          style={{
                            color: "#0c0c0c",
                            marginLeft: 7,
                            fontFamily: "Trebuchet MS",
                          }}
                        >
                          Block Library - Input
                        </h2>
                      </div>
                    ) : activeStep === 1 ? (
                      <div
                        ref={(_subtitle) => (subtitle = _subtitle)}
                        style={{ paddingLeft: "100px" }}
                      >
                        <h2
                          style={{
                            color: "#0c0c0c",
                            fontFamily: "Trebuchet MS",
                          }}
                        >
                          Block Library - Transform
                        </h2>
                      </div>
                    ) : activeStep === 2 ? (
                      <div
                        ref={(_subtitle) => (subtitle = _subtitle)}
                        style={{ paddingLeft: "100px" }}
                      ></div>
                    ) : (
                      <div
                        ref={(_subtitle) => (subtitle = _subtitle)}
                        style={{ textAlign: "left" }}
                      >
                        <h2
                          ref={(_subtitle) => (subtitle = _subtitle)}
                          style={{
                            color: "#0c0c0c",
                            fontFamily: "Trebuchet MS",
                          }}
                        >
                          Block Library - Statistics & Export
                        </h2>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "30px",
                      width: "100%",
                      display: "inline-block",
                      paddingLeft: "100px",
                      color: "#FFF",
                      verticalAlign: "top",
                      overflow: "scroll",
                    }}
                  >
                    {activeStep === 2 && (
                      <h3
                        style={{
                          color: "#0c0c0c",
                          fontFamily: "Trebuchet MS",
                          textAlign: "left",
                        }}
                      >
                        Scatter Plots
                      </h3>
                    )}
                    <div
                      style={{
                        backgroundColor: "#C1D9EC",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        width: "100%",
                        height: "100%",
                        padding: 5,
                        zIndex: 2,
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          margin: "10px",
                          marginBottom: "20px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          zIndex: 20,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            width: "100%",
                          }}
                        >
                          {activeStep === 0
                            ? inputOptionsBox &&
                              inputOptionsBox.map((row, index) => (
                                <div
                                  onClick={row.onpress}
                                  style={{
                                    padding: "10px",
                                    width: "47%",
                                    // height: 125,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    margin: 10,
                                    borderRadius: 5,
                                    boxShadow: "2px 3px 3px #707070",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      paddingTop: "20px",
                                    }}
                                  >
                                    <img
                                      src={row.img}
                                      style={{
                                        display: "block",
                                        marginLeft: 10,
                                        marginRight: 12,
                                        height: "10px",
                                      }}
                                      // height={95}
                                      width={"auto"}
                                      alt={""}
                                    />

                                    <div>
                                      <div
                                        style={{
                                          marginTop: -5,
                                          color: "#0BAFFF",
                                          fontFamily: "Trebuchet MS",
                                          fontSize: 45,
                                          // fontWeight: 'bold'
                                        }}
                                      >
                                        {row.title}
                                      </div>

                                      <p
                                        style={{
                                          marginTop: 1,
                                          color: "aliceblue",
                                          fontSize: 12,
                                          flexWrap: "wrap",
                                          // height: 30,
                                        }}
                                      >
                                        {row.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : activeStep === 1
                            ? transformOptions.section1.map((row, index) => (
                                <div
                                  onClick={row.onpress}
                                  style={{
                                    padding: "10px",
                                    width: "47%",
                                    height: 125,
                                    background: "red",
                                    display: "inline-block",
                                    marginRight: 10,
                                    margin: 10,
                                    borderRadius: 5,
                                    boxShadow: "2px 3px 3px #707070",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      paddingTop: "20px",
                                    }}
                                  >
                                    <img
                                      src={row.img}
                                      style={{
                                        display: "block",
                                        marginLeft: 10,
                                        marginRight: 12,
                                      }}
                                      height={95}
                                      width={"auto"}
                                      alt={""}
                                    />

                                    <div>
                                      <div
                                        style={{
                                          marginTop: -5,
                                          color: "green",
                                          fontFamily: "Trebuchet MS",
                                          fontSize: 45,
                                          // fontWeight: 'bold'
                                        }}
                                      >
                                        {row.title}
                                      </div>

                                      <p
                                        style={{
                                          marginTop: 1,
                                          // color: "blue",
                                          fontSize: 12,
                                          flexWrap: "wrap",
                                          height: 30,
                                        }}
                                      >
                                        {row.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : activeStep === 2
                            ? visualizationOptions.section1.map((row, id) => (
                                <div
                                  onClick={() => {
                                    row.onpress();
                                    showfixborder(row, row.id);
                                  }}
                                  onMouseEnter={() => showborder(row.id)}
                                  onMouseLeave={() => removeborder(row.id)}
                                  style={{
                                    height: "260px",
                                    width: "22%",
                                    display: "inline-block",
                                    border:
                                      myborder === row.id &&
                                      !mynode.includes(row.id)
                                        ? "1px solid #0aafff"
                                        : mynode.includes(row.id)
                                        ? "4px solid #0D4669"
                                        : "0.5px solid #ccc",
                                    margin: 5,
                                    position: "relative",
                                    cursor: "pointer",
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                      fontFamily: "Trebuchet MS",
                                      borderTopLeftRadius: "12px",
                                      borderTopRightRadius: "12px",
                                      background: "#067AB4",
                                      height: 25,
                                      position: "relative",
                                      fontSize: "13px",
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <div
                                    style={{
                                      marginTop: "20px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={row.img}
                                      style={{
                                        resizeMode: "cover",
                                        height: "200px",
                                        width: "90%",
                                      }}
                                      alt={""}
                                    />
                                  </div>
                                </div>
                                // </div>
                              ))
                            : activeStep === 3
                            ? miscOptions.section1.map((row, index) => (
                                <div
                                  onClick={row.onpress}
                                  style={{
                                    padding: "10px",
                                    width: "47%",
                                    height: 220,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    margin: 10,
                                    borderRadius: 5,
                                    boxShadow: "2px 3px 3px #707070",
                                    cursor: "pointer",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <img
                                      src={row.img}
                                      style={{
                                        display: "block",
                                        marginLeft: 10,
                                        marginRight: 12,
                                      }}
                                      height={"100%"}
                                      width={"auto"}
                                      alt={""}
                                    />

                                    <div>
                                      <div
                                        style={{
                                          marginTop: -5,
                                          color: "#0BAFFF",
                                          fontFamily: "Trebuchet MS",
                                          fontSize: 45,
                                          // fontWeight: 'bold'
                                        }}
                                      >
                                        {row.title}
                                      </div>

                                      <p
                                        style={{
                                          marginTop: 1,
                                          color: "#FFF",
                                          fontSize: 12,
                                          flexWrap: "wrap",
                                          // height: 30,
                                        }}
                                      >
                                        {row.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </div>
                    {/* hhhhh */}
                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {activeStep === 0
                        ? null
                        : activeStep === 1
                        ? transformOptions.section2.map((row, id) => (
                            <div
                              onClick={row.onpress}
                              style={{
                                padding: "10px",
                                width: "47%",
                                height: 125,
                                background: "#A9A9A9",
                                display: "inline-block",
                                marginRight: 10,
                                margin: 10,
                                borderRadius: 5,
                                boxShadow: "2px 3px 3px #707070",
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={row.img}
                                  style={{
                                    display: "block",
                                    marginLeft: 10,
                                    marginRight: 12,
                                  }}
                                  height={95}
                                  width={"auto"}
                                  alt={""}
                                />

                                <div>
                                  <div
                                    style={{
                                      marginTop: -5,
                                      color: "#0BAFFF",
                                      fontFamily: "Trebuchet MS",
                                      fontSize: 45,
                                      // fontWeight: 'bold'
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <p
                                    style={{
                                      marginTop: 1,
                                      color: "#FFF",
                                      fontSize: 12,
                                      flexWrap: "wrap",
                                      height: 30,
                                    }}
                                  >
                                    {row.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    {activeStep === 2 && (
                      <h3
                        style={{
                          color: "#0c0c0c",
                          fontFamily: "Trebuchet MS",
                          textAlign: "left",
                        }}
                      >
                        Line Charts
                      </h3>
                    )}
                    <div
                      style={{
                        backgroundColor: "#C1D9EC",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        width: "100%",
                        height: "100%",
                        padding: 5,
                        zIndex: 2,
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          marginLeft: "8px",
                          display: "flex",
                          flexWrap: "wrap",
                          margin: "10px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          zIndex: 20,
                          justifyContent: "space-around",
                          backgroundColor: "white",
                        }}
                      >
                        {activeStep === 1
                          ? transformOptions.section3.map((row, id) => (
                              <div
                                onClick={row.onpress}
                                style={{
                                  padding: "10px",
                                  width: "47%",
                                  height: 125,
                                  background: "white",
                                  display: "inline-block",
                                  marginRight: 10,
                                  margin: 10,
                                  borderRadius: 5,
                                  boxShadow: "2px 3px 3px #707070",
                                  cursor: "pointer",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <img
                                    src={row.img}
                                    style={{
                                      display: "block",
                                      marginLeft: 10,
                                      marginRight: 12,
                                    }}
                                    height={95}
                                    width={"auto"}
                                    alt={""}
                                  />

                                  <div>
                                    <div
                                      style={{
                                        marginTop: -5,
                                        color: "#0BAFFF",
                                        fontFamily: "Trebuchet MS",
                                        fontSize: 45,
                                        // fontWeight: 'bold'
                                      }}
                                    >
                                      {row.title}
                                    </div>

                                    <p
                                      style={{
                                        marginTop: 1,
                                        color: "#FFF",
                                        fontSize: 12,
                                        flexWrap: "wrap",
                                        // height: 30,
                                      }}
                                    >
                                      {row.subtitle}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))
                          : activeStep === 2
                          ? visualizationOptions.section3.map((row, id) => (
                              <div
                                onClick={() => {
                                  row.onpress();
                                  showfixborder(row, row.id);
                                }}
                                onMouseEnter={() => showborder(row.id)}
                                onMouseLeave={() => removeborder(row.id)}
                                style={{
                                  height: "260px",
                                  width: "22%",
                                  display: "inline-block",
                                  border:
                                    myborder === row.id &&
                                    !mynode.includes(row.id)
                                      ? "1px solid #0aafff"
                                      : mynode.includes(row.id)
                                      ? "4px solid #0D4669"
                                      : "0.5px solid #ccc",
                                  margin: 5,
                                  position: "relative",
                                  cursor: "pointer",
                                  borderTopLeftRadius: "16px",
                                  borderTopRightRadius: "16px",
                                  boxShadow:
                                    "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                }}
                              >
                                <div
                                  style={{
                                    color: "white",
                                    fontWeight: "500",
                                    fontFamily: "Trebuchet MS",
                                    borderTopLeftRadius: "12px",
                                    borderTopRightRadius: "12px",
                                    background: "#067AB4",
                                    height: 25,
                                    position: "relative",
                                    fontSize: "13px",
                                  }}
                                >
                                  {row.title}
                                </div>

                                <div
                                  style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={row.img}
                                    style={{
                                      resizeMode: "cover",
                                      height: "200px",
                                      width: "90%",
                                    }}
                                    alt={""}
                                  />
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {activeStep === 1
                        ? transformOptions.section4.map((row, id) => (
                            <div
                              onClick={row.onpress}
                              style={{
                                padding: "10px",
                                width: "47%",
                                height: 125,
                                background: "#A9A9A9",
                                display: "inline-block",
                                marginRight: 10,
                                margin: 10,
                                borderRadius: 5,
                                boxShadow: "2px 3px 3px #707070",
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={row.img}
                                  style={{
                                    display: "block",
                                    marginLeft: 10,
                                    marginRight: 12,
                                  }}
                                  height={95}
                                  width={"auto"}
                                  alt={""}
                                />

                                <div>
                                  <div
                                    style={{
                                      marginTop: -5,
                                      color: "#0BAFFF",
                                      fontFamily: "Trebuchet MS",
                                      fontSize: 45,
                                      // fontWeight: 'bold'
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <p
                                    style={{
                                      marginTop: 1,
                                      color: "#FFF",
                                      fontSize: 12,
                                      flexWrap: "wrap",
                                      height: 30,
                                    }}
                                  >
                                    {row.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {activeStep === 1
                        ? transformOptions.section5.map((row, id) => (
                            <div
                              onClick={row.onpress}
                              style={{
                                padding: "10px",
                                width: "47%",
                                height: 125,
                                background: "#A9A9A9",
                                display: "inline-block",
                                marginRight: 10,
                                margin: 10,
                                borderRadius: 5,
                                boxShadow: "2px 3px 3px #707070",
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={row.img}
                                  style={{
                                    display: "block",
                                    marginLeft: 10,
                                    marginRight: 12,
                                  }}
                                  height={95}
                                  width={"auto"}
                                  alt={""}
                                />

                                <div>
                                  <div
                                    style={{
                                      marginTop: -5,
                                      color: "#0BAFFF",
                                      fontFamily: "Trebuchet MS",
                                      fontSize: 45,
                                      // fontWeight: 'bold'
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <p
                                    style={{
                                      marginTop: 1,
                                      color: "#FFF",
                                      fontSize: 12,
                                      flexWrap: "wrap",
                                      height: 30,
                                    }}
                                  >
                                    {row.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {activeStep === 1
                        ? transformOptions.section6.map((row, id) => (
                            <div
                              onClick={row.onpress}
                              style={{
                                padding: "10px",
                                width: "47%",
                                height: 125,
                                background: "#A9A9A9",
                                display: "inline-block",
                                marginRight: 10,
                                margin: 10,
                                borderRadius: 5,
                                boxShadow: "2px 3px 3px #707070",
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={row.img}
                                  style={{
                                    display: "block",
                                    marginLeft: 10,
                                    marginRight: 12,
                                  }}
                                  height={95}
                                  width={"auto"}
                                  alt={""}
                                />

                                <div>
                                  <div
                                    style={{
                                      marginTop: -5,
                                      color: "#0BAFFF",
                                      fontFamily: "Trebuchet MS",
                                      fontSize: 45,
                                      // fontWeight: 'bold'
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <p
                                    style={{
                                      marginTop: 1,
                                      color: "#FFF",
                                      fontSize: 12,
                                      flexWrap: "wrap",
                                      height: 30,
                                    }}
                                  >
                                    {row.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {activeStep === 1
                        ? transformOptions.section7.map((row, id) => (
                            <div
                              onClick={row.onpress}
                              style={{
                                padding: "10px",
                                width: "47%",
                                height: 125,
                                background: "#A9A9A9",
                                display: "inline-block",
                                marginRight: 10,
                                margin: 10,
                                borderRadius: 5,
                                boxShadow: "2px 3px 3px #707070",
                                cursor: "pointer",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={row.img}
                                  style={{
                                    display: "block",
                                    marginLeft: 10,
                                    marginRight: 12,
                                  }}
                                  height={95}
                                  width={"auto"}
                                  alt={""}
                                />

                                <div>
                                  <div
                                    style={{
                                      marginTop: -5,
                                      color: "#0BAFFF",
                                      fontFamily: "Trebuchet MS",
                                      fontSize: 45,
                                      // fontWeight: 'bold'
                                    }}
                                  >
                                    {row.title}
                                  </div>

                                  <p
                                    style={{
                                      marginTop: 1,
                                      color: "#FFF",
                                      fontSize: 12,
                                      flexWrap: "wrap",
                                      height: 30,
                                    }}
                                  >
                                    {row.subtitle}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    {activeStep === 2 && (
                      <h3
                        style={{
                          color: "#0c0c0c",
                          fontFamily: "Trebuchet MS",
                          textAlign: "left",
                          marginLeft: "10px",
                        }}
                      >
                        Bar Charts
                      </h3>
                    )}
                    <div>
                      <div>
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section5.map((row, id) => (
                                  <div
                                    onClick={() => {
                                      row.onpress();
                                      showfixborder(row, row.id);
                                    }}
                                    onMouseEnter={() => showborder(row.id)}
                                    onMouseLeave={() => removeborder(row.id)}
                                    style={{
                                      height: "260px",
                                      width: "22%",
                                      display: "inline-block",
                                      border:
                                        myborder === row.id &&
                                        !mynode.includes(row.id)
                                          ? "1px solid #0aafff"
                                          : mynode.includes(row.id)
                                          ? "4px solid #0D4669"
                                          : "0.5px solid #ccc",
                                      margin: 5,
                                      position: "relative",
                                      cursor: "pointer",
                                      borderTopLeftRadius: "16px",
                                      borderTopRightRadius: "16px",
                                      boxShadow:
                                        "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        color: "white",
                                        fontWeight: "500",
                                        fontFamily: "Trebuchet MS",
                                        borderTopLeftRadius: "12px",
                                        borderTopRightRadius: "12px",
                                        background: "#067AB4",
                                        height: 25,
                                        fontSize:
                                          row.title ==
                                          "Grouped Bar Chart With Direct Labels"
                                            ? "10px"
                                            : "14px",
                                        position: "relative",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {row.title}
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#FFF",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={row.img}
                                          style={{
                                            resizeMode: "cover",
                                            height: "200px",
                                            width: "90%",
                                          }}
                                          alt={""}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Pie Charts
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section6.map((row, id) => (
                                  <div
                                    onClick={() => {
                                      row.onpress();
                                      showfixborder(row, row.id);
                                    }}
                                    onMouseEnter={() => showborder(row.id)}
                                    onMouseLeave={() => removeborder(row.id)}
                                    style={{
                                      height: "260px",
                                      width: "22%",
                                      display: "inline-block",
                                      border:
                                        myborder === row.id &&
                                        !mynode.includes(row.id)
                                          ? "1px solid #0aafff"
                                          : mynode.includes(row.id)
                                          ? "4px solid #0D4669"
                                          : "0.5px solid #ccc",
                                      margin: 5,
                                      position: "relative",
                                      cursor: "pointer",
                                      borderTopLeftRadius: "16px",
                                      borderTopRightRadius: "16px",
                                      boxShadow:
                                        "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: "white",
                                          fontWeight: "500",
                                          fontFamily: "Trebuchet MS",
                                          borderTopLeftRadius: "12px",
                                          borderTopRightRadius: "12px",
                                          background: "#067AB4",
                                          height: row.id === "51" ? 35 : 25,
                                          position: "relative",
                                          fontSize:
                                            row.id === "51" ? "11px" : "13px",
                                        }}
                                      >
                                        {row.title}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#FFF",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={row.img}
                                          style={{
                                            height:
                                              row.id === "49"
                                                ? "160px"
                                                : "190px",
                                            resizeMode: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Bubble Charts
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section7.map((row, id) => (
                                  <div
                                    onClick={() => {
                                      row.onpress();
                                      showfixborder(row, row.id);
                                    }}
                                    onMouseEnter={() => showborder(row.id)}
                                    onMouseLeave={() => removeborder(row.id)}
                                    style={{
                                      height: "260px",
                                      width: "22%",
                                      display: "inline-block",
                                      border:
                                        myborder === row.id &&
                                        !mynode.includes(row.id)
                                          ? "1px solid #0aafff"
                                          : mynode.includes(row.id)
                                          ? "4px solid #0D4669"
                                          : "0.5px solid #ccc",
                                      margin: 5,
                                      position: "relative",
                                      cursor: "pointer",
                                      borderTopLeftRadius: "16px",
                                      borderTopRightRadius: "16px",
                                      boxShadow:
                                        "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: "white",
                                          fontWeight: "500",
                                          fontFamily: "Trebuchet MS",
                                          borderTopLeftRadius: "12px",
                                          borderTopRightRadius: "12px",
                                          background: "#067AB4",
                                          height: 25,
                                          position: "relative",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {row.title}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#FFF",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={row.img}
                                          style={{
                                            height: "190px",
                                            width: "90%",
                                            resizeMode: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Dot Plots
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section8.map((row, id) => (
                                  <div
                                    onClick={() => {
                                      row.onpress();
                                      showfixborder(row, row.id);
                                    }}
                                    onMouseEnter={() => showborder(row.id)}
                                    onMouseLeave={() => removeborder(row.id)}
                                    style={{
                                      height: "260px",
                                      width: "22%",
                                      display: "inline-block",
                                      border:
                                        myborder === row.id &&
                                        !mynode.includes(row.id)
                                          ? "1px solid #0aafff"
                                          : mynode.includes(row.id)
                                          ? "4px solid #0D4669"
                                          : "0.5px solid #ccc",
                                      margin: 5,
                                      position: "relative",
                                      cursor: "pointer",
                                      borderTopLeftRadius: "16px",
                                      borderTopRightRadius: "16px",
                                      boxShadow:
                                        "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: "white",
                                          fontWeight: "500",
                                          fontFamily: "Trebuchet MS",
                                          borderTopLeftRadius: "12px",
                                          borderTopRightRadius: "12px",
                                          background: "#067AB4",
                                          height: 25,
                                          position: "relative",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {row.title}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#FFF",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={row.img}
                                          style={{
                                            height: "190px",
                                            width: "90%",
                                            resizeMode: "cover",
                                          }}
                                          alt={""}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Filled Area Plots
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section9.map((row, id) => (
                                  <div
                                    onClick={() => {
                                      row.onpress();
                                      showfixborder(row, row.id);
                                    }}
                                    onMouseEnter={() => showborder(row.id)}
                                    onMouseLeave={() => removeborder(row.id)}
                                    style={{
                                      height: "260px",
                                      width: "22%",
                                      display: "inline-block",
                                      border:
                                        myborder === row.id &&
                                        !mynode.includes(row.id)
                                          ? "1px solid #0aafff"
                                          : mynode.includes(row.id)
                                          ? "4px solid #0D4669"
                                          : "0.5px solid #ccc",
                                      margin: 5,
                                      position: "relative",
                                      cursor: "pointer",
                                      borderTopLeftRadius: "16px",
                                      borderTopRightRadius: "16px",
                                      boxShadow:
                                        "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          color: "white",
                                          fontWeight: "500",
                                          fontFamily: "Trebuchet MS",
                                          borderTopLeftRadius: "12px",
                                          borderTopRightRadius: "12px",
                                          background: "#067AB4",
                                          height: 25,
                                          position: "relative",
                                          fontSize: "13px",
                                        }}
                                      >
                                        {row.title}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        width: "100%",
                                        backgroundColor: "#FFF",
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginTop: "20px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={row.img}
                                          style={{
                                            height: "190px",
                                            width: "90%",
                                            resizeMode: "cover",
                                          }}
                                          alt={""}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Horizontal Bar Charts
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section10.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Sunburst Charts
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section11.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: row.id === "72" ? 35 : 25,
                                            position: "relative",
                                            fontSize:
                                              row.id === "72" ? "11px" : "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              // height: '190px',
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Sankey Diagrams
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section12.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Point Cloud
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section13.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            TreeMaps
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section14.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Multiple Chart Types
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section15.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            WebGL vs SVG
                          </h3>
                        )}
                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section16.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Statistical Charts
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Error Bars
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section17.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Box Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section18.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Histogram
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section19.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            2d Density Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section20.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Continuous Error Bars
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section21.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Scientific Charts
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Contour Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section22.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Heat Maps
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section23.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Parallel Coordinates Plot
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section25.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>

                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Log Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section26.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>

                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Financial Charts
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Waterfall Charts
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section27.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Candlestick Charts
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section29.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Funnel and Funnel Area Charts
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section30.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Time Series
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section31.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            3D Charts
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section32.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            3D Surface Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.sectionSub3D.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            3D Mesh Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section33.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            3D Line Plot
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section34.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Subplots
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Subplots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section35a.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Inset Plots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section35.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            3D Subplots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section36.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Mixed Subplots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section37.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Table Subplots
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section38.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Custom Chart Events
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Click Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section39.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Hover Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section40.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Zoom Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section41.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Disable Zoom Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section42.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Transform
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Filter
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section43.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Aggregations
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section44.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {/* {activeStep === 2 && (
                      <h3
                        style={{
                          textAlign: 'left',
                          color: '#0c0c0c',
                          fontFamily: 'Trebuchet MS'
                        }}
                      >
                        Multiple Transforms
                      </h3>
                    )} */}

                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Custom Controls
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Dropdown Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section46.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Button Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section48.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Slider Events
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section49.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Lasso Selection
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section50a.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Range Slider and Selector
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section50.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h2
                            style={{
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                              textAlign: "left",
                            }}
                          >
                            Animations
                          </h2>
                        )}
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Animations
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section51.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Filled-Area Animation
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section53.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                        {activeStep === 2 && (
                          <h3
                            style={{
                              textAlign: "left",
                              color: "#0c0c0c",
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            Map Animation
                          </h3>
                        )}

                        <div
                          style={{
                            backgroundColor: "#C1D9EC",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            width: "100%",
                            height: "100%",
                            padding: 5,
                            zIndex: 2,
                            marginBottom: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginLeft: "8px",
                              display: "flex",
                              flexWrap: "wrap",
                              margin: "10px",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              zIndex: 20,
                              justifyContent: "space-around",
                              backgroundColor: "white",
                            }}
                          >
                            {activeStep === 2
                              ? visualizationOptions.section54.map(
                                  (row, id) => (
                                    <div
                                      onClick={() => {
                                        row.onpress();
                                        showfixborder(row, row.id);
                                      }}
                                      onMouseEnter={() => showborder(row.id)}
                                      onMouseLeave={() => removeborder(row.id)}
                                      style={{
                                        height: "260px",
                                        width: "22%",
                                        display: "inline-block",
                                        border:
                                          myborder === row.id &&
                                          !mynode.includes(row.id)
                                            ? "1px solid #0aafff"
                                            : mynode.includes(row.id)
                                            ? "4px solid #0D4669"
                                            : "0.5px solid #ccc",
                                        margin: 5,
                                        position: "relative",
                                        cursor: "pointer",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                        boxShadow:
                                          "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            color: "white",
                                            fontWeight: "500",
                                            fontFamily: "Trebuchet MS",
                                            borderTopLeftRadius: "12px",
                                            borderTopRightRadius: "12px",
                                            background: "#067AB4",
                                            height: 25,
                                            position: "relative",
                                            fontSize: "13px",
                                          }}
                                        >
                                          {row.title}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#FFF",
                                        }}
                                      >
                                        <div
                                          style={{
                                            marginTop: "20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img
                                            src={row.img}
                                            style={{
                                              height: "190px",
                                              width: "90%",
                                              resizeMode: "cover",
                                            }}
                                            // width={"70%"}
                                            alt={""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </StyleRoot>
          ) : newpg4 ? (
            <>
              <div
                style={{
                  backgroundColor: "#0aafff",
                  width: "100px",
                  padding: 5,
                  color: "white",
                  borderRadius: "12px",
                  cursor: "pointer",
                  position: "absolute",
                  right: 50,
                  top: "100px",
                  zIndex: 20,
                }}
                onClick={() => {
                  console.log("clicked??");
                  setnewpg1(false);
                  setnewpg2(false);
                  setnewpg3(false);
                  setnewpg4(false);
                  setnewpg5(true);
                }}
              >
                Next
              </div>
              <div style={{ zIndex: 10 }}>
                {location.state === "Deep" ? (
                  history.push(
                    "/Widget Dashboard/new/" + global.subscription_id
                  )
                ) : (
                  <div style={{ marginTop: "30px" }}>
                    <Dashboard fromFlow={true} flowId={myFlowId} />
                  </div>
                )}
              </div>
            </>
          ) : newpg6 ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "-100px",
                }}
              >
                <div style={{ marginLeft: "8%" }}>
                  <h2
                    style={{
                      alignSelf: "flex-start",
                      fontFamily: "Trebuchet MS",
                      textAlign: "left",
                      marginTop: "20px",
                    }}
                  >
                    CREATE A FLOW
                  </h2>
                  <div
                    style={{
                      fontSize: "15px",
                      textAlign: "left",
                      marginTop: "8px",
                    }}
                  >
                    Create a flow to ingest,transform and visualize your data
                  </div>
                </div>
                {/* <div>
              <button
                style={{
                  height: '40px',
                  width: '125px',
                  color: 'white',
                  backgroundColor: '#0aafff',
                  borderRadius: '5px',
                  border: 'none',
                  fontWeight: 'bolder',
                  marginRight: '50px'
                }}
              >
                CREATE
              </button>
            </div> */}
              </div>

              <div
                style={{ width: "100%", display: "flex", marginTop: "30px" }}
              >
                <div style={{ width: "50%" }}>
                  <img
                    src={"/finalCircle2.png"}
                    style={{ height: "400px", width: "400px" }}
                  ></img>
                </div>
                <div
                  style={{
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      margin: "0px auto",
                      border: "0.5px solid rgba(77, 77, 77, 0.5)",
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#333333",
                        paddingTop: "12px",
                        paddingLeft: "10px",
                        marginBottom: "18px",
                      }}
                    >
                      Newly Added Flow
                    </div>
                    <div
                      style={{
                        width: "80%",
                        border: "0.7px solid rgba(77, 77, 77, 0.4)",
                        height: "55px",
                        borderRadius: "4px",
                        margin: "25px auto",
                        paddingLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        color: "#4D4D4D",
                      }}
                    >
                      {flowName}
                    </div>

                    <div
                      style={{
                        width: "80%",
                        border: "0.7px solid rgba(77, 77, 77, 0.4)",
                        borderRadius: "4px",
                        margin: "25px auto",
                        paddingLeft: "20px",
                        padding: "16px",
                        color: "#4D4D4D",
                      }}
                    >
                      {flowDescription}
                    </div>
                    <div
                      style={{
                        width: "80%",
                        border: "0.7px solid rgba(77, 77, 77, 0.4)",
                        borderRadius: "4px",
                        margin: "35px auto",
                        paddingLeft: "10px",
                        paddingTop: "10px",
                        paddingBottom: "8px",
                        color: "#4D4D4D",
                        fontSize: "14px",
                      }}
                    >
                      Data Source
                      <div
                        style={{
                          width: "80%",
                          border: "0.7px solid rgba(77, 77, 77, 0.4)",
                          margin: "25px auto",
                          display: "flex",
                          height: "60px",
                          alignItems: "center",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "15%",
                            height: "70%",
                            marginLeft: "10px",
                            border: "0.7px solid rgba(77, 77, 77, 0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5px",
                            borderRadius: "10px",
                          }}
                        >
                          {fileimg === 3 ? (
                            <img src="xml.png"></img>
                          ) : fileimg === 4 ? (
                            <img src="JSON.png"></img>
                          ) : fileimg === 6 ? (
                            <img src="file5.png"></img>
                          ) : fileimg === 7 ? (
                            <img src="file11.png"></img>
                          ) : fileimg === 2 ? (
                            <img src="xlsx.png"></img>
                          ) : (
                            <img src="CSV.png"></img>
                          )}
                        </div>
                        <div
                          style={{
                            width: "80%",
                            textAlign: "center",
                            fontWeight: "bolder",
                            fontSize: "14px",
                          }}
                        >
                          {orignalFile?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginLeft: "4%",
                }}
              >
                <h3
                  style={{
                    padding: 10,
                    textALign: "left",
                    marginLeft: "60px",
                    marginTop: "20px",
                  }}
                >
                  My Data Flows
                </h3>
              </div>
              <TableContainer
                component={Paper}
                style={{ width: "90%", marginLeft: 100, marginTop: 10 }}
              >
                <Table
                  sx={{ minWidth: 650, border: "0.07px solid #ccc" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={flowsData.length}
                  />
                  <TableBody>
                    {stableSort(
                      rowsPerPage > 0
                        ? flowsData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : flowsData,
                      getComparator(order, orderBy)
                    ).map((row, index) => (
                      <TableRow
                        hover
                        role="checkbox"
                        key={row.id}
                        style={{ cursor: "pointer" }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          style={{
                            height: 42,
                            width: 250,
                            maxWidth: 250,
                            overflowX: "auto",
                            //  backgroundColor: '#efefef'
                          }}
                          component="th"
                          scope="row"
                          padding="checkbox"
                        >
                          <div
                            style={{
                              marginTop: 25,
                            }}
                          >
                            <div
                              style={{
                                justifyContent: "center",
                                marginTop: -12,
                              }}
                            >
                              <Checkbox
                                color="primary"
                                style={{ alignSelf: "center" }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              marginLeft: 60,
                              marginTop: -34,
                              marginBottom: 12,
                              height: 40,
                              width: 140,
                              overflow: "auto",
                            }}
                          >
                            <Link to={"/dataDashboard/" + row.id}>
                              {row.name}
                            </Link>
                          </div>
                        </TableCell>

                        <TableCell
                          style={{
                            maxWidth: 240,
                            overflow: "auto",
                          }}
                          align="left"
                        >
                          {row.description}
                        </TableCell>

                        <TableCell align="left">
                          {moment.utc(row.created_at).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            maxWidth: 200,
                            overflow: "auto",
                          }}
                        >
                          {row.updated_at != null &&
                            moment(row.updated_at).format("hh:mm A")}
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{
                            backgroundColor: "#efefef",
                            width: "20%",
                            maxWidth: "22%",
                          }}
                        >
                          <div
                            style={{
                              left: "84%",
                              position: "absolute",
                              marginTop: -15,
                              maxWidth: 150,
                              overflow: "auto",
                            }}
                          >
                            <Link to={"/dataDashboard/" + row.id}>
                              {"Analytics Report"}
                            </Link>
                          </div>

                          {/* <div
                        onClick={() => {
                          console.log('I got clicked', row.id)
                          localStorage.setItem('FlowID', row.id)
                        }}
                        style={{
                          left: '90.5%',
                          position: 'absolute',
                          marginTop: -15,
                          maxWidth: 150,
                          overflow: 'auto'
                        }}
                      >
                        <Link
                          to={'/widget Dashboard/new/' + global.subscription_id}
                        >
                          {'Widget'}
                        </Link>
                      </div> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={flowsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "-100px",
                }}
              >
                <h2
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: "8%",
                    fontFamily: "Trebuchet MS",
                    marginTop: "20px",
                  }}
                >
                  CREATE A FLOW
                </h2>
                <div
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: "8%",
                    fontWeight: "400",
                    marginTop: "8px",
                  }}
                >
                  Create a flow to Ingest, transform and visualize your data.
                </div>
              </div>

              {/* <div
            style={{
              width: '100%',
              height: '80vh',
              position: 'relative'
            }}
          >
            <div style={{ height: '40vh', display: 'flex' }}>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {plusclick3 === true ? (
                  plusclick4 === true ? (
                    <img
                      src={'/quadrant4final.png'}
                      style={{
                        height: '250px',
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-10px'
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={'/Ellipse 5.png'}
                        style={{
                          height: '250px',
                          position: 'absolute',
                          bottom: '-10px',
                          right: '-10px'
                        }}
                      />
                      <img
                        src={'/plusicon4.png'}
                        style={{
                          position: 'absolute',
                          height: '70px',
                          width: '70px',
                          bottom: '49%',
                          right: '1%'
                        }}
                        onClick={() => {
                          setplusclick4(true)
                          setnewpg4(true)
                        }}
                      ></img>
                    </>
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {plusclick === true ? (
                  <img
                    src={'/quadrant1final.png'}
                    style={{
                      height: '250px',
                      width: '250px',
                      position: 'absolute',
                      bottom: '-10px',
                      left: '-10px'
                    }}
                  />
                ) : (
                  <>
                    {' '}
                    <img
                      src={'/Ellipse1.png'}
                      style={{
                        height: '250px',
                        width: '250px',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '-10px'
                      }}
                    />
                    <img
                      src={'/plusIcon.png'}
                      style={{
                        height: '70px',
                        width: '70px',
                        position: 'absolute',
                        bottom: '7%',
                        left: '18%'
                      }}
                      onClick={() => {
                        setplusclick(true)
                        settextchng(
                          'Transform your dataset into valuable assets'
                        )
                        setnewpg1(true)
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div style={{ height: '40vh', display: 'flex' }}>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {plusclick1 === true ? (
                  plusclick3 === true ? (
                    <img
                      src={'/quadrant3final.png'}
                      style={{
                        height: '250px',
                        position: 'absolute',
                        top: '-18px',
                        right: '-10px'
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={'/Ellipse 4.png'}
                        style={{
                          height: '250px',
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px'
                        }}
                      />
                      <img
                        src={'/plusicon3.png'}
                        style={{
                          height: '70px',
                          width: '70px',
                          position: 'absolute',
                          top: '7%',
                          right: '20.2%'
                        }}
                        onClick={() => {
                          setnewpg3(true)
                          setplusclick3(true)
                          settextchng(
                            'Analyze data & implement stitistical view'
                          )
                        }}
                      />
                    </>
                  )
                ) : (
                  <div></div>
                )}
              </div>
              <div
                style={{
                  width: '50%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {plusclick === true ? (
                  plusclick1 === true ? (
                    <img
                      src={'/quadrant2final.png'}
                      style={{
                        height: '250px',
                        position: 'absolute',
                        top: '-18px',
                        left: '-10px'
                      }}
                    ></img>
                  ) : (
                    <>
                      <img
                        src={'/Ellipse2.png'}
                        style={{
                          height: '250px',
                          position: 'absolute',
                          top: '-10px',
                          left: '-10px'
                        }}
                      />
                      <img
                        src='/plusicon2.png'
                        style={{
                          height: '60px',
                          width: '60px',
                          position: 'absolute',
                          bottom: '26%',
                          left: '2%'
                        }}
                        onClick={() => {
                          setplusclick1(true)
                          settextchng('Select your visuals')
                          setnewpg2(true)
                        }}
                      ></img>
                    </>
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div> */}
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  position: "relative",
                  zIndex: "999",
                }}
              >
                <div style={{ height: "40vh", display: "flex" }}>
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {plusclick3 === true ? (
                      plusclick4 === true ? (
                        <img
                          src={"/quadrant4.png"}
                          style={{
                            height: "250px",
                            position: "absolute",
                            bottom: "-10px",
                            right: "-10px",
                          }}
                        />
                      ) : (
                        <>
                          <img
                            src={"/Ellipse_5.png"}
                            style={{
                              height: "250px",
                              position: "absolute",
                              bottom: "-11px",
                              right: "-10px",
                            }}
                          />{" "}
                          <img
                            src={"/plusicon4.png"}
                            style={{
                              position: "absolute",
                              height: "65px",
                              width: "65px",
                              bottom: "135px",
                              right: "1%",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setplusclick4(true);
                              setnewpg4(true);
                            }}
                          ></img>
                          <img
                            src={"/step4edit.png"}
                            style={{
                              height: "80px",
                              width: "70px",
                              position: "absolute",
                              top: "29vh",
                              right: "130px",
                            }}
                          ></img>
                        </>
                      )
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <StyleRoot
                    style={{
                      width: "50%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <div style={styles.fadeIn}>
                      {plusclick === true ? (
                        <img
                          src={"/quadrant1.png"}
                          style={{
                            height: "250px",
                            width: "250px",
                            position: "absolute",
                            bottom: "-10px",
                            left: "-10px",
                          }}
                        />
                      ) : (
                        <>
                          <div>
                            <img
                              src={"/Ellipse 1.png"}
                              style={{
                                height: "250px",
                                width: "250px",
                                position: "absolute",
                                bottom: "-10px",
                                left: "-10px",
                              }}
                            />
                          </div>
                          <img
                            src={"/plusIcon_1.png"}
                            style={{
                              height: "65px",
                              width: "65px",
                              position: "absolute",
                              top: "29vh",
                              left: "135px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              fromFlow = 1;
                              setplusclick(true);
                              settextchng(
                                "Transform your dataset into valuable assets"
                              );
                              setnewpg1(true);
                              global.InFlow = 1;
                            }}
                          />
                          <img
                            src={"/step1edit.png"}
                            style={{
                              height: "90px",
                              width: "65px",
                              position: "absolute",
                              bottom: "125px",
                              left: "1%",
                            }}
                          ></img>
                        </>
                      )}
                    </div>
                  </StyleRoot>
                </div>

                <StyleRoot>
                  <div style={styles.fadeIn}>
                    <div style={{ height: "40vh", display: "flex" }}>
                      <div
                        style={{
                          width: "50%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        {plusclick1 === true ? (
                          plusclick3 === true ? (
                            <img
                              src={"/quadrant3.png"}
                              style={{
                                height: "250px",
                                position: "absolute",
                                top: "-16px",
                                right: "-10px",
                              }}
                            />
                          ) : (
                            <>
                              <img
                                src={"/Ellipse_4.png"}
                                style={{
                                  height: "250px",
                                  position: "absolute",
                                  top: "-16px",
                                  right: "-10px",
                                }}
                              />
                              <img
                                src={"/plusicon3.png"}
                                style={{
                                  height: "65px",
                                  width: "65px",
                                  position: "absolute",
                                  top: "1.3%",
                                  right: "130px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setnewpg3(true);
                                  setplusclick3(true);
                                  settextchng(
                                    "Analyze data & implement stitistical view"
                                  );
                                }}
                              />
                              <img
                                src={"/step3edit.png"}
                                style={{
                                  height: "80px",
                                  width: "70px",
                                  position: "absolute",
                                  top: "130px",
                                  right: "1%",
                                }}
                              ></img>
                            </>
                          )
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div
                        style={{
                          width: "50%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        {plusclick === true ? (
                          plusclick1 === true ? (
                            <img
                              src={"/quadrant2.png"}
                              style={{
                                height: "250px",
                                position: "absolute",
                                top: "-18px",
                                left: "-10px",
                              }}
                            ></img>
                          ) : (
                            <>
                              <img
                                src={"/Ellipse 2.png"}
                                style={{
                                  height: "250px",
                                  position: "absolute",
                                  top: "-18px",
                                  left: "-10px",
                                }}
                              />
                              <img
                                src="/plusicon2.png"
                                style={{
                                  height: "65px",
                                  width: "65px",
                                  position: "absolute",
                                  top: "135px",
                                  left: "1%",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setplusclick1(true);
                                  settextchng("Select your visuals");
                                  setnewpg2(true);
                                }}
                              ></img>{" "}
                              <img
                                src={"/step2edit.png"}
                                style={{
                                  height: "90px",
                                  width: "65px",
                                  position: "absolute",
                                  top: "2.2%",
                                  left: "135px",
                                }}
                              ></img>
                            </>
                          )
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                </StyleRoot>
                <div
                  style={{
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: "-80.5vh",
                    zIndex: plusclick4 ? "999" : "-1",
                  }}
                >
                  {newpg5 === false ? (
                    <div
                      style={{
                        height: "220px",
                        width: "220px",
                        backgroundColor: "#1FA4E7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                        borderRadius: "50%",
                        position: "absolute",
                        zIndex: "999",
                      }}
                    >
                      <div
                        style={{
                          height: "180px",
                          width: "180px",
                          backgroundColor: "#AAC4D1",
                          boxShadow: "inset 0px 3.19576px 40px #2A5B84",
                          borderRadius: "50%",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            width: "60%",
                            fontWeight: "600",
                          }}
                        >
                          {txtchng}
                        </div>
                      </div>
                    </div>
                  ) : (
                    plusclick4 && (
                      <img
                        src={"/finish.png"}
                        style={{
                          height: "220px",
                          width: "220px",
                          zIndex: "999",
                          cursor: "pointer",
                        }}
                        onClick={() => setnewpg6(true)}
                      ></img>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          <Modal
            open={isFilter}
            onClose={() => setIsFilter(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsFilter(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    alignSelf: "center",
                  }}
                >
                  Filter
                </h3>

                <div
                  style={{
                    alignSelf: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                >
                  Filters a data based on given column , condition and input
                </div>
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
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline",
                        color: "#333333",
                        fontSize: "16px",
                        textAlign: "right",
                      }}
                    >
                      Column Name:
                    </span>
                    <select
                      onChange={handleFilter}
                      style={{
                        background: "white",
                        height: "40px",
                        width: 200,
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "10px",
                        marginLeft: 10,
                      }}
                    >
                      {columns &&
                        columns.map((value, index) => {
                          return (
                            <option
                              style={{ fontSize: 14 }}
                              key={index}
                              value={index}
                            >
                              {activeStep === 4 ? value : value}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline",
                        color: "#333333",
                        fontSize: "16px",
                        width: "60%",
                        textAlign: "right",
                      }}
                    >
                      Condition:
                    </span>
                    <select
                      onChange={handleFilterCondition}
                      style={{
                        background: "white",
                        height: "40px",
                        width: 200,
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "10px",
                        marginLeft: 48,
                      }}
                    >
                      <option style={{ fontSize: 14 }} value={0}>
                        {"text is exactly"}
                      </option>
                      <option style={{ fontSize: 14 }} value={1}>
                        {"text is not exactly"}
                      </option>
                      <option style={{ fontSize: 14 }} value={2}>
                        {"number equals"}
                      </option>
                      <option style={{ fontSize: 14 }} value={3}>
                        {"number is greater than"}
                      </option>
                      <option style={{ fontSize: 14 }} value={4}>
                        {"number is greater than or equals"}
                      </option>
                      <option style={{ fontSize: 14 }} value={5}>
                        {"number is lesser than"}
                      </option>
                      <option style={{ fontSize: 14 }} value={6}>
                        {"number is lesser than or equals"}
                      </option>
                    </select>
                  </div>

                  <input
                    style={{
                      marginBottom: 2,
                      marginTop: 20,
                      border: "1px solid white",
                      width: "70%",
                      height: "40px",
                      margin: "30px auto",
                      borderRadius: "30px",
                    }}
                    placeholder="  Enter Input"
                    type={"text"}
                    defaultValue={null}
                    onChange={(e) => (input = e.target.value)}
                  />
                  <div>
                    <button
                      style={{
                        width: "190px",
                        height: "35px",
                        background: "#067ab4",
                        borderRadius: "22px",
                        color: "white",
                        border: "none",
                        marginTop: "15px",
                        marginBottom: "20px",
                      }}
                      onClick={filter}
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isSlice}
            onClose={() => setIsSlice(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsSlice(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />

                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "10px",
                    alignSelf: "center",
                  }}
                >
                  Slice
                </h3>
                <div
                  style={{
                    fontSize: "16px",
                    alignSelf: "center",
                  }}
                >
                  Enter Start and End Index to slice a data
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{}}>Start Index:</div>
                  <input
                    style={{
                      height: "35px",
                      border: "none",
                      width: "40%",
                      borderRadius: "25px",
                      marginLeft: "20px",
                      padding: "10px",
                    }}
                    type={"text"}
                    defaultValue={startIndex}
                    onChange={(e) => {
                      s = e.target.value;
                      setstartIndex(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <div>End Index:</div>
                  <input
                    style={{
                      height: "35px",
                      border: "none",
                      width: "40%",
                      borderRadius: "25px",
                      marginLeft: "20px",
                      padding: "10px",
                    }}
                    type={"text"}
                    defaultValue={lastIndex}
                    onChange={(e) => {
                      l = e.target.value;
                      setlastIndex(e.target.value);
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "150px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "25px",
                      marginBottom: "20px",
                    }}
                    onClick={handleSlice}
                  >
                    Slice
                  </button>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isDiscrete}
            onClose={() => setIsDiscrete(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsDiscrete(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />

                <h3
                  style={{
                    padding: 10,
                    textALign: "left",
                    color: "#067ab4",
                    marginTop: "10px",
                    alignSelf: "center",
                  }}
                >
                  Discrete Range
                </h3>
                <div
                  style={{
                    fontSize: "16px",
                    alignSelf: "center",
                  }}
                >
                  Enter Start and End Index to slice a data
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{}}>Start Index:</div>
                  <input
                    style={{
                      height: "35px",
                      border: "none",
                      width: "40%",
                      borderRadius: "25px",
                      marginLeft: "20px",
                      padding: "10px",
                    }}
                    type={"text"}
                    defaultValue={startIndex}
                    onChange={(e) => {
                      s = e.target.value;
                      setstartIndex(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <div>End Index:</div>
                  <input
                    style={{
                      height: "35px",
                      border: "none",
                      width: "40%",
                      borderRadius: "25px",
                      marginLeft: "20px",
                      padding: "10px",
                    }}
                    type={"text"}
                    defaultValue={lastIndex}
                    onChange={(e) => {
                      l = e.target.value;
                      setlastIndex(e.target.value);
                    }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "150px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "25px",
                      marginBottom: "20px",
                    }}
                    onClick={handleSlice}
                  >
                    Discrete Range
                  </button>
                </div>
              </>
            </Box>
          </Modal>
          <Modal
            open={isStandard}
            onClose={() => setIsStandard(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsStandard(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    textALign: "left",
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Standardization
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline",
                      color: "#333333",
                      fontSize: "16px",
                      textAlign: "right",
                    }}
                  >
                    Create a Regex Below to search in dataset
                  </span>
                  <input
                    style={{
                      marginLeft: 10,
                      marginBottom: 2,
                      marginTop: 20,
                      border: "1px solid white",
                      width: "80%",
                      margin: "20px auto",
                      height: "40px",
                      borderRadius: "30px",
                    }}
                    placeholder="  Enter Regex"
                    defaultValue={fuzzyInput2}
                    onChange={(e) => {
                      console.log(e.target.value);
                      fuzzyInput = e.target.value;
                      setFuzzyInput2(e.target.value);
                    }}
                  />
                  <div>
                    <button
                      style={{
                        width: "190px",
                        height: "35px",
                        background: "#067ab4",
                        borderRadius: "22px",
                        color: "white",
                        border: "none",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      onClick={handleStandardization}
                    >
                      Standardization
                    </button>

                    {fuzzyCount === 0 ? null : (
                      <p style={{ marginTop: 3 }}>
                        {fuzzyCount + " Rows found"}
                      </p>
                    )}
                  </div>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isMerge}
            onClose={() => setIsMerge(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsMerge(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Merge
                </h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40%",
                      textAlign: "right",
                      alignItems: "center",
                    }}
                  >
                    Select Dataset1 :
                  </div>
                  <div>
                    <select
                      onChange={(e) => storeDatasourceResult(e, 1, 1)}
                      style={{
                        background: "white",
                        height: "40px",
                        width: 200,
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "20px",
                        marginLeft: 10,
                      }}
                    >
                      {databases &&
                        databases.map((ele) => (
                          <option style={{ fontSize: 14 }} value={ele.id}>
                            {ele.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                >
                  {" "}
                  {databases.length === 0 && (
                    <div style={{ marginTop: 8, fontSize: 12 }}>
                      No datasets or please select a datasource from Import
                      Dataset
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40%",
                      textAlign: "right",
                      alignItems: "center",
                    }}
                  >
                    Select Dataset2 :
                  </div>

                  <select
                    onChange={(e) => storeDatasourceResult(e, 1, 2)}
                    style={{
                      background: "white",
                      height: "40px",
                      width: 200,
                      borderRadius: "6px",
                      border: "1px solid white",
                      paddingLeft: "20px",
                      marginLeft: 10,
                    }}
                  >
                    {databases &&
                      databases.map((ele) => (
                        <option style={{ fontSize: 14 }} value={ele.id}>
                          {ele.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div style={{ textAlign: "center" }}>
                  {" "}
                  {databases.length === 0 && (
                    <div
                      style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontSize: 12,
                      }}
                    >
                      No datasets or please select a datasource from Import
                      Dataset
                    </div>
                  )}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "190px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    onClick={handleMerge}
                  >
                    Merge
                  </button>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isGroup}
            onClose={() => setIsGroup(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsGroup(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    marginTop: "15px",
                    alignSelf: "center",
                  }}
                >
                  Group
                </h3>
                <div style={{ alignSelf: "center" }}>
                  Groups a dataset based on a selected columns
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline",
                        color: "#333333",
                        fontSize: "16px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Column 1
                    </span>
                    <select
                      onChange={(event) => (column2 = event.target.value)}
                      style={{
                        background: "white",
                        height: "40px",
                        width: 200,
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "20px",
                        marginLeft: 10,
                      }}
                    >
                      {columns &&
                        columns.map((value, index) => {
                          return (
                            <option
                              style={{ fontSize: 14 }}
                              key={index}
                              value={index}
                            >
                              {value}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline",
                        color: "#333333",
                        fontSize: "16px",
                        textAlign: "right",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Column 2
                    </span>
                    <select
                      onChange={(event) => (column = event.target.value)}
                      style={{
                        background: "white",
                        height: "40px",
                        width: 200,
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "20px",
                        marginLeft: 10,
                      }}
                    >
                      {columns &&
                        columns.map((value, index) => {
                          return (
                            <option
                              style={{ fontSize: 14 }}
                              key={index}
                              value={index}
                            >
                              {value}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "130px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      margin: "30px auto",
                    }}
                    onClick={handleGroup}
                  >
                    Group
                  </button>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isRename}
            onClose={() => setIsRename(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsRename(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "15px",
                    alignSelf: "center",
                  }}
                >
                  Rename Column
                </h3>
                <div
                  style={{
                    alignSelf: "center",
                    marginBottom: "10px",
                    fontSize: "16px",
                  }}
                >
                  Renames a selected column
                </div>
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>Column:</div>
                  <select
                    onChange={handleRenameColumn}
                    style={{
                      background: "white",
                      height: "40px",
                      width: 200,
                      borderRadius: "6px",
                      border: "1px solid white",
                      paddingLeft: "20px",
                      marginLeft: 12,
                    }}
                  >
                    {columnsBox2 &&
                      columnsBox2.map((value, index) => {
                        return (
                          <option
                            style={{ fontSize: 14 }}
                            key={index}
                            value={index}
                          >
                            {value}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div style={{ textAlign: "center" }}>
                  <input
                    style={{
                      marginBottom: 2,
                      marginTop: 20,
                      border: "1px solid white",
                      width: "70%",
                      height: "40px",
                      margin: "20px auto",
                      borderRadius: "30px",
                    }}
                    placeholder="  Enter new column name"
                    type={"text"}
                    defaultValue={renameColumn}
                    onChange={(e) => {
                      newColumnName = e.target.value;
                      setRenameColumn(e.target.value);
                    }}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "190px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                    onClick={rename}
                  >
                    Rename
                  </button>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isSort}
            onClose={() => setIssort(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIssort(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Sort
                </h3>
                <div
                  style={{
                    alignSelf: "center",
                    marginBottom: "15px",
                    fontSize: "16px",
                  }}
                >
                  Sorts a dataset based on a given column
                </div>
                <div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          display: "inline",
                          color: "#333333",
                          fontSize: "16px",
                          width: "30%",
                          textAlign: "right",
                        }}
                      >
                        Order:
                      </span>
                      <select
                        value={activeStep === 4 ? sortType1 : sortType}
                        onChange={handleSortType}
                        style={{
                          background: "white",
                          height: "40px",
                          width: 200,
                          borderRadius: "6px",
                          border: "1px solid white",
                          paddingLeft: "20px",
                          textAlign: "left",
                          width: "50%",
                          marginLeft: "20px",
                        }}
                      >
                        <option
                          style={{
                            fontSize: 12,
                            paddingLeft: "10px",
                            paddingRight: "20px",
                          }}
                          value={-1}
                        >
                          {"Select sort type"}
                        </option>
                        <option style={{ fontSize: 12 }} value={0}>
                          {"Ascending"}
                        </option>
                        <option style={{ fontSize: 12 }} value={1}>
                          {"Descending"}
                        </option>
                      </select>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "30px",
                      }}
                    >
                      <span
                        style={{
                          color: "#333333",
                          fontSize: "16px",
                          width: "30%",
                          textAlign: "right",
                        }}
                      >
                        Column:
                      </span>
                      <select
                        value={activeStep === 4 ? selectedColumn : selectedCol}
                        onChange={(event) => {
                          // console.log('sortType1?', sortType1, desc)
                          setContainNull(0);
                          if (desc == 1) handleSortDesc(event);
                          else if (desc == 0) handleSortAsc(event);
                          else console.log("its undefined", desc);
                        }}
                        style={{
                          marginTop: 10,
                          background: "white",
                          width: 200,
                          height: "40px",
                          marginLeft: 10,
                          borderRadius: "6px",
                          border: "1px solid white",
                          paddingLeft: "10px",
                          paddingRight: "20px",
                          width: "50%",
                          textAlign: "left",
                          marginLeft: "20px",
                        }}
                      >
                        <option style={{ fontSize: 14 }} key={-1} value={-1}>
                          {"Select Column"}
                        </option>
                        {columns &&
                          columns.map((value, index) => {
                            return (
                              <option
                                style={{ fontSize: 14 }}
                                key={index}
                                value={index}
                              >
                                {activeStep === 4 ? value : value}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isReplaceNull}
            onClose={() => setIsReplaceNull(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsReplaceNull(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  // borderBottom: '1px solid #FFF',
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Replace Null
                </h3>
                <div>
                  <div
                    style={{
                      marginTop: -8,
                      color: "#333333",
                      fontSize: "16px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    What do you want to replace with null values found ?
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      style={{
                        marginBottom: 2,
                        marginTop: 20,
                        border: "1px solid white",
                        width: "80%",
                        height: "45px",
                        margin: "30px auto",
                        borderRadius: "30px",
                      }}
                      placeholder="Enter a value"
                      onChange={(e) => setReplaceInput(e.target.value)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      style={{
                        width: "190px",
                        height: "35px",
                        background: "#067ab4",
                        borderRadius: "22px",
                        color: "white",
                        border: "none",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                      onClick={handleReplaceNull}
                    >
                      Replace Null Values
                    </button>
                  </div>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isCheckIncomplete}
            onClose={() => setIsCheckComplete(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsCheckComplete(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  InComplete
                </h3>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      color: "#333333",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Check which Columns are incomplete
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <span
                      style={{
                        color: "#333333",
                        fontSize: "16px",
                        width: "30%",
                        textAlign: "right",
                      }}
                    >
                      Column Name:
                    </span>
                    <select
                      onChange={checkIncomplete}
                      style={{
                        background: "white",
                        width: 200,
                        height: "40px",
                        borderRadius: "6px",
                        border: "1px solid white",
                        paddingLeft: "10px",
                        paddingRight: "20px",
                        width: "50%",
                        textAlign: "left",
                        marginLeft: "20px",
                      }}
                    >
                      {columns &&
                        columns.map((value, index) => {
                          return (
                            <option
                              style={{ fontSize: 14 }}
                              key={index}
                              value={index}
                            >
                              {activeStep === 4 ? value : value}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      style={{
                        width: "190px",
                        height: "40px",
                        background: "#067ab4",
                        borderRadius: "22px",
                        color: "white",
                        border: "none",
                        marginTop: "30px",
                      }}
                      onClick={handleCheckIncomplete}
                    >
                      Check InComplete
                    </button>
                  </div>
                  {inComplete === false && checkedColumn ? (
                    <div
                      style={{
                        fontSize: 14,
                        color: "#615f5f",
                        marginTop: 20,
                        marginBottom: 15,
                        alignSelf: "center",
                      }}
                    >
                      Column is Complete
                    </div>
                  ) : inComplete === true && checkedColumn ? (
                    <div
                      style={{
                        fontSize: 14,
                        color: "#615f5f",
                        marginTop: 20,
                        marginBottom: 15,
                        alignSelf: "center",
                      }}
                    >
                      Column is InComplete
                    </div>
                  ) : null}
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isCaseFormat}
            onClose={() => setIsCaseFormat(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsCaseFormat(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Case Format
                </h3>

                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#333333",
                      marginTop: 10,
                      marginBottom: 15,
                      textAlign: "center",
                    }}
                  >
                    Changes Case format of data set
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <select
                      onChange={handleCaseType}
                      value={case1}
                      style={{
                        marginTop: 10,
                        marginBottom: 25,
                        border: "0.5px solid white",
                        width: 200,
                        height: 40,
                        paddingLeft: "14px",
                        backgroundColor: "white",
                        borderRadius: 10,
                        fontSize: "16px",
                        color: "#333333",
                      }}
                    >
                      <option
                        style={{
                          fontSize: 14,
                          height: 25,
                          marginBottom: 10,
                        }}
                        value={-1}
                      >
                        {"Select Case Type"}
                      </option>
                      <option style={{ fontSize: 12 }} value={0}>
                        {"To lower case"}
                      </option>
                      <option style={{ fontSize: 12 }} value={1}>
                        {"To upper case"}
                      </option>
                    </select>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      style={{
                        width: "190px",
                        height: "35px",
                        background: "#067ab4",
                        borderRadius: "22px",
                        color: "white",
                        border: "none",
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}
                      onClick={caseFormat}
                    >
                      Get Case Formated
                    </button>
                  </div>
                </div>
              </>
            </Box>
          </Modal>

          <Modal
            open={isFuzzySearch}
            onClose={() => setIsFuzzySearch(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <>
                <CloseIcon
                  onClick={() => setIsFuzzySearch(false)}
                  style={{
                    position: "absolute",
                    left: "92%",
                    top: "4%",
                    cursor: "pointer",
                  }}
                />
                <h3
                  style={{
                    padding: 10,
                    color: "#067ab4",
                    marginTop: "20px",
                    alignSelf: "center",
                  }}
                >
                  Fuzzy Search
                </h3>

                <div
                  style={{
                    alignSelf: "center",
                    fontSize: "16px",
                    width: "80%",
                  }}
                >
                  Finds the strings that matches a pattern approximately (rather
                  than exactly)
                </div>
                <div style={{ textAlign: "center" }}>
                  <input
                    style={{
                      marginBottom: 2,
                      marginTop: 20,
                      border: "1px solid white",
                      width: "80%",
                      height: "45px",
                      borderRadius: "30px",
                    }}
                    placeholder="  Enter a value"
                    defaultValue={fuzzyInput2}
                    onChange={(e) => {
                      console.log(e.target.value);
                      fuzzyInput = e.target.value;
                      setFuzzyInput2(e.target.value);
                    }}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "190px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "40px",
                      marginBottom: "20px",
                    }}
                    onClick={handleFuzzySearch}
                  >
                    Fuzzy Search
                  </button>
                </div>
              </>
              <div style={{ textAlign: "center" }}>
                {fuzzyCount === 0 ? null : <p>{fuzzyCount + " Rows found"}</p>}
              </div>
            </Box>
          </Modal>

          {/* <Dialog
        open={openDialog}
        onClose={handleClose2}
        PaperProps={{
          style: {
            backgroundColor: "red",
            boxShadow: "none",
            overflow: "hidden",
            height: 400,
            width: 400,
          },
        }}
      >
        <CircularProgress sx={{ color: "#0BAFFF" }} />
      </Dialog> */}
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default CreateFlow;
