import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory, useParams } from "react-router-dom";

import Modal from "react-modal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import CableIcon from "@mui/icons-material/Cable";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";

import configData from "../config.json";

import bgImg from "../Connector box 3.png";

// Auth context
import { AuthContext } from "../context";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import { DataGrid } from "@mui/x-data-grid";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select2 from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const options = [
  { value: "Column1", label: "Column1" },
  { value: "Column2", label: "Column2" },
  { value: "Column3", label: "Column3" },
  { value: "Column4", label: "Column4" },
  { value: "Column5", label: "Column5" },
  { value: "Column6", label: "Column6" },
];

const columns = [
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
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.item.firstName || ""} ${params.item.lastName || ""}`,
  },
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
let connectionId;
const Databases = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [clickedEdit, setClickedEdit] = useState(false);
  const [dataSources, setDatasources] = useState();

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

  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id").toString()
  );

  const [clickedConnection, setClickedConnection] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);
  const [databases, setDatabases] = useState([]);
  const [image, setImage] = useState();

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSearch(false);
  }, [searchOption == ""]);

  useEffect(() => {
    console.log("connection_typeId", connectionType);
    viewAllConnections();
  }, [modalIsOpen === true]);

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

  const handleChange = (event, newValue) => {
    console.log("CCC", newValue, dataSources[newValue]?.list);
    setDatabases(dataSources[newValue]?.list);
    setImage(dataSources[newValue]?.image_link);
    setValue(newValue);
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setConnectionType(0);
    setIsOpen(false);
  }
  Modal.setAppElement(document.getElementById("root"));

  useEffect(() => {
    found = databases?.filter((element) =>
      element?.connection_name
        .toLowerCase()
        .includes(searchOption.toLowerCase())
    );

    // console.log("searchFound", found);
    setSearchArr(found);
  }, [searchOption]);

  const getData = () => {
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/viewall_stored_datasources",
        {
          account_id: localStorage.getItem("account_id"),
        },
        {}
      )
      .then((response) => {
        console.log("101010", response.data);
        setDatasources(response.data.data);
        setDatabases(response.data.data[0]?.list);
        setImage(response.data.data[0]?.image_link);

        // setDatasourcesBackup(response.data.data);
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
        configData.API_URL +
          "personalAccount/database/sectionwise-category-by-user",
        {
          id: sectionId,
          account_id: localStorage.getItem("account_id"),
        },
        {}
      )
      .then((response) => {
        console.log("sectionWise Category api", response.data);
        // if (sectionId === 2) setFiles(response.data);
        if (sectionId === 3) {
          let unique_array = response.data.filter(
            (a, i) => response.data.findIndex((s) => a.title === s.title) === i
          );
          console.log("unique", unique_array);
          // setDatabases(unique_array);
        }
        // if (sectionId === 4) setAzure(response.data);
        // if (sectionId === 5) setOnlineServices(response.data);
        // if (sectionId === 6) setOther(response.data);
        // if (sectionId === 7) setAws(response.data);
        // if (sectionId === 8) setGoogle(response.data);
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

  const handleSearch = (event) => {
    setSearch(true);
    setSearchOption(event.target.value);
  };

  useEffect(() => {
    setSearch(false);
  }, [searchOption == ""]);

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div
            style={{
              display: "flex",
              marginTop: "-100px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingLeft: "9%",
            }}
          >
            <div>
              <h2 style={{ fontFamily: "Trebuchet MS", marginTop: "20px" }}>
                DATA CONNECTORS
              </h2>
              <div
                style={{
                  fontWeight: "400",
                  marginTop: "-1%",
                  paddingLeft: "-13%",
                  textAlign: "left",
                }}
              >
                Get Insight from your Data
              </div>
            </div>
            {/* 
          <div
            style={{
              backgroundColor: "#0aafff",
              fontSize: "14px",
              border: "1px solid #DEC7C7",
              borderRadius: "12px",
              fontWeight: "bolder",
              color: "white",
              padding: 7,
              height: "100%",
              width: "9vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "4%",
              cursor: "pointer",
            }}
          >
            CONNECT
          </div> */}
          </div>

          {/* <div
            style={{
              alignSelf: "center",
              fontWeight: "400",
              color: "rgba(51, 51, 51, 0.7)",
              fontSize: "30px",
            }}
          >
            Connect a Data Source
          </div> */}
          <div
            className="d-flex justify-space-between align-items-center"
            style={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                paddingLeft: "9%",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  marginTop: 5,
                  width: "60vw",
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
                >
                  {dataSources &&
                    dataSources.map((row, index) => (
                      <Tab sx={{ fontSize: "12px" }} label={row?.title} />
                    ))}
                </Tabs>
              </Box>
            </Box>
            <div
              className="d-flex justify-space-between align-items-center"
              style={{
                width: "30vw",
                marginRight: "35px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  margin: "0px auto",
                  width: "100%",
                  top: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder="    Search For Data Source"
                  onChange={handleSearch}
                  style={{
                    width: "100%",
                    background: "white",
                    borderRadius: "50px",
                    border: " 0.7px solid rgba(0, 0, 0, 0.8)",
                    height: "44px",
                    color: "black",
                    fontSize: "15px",
                    paddingLeft: "20px",
                  }}
                />
                {
                  <span
                    class="icon"
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                    }}
                  >
                    <SearchIcon />
                  </span>
                }
              </div>
            </div>
          </div>

          <div style={{ marginLeft: "10%" }}>
            <div
              className=""
              style={{
                width: "95%",
                marginTop: "10px",
                display: "flex",
                flexFlow: "wrap",
              }}
            >
              <div className="row pt-5">
                {search
                  ? searchArr.map((item, index) => (
                      <>
                        <div
                          style={{
                            padding: "10px",
                            width: "34vh",
                            height: 180,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "22px",
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={image}
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
                              {item?.connection_name}
                            </h3>
                          </div>
                          {/* <p
                          style={{
                            marginTop: -5,
                            textAlign: "left",
                            color: "black",
                            fontSize: "11px",
                          }}
                        >
                          {item.Description}
                        </p> */}

                          <CableIcon
                            onClick={() => {
                              openModal(item?.connection_type);
                              console.log("Pressed!", item.connection_type);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              cursor: "pointer",
                              position: "relative",
                              bottom: -10,
                            }}
                          />
                        </div>
                      </>
                    ))
                  : databases?.map((item, index) => (
                      <>
                        <div
                          style={{
                            padding: "10px",
                            width: "34vh",
                            height: 180,
                            background: "white",
                            display: "flex",
                            flexDirection: "column",
                            marginRight: 10,
                            padding: "22px",
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={image}
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
                              {item?.connection_name}
                            </h3>
                          </div>
                          {/* <p
                          style={{
                            marginTop: -5,
                            textAlign: "left",
                            color: "black",
                            fontSize: "11px",
                          }}
                        >
                          {item.Description}
                        </p> */}

                          <CableIcon
                            onClick={() => {
                              openModal(item?.connection_type);
                              console.log("Pressed!", item.connection_type);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              cursor: "pointer",
                              marginTop: "auto",
                              marginBottom: 0,
                            }}
                          />
                        </div>
                      </>
                    ))}
              </div>
            </div>
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
                    <CloudIcon style={{ paddingTop: 2, marginRight: 5 }} />
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
                              <ListItemText primary={data.connection_name} />
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
                        onChange={(e) => setConnectionName(e.target.value)}
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
                        {connectionType === 299 && <label>Sheet ID</label>}
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
                          onChange={(e) => setaccessToken(e.target.value)}
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
                          onChange={(e) => setclientSecret(e.target.value)}
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
                          onChange={(e) => setsubScriptionId(e.target.value)}
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
                              console.log("SheetId->", e.target.value, e);
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
                        <text style={{ marginBottom: 10 }}>
                          Name or IP address of the server host-and-port
                        </text>
                        <text style={{ marginBottom: 10 }}>
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
                      cursor: clickedConnection === false && "not-allowed",
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
                      cursor: clickedConnection === false && "not-allowed",
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
                      cursor: clickedConnection === false && "not-allowed",
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
                      cursor: clickedConnection === false && "not-allowed",
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
                        if (clickedConnection) history.push("/Query_Editor");
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
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default Databases;
