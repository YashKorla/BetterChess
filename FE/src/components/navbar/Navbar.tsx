

import Drawer from '@mui/material/Drawer';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';
import Box  from '@mui/material/Box';
import styled from '@emotion/styled';
import {useTheme} from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import MenuBox from './MenuBox';
import { useAppSelector } from '../../app-state/hooks';

const navitems=[
  {label:'Play',route:'/play'},
  {label:'Variants',route:'/variants'},
  {label:'Puzzles',route:'/puzzles'},
  {label:'Leaderboard',route:'/leaderboard'},
  {label:'Friends',route:'/friends'},
]

const Navbar = () => {
  const theme = useTheme();
  const isLoggedIn = useAppSelector((state)=>{
    return state.userPreference.isLoggedIn;
  })

  const ListText=styled(Typography)({
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    [theme.breakpoints.up('laptop')]: {
      fontSize:'32px',
    },
  })
  
  const CustomToolbar=styled(Box)({
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    height:'100%',
    padding: '90px 0 30px 15px',
    [theme.breakpoints.up('laptop')]: {
      padding: '120px 0 50px 20px',
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
          width:'270px', 
          [theme.breakpoints.up('laptop')]: {
            width: '300px',
          },
        }}}
        variant="permanent" 
    > 
      <CustomToolbar>
        <List sx={{padding:'0'}}>
            {navitems.map((item, index) => (
              <NavLink
              style={{textDecoration:'none'}}
                to={item.route}
                key={index}
              >
                {({isActive})=>{
                  return(
                    <SidebarItem                
                      key={index}
                      className= {isActive? 'activeItem' : ''}
                    >  
                      <ListItemText primary={
                        <ListText>
                          {item.label}
                        </ListText>
                      }/>
                    </SidebarItem>
                  )
                }}
              </NavLink>
            ))}
        </List>

      
        {isLoggedIn && <MenuBox></MenuBox>}
          
        
      
          
        
      
            
        
      </CustomToolbar>
        
    </Drawer> 
  )
}

export default Navbar