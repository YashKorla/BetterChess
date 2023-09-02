import React from 'react'
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styled from '@emotion/styled';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';

const Topbar = styled(AppBar)({
    zIndex: 1,
    backgroundColor:'#171719',
    height:'80px',
    boxShadow:'none'
})

const TopbarText = styled(Typography)({
    flexGrow: 1 ,
    fontWeight:700,
    fontSize:'32px',
    paddingTop:'12px'

})

const TopbarLogin = styled(Button)({
    backgroundColor:'#222226',
    border:'solid white 1px',
    marginTop:'12px',
    width:'100px',
    height:'42px',
    marginRight:'15px',
})

const Appbar = () => {
  return (
   <Topbar position="fixed">
        <Toolbar>
          <TopbarText variant="h6">
            BetterChess
          </TopbarText> 
          <TopbarLogin  variant='contained'>Login</TopbarLogin>

        </Toolbar>
      </Topbar>
  )
}

export default Appbar