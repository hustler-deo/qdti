import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";

import axios from "axios";
import configData from "../config.json";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

import { ReactGrid, Highlight } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

// Auth context
import { AuthContext } from "../context";
import TextField from "@mui/material/TextField";

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
const MyFiles = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [input, setInput] = useState("");
  const [files, setFiles] = useState();
  const [filesBackup, setFilesBackup] = useState();
  const [openModal1, setOpenModal1] = useState(false);
  const [fileData, setFileData] = useState();

  const [csvFiles, setCsvFiles] = useState();
  const [xlFiles, setXlFiles] = useState();
  const [xmlFiles, setXmlFiles] = useState();
  const [jsonFiles, setJsonFiles] = useState();
  const [pdfFiles, setPdfFiles] = useState();
  const [parquetFiles, setParquetFiles] = useState();

  const [clicked, setClicked] = useState(false);

  const [rowsData, setrowsData] = useState();
  const [columnData, setColumnData] = useState();
  const [searched, setSearched] = useState(false);

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (input != "") {
      setSearched(true);
      let filteredRows = filesBackup?.filter((row) => {
        return row.name.toLowerCase().includes(input.toLowerCase());
      });
      setFiles(filteredRows);
    }
    if (input === "") setSearched(false);
  }, [input]);

  const handleCloseModal = () => {
    setClicked(false);
    setrowsData();
    setOpenModal1(false);
  };

  const getData = () => {
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getMyFiles?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        console.log("ssss", response.data);
        // setFilesBackup(response.data.data);
        console.log("response", response.data.data);

        // let filetype = item?.file_link.slice(
        //   item?.file_link.lastIndexOf(".") + 1
        // );
        const csv = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
            "csv"
          );
        });
        console.log("CSVS", csv);
        setCsvFiles(csv);

        const xl = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xls" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlsx" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlsm" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlsb" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xltx" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xltm" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlt" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlam" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xla" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlw" ||
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
              "xlr"
          );
        });

        setXlFiles(xl);

        const pdf = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) == "pdf"
          );
        });
        console.log("pdfs", pdf);
        setPdfFiles(pdf);
        const xml = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) == "xml"
          );
        });
        console.log("xmls", xml);
        setXmlFiles(xml);

        const json = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
            "json"
          );
        });
        console.log("jsons", json);
        setJsonFiles(json);
        const parquet = response.data.data.filter((item) => {
          return (
            item?.file_link.slice(item?.file_link.lastIndexOf(".") + 1) ===
            "parquet"
          );
        });
        console.log("parquets", parquet);
        setParquetFiles(parquet);
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
                My Files
              </h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <TextField
              value={input}
              placeholder="Search For Files"
              size="small"
              sx={{ mt: 1, width: "30vw" }}
              inputProps={{
                style: {
                  fontSize: "14px",
                  fontWeight: "600",
                },
              }}
              id="outlined-basic"
              label=""
              variant="outlined"
              onChange={(event) => setInput(event.target.value)}
            />
            <div
              style={{
                position: "relative",
                marginTop: "0.5%",
                right: "3%",
              }}
            >
              <SearchIcon fontSize="medium" />
            </div>
          </div>
          {!searched ? (
            <>
              {csvFiles && csvFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  CSV Files
                </h3>
              )}
              {csvFiles && csvFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {csvFiles &&
                        csvFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
              {xlFiles && xlFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  Excel Files
                </h3>
              )}
              {xlFiles && xlFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {xlFiles &&
                        xlFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {xmlFiles && xmlFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  XML Files
                </h3>
              )}
              {xmlFiles && xmlFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {xmlFiles &&
                        xmlFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {jsonFiles && jsonFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  JSON Files
                </h3>
              )}
              {jsonFiles && jsonFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {jsonFiles &&
                        jsonFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {pdfFiles && pdfFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  PDF Files
                </h3>
              )}
              {pdfFiles && pdfFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {pdfFiles &&
                        pdfFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {parquetFiles && parquetFiles?.length > 0 && (
                <h3
                  style={{
                    color: "#0c0c0c",
                    fontFamily: "Trebuchet MS",
                    textAlign: "left",
                    marginLeft: "9%",
                    marginTop: "30px",
                    color: "#067AB4",
                  }}
                >
                  Parquet Files
                </h3>
              )}
              {parquetFiles && parquetFiles?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "2%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {parquetFiles &&
                        parquetFiles.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {files && files?.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#C1D9EC",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    width: "90%",
                    height: "100%",
                    padding: 5,
                    zIndex: 2,
                    marginBottom: "8px",
                    marginTop: "3%",
                    marginLeft: "8%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      margin: "10px",
                      marginBottom: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      zIndex: 20,
                      paddingLeft: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      {files &&
                        files.map((item, i) => {
                          return (
                            <div
                              onClick={() => {
                                setClicked(true);
                                getFileData(item?.id);
                              }}
                              style={{ margin: "10px", cursor: "pointer" }}
                            >
                              <div
                                style={{
                                  backgroundImage: `url(${"/folderIcon.png"})`,
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  backgroundRepeat: "no-repeat",
                                  height: "120px",
                                  width: "130px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={
                                    item?.file_link.slice(
                                      item?.file_link.lastIndexOf(".") + 1
                                    ) === "csv"
                                      ? "/CSV1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xls"
                                      ? "/file1.png"
                                      : item?.file_link.slice(
                                          item?.file_link.lastIndexOf(".") + 1
                                        ) === "xlsx"
                                      ? "/file1.png"
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
                                    alignSelf: "center",
                                    position: "relative",
                                    height: "45px",
                                    width: "auto",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  maxHeight: "60px",
                                  width: "130px",
                                  flexWrap: "wrap",
                                  marginTop: "-10px",
                                  fontSize: "14px",
                                  color: "#067AB4",
                                  fontFamily: "Trebuchet MS",
                                }}
                              >
                                {item?.name}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {filesBackup === undefined && (
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
          )}
          {clicked && rowsData === undefined && (
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
          )}

          <Modal
            open={openModal1}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <div
                style={{
                  // alignSelf: "flex-end",
                  display: "flex",
                  cursor: "pointer",
                  marginRight: 20,
                  marginTop: 10,
                }}
                onClick={handleCloseModal}
              >
                <CloseIcon fontSize="medium" />
              </div>

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
            </Box>
          </Modal>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default MyFiles;
