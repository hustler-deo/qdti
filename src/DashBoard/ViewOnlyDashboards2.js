import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "react-elastic-carousel";

// Auth context
import { AuthContext } from "../context";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

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

import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ScheduleIcon from "@mui/icons-material/Schedule";

import Tooltip from "@mui/material/Tooltip";

import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";

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
import ReportIcon from "@mui/icons-material/Report";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ViewOnlyDashboards from "./ViewOnlyDashboards";

var flag = 0,
  added = 0;
var tempDashboards;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};
const ViewOnlyDashboards2 = () => {
  const images = [
    "/dashboards/dashboard1.png",
    "/dashboards/dashboard_2.png",
    "/dashboards/dashboard3.jpg",
    "/dashboards/dashboard4.jpg",
    "/dashboards/dashboard5.png",
    "/dashboards/dashboard6.png",
    "/dashboards/dashboard7.jpg",
    "/dashboards/dashboard8.png",
    "/dashboards/dashboard9.jpg",
    "/dashboards/dashboard10.png",
    "/dashboards/dashboard11.png",
    "/dashboards/dashboard12.png",
    "/dashboards/dashboard13.jpg",
    "/dashboards/dashboard14.png",
    "/dashboards/dashboard15.png",
    "/dashboards/dashboard16.png",
    "/dashboards/dashboard17.png",
    "/dashboards/dashboard18.png",
    "/dashboards/dashboard19.png",
    "/dashboards/dashboard20.png",
  ];
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const location = useLocation();
  //   const [dashboards, setDashboards] = useState();

  const [dashboardId, setDashboardId] = useState([]);
  const [type, setType] = React.useState(-1);

  const [favouriteDashboards, setFavouriteDashboards] = useState();
  const [viewOnlyDashboards, setViewOnlyDashboards] = useState();
  const [dashboardsBox, setDashboardsBox] = useState();

  const [dashdata, setDashData] = useState([]);
  const [data2, setData2] = useState([]);

  const [actionsModal, setActionsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [issueDetails, setIssueDetails] = useState("");
  const [noIssueDetails, setNoIssueDetails] = useState(false);
  const [recentdashboards, setRecentDashboards] = React.useState([]);

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [sendNowModal, setSendNowModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [dateValue, setDateValue] = useState(null);

  const [selectedValue, setSelectedValue] = React.useState(1);
  const [categories, setCategories] = React.useState(null);
  const [isSaveDashboard, setIsSaveDashboard] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);

  const [reported, setReported] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteDashboardSuccess, setDeleteDashboardSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [noDashboardTitle, setNoDashboardTitle] = useState(false);
  const [searchedDashboard, setSearchedDashboard] = useState("");

  const [sortAsc, setSortAsc] = useState(false);
  const [userId, setUserId] = useState();

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

  const saveDashModalstyle = {
    position: "relative",
    top: "14%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 470,
    width: 500,
    display: "flex",
    flexDirection: "column",
    // overflow: "auto",
    borderRadius: "5px",
  };

  const scheduleDashModalstyle = {
    position: "relative",
    top: "16%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 240,
    width: 500,
    display: "flex",
    flexDirection: "column",
    // overflow: "auto",
    borderRadius: "5px",
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

  const handleOnClick = (Id) => {
    setselectedActionIndex(Id);
    if (Id === 1) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
      });
    }
    if (Id === 2) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
        share: true,
      });
    }
    // if (index1 === 1) setShareModal(true)

    // if (index1 === 2) setScheduleReportModal(true)
    // if (index1 === 4) setSendNowModal(true)
    // if (index1 === 5) setExportModal(true)
    // if (index1 === 6) {
    //   added === 1 ? removeFromFavorites() : addToFavorites()
    // }

    // if (index1 === 8) setIsSaveDashboard(true)
    // if (index1 === 9) setReportIssueModal(true)
    // if (index1 === 10) setDeleteModal(true)
    if (Id === 3) added === 1 ? removeFromFavorites() : addToFavorites();
    if (Id === 4) setIsSaveDashboard(true);
    if (Id === 5) setReportIssueModal(true);
    if (Id === 6) setDeleteModal(true);
    if (Id === 7) setIsSchedule(true);

    handleClose();
  };

  // const actionsList = [
  //   "Edit",
  //   // 'Share',
  //   // 'Schedule as Report',
  //   // 'Edit Scheduled Reports',
  //   // 'Send Now',
  //   // 'Send/Export',
  //   // 'Add to Favourites',
  //   // 'Notify me on issues',
  //   "Add To Favourites",
  //   "Save As",
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
      name: "Share",
    },
    {
      id: 3,
      name: "Add To Favourites",
    },
    {
      id: 4,
      name: "Save As",
    },
    {
      id: 5,
      name: "Report an Issue",
    },
    {
      id: 7,
      name: "Schedule Dashboard",
    },
    {
      id: 6,
      name: "Delete",
    },
  ];
  //   useEffect(() => {
  //     localStorage.setItem("viewMode", 0);
  //     getCats();
  //     getAllDashboards();
  //   }, []);

  //   useEffect(() => {
  //     tempDashboards = dashboards?.filter((e, i) => e.isFavorite === 1);
  //     setFavouriteDashboards(tempDashboards);
  //   }, [dashboards]);

  //   useEffect(() => {
  //     let tempDashboards2 = favouriteDashboards?.filter(
  //       (e, i) => type == e?.category_id
  //     );
  //     setFavouriteDashboards(tempDashboards2);
  //   }, [type]);

  //   const getAllDashboards = () => {
  //     axios
  //       .post(
  //         configData.API_URL + "personalAccount/database/dashboard_viewall",
  //         {
  //           account_id: localStorage.getItem("account_id").toString(),
  //         },

  //         {}
  //       )
  //       .then((response) => {
  //         console.log("response getAllDashboards", response.data.data);
  //         // dashboardId = response.data.data.id
  //         let dashboardBox = response.data.data;

  //         for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
  //           if (j === 20) j = 0;
  //           dashboardBox[i].img = images[j];
  //         }

  //         setDashboards(dashboardBox);
  //         setDashboardsBox(dashboardBox);
  //         let recent = dashboardBox.slice(-8);
  //         setRecentDashboards(recent);
  //         return response;
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           // Request made and server responded
  //           console.log(error.response);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           console.log(error.request);
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.log(error.message);
  //         }
  //       });
  //   };

  useEffect(() => {
    getData();
    localStorage.setItem("viewMode", 1);
  }, []);

  const getData = () => {
    console.log("IDD", localStorage.getItem("account_id"));
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getMyDetails?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        // console.log("ssss", response.data);
        console.log("getMyDetails response", response.data.data[0]?.user_id);
        localStorage.setItem("user_id", response.data.data[0]?.user_id);
        setUserId(response.data.data[0]?.user_id);
        viewExportedDashboards(response.data.data[0]?.user_id);
        console.log("check userID", localStorage.getItem("user_id"));
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
  const viewExportedDashboards = (ID) => {
    console.log("CHECK ID>", ID);
    axios
      .post(
        configData.API_URL + "personalAccount/database/viewonly_dashboard",
        {
          id: ID && ID,
        },
        {}
      )
      .then((response) => {
        console.log("View Only Dashboards response", response);
        // setViewOnlyDashboards(response.data.data);
        let dashboardBox = response.data.data;

        for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
          if (j === 20) j = 0;
          dashboardBox[i].img = images[j];
        }
        setDashboardsBox(dashboardBox);
        setViewOnlyDashboards(dashboardBox);
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
  //   const viewExportedDashboards = () => {
  //     axios
  //       .post(
  //         configData.API_URL +
  //           "personalAccount/database/dashboard_export_viewall",
  //         {
  //           account_id:
  //             localStorage.getItem("account_id") &&
  //             localStorage.getItem("account_id").toString(),
  //         },
  //         {}
  //       )
  //       .then((response) => {
  //         console.log("View ONly response", response.data.data);
  //         // setViewOnlyDashboards(response.data.data);

  //         let dashboardBox = response.data.data;

  //         for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
  //           if (j === 20) j = 0;
  //           dashboardBox[i].img = images[j];
  //         }
  //         setDashboardsBox(dashboardBox);
  //         setViewOnlyDashboards(dashboardBox);

  //         return response;
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           // Request made and server responded
  //           console.log(error.response);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           console.log(error.request);
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.log(error.message);
  //         }
  //       });
  //   };

  const saveDesign = (mode) => {
    let date = dateValue?._d.toJSON();
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
              type: 0,
              scheduledDate: dateValue ? moment(date).format("YYYY-MM-DD") : "",
              scheduledTime: dateValue ? moment(date).format("HH:mm:ss") : "",
              isScheduled: 0,
              isDeepADashboard: location.deep ? 1 : 0,
              isAutoDashboard: location.deep ? 0 : 1,
              isMlDashboard: 0,
              categoryId: selectedValue,
            }
          : {
              id: dashboardId,
              data: JSON.parse(dashdata),
              scheduledDate: dateValue ? moment(date).format("YYYY-MM-DD") : "",
              scheduledTime: dateValue ? moment(date).format("HH:mm:ss") : "",
              isScheduled: 0,
            },

        {}
      )
      .then((response) => {
        console.log("response", response.data);
        if (response.data.status) setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          getAllDashboards();
        }, 1500);

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
          dashboard_id: 122,
        },

        {}
      )
      .then((response) => {
        console.log("response deleted", response.data.data);
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
  const getCats = () => {
    axios
      .get(configData.API_URL + "personalAccount/database/dashboard_category")
      .then((response) => {
        console.log("getCats response", response?.data);
        setCategories(response?.data?.data);
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

  const handleSearchDashboard = (event) => {
    setSearchedDashboard(event.target.value);
  };

  useEffect(() => {
    if (dashboardsBox && dashboardsBox.length > 0) {
      var found = dashboardsBox?.filter((element) =>
        element.name.toLowerCase().includes(searchedDashboard.toLowerCase())
      );
      // console.log('seachedBox', found)
      setViewOnlyDashboards(found);
    }
  }, [searchedDashboard]);

  const handleSortDashboards = () => {
    // let dashboards = favouriteDashboards;
    dashboardsBox?.sort(function (a, b) {
      let c = new Date(a?.created_at);
      let d = new Date(b?.created_at);
      if (!sortAsc) return d - c;
      else return c - d;
    });
    // console.log("sorted", widgetsBox);
    setViewOnlyDashboards(dashboardsBox);
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
                    selected={item.id == selectedActionIndex}
                    button
                    key={index}
                    onClick={() => handleOnClick(item.id)}
                  >
                    <ListItemIcon>
                      {item.id === 1 ? (
                        <BorderColorIcon />
                      ) : item.id === 4 ? (
                        <SaveAsIcon />
                      ) : item.id === 2 ? (
                        <SendIcon />
                      ) : item.id === 6 ? (
                        <DeleteForeverIcon />
                      ) : item.id === 5 ? (
                        <ReportIcon />
                      ) : item.id === 3 ? (
                        <VolunteerActivismIcon />
                      ) : item.id === 7 ? (
                        <ScheduleIcon />
                      ) : null}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        added == 1 && index == 2
                          ? "Remove from favourites"
                          : item.name
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
              width: "89%",
              marginLeft: "9%",
            }}
          >
            <div>
              <h2 style={{ marginTop: "20px" }}>View Only Dashboards </h2>
            </div>

            <div
              style={{ width: "30vw", marginLeft: "14%", marginTop: "20px" }}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  placeholder="    Search"
                  onChange={handleSearchDashboard}
                  value={searchedDashboard}
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

            {viewOnlyDashboards && (
              <div
                style={{
                  display: "flex",
                  marginLeft: "11%",
                  marginTop: 20,
                  //   marginRight: "5%",
                  cursor: "pointer",
                  //   marginBottom: "20px",
                }}
                onClick={() => handleSortDashboards()}
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

            {/* <Box
              sx={{
                width: "18%",
                margin: "0px auto",
                marginTop: "20px",
              }}
            >
              <FormControl fullWidth size={"small"}>
                <Select
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                  style={{
                    backgroundColor: "#C1D9EC",
                    fontSize: "15px",
                    fontFamily: "Trebuchet MS",
                    fontWeight: "500",
                    color: "#0D4669",
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
                      fontFamily: "Trebuchet MS",
                      fontWeight: "500",
                    }}
                  >
                    Select Category
                  </MenuItem>
                  {categories?.map((item, index) => {
                    return (
                      <MenuItem
                        value={item?.id}
                        style={{
                          fontSize: "14px",
                          fontFamily: "Trebuchet MS",
                          fontWeight: "600",
                          color: "#067AB4",
                        }}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box> */}
          </div>

          {viewOnlyDashboards && viewOnlyDashboards?.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "90%",
                marginLeft: "8%",
                marginTop: "35px",
                // justifyContent: 'space-around'
              }}
            >
              {viewOnlyDashboards &&
                viewOnlyDashboards?.map((e, i) => (
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1.17215px solid #CBC6C6",
                      borderRadius: "20px",
                      boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                      height: "40vh",
                      width: "28vw",
                      marginBottom: "4%",
                      marginLeft: "1.4%",
                    }}
                    // onClick={() =>
                    //   flag == 0 &&
                    //   history.push({
                    //     pathname: "/Main_Dashboard/"+global.subscription_id,
                    //     state: e,
                    //   })
                    // }
                  >
                    <img
                      src={e?.img}
                      style={{
                        resizeMode: "contain",
                        height: "80%",
                        width: "90%",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "rgba(217, 217, 217, 0.25)",
                        height: "20%",
                        width: "100%",
                        borderRadius: "0px 0px 20.1219px 20.1219px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: "15%",
                            marginLeft: "3%",
                            display: "flex",
                            alignItems: "center",
                            // cursor: 'pointer'
                          }}
                        >
                          {/* {e.isFavorite == 1 ? (
                            <FavoriteIcon
                              fontSize="small"
                              sx={{ color: "red" }}
                            />
                          ) : (
                            <FavoriteBorderIcon fontSize="small" />
                          )} */}

                          {/* {e?.is_scheduled &&
                            e?.scheduled_date &&
                            e?.scheduled_time && (
                              <div style={{ marginLeft: "12px" }}>
                                <Tooltip
                                  title={
                                    "Scheduled Date & Time - " +
                                    e?.scheduled_date +
                                    " " +
                                    e?.scheduled_time
                                  }
                                  arrow
                                >
                                  <ScheduleIcon
                                    fontSize="small"
                                    sx={{ color: "#0BAFFF" }}
                                  />
                                </Tooltip>
                              </div>
                            )} */}
                        </div>
                        <div
                          style={{
                            width: "70%",
                            height: "40px",
                            overflow: "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: "12px",
                            }}
                          >
                            {e.name}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                            height: "25px",
                            width: "18%",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "20px",
                          }}
                        >
                          <div
                            style={{
                              boxShadow:
                                "drop-shadow(0px 5.6263px 11.2526px rgba(44, 39, 56, 0.078))",
                              padding: 8,
                              fontSize: "12px",
                              color: "#7C9CBF",
                              cursor: "pointer",
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
                            View
                          </div>
                        </div>

                        {/* <div style={{ width: "12%" }}>
                          <MoreVertIcon
                            style={{ marginRight: "3%", cursor: "pointer" }}
                            onMouseEnter={() => {
                              setData2(e);
                              setDashboardId(e?.id);
                              setDashData(e?.data);
                              setDashboardTitle(e?.name);
                              flag = 1;
                              if (e?.isFavorite == 1) {
                                setAddedToFav(true);
                                added = 1;
                              } else added = 0;
                            }}
                            onMouseLeave={() => {
                              flag = 0;
                            }}
                            onClick={handleClick}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : dashboardsBox === undefined &&
            viewOnlyDashboards === undefined ? (
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
              No View Only Dashboards Shared
            </div>
          )}
        </>
      ) : (
        history.push("Login")
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
                <Stack sx={{ width: "100%", ml: 2, mr: 4 }}>
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
                    fontFamily: "Trebuchet MS",
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
                      setTimeout(() => setReported(false), 2200);
                      setTimeout(() => setIssueDetails(""), 2000);
                      setTimeout(() => setReportIssueModal(false), 2500);
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

      {/* <Modal
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
                    bgcolor: "#067AB4",
                    color: "white",
                    fontFamily: "Trebuchet MS",
                    "&:hover, &:focus": {
                      bgcolor: "#0BAFFF",
                      color: "white",
                    },
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
                    bgcolor: "#067AB4",
                    color: "white",
                    fontFamily: "Trebuchet MS",
                    "&:hover, &:focus": {
                      bgcolor: "#0BAFFF",
                      color: "white",
                    },
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
      </Modal> */}
      {isSaveDashboard && (
        <Modal
          open={isSaveDashboard}
          onClose={() => {
            setIsSaveDashboard(false);
            setNoDashboardTitle(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={saveDashModalstyle}>
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
                  Dashboard Name
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
                    placeholder={"Add Dashboard Title.."}
                    value={dashboardTitle}
                    onChange={(e) => setDashboardTitle(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    marginTop: 5,
                    marginLeft: 20,
                    marginTop: 5,
                    fontSize: 16,
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  Dashboard Description
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
                      height: 160,
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
                <div
                  style={{
                    marginTop: 5,
                    marginLeft: 20,
                    fontSize: 16,
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  Select Category
                </div>
                <Select
                  style={{
                    marginTop: "10px",
                    marginLeft: 15,
                    height: 25,
                    width: 300,
                    border: "0.5px solid",
                    backgroundColor: "white",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#067AB4",
                  }}
                  // labelId='mutiple-select-label'
                  disableUnderline
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  // renderValue={(selected4) => selected4}
                  MenuProps={MenuProps}
                >
                  {categories?.map((option, index) => (
                    <MenuItem
                      style={{ height: 30, padding: 10 }}
                      key={index}
                      value={index + 1}
                    >
                      {/* <ListItemIcon>
                        <Checkbox
                          checked={selected4.indexOf(option.type) > -1}
                        />
                      </ListItemIcon> */}
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
                <div>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        sx={{
                          width: "350px",
                          marginLeft: "20px",
                          marginTop: "15px",
                        }}
                        PopperProps={{
                          placement: "top-end",
                          anchorEl: anchorEl,
                        }}
                        label="Schedule Date and Time (Optional)"
                        value={dateValue}
                        onChange={(newValue) => setDateValue(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
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
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
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
                      bgcolor: "#067AB4",
                      color: "white",
                      fontFamily: "Trebuchet MS",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      if (dashboardTitle === "") {
                        setNoDashboardTitle(true);
                        return;
                      } else {
                        saveDesign(1);
                        setIsSaveDashboard(false);
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
      )}

      {isSchedule && (
        <Modal
          open={isSchedule}
          onClose={() => {
            setIsSaveDashboard(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={scheduleDashModalstyle}>
            <>
              <CloseIcon
                onClick={() => {
                  setIsSchedule(false);
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
                    marginTop: 20,
                    fontSize: 16,
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  Select Date and Time
                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                        sx={{
                          width: "350px",
                          marginLeft: "20px",
                          marginTop: "15px",
                        }}
                        PopperProps={{
                          placement: "top-end",
                          anchorEl: anchorEl,
                        }}
                        label="Schedule Date and Time (Optional)"
                        value={dateValue}
                        onChange={(newValue) => setDateValue(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
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
                      setIsSchedule(false);
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
                      if (dateValue === null) {
                        alert("Please Select Date & Time");
                        return;
                      }

                      saveDesign(2);
                      setIsSchedule(false);
                    }}
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

      <Snackbar
        open={saveSuccess}
        autoHideDuration={1500}
        onClose={() => setSaveSuccess(false)}
      >
        <Alert elevation={6} variant="filled" severity="success">
          New Dashboard saved Successfully!
        </Alert>
      </Snackbar>

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

export default ViewOnlyDashboards2;
