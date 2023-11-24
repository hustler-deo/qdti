import React, { useState, useEffect, useRef, Select, alert } from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import configData from "../config.json";

const Tree = props => {
  const [opentree, setOpentree] = React.useState(false)
  const [allSchemas, setAllSchemas] = React.useState(props.schemas)
  const [rerender, setRerender] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [data, setData] = useState('hello')

  const handleClick = Id => {
    setOpentree(Id)
  }

  const showTables = (dbname, index) => {
    axios
      .post(
        configData.API_URL + 'personalAccount/database/show_tables',
        {
          id: localStorage.getItem('ConnectionId'),
          dbname: dbname
        },
        {}
      )
      .then(response => {
        console.log('show tables api', response.data.data)
        // tree[index].push(response.data.data)
        setSelectedIndex(index)
        console.log('T-', allSchemas[index].children)
        //    var t = tree[index].children.push(response.data.data)

        var p = allSchemas[index].children
        response.data.data.forEach((o, i) => {
          o.nodeId = i + 1
          p.push(o)
        })
        // console.log(p)
        console.log('PP', allSchemas)
        setAllSchemas(allSchemas)
        setData('BYE')
        return response
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message)
        }
      })
  }

  useEffect(() => {
    console.log('HERE')
    // setAllSchemas(props.schemas)
  }, [])

  useEffect(() => {
    console.log('HERE....')
    setAllSchemas(props.schemas)
  }, [allSchemas])

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 350,
        bgcolor: 'background.paper',
        maxHeight: 400,
        overflow: 'scroll'
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      {allSchemas.map((row, index) => (
        <>
          <ListItemButton
            style={{ height: 20 }}
            key={row.nodeId}
            onClick={() => {
              console.log('GGG', row.children, index)
              if (row.children[0] == undefined) showTables(row.label, index)

              handleClick(row.nodeId)
            }}
          >
            <ListItemText primary={row.label} />
            {opentree === row.nodeId ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={opentree === row.nodeId} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {row.children.map((row, index) => (
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    style={{ color: 'black' }}
                    primary={
                      row['Tables_in_' + allSchemas[selectedIndex].label]
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      ))}
    </List>
  )
}

export default Tree
