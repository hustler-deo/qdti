import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

import configData from "../config.json";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import ScheduleIcon from "@mui/icons-material/Schedule";
import Tooltip from "@mui/material/Tooltip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";

import moment from "moment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// Auth context
import { AuthContext } from "../context";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Popover from "@mui/material/Popover";
import { CSVLink } from "react-csv";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShareIcon from "@mui/icons-material/Share";
import IosShareIcon from "@mui/icons-material/IosShare";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import ReportIcon from "@mui/icons-material/Report";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import StarIcon from "@mui/icons-material/Star";
import PrintIcon from "@mui/icons-material/Print";
import TableRowsIcon from "@mui/icons-material/TableRows";
import CableIcon from "@mui/icons-material/Cable";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ForkRightIcon from "@mui/icons-material/ForkRight";

// const actionsList1 = [
//   "Edit",
//   "Share",
//   "Edit Drill Path",
//   "Schedule as Report",
//   "Edit Scheduled Reports",
//   "Send Now",
//   "Send/Export",
//   "Add to Favourites",
//   "Notify me on issues",
//   "Save As",
//   "Connect/Update data",
//   "Report an Issue",
//   "Delete",
// ];

// const actionsList2 = [
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
const actionsList1 = [
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
const actionsList2 = [
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
  added = 0;

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
const Overview2 = () => {
  const dashboardImages = [
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

  const widgetImages = [
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

  const history = useHistory();
  const authContext = useContext(AuthContext);
  const csvLink = useRef();

  const location = useLocation();
  // Avoid a layout jump when reaching the last page with empty rows.
  const [alignment, setAlignment] = React.useState("all");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [widgets, setWidgets] = useState([]);
  const [recentWidgets, setRecentWidgets] = useState([]);

  const [addSuccess, setAddSuccess] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [deleteWidgetSuccess, setDeleteWidgetSuccess] = useState(false);

  const [flowIdPresent, setFlowIdPresent] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [noWidgetTitle, setNoWidgetTitle] = useState(false);
  const [searchedWidget, setSearchedWidget] = useState();

  const [widgetSaved, setWidgetSaved] = useState(false);
  const [tempWidgetsBox, setTempWidgetsBox] = useState();
  const [addedToFav, setAddedToFav] = useState(false);

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
  const [isSchedule, setIsSchedule] = useState(false);

  const [reported, setReported] = useState(false);

  //dashboards
  const [dashboards, setDashboards] = useState([]);
  const [all, setAll] = useState([]);

  const [dashboardsBox, setDashboardsBox] = useState();
  const [dashboardId, setDashboardId] = useState([]);

  const [dashdata, setDashData] = useState([]);
  const [data2, setData2] = useState([]);

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [dateValue, setDateValue] = useState(null);

  const [selectedValue, setSelectedValue] = React.useState(1);
  const [categories, setCategories] = React.useState(null);
  const [isSaveDashboard, setIsSaveDashboard] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [deleteDashboardSuccess, setDeleteDashboardSuccess] = useState(false);

  const [noDashboardTitle, setNoDashboardTitle] = useState(false);
  const [searchedDashboard, setSearchedDashboard] = useState();
  const [searchedAll, setSearchedAll] = useState();

  const [sortAsc1, setSortAsc1] = useState(false);
  const [sortAsc2, setSortAsc2] = useState(false);

  const [recentdashboards, setRecentDashboards] = React.useState([]);
  const [type, setType] = React.useState(-1);

  const open = Boolean(anchorEl);

  const open2 = Boolean(anchorEl3);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose6 = () => {
    setAnchorEl3(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const openMenu = Boolean(anchorEl2);
  const handleClick5 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose5 = (event) => {
    // console.log('clicked', event.target.value)
    if (event.target.value === 1)
      localStorage.getItem("FlowID") === null
        ? setFlowIdPresent(false)
        : history.push("Widget Dashboard/new/" + global.subscription_id);
    if (event.target.value === 2)
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        deep: true,
      });
    setAnchorEl2(null);
  };

  const handleOnClickWidget = (Id) => {
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

  const handleOnClickDashboard = (Id) => {
    setselectedActionIndex(Id);
    if (Id === 1) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
        deep: true,
      });
    }
    if (Id === 2) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
        share: true,
        deep: true,
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
          console.log("response widget_viewall", response.data.data);

          let widgetBox = response.data.data;
          for (let i = 0, j = 0; i < widgetBox.length; i++, j++) {
            if (j === 20) j = 0;
            widgetBox[i].img = widgetImages[j];
          }

          setWidgets(widgetBox);
          let recent = widgetBox.slice(0, 7);
          setRecentWidgets(recent);

          setTempWidgetsBox(widgetBox);
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
    localStorage.setItem("viewMode", 0);
    getCats();
    widget_viewall();
    getAllDashboards();
  }, []);

  useEffect(() => {}, [widgets]);
  useEffect(() => {}, [dashboards]);

  useEffect(() => {
    if (dashboardsBox && dashboardsBox.length > 0) {
      var found = dashboardsBox.filter(
        (element) => type == element?.category_id
      );
      setDashboards(found);
    }
  }, [type]);

  // useEffect(() => {
  //   console.log('combine', widgets)
  //   if (widgets.length > 0 && dashboards.length > 0) {
  //     // let allBox = widgets.concat(dashboards)
  //   let allBox=  [...widgets, ...arr2]
  //     console.log('combined', allBox)
  //     setAll(widgets)
  //   }
  // }, [widgets, dashboards])
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
        // console.log('response', response.data.data)
        let dashboardBox = response.data.data;
        for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
          if (j === 20) j = 0;
          dashboardBox[i].img = dashboardImages[j];
        }

        setDashboards(dashboardBox);
        setDashboardsBox(dashboardBox);
        let recent = dashboardBox.slice(-8);
        setRecentDashboards(recent);

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

  const handleSearchDashboard = (event) => {
    setSearchedDashboard(event.target.value);
  };

  const handleSearchAll = (event) => {
    setSearchedAll(event.target.value);
  };

  useEffect(() => {
    if (dashboardsBox && dashboardsBox.length > 0) {
      var found = dashboardsBox.filter((element) =>
        element.name.toLowerCase().includes(searchedDashboard.toLowerCase())
      );
      // console.log('seachedBox', found)
      setDashboards(found);
    }
  }, [searchedDashboard]);

  const handleSort = () => {
    let widgetsBox = widgets;
    widgetsBox?.sort(function (a, b) {
      let c = new Date(a?.created_at);
      let d = new Date(b?.created_at);
      if (!sortAsc1) return d - c;
      else return c - d;
    });
    // console.log("sorted", widgetsBox);
    setWidgets(widgetsBox);
    setSortAsc1(!sortAsc1);
  };

  const handleSortDashboards = () => {
    let dashboardsBox = dashboards;
    dashboardsBox?.sort(function (a, b) {
      let c = new Date(a?.created_at);
      let d = new Date(b?.created_at);
      if (!sortAsc2) return d - c;
      else return c - d;
    });
    // console.log("sorted", widgetsBox);
    setDashboards(dashboardsBox);
    setSortAsc2(!sortAsc2);
  };

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
              isDeepADashboard: 1,
              isAutoDashboard: 0,
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
                {actionsList1.map((item, index) => (
                  <ListItem
                    selected={item?.id == selectedActionIndex}
                    button
                    key={index}
                    onClick={() => handleOnClickWidget(item?.id)}
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

          <Popover
            id={id}
            open={open2}
            anchorEl={anchorEl3}
            onClose={handleClose6}
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
                {actionsList2.map((item, index) => (
                  <ListItem
                    selected={item.id == selectedActionIndex}
                    button
                    key={index}
                    onClick={() => handleOnClickDashboard(item.id)}
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
              justifyContent: "space-around",
              width: "90%",
              marginLeft: "9%",
            }}
          >
            <div>
              <h2 style={{ fontFamily: "Trebuchet MS", marginTop: "20px" }}>
                Overview
              </h2>
            </div>

            <div style={{ width: "30vw", marginLeft: "6%", marginTop: "20px" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="text"
                  placeholder="    Search"
                  onChange={
                    alignment === "widgets"
                      ? handleSearchWidget
                      : alignment === "dashboards"
                      ? handleSearchDashboard
                      : alignment === "all" && handleSearchAll
                  }
                  value={
                    alignment === "widgets"
                      ? searchedWidget
                      : alignment === "dashboards"
                      ? searchedDashboard
                      : alignment === "all" && searchedAll
                  }
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

            <Box
              sx={{
                width: "18%",
                margin: "0px auto",
                marginTop: "20px",
                marginLeft: "60px",
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
            </Box>

            <div
              style={{
                backgroundColor: "#0aafff",
                padding: 7,
                color: "white",
                boxShadow: "0px 8.90323px 17.8065px rgba(44, 39, 56, 0.078))",
                fontSize: "14px",
                borderRadius: "11px",
                width: "120px",
                // marginLeft: "40px",
                cursor: "pointer",
                marginTop: "20px",
                marginRight: "40px",
              }}
              onClick={handleClick5}
            >
              CREATE
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
            }}
          >
            <div style={{ marginLeft: "40%" }}>
              <ToggleButtonGroup
                size="small"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{
                  justifyContent: "space-around",
                  display: "flex",
                  width: "22vw",
                }}
              >
                <ToggleButton
                  sx={{
                    "&.MuiToggleButton-root.Mui-selected": {
                      backgroundColor: "#067AB4", //use the color you want
                      color: "white",
                    },
                  }}
                  value="all"
                >
                  All
                </ToggleButton>
                <div
                  style={{
                    height: "42px",
                    width: "1px",
                    backgroundColor: "#858585",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                ></div>
                <ToggleButton
                  sx={{
                    ml: 5,
                    "&.MuiToggleButton-root.Mui-selected": {
                      backgroundColor: "#067ab4", //use the color you want
                      color: "white",
                    },
                  }}
                  value="widgets"
                >
                  Widgets
                </ToggleButton>
                <div
                  style={{
                    height: "42px",
                    width: "1px",
                    backgroundColor: "#858585",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                ></div>

                <ToggleButton
                  sx={{
                    ml: 5,
                    "&.MuiToggleButton-root.Mui-selected": {
                      backgroundColor: "#067ab4", //use the color you want
                      color: "white",
                    },
                  }}
                  value="dashboards"
                >
                  Dashboards
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 10,
                marginRight: "20px",
                marginLeft: "20%",
                cursor: "pointer",
              }}
              onClick={() =>
                alignment === "widgets"
                  ? handleSort()
                  : alignment === "dashboards"
                  ? handleSortDashboards()
                  : null
              }
            >
              <div
                style={{
                  alignItems: "right",
                  marginRight: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#067AB4",
                }}
              >
                {alignment === "widgets"
                  ? sortAsc1
                    ? "New - Old"
                    : "Old - New"
                  : alignment === "dashboards" && sortAsc2
                  ? "New - Old"
                  : "Old - New"}
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
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "90%",
              marginLeft: "9%",
              marginTop: "20px",
            }}
          >
            {alignment === "all"
              ? all.map((e, i) => (
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1.17215px solid #CBC6C6",
                      borderRadius: "20px",
                      boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                      height: "50vh",
                      width: "40vw",
                      marginTop: "2%",
                      marginLeft: "3.4%",
                    }}
                  >
                    <img
                      src={e?.img}
                      style={{
                        resizeMode: "contain",
                        height: "60%",
                        width: "90%",
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "center",
                        backgroundColor: "rgba(217, 217, 217, 0.25)",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            width: "40%",
                            fontSize: "16px",
                            fontWeight: "600",
                            marginLeft: "5%",
                          }}
                        >
                          Sales Overview
                        </div>

                        {/* <div
                        style={{
                          width: '40%',
                          marginLeft: 24,
                          marginTop: 6,
                          fontSize: '14px'
                        }}
                      >
                        Lorem ipsum dolor sit amet, consec adipiscing elit, s
                      </div> */}
                      </div>

                      <div
                        style={{
                          fontWeight: "400",
                          fontSize: "15px",
                          backgroundColor: "white",
                          color: "#7C9CBF",
                          borderRadius: "12px",
                          padding: 6,
                          cursor: "pointer",
                        }}
                      >
                        View Widget
                      </div>
                    </div>
                  </div>
                ))
              : alignment === "widgets"
              ? widgets &&
                widgets.map((e) => (
                  <div
                    style={{
                      border: "1.17215px solid #CBC6C6",
                      borderRadius: "20px",
                      boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                      height: "40vh",
                      width: "28vw",
                      marginTop: "2%",
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
                            if (widgetData) {
                              widgetId = e?.id;
                              widgetDetails = e?.operations;
                              setWidgetTitle(e?.name);
                              setWidgetDesc(e?.discription);
                              columnX = JSON.parse(widgetDetails)?.xColumn;
                              columnY = JSON.parse(widgetDetails)?.yColumn;
                              columnZ = JSON.parse(widgetDetails)?.zColumn;
                              category =
                                JSON.parse(widgetDetails).chart_category;
                              chartType = JSON.parse(widgetDetails)?.chart_type;
                              chartSubType =
                                JSON.parse(widgetDetails)?.graphType;
                              operationsBox =
                                JSON.parse(widgetDetails)?.operation;
                              if (e?.data) {
                                columnXData = JSON.parse(e?.data).x;
                                columnYData = JSON.parse(e?.data).y;

                                columnZData = JSON.parse(e?.data).z;

                                dataUsedInWidget = JSON.parse(e?.data)?.result;
                                columns = JSON.parse(e?.data)?.columns;
                              }
                              dataToExport = dataUsedInWidget;
                            }
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
                ))
              : alignment === "dashboards"
              ? dashboards &&
                dashboards.map((e, i) => (
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1.17215px solid #CBC6C6",
                      borderRadius: "20px",
                      boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                      height: "40vh",
                      width: "28vw",
                      marginTop: "4%",
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
                        height: "78%",
                        width: "90%",
                        marginLeft: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "rgba(217, 217, 217, 0.25)",
                        height: "20%",
                        width: "100%",
                        borderRadius: "0px 0px 28.1219px 28.1219px",
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
                            // cursor: "pointer",
                          }}
                        >
                          {e.isFavorite == 1 ? (
                            <FavoriteIcon
                              fontSize="small"
                              sx={{ color: "red" }}
                            />
                          ) : (
                            <FavoriteBorderIcon fontSize="small" />
                          )}
                          {e?.is_scheduled &&
                            e?.scheduled_date &&
                            e?.scheduled_time && (
                              <div style={{ marginLeft: "15px" }}>
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
                                    fontSize="medium"
                                    sx={{ color: "#0BAFFF" }}
                                  />
                                </Tooltip>
                              </div>
                            )}
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
                                  deep: true,
                                });
                            }}
                          >
                            View
                          </div>
                        </div>

                        <div style={{ width: "12%" }}>
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
                            onClick={handleClick2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : []}
          </div>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={openMenu}
            onClose={handleClose5}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem value={1} onClick={handleClose5}>
              Widget
            </MenuItem>
            <MenuItem value={2} onClick={handleClose5}>
              Dashboard
            </MenuItem>
          </Menu>

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
                          fontFamily: "Trebuchet MS",
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
                        fontFamily: "Trebuchet MS",
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
                        fontFamily: "Trebuchet MS",
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
                        setNoDashboardTitle(false);

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
                          setTimeout(() => getAllDashboards(), 1000);
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

          {dataToExport && (
            <CSVLink
              data={dataToExport && dataToExport}
              filename={widgetTitle}
              ref={csvLink}
              target="_blank"
            ></CSVLink>
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
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default Overview2;
