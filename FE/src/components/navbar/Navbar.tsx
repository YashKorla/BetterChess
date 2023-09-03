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

const ListText=styled(Typography)({
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
})

const AccountAvatar=styled(Avatar)({
  height:'67px',
  width:'67px',
  marginRight:'16px',
})

const AccountText=styled(Typography)({
  fontWeight:700,
  fontSize:'28px',
  color: 'white',
});

const CustomToolbar=styled(Box)({
  display:'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  height:'100%',
  padding: '120px 0 50px 20px',
});

const AccountBox=styled(Box)({
  display:'flex',
  alignItems:'center',
  padding:'0 0 0 20px'
});

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

  const SidebarItem = styled(ListItem)({

      color:'White',
        "&:hover":{     
          backgroundColor:`${theme.palette.primary.light}`
        }, 
  })

  return (
    <Drawer
      PaperProps={{
        sx: {
          background:`${theme.palette.primary.main}`,
          border: '0px', 
          width:'300px', 
          zIndex: '0',        
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