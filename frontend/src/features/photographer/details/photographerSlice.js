import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photographerService from "./photographerServer";


const initialState = {
    
    photographerDetails : [] ,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message: ''
}

export const details =createAsyncThunk(
    'photographerDetails/details',
  
    async(_,thunkAPI) =>{
        console.log("called........................");
        try {
        
            const token =await thunkAPI.getState().photographerauth.photographer.token
            console.log("im tokennnn",token);
            return await photographerService.details(token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)



export const photographerSlice = createSlice ({
    name:'photographerDetails',
    initialState,
    reducers:{

    },
    extraReducers : (builder) =>{
        builder
        .addCase(details.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(details.fulfilled,(state,action)=>{
            state.isLoading =false
            state.isError=false
            state.photographerDetails=action.payload
            
        })
        .addCase(details.rejected,(state,action)=> {
            state.isLoading=false
            state.isSuccess=false
            state.message=action.payload
            state.photographerDetails=null
        })
    }

})



export const photographerDetails= (state) =>state.photographerDetails.photographerDetails
export const isLoading= (state) =>state.photographerDetails.isLoading
export const message= (state) =>state.photographerDetails.message


export default photographerSlice.reducer