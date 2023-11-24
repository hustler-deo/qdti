import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@mui/material/Button'
import login from './login.jpeg'
import Checkbox from '@mui/material/Checkbox'

import Input from '@mui/material/Input'

import InputAdornment from '@mui/material/InputAdornment'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LockOutlined from '@mui/icons-material/LockOutlined'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
const ariaLabel = { 'aria-label': 'description' }

export default function Login (props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const authenticate = () => {
    if (userName === 'rupalishah@qualidatai.com' && password === 'asd123')
      history.push('/Dashboard')
    else if (
      userName === 'shrikant4qualidatai@qualidatai.com' &&
      password === 'asd123'
    )
      history.push('/Dashboard')
    else window.alert('Please Enter valid username/password')
  }
  // const loginsub = () => {
  //   console.log('entered login', userName)
  //   if (userName === '') {
  //     window.alert('Please check your username !')
  //     return
  //   }
  //   if (password === '') {
  //     window.alert('Please check your password !')
  //     return
  //   }
  // }

  useEffect(() => {
    console.log('USER NAME', userName, password)
  }, [userName, password])

  return (
    <>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#fff',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          position: 'absolute'
        }}
      >
        <div
          style={{
            width: '60%',
            height: '80%',
            backgroundImage: `url(${login})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            marginLeft: '10%',
            marginTop: '3%'
          }}
        ></div>
        <div style={{ width: '40%', height: '100%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 550,
              width: 400,
              borderRadius: 10,
              marginTop: 130,
              backgroundColor: '#F3F3F3',
              boxShadow: '1px 3px 1px #CCC'
            }}
          >
            <text
              style={{
                fontSize: 40,
                fontFamily: 'Trebuchet MS',
                color: '#747574',
                fontWeight: 'bold',
                marginBottom: 50,
                marginTop: -20
              }}
            >
              Login
            </text>

            <Input
              placeholder='Username'
              value={userName}
              inputProps={ariaLabel}
              disableUnderline={true}
              // onChange={event =>setUserName ({text:event.target.value})}
              onChange={e => setUserName(e.target.value)}
              style={{
                // border: '1px solid grey',
                borderRadius: 5,
                width: 300,
                height: 38,
                display: 'flex',
                alignSelf: 'center',
                marginBottom: 30,
                paddingLeft: 5,
                backgroundColor: '#fff',
                fontSize: 12,
                color: '#666363'
              }}
              startAdornment={
                <InputAdornment position='start' style={{ color: '#069' }}>
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              }
            />
            <Input
              placeholder='Password'
              value={password}
              type='password'
              inputProps={ariaLabel}
              disableUnderline={true}
              // onChange={ (event : any) =>setPassword ({ event.target.value})}
              onChange={e => setPassword(e.target.value)}
              secureEntry={true}
              style={{
                // border: '1px solid grey',
                borderRadius: 5,
                width: 300,
                height: 38,
                display: 'flex',
                alignSelf: 'center',
                marginBottom: 60,
                paddingLeft: 5,
                backgroundColor: '#fff',
                fontSize: 12,
                color: '#666363'
              }}
              startAdornment={
                <InputAdornment position='start' style={{ color: '#069' }}>
                  <LockOutlined />
                </InputAdornment>
              }
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: -45
              }}
            >
              <div>
                <Checkbox {...label} disabled checked size='small' />
                <text style={{ fontSize: 14 }}>Remember me</text>
              </div>
              <text
                style={{
                  fontSize: 14,
                  marginRight: 15,
                  marginBottom: 2,
                  color: '#069'
                }}
              >
                Forgot password?
              </text>
            </div>
            <Button
              onClick={() => authenticate()}
              variant='contained'
              size='medium'
              style={{
                backgroundColor: '#069',
                width: 170,
                display: 'flex',
                alignSelf: 'center',
                marginTop: 45
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
