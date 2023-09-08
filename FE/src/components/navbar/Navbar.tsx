import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Box  from '@mui/material/Box';
import styled from '@emotion/styled';
import {useTheme} from '@mui/material/styles';
import { ListItemButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const navitems=[
  {label:'Play',route:'/play'},
  {label:'Variants',route:'/variants'},
  {label:'Puzzles',route:'/puzzles'},
  {label:'Leaderboard',route:'/leaderboard'},
  {label:'Friends',route:'/friends'},
]

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  const ListText=styled(Typography)({
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    [theme.breakpoints.up('laptop')]: {
      fontSize:'32px',
    },
  })
  
  const AccountAvatar=styled(Avatar)({
    height:'67px',
    width:'67px',
    marginRight:'16px',
  })
  
  const AccountText=styled(Typography)({
    fontWeight:700,
    fontSize:'24px',
    color: 'white',
    [theme.breakpoints.up('laptop')]: {
      fontSize:'28px',
    },
  });
  
  const CustomToolbar=styled(Box)({
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    height:'100%',
    padding: '90px 0 50px 15px',
    [theme.breakpoints.up('laptop')]: {
      padding: '120px 0 50px 20px',
    },
  });
  
  const AccountBox=styled(Box)({
    display:'flex',
    alignItems:'center',
    padding:'0 0 0 15px',
    [theme.breakpoints.up('laptop')]: {
      padding: '0 0 0 20px',
    },
  });

  const SidebarItem = styled(ListItem)({
      color:'White',
      paddingLeft:'15px',
        "&:hover":{     
          backgroundColor:`${theme.palette.primary.light}`
        }, 
      [theme.breakpoints.up('laptop')]: {
        paddingLeft: '20px',
      },
  })

  return (
    <Drawer
      PaperProps={{
        sx: {
          background:`${theme.palette.primary.main}`,
          zIndex: '0',        
          border: '0px', 
          width:'230px', 
          [theme.breakpoints.up('laptop')]: {
            width: '300px',
          },
        }}}
        variant="permanent" 
    > 
      <CustomToolbar>
        <List sx={{padding:'0'}}>
            {navitems.map((item, index) => (
              <ListItemButton 
                sx={{padding:'0'}}
                component={Link}
                to={item.route}
                key={index}
              >
                <SidebarItem                
                  key={index}
                  className= {item.route===location.pathname? 'activeItem' : ''}
                >  
                  <ListItemText primary={
                    <ListText>
                      {item.label}
                    </ListText>
                  }/>
                </SidebarItem>
              </ListItemButton>
            ))}
        </List>

        <AccountBox>
          <AccountAvatar></AccountAvatar>
          <AccountText>
           Name
          </AccountText> 
        </AccountBox>
      </CustomToolbar>
        
    </Drawer> 
  )
}

export default Navbar