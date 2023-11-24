import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MiniDrawer from "../MiniDrawer";

import Spreadsheet from "react-spreadsheet";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";

import useMediaQuery from "@mui/material/useMediaQuery";
import Modal from "react-modal";
import CableIcon from "@mui/icons-material/Cable";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import CommentIcon from "@mui/icons-material/Comment";
import AddIcon from "@mui/icons-material/Add";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import IconButton from "@mui/material/IconButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import configData from "../config.json";
import { AuthContext } from "../context";

const customStyles = {
  content: {
    top: "55%",
    left: "53%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: 520,
    width: 1200,
    fontFamily: "Arial",
    border: "1px solid #0c0c0c",
  },
};

const datasets = [
  {
    id: 1,
    name: "weeklyclaim_insurance",
  },
  {
    id: 2,
    name: "autocar_sale",
  },
  // {
  //   id: 3,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 4,
  //   name: 'Line item 1'
  // },

  // {
  //   id: 5,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 6,
  //   name: 'Line item 1'
  // },

  // {
  //   id: 7,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 8,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 9,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 10,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 11,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 12,
  //   name: 'Line item 1'
  // },

  // {
  //   id: 13,
  //   name: 'Line item 1'
  // },
  // {
  //   id: 14,
  //   name: 'Line item 1'
  // }
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread2", 356, 16.0, 49, 3.9),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
  createData("Gingerbread3", 356, 16.0, 49, 3.9),
];

const columns2 = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: "column", headerName: "COLUMN NAME", width: 350 },
  { field: "type", headerName: "TYPE", width: 130 },
];

