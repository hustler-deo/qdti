import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import configData from "../config.json";

import CircularProgress from "@mui/material/CircularProgress";

// Auth context
import { AuthContext } from "../context";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";

import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BuildIcon from "@mui/icons-material/Build";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShareIcon from "@mui/icons-material/Share";
import IosShareIcon from "@mui/icons-material/IosShare";
import StarIcon from "@mui/icons-material/Star";
import ReportIcon from "@mui/icons-material/Report";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const options = [
  { value: "Column1", label: "Column1" },
  { value: "Column2", label: "Column2" },
  { value: "Column3", label: "Column3" },
  { value: "Column4", label: "Column4" },
  { value: "Column5", label: "Column5" },
  { value: "Column6", label: "Column6" },
];

const columns = [
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

var flag = 0,
  added = 0;
const MyMLDashboards = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rowsData, setrowsData] = React.useState(rows);
  const [columnData, setColumnData] = React.useState(columns);

  const [clickedShape, setclickedShape] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [aggFunction, setAggFunction] = React.useState("");
  const [column, setColumn] = React.useState("");
  const [cname, setCname] = React.useState("agecc");
  const [type, setType] = React.useState(-1);

  const [dashboards, setDashboards] = React.useState();
  const [dashboardsBox, setDashboardsBox] = useState();

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [issueDetails, setIssueDetails] = useState("");

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [run, setRun] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [dashboardId, setDashboardId] = useState([]);

  const [dashdata, setDashData] = useState([]);
  const [data2, setData2] = useState([]);

  const [isSaveDashboard, setIsSaveDashboard] = useState(false);

  const [reported, setReported] = useState(false);
  const [noIssueDetails, setNoIssueDetails] = useState(false);

  const [addedToFav, setAddedToFav] = useState(false);
  const [show, setShow] = useState(false);
  const [searchedDashboard, setSearchedDashboard] = useState();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setShow(!show);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = (index) => {
    //console.log('Index', index)
    setselectedActionIndex(index);
    if (index === 0) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
      });
    }
    if (index == 1) setReportIssueModal(true);
    if (index == 2) setRun(true);
    if (index == 3) setIsSaveDashboard(true);
    if (index == 4) setDeleteModal(true);

    handleClose();
  };

  const actionsList = [
    "Edit",
    // 'Report an Issue',
    // 'Schedule Report',
    // 'Save As',
    // 'Delete'
  ];

  // Avoid a layout jump when reaching the last page with empty rows.

  useEffect(() => {
    getAllMLDashboards();
  }, []);

  const getAllMLDashboards = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/dashboard/mldashboard_viewall",
        {},

        {}
      )
      .then((response) => {
        console.log("response", response.data);

        const results = response.data.data;

        let dashboardBox = response.data.data;

        for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
          if (j === 20) j = 0;
          dashboardBox[i].img = images[j];
        }
        setDashboardsBox(dashboardBox);
        // console.log('result', results)
        setDashboards(dashboardBox);
        // let recent = dashboardBox.slice(-8)
        // setRecentDashboards(recent)

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

  const handleSearchDashboard = (event) => {
    setSearchedDashboard(event.target.value);
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
        setReported(true);
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
                      ) : index === 2 ? (
                        <ScheduleIcon />
                      ) : index === 3 ? (
                        <SaveAsIcon />
                      ) : index === 4 ? (
                        <DeleteForeverIcon />
                      ) : index === 1 ? (
                        <ReportIcon />
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
              display: "flex",
              marginTop: "-100px",
              alignItems: "center",
              // justifyContent: 'space-between',
              width: "95%",
            }}
          >
            <div>
              <h2 style={{ paddingLeft: "100px", marginTop: "20px" }}>
                Favorites
              </h2>
            </div>

            <div
              style={{ width: "38vw", marginLeft: "14%", marginTop: "20px" }}
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

            <Box
              sx={{
                width: "19%",
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
                  // onChange={handleChange1}
                >
                  <MenuItem
                    value={-1}
                    style={{
                      fontSize: "14px",
                      fontFamily: "Trebuchet MS",
                      fontWeight: "500",
                    }}
                  >
                    Select Type
                  </MenuItem>
                  {[
                    {
                      id: 1,
                      name: "Cross Sale Model",
                    },
                    {
                      id: 2,
                      name: "Sale Forecasting Model",
                    },
                  ].map((item, index) => {
                    return (
                      <MenuItem
                        value={index}
                        style={{
                          fontSize: "14px",
                          fontFamily: "Trebuchet MS",
                          fontWeight: "500",
                        }}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>

          {dashboards && dashboards.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "90%",
                marginLeft: "8%",
                // justifyContent: 'space-around'
              }}
            >
              {dashboards &&
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
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      flag == 0 &&
                      history.push({
                        pathname: "/Main_Dashboard/" + global.subscription_id,
                        state: e,
                      })
                    }
                  >
                    <img
                      src={e?.img}
                      style={{
                        resizeMode: "contain",
                        height: "78%",
                        width: "90%",
                        marginTop: "10px",
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
                        borderRadius: "0px 0px 28.1219px 28.1219px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                          width: "100%",
                        }}
                      >
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
                        <div style={{ width: "8%" }}>
                          <MoreVertIcon
                            style={{
                              marginRight: "5%",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => {
                              setData2(e);
                              setDashboardId(e.id);
                              setDashData(e.data);
                              setDashboardTitle(e.name);
                              flag = 1;
                            }}
                            onMouseLeave={() => {
                              flag = 0;
                            }}
                            onClick={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : dashboards === undefined ? (
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
              No Favourite ML Dashboards
            </div>
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
                      marginLeft: 20,
                      marginTop: 25,
                      fontSize: 16,
                      fontFamily: "Trebuchet MS",
                      fontWeight: 500,
                    }}
                  >
                    Are you sure you want to delete this dashboard? This action
                    cannot be undone.
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
                          setDeleteModal(false);
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
            open={run}
            onClose={() => setRun(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalstyle2}>
              <>
                <CloseIcon
                  onClick={() => setRun(false)}
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
                        setRun(false);
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
                        setRun(false);
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
                      Schedule run
                    </Button>
                  </div>
                </div>
              </>
            </Box>
          </Modal>

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
                        setIsSaveDashboard(false);
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
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default MyMLDashboards;
