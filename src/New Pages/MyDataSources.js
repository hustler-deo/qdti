import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import MiniDrawer from "../MiniDrawer";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Modal from "react-modal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";

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

export default function MyDataSources() {
  let found = [];
  let searchArray = [];
  let categoryData = [];
  var connectionIndex = 0;

  const [datasources, setDatasources] = useState([]);
  const [datasourcesBackup, setDatasourcesBackup] = useState([]);

  const [input, setInput] = React.useState("");
  const [searched, setSearched] = useState(false);

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

  const [allConnections, setAllConnections] = useState([]);
  const [status, setStatus] = useState(0);
  const [mode, setMode] = useState("");
  const [connectionType, setConnectionType] = useState(0);

  const [accountId, setAccountId] = useState(
    localStorage.getItem("account_id").toString()
  );

  const [clickedConnection, setClickedConnection] = useState(false);
  const [clickedNew, setClickedNew] = useState(false);

  const history = useHistory();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(localStorage.getItem("account_id"));
    getData();
    localStorage.setItem("CLEAR", 1);
  }, []);

  useEffect(() => {
    if (input != "") {
      setSearched(true);
      let filteredRows = datasourcesBackup?.filter((row) => {
        return row.title.toLowerCase().includes(input.toLowerCase());
      });
      setDatasources(filteredRows);
    }

    if (input === "") {
      setSearched(false);
      getData();
    }
  }, [input]);

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
        console.log(response.data);
        setDatasources(response.data.data);
        setDatasourcesBackup(response.data.data);
        // console.log(
        //   'I am in the response of response data -------------' +
        //     response.data.data
        // )
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
              <h2 style={{ fontFamily: "Trebuchet MS", marginTop: "20px" }}>
                My Datasources
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <TextField
              value={input}
              placeholder="Search For Datasource"
              size="small"
              sx={{ mt: 1, width: "30vw" }}
              inputProps={{
                style: {
                  fontSize: "14px",
                  fontWeight: "600",
                },
              }}
              id="outlined-basic"
              label=""
              variant="outlined"
              onChange={(event) => setInput(event.target.value)}
            />
            <div
              style={{
                position: "relative",
                marginTop: "0.5%",
                right: "3%",
              }}
            >
              <SearchIcon fontSize="medium" />
            </div>
          </div>

          {datasources &&
            datasources.map((item1, i) => {
              return (
                <>
                  <h3
                    style={{
                      color: "#0c0c0c",
                      fontFamily: "Trebuchet MS",
                      textAlign: "left",
                      marginLeft: "9%",
                      marginTop: "30px",
                      color: "#067AB4",
                    }}
                  >
                    {item1?.title}
                  </h3>
                  <div
                    style={{
                      backgroundColor: "#C1D9EC",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      width: "90%",
                      height: "100%",
                      padding: 5,
                      zIndex: 2,
                      marginBottom: "8px",
                      marginTop: "2%",
                      marginLeft: "8%",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        margin: "8px",
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
                          // justifyContent: "space-around",
                          width: "100%",
                        }}
                      >
                        {item1?.list?.map((item) => (
                          <div
                            onClick={() => {
                              openModal(item1?.connection_type);
                            }}
                            style={{ margin: "10px", cursor: "pointer" }}
                          >
                            <div
                              style={{
                                backgroundImage: `url(${"/datasource1Icon.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                height: "100px",
                                width: "110px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            ></div>
                            <div
                              style={{
                                maxHeight: "60px",
                                // width: "130px",
                                marginLeft: "5px",
                                flexWrap: "wrap",
                                marginTop: "3px",
                                fontSize: "14px",
                                color: "#067AB4",
                                fontFamily: "Trebuchet MS",
                              }}
                            >
                              {item?.connection_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

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
        history.push("/login")
      )}
    </>
  );
}
