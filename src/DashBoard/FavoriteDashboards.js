import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import BuildIcon from "@mui/icons-material/Build";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarIcon from "@mui/icons-material/Star";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import PrintIcon from "@mui/icons-material/Print";
import EmailIcon from "@mui/icons-material/Email";

// Auth context
import { AuthContext } from "../context";

var flag = 0,
  added = 0;
var parentData, data;
const FavoriteViewOnlyDashboards = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [dashboards, setDashboards] = useState([]);
  const [dashboardId, setDashboardId] = useState([]);

  // var dashboardId
  const [data2, setData2] = useState([]);
  const [actionsModal, setActionsModal] = useState(false);
  const [viewOnlyDashboards, setViewOnlyDashboards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [issueDetails, setIssueDetails] = useState("");

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [sendNowModal, setSendNowModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [reported, setReported] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [isSaveDashboard, setIsSaveDashboard] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (index1) => {
    setselectedActionIndex(index1);

    if (index1 === 0) {
      localStorage.setItem("viewMode", 0);
      flag == 0 &&
        history.push({
          pathname: "/Main_Dashboard/" + global.subscription_id,
          state: parentData,
        });
    }
    if (index1 === 1) setShareModal(true);

    if (index1 === 2) setScheduleReportModal(true);
    if (index1 === 4) setSendNowModal(true);
    if (index1 === 5) setExportModal(true);
    if (index1 === 6) {
      added === 1 ? removeFromFavorites() : addToFavorites();
    }

    // if (index1 === 7) setIsSaveDashboard(true)
    if (index1 === 8) setReportIssueModal(true);

    handleClose();
  };

  const actionsList = [
    "Edit",
    "Share",
    "Schedule as Report",
    "Edit Scheduled Reports",
    "Send Now",
    "Send/Export",
    "Add to Favourites",
    "Notify me on issues",
    "Report an Issue",
  ];

  const modalstyle2 = {
    position: "relative",
    top: "5%",
    left: "28%",
    // transform: 'translate(-50%, -50%)',
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 600,
    width: 600,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "4px",
  };

  const modalstyle3 = {
    position: "relative",
    top: "30%",
    left: "28%",
    // transform: 'translate(-50%, -50%)',
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 180,
    width: 600,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "4px",
  };

  const deleteModalStyle = {
    position: "relative",
    top: "30%",
    left: "28%",
    // transform: 'translate(-50%, -50%)',
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 180,
    width: 600,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "4px",
  };

  const widgetmodalstyle = {
    position: "relative",
    top: "20%",
    left: "30%",
    // transform: 'translate(-50%, -50%)',
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 310,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };

  const reportModalStyle = {
    position: "relative",
    top: "20%",
    left: "30%",
    // transform: 'translate(-50%, -50%)',
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 300,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };

  useEffect(() => {
    localStorage.setItem("viewMode", 1);
    viewExportedDashboards();
  }, []);

  const viewExportedDashboards = () => {
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/dashboard_export_viewall",
        {
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log(
          "response",
          // JSON.parse(response.data.data[0].data),
          response.data.data
        );
        setViewOnlyDashboards(response.data.data);
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

  const getAllDashboards = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_viewall",
        {
          account_id: localStorage.getItem("account_id").toString(),
        },

        {}
      )
      .then((response) => {
        console.log("response", response.data.data);
        //  dashboardId = response.data.data.id
        setDashboards(response.data.data);
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

  const deleteDashboard = () => {
    console.log("deleted dashboardId", dashboardId);
    axios
      .post(
        configData.API_URL + "personalAccount/dashboard/dashboard_delete",
        {
          dashboard_id: dashboardId,
        },
        {}
      )
      .then((response) => {
        console.log("widget_delete API success", response);

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

  const addToFavorites = () => {
    console.log("favorite dashboardId", dashboardId);
    axios
      .post(
        configData.API_URL + "personalAccount/dashboard/dashboard_add_favorite",
        {
          dashboard_id: dashboardId,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("add to favorite API success", response);

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

  const removeFromFavorites = () => {
    console.log("remove from favorite dashboardId", dashboardId);
    axios
      .post(
        configData.API_URL +
          "personalAccount/dashboard/dashboard_remove_favorite",
        {
          dashboard_id: dashboardId,
        },
        {}
      )
      .then((response) => {
        console.log("remove frome favorites API success", response);
        setTimeout(() => viewExportedDashboards(), 1000);
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

  const reportIssue = () => {
    console.log("reported dashboardId", dashboardId);
    axios
      .post(
        configData.API_URL + "personalAccount/dashboard/dashboard_report_issue",
        {
          dashboard_id: dashboardId,
          issue: issueDetails,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("report issue API success", response.data);
        if (response.data.status) setReported(true);

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

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: -100,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
              }}
            >
              <List>
                {actionsList.map((text, index) => (
                  <ListItem
                    selected={index == selectedActionIndex}
                    button
                    key={index}
                    onClick={() => handleOnClick(index)}
                  >
                    <ListItemIcon>
                      {index === 0 ? (
                        <BorderColorIcon />
                      ) : index === 1 ? (
                        <ShareIcon />
                      ) : index === 5 ? (
                        <SendIcon />
                      ) : index === 6 ? (
                        <StarIcon />
                      ) : index === 13 ? (
                        <ContentCopyIcon />
                      ) : index === 8 ? (
                        <SaveAsIcon />
                      ) : index === 10 ? (
                        <DeleteForeverIcon />
                      ) : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        added == 1 && index == 6
                          ? "Remove from favourites"
                          : text
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Popover>

          <div
            style={{
              // marginTop: -30,
              width: "100%",
              // height: 40,
              // border: '0.5px solid #ccc',
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                marginLeft: 100,
                fontFamily: "Trebuchet MS",
              }}
            >
              FAVOURITE VIEW ONLY DASHBOARDS
            </h2>
          </div>
          <div
            style={{
              marginTop: 0,
              marginLeft: "6%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              //  backgroundColor: '#CCC',
              //  height: height,
              width: width,
              flexWrap: "wrap",
            }}
          >
            {viewOnlyDashboards &&
              viewOnlyDashboards.map((e, i) => (
                <>
                  {e.isFavorite === 1 && (
                    <div
                      style={{
                        cursor: "pointer",
                        margin: 10,
                        display: "flex",
                        flexDirection: "column",
                        height: 250,
                        width: 250,
                        backgroundColor: "white",
                        border: "0.5px solid #ccc",
                        boxShadow: "1px 1.1px 0.5px  #d1d0cf",
                        borderRadius: 4 + "px",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                      }}
                      onClick={() => {
                        flag == 0 &&
                          history.push({
                            pathname:
                              "/Main_Dashboard/" + global.subscription_id,
                            state: e,
                          });
                      }}
                    >
                      <div>
                        <div
                          onMouseEnter={() => {
                            setDashboardId(e.id);
                            setDashboardTitle(e.name);
                            parentData = e.parentData;
                            data = e.data;
                            //console.log('pdata', parentData)
                            flag = 1;
                            if (e.isFavorite == 1) {
                              setAddedToFav(true);
                              added = 1;
                            } else added = 0;
                          }}
                          onMouseLeave={() => {
                            flag = 0;
                          }}
                          style={{ position: "absolute", marginLeft: 190 }}
                        >
                          <IconButton
                            aria-describedby={id}
                            color="primary"
                            aria-label="add an alarm"
                            onClick={handleClick}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <BuildIcon />
                            </div>
                          </IconButton>
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: 20,
                          marginTop: 5,
                          fontWeight: "bold",
                          width: 155,
                          display: "flex",
                          flexwrap: "wrap",
                        }}
                      >
                        {e.name}
                      </div>
                      <div style={{ marginLeft: 20, marginTop: 8 }}>
                        {e.description && e.description}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          marginLeft: 10,
                          marginTop: 90,
                          width: "220px",
                        }}
                      >
                        <img
                          src={"/dashboard2.png"}
                          style={{ height: "auto" }}
                          width={220}
                        />
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </>
      ) : (
        history.push("/Login")
      )}

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={deleteModalStyle}>
          <>
            <CloseIcon
              onClick={() => setDeleteModal(false)}
              style={{
                position: "absolute",
                left: "95%",
                top: "1%",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginTop: 20,
                  border: "0.5px solid #CCC",
                  height: 85,
                  width: "90%",
                }}
              >
                <div
                  style={{
                    marginLeft: 20,
                    marginTop: 5,
                    fontSize: 16,
                    fontFamily: "Trebuchet MS",
                    fontWeight: 600,
                  }}
                >
                  Are you sure you want to delete this dashboard? This action
                  cannot be undone.
                </div>
              </div>

              <div
                style={{
                  marginTop: 25,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ marginRight: 10, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setDeleteModal(false);
                    }}
                    variant="outlined"
                  >
                    CANCEL
                  </Button>
                </div>
                <div style={{ marginRight: 20, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      deleteDashboard();
                      setDeleteModal(false);
                      viewExportedDashboards();
                    }}
                    variant="outlined"
                  >
                    Delete Widget
                  </Button>
                </div>
              </div>
            </div>
          </>
        </Box>
      </Modal>

      <Modal
        open={reportIssueModal}
        onClose={() => setReportIssueModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={reportModalStyle}>
          <>
            <CloseIcon
              onClick={() => setReportIssueModal(false)}
              style={{
                position: "absolute",
                left: "95%",
                top: "1%",
                cursor: "pointer",
              }}
            />

            <div
              style={{
                marginLeft: 25,
                marginTop: 25,
                fontSize: 18,
                fontFamily: "Trebuchet MS",
              }}
            >
              What do you want to report?
            </div>

            <textarea
              style={{
                marginTop: 20,
                alignSelf: "center",
                width: "92%",
                height: 120,
                border: "1px solid #CCC",
                overflow: "auto",
              }}
              //  placeholder={'I thought you might find this card interesting.'}
              value={issueDetails}
              onChange={(e) => setIssueDetails(e.target.value)}
              cols={40}
              rows={10}
            />
            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {reported && (
                <Stack sx={{ width: "100%", ml: 2, mr: 4 }}>
                  <Alert
                    style={{ fontFamily: "Trebuchet MS" }}
                    severity={"success"}
                  >
                    Reported an issue successfully!
                  </Alert>
                </Stack>
              )}
              <div style={{ marginBottom: 20, marginRight: 20 }}>
                <Button
                  sx={{
                    bgcolor: "#0c0c0c",
                    color: "#CCC",
                    fontFamily: "Trebuchet MS",
                  }}
                  onClick={() => {
                    reportIssue();
                    setTimeout(() => setReportIssueModal(false), 2200);
                  }}
                  variant="outlined"
                >
                  Report Issue
                </Button>
              </div>
            </div>
          </>
        </Box>
      </Modal>

      {scheduleReportModal && (
        <Modal
          open={scheduleReportModal}
          onClose={() => setScheduleReportModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle2}>
            <>
              <CloseIcon
                onClick={() => setScheduleReportModal(false)}
                style={{
                  position: "absolute",
                  left: "95%",
                  top: "1%",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 25,
                  fontSize: 18,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Schedule report for {dashboardTitle}
              </div>

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Subject
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    marginTop: 8,
                    alignSelf: "center",
                    width: "90%",
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Add Subject."}
                  // value={fileName}
                  // onChange={e => setFileName(e.target.value)}
                />
              </div>

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Send report
              </div>

              <div style={{ display: "flex" }}>
                <select
                  onChange={(e) => {
                    //   console.log('selected column-', e.target.value)
                    //  setColumnX(e.target.value)
                  }}
                  // value={columnX}
                  style={{
                    marginLeft: 30,
                    border: "1px solid #FFF",
                    width: 150,
                    height: 30,
                    backgroundColor: "white",
                    border: "0.5px solid",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#067AB4",
                  }}
                >
                  {["Daily", "Weekly", "Monthly"].map((ele, i) => (
                    <option style={{ fontSize: 14, height: 25 }} value={i}>
                      {ele}
                    </option>
                  ))}
                </select>

                <div
                  style={{
                    marginLeft: 20,
                    height: 30,
                    width: "40%",
                    border: "1px solid",
                  }}
                ></div>

                <input
                  style={{
                    marginLeft: 20,
                    width: "20%",
                    height: 30,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  //placeholder={'Send to people and groups'}
                  // value={fileName}
                  // onChange={e => setFileName(e.target.value)}
                />
              </div>

              <div style={{ display: "flex" }}>
                <div>
                  <div
                    style={{
                      marginLeft: 25,
                      marginTop: 20,
                      fontSize: 16,
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    Start date
                  </div>
                  <input
                    style={{
                      marginLeft: 25,
                      marginTop: 8,
                      width: "60%",
                      height: 30,
                      border: "1px solid #CCC",
                    }}
                    type={"text"}
                    //   placeholder={'Add Subject.'}
                    // value={fileName}
                    // onChange={e => setFileName(e.target.value)}
                  />
                </div>

                <div style={{ marginLeft: -30 }}>
                  <div
                    style={{
                      marginTop: 20,
                      fontSize: 16,
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    End date
                  </div>
                  <input
                    style={{
                      marginTop: 8,
                      width: "60%",
                      height: 30,
                      border: "1px solid #CCC",
                    }}
                    type={"text"}
                    //   placeholder={'Add Subject.'}
                    // value={fileName}
                    // onChange={e => setFileName(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  height: 180,
                  width: "92%",
                  border: "0.5px solid gray",
                }}
              ></div>

              <div style={{ display: "flex" }}>
                <input
                  style={{
                    marginLeft: 25,
                    marginTop: 15,
                    width: "70%",
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Send to people and groups"}
                  // value={fileName}
                  // onChange={e => setFileName(e.target.value)}
                />
                <div style={{ marginTop: 15, marginLeft: 8 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setScheduleReportModal(false);
                    }}
                    variant="outlined"
                  >
                    ADD
                  </Button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 25,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ marginRight: 10, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setScheduleReportModal(false);
                    }}
                    variant="outlined"
                  >
                    CANCEL
                  </Button>
                </div>
                <div style={{ marginRight: 20, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    // onClick={() => {

                    // }}
                    variant="outlined"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </>
          </Box>
        </Modal>
      )}

      {sendNowModal && (
        <Modal
          open={sendNowModal}
          onClose={() => setSendNowModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle2}>
            <>
              <CloseIcon
                onClick={() => setSendNowModal(false)}
                style={{
                  position: "absolute",
                  left: "95%",
                  top: "1%",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 25,
                  fontSize: 18,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Send {dashboardTitle}
              </div>

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Email this report to {"1"} person
              </div>

              <div
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  height: 180,
                  width: "92%",
                  border: "0.5px solid gray",
                }}
              ></div>

              <div style={{ display: "flex" }}>
                <input
                  style={{
                    marginLeft: 25,
                    marginTop: 15,
                    width: "70%",
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Send to people and groups"}
                  // value={fileName}
                  // onChange={e => setFileName(e.target.value)}
                />
                <div style={{ marginTop: 15, marginLeft: 8 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setSendNowModal(false);
                    }}
                    variant="outlined"
                  >
                    ADD
                  </Button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 25,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ marginRight: 10, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setSendNowModal(false);
                    }}
                    variant="outlined"
                  >
                    CANCEL
                  </Button>
                </div>
                <div style={{ marginRight: 20, marginBottom: 20 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    // onClick={() => {

                    // }}
                    variant="outlined"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          </Box>
        </Modal>
      )}

      {exportModal && (
        <Modal
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Share/Export {dashboardTitle}
              </div>
              <div style={{ display: "flex" }}>
                <IconButton
                  aria-describedby={id}
                  color="primary"
                  aria-label="add an alarm"
                  // onClick={

                  //     //  setActionsModal(true)
                  //     //  handleClick

                  // }
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <PrintIcon style={{ height: 50, width: 50 }} />
                    <label style={{ fontSize: 20 }}>Email</label>
                  </div>
                </IconButton>
              </div>
            </div>
          </Box>
        </Modal>
      )}

      {shareModal && (
        <Modal
          open={shareModal}
          onClose={() => setShareModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle2}>
            <>
              <CloseIcon
                onClick={() => setShareModal(false)}
                style={{
                  position: "absolute",
                  left: "95%",
                  top: "1%",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 25,
                  fontSize: 18,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Share {dashboardTitle}
              </div>

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Share with users and groups or enter an email address to invite
                a new user.
              </div>
              <div style={{ display: "flex" }}>
                <input
                  style={{
                    marginLeft: 25,
                    marginTop: 15,
                    width: "70%",
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Enter users, groups or emails"}
                  // value={fileName}
                  // onChange={e => setFileName(e.target.value)}
                />
                <div style={{ marginTop: 15, marginLeft: 8 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setSendNowModal(false);
                    }}
                    variant="outlined"
                  >
                    Share
                  </Button>
                </div>
              </div>

              <textarea
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  width: "92%",
                  height: 120,
                  border: "1px solid #CCC",
                  overflow: "auto",
                }}
                placeholder={"I thought you might find this card interesting."}
                //    value={widgetDesc}
                // onChange={e => setWidgetDesc(e.target.value)}
                cols={40}
                rows={10}
              />
              <div
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  height: 180,
                  width: "92%",
                  border: "0.5px solid gray",
                }}
              ></div>
            </>
          </Box>
        </Modal>
      )}

      <Modal
        open={isSaveDashboard}
        onClose={() => setIsSaveDashboard(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={widgetmodalstyle}>
          <>
            <CloseIcon
              onClick={() => setIsSaveDashboard(false)}
              style={{
                position: "absolute",
                left: "95%",
                top: "1%",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  marginLeft: 20,
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                DashBoard Title
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <input
                  style={{
                    marginLeft: 20,
                    alignSelf: "flex-start",
                    width: 350,
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Add Dashboard Title.."}
                  value={dashboardTitle}
                  onChange={(e) => setDashboardTitle(e.target.value)}
                />
              </div>

              <div
                style={{
                  marginLeft: 20,
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                DashBoard Description
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <textarea
                  style={{
                    marginLeft: 20,
                    width: 350,
                    height: 120,
                    border: "1px solid #CCC",
                    overflow: "auto",
                  }}
                  placeholder={"Add Dashboard Description.."}
                  value={dashboardDesc}
                  onChange={(e) => setDashboardDesc(e.target.value)}
                  cols={40}
                  rows={10}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ marginRight: 10, marginBottom: 20 }}>
                <Button
                  sx={{
                    bgcolor: "#0c0c0c",
                    color: "#CCC",
                    fontFamily: "Trebuchet MS",
                  }}
                  onClick={() => {
                    setIsSaveDashboard(false);
                  }}
                  variant="outlined"
                >
                  CANCEL
                </Button>
              </div>
              <div style={{ marginRight: 20, marginBottom: 20 }}>
                <Button
                  sx={{
                    bgcolor: "#0c0c0c",
                    color: "#CCC",
                    fontFamily: "Trebuchet MS",
                  }}
                  onClick={() => {
                    saveDesign(1);
                    setIsSaveDashboard(false);
                    viewExportedDashboards();
                  }}
                  variant="outlined"
                >
                  SAVE {"&"} CLOSE
                </Button>
              </div>
            </div>
          </>
        </Box>
      </Modal>
    </>
  );
};

export default FavoriteViewOnlyDashboards;
