import React, { useRef, useEffect, useState, useContext } from "react";
import MiniDrawer from "../MiniDrawer";
import axios from "axios";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";

import configData from "../config.json";
// Auth context
import { AuthContext } from "../context";

const MyAccount = () => {
  let height, width;
  height = window.innerHeight;
  width = window.innerWidth;
  const location = useLocation();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // console.log("IDD", localStorage.getItem("account_id"));
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getMyDetails?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        console.log("getMyDetails response", response.data);

        setName(response.data.data[0]?.name);
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

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
                  marginLeft: "10.5%",
                  fontFamily: "Trebuchet MS",
                }}
              >
                My Account
              </h2>
            </div>

            {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Animate type='pop'>
            <Box
              sx={{
                width: '650px',
                margin: 'auto'
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                aria-label=' label tabs example'
              >
                <Tab
                  value={0}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  label='Profile'
                  centered
                />
                <Tab
                  value={1}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  label='Password'
                  centered
                />
                <Tab
                  value={2}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  label='Dashboards'
                  centered
                />
                <Tab
                  value={3}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  label='Widgets'
                  centered
                />
                  <Tab
                  value={4}
                  sx={{ textTransform: 'none', fontSize: '18px' }}
                  label='Files'
                  centered
                />
              </Tabs>
            </Box>
          </Animate>

          {value === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                width: '350px'
              }}
            >
              <div
                style={{
                  marginTop: '50px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  color: '#067AB4',
                  fontSize: '20px',
                  alignSelf: 'flex-start'
                }}
              >
                Edit Your Profile Information
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                  alignSelf: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontWeight: '500',
                    fontFamily: 'Trebuchet MS',
                    color: '#067AB4',
                    fontSize: '15px'
                  }}
                >
                  YOUR NAME
                </div>
                <div style={{ color: 'red', marginLeft: '5px' }}>*</div>
              </div>
              <input
                type='text'
                style={{
                  marginTop: '10px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  border: '0.2px solid #6f706f',
                  color: '#6f706f'
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                  alignSelf: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontWeight: '500',
                    fontFamily: 'Trebuchet MS',
                    color: '#067AB4',
                    fontSize: '15px'
                  }}
                >
                  EMAIL ADDRESS
                </div>
                <div style={{ color: 'red', marginLeft: '5px' }}>*</div>
              </div>
              <input
                type='text'
                style={{
                  marginTop: '10px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  border: '0.2px solid #6f706f',
                  color: '#6f706f'
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px',
                  alignSelf: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontWeight: '500',
                    fontFamily: 'Trebuchet MS',
                    color: '#067AB4',
                    fontSize: '15px'
                  }}
                >
                  ACCOUNT NAME
                </div>
                <div style={{ color: 'red', marginLeft: '5px' }}>*</div>
              </div>
              <input
                type='text'
                style={{
                  marginTop: '10px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  border: '0.2px solid #6f706f',
                  color: '#6f706f'
                }}
              />
              <div
                style={{
                  marginTop: '20px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  color: 'white',
                  fontSize: '15px',
                  backgroundColor: '#00A0F8',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Save
              </div>
              <div
                style={{
                  marginTop: '20px',
                  fontWeight: '500',
                  fontFamily: 'Trebuchet MS',
                  color: '#6f706f',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                  cursor: 'pointer'
                }}
              >
                Close Your Account
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                width: '350px'
              }}
            >
              <div
                style={{
                  marginTop: '50px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  color: '#067AB4',
                  fontSize: '20px',
                  alignSelf: 'flex-start'
                }}
              >
                Update Your Password
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '30px',
                  alignSelf: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontWeight: '500',
                    fontFamily: 'Trebuchet MS',
                    color: '#067AB4',
                    fontSize: '15px'
                  }}
                >
                  CREATE NEW PASSWORD
                </div>
                <div style={{ color: 'red', marginLeft: '5px' }}>*</div>
              </div>

              <input
                type='password'
                style={{
                  marginTop: '30px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  border: '0.2px solid #6f706f',
                  color: '#6f706f'
                }}
              />
              <div
                style={{
                  marginTop: '20px',
                  fontWeight: '600',
                  fontFamily: 'Trebuchet MS',
                  color: 'white',
                  fontSize: '15px',
                  backgroundColor: '#00A0F8',
                  height: '50px',
                  width: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Save Password
              </div>
            </div>
          )}
        </div> */}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                // height: "72vh",
                // width: "42vw",
                borderRadius: "15px",
                marginTop: 30,
                // backgroundColor: "#C1D9EC",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "38vw",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    height: "25vh",
                    backgroundColor: "white",
                    width: "38vw",
                    borderRadius: "15px",
                    boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div
                    style={{
                      marginTop: 30,
                      marginLeft: 30,
                      textAlign: "left",
                      color: "#0D4669",
                      fontWeight: "500",
                    }}
                  >
                    Accounts
                  </div>
                </div>

                <div
                  style={{
                    height: "35vh",
                    backgroundColor: "white",
                    width: "38vw",
                    borderRadius: "15px",
                    boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div
                    style={{
                      marginTop: 30,
                      marginLeft: 30,
                      textAlign: "left",
                      color: "#0D4669",
                      fontWeight: "500",
                    }}
                  >
                    Bills
                  </div>
                </div>
              </div> */}

              <div
                style={{
                  height: "70vh",
                  backgroundColor: "white",
                  width: "42vw",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 6.50467px 8.6729px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${"/bg2.jpeg"})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "100px",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    boxShadow: "0px 1.5px 2px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div
                    style={{
                      marginTop: 20,
                      marginLeft: 30,
                      textAlign: "left",
                      color: "white",
                      fontSize: 18,
                      fontFamily: "Trebuchet MS",
                      fontWeight: "500",
                    }}
                  >
                    My Profile
                  </div>
                </div>
                <div
                  style={{
                    height: "75px",
                    width: "75px",
                    borderRadius: "50%",
                    backgroundColor: "lightgray",
                    alignSelf: "center",
                    marginTop: 25,
                  }}
                >
                  <img
                    src={"/placeholder.png"}
                    style={{
                      resizeMode: "contain",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 30,
                      justifyContent: "center",
                    }}
                  >
                    {/* <div
                    style={{
                      height: "30px",
                      width: "80px",
                      borderRadius: "12px",
                      border: "0.5px solid lightgray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  > */}
                    <div
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        fontFamily: "Trebuchet MS",
                        color: "#0D4669",
                        fontWeight: "600",
                      }}
                    >
                      Name
                    </div>
                    {/* </div> */}
                    <div
                      style={{
                        height: "30px",
                        width: "60%",
                        borderRadius: "12px",
                        border: "0.5px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 30,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          fontSize: 15,
                          fontFamily: "Trebuchet MS",
                          color: "#067AB4",
                          marginLeft: 20,
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginTop: 20,
                      justifyContent: "center",
                    }}
                  >
                    {/* <div
                    style={{
                      height: "30px",
                      width: "80px",
                      borderRadius: "12px",
                      border: "0.5px solid lightgray",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  > */}
                    <div
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        fontFamily: "Trebuchet MS",
                        color: "#0D4669",
                        fontWeight: "600",
                      }}
                    >
                      Email
                    </div>
                    {/* </div> */}
                    <div
                      style={{
                        height: "30px",
                        width: "60%",
                        borderRadius: "12px",
                        border: "0.5px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 30,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          fontSize: 15,
                          fontFamily: "Trebuchet MS",
                          color: "#067AB4",
                          marginLeft: 20,
                        }}
                      >
                        {email}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    height: "30px",
                    width: "90px",
                    borderRadius: "30px",
                    border: "0.5px solid lightgray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: 30,
                    cursor: "pointer",
                    backgroundColor: "#0BAFFF",
                    boxShadow: "0px 3.50467px 6.6729px rgba(0, 0, 0, 0.25)",
                  }}
                  onClick={() => history.push("/Profile")}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontFamily: "Trebuchet MS",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Edit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("Login")
      )}
    </>
  );
};

export default MyAccount;
