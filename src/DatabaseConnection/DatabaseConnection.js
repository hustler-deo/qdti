import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
// import { createTheme, ThemeProvider } from '@mui/material/styles'

// const theme = createTheme({
//   status: {
//     danger: '#e53e3e'
//   },
//   palette: {
//     primary: {
//       main: '#32a852',
//       darker: '#32a852'
//     },
//     neutral: {
//       main: '#1d1f1d',
//       contrastText: '#fff'
//     }
//   }
// })

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 570,
    width: 1300
  }
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'))

export default function DatabaseConnection () {
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [connection, setConnection] = useState()
  const [method, setMethod] = useState()
  const [host, setHost] = useState()
  const [port, setPort] = useState()
  const [username, setUsername] = useState()
  const [schema, setSchema] = useState()

  function openModal () {
    setIsOpen(true)
  }

  function afterOpenModal () {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal () {
    setIsOpen(false)
  }

  const printButtonLabel = event => {
    console.log(event.target.name)
    //do some stuff here
  }

  function sayHello () {
    alert('You clicked me!')
  }
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div style={{}}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 300,
              bgcolor: 'lightgrey',
              height: 530,
              border: '1px solid grey',
              borderRadius: 1
            }}
          >
            <nav aria-label='main mailbox folders'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary='MySQL Connections' />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
            <Divider />
            <nav aria-label='secondary mailbox folders'>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary='Trash' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component='a' href='#simple-list'>
                    <ListItemText primary='Spam' />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>

        <form>
          <div style={{ marginLeft: 320, marginTop: -535 }}>
            <label>
              Connection Name:
              <input
                type='text'
                value={connection}
                onChange={e => setConnection(e.target.value)}
                style={{
                  width: '20%',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  paddingRight: 610,
                  marginLeft: 20,
                  marginBottom: 20
                }}
              />
            </label>
          </div>

          <div
            style={{
              border: '1px solid grey',
              borderRadius: 8 + 'px',
              borderColor: 'grey',
              height: 475,
              marginLeft: 320,
              marginTop: 10,
              paddingTop: 0,
              paddingBottom: 4,
              marginBottom: 10
            }}
          >
            <div style={{ marginLeft: 265, marginTop: -15 }}>
              <ButtonGroup
                variant='contained'
                size='small'
                aria-label='small button group'
              >
                {/* <ThemeProvider theme={theme}> */}
                <Button>Connection</Button>
                <Button>Remote Management</Button>
                <Button>System Profile</Button>
                {/* </ThemeProvider> */}
              </ButtonGroup>
            </div>
            <div style={{ marginLeft: 60, marginTop: 17 }}>
              <label>
                Connection Method:
                <input
                  type='text'
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  style={{
                    width: '20%',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    paddingRight: 400,
                    marginLeft: 5,
                    marginBottom: 20
                  }}
                />
              </label>
            </div>
            <div
              style={{
                border: '1px solid grey',
                marginLeft: 30,
                height: 320,
                borderRadius: 8 + 'px',
                borderColor: 'grey',
                marginTop: 10,
                paddingTop: 10,
                width: 900,
                paddingBottom: 10
              }}
            >
              <div style={{ marginLeft: 304, marginTop: -25 }}>
                <ButtonGroup
                  variant='contained'
                  size='small'
                  aria-label='small button group'
                >
                  {/* <ThemeProvider theme={theme}> */}
                  <Button>Parameters</Button>
                  <Button>SSL</Button>
                  <Button>Advanced</Button>
                  {/* </ThemeProvider> */}
                </ButtonGroup>
              </div>
              <div style={{ marginLeft: 100, marginTop: 40 }}>
                <label>
                  Hostname:
                  <input
                    type='text'
                    value={host}
                    onChange={e => setHost(e.target.value)}
                    style={{
                      width: '30%',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      marginLeft: 5
                    }}
                  />
                </label>
                <label style={{ marginLeft: 20 }}>
                  Port:
                  <input
                    type='text'
                    value={port}
                    onChange={e => setPort(e.target.value)}
                    style={{
                      width: '30%',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      marginLeft: 5,
                      paddingLeft: 19
                    }}
                  />
                </label>
              </div>

              <div style={{ marginLeft: 100, marginTop: 20 }}>
                <label>
                  Username:
                  <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{
                      width: '30%',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      paddingRight: 325,
                      marginLeft: 5
                    }}
                  />
                </label>
              </div>

              <div style={{ marginLeft: 100, marginTop: 20 }}>
                <label>
                  Password:
                  {/* <button
                    onClick={sayHello}
                    style={{
                      backgroundColor: '#606060',
                      color: 'white',
                      fontSize: '15px',
                      padding: '5px 30px',
                      borderRadius: 8 + 'px',
                      //margin: '5px 0px',
                      cursor: 'pointer',
                      marginLeft: 20
                    }}
                  >
                    Store in Keychain...
                  </button> */}
                  <Button
                    variant='contained'
                    size='small'
                    style={{ marginLeft: 10, marginRight: 10 }}
                  >
                    Store in Keychain...
                  </Button>
                  <Button
                    variant='contained'
                    size='small'
                    style={{ marginLeft: 10 }}
                  >
                    Clear
                  </Button>
                  {/* <button
                    onClick={sayHello}
                    style={{
                      backgroundColor: '#606060',
                      color: 'white',
                      fontSize: '15px',
                      padding: '5px 30px',
                      borderRadius: 8 + 'px',
                      //margin: '5px 0px',
                      cursor: 'pointer',
                      marginLeft: 25
                    }}
                  >
                    Clear
                  </button> */}
                </label>
              </div>

              <div style={{ marginLeft: 65, marginTop: 20 }}>
                <label>
                  Default Schema:
                  <input
                    type='text'
                    value={schema}
                    onChange={e => setSchema(e.target.value)}
                    style={{
                      width: '30%',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      paddingRight: 310,
                      marginLeft: 5
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>

        <div>
          {/* <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',
              cursor: 'pointer'
            }}
          >
            Move Down
          </button> */}

          <Button variant='contained' size='small' style={{ marginRight: 10 }}>
            New
          </Button>
          <Button variant='contained' size='small' style={{ marginRight: 10 }}>
            Delete
          </Button>

          <Button variant='contained' size='small' style={{ marginRight: 10 }}>
            Duplicate
          </Button>

          <Button variant='contained' size='small' style={{ marginRight: 10 }}>
            Move Up
          </Button>

          <Button variant='contained' size='small' style={{ marginRight: 590 }}>
            Move Down
          </Button>

          <Button variant='contained' size='small' style={{ marginRight: 10 }}>
            Test Connection
          </Button>

          {/* <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',
              cursor: 'pointer'
            }}
          >
            Move Down
          </button>

          <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',
              cursor: 'pointer'
            }}
          >
            Move Down
          </button>

          <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',
              cursor: 'pointer'
            }}
          >
            Move Down
          </button>

          <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',
              cursor: 'pointer'
            }}
          >
            Move Down
          </button>

          <button
            onClick={sayHello}
            style={{
              backgroundColor: '#606060',
              color: 'white',
              fontSize: '15px',
              padding: '5px 30px',
              borderRadius: 8 + 'px',
              //margin: '5px 0px',

              cursor: 'pointer'
            }}
          >
            Test Connection
          </button> */}

          <Button variant='contained' size='small' onClick={closeModal}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  )
}
