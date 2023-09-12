import React from 'react';
import Button from '@mui/material/Button';
import  styled  from '@emotion/styled';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material/styles';
import MenuList from '@mui/material/MenuList';
import {Link} from 'react-router-dom';
import { Popper } from '@mui/material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

    const MenuBox  = () => {
        const theme = useTheme();
        const AccountText=styled(Typography)({
            fontWeight:700,
            fontSize:'24px',
            color: 'white',
            [theme.breakpoints.up('laptop')]: {
            fontSize:'28px',
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
        const AccountAvatar=styled(Avatar)({
          height:'50px',
          width:'50px',
          marginRight:'10px',
          bottom:'0px',
          [theme.breakpoints.up('laptop')]: {
            height:'67px',
            width:'67px',
            marginRight:'16px',
          },
        })
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef<HTMLButtonElement>(null);
      
        const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
        };
      
        const handleClose = (event: Event | React.SyntheticEvent) => {
          if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
          ) {
            return;
          }
      
          setOpen(false);
        };
      
        function handleListKeyDown(event: React.KeyboardEvent) {
          if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
          } else if (event.key === 'Escape') {
            setOpen(false);
          }
        }
      
        // return focus to the button when we transitioned from !open -> open
        const prevOpen = React.useRef(open);
        React.useEffect(() => {
          if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
          }
      
          prevOpen.current = open;
        }, [open]);
  return (
    <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountBox>
            <AccountAvatar/>           
              <AccountText>
                Name
              </AccountText> 
          </AccountBox>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                   
                    <MenuItem onClick={handleClose}><Link to='/my-account'>My account</Link></MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </div>
  )
}

export default MenuBox
