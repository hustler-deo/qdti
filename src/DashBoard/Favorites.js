import React, { useRef, useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
// Auth context
import { AuthContext } from "../context";
var widgetData,
  widgetId,
  widgetDetails,
  name,
  description,
  columnX,
  columnY,
  columnZ,
  category,
  chartType,
  chartSubType,
  operationsBox,
  columnXData,
  columnYData,
  columnZData,
  dataUsedInWidget,
  columns;

var flag = 0;
var widgetsTempStore;
const FavoriteWidgets = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const actionsList = [
    "Edit",
    "Share",
    "Edit Drill Path",
    "Schedule as Report",
    "Edit Scheduled Reports",
    "Send Now",
    "Send/Export",
    "Remove from Favourites",
    "Notify me on issues",
    "Save As",
    "Connect/Update data",
    "Report an Issue",
    "Delete",
  ];

  const modalstyle2 = {
    position: "relative",
    top: "5%",
    left: "28%",
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
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 380,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
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

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();
  const [widgets, setWidgets] = useState();
  const [favouriteWidgets, setFavouriteWidgets] = useState();

  const [flowIdPresent, setFlowIdPresent] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [scheduleReportModal, setScheduleReportModal] = useState(false);

  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetDesc, setWidgetDesc] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [noIssueDetails, setNoIssueDetails] = useState(false);

  const [isSaveWidget, setIsSaveWidget] = useState(false);
  const [sendNowModal, setSendNowModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [reported, setReported] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteWidgetSuccess, setDeleteWidgetSuccess] = useState(false);

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
      console.log("W-Id", widgetId);
      flag == 0 &&
        history.push({
          pathname:
            "/Widget Dashboard/" + widgetId + "/" + global.subscription_id,
          state: { data: widgetData, id: widgetId, desc: widgetDesc },
        });
    }
    if (index1 === 1) setShareModal(true);
    if (index1 === 2)
      history.push({ pathname: "/Edit_Drill_Path", state: widgetId });
    if (index1 === 3) setScheduleReportModal(true);
    if (index1 === 5) setSendNowModal(true);
    if (index1 === 6) setExportModal(true);
    if (index1 === 7) {
      removeFromFavorites();
      widget_viewall();
    }

    if (index1 === 9) setIsSaveWidget(true);
    if (index1 === 10)
      history.push("/Import Dataset/" + global.subscription_id);
    if (index1 === 11) setReportIssueModal(true);
    if (index1 === 12) setDeleteModal(true);

    handleClose();
  };

  const widgetOperationsAdd = () => {
    setTimeout(() => {
      // console.log('Data save', mode, widgetId, operationsBox)
      axios
        .post(
          configData.API_URL +
            "personalAccount/database/widget_operations_save",
          {
            account_id: localStorage.getItem("account_id").toString(),
            name: widgetTitle,
            description: widgetDesc,
            xColumn: columnX,
            yColumn: columnY,
            zColumn: columnZ,
            flow_graph: "",
            chart_category: category,
            chart_type: chartType,
            graphType: chartSubType,
            operation: operationsBox,
          },
          {}
        )
        .then((response) => {
          console.log(
            "New widget operations save API response",
            response.data.data.insertId
          );

          widgetDataSave(response.data.data.insertId, 1);

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
    }, 1000);
  };

  const widgetDataSave = (Id, mode) => {
    setTimeout(() => {
      axios
        .post(
          configData.API_URL + "personalAccount/database/widget_data_save",
          {
            widget_id: Id,
            x: columnXData,
            y: columnYData,
            z: columnZData,
            result: dataUsedInWidget,
            columns: columns,
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
    }, 1000);
  };

  const deleteWidget = () => {
    console.log("deleted widgetId", widgetId);
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_delete",
        {
          widget_id: widgetId,
        },
        {}
      )
      .then((response) => {
        console.log("widget_delete API success", response);
        if (response.data.status) setDeleteWidgetSuccess(true);
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
    console.log("reported widgetId", widgetId);
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_delete",
        {
          widget_id: widgetId,
          issue: issueDetails,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("report issue API success", response);

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

  const widget_viewall = () => {
    setTimeout(() => {
      axios
        .post(
          configData.API_URL + "personalAccount/database/widget_viewall",
          {
            account_id: localStorage.getItem("account_id").toString(),
          },

          {}
        )
        .then((response) => {
          console.log("response", response.data.data);
          setWidgets(response.data.data);
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
    }, 1000);
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
    setDeleteWidgetSuccess(false);
  };
  useEffect(() => {
    // console.log(location.pathname)
    //console.log(location.state)
    widget_viewall();
    // setCards(location.state)
  }, [location]);

  useEffect(() => {
    if (widgets && widgets.length > 0) {
      widgetsTempStore = widgets.filter((e, i) => e.isFavorite === 1);
    }
    setFavouriteWidgets(widgetsTempStore);
  }, [widgets]);

  const removeFromFavorites = () => {
    console.log("favorite widgetId", widgetId);
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_remove_favorite",
        {
          widget_id: widgetId,
        },
        {}
      )
      .then((response) => {
        console.log("remove frome favorites API success", response);
        setRemoveSuccess(true);
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
                        <IosShareIcon />
                      ) : index === 7 ? (
                        <StarIcon />
                      ) : index === 13 ? (
                        <ContentCopyIcon />
                      ) : index === 9 ? (
                        <SaveAsIcon />
                      ) : index === 12 ? (
                        <DeleteForeverIcon />
                      ) : null}
                    </ListItemIcon>

                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Popover>
          <div
            style={{
              marginTop: -50,
              width: "100%",
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
              FAVOURITE WIDGETS
            </h2>
            <div
              style={{
                marginLeft: !flowIdPresent ? 520 : 760,
                position: "absolute",
              }}
            >
              {!flowIdPresent && (
                <Alert
                  style={{ height: 32, alignItems: "center" }}
                  severity={"error"}
                >
                  Select a flow from batches first
                </Alert>
              )}
            </div>

            <div style={{ marginLeft: "55%", marginRight: 8 }}>
              <Button
                sx={{
                  bgcolor: "#0c0c0c",
                  color: "#ffe55d",
                  "&:hover, &:focus": {
                    bgcolor: "#ffe55d",
                    color: "#0c0c0c",
                  },
                }}
                onClick={() => {
                  localStorage.getItem("FlowID") === null
                    ? setFlowIdPresent(false)
                    : history.push(
                        "Widget Dashboard/new/" + global.subscription_id
                      );
                }}
                variant="outlined"
              >
                Create New Widget
              </Button>
            </div>
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
              {/* WIDGET LIST START  */}
              {favouriteWidgets && favouriteWidgets.length > 0 ? (
                <div
                  style={{
                    marginLeft: "1%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: width,
                    flexWrap: "wrap",
                  }}
                >
                  {favouriteWidgets &&
                    favouriteWidgets.map((e, i) => (
                      <>
                        {e.isFavorite === 1 && (
                          <div
                            style={{
                              cursor: "pointer",
                              margin: 15,
                              display: "flex",
                              flexDirection: "column",
                              height: 220,
                              width: "40%",
                              backgroundColor: "white",
                              // background:
                              //   'linear-gradient(to bottom right, #c7a85b 25%, #f7e2a6)',
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
                                  "/Widget Dashboard/" +
                                  e.id +
                                  "/" +
                                  global.subscription_id,
                                state: { data: e, id: e.id },
                              })
                            }
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "inherit",
                                borderBottom: "1px solid #d2d4d6",
                                marginBottom: 20,
                              }}
                            >
                              {/* WIDGET NAME DIV START */}
                              <div
                                style={{
                                  marginTop: 5,
                                  marginLeft: 20,
                                  fontSize: 18,
                                  fontWeight: "bold",
                                  width: "90%",
                                  display: "flex",
                                  flexwrap: "wrap",
                                  fontFamily: "Trebuchet MS",
                                  height: 30,
                                  overflowX: "auto",
                                  color: "#914f25",
                                }}
                              >
                                {e.name}
                              </div>
                              {/* WIDGET NAME DIV END */}
                              {/* WIDGET ACTION ICON START */}
                              <div
                                style={{ width: "5%", marginRight: 15 }}
                                onMouseEnter={() => {
                                  flag = 1;
                                  widgetData = e;
                                  widgetId = e.id;
                                  widgetDetails = e.operations;
                                  setWidgetTitle(e.name);
                                  setWidgetDesc(e.discription);
                                  columnX = JSON.parse(widgetDetails).xColumn;
                                  columnY = JSON.parse(widgetDetails).yColumn;
                                  columnZ = JSON.parse(widgetDetails).zColumn;
                                  category =
                                    JSON.parse(widgetDetails).chart_category;
                                  chartType =
                                    JSON.parse(widgetDetails).chart_type;
                                  chartSubType =
                                    JSON.parse(widgetDetails).graphType;
                                  operationsBox =
                                    JSON.parse(widgetDetails).operation;

                                  columnXData = JSON.parse(e.data).x;
                                  columnYData = JSON.parse(e.data).y;

                                  columnZData = JSON.parse(e.data).z;

                                  dataUsedInWidget = JSON.parse(e.data).result;
                                  columns = JSON.parse(e.data).columns;

                                  console.log("onEnter", widgetId, widgetData);
                                }}
                                onMouseLeave={() => {
                                  flag = 0;
                                }}
                              >
                                <IconButton
                                  aria-describedby={id}
                                  color="primary"
                                  aria-label="add an alarm"
                                  onClick={handleClick}
                                  sx={{
                                    "&:hover, &:focus": {
                                      bgcolor: "#FFe8a876",
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
                                {/* WIDGET ACTION ICON END */}
                              </div>
                            </div>
                            <div style={{ width: "100%", display: "inherit" }}>
                              {/* WIDGET DESCRIPTION START */}
                              <div
                                style={{
                                  marginLeft: 20,
                                  marginTop: 8,
                                  width: "70%",
                                  height: 140,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  overflowY: "auto",
                                  textAlign: "left",
                                  fontSize: 13,
                                }}
                              >
                                {e.discription}
                              </div>
                              {/* WIDGET DESCRIPTION END */}
                              {/* WIDGET DESCRIPTION IMAGE START */}
                              <img
                                src={"/widgetThumbnail.png"}
                                // src="https://d334lak5lb2pjo.cloudfront.net/wp-content/uploads/data-visualization-1300x962.jpeg"
                                style={{ height: "155px", width: "280px" }}
                              />
                              {/* WIDGET DESCRIPTION IMAGE END */}
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              ) : widgets === undefined && favouriteWidgets === undefined ? (
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
                  No Favourite Widgets
                </div>
              )}
              {/* WIDGET LIST END  */}
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        history.push("Login")
      )}

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
                Schedule report for {widgetTitle}
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
                    //   exportHtml()
                    //   setTimeout(() => {
                    //     viewExportedDashboards()
                    //   }, 2000)
                    //   setisExportDashboard(false)
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
                Send {widgetTitle}
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
                    //   exportHtml()
                    //   setTimeout(() => {
                    //     viewExportedDashboards()
                    //   }, 2000)
                    //   setisExportDashboard(false)
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
                Share/Export {widgetTitle}
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

                <IconButton
                  style={{ marginLeft: 10 }}
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
                    <EmailIcon style={{ height: 50, width: 50 }} />
                    <label style={{ fontSize: 20 }}>Print</label>
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
                Share {widgetTitle}
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
        open={isSaveWidget}
        onClose={() => setIsSaveWidget(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={widgetmodalstyle}>
          <>
            <CloseIcon
              onClick={() => setIsSaveWidget(false)}
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
                  }}
                >
                  Widget Title
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
                      alignSelf: "center",
                      width: "90%",
                      height: 40,
                      border: "1px solid #CCC",
                    }}
                    type={"text"}
                    placeholder={"Add Widget Title.."}
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  border: "0.5px solid #CCC",
                  height: 160,
                  width: "90%",
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
                  Widget Description
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    style={{
                      width: "90%",
                      height: 120,
                      border: "1px solid #CCC",
                      overflow: "auto",
                    }}
                    placeholder={"Add Widget Description.."}
                    value={widgetDesc}
                    onChange={(e) => setWidgetDesc(e.target.value)}
                    cols={40}
                    rows={10}
                  />
                </div>
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
                    setIsSaveWidget(false);
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
                    widgetOperationsAdd();
                    setIsSaveWidget(false);
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
                  Are you sure you want to delete this widget? This action
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
                      deleteWidget();
                      setDeleteModal(false);
                      widget_viewall();
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
                <Stack sx={{ width: "90%", marginRight: 6 }}>
                  <Alert
                    style={{ fontFamily: "Trebuchet MS" }}
                    severity={"success"}
                  >
                    Reported an issue successfully!
                  </Alert>
                </Stack>
              )}
              {noIssueDetails && (
                <Stack sx={{ width: "90%", marginRight: 6 }}>
                  <Alert
                    style={{ fontFamily: "Trebuchet MS" }}
                    severity={"error"}
                  >
                    Please enter an issue details
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
                    if (issueDetails === "") {
                      setNoIssueDetails(true);
                      setTimeout(() => setNoIssueDetails(false), 2500);
                      return;
                    } else {
                      reportIssue();
                      setTimeout(() => setReported(false), 2000);
                      setTimeout(() => setIssueDetails(""), 1000);
                      setTimeout(() => setReportIssueModal(false), 2200);
                    }
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
        open={deleteWidgetSuccess}
        autoHideDuration={1500}
        onClose={handleClose4}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Widget Deleted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteWidgets;
