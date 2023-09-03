import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const Topbar = styled(AppBar)({
    zIndex: 1,
    height:'120px',
    boxShadow:'none',
    padding: '32px 40px',
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
})

const TopbarText = styled(Typography)({
    fontWeight:700,
    fontSize:'40px',
    lineHeight:'47px',
})

const Login = styled(Button)({
    border:'solid white 1px',
    width:'100px',
    height:'42px',
})

const Appbar = () => {
  return (
   <Topbar position="fixed">
      <TopbarText>
        BetterChess
      </TopbarText> 
      <Login  variant='contained' color='secondary'>Login</Login>
    </Topbar>
  )
}

export default Appbar