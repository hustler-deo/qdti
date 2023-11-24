/***
 *
 *   DASHBOARD
 *   Template dashboard example demonstrating various components inside a view.
 *
 **********/

import React, { Component } from 'react'

import { Animate } from '../Components/lib'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import MiniDrawer from '../MiniDrawer'
// Be sure to include styles at some point, probably during your bootstrapping

export default class myFlows extends Component {
  // const [value, setValue] = React.useState('one');

  render () {
    // const handleChange = (event, newValue) => {
    //   this.setState({value:newValue});
    // };
    return (
      <>
        <MiniDrawer />
        <Animate type='pop'>
          <Box sx={{ width: '100%', marginLeft: '100px' }}>
            <Tabs
              // value={value}
              // onChange={handleChange}
              aria-label=' label tabs example'
            >
              <Tab value='one' label='Data Flows' />
              <Tab value='two' label='Quick Data Flows' />
              <Tab value='three' label='Big Data Flows' />
            </Tabs>
          </Box>
        </Animate>
      </>
    )
  }
}
