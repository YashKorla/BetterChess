import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface userPreferenceState {
    isLoading: boolean;
    user:{
        name:string;
        email:string;
        rating:number;
    }
}
const initialState:userPreferenceState = {
  isLoading: false,
  user:{
    name: "",
    email: "",
    rating: 0
  }
};

const userPreferenceSlice = createSlice({
    name: "userPreference",
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = true //action.payload;
        },
        setName(state, action: PayloadAction<string>){
            state.user.name = action.payload;
        }
    }
})

export const { setIsLoading, setName } = userPreferenceSlice.actions;

export default userPreferenceSlice.reducer;
