import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import styled from '@emotion/styled';

import { navitemdetail } from '../navbar/navitem';

const Sidebar =styled(Drawer)({
  width: 300,
  height:'100vh',
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { 
    width: 300 ,
    backgroundColor:'#171719',
    zIndex:0,
  },   

})

const SidebarItem = styled(ListItem)({
  borderLeft:'solid #171719 20px',  
    color:'White',
      "&:hover":{     
        backgroundColor:'#222226'
      }   

})

const SidebarList=styled(List)({
  marginTop:'30px'
})

const SidebarListText=styled(Typography)({
  padding:'5px',
  fontWeight:700,
  fontSize:'20px',
  
})

const SidebarAccountBox=styled(Box)({  
  display:'flex',
  marginTop:'220px'
})

const SidebarAccountAvatar=styled(Avatar)({
 
  display:'flex',
  marginLeft:'30px'
})

const SidebarAccountText=styled(Typography)({
  paddingTop:'5px',
  fontWeight:700,
  fontSize:'20px',
  color:'white',  
  marginLeft:'20px'
  
})

const Navbar = () => {
  return (
    <Sidebar
      PaperProps={{
        sx: {
          background:'#171719',
          border: '0px',          
        }}}
        variant="permanent"
        
      >
        <Toolbar />
        
        <SidebarList>
            {navitemdetail.map((item, index) => (
              <SidebarItem                
                key={item.id}
                // onClick={()=>navigate(item.route)}
                > 
                
                  
                  <ListItemText primary={<SidebarListText>{item.label}</SidebarListText>} />
                  
                
              </SidebarItem>
            ))}
          </SidebarList>
         
         <SidebarAccountBox >
         <SidebarAccountAvatar></SidebarAccountAvatar>
         <SidebarAccountText variant="h6">
            Name
          </SidebarAccountText> 
          </SidebarAccountBox>
        
      </Sidebar> 
  )
}

export default Navbar