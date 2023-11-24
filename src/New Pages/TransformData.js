import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Spreadsheet from "react-spreadsheet";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FuzzySearch from "fuzzy-search";

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
import { fadeIn } from "react-animations";

import Select from "react-select";

// Auth context
import { AuthContext } from "../context";

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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { forIn } from "lodash";

const options = [
  { value: "Column1", label: "Column1" },
  { value: "Column2", label: "Column2" },
  { value: "Column3", label: "Column3" },
  { value: "Column4", label: "Column4" },
  { value: "Column5", label: "Column5" },
  { value: "Column6", label: "Column6" },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

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
var nodeBox = [];
var mynode = [];
var typeId, dataset1, dataset2;
var result, min, max, sum, avg;
var sc,
  s = 0,
  l = 1,
  newColumnName = "",
  condition,
  input,
  fuzzyInput;

const TransformData = () => {
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

  const rows3 = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, [cname]: 10 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, [cname]: 10 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, [cname]: 10 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16, [cname]: 10 },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      [cname]: 10,
    },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150, [cname]: 10 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44, [cname]: 10 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, [cname]: 10 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, [cname]: 10 },
  ];

  const columns3 = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: cname,
      headerName: cname,
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

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
  const [orignalFile, setOriginalFile] = useState("");
  const [alertType, setAlertType] = useState();
  const [containNull, setContainNull] = useState(0);
  const [isExampleData, setisExampleData] = useState(false);

  const [replaceInput, setReplaceInput] = useState("");

  let subtitle, fileInfo1;

  const [rowsData, setrowsData] = React.useState(rows3);
  const [columnData, setColumnData] = React.useState(columns3);

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

  const [dt2, setDt2] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("");
  const [cpText, setCpText] = useState("");
  const [expData, setExpData] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [stateElements2, setStateElements2] = useState();
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

  const [dt, setDt] = useState([]);

  const [newFieldName, setNewFieldName] = useState("");

  const [updated, setUpdated] = useState(false);
  const [activeStep, setActiveStep] = React.useState(2);
  const [alignment, setAlignment] = React.useState("web");
  const [fileimg, setfileimg] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [data, setData] = useState(exampleData2);

  const modalStyle = {
    position: "relative",
    top: "26%",
    left: "33%",
    bgcolor: "#C1D9EC",
    border: "1px solid #000",
    boxShadow: 24,
    height: isFilter
      ? 400
      : isRename
      ? 320
      : isGroup
      ? 320
      : isSort
      ? 330
      : isMerge
      ? 350
      : 300,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "10px",
  };

  useEffect(() => {
    console.log("check this one,", location.state);
    if (location.state.selectedDataset === false) {
      console.log("what", location.state.data);
      typeId = "ExampleData";
      result = location.state.data;
      setDt(location.state.data);
      global.type_id === "ExampleData";
      convertDataForDisplay(location.state.data);
      columns = result.slice(0, 1);
      const C1 = columns[0];
      console.log("columns-typeId1", C1);
      columns = columns[0];
      setColumnsBox2(columns);
    } else {
      typeId = "ExampleData";
      result = location.state.data;
      setDt(location.state.data);
      global.type_id === "ExampleData";
      convertDataForDisplay(location.state.data);
      columns = result.slice(0, 1);
      const C1 = columns[0];
      console.log("columns-typeId1", C1);
      columns = columns[0];
      setColumnsBox2(columns);
    }
  }, []);

  const handleRequestSort = (event, property) => {
    // console.log('Insort....', property)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
  };

  const MyComponent = (props) => {
    // useEffect(() => {
    //   console.log('changed!!', props.data)
    // }, [props.data])
    return (
      <div
        style={{
          width: window.innerWidth - 160,
          height: window.innerHeight / 1.8,
          overflow: "scroll",
        }}
      >
        <Spreadsheet data={props.data && props.data} />
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
    let arr = dt;
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
      if (global.type_id === "ExampleData") result = dt;

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
    //  console.log('beforeSlice', typeId, exceldata, result)
    if (typeId === 1) {
      result.shift();
      result = result.slice(s, parseInt(l) + 1);
      console.log("Sliced", s, l, result.slice(s, l));
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

    if (typeId === 2) {
      exceldata.shift();
      exceldata = exceldata.slice(s, parseInt(l) + 1);
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
    } else if (typeId === 3) {
      xmldata.shift();
      console.log("Xmldata", xmldata);
      xmldata = xmldata.slice(s, parseInt(l) + 1);
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
    } else if (typeId === 6) {
      pdfdata.shift();
      console.log("pdfdata>", pdfdata);
      pdfdata = pdfdata.slice(s, parseInt(l) + 1);
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
      result = dt.slice(s, parseInt(l) + 1);
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
    } else if (typeId === 7) {
      parquetdata.shift();
      parquetdata = parquetdata.slice(s, parseInt(l) + 1);
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
    } else if (typeId === 4) {
      jsondata.shift();
      jsondata = jsondata.slice(s, parseInt(l) + 1);
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
      if (typeId === "ExampleData") result = dt;
      result.shift();
      result = result.slice(s, parseInt(l) + 1);
      // console.log('Sliced', result.slice(s, l))
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
    result.unshift(columns);
    convertDataForDisplay(result);
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
        ? dt
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
        ? dt
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
        ? dt
        : result;

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
    convertDataForDisplay(result);

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
        ? dt
        : result;

    databox[(0, 0)][selectedColumn] = newColumnName;
    setColumnsBox2(databox[0]);
    let array5 = databox.map((obj) => Object.values(obj));

    result = array5;
    setDt(array5);
    convertDataForDisplay(array5);

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
    // setSelectedColumn(event.target.value);
    // setSelectedCol(event.target.value);
    var tmpBox;
    var Regex = /^[a-zA-Z ]+$/;
    var j = selectedColumn;
    // var j = event.target.value;
    //sort
    const databox =
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
        ? dt
        : result;
    // console.log(event.target.value);
    var sorted;
    var tmp;
    var done = false;

    if (flag == 0) {
      tmpBox = databox;
      tmpBox.shift();
    }

    sorted = tmpBox.sort((a, b) => {
      if (Regex.test(a[j]) && Regex.test(b[j])) {
        if (a[j] && b[j]) return a[j].localeCompare(b[j]);
      } else {
        return parseInt(a[j]) - parseInt(b[j]);
      }
    });

    if (flag == 0) sorted.unshift(columns);
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
    result = sorted;
    prepareData();
    setIssort(false);
    console.log("....");
  };

  const handleSortDesc = (event) => {
    // setSelectedColumn(event.target.value);
    // setSelectedCol(event.target.value);

    var tmpBox;
    var Regex = /^[a-zA-Z ]+$/;
    var j = selectedColumn;
    // var j = event.target.value;
    // setSelectedCol(event.target.value);
    //sort
    const databox =
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
        ? dt
        : result;
    // console.log(event.target.value);
    var tmp;
    var sorted;
    var done = false;

    if (flag == 0) {
      tmpBox = databox;
      tmpBox.shift();
    }
    sorted = tmpBox.sort((a, b) => {
      if (Regex.test(b[j]) && Regex.test(a[j])) {
        if (a[j] && b[j]) return b[j].localeCompare(a[j]);
      } else {
        return parseInt(b[j]) - parseInt(a[j]);
      }
    });

    if (flag == 0) sorted.unshift(columns);

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
        ? dt
        : result;

    var t2 = [];

    p.map((e) => {
      var t3 = [];
      e.map((e2) => {
        if (
          e2 === "NULL" ||
          e2 === "" ||
          e2 === " " ||
          e2 === "Null" ||
          e2 === undefined ||
          e2 === null
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

    // for (let i = 0; i < p.length; i++) {
    //   for (let j = 0; j < p[i].length; j++) {
    //     console.log('www', p[i][j])
    //     if (
    //       p[i][j] === 'NULL' ||
    //       p[i][j] === '' ||
    //       p[i][j] === ' ' ||
    //       p[i][j] === 'Null' ||
    //       p[i][j] === undefined ||
    //       p[i][j] === null
    //     )
    //       p[i][j] = replaceInput
    //   }
    // }

    console.log(t2);
    console.log("....................");
    setDt(t2);
    convertDataForDisplay(t2);
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
      databox2 = result;
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
      if (typeId === "ExampleData") result = dt;
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
        ? dt
        : result;
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
    console.log("I am in Fuzzy Search 177283892918180", typeId);
    console.log(fuzzyInput);
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
        ? dt
        : result;
    result.shift();
    const searcher = new FuzzySearch(result, [], {
      caseSensitive: false,
    });
    const res = searcher.search(fuzzyInput);
    setFuzzyCount(res.length);
    result = res;
    console.log("res", res);
    result.unshift(columns);
    setDt(result);
    convertDataForDisplay(result);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "-6%",
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
                marginTop: "10px",
              }}
            >
              Create a flow to Ingest, transform and visualize your data.
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
                  // history.push({ pathname: '/dataDashboard/:', state: dt })
                  // history.push('Widget Dashboard/new/' + global.subscription_id)
                  // history.push({
                  //   pathname:
                  //     '/Widget Dashboard/new_widget/' + global.subscription_id,
                  //   state: dt
                  // })
                  history.push("/Auto_ML_Engine");
                  // history.push('/Explore')
                  // history.push({
                  //   pathname: '/Explore',
                  //   state: {
                  //     data: dt,
                  //     selectedDataset: location.state.selectedDataset
                  //   }
                  // })
                }}
              >
                Next
              </div>
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
                  <ToggleButton value='Deduplicate'>Deduplicate</ToggleButton>
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
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-13%",
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
                      {/* <InputLabel
                      id='demo-simple-select-label'
                      style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {'COLUMNS (AGGREGATES)'}
                    </InputLabel> */}
                      <InputLabel id="demo-simple-select-label">
                        {"COLUMNS (AGGREGATES)"}
                      </InputLabel>
                      <Select2
                        // notched={true}
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
                <div style={{ marginLeft: 40, marginTop: 18, marginRight: 10 }}>
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
                      <InputLabel id="demo-simple-select-label">
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

                <div style={{ marginLeft: 15, marginTop: 15, marginRight: 13 }}>
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
                  padding: 6,
                  backgroundColor: "#fdf6c5",
                  borderRadius: "12px",
                  marginTop: "16px",
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
                marginTop: "3%",
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

              <MyComponent data={data && data} />
            </div>
          </div>

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
                    textALign: "left",
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
                    <option style={{ fontSize: 14 }} value={"index"}>
                      {"Select a Column"}
                    </option>
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
                          // setContainNull(0);
                          if (desc == 1) {
                            setSelectedColumn(event.target.value);
                            // setSelectedCol(event.target.value);
                          } else if (desc == 0) {
                            setSelectedColumn(event.target.value);
                            // setSelectedCol(event.target.value);
                          } else console.log("its undefined", desc);
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

                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      width: "190px",
                      height: "35px",
                      background: "#067ab4",
                      borderRadius: "22px",
                      color: "white",
                      border: "none",
                      marginTop: "25px",
                      marginBottom: "30px",
                    }}
                    onClick={() => {
                      setContainNull(0);
                      if (desc == 1) handleSortDesc(event);
                      else if (desc == 0) handleSortAsc(event);
                      else console.log("its undefined", desc);
                    }}
                  >
                    Sort
                  </button>
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
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default TransformData;
