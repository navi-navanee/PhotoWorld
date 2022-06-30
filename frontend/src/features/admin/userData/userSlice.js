
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    user: [] ,
    isError :false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const fetchUser =createAsyncThunk(
    'userDetails/fetchUser',
    async(thunkAPI) => {
        try { 
            return await userService.getUser()
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
              return thunkAPI.rejectWithValue(message)
        }
    }
)
export const userSlice =createSlice({
    name:'userDetails',
    initialState,
    reducers: {

    },
    extraReducers :(builder) => {
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.isLoading =true
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading =false
            state.isError=false
            state.user=action.payload
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.message=action.payload
            state.user=null
        })
    }
})

export const selectAllUser = (state)=>state.userDetails.user 
export const isloading = (state)=>state.userDetails.isLoading 
export const message = (state)=>state.userDetails.message
// export const selectAllUser = (state)=>state.userDetails.user

export default userSlice.reducer