const rows2 = [
  { id: 1, column: "Snow", type: "String" },
  { id: 2, column: "Lannister", type: "String" },
  { id: 3, column: "Lannister", type: "String" },
  { id: 4, column: "Stark", type: "String" },
  { id: 5, column: "Targaryen", type: "String" },
  { id: 6, column: "Melisandre", type: "String" },
  { id: 7, column: "Clifford", type: "String" },
  { id: 8, column: "Frances", type: "String" },
  { id: 9, column: "Roxie", type: "String" },
];
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
export default function ImportDataset2() {
  const isScreen0 = useMediaQuery("( max-width:1410px)");
  const isScreen1 = useMediaQuery("(min-width:1411px && max-width:1490px)");
  const isScreen2 = useMediaQuery("(min-width:1580px)");

  let found = [];
  let searchArray = [];
  let categoryData = [];
  var connectionIndex = 0;
  const { subscription_id } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [connectionName, setConnectionName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [host, setHost] = useState();
  const [port, setPort] = useState(null);
  const [clientId, setClientId] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [clientSecret, setclientSecret] = useState("");
  const [subscriptionId, setsubScriptionId] = useState("");
  const [sheetId, setSheetId] = useState("");
  const [username, setUsername] = useState("");
  const [schema, setSchema] = useState(null);
  const [password, setPassword] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState(0);
  const [searchArr, setSearchArr] = useState(searchArray);
  const [categories, setCategories] = useState([]);
  const [allCategoriesData, setAllCategoriesData] = useState([]);
  const [allConnections, setAllConnections] = useState([]);
  const [status, setStatus] = useState(0);
  const [mode, setMode] = useState("");
  const [connectionType, setConnectionType] = useState(0);
  const [allSections, setAllSections] = useState([]);
  const [files, setFiles] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [azure, setAzure] = useState([]);
  const [onlineServices, setOnlineServices] = useState([]);
  const [other, setOther] = useState([]);
  const [aws, setAws] = useState([]);
  const [google, setGoogle] = useState([]);

  const [data, setData] = useState(exampleData2);
  const [dt, setDt] = useState([]);

  const [selectedDatasource, setSelectedDatasource] = useState(false);
  const [selecteddataset, setSelectedDataset] = useState(false);
  const [datasetAdded, setDatasetAdded] = useState();
  const [datasetName, setDatasetName] = useState();

  const [editColumn, setEditColumn] = useState(false);
  const [uploadLocalFile, setUploadLocalFile] = useState(false);

  const [clickedConnection, setClickedConnection] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);

  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id")?.toString()
  );

  const authContext = useContext(AuthContext);

  const history = useHistory();

  const buttonRef = React.createRef();

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [selectedColumn, setSelectedColumn] = useState(0);
  const [columnsBox, setColumnsBox] = useState();
  const [columnsBox2, setColumnsBox2] = useState();
  const [fileType, setFileType] = useState();

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

  const handleChange5 = (event) => {
    setSelectedDatasource(true);
    setAge(event.target.value);
  };

  const handleClose5 = () => {
    setOpen(false);
  };

  const handleOpen5 = () => {
    setOpen(true);
  };

  function openModal(typeId) {
    console.log("MainTypeId", typeId);
    setClickedConnection(false);
    setConnectionType(typeId);
    localStorage.setItem("MainConnectionId", typeId);
    setIsOpen(true);
    setConnectionName("");
    setHost("");
    setPort("");
    setUsername("");
    setPassword("");
    setSchema("");
    setaccessToken("");
    setClientId("");
    setclientSecret("");
    setsubScriptionId("");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setConnectionType(0);
    setIsOpen(false);
  }
  Modal.setAppElement(document.getElementById("root"));

  const handleChange = (event, newValue) => {
    console.log("CCC", newValue, allSections[newValue].id);
    getSectionCategories(allSections[newValue].id);
    setValue(newValue);
  };

  const MyComponent = (props) => {
    // useEffect(() => {
    //   console.log('changed!!', props.data)
    // }, [props.data])
    return (
      <div
        style={{
          top: editColumn ? "60px" : "100px",
          position: "relative",
          width: window.innerWidth / 2.4,
          height: isScreen1
            ? window.innerHeight / 1.4
            : window.innerHeight / 1.6,
          overflow: "scroll",
          marginLeft: "20px",
        }}
      >
        <Spreadsheet
          data={props.data && props.data}
          row={{ backgroundColor: "red" }}
        />
      </div>
    );
  };
  const inputOptions = {
    section1: [
      {
        title: "Access",
        subtitle: "File",
        image: "/Access.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Excel",
        subtitle: "File",
        image: "/Excel.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "JSON",
        subtitle: "File",
        image: "/JSON.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Text/CSV",
        subtitle: "File",
        image: "/CSV.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "XML",
        subtitle: "File",
        image: "/xml.png",
        onpress: () => {
          openModal();
        },
      },
    ],
    section3: [
      {
        title: "IBM DB2 database",
        subtitle: "Database",
        image: "/IBMDB2.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Oracle database",
        subtitle: "Database",
        image: "/oracleDB.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "PostgreSQL database",
        subtitle: "Database",
        image: "/postgreSQL.png",
        onpress: () => {
          openModal();
          setConnectionType(2);
        },
      },
      {
        title: "SQL Server database",
        subtitle: "Database",
        image: "/sqlserver.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "MySQL database",
        subtitle: "Database",
        image: "/MySQL.png",
        onpress: () => {
          openModal();
          setConnectionType(1);
        },
      },
    ],
    section4: [
      {
        title: "Power BI dataflows",
        subtitle: "Power BI",
        image: "/dataflow.png",
        onpress: () => {
          openModal();
        },
      },
    ],
    section5: [
      {
        title: "Azure Blobs",
        subtitle: "Azure",
        image: "/azure.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Azure SQL Data Warehouse",
        subtitle: "Azure",
        image: "/azure.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Azure SQL database",
        subtitle: "Azure",
        image: "/azure.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Azure Tables",
        subtitle: "Azure",
        image: "/azure.png",
        onpress: () => {
          openModal();
        },
      },
    ],
    section6: [
      {
        title: "Common Data Service for Apps",
        subtitle: "Online services",
        image: "/dataservice.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Microsoft Exchange Online",
        subtitle: "Online services",
        image: "/exchange.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Salesforce objects",
        subtitle: "Online services",
        image: "/salesforce.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Salesforce reports",
        subtitle: "Online services",
        image: "/salesforce.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Sharepoint online list",
        subtitle: "Online services",
        image: "/sharepoint.png",
        onpress: () => {
          openModal();
        },
      },
    ],

    section7: [
      {
        title: "Odata",
        subtitle: "Other",
        image: "/Odata.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "SharePoint list",
        subtitle: "Other",
        image: "/sharepoint.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Web API",
        subtitle: "Other",
        image: "/web.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Web Page",
        subtitle: "Other",
        image: "/web.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "Blank Table",
        subtitle: "Other",
        image: "/table.png",
        onpress: () => {
          openModal();
        },
      },
      {
        title: "blank Query",
        subtitle: "Other",
        image: "/blankquery.png",
        onpress: () => {
          openModal();
        },
      },
    ],
  };

  const onChange = (event) => {
    setSearch(true);
    setSearchOption(event.target.value);

    console.log(event.target.value);
  };

  // useEffect(() => {
  //   categoryData.push(inputOptions)
  //   setCategories(categoryData)

  //   if (value === 0) {
  //     found = allCategoriesData.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   }
  //   if (value === 1)
  //     found = files.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 2)
  //     found = databases.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 3)
  //     found = azure.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 4)
  //     found = aws.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 5)
  //     found = google.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 6)
  //     found = onlineServices.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )
  //   if (value === 7)
  //     found = other.filter(element =>
  //       element.title.toLowerCase().includes(searchOption.toLowerCase())
  //     )

  //   console.log('searchFound', found)
  //   setSearchArr(found)
  // }, [searchOption])

  // const getSectionCategories = sectionId => {
  //   axios
  //     .post(
  //       configData.API_URL + 'personalAccount/database/sectionwise-category',
  //       {
  //         id: sectionId
  //       },
  //       {}
  //     )
  //     .then(response => {
  //       console.log('sectionWise Category api', response.data)
  //       if (sectionId === 2) setFiles(response.data)
  //       if (sectionId === 3) setDatabases(response.data)
  //       if (sectionId === 4) setAzure(response.data)
  //       if (sectionId === 5) setOnlineServices(response.data)
  //       if (sectionId === 6) setOther(response.data)
  //       if (sectionId === 7) setAws(response.data)
  //       if (sectionId === 8) setGoogle(response.data)
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log(error.message)
  //       }
  //     })
  // }
  // useEffect(() => {
  //   console.log('searchedarrayCHEck', searchArr)
  // }, [searchArr])

  // useEffect(() => {
  //   setSearch(false)
  // }, [searchOption === ''])

  // useEffect(() => {
  //   console.log('ConnectionName', connectionName)
  //   console.log('subscription_id', subscription_id)
  // }, [connectionName])

  // useEffect(() => {
  //   axios
  //     .get(
  //       configData.API_URL + 'personalAccount/database/all-categories',
  //       {},
  //       {}
  //     )
  //     .then(response => {
  //       console.log('allCategories api', response.data)
  //       if (subscription_id === 'price_1LfOlnSBwqDDsny7nprdkWUQ') {
  //         var allbox = response.data.filter(item => item.id === 2)
  //         setAllCategoriesData(allbox)
  //       } else if (subscription_id === 'price_1LfOnUSBwqDDsny71PPaevJ8') {
  //         var allbox = response.data.filter(
  //           item => item.id === 2 || item.id === 3
  //         )
  //         setAllCategoriesData(allbox)
  //       } else if (subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra') {
  //         setAllCategoriesData(response.data)
  //       } else if (subscription_id === 'price_1LfOrRSBwqDDsny7TiYnfuXA') {
  //         setAllCategoriesData(response.data)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log(error.message)
  //       }
  //     })

  //   axios
  //     .get(configData.API_URL + 'personalAccount/database/all-sections', {}, {})
  //     .then(response => {
  //       console.log('allSections api', response.data)
  //       let tsectionBox = response.data

  //       const element = tsectionBox.splice(6, 1)[0]
  //       console.log('ele', element)

  //       tsectionBox.splice(4, 0, element)
  //       console.log('arr', tsectionBox)

  //       const element2 = tsectionBox.splice(7, 1)[0]
  //       console.log('ele', element2)
  //       tsectionBox.splice(5, 0, element2)
  //       console.log('arr', tsectionBox)
  //       if (subscription_id === 'price_1LfOlnSBwqDDsny7nprdkWUQ') {
  //         var DatasourceBox1 = tsectionBox.filter(
  //           item => item.id === 2 || item.id === 1
  //         )
  //         console.log(DatasourceBox1)
  //         setAllSections(DatasourceBox1)
  //         // getSectionCategories(2)
  //       } else if (subscription_id === 'price_1LfOnUSBwqDDsny71PPaevJ8') {
  //         var DatasourceBox1 = tsectionBox.filter(
  //           item => item.id === 3 || item.id === 2 || item.id === 1
  //         )
  //         console.log(DatasourceBox1)
  //         setAllSections(DatasourceBox1)
  //       } else if (subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra') {
  //         setAllSections(response.data)
  //       } else if (subscription_id === 'price_1LfOrRSBwqDDsny7TiYnfuXA') {
  //         setAllSections(response.data)
  //       }
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log(error.message)
  //       }
  //     })
  // }, [])

  // const viewAllConnections = () => {
  //   axios
  //     .post(
  //       configData.API_URL + 'personalAccount/database/connections_viewall',
  //       {
  //         type_id: connectionType,
  //         account_id: accountId
  //       },
  //       {}
  //     )
  //     .then(response => {
  //       console.log('conections', response.data.data)
  //       setAllConnections(response.data.data)
  //       return response.data.data
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log(error.message)
  //       }
  //     })
  // }
  // useEffect(() => {
  //   console.log('connection_typeId', connectionType)
  //   viewAllConnections()
  // }, [modalIsOpen === true])
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
    if (!uploadLocalFile) setData(temp2);
    setDt(temp2);
  };

  useEffect(() => {
    convertDataForDisplay(exampleData2);
  }, []);

  useEffect(() => {
    console.log("sData", data);
  }, [data]);

  const handleListItemClick = (event, index) => {
    setClickedConnection(true);
    // console.log('CHECk  CONN index', index)
    connectionIndex = index;
    localStorage.setItem("ConnectionId", allConnections[connectionIndex].id);
    // console.log('CHECK ConnectionId', localStorage.getItem('ConnectionId'))
    //   console.log('CHECK Connection Data', allConnections[connectionIndex])
    setConnectionName(
      allConnections[connectionIndex].connection_name === null
        ? ""
        : allConnections[connectionIndex].connection_name
    );
    setHost(
      allConnections[connectionIndex].host_name === null
        ? ""
        : allConnections[connectionIndex].host_name
    );
    setPort(
      allConnections[connectionIndex].port === null
        ? null
        : allConnections[connectionIndex].port
    );
    setUsername(
      allConnections[connectionIndex].username === null
        ? ""
        : allConnections[connectionIndex].username
    );
    setPassword(
      allConnections[connectionIndex].password === null
        ? ""
        : allConnections[connectionIndex].password
    );
    setSchema(
      allConnections[connectionIndex].default_schema === null
        ? ""
        : allConnections[connectionIndex].default_schema
    );
    setaccessToken(
      allConnections[connectionIndex].accessToken === null
        ? ""
        : allConnections[connectionIndex].accessToken
    );
    setClientId(
      allConnections[connectionIndex].client_id === null
        ? ""
        : allConnections[connectionIndex].client_id
    );
    setclientSecret(
      allConnections[connectionIndex].client_secret === null
        ? ""
        : allConnections[connectionIndex].client_secret
    );
    setsubScriptionId(
      allConnections[connectionIndex].subscriptionId === null
        ? ""
        : allConnections[connectionIndex].subscriptionId
    );
  };

  const saveConnection = () => {
    console.log("data", connectionType, connectionName, host, port, username);
    axios
      .post(
        configData.API_URL + "personalAccount/database/connection_save",
        {
          connection_type: connectionType,
          connection_name: connectionName,
          host_name: host,
          port: port,
          username: username,
          password: password,
          default_schema: schema,
          account_id: localStorage.getItem("account_id")?.toString(),
          accessToken: accessToken,
          client_id: clientId,
          client_secret: clientSecret,
          subscriptionId: subscriptionId,
        },
        {}
      )
      .then((response) => {
        console.log("Save api", response);
        showStatusAlert(response.data.status, "save");
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

  const deleteConnection = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/connection_delete",
        {
          id: localStorage.getItem("ConnectionId"),
        },
        {}
      )
      .then((response) => {
        console.log("Delete Connection api", response);
        showStatusAlert(response.data.status, "delete");
        // return response
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

  const testConnection = () => {
    console.log("CHECK ID_", allConnections[connectionIndex].id);
    axios
      .post(
        configData.API_URL + "personalAccount/database/connection_test",
        {
          id: localStorage.getItem("ConnectionId"),
          connection_name: connectionName,
          host_name: host,
          port: port,
          username: username,
          password: password,
          default_schema: schema,
        },
        {}
      )
      .then((response) => {
        console.log(
          "test Connection api",
          response.data.status,
          connectionName
        );

        showStatusAlert(response.data.status, "test");
        // return response
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

  const editConnection = () => {
    console.log(
      "->>>",
      typeof localStorage.getItem("ConnectionId")?.toString()
    );
    axios
      .post(
        configData.API_URL + "personalAccount/database/connection_edit",
        {
          id: localStorage.getItem("ConnectionId")?.toString(),
          connection_name: connectionName,
          host_name: host,
          port: port ? port : null,
          username: username,
          password: password,
          default_schema: schema,
          accessToken: accessToken,
          client_id: clientId,
          client_secret: clientSecret,
          subscriptionId: subscriptionId,
        },
        {}
      )
      .then((response) => {
        console.log("Edit connection api", response);
        showStatusAlert(response.data.status, "edit");
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
  const clearText = () => {
    setConnectionName("");
    setHost("");
    setPort(null);
    setUsername("");
    setPassword("");
    setSchema("");
    setaccessToken("");
    setClientId("");
    setclientSecret("");
    setsubScriptionId("");
  };

  const showStatusAlert = (status, mode) => {
    setStatus(status === true ? 1 : 0);
    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 2000);
    setMode(
      mode === "test"
        ? "test"
        : mode === "delete"
        ? "delete"
        : mode === "save"
        ? "save"
        : mode === "edit"
        ? "edit"
        : "none"
    );
  };

  const handleOnFileLoad = (data, fileInfo, originalFile) => {
    console.log("check FileInfo", fileInfo);
    let result;
    let fileInfo1 = fileInfo;
    // setOriginalFile(fileInfo)
    // let filetype = fileInfo.name.substring(
    //   fileInfo.name.length - 4,
    //   fileInfo.name.length
    // )
    let filetype = fileInfo.name.substr(fileInfo.name.indexOf(".") + 1);
    setFileType(filetype);
    console.log("FileType-", filetype, filetype === "xlsx");

    let typeId =
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
    // console.log('FileTypeID-', typeId)
    // setfileimg(typeId)
    global.type_id = typeId;

    // setExpData(false)
    // console.log('----------Data', data)

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
    // setDt(temp)
    // setData(temp)

    result = data.map((e) => e.data);
    console.log("RESULT>", result);
    convertDataForDisplay(result);
    setData(result);

    if (selectedColumn === 1) {
      min = result[1][1];
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] < min) {
          min = result[i][1];
        }
      }
    } else if (selectedColumn === 2) {
      min = result[1][2];
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] < min) {
          min = result[i][2];
        }
      }
    }

    if (selectedColumn === 1) {
      max = result[1][1];
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] > max) {
          max = result[i][1];
        }
      }
    } else if (selectedColumn === 2) {
      max = result[1][2];
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] > max) {
          max = result[i][2];
        }
      }
    }

    let sum = 0;
    var count = 0;
    var j = selectedColumn;
    var num;

    for (let i = 1; i < result.length; i++) {
      num = parseInt(result[i][j]);
      sum = sum + num;
      count++;
    }
    let avg = sum / count;

    var done = false;

    while (!done) {
      done = true;
      for (let i = 2; i < result.length; i += 1) {
        if (result[i - 1][j] > result[i][j]) {
          done = false;
          var tmp = result[i - 1][j];
          result[i - 1][j] = result[i][j];
          result[i][j] = tmp;
        }
      }
    }

    if (global.type_id === 1) {
      // console.log('DATA FORMAT-', result)
      let columns = result.slice(0, 1);
      const C1 = columns[0];
      // console.log('columns-typeId1', C1)
      let columns2 = columns[0];
      columns = columns[0];
      setColumnsBox(columns);
      setColumnsBox2(columns);
    }

    // setTimeout(() => {
    //   history.push({
    //     pathname: '/Widget Dashboard/new_widget/' + global.subscription_id,
    //     state: result
    //   })
    // }, 1600)

    // handleNext()
    // setTimeout(() => {
    //   setnewpg1(false)
    // }, 5000)

    setTimeout(() => {
      setUploadLocalFile(true);
    }, 2000);

    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer appBar={true} />
          <div
            style={{
              width: "91.5%",
              backgroundColor: "#e7e6e5",
              height: "12px",
              marginLeft: "7.7%",
              marginTop: "-2%",
            }}
          ></div>
          <div
            style={{
              width: "93%",
              backgroundColor: "white",
              height: "45px",
              marginLeft: "6.1%",
              marginTop: "4px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
            }}
          >
            {!editColumn && (
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "500",
                  // color: '#A0A0A0',
                  fontFamily: "Trebuchet MS",
                  display: "flex",
                  alignSelf: "flex-start",
                  marginLeft: "8%",
                  position: "relative",
                  top: -35,
                }}
              >
                Smart Ingest
              </div>
            )}
            <div
              style={{
                fontSize: "21px",
                fontWeight: "500",
                color: "#A0A0A0",
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: "8%",
                position: "relative",
                marginLeft: selectedDatasource
                  ? "35%"
                  : selecteddataset
                  ? "36%"
                  : uploadLocalFile
                  ? "35%"
                  : "53%",
                top: -35,
              }}
            >
              {!editColumn ? "You Selected" : ""}
            </div>

            {(selectedDatasource || uploadLocalFile) && (
              <div
                onClick={() => {
                  // if (selecteddataset)
                  //   history.push('/Transform_Data/:' + global.subscription_id)
                  // if (uploadLocalFile)
                  //   history.push({
                  //     pathname: '/Transform_Data/:',
                  //     state: data
                  //   })
                  if (selecteddataset)
                    history.push({
                      pathname: "/Data",
                      state: { data: data, selectedDataset: true },
                    });
                  if (uploadLocalFile)
                    history.push({
                      pathname: "/Data",
                      state: data,
                    });
                  // history.push({'/Transform_Data/:' + global.subscription_id })
                }}
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "white",
                  display: "flex",
                  alignSelf: "flex-start",
                  marginLeft: editColumn ? "46%" : "18%",
                  position: "relative",
                  top: editColumn ? -32 : -35,
                  backgroundColor:
                    selecteddataset || uploadLocalFile ? "#0BAFFF" : "#b4e6fd",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  width: "7vw",
                  justifyContent: "center",
                }}
              >
                Finish
              </div>
            )}
            <div
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#A0A0A0",
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: selecteddataset
                  ? "2%"
                  : (selectedDatasource && !selecteddataset) || uploadLocalFile
                  ? "2%"
                  : "8%",
                position: "relative",
                top: -35,
                cursor: "pointer",
                backgroundColor: "#ebebea",
                height: "35px",
                width: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
              onClick={() => setDatasetAdded(undefined)}
            >
              Cancel
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: editColumn ? "-6%" : "-2%",
              width: "97vw",
              marginLeft: "2%",
            }}
          >
            <div
              style={{
                height: isScreen1 ? "78vw" : "80vw",
                width:
                  !selectedDatasource && !uploadLocalFile ? "60vw" : "45vw",
                marginLeft: "5%",
                backgroundColor: "#ebebea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "4%",
                }}
              >
                <div>
                  {!selectedDatasource && (
                    <div
                      style={{
                        color: "white",
                        position: "absolute",
                        zIndex: selectedDatasource ? 10 : 101,
                        top: isScreen1
                          ? 192
                          : isScreen0
                          ? 206
                          : isScreen2
                          ? 185
                          : 191,
                        left: 180,
                      }}
                    >
                      Select Data Source
                    </div>
                  )}
                  <FormControl
                    sx={{
                      m: 1,
                      marginTop: "10px",
                      marginLeft: "-10px",
                      minWidth: "24vw",
                      maxHeight: "5vh",
                      zIndex: 100,
                    }}
                  >
                    <Select
                      // labelId='demo-controlled-open-select-label'
                      style={{ height: 40, textAlign: "left" }}
                      displayEmpty
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose5}
                      onOpen={handleOpen5}
                      value={age}
                      // label='Select Data Source'
                      onChange={handleChange5}
                      MenuProps={{
                        classes: {
                          paper: { overflowY: "scroll" },
                        },
                      }}
                      sx={
                        age === ""
                          ? {
                              backgroundColor: "#0BAFFF",
                              borderRadius: "10px 10px 0px 0px",
                              //   padding: '10px',
                              //   width: '18%',
                              boxShadow:
                                "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
                              color: "white",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "#C1D9EC",
                              },
                            }
                          : {}
                      }
                    >
                      <MenuItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "#C1D9EC",
                          },
                        }}
                      >
                        <div
                          style={{
                            color: "white",
                            backgroundColor: "#187ab4",
                            borderRadius: "12px",
                            width: "90%",
                            padding: "5px",
                            textAlign: "center",
                          }}
                          value={-1}
                        >
                          Add a new Data source
                        </div>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "#C1D9EC",
                          },
                        }}
                        value={10}
                      >
                        Oracle
                      </MenuItem>
                      <MenuItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "#C1D9EC",
                          },
                        }}
                        value={20}
                      >
                        MySQL
                      </MenuItem>
                      <MenuItem
                        sx={{
                          "&:hover": {
                            backgroundColor: "#C1D9EC",
                          },
                        }}
                        value={30}
                      >
                        Amazon S3
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  style={{
                    marginRight: "20px",
                    marginLeft: "16px",
                    marginTop: "5px",
                  }}
                >
                  or
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: "5px",
                  }}
                >
                  <AddIcon sx={{ color: "#067AB4" }} />
                  {/* <div
                  style={{
                    color: '#9bc1e2',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginLeft: '6px'
                  }}
                >
                  Upload Local File
                </div> */}
                  <div style={{ position: "relative", top: "35px" }}>
                    <CSVReader
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
                            display: "flex",
                            flexDirection: "row",
                            // marginBottom: 10
                          }}
                        >
                          <div
                            style={{
                              color: "#9bc1e2",
                              fontWeight: "700",
                              cursor: "pointer",
                              marginLeft: "6px",
                              width: "260px",
                            }}
                            onClick={(e) => {
                              handleOpenDialog(e);
                            }}
                            // onClick={() => setnewpg1(false)}
                          >
                            Upload Local File
                          </div>
                          <div
                            style={{
                              height: 45,
                              overflow: "hidden",
                              lineHeight: 2.5,
                              marginTop: 45,
                              marginBottom: 5,
                              paddingLeft: 13,
                              paddingTop: 5,
                              width: "90%",
                              position: "relative",
                              left: "-75%",
                            }}
                          >
                            {file ? file.name : ""}
                          </div>
                        </div>
                      )}
                    </CSVReader>
                  </div>
                </div>
              </div>
              {selecteddataset && (
                <div
                  style={{
                    color: "#9bc1e2",
                    marginTop: "20px",
                    marginBottom: "6px",
                    textAlign: "left",
                    marginLeft: "3%",
                  }}
                >
                  MySQL
                </div>
              )}
              {selectedDatasource && (
                <List
                  sx={{
                    marginTop: "2%",
                    marginLeft: "3%",
                    width: "100%",
                    maxWidth: "42vw",
                    bgcolor: "white",
                    height: selecteddataset ? "60vh" : "100%",
                    overflowY: "scroll",
                    marginBottom: "10px",
                  }}
                >
                  {datasets.map((value) => (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <ListItemButton>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor:
                                value.id == datasetAdded
                                  ? "#067AB4"
                                  : "#e7e6e5",
                              padding: "12px",
                              borderRadius: "14px",
                              color:
                                value.id == datasetAdded ? "white" : "white",
                              height: "26px",
                              width: "112px",
                            }}
                            onClick={() => {
                              console.log("OOOO", value.id);
                              setDatasetAdded(value.id);
                              setDatasetName(value.name);
                              setSelectedDataset(true);
                            }}
                          >
                            {value.id != datasetAdded && (
                              <AddIcon fontSize="small" />
                            )}
                            <div
                              style={{
                                fontSize: "15px",
                                marginLeft: "8px",
                                marginRight: "8px",
                              }}
                            >
                              Select
                            </div>
                            {value.id != datasetAdded && (
                              <TextSnippetIcon fontSize="small" />
                            )}
                          </div>
                        </ListItemButton>
                      }
                    >
                      <ListItemText primary={`${value?.name}`} />
                    </ListItem>
                  ))}
                </List>
              )}
              {selecteddataset && (
                <div
                  style={{
                    height: "45vh",
                    width: "42vw",
                    marginLeft: "9%",
                    marginTop: "6%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 10,
                      height: 50,
                    }}
                  >
                    <div
                      style={{
                        border: "1px lightgray",
                        fontSize: "21px",
                        fontWeight: "500",
                        color: "#A0A0A0",
                      }}
                    >
                      {"Your options for"}
                    </div>
                    <div
                      style={{
                        border: "1px lightgray",
                        fontSize: "21px",
                        fontWeight: "500",
                        color: "#A0A0A0",
                        marginLeft: 5,
                      }}
                    >
                      {datasetName}
                    </div>
                  </div>
                  <div style={{ marginLeft: "-24%" }}>
                    <TextField
                      style={{ width: "30vw" }}
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      value={datasetName}
                      onChange={(e) => setDatasetName(e.target.value)}
                    />
                    <TextField
                      style={{ width: "30vw", marginTop: 20 }}
                      id="standard-basic"
                      label="Description"
                      variant="standard"
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                        marginLeft: "10px",
                      }}
                    >
                      <div>
                        <Box
                          sx={{
                            maxHeight: 20,
                            // position: 'relative'
                            // marginTop: 7
                          }}
                        >
                          <FormControl style={{ width: 200 }}>
                            <InputLabel id="demo-simple-select-label">
                              Character Encoding
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={age}
                              label="Age"
                              size="small"
                              onChange={handleChange}
                            >
                              <MenuItem value={10}>UTF-8</MenuItem>
                              <MenuItem value={20}>UTF-16</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div>
                        <TextField
                          style={{
                            width: "16vw",
                            marginLeft: "20px",
                            marginTop: "10px",
                            // position: 'relative'
                            // top: 20
                          }}
                          id="standard-basic"
                          label="Rows to process for schema"
                          variant="standard"
                          value={1000}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        marginLeft: "-32%",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxHeight: 20,
                          marginTop: 7,
                          marginBottom: 5,
                        }}
                      >
                        <FormControl style={{ width: 200 }}>
                          <InputLabel id="demo-simple-select-label">
                            Tags
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            size="small"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                marginTop: !selecteddataset ? 0 : 0,
                height: isScreen1 ? "78vw" : "80vw",
                width:
                  !selectedDatasource && !uploadLocalFile ? "30vw" : "46vw",
                backgroundColor: "#ebebea",
              }}
            >
              {selectedDatasource && !selecteddataset && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    top: "27%",
                    fontSize: "16px",
                  }}
                >
                  No Selections Yet.
                </div>
              )}
              {(selecteddataset || uploadLocalFile) && (
                <>
                  <div
                    style={{
                      height: "56vh",
                      width: "44.5vw",
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      top:
                        datasetAdded === undefined && !uploadLocalFile
                          ? -75
                          : editColumn
                          ? 45
                          : uploadLocalFile
                          ? 5
                          : 0,
                      justifyContent: "flex-start",
                      textAlign: "left",
                      marginTop: "1%",
                      marginLeft: "1%",
                    }}
                  >
                    <div style={{ marginTop: 10, marginLeft: 20 }}>
                      Total Datasets: 1
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "space-around",
                        position: "relative",
                        top: editColumn ? 15 : 0,
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "80%",
                          marginTop: 10,
                          padding: 5,
                          backgroundColor: "#e7e6e5",
                          borderRadius: "10px",
                          marginLeft: "10px",
                          textAlign: "center",
                          marginLeft: "24px",
                        }}
                      >
                        {/* JSON : */}
                        {global.type_id === 1
                          ? "CSV :"
                          : global.type_id === 2
                          ? "Excel :"
                          : global.type_id === 3
                          ? "Xml :"
                          : global.type_id === 4
                          ? "JSON :"
                          : global.type_id === 6
                          ? "Pdf :"
                          : global.type_id === 7
                          ? "Parquet :"
                          : "JSON :"}
                      </div>
                      <div
                        style={{
                          width: "60%",
                          // backgroundColor: '#D7E6F3',
                          marginTop: 10,
                          marginLeft: "10px",
                        }}
                      >
                        {datasetName}
                      </div>
                      <div
                        style={{
                          width: "20%",
                          // backgroundColor: '#D7E6F3',
                          marginTop: 10,
                          marginRight: "-50px",
                        }}
                      >
                        1 MB
                      </div>
                    </div>
                  </div>
                </>
              )}
              {((selectedDatasource &&
                selecteddataset &&
                datasetAdded &&
                !editColumn) ||
                (uploadLocalFile && !editColumn)) && (
                <>
                  <MyComponent data={uploadLocalFile ? dt : data && data} />
                  {selecteddataset && !editColumn && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "115px",
                        marginLeft: "76%",
                        height: "30px",
                        width: "115px",
                        backgroundColor: "lightgray",
                        borderRadius: "12px",
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        cursor: "pointer",
                      }}
                    >
                      <ViewWeekIcon fontSize="small" sx={{ color: "gray" }} />
                      <div style={{}} onClick={() => setEditColumn(true)}>
                        Edit Columns
                      </div>
                    </div>
                  )}
                </>
              )}

              {editColumn && (
                <div>
                  <div
                    style={
                      {
                        // height: '28vh',
                        // width: '10vw',
                        // position: 'relative',
                        // marginTop: 180
                      }
                    }
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "70px",
                        marginLeft: "12%",
                      }}
                    >
                      {editColumn && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40px",
                            width: "85px",
                            backgroundColor: "#C1D9EC",
                            borderRadius: "12px",
                            fontSize: "13px",
                            padding: 15,
                            marginTop: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => setEditColumn(false)}
                        >
                          Show Preview
                        </div>
                      )}

                      {editColumn && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "20px",
                          }}
                        >
                          <div>
                            <Box
                              sx={{
                                maxHeight: 20,
                                marginTop: 5,
                                marginBottom: 5,
                              }}
                            >
                              <FormControl style={{ width: 120 }}>
                                <InputLabel
                                  id="demo-simple-select-label"
                                  style={{ color: "blue" }}
                                >
                                  All Columns
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Age"
                                  size="small"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                          <div style={{ marginLeft: 8 }}>
                            <Box
                              sx={{
                                maxHeight: 20,
                                marginTop: 5,
                                marginBottom: 5,
                              }}
                            >
                              <FormControl style={{ width: 120, height: 10 }}>
                                <InputLabel id="demo-simple-select-label">
                                  All Types
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Age"
                                  size="small"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                        </div>
                      )}
                    </div>

                    <MyComponent data={data && data} />
                  </div>
                </div>
              )}

              {/* {selecteddataset && !editColumn && (
              <div
                style={{
                  padding: 5,
                  height: '30px',
                  width: '20%',
                  position: 'relative',
                  top: 80,
                  backgroundColor: 'lightgray',
                  borderRadius: '12px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '78%',
                  cursor: 'pointer',
                  marginBottom: 50
                }}
                onClick={() => setEditColumn(true)}
              >
                Edit Columns
              </div>
            )} */}
            </div>
          </div>
        </>
      ) : (
        history.push("/Login")
      )}
    </>
  );
}
