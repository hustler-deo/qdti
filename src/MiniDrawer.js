import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Badge from "@mui/material/Badge";

import axios from "axios";
import configData from "./config.json";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";

import MuiListItem from "@material-ui/core/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Widgets from "@mui/icons-material/Widgets";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import PreviewIcon from "@mui/icons-material/Preview";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import StarIcon from "@mui/icons-material/Star";
import PsychologyIcon from "@mui/icons-material/Psychology";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";

const drawerWidth = 265;

const drawerMenu = [
  "Dashboard",
  "Import Dataset",
  "Import Dataset2",
  "Query Editor",
  // 'Quick Data Flow',
  // 'Data Flows',
  "Big Data Flow",
  "My Flows",
  // 'Widget Dashboard',
  // 'Main Dashboard',
  "Widget Overview",
  "Dashboard Overview",
  "ML Dashboards",
  "View Only Dashboards",
  "Favourite Widgets",
  // 'Favourite View Only Dashboards',
  "Favourite Dashboards",
  // 'Custom Output',
];

const drawerMenu1 = [
  "Dashboard",
  "Import Dataset",
  "Import Dataset2",
  // 'Query Editor',

  // 'Quick Data Flow',
  // 'Data Flows',
  "Big Data Flow",
  "My Flows",
  // 'Widget Dashboard',
  // 'Main Dashboard',
  "Widget Overview",
  "Dashboard Overview",
  // 'ML Dashboards',
  "View Only Dashboards",
  "Favourite Widgets",
  // 'Favourite View Only Dashboards',
  "Favourite Dashboards",
  // 'Custom Output',
];

const drawerMenu2 = [
  "Dashboard",
  "Import Dataset",
  "Import Dataset2",
  "Query Editor",
  // 'Quick Data Flow',
  // 'Data Flows',
  "Big Data Flow",
  "My Flows",
  // 'Widget Dashboard',
  // 'Main Dashboard',
  "Widget Overview",
  "Dashboard Overview",
  // 'ML Dashboards',
  "View Only Dashboards",
  "Favourite Widgets",
  // 'Favourite View Only Dashboards',
  "Favourite Dashboards",
  // 'Custom Output',
];

