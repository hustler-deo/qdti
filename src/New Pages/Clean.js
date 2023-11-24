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
var columns;

const Clean = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const location = useLocation();

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

  let subtitle, fileInfo1;

  const [rowsData, setrowsData] = React.useState();
  const [columnData, setColumnData] = React.useState();

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
  const [columnsBox, setColumnsBox] = useState();
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
  const [selectedColumn, setSelectedColumn] = useState(0);

  const [data, setData] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");

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

  useEffect(() => {
    console.log("In Clean", location.state.data);
    convertDataForDisplay(location.state.data);
    setData(location.state.data);
    columns = location.state.data[0];
  }, []);

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
    setDt2(temp2);
  };
  const apply = () => {
    let cValues = getSelectedColumnData();
    convertDataForDisplay2(cValues);
    makeUpper();
  };
  const convertDataForDisplay2 = (data) => {
    const result = data.filter((item) => {
      return item.includes(newFieldName);
    });

    console.log("TTT", result);
    let temp2 = [];
    result?.map((e) => {
      let temp3 = [];
      //   e.map(e2 => {
      temp3.push({ value: e });
      temp2.push(temp3);
      // return e2
      //   })
      //   temp2.push(temp3)
      //   return e
    });
    console.log("TTT2", temp2);
    setDt2(temp2);
  };

  const makeUpper = () => {
    let tmp = [];
    for (let k = 0, j = 0; k < data.length; k++) {
      //   console.log('asasas', data[k])
      if (data[k][column1].includes(newFieldName))
        data[k][column1] = data[k][column1].toUpperCase();
      //   tmp.push(data[k][column1].toUpperCase())
      //   data[k].push(data[k][column1].toUpperCase())
    }

    // console.log('check Upper', data)

    // data[k].splice(0, data[k].length, ...Array2)
    console.log("check Upper", data);
    convertDataForDisplay(data);
    // setDt2(data)
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
    data?.map((e) => {
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
  const MyComponent = (props) => {
    return (
      <div
        style={{
          marginTop: "-90px",
          width: window.innerWidth - 160,
          height: window.innerHeight / 1.8,
          overflow: "scroll",
        }}
      >
        <Spreadsheet data={props.data && props.data} />
      </div>
    );
  };
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-100px",
            }}
          >
            <h2
              style={{
                marginTop: "20px",
                alignSelf: "flex-start",
                marginLeft: "9%",
                fontFamily: "Trebuchet MS",
              }}
            >
              Clean & Shape
            </h2>

            <div
              style={{
                marginTop: "10px",
                backgroundColor: "#0aafff",
                width: "100px",
                padding: 5,
                color: "white",
                borderRadius: "12px",
                cursor: "pointer",
                marginRight: "40px",
              }}
              onClick={() => {
                if (location.state.selectedDataset)
                  history.push({
                    pathname: "/Transform_Data/:" + global.subscription_id,
                    state: { data: data, selectedDataset: true },
                  });
                else
                  history.push({
                    pathname: "/Transform_Data/:",
                    state: { data: data, selectedDataset: false },
                  });
                //   history.push('/Auto_ML_Engine')
              }}
            >
              Next
            </div>
          </div>

          <div>
            <div
              style={{
                width: "86vw",
                marginLeft: "9%",
                marginTop: "2%",
              }}
            >
              <div
                style={{
                  height: "35vh",
                  width: "88vw",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#C1D9EC",
                    height: "110px",
                    width: "88vw",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#e0ecf5",
                      width: "100%",
                      height: "30px",
                    }}
                  >
                    <div
                      style={{
                        color: "white",
                        backgroundColor: "#0BAFFF",
                        width: "120px",
                        height: "30px",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Shape Using
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-76px",
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
                      <FormControl style={{ width: 200 }} size="small">
                        <InputLabel id="demo-simple-select-label">
                          Select Column
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

                  <TextField
                    style={{
                      width: "20vw",
                      marginLeft: "50px",
                      marginTop: "10px",
                    }}
                    id="standard-basic"
                    label="Enter text to clean"
                    variant="standard"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                  />

                  <div
                    style={{
                      width: "65px",
                      height: "34px",
                      padding: 6,
                      backgroundColor: "#0aafff",
                      borderRadius: "12px",
                      marginTop: "15px",
                      cursor: "pointer",
                      marginLeft: "100px",
                      marginRight: "30px",
                      fontSize: "16px",
                      color: "white",
                    }}
                    onClick={() => {
                      //   handleShape()
                      apply();
                    }}
                  >
                    Apply
                  </div>
                </div>
              </div>
              {dt2 && dt2.length > 0 && <MyComponent data={dt2 && dt2} />}
            </div>
          </div>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default Clean;
