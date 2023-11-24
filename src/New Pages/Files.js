import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory, useParams } from "react-router-dom";

import Modal from "@mui/material/Modal";
import axios from "axios";
import { CSVReader, readString, jsonToCSV } from "react-papaparse";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { ReactGrid, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import Dialog from "@mui/material/Dialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchIcon from "@mui/icons-material/Search";
import CableIcon from "@mui/icons-material/Cable";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import configData from "../config.json";

import bgImg from "../Connector box 3.png";

// Auth context
import { AuthContext } from "../context";

import Box from "@mui/material/Box";

const modalStyle = {
  position: "relative",
  top: "5%",
  left: "6%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  height: "90vh",
  width: "90vw",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  borderRadius: "4px",
};

const Files = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [selectedColumn, setSelectedColumn] = useState(0);
  const [columnsBox, setColumnsBox] = useState();
  const [columnsBox2, setColumnsBox2] = useState();
  const [openModal1, setOpenModal1] = useState(false);
  const [fileData, setFileData] = useState();

  const [csvFiles, setCsvFiles] = useState();
  const [xlFiles, setXlFiles] = useState();
  const [xmlFiles, setXmlFiles] = useState();
  const [jsonFiles, setJsonFiles] = useState();
  const [pdfFiles, setPdfFiles] = useState();
  const [parquetFiles, setParquetFiles] = useState();

  const [noData, setNoData] = useState(false);

  const [searchArr, setSearchArr] = useState();

  const { subscription_id } = useParams();

  const [searchOption, setSearchOption] = useState("");
  const [search, setSearch] = useState(false);

  const [files, setFiles] = useState([]);
  const [allfiles, setAllFiles] = useState([]);
  const [filesBackup, setFilesBackup] = useState([]);

  const [input, setInput] = useState("");
  const [filesByCategory, setFilesByCategory] = useState();
  const [filesByCategoryBackup, setFilesByCategoryBackup] = useState();

  const [databases, setDatabases] = useState([]);
  const [azure, setAzure] = useState([]);
  const [onlineServices, setOnlineServices] = useState([]);
  const [other, setOther] = useState([]);
  const [aws, setAws] = useState([]);
  const [google, setGoogle] = useState([]);

  const [clicked, setClicked] = useState(false);

  const [rowsData, setrowsData] = useState();
  const [columnData, setColumnData] = useState();
  const [searched, setSearched] = useState(false);
  const [value, setValue] = useState(0);

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     getSectionCategories(2);
  //   }, 1000);
  // }, [parquetFiles]);

  const getSectionCategories = (sectionId) => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/sectionwise-category",
        {
          id: sectionId,
        },
        {}
      )
      .then((response) => {
        console.log("sectionWise Category api", response.data);
        // if (sectionId === 2) setFiles(response.data);
        // if (sectionId === 3) setDatabases(response.data);
        // if (sectionId === 4) setAzure(response.data);
        // if (sectionId === 5) setOnlineServices(response.data);
        // if (sectionId === 6) setOther(response.data);
        // if (sectionId === 7) setAws(response.data);
        // if (sectionId === 8) setGoogle(response.data);

        let arr = [];
        for (let i = 0; i < response.data?.length; i++) {
          if (i == 0 && csvFiles?.length > 0) arr.push(response.data[0]);
          if (i === 1 && xlFiles?.length > 0) arr.push(response.data[1]);
          if (i === 2 && xmlFiles?.length > 0) arr.push(response.data[2]);
          if (i === 3 && jsonFiles?.length > 0) arr.push(response.data[3]);
          if (i === 4 && pdfFiles?.length > 0) arr.push(response.data[4]);
          if (i === 5 && parquetFiles?.length > 0) arr.push(response.data[5]);
        }
        console.log("arrrr", arr);
        setFiles(arr);
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

  const getData = () => {
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getMyFiles?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        // console.log("ssss", response.data);
        setFilesBackup(response.data.data);
        console.log("response", response.data.data);
        setAllFiles(response.data.data);
        setFilesByCategory(response.data.data[0]?.list);
        setFilesByCategoryBackup(response.data.data[0]?.list);

        // let filetype = item?.file_link.slice(
        //   item?.file_link.lastIndexOf(".") + 1
        // );
        // const csv = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //     "csv"
        //   );
        // });
        // console.log("CSVS", csv);
        // setCsvFiles(csv);

        // const xl = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xls" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlsx" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlsm" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlsb" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xltx" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xltm" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlt" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlam" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xla" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlw" ||
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //       "xlr"
        //   );
        // });

        // setXlFiles(xl);

        // const pdf = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) == "pdf"
        //   );
        // });
        // console.log("pdfs", pdf);
        // setPdfFiles(pdf);
        // const xml = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) == "xml"
        //   );
        // });
        // console.log("xmls", xml);
        // setXmlFiles(xml);

        // const json = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //     "json"
        //   );
        // });
        // console.log("jsons", json);
        // setJsonFiles(json);
        // const parquet = response.data.data.filter((item) => {
        //   return (
        //     item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
        //     "parquet"
        //   );
        // });
        // console.log("parquets", parquet);
        // setParquetFiles(parquet);
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

  const handleOnFileLoad = (data, fileInfo, originalFile) => {
    console.log("check FileInfo", fileInfo);
    let result;
    let fileInfo1 = fileInfo;
    // setOriginalFile(fileInfo)
    // let filetype = fileInfo.name.substring(
    //   fileInfo.name.length - 4,
    //   fileInfo.name.length
    // )
    let filetype = fileInfo.name.substr(fileInfo.name.indexOf(".") + 1);
    console.log("FileType-", filetype, filetype === "xlsx");

    let typeId =
      filetype === "xls" ||
      filetype === "xlsx" ||
      filetype === "xlsm" ||
      filetype === "xlsb" ||
      filetype === "xltx" ||
      filetype === "xltm" ||
      filetype === "xlt" ||
      filetype === "xlam" ||
      filetype === "xla" ||
      filetype === "xlw" ||
      filetype === "xlr"
        ? 2
        : filetype === "xml"
        ? 3
        : filetype === "json"
        ? 4
        : filetype === "pdf"
        ? 6
        : filetype === "parquet"
        ? 7
        : 1;
    // console.log('FileTypeID-', typeId)
    // setfileimg(typeId)
    global.type_id = typeId;

    // setExpData(false)
    // console.log('----------Data', data)

    var temp = [];
    data.map((e) => {
      var temp1 = [];
      e.data.map((e2) => {
        temp1.push({ value: e2 });
        return e2;
      });
      temp.push(temp1);
      return e;
    });
    // setDt(temp)
    // setData(temp)

    result = data.map((e) => e.data);
    console.log("RESULT>", result);

    if (selectedColumn === 1) {
      min = result[1][1];
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] < min) {
          min = result[i][1];
        }
      }
    } else if (selectedColumn === 2) {
      min = result[1][2];
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] < min) {
          min = result[i][2];
        }
      }
    }

    if (selectedColumn === 1) {
      max = result[1][1];
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] > max) {
          max = result[i][1];
        }
      }
    } else if (selectedColumn === 2) {
      max = result[1][2];
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] > max) {
          max = result[i][2];
        }
      }
    }

    let sum = 0;
    var count = 0;
    var j = selectedColumn;
    var num;

    for (let i = 1; i < result.length; i++) {
      num = parseInt(result[i][j]);
      sum = sum + num;
      count++;
    }
    let avg = sum / count;

    var done = false;

    while (!done) {
      done = true;
      for (let i = 2; i < result.length; i += 1) {
        if (result[i - 1][j] > result[i][j]) {
          done = false;
          var tmp = result[i - 1][j];
          result[i - 1][j] = result[i][j];
          result[i][j] = tmp;
        }
      }
    }

    if (global.type_id === 1) {
      console.log("DATA FORMAT-", result);
      let columns = result.slice(0, 1);
      const C1 = columns[0];
      console.log("columns-typeId1", C1);
      let columns2 = columns[0];
      columns = columns[0];
      setColumnsBox(columns);
      setColumnsBox2(columns);
    }

    setTimeout(() => {
      history.push({
        pathname: "/Widget Dashboard/new_widget/" + global.subscription_id,
        state: result,
      });
    }, 1600);

    // handleNext()
    // setTimeout(() => {
    //   setnewpg1(false)
    // }, 5000)

    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleCloseModal = () => {
    setClicked(false);
    setrowsData();
    setFileData();
    setOpenModal1(false);
  };

  const getFileData = (FlowId) => {
    // console.log('FlowId', FlowId)
    axios
      .post(configData.API_URL + "personalAccount/users/getFinalData", {
        flowId: FlowId,
      })
      .then((response) => {
        let array4 = JSON.parse(response.data.data.data[0].data);
        console.log("IMPdata", array4);
        let columns = array4[0];

        let abc = JSON.parse(response.data.data.data[0].data);
        let def = [],
          ghm = [];
        abc.map((e) => {
          def = [];
          e.map((f) => {
            if (f != null && typeof f != "object") def.push({ value: f });
            else if (f != null && typeof f == "object")
              def.push({ value: Object.values(f) });
          });
          ghm.push(def);
        });
        console.log("ghm Data", ghm);
        setFileData(ghm);

        let dataBox = [];
        ghm.map((e) => {
          let t = [];
          e.map((e2) => {
            t.push(e2.value);
          });

          dataBox.push(t);
        });

        //  console.log('converted Data', dataBox)
        setUpDataForGrid(dataBox);
        setOpenModal1(true);
      })
      .catch((error) => {
        if (error.response) {
          setNoData(true);
          setClicked(false);
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          setNoData(true);
          setClicked(false);
          // The request was made but no response was received
          console.log(error.request);
        } else {
          setNoData(true);
          setClicked(false);
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const setUpDataForGrid = (data) => {
    // console.log('www data',data)
    let columns = data[0];
    let columnsBox = [];
    let cells = [];
    columns?.map((e) => {
      columnsBox.push({
        columnId: e,
        width: 150,
        resizable: true,
        reorderable: true,
      });
      cells.push({
        type: "header",
        text: e,
      });
    });

    setColumnData(columnsBox);

    let rowsBox = [];

    rowsBox.push({
      rowId: "header",
      cells: cells,
    });
    let c = 0;

    let data1 = [...data];
    data1.shift();
    data1.map((e) => {
      let cells1 = [];
      e.map((e2) => {
        cells1.push({
          id: c,
          type: "text",
          text: typeof e2 === "string" ? e2 : e2.toString(),
        });

        // console.log('In ExploreCols', cells1)
      });

      rowsBox.push({
        rowId: c,
        cells: cells1,
      });
      c++;
    });

    console.log("In ExploreCols", rowsBox);
    setrowsData(rowsBox);
  };

  const handleChange = (event, newValue) => {
    console.log("CCC", newValue, allfiles[newValue]?.list);
    setFilesByCategory(allfiles[newValue]?.list);
    setFilesByCategoryBackup(allfiles[newValue]?.list);

    setValue(newValue);
  };

  const handleSearch = (event) => {
    setSearch(true);
    setSearchOption(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    setSearch(false);
  }, [searchOption == ""]);

  useEffect(() => {
    if (input != "") {
      let filteredRows = filesByCategoryBackup?.filter((row) => {
        return row.name.toLowerCase().includes(input.toLowerCase());
      });
      setSearchArr(filteredRows);
    }
    if (input === "") setSearch(false);
  }, [input]);
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div
            style={{
              display: "flex",
              marginTop: "-100px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "95%",
              paddingLeft: "9%",
            }}
          >
            <div>
              <h2 style={{ fontFamily: "Trebuchet MS", marginTop: "20px" }}>
                DATA CONNECTORS
              </h2>
              <div
                style={{
                  fontWeight: "400",
                  marginTop: "-1%",
                  textAlign: "left",
                }}
              >
                Get Insight from your Data
              </div>
            </div>
          </div>

          {/* <div
            style={{
              alignSelf: "center",
              fontWeight: "400",
              color: "rgba(51, 51, 51, 0.7)",
              fontSize: "30px",
            }}
          >
            Connect a Data Source
          </div> */}
          <div
            className="d-flex justify-space-between align-items-center"
            style={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                paddingLeft: "9%",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  marginTop: 5,
                  width: "60vw",
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {allfiles &&
                    allfiles.map((row, index) => (
                      <Tab
                        sx={{ fontSize: "12px" }}
                        label={row?.file_extension}
                      />
                    ))}
                </Tabs>
              </Box>
            </Box>
            <div
              className="d-flex justify-space-between align-items-center"
              style={{
                width: "30vw",
                marginRight: "35px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  margin: "0px auto",
                  width: "100%",
                  top: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder="    Search For Data Source"
                  onChange={handleSearch}
                  style={{
                    width: "100%",
                    background: "white",
                    borderRadius: "50px",
                    border: " 0.7px solid rgba(0, 0, 0, 0.8)",
                    height: "44px",
                    color: "black",
                    fontSize: "15px",
                    paddingLeft: "20px",
                  }}
                />
                {
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
                }
              </div>
            </div>
          </div>
          {/* <div
            style={{
              width: "100%",
              marginTop: "2%",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "32%",
                margin: "0px auto",
                position: "relative",
                zIndex: "54",
              }}
            >
              <input
                type="text"
                placeholder="    Search For Data Source"
                onChange={(event) => setInput(event.target.value)}
                value={input}
                style={{
                  width: "100%",
                  background: "white",
                  borderRadius: "50px",
                  border: " 0.7px solid rgba(0, 0, 0, 0.8)",
                  height: "50px",
                  color: "black",
                  fontSize: "15px",
                  paddingLeft: "20px",
                  top: "20px",
                  position: "relative",
                }}
              />
              <span
                class="icon"
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "28px",
                }}
              >
                <SearchIcon />
              </span>
            </div>
          </div> */}

          <div style={{ marginLeft: "10%" }}>
            <div
              className=""
              style={{
                marginTop: 15,
                width: "95%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                color: "#FFF",
                backgroundColor: "white",
                verticalAlign: "top",
              }}
            >
              <div className="row pt-5">
                {search
                  ? searchArr?.map((item, index) => (
                      <>
                        <div
                          style={{
                            padding: "10px",
                            width: "19%",
                            height: 200,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "20px",
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 4.50467px 6.6729px rgba(0, 0, 0, 0.25)",
                            cursor:
                              fileData === undefined && clicked
                                ? "progress"
                                : "default",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={
                                item?.file_link.slice(
                                  item?.file_link.lastIndexOf(".") + 1
                                ) === "csv"
                                  ? "/CSV1.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xls"
                                  ? "/Excel.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xlsx"
                                  ? "/Excel.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "pdf"
                                  ? "/file5.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xml"
                                  ? "/file9.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "json" && "/file8.png"
                              }
                              style={{
                                marginBottom: 10,
                                marginRight: 10,
                                float: "left",
                                height: "40px",
                                width: "auto",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <h3
                              style={{
                                marginTop: 1,
                                color: "black",
                                fontSize: "12px",
                                textAlign: "left",
                                minHeight: "30px",
                                width: "100%",
                                fontWeight: "600",
                                fontFamily: "Trebuchet MS",
                                // backgroundColor: "yellow",
                              }}
                            >
                              {item?.name}
                            </h3>
                          </div>
                          <p
                            style={{
                              marginTop: -5,
                              textAlign: "left",
                              color: "black",
                              fontSize: "11px",
                              minHeight: "24%",
                              width: "100%",
                              fontFamily: "Trebuchet MS",
                              // backgroundColor: "red",
                            }}
                          >
                            {item?.description}
                          </p>

                          <CableIcon
                            onClick={(e) => {
                              setClicked(true);
                              getFileData(item?.id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              // cursor: "pointer",
                              cursor:
                                fileData === undefined && clicked
                                  ? "progress"
                                  : "pointer",
                              marginTop: "auto",
                              marginBottom: 0,
                            }}
                          />
                        </div>
                      </>
                    ))
                  : filesByCategory?.map((item, index) => (
                      <>
                        <div
                          style={{
                            padding: "10px",
                            width: "19%",
                            height: 200,
                            background: "white",
                            display: "inline-block",
                            marginRight: 10,
                            padding: "20px",
                            marginBottom: "12px",
                            border: "1.17215px solid #CBC6C6",
                            borderRadius: "8px",
                            boxShadow:
                              "2px 4.50467px 6.6729px rgba(0, 0, 0, 0.25)",
                            cursor:
                              fileData === undefined && clicked
                                ? "progress"
                                : "default",
                          }}
                        >
                          <div style={{ height: "60px", width: "100%" }}>
                            <img
                              src={
                                item?.file_link.slice(
                                  item?.file_link.lastIndexOf(".") + 1
                                ) === "csv"
                                  ? "/CSV1.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xls"
                                  ? "/Excel.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xlsx"
                                  ? "/Excel.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "pdf"
                                  ? "/file5.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "xml"
                                  ? "/file9.png"
                                  : item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "json" && "/file8.png"
                              }
                              style={{
                                marginBottom: 10,
                                marginRight: 10,
                                float: "left",
                                height: "40px",
                                width: "auto",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <h3
                              style={{
                                marginTop: 1,
                                color: "black",
                                fontSize: "12px",
                                textAlign: "left",
                                minHeight: "30px",
                                width: "100%",
                                fontWeight: "600",
                                fontFamily: "Trebuchet MS",
                                // backgroundColor: "yellow",
                              }}
                            >
                              {item?.name}
                            </h3>
                          </div>
                          <p
                            style={{
                              marginTop: -5,
                              textAlign: "left",
                              color: "black",
                              fontSize: "11px",
                              minHeight: "24%",
                              width: "100%",
                              fontFamily: "Trebuchet MS",
                              // backgroundColor: "red",
                            }}
                          >
                            {item?.description}
                          </p>

                          <CableIcon
                            onClick={(e) => {
                              setClicked(true);
                              getFileData(item?.id);
                              console.log("Pressed!", item.connection_type_id);
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              color: "grey",
                              float: "left",
                              // cursor: "pointer",
                              cursor:
                                fileData === undefined && clicked
                                  ? "progress"
                                  : "pointer",
                              marginTop: "auto",
                              marginBottom: 0,
                            }}
                          />
                        </div>
                      </>
                    ))}
              </div>
            </div>
          </div>

          <Modal
            open={openModal1}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <div
                style={{
                  alignSelf: "flex-end",
                  display: "flex",
                  cursor: "pointer",
                  marginRight: 20,
                  marginTop: 10,
                }}
                onClick={handleCloseModal}
              >
                <CloseIcon fontSize="medium" />
              </div>
              <div className="screen2">
                {fileData && rowsData && (
                  // <Spreadsheet data={fileData} />
                  <ReactGrid
                    rows={rowsData}
                    columns={columnData}
                    // enableRangeSelection={fillHandle ? true : false}
                    // enableFillHandle={fillHandle ? true : false}
                    // enableFullWidthHeader
                    // enableRowSelection={rowSelection ? true : false}
                    // enableColumnSelection={columnSelection ? true : false}
                    // stickyTopRows={stickyHeader ? 1 : 0}
                    // onColumnResized={columnResize ? handleColumnResize : null}
                    // onCellsChanged={editMode ? handleChanges : null}
                    // onContextMenu={simpleHandleContextMenu}
                    // onFocusLocationChanged={handleFocus}
                    // highlights={highlightOn ? highlight : []}
                  />
                )}
              </div>
            </Box>
          </Modal>

          <Dialog
            open={noData}
            onClose={() => setNoData(false)}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "hidden",
              },
            }}
          >
            <Alert
              style={{ height: 70, alignItems: "center", padding: 10 }}
              severity={"error"}
            >
              No Data Available
            </Alert>
          </Dialog>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default Files;