const initial = [
  {
    id: 1,
    text: "",
    img: "/flowwhite.png",
  },
  {
    id: 2,
    text: "",
    img: "/dataflowwhite.png",
  },
  {
    id: 3,
    text: "",
    img: "/datasourcewhite.png",
  },
  {
    id: 4,
    text: "",
    img: "/fileswhite.png",
  },
  {
    id: 5,
    text: "",
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const viewOnly_User = [
  {
    id: 1,
    text: "View Only Dashboards",
    // img: "/flowwhite.png",
    // img2: "/flowblue.png",
  },
  {
    id: 2,
    text: "",
    // img: "/dataflowwhite.png",
    // img2: "/dataflowblue.png",
  },
  {
    id: 3,
    text: "",
    // img: '/datasourcewhite.png'
  },
  {
    id: 4,
    text: "",
    // img: '/fileswhite.png'
  },
  {
    id: 5,
    text: "",
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];
const autoAnalytics = [
  {
    id: 1,
    text: "Create a Flow",
    img: "/flowwhite.png",
    img2: "/flowblue.png",
  },
  {
    id: 2,
    text: "My Data Flow",
    img: "/dataflowwhite.png",
    img2: "/dataflowblue.png",
  },
  // {
  //   id: 3,
  //   text: 'My Data Sources',
  //   img: '/datasourcewhite.png'
  // },
  // {
  //   id: 4,
  //   text: 'My Files',
  //   img: '/fileswhite.png'
  // },
  {
    id: 3,
    text: "",
    // img: '/datasourcewhite.png'
  },
  {
    id: 4,
    text: "",
    // img: '/fileswhite.png'
  },
  {
    id: 5,
    text: "",
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const deepAnalytics = [
  {
    id: 1,
    text: "Import Dataset",
    img: "/importwhite.png",
    img2: "/importwhite.png",
  },
  {
    id: 2,
    text: "Query Editor",
    img: "/querywhite.png",
    img2: "/queryblue.png",
  },

  { id: 3, text: "Overview", img: "/overview.png", img2: "/overviewblue.png" },
  { id: 4, text: "Widgets", img: "/widgetwhite.png", img2: "/widgetblue.png" },
  {
    id: 5,
    text: "Dashboards",
    img: "/dashboardwhite.png",
    img2: "/dashboardblue.png",
  },
  // {
  //   id: 6,
  //   text: 'My Data Sources',
  //   img: '/datasourcewhite.png'
  // },
  // {
  //   id: 7,
  //   text: 'My Files',
  //   img: '/fileswhite.png'
  // },
  {
    id: 6,
    text: "",
    // img: '/datasourcewhite.png'
  },
  {
    id: 7,
    text: "",
    // img: '/fileswhite.png'
  },

  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

// const dataConfiguration = [
//   {
//     id: 1,
//     text: "Data Connectors",
//     img: "/image2.png",
//   },
//   {
//     id: 2,
//     text: "My Data Sources",
//     img: "/op4.png",
//   },
//   {
//     id: 3,
//     text: "My Files",
//     img: "/op5.png",
//   },
//   {
//     id: 4,
//     text: "",
//   },
//   {
//     id: 5,
//     text: "",
//   },
//   {
//     id: 6,
//     text: "",
//   },
//   {
//     id: 7,
//     text: "",
//   },
//   {
//     id: 8,
//     text: "",
//   },
//   {
//     id: 9,
//     text: "",
//   },
//   {
//     id: 10,
//     text: "",
//   },
// ];
const dataConfiguration2 = [
  {
    id: 1,
    text: "Data Connectors",
    img: "/image2.png",
    img2: "/dataConnectBlue.png",
  },
  {
    id: 2,
    text: "Files",
    img: "/files1.png",
    img2: "/filesBlue.png",
  },
  {
    id: 3,
    text: "Databases",
    img: "/op2.png",
    img2: "/op2.png",
  },
  {
    id: 4,
    text: "Third Parties",
    img: "/op3.png",
    img2: "/thirdParties1.png",
  },
  {
    id: 5,
    text: "My Data Sources",
    img: "/op4.png",
  },
  {
    id: 6,
    text: "My Files",
    img: "/op5.png",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const dataConfiguration = [
  // {
  //   id: 1,
  //   text: "Data Connectors",
  //   img: "/image2.png",
  //   img2: "/dataConnectBlue.png",
  // },
  {
    id: 1,
    text: "My Files",
    img: "/files1.png",
    img2: "/filesBlue.png",
  },
  {
    id: 2,
    text: "My Data Sources",
    img: "/op2.png",
    img2: "/op2.png",
  },
  {
    id: 3,
    text: "Third Parties",
    img: "/op3.png",
    img2: "/thirdParties1.png",
  },
  {
    id: 4,
    text: "Existing Datasets",
    img: "/op4.png",
    img2: "/dataSetsBlue.png",
  },
  {
    id: 5,
    text: "",
    // img: "/op4.png",
  },
  {
    id: 6,
    text: "",
    // img: "/op5.png",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const autoMlFlow = [
  {
    id: 1,
    text: "Ingest Data",
    img: "/ingestData.png",
    img2: "/ingestDataBlue.png",
  },
  {
    id: 2,
    text: "Auto ML Engine",
    img: "/autoMLEngine.png",
    img2: "/autoMlBlue.png",
  },
  {
    id: 3,
    text: "ML Dashboards",
    img: "/mldashboardwhite.png",
    img2: "/mldashboardblue.png",
  },
  // {
  //   id: 4,
  //   text: 'My Data Sources',
  //   img: '/datasourcewhite.png'
  // },
  // {
  //   id: 5,
  //   text: 'My Files',
  //   img: '/fileswhite.png'
  // },
  {
    id: 4,
    text: "",
    // img: '/datasourcewhite.png'
  },
  {
    id: 5,
    text: "",
    // img: '/fileswhite.png'
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const dataModulation = [
  {
    id: 1,
    text: "Query Editor",
    img: "/querywhite.png",
  },
  {
    id: 2,
    text: "My Data Sources",
    img: "/datasourcewhite.png",
  },
  {
    id: 3,
    text: "My Files",
    img: "/fileswhite.png",
  },
  {
    id: 4,
    text: "",
  },
  {
    id: 5,
    text: "",
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const myAssets2 = [
  { id: 1, text: "Overview", img: "/overview.png" },
  { id: 2, text: "Widgets", img: "/widgetwhite.png" },
  { id: 3, text: "Dashboards", img: "/dashboardwhite.png" },
  { id: 4, text: "ML Dashboards", img: "/mldashboardIcon.png" },
  { id: 7, text: "Cross Sale Model", img: "" },
  { id: 8, text: "Sale Forecasting Model", img: "" },
  { id: 5, text: "My Data Sources", img: "/datasourcewhite.png" },
  { id: 6, text: "My Files", img: "/fileswhite.png" },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];
const myAssets = [
  {
    id: 1,
    text: "Overview",
    img: "/overview.png",
    img2: "/overviewblue.png",
  },
  {
    id: 2,
    text: "Widgets",
    img: "/widgetwhite.png",
    img2: "/widgetblue.png",
  },
  {
    id: 3,
    text: "Dashboards",
    img: "/dashboardwhite.png",
    img2: "/dashboardblue.png",
  },
  {
    id: 4,
    text: "ML Dashboards",
    img: "/mldashboardIcon.png",
    img2: "/mldashboardblue.png",
  },
  {
    id: 5,
    text: "My Data Sources",
    img: "/datasourcewhite.png",
  },
  {
    id: 6,
    text: "My Files",
    img: "/fileswhite.png",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

const favorites = [
  {
    id: 1,
    text: "My Widgets",
    img: "/widgetwhite.png",
    img2: "/widgetblue.png",
  },
  {
    id: 2,
    text: "My Dashboards",
    img: "/dashboardwhite.png",
    img2: "/dashboardblue.png",
  },
  {
    id: 3,
    text: "My ML Dashboards",
    img: "/mldashboardIcon.png",
    img2: "/mldashboardblue.png",
  },
  // {
  //   id: 4,
  //   text: 'My Data Sources',
  //   img: '/datasourcewhite.png'
  // },
  // {
  //   id: 5,
  //   text: 'My Files',
  //   img: '/fileswhite.png'
  // },
  {
    id: 4,
    text: "",
    // img: '/datasourcewhite.png'
  },
  {
    id: 5,
    text: "",
    // img: '/fileswhite.png'
  },
  {
    id: 6,
    text: "",
  },
  {
    id: 7,
    text: "",
  },
  {
    id: 8,
    text: "",
  },
  {
    id: 9,
    text: "",
  },
  {
    id: 10,
    text: "",
  },
];

// const notifies = [
//   {
//     id: 1,
//     title: "Widget Created",
//   },
//   {
//     id: 2,
//     title: "Dashboard Created",
//   },
// ];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "auto",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
}
export default function MiniDrawer(props) {
  const theme = useTheme();
  let drawerSelectedId = useRef(null);
  const { subscription_id } = useParams();

  const isScreen0 = useMediaQuery("( max-width:1410px)");
  const isScreen1 = useMediaQuery("(min-width:1411px && max-width:1490px)");
  // const isScreen1 = useMediaQuery('(min-width:1400px)')
  const isScreen2 = useMediaQuery("(min-width:1500px)");

  const isScreen0H = useMediaQuery("(max-height:600px)");
  const isScreen1H = useMediaQuery("(min-height:625px && max-height:820px)");
  const isScreen1_1H = useMediaQuery("(min-height:625px && max-height:720px)");
  const isScreen1_2H = useMediaQuery("(min-height:721px && max-height:820px)");

  const isScreen2H = useMediaQuery("(min-height:825px &&  max-height:920px)");
  const isScreen3H = useMediaQuery("(min-height:1000px)");

  const [open, setOpen] = useState(true);

  const [notifies, setNotifies] = useState();

  const [openConnectors, setOpenConnectors] = React.useState(false);

  const [selectedOption, setSelectedOption] = useState();
  const [menu, setMenu] = useState(initial);

  const [dashboardOptions, setDashboardOptions] = useState([{}]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const [notSaved, setNotSaved] = useState(false);

  const [newclr, setnewclr] = useState(false);
  const [newclr2, setnewclr2] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [viewOnlyUser, setViewOnlyUser] = useState(false);

  useEffect(() => {
    // console.log('seeee', pathname.slice(0, 10))
    console.log("SUBID-", subscription_id);

    if (subscription_id === "free_5508") {
      localStorage.setItem("viewMode", 1);
      setMenu(viewOnly_User);
      setViewOnlyUser(true);
      setOpen(true);
    }
    // else localStorage.setItem("viewMode", 0);

    getNotifications();
    if (pathname.slice(0, 10) === "/Dashboard") handleDrawerOpen(1);
  }, []);

  useEffect(() => {
    console.log("MENU-", menu);
  }, [menu]);

  useEffect(() => {
    console.log("pathname", props, pathname);

    if (pathname === "/Create_Flow") handleDrawerOpen(1);
    if (pathname === "/My_Data_Flows") handleDrawerOpen(1);
    // if (pathname === "/My_Datasources") {
    //   handleDrawerOpen(4);
    //   // setMenu(dataConfiguration2)
    //   // setnewclr(true)

    //   if (localStorage.getItem("drawerSelectedId") == 1) handleDrawerOpen(1);
    //   else if (localStorage.getItem("drawerSelectedId") == 2)
    //     handleDrawerOpen(2);
    //   else if (localStorage.getItem("drawerSelectedId") == 3)
    //     handleDrawerOpen(3);
    //   else if (localStorage.getItem("drawerSelectedId") == 5)
    //     handleDrawerOpen(5);
    //   else if (localStorage.getItem("drawerSelectedId") == 6)
    //     handleDrawerOpen(6);
    // }
    // if (pathname === "/My_Files") {
    //   handleDrawerOpen(4);
    //   // setMenu(dataConfiguration2)
    //   // setnewclr(true)

    //   if (localStorage.getItem("drawerSelectedId") == 1) handleDrawerOpen(1);
    //   else if (localStorage.getItem("drawerSelectedId") == 2)
    //     handleDrawerOpen(2);
    //   else if (localStorage.getItem("drawerSelectedId") == 3)
    //     handleDrawerOpen(3);
    //   else if (localStorage.getItem("drawerSelectedId") == 5)
    //     handleDrawerOpen(5);
    //   else if (localStorage.getItem("drawerSelectedId") == 6)
    //     handleDrawerOpen(6);
    // }

    if (pathname.slice(0, 15) === "/Import Dataset") handleDrawerOpen(2);

    if (pathname === "/Auto_ML_Engine") handleDrawerOpen(3);
    if (pathname === "/ML_Dashboards") handleDrawerOpen(3);
    if (pathname.slice(0, 16) === "/Import_Dataset2") handleDrawerOpen(3);

    if (pathname === "/My_Files") {
      handleDrawerOpen(4);
      // setMenu(dataConfiguration2);
      // setnewclr(true);
    }
    if (pathname === "/My_Datasources") {
      handleDrawerOpen(4);
      // setMenu(dataConfiguration2);
      // setnewclr(true);
    }
    if (pathname === "/Third_Parties") {
      handleDrawerOpen(4);
      // setMenu(dataConfiguration2);
      // setnewclr(true);
    }
    if (pathname === "/Existing_Datasets") {
      handleDrawerOpen(4);
      // setMenu(dataConfiguration2);
      // setnewclr(true);
    }

    if (pathname === "/Query_Editor") {
      if (localStorage.getItem("drawerSelectedId") == 2)
        // console.log('Czzzzz', localStorage.getItem('drawerSelectedId'))
        handleDrawerOpen(2);
      // else if (localStorage.getItem("drawerSelectedId") == 5)
      //   handleDrawerOpen(5);
    }

    if (pathname === "/Overview") handleDrawerOpen(2);
    if (pathname === "/Widgets") handleDrawerOpen(2);
    if (pathname === "/Dashboards") handleDrawerOpen(2);

    if (pathname === "/Favorite_Widgets") handleDrawerOpen(5);
    if (pathname === "/Favorite_Dashboards") handleDrawerOpen(5);
    if (pathname === "/My_ML_Dashboards") handleDrawerOpen(5);

    if (pathname === "/My_Account") setOpen(false);
    if (pathname === "/Profile") setOpen(false);
    if (global.InFlow) setOpen(false);
    if (props?.hideSideBar) setOpen(false);
    // if (
    //   global.subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra' ||
    //   global.subscription_id == 'price_1LfOrRSBwqDDsny7TiYnfuXA'
    // )
    //   setMenu(drawerMenu)
    // else if (global.subscription_id === 'price_1LfOlnSBwqDDsny7nprdkWUQ')
    //   setMenu(drawerMenu1)
    // else setMenu(drawerMenu2)
    // if (
    //   global.subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra" ||
    //   global.subscription_id == "price_1LfOrRSBwqDDsny7TiYnfuXA" ||
    //   global.subscription_id === "price_1LfOlnSBwqDDsny7nprdkWUQ"
    // )
    //   console.log("Not View Only User");
    // else
    if (subscription_id === "free_5508") {
      setMenu(viewOnly_User);
      setViewOnlyUser(true);
    }
  }, []);

  useEffect(() => {
    console.log("SL Option-", selectedOption);
  }, [selectedOption]);

  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setOpenNotification(true);
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
    setOpenNotification(false);
  };
  const handleDrawerOpen = (Id) => {
    drawerSelectedId.current = Id;
    localStorage.setItem("drawerSelectedId", Id);
    // console.log("option>>>>", Id);

    setOpen(true);
    if (!viewOnlyUser) {
      setSelectedOption(Id);
      if (Id == 4) setnewclr(true);
      // if (Id == 4 && selectedOption == 4) setnewclr(false);
      if (Id != 4) setnewclr(false);
      // if (Id != 5) setnewclr2(false)
      if (Id == 1) setMenu(autoAnalytics);
      else if (Id == 2) setMenu(deepAnalytics);
      else if (Id == 3) setMenu(autoMlFlow);
      else if (Id == 4) setMenu(dataConfiguration);
      else if (Id == 5) setMenu(favorites);
      // else if (Id == 6) setMenu(myAssets)
      // else if (Id == 6) setMenu(favorites)
    }
  };

  const handleDrawerClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  const history = useHistory();
  const { pathname } = useLocation();

  function handleOnClick(text, id) {
    if (text === "Create a Flow") history.push("/Create_Flow");

    if (text === "Ingest Data")
      history.push("/Import_Dataset2/:" + global.subscription_id);

    if (text === "Import Dataset") {
      localStorage.setItem("FromWidget", 0);
      history.push("/Import Dataset/" + global.subscription_id);
    }

    if (text === "My Data Sources") history.push("/My_Datasources");
    if (text === "My Data Flow") history.push("/My_Data_Flows");
    if (text === "My Files") history.push("/My_Files");
    // if (text === "Files") history.push("/Files");
    // if (text === "Databases") history.push("/Databases");
    if (text === "Third Parties") history.push("/Third_Parties");
    if (text === "Existing Datasets") history.push("/Existing_Datasets");

    if (text === "ML Dashboards" && id === 4) {
      setMenu(myAssets2);
      // setnewclr2(true)
    }
    if (text === "ML Dashboards" && id === 3) {
      history.push("/ML_Dashboards");
    }

    if (text === "Cross Sale Model") history.push("/ML_Dashboards");

    if (text === "Sale Forecasting Model") history.push("/ML_Dashboards");

    if (text === "Data Connectors") {
      // setMenu(dataConfiguration2);
      // setnewclr(!newclr);
    }

    if (text === "Query Editor") {
      history.push("/Query_Editor");
    }

    if (text === "Auto ML Engine") history.push("/Auto_ML_Engine");

    if (text === "Widgets") history.push("/Widgets");
    if (text === "Dashboards") history.push("/Dashboards");

    if (text === "Overview") history.push("/Overview");
    if (text === "My Widgets") history.push("/Favorite_Widgets");
    if (text === "My Dashboards") history.push("/Favorite_Dashboards");
    if (text === "My ML Dashboards") history.push("/My_ML_Dashboards");

    if (text === "View Only Dashboards")
      history.push("/View_Only_Dashboards/" + global.subscription_id);

    // if (text === 'Create a Flow')
    //   history.push('/Big Data Flow/' + global.subscription_id)

    // if (text === 'Dashboard')
    //   history.push(
    //     '/Dashboard/' +
    //       localStorage.getItem('account_id') +
    //       '/' +
    //       global.subscription_id
    //   )
    // if (text === 'My Flows') history.push('/My Flows')
    // if (text === 'Quick Data Flow') history.push('/Data Blocks')
    // if (text === 'Data Flows') history.push('/Data Flows')
    // if (text === 'Big Data Flow')
    //   history.push('/Big Data Flow/' + global.subscription_id)
    // if (text === 'Import Dataset') {
    //   localStorage.setItem('FromWidget', 0)
    //   history.push('/Import Dataset/' + global.subscription_id)
    // }
    // if (text === 'Query Editor') history.push('/Query Editor')
    // // if (text === 'Widget Dashboard') history.push('/Widget Dashboard')
    // // if (text === 'Main Dashboard') history.push('/Main_Dashboard')
    // if (text === 'Widget Overview') history.push('/Widget Overview')
    // if (text === 'Dashboard Overview') history.push('/Dashboard Overview')
    // if (text === 'View Only Dashboards') history.push('/View Only Dashboards')
    // if (text === 'Favourite Widgets') history.push('/Favourite Widgets')
    // if (text === 'Favourite View Only Dashboards')
    //   history.push('/Favourite View Only Dashboards')
    // if (text === 'ML Dashboards') history.push('/ML Dashboards')
    // if (text === 'Favourite Dashboards') history.push('/Favourite Dashboards')
  }

  const getNotifications = () => {
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getNotifies?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        console.log("notification response", response.data);
        setNotifies(response.data.data);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        open={open}
        onClickAway={() => open && setOpen(false)}
      >
        <Drawer variant="permanent" PaperProps={{}} open={open}>
          <DrawerHeader
            style={{
              display: "flex",
              width: "100%",
              backgroundColor: !open && "#0aafff",
            }}
          >
            {open && (
              <div
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  width: "145vh",
                  height: "5vh",
                  left: "24%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize:
                      selectedOption === 4 || selectedOption === 3
                        ? "14px"
                        : "15px",
                    color: "#067ab4",
                    fontWeight: "600",
                    paddingLeft: selectedOption === 3 ? 7 : 4,
                  }}
                >
                  {!viewOnlyUser && selectedOption === 1
                    ? "Auto Analytics"
                    : selectedOption === 2 && !viewOnlyUser
                    ? "Deep Analytics"
                    : selectedOption === 3 && !viewOnlyUser
                    ? "  Auto-ML Analytics"
                    : selectedOption === 4 && !viewOnlyUser
                    ? "    Data Connectors"
                    : // selectedOption === 5
                    // ? ' Data Modulation'
                    // :
                    // : selectedOption === 6
                    // ? 'My Assets'
                    selectedOption === 5 && !viewOnlyUser
                    ? "Favorites"
                    : ""}
                </div>
              </div>
            )}
            <div
              style={{
                width: "73vh",
                backgroundColor: "#0aafff",
                height: "100%",
                position: "relative",
                left: "-59%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#067AB4",
                  borderRadius: "0px 0px 15px 15px",
                  height: 52,
                  width: "75%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  cursor: "pointer",
                }}
                onClick={() =>
                  history.push(
                    "/Dashboard/" +
                      localStorage.getItem("account_id").toString() +
                      "/" +
                      global.subscription_id
                  )
                }
              >
                {open && (
                  <img
                    src={"/logoFix.png"}
                    style={{
                      resizeMode: "contain",
                      height: 40,
                      width: "auto",
                    }}
                  />
                )}
              </div>
            </div>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon sx={{ color: "white" }} />
              ) : !open ? (
                <div style={{ marginRight: "-12%" }}>
                  <div
                    style={{
                      backgroundColor: "#067AB4",
                      borderRadius: "0px 0px 15px 15px",
                      height: 52,
                      width: "auto",
                      alignSelf: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 4,
                      marginTop: "-10px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      history.push(
                        "/Dashboard/" +
                          localStorage.getItem("account_id").toString() +
                          "/" +
                          global.subscription_id
                      )
                    }
                  >
                    {!open && (
                      <img
                        src={"/logoFix.png"}
                        style={{
                          resizeMode: "contain",
                          height: 40,
                          width: "100%",
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <ChevronLeftIcon sx={{ color: "#067AB4" }} />
                </>
              )}
            </IconButton>
          </DrawerHeader>
          {props.appBar && (
            <AppBar
              position="fixed"
              open={open}
              style={{ backgroundColor: "#C1D9EC" }}
            >
              <Toolbar>
                <div
                  style={
                    !open
                      ? {
                          width: isScreen1 ? "78px" : "72px",
                          backgroundColor: "#0aafff",
                          height: 64,
                          alignSelf: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: isScreen1 ? "-1.5%" : "-2%",
                        }
                      : {
                          backgroundColor: "#C1D9EC",
                        }
                  }
                >
                  <div
                    style={
                      !open
                        ? {
                            backgroundColor: "#067AB4",
                            borderRadius: "0px 0px 15px 15px",
                            height: "80%",
                            width: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }
                        : {}
                    }
                    onClick={() =>
                      history.push(
                        "/Dashboard/" +
                          localStorage.getItem("account_id").toString() +
                          "/" +
                          global.subscription_id
                      )
                    }
                  >
                    {!open && (
                      <img
                        src={"/logoFix.png"}
                        style={{
                          resizeMode: "contain",
                          height: 40,
                          width: "auto",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#067ab4",
                    borderRadius: "20.9667px 0px 0px 20.9667px",
                    height: 52,
                    display: "flex",
                    alignItems: "center",
                    width: "28%",
                    left: "70%",
                    position: "relative",
                  }}
                >
                  <img
                    src={"/logoBanner2.png"}
                    style={{
                      resizeMode: "contain",
                      height: "90%",
                      width: "70%",
                      position: "relative",
                      left: "4%",
                    }}
                  />
                </div>
              </Toolbar>
            </AppBar>
          )}

          <List
            style={{
              zIndex: 99,
              backgroundColor: "#067ab4",
              height: isScreen2 ? "100vh" : "95vh",
              width: !open ? "100%" : "100%",
              overflowY: "hidden",
            }}
          >
            <div
              style={{
                width: open ? "70px" : "100%",
                background: "#0aafff",
                height: isScreen2 ? "97vh" : "95vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 100,
                marginTop: -8,
                paddingTop: "15px",
              }}
            >
              {menu?.map((text, index) => (
                <ListItem
                  sx={{
                    // '&.Mui-selected': {
                    //   backgroundColor: '#b86b32',
                    //   color: 'white',
                    //   '& .MuiListItemIcon-root': {
                    //     color: 'white'
                    //   }
                    // },
                    // '&.Mui-focusVisible': {
                    //   backgroundColor: '#b86b32',
                    //   color: 'white',
                    //   '& .MuiListItemIcon-root': {
                    //     color: 'white'
                    //   }
                    // },
                    // ':hover': {
                    //   backgroundColor: '#d6b145',
                    //   color: 'white',
                    //   '& .MuiListItemIcon-root': {
                    //     color: 'white'
                    //   }
                    // },
                    width: !open ? "72px" : "70px",
                    background: "#0aafff",
                    position: "relative",
                    cursor: "pointer",
                    // overflowX: !open ? 'hidden' : 'none'
                    // marginTop: isScreen1 ? '10px' : isScreen2 ? '20px' : '5px'
                  }}
                  // selected={
                  //   text?.text == pathname.substring(1, text?.text.length + 1)
                  // }
                  button
                  key={text?.id}
                  // onClick={() => handleOnClick(text)}
                >
                  <ListItemIcon>
                    {
                      index === 0 ? (
                        <>
                          {selectedOption === 1 ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <img
                                src={"/image1blue.png"}
                                style={{
                                  resizeMode: "contain",
                                  height: "24px",
                                  width: "auto",
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={"/image5.png"}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                              style={{
                                resizeMode: "contain",
                                marginTop: "4px",
                                width: "36px",
                                height: "32px",
                              }}
                            />
                          )}
                        </>
                      ) : index === 1 && !viewOnlyUser ? (
                        <>
                          {selectedOption === 2 ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <img
                                src={"/image2blue.png"}
                                style={{
                                  resizeMode: "contain",
                                  height: "24px",
                                  width: "auto",
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={"/deepwhite.png"}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                              style={{
                                width: "34px",
                                height: "36px",
                              }}
                            />
                          )}
                        </>
                      ) : index === 2 && !viewOnlyUser ? (
                        <>
                          {selectedOption === 3 ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <img
                                src={"/image3blue.png"}
                                style={{
                                  resizeMode: "contain",
                                  height: "24px",
                                  width: "auto",
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={"/autoML.png"}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                              style={{
                                width: "30px",
                                height: "47px",
                                marginLeft: "4px",
                              }}
                            />
                          )}
                        </>
                      ) : index === 3 && !viewOnlyUser ? (
                        <>
                          {selectedOption === 4 ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <img
                                src={"/image4blue.png"}
                                style={{
                                  resizeMode: "contain",
                                  height: "24px",
                                  width: "auto",
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={"/image2.png"}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                              style={{
                                width: "35px",
                                height: "35px",
                              }}
                            />
                          )}
                        </>
                      ) : // : index === 5 ? (
                      //   <>
                      //     {selectedOption === 6 ? (
                      //       <div
                      //         style={{
                      //           backgroundImage: `url(${'/selectedShape.png'})`,
                      //           backgroundPosition: 'center',
                      //           backgroundSize: 'cover',
                      //           backgroundRepeat: 'no-repeat',
                      //           height: '55px',
                      //           width: open ? '96%' : '100%',
                      //           display: 'flex',
                      //           justifyContent: 'center',
                      //           alignItems: 'center'
                      //         }}
                      //         onClick={() => {
                      //           handleDrawerOpen(text?.id)
                      //         }}
                      //       >
                      //         <img
                      //           src={'/image6blue.png'}
                      //           style={{
                      //             resizeMode: 'contain',
                      //             height: '24px',
                      //             width: 'auto'
                      //           }}
                      //         />
                      //       </div>
                      //     ) : (
                      //       <img
                      //         src={'/image7.png'}
                      //         onClick={() => {
                      //           handleDrawerOpen(text?.id)
                      //         }}
                      //         style={{
                      //           width: '36px',
                      //           height: '34px'
                      //         }}
                      //       />
                      //     )}
                      //   </>
                      // )

                      index === 4 && !viewOnlyUser ? (
                        <>
                          {selectedOption === 5 ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <img
                                src={"/image7blue.png"}
                                style={{
                                  resizeMode: "contain",
                                  height: "24px",
                                  width: "auto",
                                }}
                              />
                            </div>
                          ) : (
                            <img
                              src={"/image8.png"}
                              onClick={() => handleDrawerOpen(text?.id)}
                              style={{
                                width: "36px",
                                height: "36px",
                              }}
                            />
                          )}
                        </>
                      ) : // : (global.subscription_id ===
                      //     'price_1LfOpESBwqDDsny7sB1s8fra' &&
                      //     index === 7) ||
                      //   (global.subscription_id ===
                      //     'price_1LfOrRSBwqDDsny7TiYnfuXA' &&
                      //     index === 7) ? (
                      //   <PsychologyIcon />
                      // )

                      index === 6 && !viewOnlyUser ? (
                        <>
                          <IconButton
                            color="inherit"
                            aria-controls={open1 ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? "true" : undefined}
                            onClick={handleClick}
                            edge="start"
                          >
                            <img
                              src={"/image10.png"}
                              style={{
                                width: "36px",
                                height: "36px",
                                marginLeft: "5px",
                              }}
                            />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open1}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            {/* <MenuItem onClick={handleClose}>
                              <AccountCircleIcon /> Profile
                            </MenuItem> */}
                            <MenuItem
                              onClick={() => history.push("/My_Account")}
                            >
                              <AccountBoxIcon /> My Account
                            </MenuItem>
                            <MenuItem>
                              <LogoutIcon />
                              <a href="http://44.241.186.53:3000/account/logout">
                                Logout
                              </a>
                            </MenuItem>
                          </Menu>
                        </>
                      ) : index === 5 && !viewOnlyUser ? (
                        <>
                          {openNotification ? (
                            <div
                              style={{
                                backgroundImage: `url(${"/selectedShape.png"})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                height: "55px",
                                width: open ? "96%" : "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                handleDrawerOpen(text?.id);
                              }}
                            >
                              <Badge
                                badgeContent=" "
                                color="primary"
                                variant="dot"
                                overlap="circular"
                              >
                                <IconButton
                                  color="inherit"
                                  aria-controls={
                                    open2 ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open2 ? "true" : undefined}
                                  onClick={handleClick2}
                                  edge="start"
                                >
                                  <img
                                    src={"/notificationBlue.png"}
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </IconButton>
                              </Badge>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                                sx={{
                                  top: isScreen0H
                                    ? "20vh"
                                    : isScreen1_1H
                                    ? "10vh"
                                    : isScreen1_2H
                                    ? "18vh"
                                    : isScreen2H
                                    ? "27vh"
                                    : isScreen3H
                                    ? "44vh"
                                    : "30vh",
                                  marginBotoom: "20px",
                                  left: "60px",
                                  minHeight: "500px",
                                  minWidth: "250px",
                                }}
                                // anchorOrigin={{
                                //   vertical: 'top',
                                //   horizontal: 'left'
                                // }}
                                // transformOrigin={{
                                //   vertical: 'top',
                                //   horizontal: 'left'
                                // }}
                              >
                                <div
                                  style={{
                                    marginTop: "-8px",
                                    backgroundColor: "#00A0F8",
                                    height: "70px",
                                    width: "250px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "fixed",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "white",
                                      fontWeight: "600",
                                      marginLeft: "25px",
                                    }}
                                  >
                                    Notifications
                                  </div>
                                  <img
                                    src={"/clear.png"}
                                    style={{
                                      marginLeft: "20px",
                                      resizeMode: "contain",
                                      height: "8px",
                                      width: "auto",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    height: "500px",
                                    width: "250px",
                                  }}
                                >
                                  <div
                                    style={{
                                      minHeight: "508px",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      backgroundColor: "#C1D9EC",
                                      paddingTop: "65px",
                                      paddingBottom: "12px",
                                    }}
                                  >
                                    {notifies?.map((item) => {
                                      return (
                                        <>
                                          <div
                                            style={{
                                              width: "92%",
                                              backgroundColor: "#0BAFFF",
                                              marginTop: "10px",
                                              display: "flex",
                                              padding: "12px",
                                              borderRadius: "5px",
                                              display: "flex",
                                              flexDirection: "column",
                                              textAlign: "left",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                fontWeight: "600",
                                                fontFamily: "Trebuchet MS",
                                                fontSize: "14px",
                                              }}
                                            >
                                              {item?.title}
                                            </div>

                                            <div
                                              style={{
                                                marginTop: "6px",
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                fontWeight: "500",
                                                fontFamily: "Trebuchet MS",
                                                fontSize: "12px",
                                              }}
                                            >
                                              {item?.description}
                                            </div>
                                            <div
                                              style={{
                                                marginTop: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                color: "white",
                                                fontWeight: "500",
                                                fontFamily: "Trebuchet MS",
                                                fontSize: "12px",
                                                alignSelf: "flex-end",
                                              }}
                                            >
                                              {moment(
                                                item?.created_at
                                              ).fromNow()}
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                    {/* <div
                                      style={{
                                        height: "40px",
                                        width: "92%",
                                        backgroundColor: "#0BAFFF",
                                        marginTop: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px",
                                        color: "white",
                                        fontWeight: "500",
                                        fontFamily: "Trebuchet MS",
                                        fontSize: "14px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      Lorem Ipsum Lorem Ipsum
                                    </div>
                                    <div
                                      style={{
                                        height: "40px",
                                        width: "92%",
                                        backgroundColor: "#0BAFFF",
                                        marginTop: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px",
                                        color: "white",
                                        fontWeight: "500",
                                        fontFamily: "Trebuchet MS",
                                        fontSize: "14px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      Lorem Ipsum Lorem Ipsum
                                    </div> */}
                                  </div>
                                </div>
                              </Menu>
                            </div>
                          ) : (
                            <>
                              <Badge
                                badgeContent=" "
                                color="primary"
                                variant="dot"
                                overlap="circular"
                              >
                                <IconButton
                                  color="inherit"
                                  aria-controls={
                                    open2 ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open2 ? "true" : undefined}
                                  onClick={handleClick2}
                                  edge="start"
                                >
                                  <img
                                    src={"/image9.png"}
                                    style={{
                                      width: "36px",
                                      height: "36px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </IconButton>
                              </Badge>
                            </>
                          )}
                        </>
                      ) : index === 20 ? (
                        <img
                          src={"/image11.png"}
                          style={{
                            resizeMode: "contain",
                            height: "5.8vh",
                            width: "auto",
                          }}
                        />
                      ) : index === 7 && !viewOnlyUser ? (
                        <div
                          style={{
                            backgroundColor: "#067ab4",
                            borderRadius: "15px 15px 0px 0px",
                            height: isScreen1 ? "94px" : "90px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            marginLeft: "-7px",
                            position: "relative",
                            top: isScreen1H
                              ? "12vh"
                              : isScreen0H
                              ? "4vh"
                              : isScreen2H
                              ? "15vh"
                              : isScreen3H
                              ? "18vh"
                              : isScreen0
                              ? "4.2vh"
                              : "12vh",
                            zIndex: 99999,
                          }}
                          onClick={() => history.push("/Profile")}
                        >
                          <img
                            src={"/profile1.png"}
                            style={{
                              resizeMode: "contain",
                              height: isScreen1 ? "40px" : "35px",
                              width: "auto",
                              marginTop: "10px",
                              paddingRight: "8px",
                              paddingLeft: "8px",
                            }}
                          />
                        </div>
                      ) : index === 8 && viewOnlyUser ? (
                        <>
                          <IconButton
                            color="inherit"
                            aria-controls={open1 ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open1 ? "true" : undefined}
                            onClick={handleClick}
                            edge="start"
                          >
                            <img
                              src={"/image10.png"}
                              style={{
                                width: "36px",
                                height: "36px",
                                marginLeft: "5px",
                              }}
                            />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open1}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            {/* <MenuItem onClick={handleClose}>
                              <AccountCircleIcon /> Profile
                            </MenuItem> */}
                            {!viewOnlyUser && (
                              <MenuItem
                                onClick={() => history.push("/My_Account")}
                              >
                                <AccountBoxIcon /> My Account
                              </MenuItem>
                            )}
                            <MenuItem>
                              <LogoutIcon />
                              <a href="http://44.241.186.53:3000/account/logout">
                                Logout
                              </a>
                            </MenuItem>
                          </Menu>
                        </>
                      ) : null
                      // : (
                      //   index === 4 && (
                      //     <>
                      //       {selectedOption === 5 ? (
                      //         <div
                      //           style={{
                      //             backgroundImage: `url(${'/selectedShape.png'})`,
                      //             backgroundPosition: 'center',
                      //             backgroundSize: 'cover',
                      //             backgroundRepeat: 'no-repeat',
                      //             height: '55px',
                      //             width: open ? '96%' : '100%',
                      //             display: 'flex',
                      //             justifyContent: 'center',
                      //             alignItems: 'center'
                      //           }}
                      //           onClick={() => {
                      //             handleDrawerOpen(text?.id)
                      //           }}
                      //         >
                      //           <img
                      //             src={'/image5blue.png'}
                      //             style={{
                      //               resizeMode: 'contain',
                      //               height: '24px',
                      //               width: 'auto'
                      //             }}
                      //           />
                      //         </div>
                      //       ) : (
                      //         <img
                      //           src={'/image4.png'}
                      //           onClick={() => handleDrawerOpen(text?.id)}
                      //           style={{
                      //             resizeMode: 'contain',
                      //             height: '37px',
                      //             width: '53%',
                      //             marginLeft: '4px'
                      //           }}
                      //         />
                      //       )}
                      //     </>
                      //   )
                      // )
                    }
                  </ListItemIcon>

                  <div
                    style={
                      // (newclr === true &&
                      //   text.text != "" &&
                      //   text.id != 1 &&
                      //   text.id != 5 &&
                      //   text.id != 6) ||
                      // (newclr2 === true &&
                      //   text.text != "" &&
                      //   text.id != 1 &&
                      //   text.id != 2 &&
                      //   text.id != 3 &&
                      //   text.id != 4 &&
                      //   text.id != 5 &&
                      //   text.id != 6)
                      //   ? {
                      //       backgroundColor: "#0D4669",
                      //       minWidth: "192px",
                      //       display: "flex",
                      //       alignItems: "center",
                      //     }
                      //   :
                      {
                        display: "flex",
                        alignItems: "center",
                        minWidth: "192px",
                      }
                    }
                  >
                    <img
                      src={
                        (pathname === "/Create_Flow" &&
                          text.id === 1 &&
                          selectedOption === 1) ||
                        (pathname === "/My_Data_Flows" &&
                          text.id === 2 &&
                          selectedOption === 1) ||
                        (pathname === "/Auto_ML_Engine" &&
                          text.id === 2 &&
                          selectedOption === 3) ||
                        (pathname === "/ML_Dashboards" &&
                          text.id === 3 &&
                          selectedOption === 3) ||
                        (pathname === "/Query_Editor" &&
                          text.id === 2 &&
                          selectedOption === 2) ||
                        (pathname === "/Overview" &&
                          text.id === 3 &&
                          selectedOption === 2) ||
                        (pathname === "/Widgets" &&
                          text.id === 4 &&
                          selectedOption === 2) ||
                        (pathname === "/Dashboards" &&
                          text.id === 5 &&
                          selectedOption === 2) ||
                        (pathname === "/ML_Dashboards" &&
                          text.id === 4 &&
                          selectedOption === 20) ||
                        (pathname === "/Favorite_Widgets" &&
                          text.id === 1 &&
                          selectedOption === 5) ||
                        (pathname === "/Favorite_Dashboards" &&
                          text.id === 2 &&
                          selectedOption === 5) ||
                        (pathname === "/My_ML_Dashboards" &&
                          text.id === 3 &&
                          selectedOption === 5) ||
                        (pathname.slice(0, 16) === "/Import_Dataset2" &&
                          text.id === 1 &&
                          selectedOption === 3) ||
                        (pathname.slice(0, 15) === "/Import Dataset" &&
                          text.id === 1 &&
                          selectedOption === 2) ||
                        (pathname === "/My_Files" &&
                          text.id === 1 &&
                          selectedOption === 4) ||
                        (pathname === "/My_Datasources" &&
                          text.id === 2 &&
                          selectedOption === 4) ||
                        (pathname === "/Third_Parties" &&
                          text.id === 3 &&
                          selectedOption === 4) ||
                        (pathname === "/Existing_Datasets" &&
                          text.id === 4 &&
                          selectedOption === 4)
                          ? text?.img2
                          : text?.img
                      }
                      style={{
                        resizeMode: "contain",
                        height: "20px",
                        width: "auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    {(pathname === "/Create_Flow" &&
                      text.id === 1 &&
                      selectedOption === 1) ||
                    (pathname === "/My_Data_Flows" &&
                      text.id === 2 &&
                      selectedOption === 1) ||
                    (pathname === "/Auto_ML_Engine" &&
                      text.id === 2 &&
                      selectedOption === 3) ||
                    (pathname === "/ML_Dashboards" &&
                      text.id === 3 &&
                      selectedOption === 3) ||
                    (pathname === "/Query_Editor" &&
                      text.id === 2 &&
                      selectedOption === 2) ||
                    (pathname === "/Overview" &&
                      text.id === 3 &&
                      selectedOption === 2) ||
                    (pathname === "/Widgets" &&
                      text.id === 4 &&
                      selectedOption === 2) ||
                    (pathname === "/Dashboards" &&
                      text.id === 5 &&
                      selectedOption === 2) ||
                    (pathname === "/ML_Dashboards" &&
                      text.id === 4 &&
                      selectedOption === 20) ||
                    (pathname === "/Favorite_Widgets" &&
                      text.id === 1 &&
                      selectedOption === 5) ||
                    (pathname === "/Favorite_Dashboards" &&
                      text.id === 2 &&
                      selectedOption === 5) ||
                    (pathname === "/My_ML_Dashboards" &&
                      text.id === 3 &&
                      selectedOption === 5) ||
                    (pathname.slice(0, 16) === "/Import_Dataset2" &&
                      text.id === 1 &&
                      selectedOption === 3) ||
                    (pathname.slice(0, 15) === "/Import Dataset" &&
                      text.id === 1 &&
                      selectedOption === 2) ||
                    (pathname === "/My_Datasources" &&
                      text.id === 2 &&
                      selectedOption === 4 &&
                      !newclr) ||
                    // (pathname === "/My_Files" &&
                    //   text.id === 3 &&
                    //   selectedOption === 4 &&
                    //   !newclr)
                    // (selectedOption === 4 && newclr && text.id === 1) ||
                    (pathname === "/My_Files" &&
                      text.id === 1 &&
                      // newclr &&
                      selectedOption === 4) ||
                    (pathname === "/My_Datasources" &&
                      // newclr &&
                      text.id === 2 &&
                      selectedOption === 4) ||
                    (pathname === "/Third_Parties" &&
                      // newclr &&
                      text.id === 3 &&
                      selectedOption === 4) ||
                    (pathname === "/Existing_Datasets" &&
                      text.id === 4 &&
                      selectedOption === 4) ? (
                      <div
                        style={{
                          height: "57px",
                          width: "174px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundImage: `url(${"/selectedBox.png"})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <ListItemText
                          primary={text?.text}
                          sx={{
                            ml: 2,
                            color: "#0BAFFF",
                            fontWeight: "500",
                          }}
                          onClick={() => handleOnClick(text?.text, text?.id)}
                        />
                      </div>
                    ) : (
                      // : (pathname === "/Files" &&
                      //     text.id === 1 &&
                      //     newclr &&
                      //     selectedOption === 4) ||
                      //   (pathname === "/Databases" &&
                      //     newclr &&
                      //     text.id === 2 &&
                      //     selectedOption === 4) ||
                      //   (pathname === "/Third_Parties" &&
                      //     newclr &&
                      //     text.id === 3 &&
                      //     selectedOption === 4) ? (
                      //   <div
                      //     style={{
                      //       width: "100%",
                      //       maxHeight: "25px",
                      //       display: "flex",
                      //       alignItems: "center",
                      //       justifyContent: "center",
                      //       backgroundColor: "white",
                      //       borderTopLeftRadius: "12px",
                      //       borderBottomLeftRadius: "12px",
                      //       marginTop: "8px",
                      //       marginBottom: "8px",
                      //     }}
                      //   >
                      //     <ListItemText
                      //       primary={text?.text}
                      //       sx={{
                      //         color: "#0BAFFF",
                      //         fontWeight: "500",
                      //         ml: "10px",
                      //       }}
                      //       onClick={() => handleOnClick(text?.text, text?.id)}
                      //     />
                      //   </div>
                      // )

                      <ListItemText
                        primary={text?.text}
                        sx={{
                          color: "white",
                        }}
                        onClick={() => handleOnClick(text?.text, text?.id)}
                      />
                    )}
                  </div>
                </ListItem>
              ))}
            </div>
          </List>

          <Divider />
        </Drawer>
      </ClickAwayListener>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
