import React,{Component, useEffect}from 'react';
import { Box,Typography,Button,InputBase,InputAdornment,IconButton, Alert } from '@mui/material'
import styled from '@emotion/styled';   
import theme from '../theme';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Lock from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import MailIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useAppSelector,useAppDispatch } from '../app-state/hooks';


import { loginUser,registerUser } from '../app-state/features/userPreferenceSlice';

const ModalBox = styled(Box)({
    position: 'absolute',
    top:'50%',
    left: '50%',
    transform: 'translate(-40%, -40%)',
    width: 600,       
    borderRadius:'15px',
    backgroundColor:'#1A1A1B',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection:'column',
    padding:'10px',
    opacity:1

    
})  
const Header =styled(Button)({
  display:'flex',
  flexDirection:'row', 
   
})
const HeaderButtton =styled(Button)({
    color: '#FFFFFF',    
    width: '100%', 
    height: '70px',
    margin:'0 5px 0 5px',
    "&:hover":{     
      backgroundColor:`${theme.palette.primary.light}`
    },
    textTransform: "none", 
    fontSize:'25px'  
    
   
})

const FieldBox=styled(Box)({
  margin:'0 30px 0 30px',


})
const Label= styled(Typography)({
  fontSize:'22px',
  margin:'20px 0 0 0'
})
const Error= styled(Typography)({
  fontSize:'16px',
  margin:'10px 0 0 0'
})
const InputBox=styled(Box)({
    display:'flex',
    flexDirection:'row',
    height:'60px',
    margin:'10px 0 0 0'


})

const IconBox=styled(Box)({
    width:'15%',
    backgroundColor:'#171719',
    borderRadius:'5px 0 0 5px',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',

  
})
const TextBox=styled(Box)({
    width:'80%',
    backgroundColor:'#222226',
    borderRadius:'0 5px 5px 0',
    padding:'0 0 0 20px'
})
const Login=styled(Box)({
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin:'30px 0 10px 0'
    
})
const LoginButton=styled(Button)({
    color:'#FFFFFF',
    backgroundColor:'#171719',
    border:'1px solid #FFFFFF',
    height:'50px',
    width:'180px',
    fontSize:'20px',
    textTransform: "none",  
    borderRadius:'10px'  
})



