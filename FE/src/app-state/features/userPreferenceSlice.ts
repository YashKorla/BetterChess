
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
  isloading: boolean,
  user:user[]
  error: string,
}

const initialState:UserPreferences= {
  isloading:false,
  error:'',
  user:[]
};



export const registerUser = createAsyncThunk('auth/registerUser', async (registerdata:registerdatatype) => {
    console.log(registerdata)
    return axios
      .post('http://localhost:8080/users/register',registerdata)
      .then((response) =>response.data)
  });

export const loginUser = createAsyncThunk('auth/loginUser', async (logindata:logindatatype) => {
    console.log(logindata)
    return axios
    .post('http://localhost:8080/users/login',logindata)
    .then((response) => response.data)

    
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
          state.isloading = false;
          
          state.user =action.payload; 
          state.error = ''
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isloading = false;
          state.user=[]
          state.error = action.error.message||'something went wrong';
          
        })
        .addCase(loginUser.pending, (state) => {
          state.isloading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isloading = false;
          console.log(action.payload);
          state.user= action.payload;
          state.error = '' 
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isloading = false;
          state.error =action.error.message||'something went wrong';
           
          console.log(action.payload)
        });


    }
})

export const {  } = userPreferenceSlice.actions;

export default userPreferenceSlice.reducer;







