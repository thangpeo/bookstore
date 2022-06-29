import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import Login from './Login'
import Register from './Register'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      hidden={value !== index}
      {...other}
    >
      {value === index && (<div>{children}</div>)}
    </Box>
  )
}

const Auth = ({ type = 'login' }) => {
  const [curTab, setCurTab] = React.useState(0)
  const [curTabComponent, setCurTabComponent] = React.useState(0)
  const handleChange = (event, newValue) => {
    setCurTab(newValue);
  }

  React.useEffect(() => {
    let newTab = type === 'login' ? 0 : 1
    setCurTab(newTab)
  }, [type])


  return (
    <Box sx={{ width: 400, maxWidth: '100%', mx: 'auto', bgcolor: 'white', minHeight: 200, borderRadius: 1 }}>
      <TabPanel value={curTabComponent} index={0} >
        <Tabs
          value={curTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"

        >
          <Tab label="Đăng nhập" />
          <Tab label="Đăng ký" />
        </Tabs>
        <Box>
          <TabPanel value={curTab} index={0} >
            <Login goToForgotPassword={() => setCurTabComponent(1)} />
          </TabPanel>
          <TabPanel value={curTab} index={1} >
            <Register onRegisterSuccess={() => setCurTab(0)} />
          </TabPanel>
        </Box>
      </TabPanel>
      <TabPanel value={curTabComponent} index={1} >
        Quen mat khau
        <Box onClick={() => setCurTabComponent(0)}>tro ve</Box>
      </TabPanel>
    </Box>
  )
}

export default Auth