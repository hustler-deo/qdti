import React, { useRef, useEffect, useState, useContext } from "react";

import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import configData from "../config.json";

import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CloseIcon from "@mui/icons-material/Close";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import BuildIcon from "@mui/icons-material/Build";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import LinearProgress from "@mui/material/LinearProgress";

// Auth context
import { AuthContext } from "../context";
import MiniDrawer from "../MiniDrawer";

var clickedTrain = 0;

const AutoMLEngine2 = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

  const [viewOnlyDashboards, setViewOnlyDashboards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [trainModel, setTrainModel] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [typeDesc, setTypeDesc] = useState("");
  const [selectedMlType, setSelectedMlType] = useState(0);
  const [selectedTargetLabel, setSelectedTargetLabel] = useState(10);

  const location = useLocation();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [dashboards, setDashboards] = useState([]);
  const [dashboardId, setDashboardId] = useState([]);

  const [train, setTrain] = useState(false);

  const [dashdata, setDashData] = useState([]);
  const [data2, setData2] = useState([]);

  const [actionsModal, setActionsModal] = useState(false);
  const [selectedActionIndex, setselectedActionIndex] = useState();

  const [issueDetails, setIssueDetails] = useState("");

  const [scheduleReportModal, setScheduleReportModal] = useState(false);
  const [sendNowModal, setSendNowModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const [inputModal, setInputModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [reportIssueModal, setReportIssueModal] = useState(false);

  const [dashboardTitle, setDashboardTitle] = useState("");
  const [dashboardDesc, setDashboardDesc] = useState("");

  const [isSaveDashboard, setIsSaveDashboard] = useState(false);
  const [text, setText] = useState();

  const [reported, setReported] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);

  const [fileName, setFileName] = useState();
  const [imageNames, setImageNames] = useState();
  const [next, setNext] = useState(false);

  const [createSuccess, setCreateSuccess] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let contentBox = [];
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

  const modalstyle2 = {
    position: "relative",
    top: "20%",
    left: "28%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 350,
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
  const steps = ["1", "2", "3", "4"];

  const handleOnClick = (index1) => {
    setselectedActionIndex(index1);
    if (index1 === 0) {
      history.push({
        pathname: "/Main_Dashboard/" + global.subscription_id,
        state: data2,
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
    if (index1 === 1) setIsSaveDashboard(true);
    if (index1 === 2) setReportIssueModal(true);
    if (index1 === 3) setDeleteModal(true);

    handleClose();
  };

  const actionsList = [
    "Edit",
    // 'Share',
    // 'Schedule as Report',
    // 'Edit Scheduled Reports',
    // 'Send Now',
    // 'Send/Export',
    // 'Add to Favourites',
    // 'Notify me on issues',
    "Save As",
    "Report an Issue",
    "Delete",
  ];

  useEffect(() => {
    localStorage.setItem("viewMode", 0);
    getAllMLDashboards();
    // setInputModal(true);
  }, []);

  // useEffect(() => {
  //   if (next) {
  //     console.log("filename", fileName);
  //     console.log("imageNames", imageNames, imageNames?.split(","));
  //   }
  // }, [next]);

  useEffect(() => {
    contentBox = [];
    for (let i = 1; i < 5; i++) {
      fetch(
        "https://igneousbucket.s3.ap-south-1.amazonaws.com/MLDashboards/Content/" +
          i +
          ".txt"
      )
        .then((response) => response.text())
        .then((data) => {
          console.log("FILE ??", data);
          console.log("ARRR", data.split());
          if (i === 1) {
            let l = data.split();
            console.log("ARRR22", l[0].split(/\r?\n/));
            let textbox = l[0].split(/\r?\n/);
            contentBox.push(textbox);
            // setText(textbox);
          }
          if (i === 2) {
            let l = data.split();
            console.log("ARRR33", l[0].split(/\r?\n/));
            let textbox = l[0].split(/\r?\n/);
            contentBox.push(textbox);
            setText(contentBox);
          }
          if (i === 3) {
            let l = data.split();
            console.log("ARRR33", l[0].split(/\r?\n/));
            let textbox = l[0].split(/\r?\n/);
            contentBox.push(textbox);
            setText(contentBox);
          }
          if (i === 4) {
            let l = data.split();
            console.log("ARRR33", l[0].split(/\r?\n/));
            let textbox = l[0].split(/\r?\n/);
            contentBox.push(textbox);
            setText(contentBox);
          }

          console.log("CONTENT", contentBox);
        });
    }
  }, []);

  useEffect(() => {
    if (trainModel && text) saveDesign(1);
  }, [trainModel && text]);

  const saveDesign = (mode) => {
    // const template = {
    //   counters: {
    //     u_column: 1,
    //     u_row: 1,
    //     u_content_heading: 1,
    //     u_content_image: 1,
    //   },
    //   body: {
    //     id: "kH5navYTVY",
    //     rows: [
    //       {
    //         id: "d45d15NvwE",
    //         cells: [1],
    //         columns: [
    //           {
    //             id: "UapVDNOP3_",
    //             contents: [
    //               {
    //                 id: "eRfkswK9Yu",
    //                 type: "heading",
    //                 values: {
    //                   containerPadding: "10px",
    //                   anchor: "",
    //                   headingType: "h1",
    //                   fontSize: "22px",
    //                   textAlign: "left",
    //                   lineHeight: "140%",
    //                   linkStyle: {
    //                     inherit: true,
    //                     linkColor: "#0000ee",
    //                     linkHoverColor: "#0000ee",
    //                     linkUnderline: true,
    //                     linkHoverUnderline: true,
    //                   },
    //                   displayCondition: null,
    //                   _meta: {
    //                     htmlID: "u_content_heading_1",
    //                     htmlClassNames: "u_content_heading",
    //                   },
    //                   selectable: true,
    //                   draggable: true,
    //                   duplicatable: true,
    //                   deletable: true,
    //                   hideable: true,
    //                   text: text[0],
    //                 },
    //               },
    //               {
    //                 id: "Tfi4DEszEJ",
    //                 type: "image",
    //                 values: {
    //                   containerPadding: "10px",
    //                   anchor: "",
    //                   src: {
    //                     url: "https://igneousbucket.s3.ap-south-1.amazonaws.com/1692194536097-bg.jpeg",
    //                     width: 2560,
    //                     height: 1600,
    //                   },
    //                   textAlign: "center",
    //                   altText: "",
    //                   action: {
    //                     name: "web",
    //                     values: {
    //                       href: "",
    //                       target: "_blank",
    //                     },
    //                   },
    //                   displayCondition: null,
    //                   _meta: {
    //                     htmlID: "u_content_image_1",
    //                     htmlClassNames: "u_content_image",
    //                   },
    //                   selectable: true,
    //                   draggable: true,
    //                   duplicatable: true,
    //                   deletable: true,
    //                   hideable: true,
    //                 },
    //               },
    //               {
    //                 id: "eRfkswK9Yu",
    //                 type: "heading",
    //                 values: {
    //                   containerPadding: "10px",
    //                   anchor: "",
    //                   headingType: "h2",
    //                   fontSize: "18px",
    //                   textAlign: "left",
    //                   lineHeight: "140%",
    //                   linkStyle: {
    //                     inherit: true,
    //                     linkColor: "#0000ee",
    //                     linkHoverColor: "#0000ee",
    //                     linkUnderline: true,
    //                     linkHoverUnderline: true,
    //                   },
    //                   displayCondition: null,
    //                   _meta: {
    //                     htmlID: "u_content_heading_1",
    //                     htmlClassNames: "u_content_heading",
    //                   },
    //                   selectable: true,
    //                   draggable: true,
    //                   duplicatable: true,
    //                   deletable: true,
    //                   hideable: true,
    //                   text: text[7] + text[8] + text[9] + text[10],
    //                 },
    //               },
    //             ],
    //             values: {
    //               backgroundColor: "",
    //               padding: "0px",
    //               border: {},
    //               _meta: {
    //                 htmlID: "u_column_1",
    //                 htmlClassNames: "u_column",
    //               },
    //             },
    //           },
    //         ],
    //         values: {
    //           displayCondition: null,
    //           columns: false,
    //           backgroundColor: "",
    //           columnsBackgroundColor: "",
    //           backgroundImage: {
    //             url: "",
    //             fullWidth: true,
    //             repeat: "no-repeat",
    //             size: "custom",
    //             position: "center",
    //           },
    //           padding: "0px",
    //           anchor: "",
    //           hideDesktop: false,
    //           _meta: {
    //             htmlID: "u_row_1",
    //             htmlClassNames: "u_row",
    //           },
    //           selectable: true,
    //           draggable: true,
    //           duplicatable: true,
    //           deletable: true,
    //           hideable: true,
    //         },
    //       },
    //     ],
    //     values: {
    //       popupPosition: "center",
    //       popupWidth: "600px",
    //       popupHeight: "auto",
    //       borderRadius: "10px",
    //       contentAlign: "center",
    //       contentVerticalAlign: "center",
    //       contentWidth: "500px",
    //       fontFamily: {
    //         label: "Arial",
    //         value: "arial,helvetica,sans-serif",
    //       },
    //       textColor: "#000000",
    //       popupBackgroundColor: "#FFFFFF",
    //       popupBackgroundImage: {
    //         url: "",
    //         fullWidth: true,
    //         repeat: "no-repeat",
    //         size: "cover",
    //         position: "center",
    //       },
    //       popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
    //       popupCloseButton_position: "top-right",
    //       popupCloseButton_backgroundColor: "#DDDDDD",
    //       popupCloseButton_iconColor: "#000000",
    //       popupCloseButton_borderRadius: "0px",
    //       popupCloseButton_margin: "0px",
    //       popupCloseButton_action: {
    //         name: "close_popup",
    //         attrs: {
    //           onClick:
    //             "document.querySelector('.u-popup-container').style.display = 'none';",
    //         },
    //       },
    //       backgroundColor: "#e7e7e7",
    //       backgroundImage: {
    //         url: "",
    //         fullWidth: true,
    //         repeat: "no-repeat",
    //         size: "custom",
    //         position: "center",
    //       },
    //       preheaderText: "",
    //       linkStyle: {
    //         body: true,
    //         linkColor: "#0000ee",
    //         linkHoverColor: "#0000ee",
    //         linkUnderline: true,
    //         linkHoverUnderline: true,
    //       },
    //       _meta: {
    //         htmlID: "u_body",
    //         htmlClassNames: "u_body",
    //       },
    //     },
    //   },
    //   schemaVersion: 15,
    // };
    let columns = [];
    let cols = [];
    let obj = {};

    // let k = {
    //   id: "eRfkswK9Yu",
    //   type: "heading",
    //   values: {
    //     containerPadding: "10px",
    //     anchor: "",
    //     headingType: "h2",
    //     fontSize: "18px",
    //     textAlign: "left",
    //     lineHeight: "140%",
    //     linkStyle: {
    //       inherit: true,
    //       linkColor: "#0000ee",
    //       linkHoverColor: "#0000ee",
    //       linkUnderline: true,
    //       linkHoverUnderline: true,
    //     },
    //     displayCondition: null,
    //     _meta: {
    //       htmlID: "u_content_heading_1",
    //       htmlClassNames: "u_content_heading",
    //     },
    //     selectable: true,
    //     draggable: true,
    //     duplicatable: true,
    //     deletable: true,
    //     hideable: true,
    //     text: "test",
    //   },
    // };

    // cols.push(k);
    // let t1 = text;
    // t1.shift();

    for (let k = 0; k < 10; k++) {
      text[k]?.map((item) => {
        if (item != "") {
          let obj = {};
          (obj.id = "eRfkswK9Yu"), (obj.type = "heading");
          obj.values = {};
          (obj.values.containerPadding = "10px"),
            (obj.values.anchor = ""),
            (obj.values.headingType = "h2"),
            (obj.values.fontSize = "18px"),
            (obj.values.textAlign = "left"),
            (obj.values.lineHeight = "140%"),
            (obj.values.linkStyle = {
              inherit: true,
              linkColor: "#0000ee",
              linkHoverColor: "#0000ee",
              linkUnderline: true,
              linkHoverUnderline: true,
            }),
            (obj.values.displayCondition = null),
            (obj.values._meta = {
              htmlID: "u_content_heading_1",
              htmlClassNames: "u_content_heading",
            }),
            (obj.values.selectable = true),
            (obj.values.draggable = true),
            (obj.values.duplicatable = true),
            (obj.values.deletable = true),
            (obj.values.hideable = true),
            (obj.values.text = item),
            cols.push(obj);
        }
      });
    }

    for (let i = 1; i < 5; i++) {
      // console.log("kidid", t1);
      // if (t1[i] != "") {
      //   let obj = {};
      //   (obj.id = "eRfkswK9Yu"), (obj.type = "heading");
      //   obj.values = {};
      //   (obj.values.containerPadding = "10px"),
      //     (obj.values.anchor = ""),
      //     (obj.values.headingType = "h2"),
      //     (obj.values.fontSize = "18px"),
      //     (obj.values.textAlign = "left"),
      //     (obj.values.lineHeight = "140%"),
      //     (obj.values.linkStyle = {
      //       inherit: true,
      //       linkColor: "#0000ee",
      //       linkHoverColor: "#0000ee",
      //       linkUnderline: true,
      //       linkHoverUnderline: true,
      //     }),
      //     (obj.values.displayCondition = null),
      //     (obj.values._meta = {
      //       htmlID: "u_content_heading_1",
      //       htmlClassNames: "u_content_heading",
      //     }),
      //     (obj.values.selectable = true),
      //     (obj.values.draggable = true),
      //     (obj.values.duplicatable = true),
      //     (obj.values.deletable = true),
      //     (obj.values.hideable = true),
      //     (obj.values.text = t1[i]),
      //     cols.push(obj);
      // }
      let obj2 = {};
      obj2.values = {};
      (obj2.id = "Tfi4DEszEJ"),
        (obj2.type = "image"),
        (obj2.values = {
          containerPadding: "10px",
          anchor: "",
          src: {
            url:
              "https://igneousbucket.s3.ap-south-1.amazonaws.com/MLDashboards/Images/" +
              i +
              ".png",
            // url: "https://igneousbucket.s3.ap-south-1.amazonaws.com/1665735039665-newplot (43).png",
            width: 2560,
            height: 1600,
          },
          textAlign: "center",
          altText: "",
          action: {
            name: "web",
            values: {
              href: "",
              target: "_blank",
            },
          },
          displayCondition: null,
          _meta: {
            htmlID: "u_content_image_1",
            htmlClassNames: "u_content_image",
          },
          selectable: true,
          draggable: true,
          duplicatable: true,
          deletable: true,
          hideable: true,
        });

      cols.push(obj2);
    }

    obj.id = "UapVDNOP3_";
    obj.contents = cols;
    columns.push(obj);

    console.log("colss", columns);

    const template = {
      counters: {
        u_column: 1,
        u_row: 1,
        u_content_heading: 1,
        u_content_image: 1,
      },
      body: {
        id: "kH5navYTVY",
        rows: [
          {
            id: "d45d15NvwE",
            cells: [1],
            columns: columns,
            // [
            //   {
            //     id: "UapVDNOP3_",
            //     contents: [
            //       {
            //         id: "eRfkswK9Yu",
            //         type: "heading",
            //         values: {
            //           containerPadding: "10px",
            //           anchor: "",
            //           headingType: "h1",
            //           fontSize: "22px",
            //           textAlign: "left",
            //           lineHeight: "140%",
            //           linkStyle: {
            //             inherit: true,
            //             linkColor: "#0000ee",
            //             linkHoverColor: "#0000ee",
            //             linkUnderline: true,
            //             linkHoverUnderline: true,
            //           },
            //           displayCondition: null,
            //           _meta: {
            //             htmlID: "u_content_heading_1",
            //             htmlClassNames: "u_content_heading",
            //           },
            //           selectable: true,
            //           draggable: true,
            //           duplicatable: true,
            //           deletable: true,
            //           hideable: true,
            //           text: text[0],
            //         },
            //       },
            //       {
            //         id: "Tfi4DEszEJ",
            //         type: "image",
            //         values: {
            //           containerPadding: "10px",
            //           anchor: "",
            //           src: {
            //             url: "https://igneousbucket.s3.ap-south-1.amazonaws.com/1692194536097-bg.jpeg",
            //             width: 2560,
            //             height: 1600,
            //           },
            //           textAlign: "center",
            //           altText: "",
            //           action: {
            //             name: "web",
            //             values: {
            //               href: "",
            //               target: "_blank",
            //             },
            //           },
            //           displayCondition: null,
            //           _meta: {
            //             htmlID: "u_content_image_1",
            //             htmlClassNames: "u_content_image",
            //           },
            //           selectable: true,
            //           draggable: true,
            //           duplicatable: true,
            //           deletable: true,
            //           hideable: true,
            //         },
            //       },
            //       {
            //         id: "eRfkswK9Yu",
            //         type: "heading",
            //         values: {
            //           containerPadding: "10px",
            //           anchor: "",
            //           headingType: "h2",
            //           fontSize: "18px",
            //           textAlign: "left",
            //           lineHeight: "140%",
            //           linkStyle: {
            //             inherit: true,
            //             linkColor: "#0000ee",
            //             linkHoverColor: "#0000ee",
            //             linkUnderline: true,
            //             linkHoverUnderline: true,
            //           },
            //           displayCondition: null,
            //           _meta: {
            //             htmlID: "u_content_heading_1",
            //             htmlClassNames: "u_content_heading",
            //           },
            //           selectable: true,
            //           draggable: true,
            //           duplicatable: true,
            //           deletable: true,
            //           hideable: true,
            //           text: text[7] + text[8] + text[9] + text[10],
            //         },
            //       },
            //     ],
            //     values: {
            //       backgroundColor: "",
            //       padding: "0px",
            //       border: {},
            //       _meta: {
            //         htmlID: "u_column_1",
            //         htmlClassNames: "u_column",
            //       },
            //     },
            //   },
            // ]
            values: {
              displayCondition: null,
              columns: false,
              backgroundColor: "",
              columnsBackgroundColor: "",
              backgroundImage: {
                url: "",
                fullWidth: true,
                repeat: "no-repeat",
                size: "custom",
                position: "center",
              },
              padding: "0px",
              anchor: "",
              hideDesktop: false,
              _meta: {
                htmlID: "u_row_1",
                htmlClassNames: "u_row",
              },
              selectable: true,
              draggable: true,
              duplicatable: true,
              deletable: true,
              hideable: true,
            },
          },
        ],
        values: {
          popupPosition: "center",
          popupWidth: "600px",
          popupHeight: "auto",
          borderRadius: "10px",
          contentAlign: "center",
          contentVerticalAlign: "center",
          contentWidth: "500px",
          fontFamily: {
            label: "Arial",
            value: "arial,helvetica,sans-serif",
          },
          textColor: "#000000",
          popupBackgroundColor: "#FFFFFF",
          popupBackgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "cover",
            position: "center",
          },
          popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
          popupCloseButton_position: "top-right",
          popupCloseButton_backgroundColor: "#DDDDDD",
          popupCloseButton_iconColor: "#000000",
          popupCloseButton_borderRadius: "0px",
          popupCloseButton_margin: "0px",
          popupCloseButton_action: {
            name: "close_popup",
            attrs: {
              onClick:
                "document.querySelector('.u-popup-container').style.display = 'none';",
            },
          },
          backgroundColor: "#e7e7e7",
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "custom",
            position: "center",
          },
          preheaderText: "",
          linkStyle: {
            body: true,
            linkColor: "#0000ee",
            linkHoverColor: "#0000ee",
            linkUnderline: true,
            linkHoverUnderline: true,
          },
          _meta: {
            htmlID: "u_body",
            htmlClassNames: "u_body",
          },
        },
      },
      schemaVersion: 15,
    };

    console.log("colss222", template);
    axios
      .post(
        mode == 1
          ? configData.API_URL + "personalAccount/database/dashboard_save"
          : configData.API_URL + "personalAccount/database/dashboard_edit",
        mode == 1
          ? {
              account_id: localStorage.getItem("account_id").toString(),
              name: "NEW Test Dashboard -1",
              description: "NEW Test Dashboard -1",
              data: template,
              isMlDashboard: 1,
            }
          : {
              id: dId,
              data: data,
            },

        {}
      )
      .then((response) => {
        console.log("response Save dashboard", response.data);
        setCreateSuccess(true);
        // alert("New Dashboard Created Successfully");
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

  // const saveDesign = mode => {
  //   axios
  //     .post(
  //       mode == 1
  //         ? configData.API_URL + 'personalAccount/database/dashboard_save'
  //         : configData.API_URL + 'personalAccount/database/dashboard_edit',
  //       mode == 1
  //         ? {
  //             account_id: localStorage.getItem('account_id').toString(),
  //             name: dashboardTitle,
  //             description: dashboardDesc,
  //             data: JSON.parse(dashdata)
  //           }
  //         : {
  //             id: '1',
  //             data: 'data'
  //           },

  //       {}
  //     )
  //     .then(response => {
  //       console.log('response', response.data)
  //       // if (mode == 1) setDashboardSaved(true)
  //       // if (mode == 2) setDashboardUpdated(true)
  //       // setTimeout(
  //       //   () =>
  //       //     mode == 1 ? setDashboardSaved(false) : setDashboardUpdated(false),
  //       //   2000
  //       // )

  //       return response
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response)
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request)
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log(error.message)
  //       }
  //     })
  // }

  const deleteDashboard = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_parent_delete",
        {
          dashboard_id: dashboardId,
        },

        {}
      )
      .then((response) => {
        console.log("response", response.data.data);

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
  const typeOfMLProblems = [
    {
      type: "Binary Classification",
      description:
        "1. ML methodology that involves predicting a binary outcome\n 1. Example: Predicting whether or not a customer is going to churn (1) or not churn (0)",
    },
    {
      type: "Multi-Class Classification",
      description:
        "1. ML methodology that involves predicting an ordinary encoded outcome (> 2 possible categories to be predicted for)\n 1. ML methodology that involves predicting an ordinary encoded outcome (> 2  possible categories to be predicted for)",
    },
    {
      type: "Regression",
      description:
        "1. ML methodology that involves predicting a quantitative continuous or quantitative variable\n1. Example: Predicting customer demand (the number of orders per day)    based on certain input variables that best describe price elasticity     1. Note: This would not qualify for a time series based use case, as the data is not represented at a certain equally-spaced time period based granularity.",
    },
    {
      type: "Time Series",
      description:
        "1. ML methodology used for the forecasting of a particular quantitative continuous or quantitative discrete quantity, which is represented in a time period based granularity \n1. Example: Forecasting sales (revenue) for a collective set of items sold (comprising of a certain aspect of the business) for a certain period of time T in the future. ",
    },
    {
      type: "Clustering",
      description:
        "1. ML methodology used for forming groups of points that hold similar characteristics\n 1. Example: Cluster free customers based on their prior usage and preferences, to create customer profiles for effective target marketing.",
    },
  ];

  const modelInputVariables = [
    {
      type: "Gender",
    },
    {
      type: "Age",
    },
    {
      type: "Driver’s License",
    },
    {
      type: "Region Code",
    },
    {
      type: "Previously Insured",
    },
    {
      type: "Vehicle Age",
    },
    {
      type: "Vehicle Damaged",
    },
    {
      type: "Annual Premium",
    },
    {
      type: "Policy Sales Channel",
    },
    {
      type: "Vintage",
    },
    {
      type: "Successfully Cross-Sold",
    },
  ];

  const modelTargetLabels = [
    {
      type: "Gender",
    },
    {
      type: "Age",
    },
    {
      type: "Driver’s License",
    },
    {
      type: "Region Code",
    },
    {
      type: "Previously Insured",
    },
    {
      type: "Vehicle Age",
    },
    {
      type: "Vehicle Damaged",
    },
    {
      type: "Annual Premium",
    },
    {
      type: "Policy Sales Channel",
    },
    {
      type: "Vintage",
    },
    {
      type: "Successfully Cross-Sold",
    },
  ];

  const [selected, setSelected] = useState([
    "Gender",
    "Previously Insured",
    "Vehicle Damaged",
    "Policy Sales Channel",
  ]);
  const [selected2, setSelected2] = useState([
    "Age",
    "Vehicle Age",
    "Annual Premium",
  ]);
  const [selected3, setSelected3] = useState([
    "Gender",
    "Age",
    "Driver’s License",
    "Vehicle Age",
    "Annual Premium",
    "Policy Sales Channel",
  ]);

  const [selected4, setSelected4] = useState(["Successfully Cross-Sold"]);
  const [step, setStep] = useState(0);

  useEffect(() => {}, [step]);

  const isAllSelected =
    modelTargetLabels.length > 0 &&
    selected.length === modelTargetLabels.length;
  const isAllSelected2 =
    modelTargetLabels.length > 0 &&
    selected2.length === modelTargetLabels.length;

  const isAllSelected3 =
    modelTargetLabels.length > 0 &&
    selected3.length === modelTargetLabels.length;

  const isAllSelected4 =
    modelTargetLabels.length > 0 &&
    selected4.length === modelTargetLabels.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(
        selected.length === modelTargetLabels.length
          ? []
          : modelTargetLabels.map((e) => e.type)
      );
      return;
    }
    setSelected(value);
  };

  const handleChange2 = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected2(
        selected2.length === modelTargetLabels.length
          ? []
          : modelTargetLabels.map((e) => e.type)
      );
      return;
    }
    setSelected2(value);
  };

  const handleChange3 = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected3(
        selected3.length === modelTargetLabels.length
          ? []
          : modelTargetLabels.map((e) => e.type)
      );
      return;
    }
    setSelected3(value);
  };

  const handleChange4 = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected4(
        selected4.length === modelTargetLabels.length
          ? []
          : modelTargetLabels.map((e) => e.type)
      );
      return;
    }
    setSelected4(value);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(oldProgress => {
  //       if (oldProgress === 100) {
  //         return 0
  //       }
  //       const diff = Math.random() * 10
  //       return Math.min(oldProgress + diff, 100)
  //     })
  //   }, 500)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])
  // useEffect(() => {
  //   getAllDashboards()
  // }, [])

  const getAllMLDashboards = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/dashboard/mldashboard_viewall",
        {},

        {}
      )
      .then((response) => {
        console.log("response", response.data);

        let dashboardBox = response.data.data;

        for (let i = 0, j = 0; i < dashboardBox.length; i++, j++) {
          if (j === 20) j = 0;
          dashboardBox[i].img = images[j];
        }

        const results = dashboardBox;
        // console.log('result', results)
        setDashboards(results);
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

  const start = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setProgressComplete();
          setTimeout(() => setTrainModel(true), 500);

          clearInterval(timer);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div style={{ marginTop: -62, marginLeft: "8%" }}>
            {/* <div style={{ position: 'absolute', left: '88%' }}>
              <Button
                sx={{ bgcolor: '#0c0c0c', color: '#CCC' }}
                onClick={() => {
                  history.goBack()
                }}
                variant='outlined'
              >
                Go Back
              </Button>
            </div> */}
            <h2
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginLeft: 10,
                fontFamily: "Trebuchet MS",
              }}
            >
              AUTO-ML ENGINE
            </h2>
            <div
              style={{
                marginTop: 20,
                fontSize: 16,
                fontWeight: "500",
                fontFamily: "Trebuchet MS",
                padding: 5,
                width: "95%",
              }}
            >
              Our Auto-ML engine facilitates the end-to-end ML lifecycle
              starting from the exploratory data analysis (EDA) phase
              (visualizations that are relevant to the type of ML model and use
              case) to a full-fledged and ready-to-operationalize model. There
              are four comprehensive stages to our proprietary ML engine: -
              Auto-EDA - Auto-Model Development - Auto-Model Performance
              Evaluation - Auto-Business Insights Just a few clicks is all that
              is needed to generate an informative EDA, build a powerful model,
              gain insight into the model performance, and receive a compilation
              of business insights that encompass the prior three stages. All
              that needs to be known is your organization’s data and the
              business use case of interest.
            </div>
            <div
              style={{
                height: "0.5px",
                backgroundColor: "lightgray",
                width: "95%",
                marginTop: "10px",
              }}
            ></div>
            {!train && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 25,
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "50%", marginLeft: "17%" }}>
                  <Stepper
                    activeStep={step}
                    connector={
                      <div
                        style={{
                          height: "0.5px",
                          width: "80px",
                          border: "1px solid #cecece",
                        }}
                      ></div>
                    }
                  >
                    {steps.map((label) => (
                      <Step
                        key={label}
                        sx={{
                          "& .MuiStepLabel-root .Mui-completed": {
                            color: "#0aafff", // circle color (COMPLETED)
                          },
                          "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                            {
                              color: "grey.500", // Just text label (COMPLETED)
                            },
                          "& .MuiStepLabel-root .Mui-active": {
                            color: "#067ab4", // circle color (ACTIVE)
                          },
                          "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                            {
                              color: "common.white", // Just text label (ACTIVE)
                            },
                          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text":
                            {
                              fill: "white", // circle's number (ACTIVE)
                            },
                        }}
                      >
                        <StepLabel></StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <div
                  style={{
                    backgroundColor: "#0aafff",
                    color: "white",
                    fontWeight: "16px",
                    padding: 6,
                    borderRadius: "12px",
                    width: step === 3 ? "16vh" : "14.5vh",
                    marginLeft: "7%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (step === 3) {
                      clickedTrain = 1;
                      setTrain(true);
                      start();
                    } else setStep(step + 1);
                  }}
                >
                  {step === 3 ? "Train Model" : "Next"}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "15px",
              }}
            >
              {step == 0 && (
                <div
                  style={{
                    marginLeft: 8,
                    marginTop: 12,
                    borderRadius: 6,
                    display: "flex",
                    // alignItems: 'center',
                    backgroundImage: `url(${"/mlbg.png"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                    width: "85vw",
                    // border: '1px solid #CCC',
                    padding: 6,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      alignItems: "flex-start",
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                      marginLeft: "5%",
                    }}
                  >
                    <div style={{ marginLeft: 8, marginTop: 62 }}>
                      Type of ML Problem
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        marginLeft: 8,
                        fontSize: 18,
                        fontWeight: "500",
                        fontFamily: "Trebuchet MS",
                        padding: 6,
                        textAlign: "left",
                        width: "70%",
                        marginBottom: "20px",
                      }}
                    >
                      The types of ML models. The choice of model also
                      determines the Auto-EDA stage of pipeline
                    </div>
                    <Tooltip
                      title={<Typography fontSize={14}>{typeDesc}</Typography>}
                      placement="right-end"
                      open={showTip}
                    >
                      <Select
                        labelId="demo-select-small"
                        value={selectedMlType}
                        onChange={(e) => setSelectedMlType(e.target.value)}
                        style={{
                          marginLeft: 10,
                          marginTop: 5,
                          marginBottom: 5,
                          width: 300,
                          height: 25,
                          border: "0.5px solid",
                          backgroundColor: "white",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#067AB4",
                        }}
                        sx={{
                          ".MuiSvgIcon-root ": {
                            fill: "#067AB4 !important",
                          },
                        }}
                      >
                        {typeOfMLProblems.map((item, index) => {
                          return (
                            <MenuItem
                              style={{ fontSize: 14 }}
                              onMouseEnter={() => {
                                setShowTip(true);
                                setTypeDesc(item.description);
                              }}
                              onMouseLeave={() => setShowTip(false)}
                              key={index}
                              value={index}
                            >
                              {item.type}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Tooltip>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src={"/mlIcon.png"}
                      style={{
                        resizeMode: "contain",
                        height: "42vh",
                        width: "70%",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                </div>
              )}

              {step == 1 && (
                <div
                  style={{
                    marginLeft: 8,
                    marginTop: 12,
                    borderRadius: 6,
                    display: "flex",
                    // alignItems: 'center',
                    backgroundImage: `url(${"/mlbg.png"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "85vh",
                    width: "85vw",
                    // border: '1px solid #CCC',
                    padding: 6,
                  }}
                >
                  <div
                    style={{
                      marginLeft: 20,
                      marginTop: 12,
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      alignItems: "flex-start",
                      // border: '1px solid #CCC',
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ marginLeft: 8, marginTop: 42 }}>
                      Auto-EDA Input Variables
                    </div>

                    <div
                      style={{
                        marginLeft: 8,
                        fontSize: 16,
                        fontWeight: "500",
                        fontFamily: "Trebuchet MS",
                        padding: 6,
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      Relevant input variables to the Auto-EDA stage for the
                      relevant ML model of your choice
                    </div>

                    <div
                      style={{
                        marginLeft: 8,
                        marginTop: 8,
                        fontSize: 18,
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        alignItems: "flex-start",
                        // border: '1px solid #CCC',
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 6,
                        width: "98%",
                      }}
                    >
                      <div style={{ marginLeft: 8 }}>1 Target Label</div>

                      <div
                        style={{
                          marginLeft: 8,
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "Trebuchet MS",
                          padding: 6,
                          textAlign: "center",
                        }}
                      >
                        The variable that is intended to be predicted by the
                        model
                        {/* (Note: If clustering was selected then this section would
                    need to be phased out) */}
                      </div>

                      <Select
                        labelId="demo-select-small"
                        value={selectedTargetLabel}
                        onChange={(e) => setSelectedTargetLabel(e.target.value)}
                        style={{
                          marginLeft: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          marginBottom: 5,
                          width: 300,
                          height: 25,
                          border: "0.5px solid",
                          backgroundColor: "white",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#067AB4",
                        }}
                        sx={{
                          ".MuiSvgIcon-root ": {
                            fill: "#067AB4 !important",
                          },
                        }}
                      >
                        {modelInputVariables.map((item, index) => {
                          return (
                            <MenuItem
                              style={{ fontSize: 14 }}
                              key={index}
                              value={index}
                            >
                              {item.type}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>

                    <div
                      style={{
                        marginLeft: 8,
                        marginTop: 8,
                        fontSize: 18,
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        alignItems: "flex-start",
                        // border: '1px solid #CCC',
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 6,
                        width: "80%",
                      }}
                    >
                      <div style={{ marginLeft: 8 }}>
                        2 Categorical Features
                      </div>

                      <div
                        style={{
                          marginLeft: 8,
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "Trebuchet MS",
                          padding: 6,
                          textAlign: "left",
                        }}
                      >
                        Relevant categorical features to be visualized
                        individually and/or in-tandem with the label
                      </div>

                      <Select
                        style={{
                          marginLeft: 12,
                          marginBottom: 5,
                          height: 25,
                          width: 300,
                          border: "0.5px solid",
                          backgroundColor: "white",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#067AB4",
                        }}
                        sx={{
                          ".MuiSvgIcon-root ": {
                            fill: "#067AB4 !important",
                          },
                        }}
                        labelId="mutiple-select-label"
                        multiple
                        disableUnderline
                        value={selected}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          style={{
                            height: 35,
                            padding: 8,
                            //  backgroundColor: '#e5e5e5'
                          }}
                          value="all"
                          // classes={{
                          //   root: isAllSelected ? '': ''
                          // }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              //classes={{ indeterminate: classes.indeterminateColor }}
                              checked={isAllSelected}
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < modelTargetLabels.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            // classes={{ primary: classes.selectAllText }}
                            primary="Select All"
                          />
                        </MenuItem>
                        {modelTargetLabels.map((option) => (
                          <MenuItem
                            style={{ height: 30, padding: 10 }}
                            key={option.type}
                            value={option.type}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={selected.indexOf(option.type) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div
                      style={{
                        marginLeft: 8,
                        marginTop: 8,
                        fontSize: 18,
                        fontWeight: "600",
                        fontFamily: "Trebuchet MS",
                        alignItems: "flex-start",
                        // border: '1px solid #CCC',
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 6,
                        width: "80%",
                      }}
                    >
                      <div style={{ marginLeft: 8 }}>
                        3 Quantitative Features
                      </div>

                      <div
                        style={{
                          marginLeft: 8,
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily: "Trebuchet MS",
                          padding: 6,
                          textAlign: "left",
                        }}
                      >
                        Relevant quantitative features to be visualized
                        individually and/or in-tandem with the label
                      </div>

                      <Select
                        style={{
                          marginLeft: 12,
                          marginBottom: 5,
                          height: 25,
                          width: 300,
                          border: "0.5px solid",
                          backgroundColor: "white",
                          borderRadius: 10,
                          fontSize: 12,
                          color: "#067AB4",
                        }}
                        sx={{
                          ".MuiSvgIcon-root ": {
                            fill: "#067AB4 !important",
                          },
                        }}
                        labelId="mutiple-select-label"
                        multiple
                        disableUnderline
                        value={selected2}
                        onChange={handleChange2}
                        renderValue={(selected2) => selected2.join(", ")}
                        MenuProps={MenuProps}
                      >
                        <MenuItem
                          style={{
                            height: 35,
                            padding: 8,
                            //  backgroundColor: '#e5e5e5'
                          }}
                          value="all"
                        >
                          <ListItemIcon>
                            <Checkbox
                              //classes={{ indeterminate: classes.indeterminateColor }}
                              checked={isAllSelected2}
                              indeterminate={
                                selected2.length > 0 &&
                                selected2.length < modelTargetLabels.length
                              }
                            />
                          </ListItemIcon>
                          <ListItemText
                            // classes={{ primary: classes.selectAllText }}
                            primary="Select All"
                          />
                        </MenuItem>
                        {modelTargetLabels.map((option) => (
                          <MenuItem
                            style={{ height: 30, padding: 10 }}
                            key={option.type}
                            value={option.type}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={selected2.indexOf(option.type) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText primary={option.type} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src={"/mlIcon.png"}
                      style={{
                        resizeMode: "contain",
                        height: "55vh",
                        width: "96%",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                </div>
              )}

              {step == 2 && (
                <div
                  style={{
                    marginLeft: 8,
                    marginTop: 12,
                    borderRadius: 6,
                    display: "flex",
                    // alignItems: 'center',
                    backgroundImage: `url(${"/mlbg.png"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                    width: "85vw",
                    // border: '1px solid #CCC',
                    padding: 6,
                  }}
                >
                  <div
                    style={{
                      marginLeft: 20,
                      marginTop: 12,
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      alignItems: "flex-start",
                      // border: '1px solid #CCC',
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ marginLeft: 12, marginTop: 30 }}>
                      Model Input Variables
                    </div>

                    <div
                      style={{
                        marginLeft: 20,
                        fontSize: 16,
                        fontWeight: "500",
                        fontFamily: "Trebuchet MS",
                        padding: 6,
                        textAlign: "left",
                        width: "80%",
                      }}
                    >
                      Relevant input variables to be used as predictors of the
                      ML model of your choice
                    </div>

                    <Select
                      style={{
                        marginTop: 12,
                        marginLeft: 12,
                        marginBottom: 5,
                        height: 25,
                        width: 300,
                        border: "0.5px solid",
                        backgroundColor: "white",
                        borderRadius: 10,
                        fontSize: 12,
                        color: "#067AB4",
                      }}
                      labelId="mutiple-select-label"
                      multiple
                      disableUnderline
                      value={selected3}
                      onChange={handleChange3}
                      renderValue={(selected3) => selected3.join(", ")}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        style={{
                          height: 35,
                          padding: 8,
                          //  backgroundColor: '#e5e5e5'
                        }}
                        value="all"
                        // classes={{
                        //   root: isAllSelected ? '': ''
                        // }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            //classes={{ indeterminate: classes.indeterminateColor }}
                            checked={isAllSelected3}
                            indeterminate={
                              selected3.length > 0 &&
                              selected3.length < modelTargetLabels.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          // classes={{ primary: classes.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {modelTargetLabels.map((option) => (
                        <MenuItem
                          style={{ height: 30, padding: 10 }}
                          key={option.type}
                          value={option.type}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={selected3.indexOf(option.type) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText primary={option.type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <img
                      src={"/mlIcon.png"}
                      style={{
                        resizeMode: "contain",
                        height: "44vh",
                        width: "80%",
                      }}
                    />
                  </div>
                </div>
              )}

              {step == 3 && !train && (
                <div
                  style={{
                    marginLeft: 8,
                    marginTop: 12,
                    borderRadius: 6,
                    display: "flex",
                    // alignItems: 'center',
                    backgroundImage: `url(${"/mlbg.png"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                    width: "85vw",
                    // border: '1px solid #CCC',
                    padding: 6,
                  }}
                >
                  <div
                    style={{
                      marginLeft: 30,
                      marginTop: 12,
                      marginBottom: 8,
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "Trebuchet MS",
                      alignItems: "flex-start",
                      // border: '1px solid #CCC',
                      padding: 6,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ marginLeft: 12, marginTop: 30 }}>
                      Model Target Label
                    </div>

                    <div
                      style={{
                        marginLeft: 8,
                        fontSize: 16,
                        fontWeight: "500",
                        fontFamily: "Trebuchet MS",
                        padding: 6,
                        textAlign: "left",
                        width: "80%",
                        marginBottom: "20px",
                      }}
                    >
                      The variable that the ML model of your choice is intended
                      to predict
                    </div>
                    {/* <div
                  style={{
                    marginTop: -8,

                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Trebuchet MS',
                    padding: 6
                  }}
                >
                  2. Keep this in mind, if they chose “Clustering”, then there
                  is no target variable. Hence, the target variable drop down
                  should fade out if they chose “Clustering”.
                </div> */}

                    <Select
                      style={{
                        marginLeft: 12,
                        height: 25,
                        width: 300,
                        border: "0.5px solid",
                        backgroundColor: "white",
                        borderRadius: 10,
                        fontSize: 12,
                        color: "#067AB4",
                      }}
                      sx={{
                        ".MuiSvgIcon-root ": {
                          fill: "#067AB4 !important",
                        },
                      }}
                      labelId="mutiple-select-label"
                      disableUnderline
                      value={selected4}
                      onChange={handleChange4}
                      renderValue={(selected4) => selected4}
                      MenuProps={MenuProps}
                    >
                      {modelTargetLabels.map((option) => (
                        <MenuItem
                          style={{ height: 30, padding: 10 }}
                          key={option.type}
                          value={option.type}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={selected4.indexOf(option.type) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText primary={option.type} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div
                    style={{
                      width: "40%",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      top: "4px",
                    }}
                  >
                    <img
                      src={"/mlIcon.png"}
                      style={{
                        resizeMode: "contain",
                        height: "42vh",
                        width: "80%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* {step == 4 && (
              <Button
                sx={{ bgcolor: '#0c0c0c', color: '#CCC', mt: 2 }}
                onClick={() => {
                  clickedTrain = 1
                  start()
                }}
                variant='outlined'
              >
                Train Model
              </Button>
            )} */}
            {progressComplete === false && train && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignSelft: "center",
                }}
              >
                <Box style={{}} sx={{ width: "60%", mt: 3, ml: -5 }}>
                  <div
                    style={{
                      fontSide: "15px",
                      fontWeight: "600",
                      color: "#067AB4",
                      marginBottom: "8px",
                    }}
                  >
                    Processing...
                  </div>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              </div>
            )}
          </div>
          {trainModel && (
            <div
              style={{
                display: "flex",
                marginTop: -30,
                flexWrap: "wrap",
                width: width,
                height: height - 300,
              }}
            >
              <div
                style={{
                  marginLeft: "7.5%",
                  marginTop: 8,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  //  backgroundColor: '#CCC',
                  //  height: height,
                  width: width,
                  flexWrap: "wrap",
                }}
              >
                {dashboards &&
                  dashboards.map((e, i) => (
                    <>
                      <div
                        style={{
                          backgroundColor: "white",
                          border: "1.17215px solid #CBC6C6",
                          borderRadius: "20px",
                          boxShadow:
                            "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.25)",
                          height: "40vh",
                          width: "28vw",
                          marginTop: "4%",
                          marginLeft: "1.4%",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push({
                            pathname:
                              "/Main_Dashboard/" + global.subscription_id,
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
                              justifyContent: "center",
                              marginBottom: "10px",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: "500",
                                fontSize: "13px",
                                borderRadius: "12px",
                                // marginLeft: '25%'
                              }}
                            >
                              {e.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
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
                      Are you sure you want to delete this dashboard? This
                      action cannot be undone.
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
                          deleteDashboard();
                          setDeleteModal(false);
                          // getAllMLDashboards()
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
                  <div style={{ marginBottom: 20, marginRight: 20 }}>
                    <Button
                      sx={{
                        bgcolor: "#0c0c0c",
                        color: "#CCC",
                        fontFamily: "Trebuchet MS",
                      }}
                      onClick={() => {
                        reportIssue();
                        setTimeout(() => setReportIssueModal(false), 2200);
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
                        bgcolor: "#0c0c0c",
                        color: "#CCC",
                        fontFamily: "Trebuchet MS",
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
                        bgcolor: "#0c0c0c",
                        color: "#CCC",
                        fontFamily: "Trebuchet MS",
                      }}
                      onClick={() => {
                        saveDesign(1);
                        setIsSaveDashboard(false);
                        // getAllDashboards()
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

          {inputModal && (
            <Modal
              open={inputModal}
              onClose={() => setInputModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle2}>
                <>
                  <CloseIcon
                    onClick={() => setInputModal(false)}
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
                      fontSize: 16,
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    Enter content text file name stored in S3
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
                      // placeholder={"Enter users, groups or emails"}
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                    {/* <div style={{ marginTop: 15, marginLeft: 8 }}>
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
                      sendEmail();
                      setSentSuccess(true);
                      setShareModal(false);
                    }}
                    variant="outlined"
                  >
                    Share
                  </Button> */}
                  </div>

                  <div
                    style={{
                      marginLeft: 25,
                      marginTop: 25,
                      fontSize: 16,
                      fontFamily: "Trebuchet MS",
                    }}
                  >
                    Enter image names to be added in dashboard stored in S3
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
                    // placeholder={
                    //   "I thought you might find this card interesting."
                    // }
                    value={imageNames}
                    onChange={(e) => setImageNames(e.target.value)}
                    cols={40}
                    rows={10}
                  />

                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      width: "25%",
                      mt: 2,
                      mb: 2,
                      display: "flex",
                      alignSelf: "flex-end",
                      mr: 4,
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      setNext(true);
                      setInputModal(false);
                    }}
                    variant="outlined"
                  >
                    Next
                  </Button>
                </>
              </Box>
            </Modal>
          )}

          <Dialog
            open={createSuccess}
            onClose={() => setCreateSuccess(false)}
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
              New Dashboard Created Successfully
            </Alert>
          </Dialog>
        </>
      ) : (
        history.push("/Login")
      )}
    </>
  );
};

export default AutoMLEngine2;
