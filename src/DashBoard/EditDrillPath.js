import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import configData from "../config.json";

// Auth context
import { AuthContext } from "../context";

const EditDrillPath = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;

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

  const history = useHistory();
  const authContext = useContext(AuthContext);

  const location = useLocation();
  const [drills, setDrills] = useState([]);

  const widget_drillViews = () => {
    axios
      .post(
        configData.API_URL + "personalAccount/database/widget_getdrill_views",
        {
          parent_id: location.state,
        },

        {}
      )
      .then((response) => {
        //console.log('response', response.data.data)
        setDrills(response.data.data);
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
    // console.log('check', location.state)
    widget_drillViews();
  }, [location]);

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer hideSideBar={true} />

          <div
            style={{
              marginTop: -80,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                marginLeft: 100,
                fontSize: 20,
                fontWeight: "600",
                fontFamily: "Trebuchet MS",
              }}
            >
              DRILL PATH
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 0,
              marginLeft: "6%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: width,
              flexWrap: "wrap",
            }}
          >
            {drills &&
              drills.map((e, i) => (
                <>
                  <div
                    style={{
                      cursor: "pointer",
                      marginLeft: i === 0 ? 15 : 60,
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      height: 110,
                      width: i === 0 ? "90%" : "86%",
                      backgroundColor: i === 0 ? "white" : "#efefef",
                      border: "0.5px solid #ccc",
                      boxShadow: "1px 1.1px 0.5px  #d1d0cf",
                      borderRadius: 4 + "px",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                    }}
                    onClick={() =>
                      history.push({
                        pathname:
                          "/Widget Dashboard/" +
                          e.id +
                          "/" +
                          global.subscription_id,
                        state: { data: e, id: e.id, drill: 1 },
                      })
                    }
                  >
                    <div
                      style={{
                        marginLeft: 5,
                        marginTop: 4,
                        height: "200px",
                        display: "flex",
                      }}
                    >
                      <img src={"/Barchart01.png"} width={110} height={100} />
                      <div
                        style={{
                          marginTop: 4,
                          marginLeft: 20,
                          fontWeight: "bold",
                          width: "200px",
                          overflow: "auto",
                        }}
                      >
                        {e.name}
                      </div>
                      <div
                        style={{
                          marginLeft: 20,
                          marginTop: 4,
                          height: 90,
                          width: i == 0 ? 900 : 780,
                          overflow: "auto",
                        }}
                      >
                        {e.discription}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default EditDrillPath;
