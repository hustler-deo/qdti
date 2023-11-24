import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Animate } from "../Components/lib";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Tooltip2 from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const gaugedata1 = [{ value: 20 }, { value: 80 }];
const gaugedata2 = [{ value: 10 }, { value: 90 }];
const gaugedata3 = [{ value: 60 }, { value: 40 }];

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import MiniDrawer from "../MiniDrawer";

import { AuthContext } from "../context";
import configData from "../config.json";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TablePagination from "@mui/material/TablePagination";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

import AddIcon from "@mui/icons-material/Add";

const saveDashModalstyle = {
  position: "relative",
  top: "10%",
  left: "20%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height: 470,
  width: "60vw",
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
};

let images = [];
export default function PrimaryDashboard() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const SvgImage = ({ cx, cy }) => {
    return (
      <svg
        x={cx - 10}
        y={cy - 30}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="40px"
        height="40px"
        // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      >
        <g>
          <path
            // style="opacity:1"
            fill="#fdfcfe"
            d="M -0.5,-0.5 C 16.8333,1000 34.1667,-0.5 51.5,-0.5C 51.5,16.8333 51.5,34.1667 51.5,51.5C 34.1667,51.5 16.8333,51.5 -0.5,51.5C -0.5,34.1667 -0.5,16.8333 -0.5,-0.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#8887fa"
            d="M 14.5,32.5 C 14.0508,26.6415 14.7175,20.9748 16.5,15.5C 16.6107,14.8826 16.944,14.3826 17.5,14C 22.8333,13.3333 29.4667,13.8333 33.6,14C 34.3279,14.9147 36.3279,15.5814 36.5,16C 37.4389,21.4162 37.8056,26.9162 37,32.5C 36.5,34.3333 35.3333,35.5 33.5,36C 28.1667,36.6667 22.8333,36.6667 17.5,36C 15.5743,35.5776 14.5743,34.4109 14.5,32.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#9191eb"
            d="M 16.5,15.5 C 14.7175,20.9748 14.0508,26.6415 14.5,32.5C 13.3503,27.6842 13.1837,22.6842 14,17.5C 14.4169,16.244 15.2502,15.5774 16.5,15.5 Z"
          />
        </g>
      </svg>
    );
  };
  const SvgImage2 = ({ cx, cy }) => {
    return (
      <svg
        x={cx - 10}
        y={cy - 40}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="40px"
        height="40px"
        // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      >
        <g>
          <path
            // style="opacity:1"
            fill="#0BAFFF"
            d="M -0.5,-0.5 C 16.8333,1000 34.1667,-0.5 51.5,-0.5C 51.5,16.8333 51.5,34.1667 51.5,51.5C 34.1667,51.5 16.8333,51.5 -0.5,51.5C -0.5,34.1667 -0.5,16.8333 -0.5,-0.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#0BAFFF"
            d="M 14.5,32.5 C 14.0508,26.6415 14.7175,20.9748 16.5,15.5C 16.6107,14.8826 16.944,14.3826 17.5,14C 22.8333,13.3333 29.4667,13.8333 33.6,14C 34.3279,14.9147 36.3279,15.5814 36.5,16C 37.4389,21.4162 37.8056,26.9162 37,32.5C 36.5,34.3333 35.3333,35.5 33.5,36C 28.1667,36.6667 22.8333,36.6667 17.5,36C 15.5743,35.5776 14.5743,34.4109 14.5,32.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#0BAFFF"
            d="M 16.5,15.5 C 14.7175,20.9748 14.0508,26.6415 14.5,32.5C 13.3503,27.6842 13.1837,22.6842 14,17.5C 14.4169,16.244 15.2502,15.5774 16.5,15.5 Z"
          />
        </g>
      </svg>
    );
  };
  const SvgImage3 = ({ cx, cy }) => {
    return (
      <svg
        x={cx - 10}
        y={cy - 40}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="40px"
        height="40px"
        // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      >
        <g>
          <path
            // style="opacity:1"
            fill="#0D4669"
            d="M -0.5,-0.5 C 16.8333,1000 34.1667,-0.5 51.5,-0.5C 51.5,16.8333 51.5,34.1667 51.5,51.5C 34.1667,51.5 16.8333,51.5 -0.5,51.5C -0.5,34.1667 -0.5,16.8333 -0.5,-0.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#0D4669"
            d="M 14.5,32.5 C 14.0508,26.6415 14.7175,20.9748 16.5,15.5C 16.6107,14.8826 16.944,14.3826 17.5,14C 22.8333,13.3333 29.4667,13.8333 33.6,14C 34.3279,14.9147 36.3279,15.5814 36.5,16C 37.4389,21.4162 37.8056,26.9162 37,32.5C 36.5,34.3333 35.3333,35.5 33.5,36C 28.1667,36.6667 22.8333,36.6667 17.5,36C 15.5743,35.5776 14.5743,34.4109 14.5,32.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#0D4669"
            d="M 16.5,15.5 C 14.7175,20.9748 14.0508,26.6415 14.5,32.5C 13.3503,27.6842 13.1837,22.6842 14,17.5C 14.4169,16.244 15.2502,15.5774 16.5,15.5 Z"
          />
        </g>
      </svg>
    );
  };
  const SvgImage4 = ({ cx, cy }) => {
    return (
      <svg
        x={cx - 10}
        y={cy - 40}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="40px"
        height="40px"
        // style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
      >
        <g>
          <path
            // style="opacity:1"
            fill="#C1D9EC"
            d="M -0.5,-0.5 C 16.8333,1000 34.1667,-0.5 51.5,-0.5C 51.5,16.8333 51.5,34.1667 51.5,51.5C 34.1667,51.5 16.8333,51.5 -0.5,51.5C -0.5,34.1667 -0.5,16.8333 -0.5,-0.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#C1D9EC"
            d="M 14.5,32.5 C 14.0508,26.6415 14.7175,20.9748 16.5,15.5C 16.6107,14.8826 16.944,14.3826 17.5,14C 22.8333,13.3333 29.4667,13.8333 33.6,14C 34.3279,14.9147 36.3279,15.5814 36.5,16C 37.4389,21.4162 37.8056,26.9162 37,32.5C 36.5,34.3333 35.3333,35.5 33.5,36C 28.1667,36.6667 22.8333,36.6667 17.5,36C 15.5743,35.5776 14.5743,34.4109 14.5,32.5 Z"
          />
        </g>
        <g>
          <path
            // style="opacity:1"
            fill="#C1D9EC"
            d="M 16.5,15.5 C 14.7175,20.9748 14.0508,26.6415 14.5,32.5C 13.3503,27.6842 13.1837,22.6842 14,17.5C 14.4169,16.244 15.2502,15.5774 16.5,15.5 Z"
          />
        </g>
      </svg>
    );
  };
  const CustomizedDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    return <SvgImage cx={cx} cy={cy} />;
  };

  const CustomizedDot2 = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    return <SvgImage2 cx={cx} cy={cy} />;
  };
  const CustomizedDot3 = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    return <SvgImage3 cx={cx} cy={cy} />;
  };

  const CustomizedDot4 = (props) => {
    const { cx, cy, stroke, payload, value } = props;

    return <SvgImage4 cx={cx} cy={cy} />;
  };

  const headCells = [
    { id: 1, name: "Scheduled Dashboard" },
    { id: 2, name: "Description" },
    { id: 3, name: "Scheduled Date" },
    { id: 4, name: "Scheduled Time" },
    { id: 5, name: "Status" },
    // { id: 5, name: "Actions" },
  ];

  const [flowsData, setFlowsData] = useState([0, 1, 2, 3, 4]);

  const [flowsCount, setFlowsCount] = useState(0);
  const [rows, setRows] = useState(0);
  const [visualizations, setVisualizations] = useState(0);
  const [users, setUsers] = useState(0);
  const [datePicker, setDatePicker] = useState(false);

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [account_id, setAccount_id] = useState(
    localStorage.getItem("account_id")
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dashboards, setDashboards] = useState();
  const [scheduleddashboards, setScheduledDashboards] = useState();
  const [favouriteDashboards, setFavouriteDashboards] = useState();

  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hoverId, setHoverId] = useState();

  const [auto, setAuto] = useState();
  const [deep, setDeep] = useState();
  const [ml, setMl] = useState();

  const [auto2, setAuto2] = useState();
  const [deep2, setDeep2] = useState();
  const [ml2, setMl2] = useState();

  const [allDash, setAllDash] = useState();

  const [dash, setDash] = useState();
  const [widgets, setWidgets] = useState();
  const [graphData, setGraphData] = useState();

  const [dataConnectors, setDataConnectors] = useState();

  const [scheduledList, setScheduledList] = useState([]);

  const { id } = useParams();
  const { subscription_id } = useParams();

  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getData();
    getParameters();
    getTotalDashboards();
    getAllDashboards();
    getScheduled();
    getGraphData();
    global.subscription_id = subscription_id;
    console.log("subscription_id?", global.subscription_id, subscription_id);
    localStorage.setItem("account_id", id);
  }, []);

  const handleReset = () => {
    getData();
    getParameters();
    getTotalDashboards();
    getAllDashboards();
    getScheduled();
    getGraphData();
  };
  useEffect(() => {
    // console.log("DATES>", value, value2);
    if (value === null && value2 === null) handleReset();
  }, [value, value2]);

  function getData() {
    authContext.login(id);
    axios
      .get(configData.API_URL + "personalAccount/users/retriveMyFlows?id=" + id)
      .then((response) => {
        // console.log(
        //   "I am in the response of response data -------------" +
        //     response.data.data.length
        // );
        setFlowsCount(response?.data?.data?.length);
        setRows(response?.data?.data?.length * 100);
        setVisualizations(response?.data?.data?.length * 3);
        setUsers(1);
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
  }

  const getAllDashboards = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_viewall",
        {
          account_id: localStorage.getItem("account_id")?.toString(),
        },

        {}
      )
      .then((response) => {
        console.log("dashboard_viewall response", response?.data?.data);
        let dashboardBox = response?.data?.data;

        for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
          if (j === 20) j = 0;
          dashboardBox[i].img = images[j];
        }

        console.log("heee", dashboardBox);
        setDashboards(dashboardBox);
        let tempDashboards = dashboardBox?.filter((e, i) => e.isFavorite === 1);
        setFavouriteDashboards(tempDashboards);

        let scheduled = dashboardBox.filter((item) => {
          return (
            item?.is_scheduled == 0 &&
            item?.scheduled_date &&
            item?.scheduled_time
          );
        });
        console.log("heee scheduled?", scheduled);
        setScheduledDashboards(scheduled);

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

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              style={
                headCell.id == 5
                  ? {
                      backgroundColor: "#0BAFFF",
                      color: "white",
                    }
                  : {
                      backgroundColor: "#C1D9EC",
                      fontFamily: "Trebuchet MS",
                    }
              }
              align="left"
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                style={
                  headCell.id == 1
                    ? { marginLeft: 20, fontFamily: "Trebuchet MS" }
                    : headCell.id == 2
                    ? { marginLeft: 40, fontFamily: "Trebuchet MS" }
                    : headCell.id == 5
                    ? { marginLeft: "32%", fontFamily: "Trebuchet MS" }
                    : headCell.id == 4
                    ? { marginLeft: 40, fontFamily: "Trebuchet MS" }
                    : { marginLeft: 10, fontFamily: "Trebuchet MS" }
                }
                align={headCell.id == 5 ? "right" : "left"}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.name}
                {orderBy === headCell.id ? (
                  <Box component="span">{order === "desc" ? "" : ""}</Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 1) {
      if (b.name < a.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 2) {
      if (b.name < a.description) {
        return -1;
      }
      if (b.name > a.description) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 3) {
      if (b.created_at < a.created_at) {
        return -1;
      }
      if (b.created_at > a.created_at) {
        return 1;
      }
      return -1;
    }
    if (orderBy === 4) {
      if (b.updated_at < a.updated_at) {
        return -1;
      }
      if (b.updated_at > a.updated_at) {
        return 1;
      }
      return -1;
    }
  };
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getParameters = () => {
    let d1 = value?._d.toJSON();
    let d2 = value2?._d.toJSON();

    axios
      .post(
        configData.API_URL +
          "personalAccount/dashboard/getMainDashboardParameters",
        {
          account_id: localStorage.getItem("account_id")?.toString(),
          startDate: d1 ? moment(d1).format("DD-MM-YYYY") : "",
          endDate: d2 ? moment(d2).format("DD-MM-YYYY") : "",
        },

        {}
      )
      .then((response) => {
        console.log(
          "getMainDashboardParameters response",
          response?.data?.data
        );
        let data = response?.data?.data;
        setAuto(data.AutoDashboardsCount);
        setDeep(data.DeepADashboardsCount);
        setMl(data.MlDashboardsCount);
        setDash(data.dashboardsCount);
        setWidgets(data.widgetsCount);

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

  const getTotalDashboards = () => {
    // let d1 = value?._d.toJSON()
    // let d2 = value2?._d.toJSON()
    axios
      .post(
        configData.API_URL +
          "personalAccount/dashboard/getMainDashboardTotalDashboards",
        {
          account_id: localStorage.getItem("account_id")?.toString(),
          // startDate: d1 ? moment(d1).format('DD-MM-YYYY') : '',
          // endDate: d2 ? moment(d2).format('DD-MM-YYYY') : ''
        },

        {}
      )
      .then((response) => {
        console.log("getMainDashboardTotalDashboards response", response?.data);
        setDataConnectors(response?.data?.data);
        // let data = response?.data?.data;

        // setAuto2(data.AutoDashboardsCount);
        // setDeep2(data.DeepADashboardsCount);
        // setMl2(data.MlDashboardsCount);
        // setAllDash(data.AllDashboardsCount);
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

  const getScheduled = () => {
    let d1 = value?._d.toJSON();
    let d2 = value2?._d.toJSON();
    axios
      .post(
        configData.API_URL +
          "personalAccount/dashboard/getMainDashboardScheduledList",
        {
          account_id: localStorage.getItem("account_id")?.toString(),
          startDate: d1 ? moment(d1).format("DD-MM-YYYY") : "",
          endDate: d2 ? moment(d2).format("DD-MM-YYYY") : "",
        },

        {}
      )
      .then((response) => {
        console.log("getScheduled response", response?.data?.data);
        setScheduledList(response?.data?.data);

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

  const getGraphData = () => {
    let d1 = value?._d.toJSON();
    let d2 = value2?._d.toJSON();
    axios
      .post(
        configData.API_URL +
          "personalAccount/dashboard/getMainDashboardGraphData",
        {
          account_id: localStorage.getItem("account_id")?.toString(),
          startDate: d1 ? moment(d1).format("DD-MM-YYYY") : "",
          endDate: d2 ? moment(d2).format("DD-MM-YYYY") : "",
        },

        {}
      )
      .then((response) => {
        console.log("getGraphData response", response?.data?.data);
        setGraphData(response?.data?.data);
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

  const handleRequestSort = (event, property) => {
    // console.log('Insort....', property)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <>
      {/* {authContext.isLoggedIn && ( */}
      <>
        <MiniDrawer appBar={true} />
        <Animate type="pop">
          {
            /* <img
              src={"/dashboardImage.png"}
              style={{
                marginLeft: "2%",
                marginTop: "-6%",
                height: "145vh",
                width: "auto",
              }}
            /> */
            <div
              style={{
                width: "90vw",
                height: "100vh",
                // background: "red",
                marginTop: "-10vh",
                marginLeft: "8%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginTop: "10px",
                  width: "30%",
                  // background: "yellow",
                  height: "80vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // marginTop: "30px",
                  }}
                >
                  <img
                    src={"/smallBox.png"}
                    style={{
                      marginLeft: "2%",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                  <div
                    style={{
                      marginLeft: "2%",
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      fontSize: "22px",
                      textAlign: "left",
                    }}
                  >
                    Dashboard
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "30px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      fontSize: "16px",
                      color: "#0D4669",
                      textAlign: "left",
                      marginLeft: "20px",
                    }}
                  >
                    Favorite Dashboards
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                      marginLeft: "10px",
                      marginTop: "1px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "62px",
                        width: "20vw",
                        overflow: "auto",
                      }}
                    >
                      {favouriteDashboards &&
                        favouriteDashboards.map((item, index) => {
                          return (
                            <div
                              style={{
                                marginRight: "10px",
                                minHeight: "50px",
                                minWidth: "55px",
                                maxHeight: "50px",
                                maxWidth: "55px",
                                borderRadius: "8px",
                                backgroundColor:
                                  hover2 && hoverId === item?.id
                                    ? "#067AB4"
                                    : "#0BAFFF",
                                fontSize: "8px",
                                cursor: "pointer",
                                padding: "5px",
                                color: "white",
                                overflow: "auto",
                                flexWrap: "wrap",
                                boxShadow: "1px 1.8px 2.5px  #707070",
                              }}
                              onMouseEnter={() => {
                                setHover2(true);
                                setHoverId(item?.id);
                              }}
                              onMouseLeave={() => setHover2(false)}
                              onClick={() =>
                                history.push({
                                  pathname:
                                    "/Main_Dashboard/" + global.subscription_id,
                                  state: item,
                                })
                              }
                            >
                              {item?.name}
                            </div>
                          );
                        })}
                    </div>
                    {dashboards && (
                      <Tooltip2
                        title="Create New Dashboard"
                        placement="top-end"
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              border: "0.5px solid #C1D9EC",
                              cursor: "pointer",
                              backgroundColor: hover1 ? "#067AB4" : "white",
                              transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                            onClick={() =>
                              history.push(
                                "/Main_Dashboard/" + global.subscription_id
                              )
                            }
                          >
                            <AddIcon
                              sx={{ color: hover1 ? "white" : "black" }}
                            />
                          </div>
                        </div>
                      </Tooltip2>
                    )}

                    <div
                      style={{
                        marginLeft: "-6px",
                        height: "90px",
                        width: "1px",
                        backgroundColor: "#C1D9EC",
                        alignSelf: "flex-end",
                      }}
                    ></div>
                  </div>
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30px",
                    width: "90%",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      fontSize: "16px",
                      color: "#C1D9EC",
                      textAlign: "left",
                    }}
                  >
                    Total Dashboards
                  </div>

                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      fontSize: "20px",
                      textAlign: "left",
                    }}
                  >
                    {allDash}
                  </div>
                </div>

                <div
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    width: "80%",
                    height: "1px",
                    backgroundColor: "#C1D9EC",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "100%", marginLeft: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            backgroundColor: "lightgray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                          }}
                        >
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {auto2}
                          </div>
                        </div>
                        <div style={{ marginLeft: "12px", minWidth: "80px" }}>
                          Auto Dashboards
                        </div>
                      </div>
                      <div style={{ minWidth: "60px" }}>{auto2}</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            backgroundColor: "lightgray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                          }}
                        >
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {deep2}
                          </div>
                        </div>
                        <div style={{ marginLeft: "12px", minWidth: "80px" }}>
                          Deep Dashboards
                        </div>
                      </div>
                      <div style={{ minWidth: "60px" }}>{deep2}</div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "60px",
                            width: "60px",
                            backgroundColor: "lightgray",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "16px",
                          }}
                        >
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {ml2}
                          </div>
                        </div>
                        <div style={{ marginLeft: "12px", minWidth: "80px" }}>
                          ML Dashboards
                        </div>
                      </div>
                      <div style={{ minWidth: "60px" }}>{ml2}</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "-40px",
                      marginLeft: "70px",
                      height: "45vh",
                      width: "1.2px",
                      backgroundColor: "#C1D9EC",
                    }}
                  ></div>
                </div> */}

                <div
                  style={{
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "16px",
                    color: "#0D4669",
                    textAlign: "left",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                >
                  Data Connectors
                </div>

                {/* <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      fontSize: "20px",
                      textAlign: "left",
                    }}
                  >
                    {allDash}
                  </div> */}

                <div
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                    width: "80%",
                    height: "1px",
                    backgroundColor: "#C1D9EC",
                  }}
                ></div>
                {dataConnectors && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "58vh",
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        paddingTop: "8px",
                      }}
                    >
                      {dataConnectors &&
                        dataConnectors?.map((item) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                height: "70px",
                                marginTop: "10px",
                              }}
                            >
                              <div
                                style={{ width: "100%", paddingLeft: "20px" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Badge
                                      badgeContent={
                                        item?.count ? item?.count : 0
                                      }
                                      color="primary"
                                    >
                                      <div
                                        style={{
                                          height: "60px",
                                          width: "60px",
                                          border: "2px solid #C1D9EC",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          borderRadius: "14px",
                                        }}
                                      >
                                        <img
                                          src={
                                            "http://44.241.186.53:4141" +
                                            item?.image_link
                                          }
                                          style={{
                                            // marginBottom: 10,
                                            // marginRight: 10,
                                            float: "left",
                                            height: "40px",
                                            width: "auto",
                                          }}
                                        />
                                      </div>
                                    </Badge>

                                    <div
                                      style={{
                                        marginLeft: "16px",
                                        minWidth: "80px",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {item?.title}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    <div
                      style={{
                        marginTop: "-40px",
                        // marginLeft: "70px",
                        height: "45vh",
                        width: "1.2px",
                        backgroundColor: "#C1D9EC",
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {/* <div
                          style={{
                            marginTop: "-40px",
                            marginLeft: "70px",
                            height: "45vh",
                            width: "1.2px",
                            backgroundColor: "#C1D9EC",
                          }}
                        ></div> */}

              <div
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "80vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "40px",
                      width:
                        value === null && value2 === null ? "200px" : "260px",
                      background: "black",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      // marginTop: "30px",
                      alignSelf: "flex-end",
                      marginRight: "40px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => setDatePicker(true)}
                  >
                    <CalendarMonthIcon
                      sx={{ color: "lightgray" }}
                      fontSize="medium"
                    />
                    <div
                      style={{
                        fontWeight: "500",
                        fontFamily: "Trebuchet MS",
                        fontSize: "15px",
                        color: "white",
                      }}
                    >
                      {value != null
                        ? moment(value?._d.toJSON()).format("DD-MM-YYYY")
                        : ""}{" "}
                      {value != null && "To"}{" "}
                      {value2 != null
                        ? moment(value2?._d.toJSON()).format("DD-MM-YYYY")
                        : ""}
                      {value === null && value2 === null && "Select Date"}
                    </div>
                  </div>
                  <div
                    style={{
                      height: "40px",
                      width: "62px",
                      background: "black",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "flex-end",
                      marginRight: "50px",
                      padding: "10px",
                      cursor: "pointer",
                      color: "white",
                    }}
                    onClick={() => {
                      setValue(null);
                      setValue2(null);
                    }}
                  >
                    Reset
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "25px",
                    marginLeft: "20px",
                    minHeight: "130px",
                    width: "60vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      width: "14%",
                      height: "100%",
                      background: "#C1D9EC",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: 6,
                      boxShadow: "2px 4.80467px 5.6729px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#067AB4",
                        fontWeight: "600",
                      }}
                    >
                      Report RunTime
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "25px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        3.5
                      </div>
                      <div
                        style={{
                          fontSize: "25px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        Hour
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "14%",
                      height: "100%",
                      background: "#C1D9EC",
                      display: "flex",
                      justifyContent: "space-around",
                      flexDirection: "column",
                      borderRadius: 6,
                      boxShadow: "2px 4.80467px 5.6729px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div style={{ height: "45%", marginTop: 10 }}>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#067AB4",
                          fontWeight: "600",
                        }}
                      >
                        CPU Audit Number
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        1
                      </div>
                    </div>

                    <div style={{ height: "55%" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#067AB4",
                          fontWeight: "600",
                        }}
                      >
                        Total Memory
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        1000 MiB
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "21%",
                      height: "100%",
                      background: "#C1D9EC",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 6,
                      boxShadow: "2px 4.80467px 5.6729px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        position: "relative",
                        top: "35px",
                        color: "#067AB4",
                        fontWeight: "600",
                      }}
                    >
                      CPU Usage rate
                    </div>
                    <div
                      style={{
                        position: "relative",
                        top: "10px",
                      }}
                    >
                      <PieChart height={130} width={150}>
                        <Pie
                          startAngle={180}
                          endAngle={0}
                          innerRadius="55%"
                          data={gaugedata1}
                          dataKey="value"
                          labelLine={false}
                          blendStroke
                          isAnimationActive={true}
                          cy={"75%"}
                        >
                          <Cell fill="#067AB4" />
                          <Cell fill="white" />
                        </Pie>
                      </PieChart>
                      <div
                        style={{
                          top: -55,
                          position: "relative",
                          textAlign: "center",
                          fontSize: "16.4px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        11.60%
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "21%",
                      height: "100%",
                      background: "#C1D9EC",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 6,
                      boxShadow: "2px 4.80467px 5.6729px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        position: "relative",
                        top: "35px",
                        color: "#067AB4",
                        fontWeight: "600",
                      }}
                    >
                      CPU I/O time
                    </div>
                    <div
                      style={{
                        position: "relative",
                        top: "10px",
                      }}
                    >
                      <PieChart height={130} width={150}>
                        <Pie
                          startAngle={180}
                          endAngle={0}
                          innerRadius="55%"
                          data={gaugedata2}
                          dataKey="value"
                          labelLine={false}
                          blendStroke
                          isAnimationActive={true}
                          cy={"75%"}
                        >
                          <Cell fill="#067AB4" />
                          <Cell fill="white" />
                        </Pie>
                      </PieChart>
                      <div
                        style={{
                          top: -55,
                          position: "relative",
                          textAlign: "center",
                          fontSize: "18px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        0.07%
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "21%",
                      height: "100%",
                      background: "#C1D9EC",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                      borderRadius: 6,
                      boxShadow: "2px 4.80467px 5.6729px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        position: "relative",
                        top: "35px",
                        color: "#067AB4",
                        fontWeight: "600",
                      }}
                    >
                      Memory Usage
                    </div>
                    <div
                      style={{
                        position: "relative",
                        top: "10px",
                      }}
                    >
                      <PieChart height={130} width={150}>
                        <Pie
                          startAngle={180}
                          endAngle={0}
                          innerRadius="55%"
                          data={gaugedata3}
                          dataKey="value"
                          labelLine={false}
                          blendStroke
                          isAnimationActive={true}
                          cy={"75%"}
                        >
                          <Cell fill="#067AB4" />
                          <Cell fill="white" />
                        </Pie>
                      </PieChart>
                      <div
                        style={{
                          top: -55,
                          position: "relative",
                          textAlign: "center",
                          fontSize: "18px",
                          color: "#0D4669",
                          fontWeight: "600",
                        }}
                      >
                        60%
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "90%",
                    height: "90px",
                    alignSelf: "center",
                    marginTop: "30px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "16px",
                        color: "#0BAFFF",
                      }}
                    >
                      Auto Dashboards
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "22px",
                        marginTop: "10px",
                      }}
                    >
                      {auto}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "16px",
                        color: "#0BAFFF",
                      }}
                    >
                      Deep Dashboards
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "22px",
                        marginTop: "10px",
                      }}
                    >
                      {deep}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "16px",
                        color: "#0BAFFF",
                      }}
                    >
                      ML Dashboards
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "22px",
                        marginTop: "10px",
                      }}
                    >
                      {ml}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "16px",
                        color: "#0BAFFF",
                      }}
                    >
                      Dashboards
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "22px",
                        marginTop: "10px",
                      }}
                    >
                      {dash}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "16px",
                        color: "#0BAFFF",
                      }}
                    >
                      Widgets
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        fontSize: "22px",
                        marginTop: "10px",
                      }}
                    >
                      {widgets}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    minHeight: "40vh",
                    maxHeight: "40vh",
                    width: "60vw",
                    marginTop: "45px",
                    marginLeft: "10px",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      // width={1000}
                      // height={1000}
                      data={graphData}
                      margin={{
                        top: -10,
                        right: 30,
                        left: 20,
                        bottom: 56,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        style={{ marginTop: 10, marginBottom: 10 }}
                        dataKey="name"
                        axisLine={false}
                        angle={-38}
                        textAnchor="end" // Align the labels to the end of the tick
                        tick={{ fontSize: 8 }} // Adjust the font size as needed
                        // orientation="top"
                      />
                      <YAxis axisLine={false} />
                      <Tooltip />
                      <Legend
                        verticalAlign="top"
                        wrapperStyle={{
                          marginTop: "-15px",
                          marginLeft: "30px",
                          // Adjust the marginTop to control the legend's position
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="allDashboards"
                        stroke="#8884d8"
                        dot={<CustomizedDot />}
                      />
                      <Line
                        type="monotone"
                        dataKey="mlDashboard"
                        stroke="#0BAFFF"
                        dot={<CustomizedDot2 />}
                      />
                      <Line
                        type="monotone"
                        dataKey="deepADashboard"
                        stroke="#0D4669"
                        dot={<CustomizedDot3 />}
                      />

                      <Line
                        type="monotone"
                        dataKey="autoDashboard"
                        stroke="#C1D9EC"
                        dot={<CustomizedDot4 />}
                      />
                      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          }
        </Animate>

        <TableContainer
          component={Paper}
          style={{
            width: "88%",
            marginLeft: "9%",
            marginTop: "70px",
            // height: "35vh",
            border: "0.07px solid #ccc",
          }}
        >
          <Table
            sx={{ minHeight: 150, minWidth: 600 }}
            size="small"
            aria-label="a dense table"
            stickyHeader
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={scheduledList?.length}
            />
            <TableBody>
              {stableSort(
                rowsPerPage > 0
                  ? scheduledList?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : scheduledList,
                getComparator(order, orderBy)
              )?.map((row, index) => (
                <TableRow
                  hover
                  // role="checkbox"
                  key={row.id}
                  // style={{
                  //   cursor: "pointer",
                  // }}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    style={{
                      height: 42,
                      width: 250,
                      maxWidth: 250,
                      overflowX: "auto",
                    }}
                    component="th"
                    scope="row"
                    padding="normal"
                  >
                    {/* <div
                      style={{
                        marginTop: 25,
                      }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          marginTop: -12,
                        }}
                      >
                        <Checkbox
                              color='primary'
                              style={{ alignSelf: 'center' }}
                            />
                      </div>
                    </div> */}

                    <div
                      style={{
                        marginLeft: 20,
                        width: 140,
                        overflow: "auto",
                      }}
                    >
                      {row?.name}
                    </div>
                  </TableCell>

                  <TableCell
                    style={{
                      maxWidth: 300,
                      paddingLeft: 40,
                      overflow: "auto",
                    }}
                    align="left"
                  >
                    {row?.description}
                  </TableCell>

                  <TableCell align="left" style={{ paddingLeft: 25 }}>
                    {row?.scheduled_date}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      paddingLeft: 55,
                      // maxWidth: 200,
                      // marginLeft: 260,
                      overflow: "auto",
                    }}
                  >
                    {row?.scheduled_time}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      // paddingLeft: 40,
                      cursor: "pointer",
                      color: row?.is_scheduled === "1" ? "#0BAFFF" : "black",
                      fontWeight: row?.is_scheduled === "1" ? "600" : "500",
                      background: "#C1D9EC80",
                      "&:hover, &:focus": {
                        backgroundColor: "#067AB4",
                        color: "white",
                      },
                      // textDecoration: "underline",
                    }}
                    onClick={() => {
                      console.log("clicked ready");
                      history.push({
                        pathname: "/Main_Dashboard/" + global.subscription_id,
                        state: row?.data,
                      });
                    }}
                  >
                    {row?.is_scheduled === "1" ? "Ready" : "Not Ready"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePagination
          style={{
            paddingRight: "40px",
          }}
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={scheduledList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

        {datePicker && (
          <Modal
            open={datePicker}
            onClose={() => {
              setDatePicker(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={saveDashModalstyle}>
              <>
                <CloseIcon
                  onClick={() => {
                    setDatePicker(false);
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
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                    marginTop: "30px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        marginBottom: 8,
                        fontWeight: "700",
                        fontFamily: "Trebuchet MS",
                        marginLeft: "20px",
                        color: "#0D4669",
                      }}
                    >
                      From
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={["DateCalendar"]}>
                          <DemoItem label="">
                            <DateCalendar
                              value={value}
                              onChange={(newValue) => setValue(newValue)}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        marginBottom: 8,
                        fontWeight: "700",
                        fontFamily: "Trebuchet MS",
                        marginLeft: "20px",
                        color: "#0D4669",
                      }}
                    >
                      To
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={["DateCalendar"]}>
                          <DemoItem label="">
                            <DateCalendar
                              value={value2}
                              onChange={(newValue) => setValue2(newValue)}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#0aafff",
                    padding: 7,
                    color: "white",
                    boxShadow:
                      "0px 8.90323px 17.8065px rgba(44, 39, 56, 0.078))",
                    fontSize: "14px",
                    borderRadius: "11px",
                    width: "80px",
                    cursor: "pointer",
                    marginRight: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                  }}
                  onClick={() => {
                    getParameters();
                    getTotalDashboards();
                    getAllDashboards();
                    getScheduled();
                    getGraphData();
                    setDatePicker(false);
                  }}
                >
                  Save
                </div>
              </>
            </Box>
          </Modal>
        )}
      </>
      {/* )} */}
    </>
  );
}
