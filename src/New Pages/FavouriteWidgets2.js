import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "react-elastic-carousel";

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
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Plot from "react-plotly.js";
import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Modal from "@mui/material/Modal";
import Popover from "@mui/material/Popover";
import { CSVLink } from "react-csv";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import BuildIcon from "@mui/icons-material/Build";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ReportIcon from "@mui/icons-material/Report";
import CableIcon from "@mui/icons-material/Cable";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ForkRightIcon from "@mui/icons-material/ForkRight";

// Auth context
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

var flag = 0;
var widgetsTempStore;

const options = [
  { value: "Column1", label: "Column1" },
  { value: "Column2", label: "Column2" },
  { value: "Column3", label: "Column3" },
  { value: "Column4", label: "Column4" },
  { value: "Column5", label: "Column5" },
  { value: "Column6", label: "Column6" },
];

const categories = [
  "Computer Science",
  "Education",
  "Classification",
  "Computer Vision",
  "NLP",
  "Data Visualization",
];

const columns2 = [
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
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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

var flag = 0,
  added = 0,
  category1 = [],
  category2 = [];
const FavoriteWidgets2 = () => {
  const images = [
    "/widgets/widget1.png",
    "/widgets/widget2.png",
    "/widgets/widget3.png",
    "/widgets/widget4.png",
    "/widgets/widget5.png",
    "/widgets/widget6.png",
    "/widgets/widget7.png",
    "/widgets/widget8.png",
    "/widgets/widget9.png",
    "/widgets/widget10.png",
    "/widgets/widget11.png",
    "/widgets/widget12.png",
    "/widgets/widget13.png",
    "/widgets/widget14.png",
    "/widgets/widget15.jpg",
    "/widgets/widget16.jpg",
    "/widgets/widget17.png",
    "/widgets/widget18.png",
    "/widgets/widget19.png",
    "/widgets/widget20.png",
  ];
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rowsData, setrowsData] = React.useState(rows);
  const [columnData, setColumnData] = React.useState(columns);

  const [clickedShape, setclickedShape] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [recentWidgets, setRecentWidgets] = useState([]);

  const [aggFunction, setAggFunction] = React.useState("");
  const [column, setColumn] = React.useState("");
  const [cname, setCname] = React.useState("agecc");
  const [type, setType] = React.useState(1);

  const [sortAsc, setSortAsc] = useState(false);

  const history = useHistory();
  const csvLink = useRef();

  const authContext = useContext(AuthContext);

  const location = useLocation();

  // const actionsList = [
  //   "Edit",
  //   "Share",
  //   "Edit Drill Path",
  //   "Schedule as Report",
  //   "Edit Scheduled Reports",
  //   "Send Now",
  //   "Send/Export",
  //   "Remove from Favourites",
  //   "Notify me on issues",
  //   "Save As",
  //   "Connect/Update data",
  //   "Report an Issue",
  //   "Delete",
  // ];
  const actionsList = [
    {
      id: 1,
      name: "Edit",
    },
    {
      id: 2,
      name: "Edit Drill Path",
    },
    // {
    //   id: 3,
    //   name: "Schedule as Report",
    // },
    // {
    //   id: 4,
    //   name: "Edit Scheduled Reports",
    // },
    {
      id: 5,
      name: "Send/Export",
    },
    {
      id: 6,
      name: "Add to Favourites",
    },
    // {
    //   id: 7,
    //   name: "Notify me on issues",
    // },
    {
      id: 8,
      name: "Save As",
    },
    {
      id: 9,
      name: "Connect/Update data",
    },
    {
      id: 10,
      name: "Report an Issue",
    },
    {
      id: 11,
      name: "Delete",
    },
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
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 300,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  };

  const [widgets, setWidgets] = useState();
  const [favouriteWidgets, setFavouriteWidgets] = useState();

  const [addSuccess, setAddSuccess] = useState(false);

  const [flowIdPresent, setFlowIdPresent] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [scheduleReportModal, setScheduleReportModal] = useState(false);

  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetDesc, setWidgetDesc] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [noIssueDetails, setNoIssueDetails] = useState(false);

  const [noWidgetTitle, setNoWidgetTitle] = useState(false);
  const [isSaveWidget, setIsSaveWidget] = useState(false);
  const [sendNowModal, setSendNowModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteWidgetSuccess, setDeleteWidgetSuccess] = useState(false);

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

  const handleOnClick = (Id) => {
    setselectedActionIndex(Id);
    if (Id === 1) {
      console.log("W-Id", widgetId, added);
      if (widgetData) {
        flag == 0 &&
          history.push({
            pathname:
              "/Widget Dashboard/" + widgetId + "/" + global.subscription_id,
            state: { data: widgetData, id: widgetId, desc: widgetDesc },
          });
      } else alert("Widget does not contain data!");
    }
    // if (index1 === 1) {
    //   setShareModal(true);
    //   shareWidget();
    // }
    if (Id === 2)
      history.push({ pathname: "/Edit_Drill_Path", state: widgetId });

    if (Id === 3) setScheduleReportModal(true);
    // if (index1 === 5) {
    //   // sendWidgetonMail()
    //   setSendNowModal(true);
    // }
    if (Id === 5) setExportModal(true);
    if (Id === 6) {
      added === 1 ? removeFromFavorites() : addToFavorites();
    }

    if (Id === 8) setIsSaveWidget(true);
    if (Id === 9) history.push("/Import Dataset/" + global.subscription_id);
    if (Id === 10) setReportIssueModal(true);
    if (Id === 11) setDeleteModal(true);

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
            type: 1,
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

  const exportCSV = () => {
    //  <CSVDownload data={data && data} target='_blank' />

    console.log("CSV");
    csvLink.current.link.click();
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
          // console.log('response', response.data.data)
          let widgetBox = response.data.data;
          for (let i = 0, j = 0; i < widgetBox.length; i++, j++) {
            if (j === 20) j = 0;
            widgetBox[i].img = images[j];
          }

          setWidgets(widgetBox);
          setTempWidgetsBox(widgetBox);

          let recent = widgetBox.slice(0, 7);
          setRecentWidgets(recent);
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
  useEffect(() => {
    // console.log(location.pathname)
    //console.log(location.state)
    widget_viewall();
    // setCards(location.state)
  }, []);

  const handleSearchWidget = (event) => {
    setSearchedWidget(event.target.value);
  };

  useEffect(() => {
    if (tempWidgetsBox && tempWidgetsBox.length > 0) {
      var found = tempWidgetsBox.filter((element) =>
        element.name.toLowerCase().includes(searchedWidget.toLowerCase())
      );
      console.log("seachedBox", found);
      setWidgets(found);
    }
  }, [searchedWidget]);

  useEffect(() => {
    widgetsTempStore = widgets?.filter((e, i) => e.isFavorite === 1);

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

  useEffect(() => {
    if (tempWidgetsBox && tempWidgetsBox.length > 0) {
      var found = tempWidgetsBox.filter((element) =>
        element.name.toLowerCase().includes(searchedWidget.toLowerCase())
      );
      // console.log('seachedBox', found)
      setWidgets(found);
    }
  }, [searchedWidget]);

  const handleSortWidgets = () => {
    let widgetsBox = favouriteWidgets;
    widgetsBox.sort(function (a, b) {
      let c = new Date(a?.created_at);
      let d = new Date(b?.created_at);
      if (!sortAsc) return d - c;
      else return c - d;
    });
    // console.log("sorted", widgetsBox);
    setFavouriteWidgets(widgetsBox);
    setSortAsc(!sortAsc);
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
                {actionsList.map((item, index) => (
                  <ListItem
                    selected={item?.id == selectedActionIndex}
                    button
                    key={index}
                    onClick={() => handleOnClick(item?.id)}
                  >
                    <ListItemIcon>
                      {item?.id === 1 ? (
                        <BorderColorIcon />
                      ) : item?.id === 13 ? (
                        <ShareIcon />
                      ) : item?.id === 12 ? (
                        <SendIcon />
                      ) : item?.id === 5 ? (
                        <IosShareIcon />
                      ) : item?.id === 6 ? (
                        <StarIcon />
                      ) : item?.id === 8 ? (
                        <SaveAsIcon />
                      ) : item?.id === 11 ? (
                        <DeleteForeverIcon />
                      ) : item?.id === 10 ? (
                        <ReportIcon />
                      ) : item?.id === 9 ? (
                        <CableIcon />
                      ) : item?.id === 7 ? (
                        <NotificationsActiveIcon />
                      ) : item?.id === 3 ? (
                        <ScheduleSendIcon />
                      ) : item?.id === 4 ? (
                        <EditNoteIcon />
                      ) : item?.id === 2 ? (
                        <ForkRightIcon />
                      ) : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        added == 1 && item?.id == 6
                          ? "Remove from favourites"
                          : item?.name
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Popover>
          <div
            style={{
              display: "flex",
              marginTop: "-100px",
              alignItems: "center",
              // justifyContent: 'space-between',
              width: "95%",
              paddingLeft: "9%",
              // maxHeight: "100px",
            }}
          >
            <div>
              <h2 style={{ marginTop: "20px" }}>Favorites</h2>
            </div>

            <div
              style={{ width: "38vw", marginLeft: "14%", marginTop: "20px" }}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  placeholder="    Search"
                  onChange={handleSearchWidget}
                  value={searchedWidget}
                  style={{
                    width: "100%",
                    background: "white",
                    borderRadius: "50px",
                    border: " 0.7px solid rgba(0, 0, 0, 0.8)",
                    height: "40px",
                    color: "black",
                    fontSize: "15px",
                    paddingLeft: "20px",
                  }}
                />
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
              </div>
            </div>

            {/* <Box
              sx={{
                width: "19%",
                margin: "0px auto",
                marginTop: "20px",
                maxHeight: "30px",
              }}
            >
              <FormControl fullWidth size={"small"}>
                <Select
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                  style={{
                    backgroundColor: "#F2F2F2",
                    fontSize: "15px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  displayEmpty
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem
                    value={-1}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      fontWeight: "500",
                    }}
                  >
                    Select Type
                  </MenuItem>
                  {categories?.map((item, index) => {
                    return (
                      <MenuItem
                        value={index}
                        style={{
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          fontWeight: "500",
                        }}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box> */}
          </div>

          {favouriteWidgets && (
            <div
              style={{
                display: "flex",
                marginTop: 30,
                marginRight: "5%",
                cursor: "pointer",
                float: "right",
                marginBottom: "20px",
                // backgroundColor: "red",
                // height: "50px",
                // width: "100px",
              }}
              onClick={() => handleSortWidgets()}
            >
              <div
                style={{
                  alignItems: "right",
                  marginRight: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#004AAD",
                }}
              >
                {sortAsc ? "New - Old" : "Old - New"}
              </div>
              <img
                src="/sort1.png"
                style={{
                  height: "22px",
                  width: "22px",
                  marginRight: "10px",
                  marginTop: "5px",
                }}
                onClick={() => console.log("sort ")}
              />
            </div>
          )}

          {favouriteWidgets && favouriteWidgets.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "90%",
                marginLeft: "8%",
                marginBottom: "20px",
                // justifyContent: 'space-around'
              }}
            >
              {favouriteWidgets &&
                favouriteWidgets.map((e, i) => (
                  <div
                    style={{
                      border: "1.17215px solid #CBC6C6",
                      borderRadius: "20px",
                      boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                      height: "40vh",
                      width: "28vw",
                      marginBottom: "2%",
                      marginLeft: "1.4%",
                    }}
                  >
                    <div style={{ display: "flex", height: "68%" }}>
                      <img
                        src={e?.img}
                        style={{
                          resizeMode: "contain",
                          height: "95%",
                          width: "90%",
                          marginLeft: "10px",
                          marginRight: "10px",
                          marginTop: "10px",
                        }}
                      />
                      <div style={{ width: "5%" }}>
                        <MoreVertIcon
                          style={{
                            cursor: "pointer",
                            marginTop: "10px",
                            marginLeft: "-10px",
                          }}
                          onMouseEnter={() => {
                            flag = 1;
                            if (e?.isFavorite == 1) {
                              setAddedToFav(true);
                              added = 1;
                            } else added = 0;
                            widgetData = e;
                            widgetId = e?.id;
                            widgetDetails = e?.operations;
                            setWidgetTitle(e?.name);
                            setWidgetDesc(e?.discription);
                            if (widgetDetails) {
                              columnX = JSON.parse(widgetDetails).xColumn;
                              columnY = JSON.parse(widgetDetails).yColumn;
                              columnZ = JSON.parse(widgetDetails).zColumn;
                              category =
                                JSON.parse(widgetDetails).chart_category;
                              chartType = JSON.parse(widgetDetails).chart_type;
                              chartSubType =
                                JSON.parse(widgetDetails).graphType;
                              operationsBox =
                                JSON.parse(widgetDetails).operation;
                            }
                            if (e?.data) {
                              columnXData = JSON.parse(e?.data).x;
                              columnYData = JSON.parse(e?.data).y;

                              columnZData = JSON.parse(e?.data).z;

                              dataUsedInWidget = JSON.parse(e?.data).result;
                              columns = JSON.parse(e?.data).columns;
                            }
                            dataToExport = dataUsedInWidget;
                            // console.log('onEnter', widgetId, JSON.parse(e.data))
                          }}
                          onMouseLeave={() => {
                            flag = 0;
                          }}
                          onClick={handleClick}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "32%",
                        backgroundColor: "rgba(217, 217, 217, 0.25)",
                        borderBottomRightRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      }}
                    >
                      <div style={{ width: "80%" }}>
                        <div
                          style={{
                            width: "90%",
                            fontSize: "10px",
                            fontWeight: "600",
                            display: "flex",
                            flexwrap: "wrap",
                            fontFamily: "Trebuchet MS",
                            maxHeight: 30,
                            overflowX: "auto",
                            marginLeft: 22,
                            marginRight: 10,
                            textAlign: "left",
                          }}
                        >
                          {e?.name}
                        </div>

                        <div
                          style={{
                            width: "95%",
                            marginLeft: 24,
                            marginTop: "5px",
                            fontSize: "8px",
                            display: "flex",
                            flexWrap: "wrap",
                            overflowY: "auto",
                            textAlign: "left",
                          }}
                        >
                          {e?.discription}
                        </div>
                      </div>

                      <div
                        style={{
                          width: "20%",
                          fontWeight: "400",
                          fontSize: "11px",
                          backgroundColor: "white",
                          color: "#7C9CBF",
                          borderRadius: "12px",
                          padding: 3,
                          cursor: "pointer",
                          marginRight: "15px",
                        }}
                        onClick={() => {
                          if (e?.data) {
                            flag == 0 &&
                              history.push({
                                pathname:
                                  "/Widget Dashboard/" +
                                  e.id +
                                  "/" +
                                  global.subscription_id,
                                state: {
                                  data: e,
                                  id: e.id,
                                  desc: e.discription,
                                },
                              });
                          } else alert("Widget does not contain data!");
                        }}
                      >
                        View Widget
                      </div>
                    </div>
                  </div>
                ))}

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
                            <option
                              style={{ fontSize: 14, height: 25 }}
                              value={i}
                            >
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
                        Share with users and groups or enter an email address to
                        invite a new user.
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
                        placeholder={
                          "I thought you might find this card interesting."
                        }
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
                            bgcolor: "#067AB4",
                            color: "white",
                            "&:hover, &:focus": {
                              bgcolor: "#0BAFFF",
                              color: "white",
                            },
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
                            bgcolor: "#067AB4",
                            color: "white",
                            "&:hover, &:focus": {
                              bgcolor: "#0BAFFF",
                              color: "white",
                            },
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
                          marginLeft: 20,
                          marginTop: 30,
                          fontSize: 16,
                          fontFamily: "Trebuchet MS",
                          fontWeight: 500,
                        }}
                      >
                        Are you sure you want to delete this widget? This action
                        cannot be undone.
                      </div>

                      <div
                        style={{
                          marginTop: 35,
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
                            bgcolor: "#067AB4",
                            color: "white",
                            "&:hover, &:focus": {
                              bgcolor: "#0BAFFF",
                              color: "white",
                            },
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
                              setTimeout(
                                () => setReportIssueModal(false),
                                2200
                              );
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
              <CircularProgress
                sx={{
                  color: "#067AB4",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  margin: "auto",
                }}
              />
            </Box>
          ) : (
            <div
              style={{
                fontFamily: "Trebuchet MS",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              No Favourite Widgets
            </div>
          )}
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default FavoriteWidgets2;
