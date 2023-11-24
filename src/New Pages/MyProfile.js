import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import axios from "axios";
import configData from "../config.json";
import Modal from "@mui/material/Modal";
import Spreadsheet from "react-spreadsheet";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { Animate } from "../Components/lib";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FuzzySearch from "fuzzy-search";

import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import bgImg from "../Connector box 2.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select2 from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import { elementsCustom } from "../../src/graphDataForStepwise";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Select from "react-select";

// Auth context
import { AuthContext } from "../context";

const MyProfile = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const location = useLocation();
  const authContext = useContext(AuthContext);

  const [value, setValue] = useState(0);
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [text, setText] = useState();

  const [hover, setHover] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // var template = `counters: {
  //   u_column: 1,
  //   u_row: 1,
  //   u_content_heading: 1,
  //   u_content_image: 1,
  // },
  // body: {
  //   id: "kH5navYTVY",
  //   rows: [
  //     {
  //       id: "d45d15NvwE",
  //       cells: [1],
  //       columns: [
  //         {
  //           id: "UapVDNOP3_",
  //           contents: [
  //             {
  //               id: "eRfkswK9Yu",
  //               type: "heading",
  //               values: {
  //                 containerPadding: "10px",
  //                 anchor: "",
  //                 headingType: "h1",
  //                 fontSize: "22px",
  //                 textAlign: "left",
  //                 lineHeight: "140%",
  //                 linkStyle: {
  //                   inherit: true,
  //                   linkColor: "#0000ee",
  //                   linkHoverColor: "#0000ee",
  //                   linkUnderline: true,
  //                   linkHoverUnderline: true,
  //                 },
  //                 displayCondition: null,
  //                 _meta: {
  //                   htmlID: "u_content_heading_1",
  //                   htmlClassNames: "u_content_heading",
  //                 },
  //                 selectable: true,
  //                 draggable: true,
  //                 duplicatable: true,
  //                 deletable: true,
  //                 hideable: true,
  //                 text: ${text && text[0]},
  //               },
  //             },
  //             {
  //               id: "Tfi4DEszEJ",
  //               type: "image",
  //               values: {
  //                 containerPadding: "10px",
  //                 anchor: "",
  //                 src: {
  //                   url: ${"https://igneousbucket.s3.ap-south-1.amazonaws.com/1692194536097-bg.jpeg"},
  //                   width: 2560,
  //                   height: 1600,
  //                 },
  //                 textAlign: "center",
  //                 altText: "",
  //                 action: {
  //                   name: "web",
  //                   values: {
  //                     href: "",
  //                     target: "_blank",
  //                   },
  //                 },
  //                 displayCondition: null,
  //                 _meta: {
  //                   htmlID: "u_content_image_1",
  //                   htmlClassNames: "u_content_image",
  //                 },
  //                 selectable: true,
  //                 draggable: true,
  //                 duplicatable: true,
  //                 deletable: true,
  //                 hideable: true,
  //               },
  //             },
  //           ],
  //           values: {
  //             backgroundColor: "",
  //             padding: "0px",
  //             border: {},
  //             _meta: {
  //               htmlID: "u_column_1",
  //               htmlClassNames: "u_column",
  //             },
  //           },
  //         },
  //       ],
  //       values: {
  //         displayCondition: null,
  //         columns: false,
  //         backgroundColor: "",
  //         columnsBackgroundColor: "",
  //         backgroundImage: {
  //           url: "",
  //           fullWidth: true,
  //           repeat: "no-repeat",
  //           size: "custom",
  //           position: "center",
  //         },
  //         padding: "0px",
  //         anchor: "",
  //         hideDesktop: false,
  //         _meta: {
  //           htmlID: "u_row_1",
  //           htmlClassNames: "u_row",
  //         },
  //         selectable: true,
  //         draggable: true,
  //         duplicatable: true,
  //         deletable: true,
  //         hideable: true,
  //       },
  //     },
  //   ],
  //   values: {
  //     popupPosition: "center",
  //     popupWidth: "600px",
  //     popupHeight: "auto",
  //     borderRadius: "10px",
  //     contentAlign: "center",
  //     contentVerticalAlign: "center",
  //     contentWidth: "500px",
  //     fontFamily: {
  //       label: "Arial",
  //       value: "arial,helvetica,sans-serif",
  //     },
  //     textColor: "#000000",
  //     popupBackgroundColor: "#FFFFFF",
  //     popupBackgroundImage: {
  //       url: "",
  //       fullWidth: true,
  //       repeat: "no-repeat",
  //       size: "cover",
  //       position: "center",
  //     },
  //     popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
  //     popupCloseButton_position: "top-right",
  //     popupCloseButton_backgroundColor: "#DDDDDD",
  //     popupCloseButton_iconColor: "#000000",
  //     popupCloseButton_borderRadius: "0px",
  //     popupCloseButton_margin: "0px",
  //     popupCloseButton_action: {
  //       name: "close_popup",
  //       attrs: {
  //         onClick:
  //           "document.querySelector('.u-popup-container').style.display = 'none';",
  //       },
  //     },
  //     backgroundColor: "#e7e7e7",
  //     backgroundImage: {
  //       url: "",
  //       fullWidth: true,
  //       repeat: "no-repeat",
  //       size: "custom",
  //       position: "center",
  //     },
  //     preheaderText: "",
  //     linkStyle: {
  //       body: true,
  //       linkColor: "#0000ee",
  //       linkHoverColor: "#0000ee",
  //       linkUnderline: true,
  //       linkHoverUnderline: true,
  //     },
  //     _meta: {
  //       htmlID: "u_body",
  //       htmlClassNames: "u_body",
  //     },
  //   },
  // },
  // schemaVersion: 15,`;

  useEffect(() => {
    // fetch("https://igneousbucket.s3.ap-south-1.amazonaws.com/D1.txt")
    //   .then((response) => response.text())
    //   .then((data) => {
    //     console.log("FILE ??", data);
    //     console.log("ARRR", data?.split());

    //     // let ttt = `Education is a key driver for changing attitudes.
    //     //     Avg. Value for each Country. Color shows details about Demographics Response Total number country's are 66.   Avg. Value ranges from 30% to 62.10%.    Demographics Response huge for no education category across all the country and Higher Category which are lowest one
    //     // Avg. Value for each Country. Color shows details about Demographics Response Total number country's are 66.   Avg. Value ranges from 30% to 62.10%.    Demographics Response huge for no education category across all the country and Higher Category which are lowest one
    //     // Avg. Value for each Country. Color shows details about Demographics Response Total number country's are 66.   Avg. Value ranges from 30% to 62.10%.    Demographics Response huge for no education category across all the country and Higher Category which are lowest one
    //     // `;
    //     let l = data.split();
    //     console.log("ARRR22", l[0]?.split(/\r?\n/));
    //     let textbox = l[0]?.split(/\r?\n/);
    //     setText(textbox);
    //   });

    getData();
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
        console.log("ssss", response.data);
        console.log("response", response.data.data[0]?.user_id);
        localStorage.setItem("user_id", response.data.data[0]?.user_id);
        console.log("check userID", localStorage.getItem("user_id"));

        setName(response.data.data[0]?.name);
        setAccountName(response.data.data[0]?.account_name);
        setEmail(response.data.data[0]?.email);
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

  const updateProfile = () => {
    console.log(
      "IDD",
      localStorage.getItem("account_id"),
      name,
      email,
      accountName
    );
    axios
      .post(
        configData.API_URL + "personalAccount/users/updateUserDetails",
        {
          userName: name,
          userEmail: email,
          accountName: accountName,
          id: localStorage.getItem("account_id"),
        },
        {}
      )
      .then((response) => {
        console.log("UPDATE API success", response.data);
        if (response?.data?.success) {
          console.log("Profile Updated");
          setUpdateSuccess(true);
          setTimeout(() => {
            setUpdateSuccess(false);
          }, 1600);
        }
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

  const updatePassword = () => {
    console.log(
      "IDD",
      oldPassword,
      newPassword,
      localStorage.getItem("account_id")
    );
    axios
      .post(
        configData.API_URL + "personalAccount/users/changePassKey",
        {
          old_pass: oldPassword,
          new_pass: newPassword,
          account_id: localStorage.getItem("account_id").toString(),
        },

        {}
      )

      .then((response) => {
        console.log("ssss updated pass", response.data);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-100px",
            }}
          >
            <h2
              style={{
                marginTop: "20px",
                alignSelf: "flex-start",
                marginLeft: "9%",
                fontFamily: "Trebuchet MS",
              }}
            >
              My Profile
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Animate type="pop">
              <Box
                sx={{
                  width: "210px",
                  margin: "auto",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  aria-label=" label tabs example"
                >
                  <Tab
                    value={0}
                    sx={{ textTransform: "none", fontSize: "18px" }}
                    label="Profile"
                    centered
                  />
                  <Tab
                    value={1}
                    sx={{ textTransform: "none", fontSize: "18px" }}
                    label="Password"
                    centered
                  />
                </Tabs>
              </Box>
            </Animate>

            {value === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                  alignItems: "center",
                  width: "350px",
                }}
              >
                <div
                  style={{
                    marginTop: "50px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    color: "#067AB4",
                    fontSize: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  Edit Your Profile Information
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    YOUR NAME
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    marginTop: "10px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    EMAIL ADDRESS
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    marginTop: "10px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    ACCOUNT NAME
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  style={{
                    marginTop: "10px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />
                <div
                  style={{
                    marginTop: "20px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    color: "white",
                    fontSize: "15px",
                    backgroundColor: hover ? "#067ab4" : "#00A0F8",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => updateProfile()}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  Save
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    fontWeight: "500",
                    fontFamily: "Trebuchet MS",
                    color: "#6f706f",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-start",
                    cursor: "pointer",
                  }}
                >
                  Close Your Account
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf: "center",
                  alignItems: "center",
                  width: "350px",
                }}
              >
                <div
                  style={{
                    marginTop: "40px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    color: "#067AB4",
                    fontSize: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  Update Your Password
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    OLD PASSWORD
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>

                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  style={{
                    marginTop: "15px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    NEW PASSWORD
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{
                    marginTop: "15px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                    alignSelf: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "500",
                      fontFamily: "Trebuchet MS",
                      color: "#067AB4",
                      fontSize: "15px",
                    }}
                  >
                    CONFIRM PASSWORD
                  </div>
                  <div style={{ color: "red", marginLeft: "5px" }}>*</div>
                </div>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    marginTop: "15px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    fontSize: "15px",
                    backgroundColor: "white",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    border: "0.2px solid #6f706f",
                    color: "#6f706f",
                    padding: 10,
                  }}
                />
                <div
                  style={{
                    marginTop: "20px",
                    fontWeight: "600",
                    fontFamily: "Trebuchet MS",
                    color: "white",
                    fontSize: "15px",
                    backgroundColor: "#00A0F8",
                    height: "50px",
                    width: "350px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    cursor: "pointer",

                    "&:hover, &:focus": {
                      bgcolor: "#067ab4",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    if (newPassword === confirmPassword) updatePassword();
                    else alert("password does not match!");
                  }}
                >
                  Save Password
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        history.push("Login")
      )}

      <Dialog
        open={updateSuccess}
        onClose={() => setUpdateSuccess(false)}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Alert
          style={{ height: 80, alignItems: "center", padding: 10 }}
          severity={"success"}
        >
          Profile Updated Successfully
        </Alert>
      </Dialog>
    </>
  );
};

export default MyProfile;
