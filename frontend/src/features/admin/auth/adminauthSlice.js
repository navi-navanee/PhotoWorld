import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import adminauthService from "./adminauthService";


const admin =JSON.parse(localStorage.getItem('admin'))

console.log("details",admin);

const initialState = {
    admin : admin ? admin : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

//login the admin 
export const login = createAsyncThunk(
    'adminauth/login' , 
    async (admin,thunkAPI) => {
        try {
            console.log("helooo",admin);
            return await adminauthService.login(admin)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
              return thunkAPI.rejectWithValue(message)
        }
    }
)

//logout

export const logout =createAsyncThunk(
    'adminauth/logout',
    async () =>{
      await adminauthService.logout()
    }
)


export const adminauthSlice = createSlice({
    name:'adminauth',
    initialState,
    reducers :{
        reset:(state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess= true
            state.admin =action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message =action.payload
            state.user =null
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.admin =null
        })
    }

})


export const {reset} = adminauthSlice.actions
export default adminauthSlice.reducer
