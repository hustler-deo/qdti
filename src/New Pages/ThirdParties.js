import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

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

import bgImg from "../Connector box 3.png";

// Auth context
import { AuthContext } from "../context";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

import configData from "../config.json";

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

const ThirdParties = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  let found = [];
  let searchArray = [];
  let categoryData = [];
  var connectionIndex = 0;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [clickedEdit, setClickedEdit] = useState(false);

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
  const [files, setFiles] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [azure, setAzure] = useState([]);
  const [onlineServices, setOnlineServices] = useState([]);
  const [other, setOther] = useState([]);
  const [aws, setAws] = useState([]);
  const [google, setGoogle] = useState([]);

  const [filesBackup, setFilesBackup] = useState([]);
  const [databasesBackup, setDatabasesBackup] = useState([]);
  const [azureBackup, setAzureBackup] = useState([]);
  const [onlineServicesBackup, setOnlineServicesBackup] = useState([]);
  const [otherBackup, setOtherBackup] = useState([]);
  const [awsBackup, setAwsBackup] = useState([]);
  const [googleBackup, setGoogleBackup] = useState([]);

  const [cname, setCname] = useState("agecc");
  const [selected, setSelected] = useState(
    global.subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8" ? 2 : 4
  );
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    // console.log('valueChanged', value, aws)
    getSectionCategories(selected);
  }, []);

  const handleChange = (event, newValue) => {
    console.log("CCC", newValue, allSections[newValue].id);
    getSectionCategories(allSections[newValue].id);
    setValue(newValue);
    setSelected(allSections[newValue].id);
  };

  const getSectionCategories = (sectionId) => {
    console.log("SectionID", sectionId);
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
        if (sectionId === 2) {
          setFiles(response.data);
          setFilesBackup(response.data);
        }
        if (sectionId === 3) {
          setDatabasesBackup(response.data);
          setDatabases(response.data);
        }

        if (sectionId === 4) {
          setAzure(response.data);
          setAzureBackup(response.data);
        }
        if (sectionId === 5) {
          setOnlineServices(response.data);
          setOnlineServicesBackup(response.data);
        }
        if (sectionId === 6) {
          setOtherBackup(response.data);
          setOther(response.data);
        }
        if (sectionId === 7) {
          setAwsBackup(response.data);
          setAws(response.data);
        }
        if (sectionId === 8) {
          setGoogleBackup(response.data);
          setGoogle(response.data);
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
  };

  useEffect(() => {
    axios
      .get(
        configData.API_URL + "personalAccount/database/all-categories",
        {},
        {}
      )
      .then((response) => {
        console.log("allCategories api", response.data);
        if (global.subscription_id === "price_1LfOlnSBwqDDsny7nprdkWUQ") {
          var allbox = response.data.filter((item) => item.id === 2);
          setAllCategoriesData(allbox);
        } else if (
          global.subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8"
        ) {
          var allbox = response.data.filter(
            (item) => item.id === 2 || item.id === 3
          );
          console.log("QQQQ", allbox);
          setAllCategoriesData(allbox);
        } else if (
          global.subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra"
        ) {
          setAllCategoriesData(response.data);
        } else if (
          global.subscription_id === "price_1LfOrRSBwqDDsny7TiYnfuXA"
        ) {
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
        // console.log('arr', tsectionBox)

        if (global.subscription_id === "price_1LfOlnSBwqDDsny7nprdkWUQ") {
          var DatasourceBox1 = tsectionBox.filter(
            (item) => item.id === 2 || item.id === 1
          );
          console.log(DatasourceBox1);
          setAllSections(DatasourceBox1);
          // getSectionCategories(2)
        } else if (
          global.subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8"
        ) {
          var DatasourceBox1 = tsectionBox.filter(
            (item) => item.id === 3 || item.id === 2
          );
          console.log("JJJJ", DatasourceBox1);
          setAllSections(DatasourceBox1);
        } else if (
          global.subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra"
        ) {
          let sections = response.data.filter((item) => {
            return item.id !== 1 && item.id !== 2 && item.id != 3;
          });
          console.log("req sections", sections);
          setAllSections(sections);
        } else if (
          global.subscription_id === "price_1LfOrRSBwqDDsny7TiYnfuXA"
        ) {
          setAllSections(sections);
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
  }, [global.subscription_id]);

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

  useEffect(() => {
    if (selected === 7) {
      let found = awsBackup.filter((element) =>
        element?.title.toLowerCase().includes(searchOption.toLowerCase())
      );

      // console.log("searchFound", found);
      setAws(found);
    }
    if (selected === 4) {
      let found = azureBackup.filter((element) =>
        element?.title.toLowerCase().includes(searchOption.toLowerCase())
      );

      // console.log("searchFound", found);
      setAzure(found);
    }
    if (selected === 8) {
      let found = googleBackup.filter((element) =>
        element?.title.toLowerCase().includes(searchOption.toLowerCase())
      );

      // console.log("searchFound", found);
      setGoogle(found);
    }

    if (selected === 6) {
      let found = otherBackup.filter((element) =>
        element?.title.toLowerCase().includes(searchOption.toLowerCase())
      );

      // console.log("searchFound", found);
      setOther(found);
    }
  }, [searchOption]);
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
              width: "95%",
              paddingLeft: "9%",
            }}
          >
            <div>
              <div style={{ textAlign: "left" }}>
                <h2 style={{ fontFamily: "Trebuchet MS", marginTop: "20px" }}>
                  DATA CONNECTORS
                </h2>
              </div>
              <div
                style={{
                  fontWeight: "400",
                  marginTop: "-1%",
                  textAlign: "left",
                  // paddingLeft: "9%",
                }}
              >
                Get Insight from your Data
              </div>
            </div>

            {/* <div
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
                  width: "80vh",
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Tabs value={value} onChange={handleChange} centered>
                  {allSections &&
                    allSections.map((row, index) => (
                      <Tab sx={{ fontSize: "12px" }} label={row.name} />
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

          {/* <div
          style={{
            marginLeft: "6%",
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            alignItems: "center",
            zIndex: 5,
            marginTop: "-1.5%",
            justifyContent: "flex-start",
          }}
        > */}
          <div style={{ marginLeft: "10%" }}>
            <div
              className=""
              style={{
                // backgroundColor: '#EFF5F8',
                // borderRadius: ' 36.2547px',
                // border: '1px solid #2A5B84',
                // width: '95%',
                // margin: '0px auto'

                width: "95%",
                marginTop: "10px",
                display: "flex",
                flexFlow: "wrap",
              }}
            >
              <div className="row pt-5">
                {selected === 4
                  ? azure.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 255,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
                            </h3>
                          </div>
                          <p
                            style={{
                              marginTop: -5,
                              textAlign: "left",
                              color: "black",
                              fontSize: "10px",
                            }}
                          >
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ))
                  : selected === 2
                  ? files.map((item, index) => (
                      <>
                        {index % 5 === 0 && <div className="col-1"></div>}
                        <div className="col-2">
                          <div
                            style={{
                              backgroundImage: `url(${bgImg})`,
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                              backgroundRepeat: "no-repeat",
                              height: "25vh",
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => history.push("/Create_Flow")}
                          >
                            <img
                              src={item?.image_link}
                              style={{
                                resizeMode: "contain",
                                marginTop: "-12px",
                                height: "6vh",
                                width: "auto",
                              }}
                            />
                            <div
                              style={{
                                marginTop: "3%",
                                fontSize: "12px",
                                fontWeight: "400",
                                height: "20%",
                                width: "70%",
                                flexWrap: "wrap",
                              }}
                            >
                              {item?.title}
                            </div>
                          </div>
                        </div>
                        {index % 5 === 4 && <div className="col-1"></div>}
                      </>
                    ))
                  : selected === 3
                  ? databases.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 254,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
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
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ))
                  : selected === 5
                  ? onlineServices.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 254,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
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
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ))
                  : selected === 6
                  ? other.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 254,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
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
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ))
                  : selected === 7
                  ? aws.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 254,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
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
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    ))
                  : selected === 8 &&
                    google.map((item, index) => (
                      <>
                        {/* {index % 5 === 0 && <div className='col-1'></div>}
                      <div className='col-2'>
                        <div
                          style={{
                            backgroundImage: `url(${bgImg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            height: '25vh',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => history.push('/Create_Flow')}
                        >
                          <img
                            src={item?.image_link}
                            style={{
                              resizeMode: 'contain',
                              marginTop: '-12px',
                              height: '6vh',
                              width: 'auto'
                            }}
                          />
                          <div
                            style={{
                              marginTop: '3%',
                              fontSize: '12px',
                              fontWeight: '400',
                              height: '20%',
                              width: '70%',
                              flexWrap: 'wrap'
                            }}
                          >
                            {item?.title}
                          </div>
                        </div>
                      </div>
                      {index % 5 === 4 && <div className='col-1'></div>} */}
                        <div
                          style={{
                            padding: "10px",
                            width: "24%",
                            height: 254,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "25px",
                            // border: '0.5px solid #ccc',
                            // borderRadius: 4 + 'px',
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={item.image_link}
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
                              {item.title}
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
                            {item.Description}
                          </p>
                          <CableIcon
                            onClick={() => {
                              openModal(item.connection_type_id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              marginTop: 10,
                              cursor: "pointer",
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

export default ThirdParties;
