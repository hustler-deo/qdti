import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import configData from "../config.json";
import Checkbox from "@mui/material/Checkbox";
import MiniDrawer from "../MiniDrawer";
import moment from "moment";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import { AuthContext } from "../context";

const headCells = [
  { id: 1, name: "Batch Name" },
  { id: 2, name: "Description" },
  { id: 3, name: "Created Date" },
  { id: 4, name: "Execution Time" },
  { id: 5, name: "Actions" },
];

const EnhancedTableHead = (props) => {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow role="checkbox">
        {headCells.map((headCell) => (
          <TableCell
            style={
              headCell.id == 5
                ? { backgroundColor: "#0BAFFF", color: "white" }
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
                  ? { marginLeft: 60, fontFamily: "Trebuchet MS" }
                  : headCell.id == 2
                  ? { marginLeft: 20, fontFamily: "Trebuchet MS" }
                  : headCell.id == 5
                  ? { marginLeft: "40%", fontFamily: "Trebuchet MS" }
                  : headCell.id == 4
                  ? { marginLeft: 30, fontFamily: "Trebuchet MS" }
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

export default function Batches() {
  const [flowsData, setFlowsData] = useState([]);
  const [flowsDataTemp, setFlowsDataTemp] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [searched, setSearched] = useState("");
  const [account_id, setAccount_id] = useState(
    localStorage.getItem("account_id")
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const requestSearch = (event) => {
    // console.log('searched!', event.target.value)
    setSearched(event.target.value);
    if (event.target.value === "") getData();

    var filteredRows = flowsDataTemp.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setFlowsData(filteredRows);
  };

  useEffect(() => {
    console.log(localStorage.getItem("account_id"));
    getData();
    localStorage.setItem("CLEAR", 1);
  }, []);

  const handleRequestSort = (event, property) => {
    // console.log('Insort....', property)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getData = () => {
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/retriveMyFlows?id=" +
          account_id
      )
      .then((response) => {
        console.log(response.data);
        setFlowsDataTemp(response.data.data);
        setFlowsData(response.data.data);
        // return response.data.data;
        // console.log(
        //   'I am in the response of response data -------------' + response.data
        // )
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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <Fragment>
            <MiniDrawer />
            <div
              style={{
                marginTop: -90,
                justifyContent: "left",
                marginLeft: "120px",
                display: "flex",
              }}
            >
              <div>
                <h2
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  My Data Flows
                </h2>
                <p
                  style={{
                    display: "block",
                    width: "100%",
                    justifyContent: "left",
                    textAlign: "left",
                    fontFamily: "Trebuchet MS",
                  }}
                >
                  All the flows designed and developed by you will be
                  consolidated here for your view.
                </p>
              </div>

              <div>
                <input
                  style={{
                    marginTop: 30,
                    height: 40,
                    border: "0.01px solid grey",
                    backgroundColor: "#F2F1F9",
                    width: "228px",
                    padding: "10px",
                    fontSize: 14,
                    outline: "none",
                    borderRadius: "4px",
                    fontFamily: "Trebuchet MS",
                    paddingLeft: "20px",
                    position: "absolute",
                    right: "5%",
                  }}
                  type="text"
                  placeholder="Search here"
                  onChange={requestSearch}
                  value={searched}
                />
              </div>
            </div>

            <TableContainer
              component={Paper}
              style={{ width: "90%", marginLeft: 100, marginTop: 10 }}
            >
              <Table
                sx={{ minWidth: 650, border: "0.07px solid #ccc" }}
                size="small"
                aria-label="a dense table"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={flowsData.length}
                />
                <TableBody>
                  {stableSort(
                    rowsPerPage > 0
                      ? flowsData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : flowsData,
                    getComparator(order, orderBy)
                  ).map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      key={row.id}
                      style={{ cursor: "pointer" }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        style={{
                          height: 42,
                          width: 250,
                          maxWidth: 250,
                          overflowX: "auto",
                          //  backgroundColor: '#efefef'
                        }}
                        component="th"
                        scope="row"
                        padding="checkbox"
                      >
                        <div
                          style={{
                            marginTop: 25,
                          }}
                        >
                          <div
                            style={{ justifyContent: "center", marginTop: -12 }}
                          >
                            <Checkbox
                              color="primary"
                              style={{ alignSelf: "center" }}
                            />
                          </div>
                        </div>

                        <div
                          style={{
                            marginLeft: 60,
                            marginTop: -34,
                            marginBottom: 12,
                            height: 40,
                            width: 140,
                            overflow: "auto",
                          }}
                        >
                          <Link to={"/dataDashboard/" + row.id}>
                            {row.name}
                          </Link>
                        </div>
                      </TableCell>

                      <TableCell
                        style={{
                          maxWidth: 240,
                          overflow: "auto",
                        }}
                        align="left"
                      >
                        {row.description}
                      </TableCell>

                      <TableCell align="left">
                        {moment.utc(row.created_at).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          maxWidth: 200,
                          overflow: "auto",
                        }}
                      >
                        {row.updated_at != null &&
                          moment(row.updated_at).format("hh:mm A")}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          backgroundColor: "#efefef",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Link to={"/dataDashboard/" + row.id}>
                            {"Analytics Report"}
                          </Link>
                        </div>

                        {/* <div
                          onClick={() => {
                            console.log('I got clicked', row.id)
                            localStorage.setItem('FlowID', row.id)
                          }}
                          style={{
                            left: '90.5%',
                            position: 'absolute',
                            marginTop: -15,
                            maxWidth: 150,
                            overflow: 'auto'
                          }}
                        >
                          <Link
                            to={
                              '/widget Dashboard/new/' + global.subscription_id
                            }
                          >
                            {'Widget'}
                          </Link>
                        </div> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              style={{ paddingRight: "40px" }}
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={flowsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Fragment>
        </>
      ) : (
        history.push("/login")
      )}
    </>
  );
}