const Loginmodal = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  
  const [login,setlogin]= useState(true)
  const [register,setregister]= useState(false)
  
  const openLogin = () => {
    setlogin(true);
    setregister(false);
  }
  
  const openRegister = () => {
    setregister(true); 
    setlogin(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const isValidEmail=(emailRegister:any)=>{    
    return /\S+@\S+\.\S+/.test(emailRegister);
  }
  const [mailError, setmailError] = useState(false);
  //Login
  const[nameLogin,setnameLogin]=useState("")
  const[passwordLogin,setpasswordLogin]=useState("")
  const[nameRegister,setnameRegister]=useState("")
  const[passwordRegister,setpasswordRegister]=useState("")
  const[emailRegister,setemailRegister]=useState("")

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dispacher = useDispatch()

  const  handleregister = (n:string,p:string,m:string) => {  
    setResgisteralert(true)
    const registerData={
      userDetails:{
        username: n,
        password: p,
        email:m,
      }
      
      }
    dispatch(registerUser(registerData))
  };
  const  handleLogin= (n:string,p:string) => {  
    setLoginalert(true)
    const loginData={
      userCredentials:{
        username: n,
        password: p,
        
      }
      
      }
    dispatch(loginUser(loginData))
  };
  const alertLoginMessage= useAppSelector(state=>state.userPreference.loginerror)
  const [showLoginalert, setLoginalert] = useState(false);
  const alertRegisterMessage= useAppSelector(state=>state.userPreference.registererror)
  const [showRegisteralert, setResgisteralert] = useState(false);
  


 
  
  return (
    
    <ModalBox>
      <Header sx={{}}>
        <HeaderButtton onClick={openLogin} sx={{backgroundColor:login?'#222226':'#1A1A1B'}}>Login</HeaderButtton>
        
        <HeaderButtton onClick={openRegister} sx={{backgroundColor:register?'#222226':'#1A1A1B'}} >Register</HeaderButtton>
      </Header>
      <Box display={`${login? '' : 'none'}`}>

          <FieldBox>
            <Label>User Name</Label>
            <InputBox>
              <IconBox>
                <PersonOutlineOutlinedIcon sx={{fontSize:'35px'}}/>
                </IconBox> 
              <TextBox>
              <InputBase
                sx={{ ml: 1, flex: 1,width:'auto',height:'100%',fontSize:'20px',color:'#FFFFFF'}}
                placeholder="Enter your name..."
                onChange={(e)=>setnameLogin(e.target.value)}       
                value={nameLogin}     
              />
              </TextBox>
            </InputBox>
          </FieldBox>
          <FieldBox>
            <Label>Password</Label>
            <InputBox>
              <IconBox>
              <Lock sx={{fontSize:'32px'}}/>
              </IconBox>
              <TextBox>
              
              <InputBase
                sx={{ ml: 1, flex: 1,width:'90%',height:'100%',fontSize:'20px',color:'#FFFFFF'}}
                placeholder="Password..."  
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>setpasswordLogin(e.target.value)} 
                value={passwordLogin}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color:'white',fontSize:'20px'}}/> : <Visibility sx={{color:'white',fontSize:'20px'}} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              
              </TextBox>
            </InputBox>
          </FieldBox>
        
            
          <Login>
            <LoginButton onClick={()=>{handleLogin(nameLogin,passwordLogin)}}>
                Login
              <LoginIcon/>
            </LoginButton>
            
          </Login>
          <Box display={`${showLoginalert? '' : 'none'}`}>
            <Alert  severity={alertLoginMessage=='Logged in Successfully' ? "success" : "error"}>
              {alertLoginMessage}
            </Alert>
          </Box>
      </Box>
      <Box display={`${register? '' : 'none'}`}>
      
          <FieldBox>
            <Label>User Name</Label>
            <InputBox>
              <IconBox>
                <PersonOutlineOutlinedIcon sx={{fontSize:'35px'}}/>
                </IconBox> 
              <TextBox>
              <InputBase
                sx={{ ml: 1, flex: 1,width:'auto',height:'100%',fontSize:'20px',color:'#FFFFFF'}}
                value={nameRegister}
                placeholder="Enter your name..."         
                onChange={(e)=>setnameRegister(e.target.value)}    
              />
              </TextBox>
            </InputBox>
          </FieldBox>
          <FieldBox>
            <Label>Password</Label>
            <InputBox>
              <IconBox>
              <Lock sx={{fontSize:'32px'}}/>
              </IconBox>
              <TextBox>
              
              <InputBase
                sx={{ ml: 1, flex: 1,width:'90%',height:'100%',fontSize:'20px',color:'#FFFFFF'}}
                value={passwordRegister}
                placeholder="Password..."  
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>setpasswordRegister(e.target.value)} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color:'white',fontSize:'20px'}}/> : <Visibility sx={{color:'white',fontSize:'20px'}} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              
              </TextBox>
            </InputBox>
          </FieldBox>
          <FieldBox>
            <Label>Email ID</Label>
            <Box display={`${mailError? '' : 'none'}`}>
            <Error>*Invalid</Error>
            </Box>
            
            <InputBox>
              <IconBox>
                <MailIcon sx={{fontSize:'35px'}}/>
                </IconBox> 
              <TextBox>
              
              <InputBase
                sx={{width:'auto',height:'100%',fontSize:'20px',color:'#FFFFFF'}}
                value={emailRegister}
                placeholder="Enter your email id..."            
                onChange={(e)=>{
                  if(!isValidEmail(e.target.value)){
                    setmailError(true)
                    setemailRegister(e.target.value)
                  }                  
                  else{
                    setmailError(false)
                    setemailRegister(e.target.value)
                    
                  }
                }}
              
                  
              />
              </TextBox>
            </InputBox>
          </FieldBox>
        
            
          <Login>
            <LoginButton onClick={()=>{handleregister(nameRegister,passwordRegister,emailRegister)
            
            
            }}>
                Register
              <LoginIcon/>
            </LoginButton>
            
          </Login>
          <Box display={`${showRegisteralert? '' : 'none'}`}>
            <Alert  severity={alertRegisterMessage=='User Added...' ? "success" : "error"}>
              {alertRegisterMessage}
            </Alert>
          </Box>
          
      </Box>
      
      
    </ModalBox>
    
    
    
  )
}
  
export default Loginmodal