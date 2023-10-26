import { AxiosError } from './../../../node_modules/axios/index.d';

import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




type user ={
  username: string,
  password: string,
  email: string,
  rating:number,
  number_of_matches:number,
}
type registerdatatype ={
  userDetails:{
    username:string,
    password:string,
    email: string,
  }
}
type logindatatype={
  userCredentials:{
    username:string,
    password:string,
  }
}
interface UserPreferences {
  isLoggedIn:boolean;
  isloading: boolean,
  user:user
  loginerror: string,
  registererror:string
}

const initialState:UserPreferences= {
  isLoggedIn: false,
  isloading:false,
  loginerror:'',
  registererror:'', 
  user:{
    username: "",
    password: "",
    email: "",
    rating:0,
    number_of_matches:0,
  }
};



export const registerUser = createAsyncThunk('auth/registerUser', async (registerdata:registerdatatype) => {
    console.log(registerdata)
    return axios
      .post('http://localhost:8080/users/register',registerdata)
      .then((response) => response.data)
      .catch((err) => err.response.data)
  });

export const loginUser = createAsyncThunk('auth/loginUser', async (logindata:logindatatype) => {
    console.log(logindata)
    return axios
    .post('http://localhost:8080/users/login',logindata)
    .then((response) => response.data)
    .catch((err) => err.response.data)

    
});

const userPreferenceSlice = createSlice({
    name: "userPreference",
    initialState,
    reducers: {
         
    },
    extraReducers(builder){
        builder
        .addCase(registerUser.pending, (state) => {
          state.isloading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          console.log(action.payload)
          state.isloading = false;
           
          
          state.registererror = action.payload
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isloading = false;
          
          state.registererror = action.error.message||'something went wrong';
         
          
        })
        .addCase(loginUser.pending, (state) => {
          state.isloading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isloading = false;
          if(action.payload!="User not found..."){
            state.user.email= action.payload.email; 
            state.user.number_of_matches= action.payload.number_of_matches;
            state.user.username= action.payload.username;
            state.user.rating= action.payload.rating;
            state.user.password= action.payload.password;
            state.isLoggedIn=true;
            
            state.loginerror="Logged in Successfully"
            console.log(state.user)
          }
          else{
           
            state.loginerror=action.payload
          }
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isloading = false;
          state.loginerror =action.error.message||'something went wrong';
          console.log(action.payload)
          
          
        });


    }
})

export const {  } = userPreferenceSlice.actions;

export default userPreferenceSlice.reducer;







