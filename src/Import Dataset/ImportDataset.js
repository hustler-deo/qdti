import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MiniDrawer from "../MiniDrawer";
import Modal from "react-modal";

import Modal2 from "@mui/material/Modal";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

import BuildIcon from "@mui/icons-material/Build";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CableIcon from "@mui/icons-material/Cable";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import configData from "../config.json";
import { AuthContext } from "../context";

const customStyles = {
  content: {
    top: "50%",
    left: "53%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: 520,
    width: window.innerWidth / 1.1,
    fontFamily: "Arial",
    border: "1px solid #0c0c0c",
  },
};

const modalstyle3 = {
  position: "relative",
  top: "30%",
  left: "34%",
  // transform: 'translate(-50%, -50%)',
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height: 180,
  width: 440,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  borderRadius: "4px",
};

export default function ImportDataset(props) {
  let found = [];
  let searchArray = [];
  let categoryData = [];

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
  var connectionIndex = 0;

  const { subscription_id } = useParams();
  let fileInfo;
  const [subscriptionId1, setsubScriptionId1] = useState("");
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
  const [datasets, setDatasets] = useState([]);

  const [clickedConnection, setClickedConnection] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);

  const [columnsBox, setColumnsBox] = useState();
  const [columnsBox2, setColumnsBox2] = useState();
  const [fileType, setFileType] = useState();

  const [exportModal, setExportModal] = useState(false);
  const [orignalFile, setOriginalFile] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(0);

  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id").toString()
  );
  const [openDialog, setOpenDialog] = useState(false);

  const [clickedEdit, setClickedEdit] = useState(false);
  const [dataSources, setDatasources] = useState([]);

  const [rowsData, setrowsData] = React.useState();
  const [columnData, setColumnData] = React.useState();

  const authContext = useContext(AuthContext);

  const history = useHistory();

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

  const handleOnFileLoad = (data, fileInfo, originalFile) => {
    console.log("check FileInfo", fileInfo);
    setOpenDialog(true);
    let result;
    let fileInfo1 = fileInfo;
    setOriginalFile(fileInfo);
    fileInfo = fileInfo;
    // let filetype = fileInfo.name.substring(
    //   fileInfo.name.length - 4,
    //   fileInfo.name.length
    // )
    let filetype = fileInfo.name.substr(fileInfo.name.indexOf(".") + 1);
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
    // console.log('RESULT1>', temp)
    // let rcc = temp.map(e => console.log('ee', e))
    // console.log('RESULT1232>', rcc)
    let box2 = [];
    temp.map((e) => {
      let box = [];
      // console.log('woo', e)
      e.map((e2) => {
        box.push(e2.value);
      });
      box2.push(box);
    });
    // console.log('RESULT1>', data, box2)
    result = box2;
    // let red = data.map(e => e.data)
    // result = red
    // console.log('RESULT>', red)
    // result = red

    // if (selectedColumn === 1) {
    //   min = result[1][1]
    //   for (let i = 1; i < result.length; i++) {
    //     if (result[i][1] < min) {
    //       min = result[i][1]
    //     }
    //   }
    // } else if (selectedColumn === 2) {
    //   min = result[1][2]
    //   for (let i = 1; i < result.length; i++) {
    //     if (result[i][2] < min) {
    //       min = result[i][2]
    //     }
    //   }
    // }

    // if (selectedColumn === 1) {
    //   max = result[1][1]
    //   for (let i = 1; i < result.length; i++) {
    //     if (result[i][1] > max) {
    //       max = result[i][1]
    //     }
    //   }
    // } else if (selectedColumn === 2) {
    //   max = result[1][2]
    //   for (let i = 1; i < result.length; i++) {
    //     if (result[i][2] > max) {
    //       max = result[i][2]
    //     }
    //   }
    // }

    // let sum = 0
    // var count = 0
    // var j = selectedColumn
    // var num

    // for (let i = 1; i < result.length; i++) {
    //   num = parseInt(result[i][j])
    //   sum = sum + num
    //   count++
    // }
    // let avg = sum / count

    // var done = false

    // while (!done) {
    //   done = true
    //   for (let i = 2; i < result.length; i += 1) {
    //     if (result[i - 1][j] > result[i][j]) {
    //       done = false
    //       var tmp = result[i - 1][j]
    //       result[i - 1][j] = result[i][j]
    //       result[i][j] = tmp
    //     }
    //   }
    // }

    if (global.type_id === 1) {
      console.log("DATA FORMAT-", result);
      let data = [...result];
      let columns = data.slice(0, 1);
      const C1 = columns[0];
      // console.log('columns-typeId1', C1)
      let columns2 = columns[0];
      columns = columns[0];
      setColumnsBox(columns);
      setColumnsBox2(columns);
    }
    console.log("props?.fromFlow?", props?.fromFlow, fileInfo);
    if (props?.fromFlow) {
      props.getFileData(result, fileInfo);
    } else {
      setTimeout(() => {
        console.log("before widget>", result);
        history.push({
          pathname: "/Widget Dashboard/new_widget/" + global.subscription_id,
          state: result,
          new: true,
        });
      }, 1600);
    }

    // handleNext()
    // setTimeout(() => {
    //   setnewpg1(false)
    // }, 5000)

    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const onChange = (event) => {
    setSearch(true);
    setSearchOption(event.target.value);

    console.log(event.target.value);
  };

  // useEffect(()=> {
  //   viewAllDatasource()
  // },[])

  useEffect(() => {
    if (searchOption === "") setSearch(false);
  }, [searchOption]);

  useEffect(() => {
    categoryData.push(inputOptions);
    setCategories(categoryData);

    if (value === 0) {
      found = allCategoriesData.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    }
    if (value === 1)
      found = files.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 2)
      found = databases.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 3)
      found = azure.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 4)
      found = aws.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 5)
      found = google.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 6)
      found = onlineServices.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );
    if (value === 7)
      found = other.filter((element) =>
        element.title.toLowerCase().includes(searchOption.toLowerCase())
      );

    console.log("searchFound", found);
    setSearchArr(found);
  }, [searchOption]);

  const storeDatasourceResult = (mode, datasetID) => {
    let result;
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_datasource_result",
        mode === 2
          ? {
              datasource_id: databases[0].id.toString(),
            }
          : {
              datasource_id: datasetID,
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
          // console.log("Using Dataset", dataset);
          const array6 = Object.keys(abc[0]);
          const array7 = abc.map((obj) => Object.values(obj));
          console.log("DATASET DATA>", array6, array7);
          array7.unshift(array6);
          result = array7;
          // columns = array6;
          // columns2 = array6;
          setColumnsBox(array6);
          setColumnsBox2(array6);

          if (props?.fromFlow) {
            // console.log("Existing Data", array7);
            setOpenDialog(true);
            props?.getDatasetData(array7);
            // setOpenDialog(false);
          } else {
            // console.log("before widget>", result);
            history.push({
              pathname:
                "/Widget Dashboard/new_widget/" + global.subscription_id,
              state: array7,
              new: true,
            });
          }

          // if (dataset === 1) {
          //   dataset1 = result;
          // }

          // if (dataset === 2) {
          //   dataset2 = result;
          // }
          // console.log("DATA.C.", columns);
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
        setDatasources(response.data.data);
        // databases = response.data.data;
        //  console.log('daaaaaa', databases[0].id)
        // storeDatasourceResult("e", 2);
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

  const getSectionCategories = (sectionId) => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/sectionwise-category",
        {
          id: sectionId,
        },
        {}
      )
      .then((response) => {
        console.log("sectionWise Category api", sectionId === 2, response.data);
        if (sectionId === 2) setFiles(response.data);
        if (sectionId === 3) setDatabases(response.data);
        if (sectionId === 4) setAzure(response.data);
        if (sectionId === 5) setOnlineServices(response.data);
        if (sectionId === 6) setOther(response.data);
        if (sectionId === 7) setAws(response.data);
        if (sectionId === 8) setGoogle(response.data);
        if (sectionId == 9) viewAllDatasource();
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
    console.log("searchedarrayCHEck", searchArr);
  }, [searchArr]);

  useEffect(() => {
    console.log("ConnectionName", connectionName);
    console.log("subscription_id", subscription_id);
  }, [connectionName]);

  useEffect(() => {
    // console.log('AccountId-', localStorage.getItem('account_id')?.toString())
    console.log("ooooo", props?.subscription_id);
    if (subscription_id === undefined)
      setsubScriptionId1(props?.subscription_id);
    else setsubScriptionId1(subscription_id);
  }, []);

  useEffect(() => {
    axios
      .get(
        configData.API_URL + "personalAccount/database/all-categories",
        {},
        {}
      )
      .then((response) => {
        console.log("allCategories api", response.data);
        if (subscriptionId1 === "price_1LfOlnSBwqDDsny7nprdkWUQ") {
          var allbox = response.data.filter((item) => item.id === 2);
          setAllCategoriesData(allbox);
        } else if (subscriptionId1 === "price_1LfOnUSBwqDDsny71PPaevJ8") {
          var allbox = response.data.filter(
            (item) => item.id === 2 || item.id === 3
          );
          setAllCategoriesData(allbox);
        } else if (subscriptionId1 === "price_1LfOpESBwqDDsny7sB1s8fra") {
          setAllCategoriesData(response.data);
        } else if (subscriptionId1 === "price_1LfOrRSBwqDDsny7TiYnfuXA") {
          setAllCategoriesData(response.data);
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

    axios
      .get(configData.API_URL + "personalAccount/database/all-sections", {}, {})
      .then((response) => {
        console.log("allSections api", response.data);
        let tsectionBox = response.data;

        const element = tsectionBox.splice(6, 1)[0];
        console.log("ele", element);

        tsectionBox.splice(4, 0, element);
        console.log("arr", tsectionBox);

        const element2 = tsectionBox.splice(7, 1)[0];
        console.log("ele", element2);
        tsectionBox.splice(5, 0, element2);
        console.log("arr", tsectionBox);
        if (subscriptionId1 === "price_1LfOlnSBwqDDsny7nprdkWUQ") {
          var DatasourceBox1 = tsectionBox.filter(
            (item) => item.id === 2 || item.id === 1
          );
          console.log(DatasourceBox1);
          setAllSections(DatasourceBox1);
          // getSectionCategories(2)
        } else if (subscriptionId1 === "price_1LfOnUSBwqDDsny71PPaevJ8") {
          var DatasourceBox1 = tsectionBox.filter(
            (item) => item.id === 3 || item.id === 2 || item.id === 1
          );
          console.log(DatasourceBox1);
          setAllSections(DatasourceBox1);
        } else if (subscriptionId1 === "price_1LfOpESBwqDDsny7sB1s8fra") {
          console.log("HHHH", response.data);
          let sections = response.data;
          sections.push({
            id: "9",
            name: "Existing Datasets",
          });

          setAllSections(sections);
        } else if (subscriptionId1 === "price_1LfOrRSBwqDDsny7TiYnfuXA") {
          setAllSections(response.data);
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
  }, [subscriptionId1]);

  const viewAllConnections = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/connections_viewall",
        {
          type_id: connectionType,
          account_id: accountId,
        },
        {}
      )
      .then((response) => {
        console.log("conections", response.data.data);
        setAllConnections(response.data.data);
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
  };
  useEffect(() => {
    console.log("connection_typeId", connectionType);
    viewAllConnections();
  }, [modalIsOpen === true]);

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

  const setUpDataForGrid = (data) => {
    console.log("check dtata", data);
    let columns = data[0];
    console.log("check ccc", columns);
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
          account_id: localStorage.getItem("account_id").toString(),
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
        setClickedNew(false);
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
    console.log("->>>", typeof localStorage.getItem("ConnectionId").toString());
    axios
      .post(
        configData.API_URL + "personalAccount/database/connection_edit",
        {
          id: localStorage.getItem("ConnectionId").toString(),
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
        setClickedEdit(false);
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
    setPort("");
    setUsername("");
    setPassword("");
    setSchema("");
    setaccessToken("");
    setClientId("");
    setclientSecret("");
    setsubScriptionId("");
  };

  const handleClose = () => {
    setOpenDialog(selectedValue);
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

  const openUpload = (Id) => {
    setFileType(Id);
    setExportModal(true);
  };

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div style={{ marginTop: "-100px" }}>
            {props?.fromFlow && (
              <div
                style={{
                  textAlign: "left",
                  color: "#4D4D4D",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  marginLeft: "18px",
                }}
              >
                Get Data
              </div>
            )}
            <div
              style={{
                backgroundColor: props?.fromFlow && "#C1D9EC",
                width: props?.fromFlow && "97%",
                // margin: "0px auto",
                border: props?.fromFlow && "0.7px solid rgba(0, 0, 0, 0.8)",
                borderRadius: props?.fromFlow && "10px",
                // marginTop: "-80px",
              }}
            >
              <div
                style={{
                  border: props?.fromFlow
                    ? "0.7px solid rgba(0, 0, 0, 0.8)"
                    : "none",
                  width: props?.fromFlow && "95%",
                  backgroundColor: props?.fromFlow && "white",
                  // marginTop: -105,
                  margin: props?.fromFlow && "20px auto",
                }}
              >
                <div
                  style={{
                    marginLeft: props?.fromFlow ? 0 : 100,
                    height: "100%",
                    width: props?.fromFlow ? "100%" : "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                  }}
                >
                  {props?.fromFlow === undefined && (
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 20,
                        height: 160,
                        width: "100%",
                        backgroundImage: "url('/bg-header.png')",
                        backgroundPosition: "right",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        textAlign: "left",
                        color: "#494a49",
                      }}
                    >
                      <h2
                        style={{
                          width: "100%",
                          paddingTop: "30px",
                          fontFamily: "Trebuchet MS",
                        }}
                      >
                        CHOOSE DATA SOURCE
                      </h2>
                      <p>
                        You can connect with your favorite data source from our
                        150+ data connectors mentioned below, <br />
                        This empowers our users to get data from any data
                        sources and utilize them for visualization and creating
                        dashboards.
                      </p>
                    </div>
                  )}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      backgroundColor: props?.fromFlow ? "white" : "white",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "130vh",
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        variant="scrollable"
                        scrollButtons="auto"
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#0BAFFF",
                          },
                        }}
                        sx={{ color: "black" }}
                      >
                        {allSections[0] &&
                          allSections.map((row, index) => (
                            <Tab
                              sx={{
                                fontSize: "12px",
                                color: "black",
                              }}
                              label={row.name}
                            />
                          ))}
                      </Tabs>
                    </Box>

                    <div
                      style={{
                        flex: 1,
                        float: "right",
                        marginLeft: "10px",
                        marginRight: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        style={{
                          // marginRight: '10px',
                          height: 38,
                          marginTop: 8,
                          border: "0.5px solid grey",
                          backgroundColor: "#F2F1F9",
                          width: "200px",
                          padding: "10px",
                          fontSize: 14,
                          outline: "none",
                          borderRadius: "14px",
                          fontFamily: "Trebuchet MS",
                          paddingLeft: "20px",
                          position: "absolute",
                          right: "6%",
                        }}
                        type="text"
                        placeholder="Search here"
                        onChange={onChange}
                        value={searchOption}
                      />
                      <SearchIcon
                        sx={{
                          position: "absolute",
                          right: "6%",
                          mt: "5px",
                          mr: "10px",
                        }}
                      />
                    </div>
                  </Box>

                  <div
                    style={{
                      marginTop: 15,
                      width: "100%",
                      maxWidth: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      // height: 700,
                      color: "#FFF",
                      backgroundColor: props?.fromFlow ? "white" : "white",
                      verticalAlign: "top",
                      marginLeft: props?.fromFlow ? 10 : 0,
                    }}
                  >
                    {!search
                      ? value === 0 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {allCategoriesData[0] &&
                              allCategoriesData.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    // height: 260,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>

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
                                          marginBottom: 10,
                                        }}
                                      >
                                        {/* <div
                          style={{
                            minWidth: '140px',
                            background: '#0aafff',
                            border: '0.839161px solid #DEC7C7',
                            color: 'white',
                            fontWeight: '600',
                            height: '40px',
                            boxShadow:
                              '(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: 8,
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onClick={e => {
                            handleOpenDialog(e)
                          }}
                        > */}

                                        <CableIcon
                                          onClick={(e) => {
                                            row.connection_type_id === 1
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 2
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 3
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 4
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 6
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 7
                                              ? handleOpenDialog(e)
                                              : openModal(
                                                  row.connection_type_id
                                                );

                                            console.log(
                                              "Pressed!",
                                              row.connection_type_id
                                            );
                                          }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            color: "grey",
                                            float: "left",
                                            marginTop: 10,
                                          }}
                                        />
                                        {/* Upload{' '} */}
                                        {/* {fileType === 1
                                          ? 'CSV'
                                          : fileType === 2
                                          ? 'Excel'
                                          : fileType === 3
                                          ? 'Xml'
                                          : fileType === 4
                                          ? 'JSON'
                                          : fileType === 6
                                          ? 'Pdf'
                                          : fileType === 7
                                          ? 'Parquet'
                                          : 'FILE'} */}
                                        {/* </div> */}
                                        {/* <div
                                          style={{
                                            height: 45,
                                            // overflow: 'hidden',
                                            lineHeight: 2.5,
                                            marginTop: 35,
                                            marginBottom: 5,
                                            paddingLeft: 13,
                                            paddingTop: 3,
                                            width: '90%',
                                          }}
                                        >
                                          {file ? file.name : ''}
                                        </div> */}
                                      </div>
                                    )}
                                  </CSVReader>
                                </div>
                              ))}
                          </div>
                        )
                      : value === 0 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
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
                                          marginBottom: 10,
                                        }}
                                      >
                                        {/* <div
                          style={{
                            minWidth: '140px',
                            background: '#0aafff',
                            border: '0.839161px solid #DEC7C7',
                            color: 'white',
                            fontWeight: '600',
                            height: '40px',
                            boxShadow:
                              '(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: 8,
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onClick={e => {
                            handleOpenDialog(e)
                          }}
                        > */}

                                        <CableIcon
                                          onClick={(e) => {
                                            row.connection_type_id === 1
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 2
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 3
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 4
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 6
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 7
                                              ? handleOpenDialog(e)
                                              : openModal(
                                                  row.connection_type_id
                                                );

                                            console.log(
                                              "Pressed!",
                                              row.connection_type_id
                                            );
                                          }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            color: "grey",
                                            float: "left",
                                            marginTop: 10,
                                          }}
                                        />
                                        {/* Upload{' '} */}
                                        {/* {fileType === 1
                                          ? 'CSV'
                                          : fileType === 2
                                          ? 'Excel'
                                          : fileType === 3
                                          ? 'Xml'
                                          : fileType === 4
                                          ? 'JSON'
                                          : fileType === 6
                                          ? 'Pdf'
                                          : fileType === 7
                                          ? 'Parquet'
                                          : 'FILE'} */}
                                        {/* </div> */}
                                        {/* <div
                                          style={{
                                            height: 45,
                                            // overflow: 'hidden',
                                            lineHeight: 2.5,
                                            marginTop: 35,
                                            marginBottom: 5,
                                            paddingLeft: 13,
                                            paddingTop: 3,
                                            width: '90%',
                                          }}
                                        >
                                          {file ? file.name : ''}
                                        </div> */}
                                      </div>
                                    )}
                                  </CSVReader>
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 1 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {files[0] &&
                              files.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
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
                                          marginBottom: 10,
                                        }}
                                      >
                                        {/* <div
                          style={{
                            minWidth: '140px',
                            background: '#0aafff',
                            border: '0.839161px solid #DEC7C7',
                            color: 'white',
                            fontWeight: '600',
                            height: '40px',
                            boxShadow:
                              '(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: 8,
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onClick={e => {
                            handleOpenDialog(e)
                          }}
                        > */}

                                        <CableIcon
                                          onClick={(e) => {
                                            row.connection_type_id === 1
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 2
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 3
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 4
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 6
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 7
                                              ? handleOpenDialog(e)
                                              : openModal(
                                                  row.connection_type_id
                                                );

                                            console.log(
                                              "Pressed!",
                                              row.connection_type_id
                                            );
                                          }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            color: "grey",
                                            float: "left",
                                            marginTop: 10,
                                          }}
                                        />
                                        {/* Upload{' '} */}
                                        {/* {fileType === 1
                                          ? 'CSV'
                                          : fileType === 2
                                          ? 'Excel'
                                          : fileType === 3
                                          ? 'Xml'
                                          : fileType === 4
                                          ? 'JSON'
                                          : fileType === 6
                                          ? 'Pdf'
                                          : fileType === 7
                                          ? 'Parquet'
                                          : 'FILE'} */}
                                        {/* </div> */}
                                        {/* <div
                                          style={{
                                            height: 45,
                                            // overflow: 'hidden',
                                            lineHeight: 2.5,
                                            marginTop: 35,
                                            marginBottom: 5,
                                            paddingLeft: 13,
                                            paddingTop: 3,
                                            width: '90%',
                                          }}
                                        >
                                          {file ? file.name : ''}
                                        </div> */}
                                      </div>
                                    )}
                                  </CSVReader>
                                </div>
                              ))}
                          </div>
                        )
                      : value === 1 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
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
                                          marginBottom: 10,
                                        }}
                                      >
                                        {/* <div
                          style={{
                            minWidth: '140px',
                            background: '#0aafff',
                            border: '0.839161px solid #DEC7C7',
                            color: 'white',
                            fontWeight: '600',
                            height: '40px',
                            boxShadow:
                              '(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: 8,
                            fontSize: '14px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onClick={e => {
                            handleOpenDialog(e)
                          }}
                        > */}

                                        <CableIcon
                                          onClick={(e) => {
                                            row.connection_type_id === 1
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 2
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 3
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 4
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 6
                                              ? handleOpenDialog(e)
                                              : row.connection_type_id === 7
                                              ? handleOpenDialog(e)
                                              : openModal(
                                                  row.connection_type_id
                                                );

                                            console.log(
                                              "Pressed!",
                                              row.connection_type_id
                                            );
                                          }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            color: "grey",
                                            float: "left",
                                            marginTop: 10,
                                          }}
                                        />
                                        {/* Upload{' '} */}
                                        {/* {fileType === 1
                                          ? 'CSV'
                                          : fileType === 2
                                          ? 'Excel'
                                          : fileType === 3
                                          ? 'Xml'
                                          : fileType === 4
                                          ? 'JSON'
                                          : fileType === 6
                                          ? 'Pdf'
                                          : fileType === 7
                                          ? 'Parquet'
                                          : 'FILE'} */}
                                        {/* </div> */}
                                        {/* <div
                                          style={{
                                            height: 45,
                                            // overflow: 'hidden',
                                            lineHeight: 2.5,
                                            marginTop: 35,
                                            marginBottom: 5,
                                            paddingLeft: 13,
                                            paddingTop: 3,
                                            width: '90%',
                                          }}
                                        >
                                          {file ? file.name : ''}
                                        </div> */}
                                      </div>
                                    )}
                                  </CSVReader>
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 2 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {databases &&
                              databases.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 2 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 3 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              flexFlow: "wrap",
                            }}
                          >
                            {azure[0] &&
                              azure.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",

                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 3 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",

                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 6 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {onlineServices[0] &&
                              onlineServices.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",

                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 6 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 7 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {other[0] &&
                              other.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 7 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 4 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {aws[0] &&
                              aws.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 4 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 5 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {google[0] &&
                              google.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      : value === 5 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={row.image_link}
                                      style={{
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "40px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {row.title}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      marginTop: -5,
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {row.Description}
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      openModal(row.connection_type_id);
                                      console.log(
                                        "Pressed!",
                                        row.connection_type_id
                                      );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}

                    {!search
                      ? value === 8 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {dataSources && dataSources.length > 0 ? (
                              dataSources.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={"/datasource1Icon.png"}
                                      style={{
                                        marginLeft: -8,
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "50px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {row?.name}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {
                                      "You can use this dataset to create the amazing Visualization Experiences"
                                    }
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      console.log("ROW>", row);
                                      storeDatasourceResult(1, row?.id);
                                      // openModal(row.connection_type_id);
                                      // console.log(
                                      //   "Pressed!",
                                      //   row.connection_type_id
                                      // );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <div
                                style={{
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                  position: "absolute",
                                  left: "50%",
                                  top: props?.fromFlow ? "80%" : "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              >
                                No Existing Datasets
                              </div>
                            )}
                          </div>
                        )
                      : value === 8 && (
                          <div
                            style={{
                              cursor: "pointer",
                              width: "100%",
                              marginTop: "10px",
                              display: "flex",
                              // justifyContent: "space-between",
                              flexFlow: "wrap",
                            }}
                          >
                            {searchArr[0] &&
                              searchArr.map((row, index) => (
                                <div
                                  style={{
                                    padding: "10px",
                                    width: "24%",
                                    //height: 254,
                                    background: "white",
                                    display: "inline-block",
                                    marginRight: 10,
                                    padding: "25px",
                                    border: "0.5px solid #ccc",
                                    borderRadius: 4 + "px",
                                    marginBottom: "12px",
                                    boxShadow:
                                      "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <div
                                    style={{ height: "60px", width: "100%" }}
                                  >
                                    <img
                                      src={"/datasource1Icon.png"}
                                      style={{
                                        marginLeft: -8,
                                        marginBottom: 10,
                                        marginRight: 10,
                                        float: "left",
                                        height: "50px",
                                        width: "auto",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        marginTop: 1,
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {row?.name}
                                    </h3>
                                  </div>
                                  <p
                                    style={{
                                      textAlign: "left",
                                      color: "black",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {
                                      "You can use this dataset to create the amazing Visualization Experiences"
                                    }
                                  </p>
                                  <CableIcon
                                    onClick={() => {
                                      console.log("ROW>", row);
                                      storeDatasourceResult(1, row?.id);
                                      // openModal(row.connection_type_id);
                                      // console.log(
                                      //   "Pressed!",
                                      //   row.connection_type_id
                                      // );
                                    }}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      color: "grey",
                                      float: "left",
                                      marginTop: 10,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        )}
                  </div>

                  <div>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Box
                          sx={{
                            width: "25%",
                            maxWidth: "25%",
                            bgcolor: "#58a1c5",
                            height: 440,
                            borderRadius: 1,
                            color: "#fff",
                            overflow: "auto",
                          }}
                        >
                          <h4
                            style={{
                              width: "100%",
                              textAlign: "center",
                              paddingTop: 4,
                              fontFamily: "Trebuchet MS",
                            }}
                          >
                            <CloudIcon
                              style={{ paddingTop: 2, marginRight: 5 }}
                            />
                            My Connections
                          </h4>

                          <div
                            style={{
                              width: "100%",
                              height: 1,
                              backgroundColor: "#FFF",
                            }}
                          ></div>

                          {allConnections.map((data, index) => {
                            return (
                              <>
                                <List>
                                  <ListItem disablePadding>
                                    <ListItemButton
                                      selected={connectionIndex === 0}
                                      onClick={(event) =>
                                        handleListItemClick(event, index)
                                      }
                                    >
                                      <ListItemText
                                        primary={data.connection_name}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                </List>
                              </>
                            );
                          })}
                        </Box>

                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "75%",
                            bgcolor: "#b4d5e5",
                            height: 440,
                            borderRadius: 1,
                            color: "#fff",
                          }}
                        >
                          <div style={{ marginTop: 20, marginLeft: 50 }}>
                            <label
                              style={{
                                color: "black",
                                fontFamily: "Arial",
                              }}
                            >
                              Connection Name
                              <input
                                type="text"
                                value={connectionName}
                                disabled={!clickedEdit && !clickedNew}
                                onChange={(e) =>
                                  setConnectionName(e.target.value)
                                }
                                style={{
                                  width: "75%",
                                  paddingTop: "9px",
                                  paddingBottom: "9px",
                                  border: "0px",
                                  borderRadius: 10,
                                  marginLeft: 5,
                                }}
                              />
                            </label>
                          </div>

                          <div
                            style={{
                              border: "1px solid #464646",
                              borderRadius: 8 + "px",
                              height: 330,
                              width: 720,
                              marginLeft: 70,
                              marginTop: 20,
                            }}
                          >
                            <div style={{ marginLeft: 250, marginTop: -15 }}>
                              <Button
                                variant="contained"
                                size="small"
                                aria-label="small button group"
                                style={{ backgroundColor: "#464646" }}
                              >
                                Connection Parameters
                              </Button>
                            </div>

                            <div style={{ marginLeft: 60, height: 50 }}></div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: 50,
                                marginTop: -40,
                              }}
                            >
                              <div
                                style={{
                                  width: 200,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  color: "black",
                                }}
                              >
                                <label>Hostname</label>
                                <label>Username</label>
                                <label>Password</label>
                                <label>Default Schema</label>

                                <label>Access Token</label>
                                <label>Clientid</label>
                                <label>Client Secret</label>
                                <label>Subscription Id</label>
                                {connectionType === 299 && (
                                  <label>Sheet ID</label>
                                )}
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  marginTop: 5,
                                }}
                              >
                                <input
                                  type="text"
                                  value={host}
                                  onChange={(e) => setHost(e.target.value)}
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />

                                <input
                                  type="text"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />

                                <input
                                  type="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={schema}
                                  onChange={(e) => setSchema(e.target.value)}
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={accessToken}
                                  onChange={(e) =>
                                    setaccessToken(e.target.value)
                                  }
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={clientId}
                                  onChange={(e) => setClientId(e.target.value)}
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={clientSecret}
                                  onChange={(e) =>
                                    setclientSecret(e.target.value)
                                  }
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                <input
                                  type="text"
                                  value={subscriptionId}
                                  onChange={(e) =>
                                    setsubScriptionId(e.target.value)
                                  }
                                  disabled={!clickedEdit && !clickedNew}
                                  style={{
                                    height: 24,
                                    width: "150%",
                                    paddingTop: "6px",
                                    paddingBottom: "6px",
                                    marginLeft: 0,
                                    marginBottom: 10,
                                  }}
                                />
                                {connectionType == 299 && (
                                  <input
                                    type="text"
                                    value={sheetId}
                                    onChange={(e) => {
                                      console.log(
                                        "SheetId->",
                                        e.target.value,
                                        e
                                      );
                                      setSheetId(e.target.value);
                                    }}
                                    disabled={!clickedEdit && !clickedNew}
                                    style={{
                                      height: 24,
                                      width: "150%",
                                      paddingTop: "6px",
                                      paddingBottom: "6px",
                                      marginLeft: 0,
                                      marginBottom: 10,
                                      marginTop: "6px",
                                    }}
                                  />
                                )}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  marginLeft: 75,
                                  marginTop: 5,
                                }}
                              >
                                <label style={{ color: "black" }}>
                                  Port
                                  <input
                                    type="text"
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                    disabled={!clickedEdit && !clickedNew}
                                    style={{
                                      height: 24,
                                      width: "40%",
                                      paddingTop: "6px",
                                      paddingBottom: "6px",
                                      marginLeft: 5,
                                      marginBottom: 10,
                                    }}
                                  />
                                </label>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  color: "black",
                                  direction: "ltr",
                                  marginRight: 50,
                                  fontSize: 13,
                                }}
                              >
                                <text
                                  style={{
                                    marginTop: -20,
                                    textAlign: "center",
                                    fontWeight: "600",
                                  }}
                                >
                                  Note
                                </text>
                                <text style={{ marginBottom: 4, fontSize: 12 }}>
                                  Name or IP address of the server host-and-port
                                </text>
                                <text style={{ marginBottom: 4, fontSize: 12 }}>
                                  Name of the user to connect with
                                </text>

                                {/* <text style={{ marginTop: 50 }}>
                                  Name of the user to connect with
                                </text> */}
                              </div>
                            </div>
                          </div>
                          {showAlert && (
                            <Stack
                              sx={{
                                width: "300px",
                                marginLeft: 12,
                                marginTop: 1,
                              }}
                            >
                              {status === 1 && mode === "test" ? (
                                <Alert severity={"success"}>
                                  successfully Connected to{" "}
                                  {connectionName && connectionName}!
                                </Alert>
                              ) : status === 1 && mode === "delete" ? (
                                <Alert severity={"success"}>
                                  Connection deleted successfully !
                                </Alert>
                              ) : status === 1 && mode === "save" ? (
                                <Alert severity={"success"}>
                                  Connection saved successfully !
                                </Alert>
                              ) : status === 1 && mode === "edit" ? (
                                <Alert severity={"success"}>
                                  Connection edited successfully !
                                </Alert>
                              ) : (
                                <Alert severity={"error"}>error !</Alert>
                              )}
                            </Stack>
                          )}
                        </Box>
                      </div>

                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 18,
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{
                                color: "#1b3e4f",
                                borderColor: "#1b3e4f",
                                marginRight: 10,
                              }}
                              onClick={() => {
                                clearText();
                                setClickedNew(true);
                                setClickedConnection(false);
                              }}
                            >
                              New
                            </Button>
                          </div>
                          <div
                            style={{
                              cursor:
                                clickedConnection === false && "not-allowed",
                            }}
                          >
                            <Button
                              disabled={clickedConnection === false}
                              variant="outlined"
                              size="small"
                              style={{
                                color: "#1b3e4f",
                                borderColor: "#1b3e4f",
                                marginRight: 10,
                              }}
                              onClick={() => {
                                console.log(
                                  "DeleteCId",
                                  allConnections[connectionIndex].id
                                );

                                deleteConnection();
                                setTimeout(() => viewAllConnections(), 1000);
                                clearText();
                              }}
                            >
                              Delete
                            </Button>
                          </div>

                          <div
                            style={{
                              cursor:
                                clickedConnection === false && "not-allowed",
                            }}
                          >
                            <Button
                              disabled={clickedConnection === false}
                              variant="outlined"
                              size="small"
                              style={{
                                color: "#1b3e4f",
                                borderColor: "#1b3e4f",
                                marginRight: 10,
                              }}
                              onClick={() => {
                                saveConnection();
                                setTimeout(() => viewAllConnections(), 1000);
                              }}
                            >
                              Duplicate
                            </Button>
                          </div>

                          <div
                            style={{
                              cursor:
                                clickedConnection === false && "not-allowed",
                            }}
                          >
                            <Button
                              disabled={clickedConnection === false}
                              variant="outlined"
                              size="small"
                              style={{
                                color: "#1b3e4f",
                                borderColor: "#1b3e4f",
                              }}
                              onClick={() => {
                                setClickedEdit(true);
                                // editConnection()
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              cursor:
                                clickedConnection === false && "not-allowed",
                            }}
                          >
                            <Button
                              disabled={clickedConnection === false}
                              variant="outlined"
                              size="small"
                              style={{
                                color: "green",
                                borderColor: "green",
                                marginRight: 10,
                              }}
                              onClick={() => testConnection()}
                            >
                              Test Connection
                            </Button>
                          </div>

                          <Button
                            style={{
                              backgroundColor: "#7A7A7A",
                              marginRight: 10,
                              color: "white",
                            }}
                            variant="contained"
                            size="small"
                            onClick={closeModal}
                          >
                            Close
                          </Button>
                          {clickedConnection && !clickedEdit ? (
                            <Button
                              disabled={clickedConnection === false}
                              variant="contained"
                              size="small"
                              type="disabled"
                              style={{ backgroundColor: "#1b3e4f" }}
                              onClick={() => {
                                localStorage.setItem("googleSheetId", sheetId);
                                if (clickedConnection)
                                  history.push("/Query_Editor");
                              }}
                            >
                              Next
                            </Button>
                          ) : clickedNew ? (
                            <Button
                              disabled={connectionName === ""}
                              variant="contained"
                              size="small"
                              type="disabled"
                              style={{
                                backgroundColor: "#1b3e4f",
                                color: "whute",
                              }}
                              onClick={() => {
                                saveConnection();
                                setTimeout(() => viewAllConnections(), 1000);
                              }}
                            >
                              Save
                            </Button>
                          ) : clickedEdit && clickedConnection ? (
                            <Button
                              disabled={connectionName === ""}
                              variant="contained"
                              size="small"
                              type="disabled"
                              style={{
                                backgroundColor: "#1b3e4f",
                                color: "whute",
                              }}
                              onClick={() => {
                                editConnection();
                                setTimeout(() => viewAllConnections(), 1000);
                              }}
                            >
                              Save
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {exportModal && (
            <Modal2
              open={exportModal}
              onClose={() => setExportModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle3}>
                <>
                  <CloseIcon
                    onClick={() => setExportModal(false)}
                    style={{
                      position: "absolute",
                      left: "95%",
                      top: "1%",
                      cursor: "pointer",
                    }}
                  />
                </>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "60px",
                    alignSelf: "center",
                  }}
                >
                  {/* <div
                    style={{
                      fontSize: 20,
                      fontFamily: 'Trebuchet MS',
                      padding: 8,
                      backgroundColor: '#0BAFFF',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                    onClick={() =>
                      history.push({
                        pathname:
                          '/Widget Dashboard/new_widget/' +
                          global.subscription_id,
                        state: exampleData2
                      })
                    }
                  >
                    Upload File
                  </div> */}
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
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            minWidth: "140px",
                            background: "#0aafff",
                            border: "0.839161px solid #DEC7C7",
                            color: "white",
                            fontWeight: "600",
                            height: "40px",
                            boxShadow:
                              "(0px 8.90323px 17.8065px rgba(44, 39, 56, 0.25))",
                            borderRadius: "6px",
                            cursor: "pointer",
                            padding: 8,
                            fontSize: "14px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={(e) => {
                            handleOpenDialog(e);
                          }}
                          // onClick={() => setnewpg1(false)}
                        >
                          Upload{" "}
                          {fileType === 1
                            ? "CSV"
                            : fileType === 2
                            ? "Excel"
                            : fileType === 3
                            ? "Xml"
                            : fileType === 4
                            ? "JSON"
                            : fileType === 6
                            ? "Pdf"
                            : fileType === 7
                            ? "Parquet"
                            : "FILE"}
                        </div>
                        <div
                          style={{
                            height: 45,
                            overflow: "hidden",
                            lineHeight: 2.5,
                            marginTop: 35,
                            marginBottom: 5,
                            paddingLeft: 13,
                            paddingTop: 3,
                            width: "90%",
                          }}
                        >
                          {file ? file.name : ""}
                        </div>
                      </div>
                    )}
                  </CSVReader>
                </div>
              </Box>
            </Modal2>
          )}

          <Dialog
            open={openDialog}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "hidden",
              },
            }}
          >
            {/* <div style={{ height: '300px', width: '300px' }}>Loading....</div> */}
            <CircularProgress sx={{ color: "#0BAFFF" }} />
          </Dialog>
        </>
      ) : (
        history.push("/Login")
      )}
    </>
  );
}
