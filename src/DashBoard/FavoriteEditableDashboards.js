import React, { useRef, useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
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
import Snackbar from "@mui/material/Snackbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import CircularProgress from "@mui/material/CircularProgress";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
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
import ReportIcon from "@mui/icons-material/Report";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

// Auth context
import { AuthContext } from "../context";

var flag = 0,
  added = 0;
var tempDashboards;
const FavoriteEditableDashboards = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const [dashboards, setDashboards] = useState();
  const [dashboardId, setDashboardId] = useState([]);

  const [favouriteDashboards, setFavouriteDashboards] = useState();

  const [dashdata, setDashData] = useState([]);
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

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [isSaveDashboard, setIsSaveDashboard] = useState(false);

  const [reported, setReported] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteDashboardSuccess, setDeleteDashboardSuccess] = useState(false);

  const [noDashboardTitle, setNoDashboardTitle] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteModalStyle = {
    position: "relative",
    top: "30%",
    left: "28%",
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
    top: "28%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 310,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "4px",
  };

  const reportModalStyle = {
    position: "relative",
    top: "20%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 300,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (index1) => {
    setselectedActionIndex(index1);
    if (index1 === 0) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
      });
    }

    if (index1 === 1) added === 1 ? removeFromFavorites() : addToFavorites();
    if (index1 === 2) setIsSaveDashboard(true);
    if (index1 === 3) setReportIssueModal(true);
    if (index1 === 4) setDeleteModal(true);

    handleClose();
  };

  const actionsList = [
    "Edit",
    // 'Share',
    // 'Schedule as Report',
    // 'Edit Scheduled Reports',
    // 'Send Now',
    // 'Send/Export',
    // 'Add to Favourites',
    // 'Notify me on issues',
    "Add To Favourites",
    "Save As",
    "Report an Issue",
    "Delete",
  ];

  useEffect(() => {
    localStorage.setItem("viewMode", 0);
    getAllDashboards();
  }, []);

  useEffect(() => {
    if (dashboards && dashboards.length > 0) {
      tempDashboards = dashboards.filter((e, i) => e.isFavorite === 1);
    }
    setFavouriteDashboards(tempDashboards);
  }, [dashboards]);

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
        // dashboardId = response.data.data.id
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

  const saveDesign = (mode) => {
    axios
      .post(
        mode == 1
          ? configData.API_URL + "personalAccount/database/dashboard_save"
          : configData.API_URL + "personalAccount/database/dashboard_edit",
        mode == 1
          ? {
              account_id: localStorage.getItem("account_id").toString(),
              name: dashboardTitle,
              description: dashboardDesc,
              data: JSON.parse(dashdata),
            }
          : {
              id: "1",
              data: "data",
            },

        {}
      )
      .then((response) => {
        console.log("response", response.data);

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
    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_parent_delete",
        {
          dashboard_id: dashboardId,
        },

        {}
      )
      .then((response) => {
        console.log("response", response.data.data);
        if (response.data.status) setDeleteDashboardSuccess(true);
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
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/dashboard_parent_report_issue",
        {
          dashboard_id: dashboardId,
          issue: issueDetails,
          account_id: localStorage.getItem("account_id").toString(),
        },

        {}
      )
      .then((response) => {
        console.log("response", response.data.data);

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
        configData.API_URL +
          "personalAccount/dashboard/editabledashboard_add_favorite",
        {
          dashboard_id: dashboardId,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("add to favorite editable dashboard API success", response);

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
          "personalAccount/dashboard/editabledashboard_remove_favorite",
        {
          dashboard_id: dashboardId,
        },
        {}
      )
      .then((response) => {
        console.log("remove frome favorites API success", response);
        setRemoveSuccess(true);
        setTimeout(() => getAllDashboards(), 500);

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

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemoveSuccess(false);
  };

  const handleClose4 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteDashboardSuccess(false);
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
                      ) : index === 2 ? (
                        <SaveAsIcon />
                      ) : index === 5 ? (
                        <SendIcon />
                      ) : index === 6 ? (
                        <IosShareIcon />
                      ) : index === 1 ? (
                        // <StarIcon />
                        <VolunteerActivismIcon />
                      ) : index === 13 ? (
                        <ContentCopyIcon />
                      ) : index === 8 ? (
                        <ShareIcon />
                      ) : index === 4 ? (
                        <DeleteForeverIcon />
                      ) : index === 3 ? (
                        <ReportIcon />
                      ) : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        added == 1 && index == 1
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
              marginTop: -50,
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
              FAVOURITE DASHBOARDS
            </h2>
          </div>

          <Accordion
            style={{
              width: 1150,
              marginLeft: 100,
              boxShadow: 3,
              border: "0.01px solid #e2e2e2",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontFamily: "Trebuchet MS" }}>
                Type 1
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {favouriteDashboards && favouriteDashboards.length > 0 ? (
                <div
                  style={{
                    marginTop: 0,
                    marginLeft: "1%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: width,
                    flexWrap: "wrap",
                  }}
                >
                  {favouriteDashboards &&
                    favouriteDashboards.map((e, i) => (
                      <>
                        {e.isFavorite === 1 && (
                          <div
                            style={{
                              cursor: "pointer",
                              margin: 10,
                              flexDirection: "column",
                              height: 245,
                              width: "28%",
                              backgroundColor: "#fbfafe",
                              border: "0.5px solid #CCC",
                              boxShadow: "1px 3px 1px 1px  #E5E7E9",
                              borderRadius: 4 + "px",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              flexWrap: "wrap",
                            }}
                            onClick={() =>
                              flag == 0 &&
                              history.push({
                                pathname:
                                  "/Main_Dashboard/" + global.subscription_id,
                                state: e,
                              })
                            }
                          >
                            <div
                              style={{
                                width: "50%",
                                display: "block",
                                float: "left",
                                marginBottom: 20,
                              }}
                            >
                              <div
                                style={{
                                  marginLeft: 20,
                                  marginTop: 5,
                                  fontSize: 18,
                                  fontFamily: "Trebuchet MS",
                                  fontWeight: "bold",
                                  width: "90%",
                                  textAlign: "left",
                                  height: 60,
                                  overflowY: "auto",
                                  color: "#914f25",
                                }}
                              >
                                {e.name}
                              </div>
                              <div
                                style={{
                                  marginLeft: 20,
                                  marginTop: 8,
                                  width: "90%",
                                  paddingRight: 10,
                                  fontSize: 13,
                                  overflowY: "auto",
                                  textAlign: "left",
                                  fontSize: 13,
                                  height: 110,
                                }}
                              >
                                {e.description
                                  ? e.description
                                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                              </div>
                            </div>
                            <div
                              style={{
                                width: "50%",
                                display: "block",
                                float: "left",
                              }}
                            >
                              <img
                                src="https://st4.depositphotos.com/11395550/25440/v/950/depositphotos_254407380-stock-illustration-data-visualization-illustration.jpg?forcejpeg=true"
                                style={{ height: "190px", width: "220px" }}
                              />
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "block",
                                float: "left",
                                background:
                                  "linear-gradient(to bottom right, #f7e2a6 40%, #c7a85b)",
                              }}
                            >
                              <div
                                onMouseEnter={() => {
                                  setDashboardId(e.id);
                                  setDashData(e.data);
                                  setData2(e);
                                  setDashboardTitle(e.name);
                                  flag = 1;
                                  if (e.isFavorite == 1) {
                                    setAddedToFav(true);
                                    added = 1;
                                  } else added = 0;
                                }}
                                onMouseLeave={() => {
                                  flag = 0;
                                }}
                                style={{ width: "100%", position: "inherit" }}
                              >
                                <IconButton
                                  aria-describedby={id}
                                  color="primary"
                                  aria-label="add an alarm"
                                  onClick={handleClick}
                                  sx={{
                                    "&:hover, &:focus": {
                                      bgcolor: "#FA9d6336",
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <SettingsSuggestIcon
                                      sx={{ color: "#914f25" }}
                                    />
                                  </div>
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              ) : dashboards === undefined &&
                favouriteDashboards === undefined ? (
                <Box
                  sx={{
                    marginTop: "-4%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <CircularProgress sx={{ color: "#b86b31" }} />
                </Box>
              ) : (
                <div style={{ marginTop: "-3%", fontFamily: "Trebuchet MS" }}>
                  No Favourite Dashboards
                </div>
              )}
            </AccordionDetails>
          </Accordion>
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
                      getAllDashboards();
                    }}
                    variant="outlined"
                  >
                    Delete Dashboard
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

      <Modal
        open={isSaveDashboard}
        onClose={() => {
          setIsSaveDashboard(false);
          setNoDashboardTitle(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={widgetmodalstyle}>
          <>
            <CloseIcon
              onClick={() => {
                setIsSaveDashboard(false);
                setNoDashboardTitle(false);
              }}
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
              {noDashboardTitle && (
                <Alert
                  style={{
                    height: 40,
                    width: 220,
                    alignItems: "center",
                    marginRight: 20,
                    padding: 5,
                  }}
                  severity={"error"}
                >
                  Please enter dashboard title
                </Alert>
              )}
              <div style={{ marginRight: 10, marginBottom: 20 }}>
                <Button
                  sx={{
                    bgcolor: "#0c0c0c",
                    color: "#CCC",
                    fontFamily: "Trebuchet MS",
                  }}
                  onClick={() => {
                    setIsSaveDashboard(false);
                    setNoDashboardTitle(false);
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
                    if (dashboardTitle === "") {
                      setNoDashboardTitle(true);
                      return;
                    } else {
                      saveDesign(1);
                      setIsSaveDashboard(false);
                      // getAllDashboards()
                    }
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

      <Snackbar
        open={removeSuccess}
        autoHideDuration={1500}
        onClose={handleClose2}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Removed from Favourite Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteDashboardSuccess}
        autoHideDuration={1500}
        onClose={handleClose4}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Dashboard Deleted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteEditableDashboards;
