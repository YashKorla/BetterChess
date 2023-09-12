import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material';

const Appbar = () => {
  const theme = useTheme()

  const Topbar = styled(AppBar)({
    zIndex: 3,
    boxShadow:'none',
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    height:'90px',
    padding: '32px 30px',
    [theme.breakpoints.up('laptop')]: {
      height:'120px',
      padding: '32px 40px',
    },
  })

  const TopbarText = styled(Typography)({
    fontWeight:700,
    fontSize:'30px',
    lineHeight:'47px',
    [theme.breakpoints.up('laptop')]: {
      fontSize:'40px',
    },
  })

  const Login = styled(Button)({
      border:'solid white 1px',
      width:'100px',
      height:'42px',
  })


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