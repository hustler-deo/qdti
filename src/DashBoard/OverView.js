import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import { CSVLink } from "react-csv";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShareIcon from "@mui/icons-material/Share";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarIcon from "@mui/icons-material/Star";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import PrintIcon from "@mui/icons-material/Print";
import TableRowsIcon from "@mui/icons-material/TableRows";
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
  columns,
  dataToExport;

var flag = 0,
  added = 0,
  category1 = [],
  category2 = [];
const OverView = () => {
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
    "Add to Favourites",
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

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const csvLink = useRef();

  const location = useLocation();
  const [widgets, setWidgets] = useState();

  const [addSuccess, setAddSuccess] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteWidgetSuccess, setDeleteWidgetSuccess] = useState(false);

  const [flowIdPresent, setFlowIdPresent] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [noWidgetTitle, setNoWidgetTitle] = useState(false);

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
  const [addedToFav, setAddedToFav] = useState(false);
  const [widgetSaved, setWidgetSaved] = useState(false);
  const [searchedWidget, setSearchedWidget] = useState();
  const [tempWidgetsBox, setTempWidgetsBox] = useState();

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
      console.log("W-Id", widgetId, added);
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
      added === 1 ? removeFromFavorites() : addToFavorites();
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
          if (response.data.status) {
            setWidgetSaved(true);
            widget_viewall();
            setTimeout(() => setIsSaveWidget(false), 2500);
            setTimeout(() => setWidgetSaved(false), 2500);
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

  const addToFavorites = () => {
    console.log("favorite widgetId", widgetId);
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_add_favorite",
        {
          widget_id: widgetId,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("add to favorite API success", response);
        widget_viewall();
        setAddSuccess(true);
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
    setAddSuccess(false);
  };

  const handleClose3 = (event, reason) => {
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
  const reportIssue = () => {
    //   console.log('reported widgetId', widgetId)
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_report_issue",
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

  const exportCSV = () => {
    //  <CSVDownload data={data && data} target='_blank' />

    console.log("CSV");
    csvLink.current.link.click();
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

          setTempWidgetsBox(response.data.data);
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

  const removeFromFavorites = () => {
    console.log("remove from favorite widgetId", widgetId);
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
        widget_viewall();
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
  useEffect(() => {
    widget_viewall();
  }, [location]);

  const handleSearchWidget = (event) => {
    setSearchedWidget(event.target.value);
  };

  useEffect(() => {
    if (tempWidgetsBox && tempWidgetsBox.length > 0) {
      var found = tempWidgetsBox.filter((element) =>
        element.name.toLowerCase().includes(searchedWidget.toLowerCase())
      );
      // console.log('seachedBox', found)
      setWidgets(found);
    }
  }, [searchedWidget]);

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

                    <ListItemText
                      primary={
                        added == 1 && index == 7
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
              WIDGET OVERVIEW
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
            <div
              style={{
                marginLeft: "42%",
                display: "flex",
              }}
            >
              <div style={{ marginRight: 15 }}>
                <input
                  style={{
                    height: 35,
                    border: "0.5px solid grey",
                    backgroundColor: "#F2F1F9",
                    width: "190px",
                    padding: "10px",
                    fontSize: 14,
                    outline: "none",
                    borderRadius: "4px",
                    fontFamily: "Trebuchet MS",
                    paddingLeft: "20px",
                  }}
                  type="text"
                  placeholder="Search Widgets"
                  onChange={handleSearchWidget}
                  value={searchedWidget}
                />
              </div>
              <div style={{ marginRight: 10 }}>
                <Button
                  sx={{
                    backgroundColor: "#0c0c0c",
                    color: "#ffe55d",
                    "&:hover, &:focus": {
                      bgcolor: "#067ab4",
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
              {widgets && widgets.length > 0 ? (
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
                  {widgets &&
                    widgets.map((e, i) => (
                      <>
                        <div
                          style={{
                            cursor: "pointer",
                            margin: 15,
                            display: "flex",
                            flexDirection: "column",
                            height: 220,
                            width: "40%",
                            backgroundColor: "white",
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
                              state: { data: e, id: e.id, desc: e.discription },
                            })
                          }
                        >
                          <div
                            style={{
                              width: "100%",
                              display: "inherit",
                              borderBottom: "1px solid #E5E7E9",
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
                                if (e.isFavorite == 1) {
                                  setAddedToFav(true);
                                  added = 1;
                                } else added = 0;
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

                                dataToExport = dataUsedInWidget;
                                console.log(
                                  "onEnter",
                                  widgetId,
                                  JSON.parse(e.data)
                                );
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
                            {/* WIDGET ACTION ICON END */}
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
                                // color: '#d8ba72',
                                fontFamily: "Trebuchet MS",
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
                      </>
                    ))}
                </div>
              ) : widgets === undefined ? (
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
                  No Widgets
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
                  //      setActionsModal(true)
                  //       handleClick()
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
                  onClick={() => {
                    exportCSV();
                    setExportModal(false);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <TableRowsIcon style={{ height: 50, width: 50 }} />
                    <label style={{ fontSize: 20 }}>CSV</label>
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
        onClose={() => {
          setIsSaveWidget(false);
          setNoWidgetTitle(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={widgetmodalstyle}>
          <>
            <CloseIcon
              onClick={() => {
                setIsSaveWidget(false);
                setNoWidgetTitle(false);
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
                Widget Title
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
                    alignSelf: "center",
                    width: 350,
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
                placeholder={"Add Widget Description.."}
                value={widgetDesc}
                onChange={(e) => setWidgetDesc(e.target.value)}
                cols={40}
                rows={10}
              />
            </div>

            <div
              style={{
                marginTop: 25,
                display: "flex",
                alignSelf: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {noWidgetTitle && (
                <Alert
                  style={{
                    height: 40,
                    marginLeft: -35,
                    alignItems: "center",
                  }}
                  severity={"error"}
                >
                  Please enter widget title
                </Alert>
              )}
              {widgetSaved && (
                <Alert
                  style={{
                    height: 40,
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  severity={"success"}
                >
                  Widget saved successfully!
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
                    setIsSaveWidget(false);
                    setNoWidgetTitle(false);
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
                    if (widgetTitle === "") {
                      setNoWidgetTitle(true);
                      return;
                    } else {
                      widgetOperationsAdd();
                      // setIsSaveWidget(false)
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
        onClose={() => {
          setReportIssueModal(false);
          setIssueDetails("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={reportModalStyle}>
          <>
            <CloseIcon
              onClick={() => {
                setReportIssueModal(false);
                setIssueDetails("");
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
      {dataToExport && (
        <CSVLink
          data={dataToExport && dataToExport}
          filename={widgetTitle}
          ref={csvLink}
          target="_blank"
        ></CSVLink>
      )}

      <Snackbar
        open={addSuccess}
        autoHideDuration={1500}
        onClose={handleClose2}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Added to Favourite Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={removeSuccess}
        autoHideDuration={1500}
        onClose={handleClose3}
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

export default OverView;
