import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Spreadsheet from "react-spreadsheet";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

import { ReactGrid, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import GradingIcon from "@mui/icons-material/Grading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import HighlightIcon from "@mui/icons-material/Highlight";

// Auth context
import { AuthContext } from "../context";

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

const getPeople = () => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: "", surname: "" },
];

const getColumns = () => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
];

const headerRow = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
};

const highlights = [
  { columnId: "Cargo Type Code", rowId: 8, borderColor: "#00ff00" },
];

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "number", text: 10 },
    ],
  })),
];
let box1 = [];
const Explore = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const location = useLocation();

  const [people] = React.useState(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  const [highlight, setHighlight] = React.useState();
  const [highlightOn, setHighlightOn] = React.useState(false);

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

  const [dt, setDt] = useState([]);
  const [dt2, setDt2] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [columnResize, setColumnResize] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [columnSelection, setColumnSelection] = useState(false);
  const [rowSelection, setRowSelection] = useState(false);
  const [fillHandle, setFillHandle] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);

  const [data, setData] = useState(exampleData2);

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

  const convertDataForDisplay = (data2) => {
    let data1 = data2;
    let temp2 = [];
    let columns = data1[0];
    let col = [];
    // columns.map(e => {
    //   col.push({ column: e })
    // })
    console.log("wwww1", data1[0]);

    data1.shift();
    let k = 1;
    let types = [];
    data1.map((e, i) => {
      let obj = {};
      e.map((e2, j) => {
        obj.id = k;
        obj[columns[j]] = e2;
        // temp2.push({ [columns[j]]: e2 })
        return e2;
      });
      temp2.push(obj);
      k++;

      return e;
    });
    data1[0].map((e) => types.push(typeof e));
    console.log("wwww2", types);
    console.log("temp2", temp2);

    let tempColumns = [];

    columns.map((e, i) => {
      tempColumns.push({
        field: e,
        headerClassName: "super-app-theme--header",
        // type: 'number'
      });
    });

    // console.log('cc colu', tempColumns)
    // setColumnsBox(tempColumns)
    // setData(temp2)
  };

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
    setDt(box2);
  };
  useEffect(() => {
    // console.log('COLUMNS>', columnData)
  }, [columnData]);

  useEffect(() => {
    console.log("In Explore", location.state.data);
    let columns = location.state.data[0];
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

    let data1 = [...location.state.data];
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
    setDt(location.state.data);
    let data = [...location.state.data];

    convertDataForDisplay(data);
  }, []);

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

  const handleColumnsReorder = (targetColumnId, columnIds) => {
    const to = columns.findIndex(
      (column) => column.columnId === targetColumnId
    );
    const columnIdxs = columnIds.map((columnId) =>
      columns.findIndex((c) => c.columnId === columnId)
    );
    setColumnData((prevColumns) => reorderArray(prevColumns, columnIdxs, to));
  };

  const handleRowsReorder = (targetRowId, rowIds) => {
    setrowsData((prevPeople) => {
      const to = people.findIndex((person) => person.id === targetRowId);
      const rowsIds = rowIds.map((id) =>
        people.findIndex((person) => person.id === id)
      );
      return reorderArray(prevPeople, rowsIds, to);
    });
  };

  const reorderArray = (arr, idxs, to) => {
    const movedElements = arr.filter((_, idx) => idxs.includes(idx));
    const targetIdx =
      Math.min(...idxs) < to
        ? (to += 1)
        : (to -= idxs.filter((idx) => idx < to).length);
    const leftSide = arr.filter(
      (_, idx) => idx < targetIdx && !idxs.includes(idx)
    );
    const rightSide = arr.filter(
      (_, idx) => idx >= targetIdx && !idxs.includes(idx)
    );
    return [...leftSide, ...movedElements, ...rightSide];
  };

  const handleCanReorderRows = (targetRowId, rowIds) => {
    return targetRowId !== "header";
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
              Explore
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "350px",
                marginTop: "18px",
                marginLeft: "35%",
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
                    backgroundColor: columnResize ? "#067AB4" : "#C1D9EC",
                    borderRadius: "8px",
                  }}
                  onClick={() => setColumnResize(!columnResize)}
                >
                  <IconButton>
                    <SwapHorizIcon sx={{ color: columnResize && "white" }} />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title="Sticky Header">
                <div
                  style={{
                    backgroundColor: stickyHeader ? "#067AB4" : "#C1D9EC",
                    borderRadius: "8px",
                  }}
                  onClick={() => setStickyHeader(!stickyHeader)}
                >
                  <IconButton>
                    <DragHandleIcon sx={{ color: stickyHeader && "white" }} />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title="Column Selection">
                <div
                  style={{
                    backgroundColor: columnSelection ? "#067AB4" : "#C1D9EC",
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
                    backgroundColor: rowSelection ? "#067AB4" : "#C1D9EC",
                    borderRadius: "8px",
                  }}
                  onClick={() => setRowSelection(!rowSelection)}
                >
                  <IconButton>
                    <HighlightAltIcon sx={{ color: rowSelection && "white" }} />
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
                    <GradingIcon sx={{ color: fillHandle && "white" }} />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title="Context Menu">
                <div
                  style={{
                    backgroundColor: contextMenu ? "#067AB4" : "#C1D9EC",
                    borderRadius: "8px",
                  }}
                  onClick={() => setContextMenu(!contextMenu)}
                >
                  <IconButton>
                    <ContentCopyIcon sx={{ color: contextMenu && "white" }} />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title="Highlight">
                <div
                  style={{
                    backgroundColor: highlightOn ? "#067AB4" : "#C1D9EC",
                    borderRadius: "8px",
                  }}
                  onClick={() => setHighlightOn(!highlightOn)}
                >
                  <IconButton>
                    <HighlightIcon sx={{ color: highlightOn && "white" }} />
                  </IconButton>
                </div>
              </Tooltip>
            </div>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#0aafff",
                width: "100px",
                color: "white",
                padding: 5,
                borderRadius: "12px",
                cursor: "pointer",
                marginRight: "40px",
              }}
              onClick={() => {
                // history.push({ pathname: '/dataDashboard/:', state: dt })
                // history.push('Widget Dashboard/new/' + global.subscription_id)
                // history.push({
                //   pathname:
                //     '/Widget Dashboard/new_widget/' + global.subscription_id,
                //   state: dt
                // })
                //   history.push('/Auto_ML_Engine')
                //   if (location.state.selectedDataset)
                //     history.push({
                //       pathname: '/Transform_Data/:' + global.subscription_id,
                //       state: { data: data, selectedDataset: true }
                //     })
                //   else
                //     history.push({
                //       pathname: '/Transform_Data/:',
                //       state: { data: dt, selectedDataset: false }
                //     })
                history.push({
                  pathname: "/Clean",
                  state: {
                    data: dt,
                    selectedDataset: location.state.selectedDataset,
                  },
                });
              }}
            >
              Next
            </div>
          </div>

          <div>
            <div
              className="screen2"
              style={{
                marginTop: "30px",
                margin: "auto",
                height: "80vh",
                width: window.innerWidth / 1.2,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center items horizontally
              }}
            >
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
                  // onColumnsReordered={handleColumnsReorder}
                  // onRowsReordered={handleRowsReorder}
                  // canReorderRows={handleCanReorderRows}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default Explore;
