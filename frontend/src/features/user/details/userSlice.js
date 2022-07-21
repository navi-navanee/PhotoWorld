import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    filterData : [],
    filterError:false,
    filterSuccess:false,
    filterLoading:false,
    filterMessage:''
}


export const filter = createAsyncThunk(
    'user/filter',
    async (_,thunkAPI) => {
  
        try {
            const token = await thunkAPI.getState().auth.user.token

            return await userService.filter(token)
        } catch (error) {
            
        }
    }
)


export const userFilterSlice = createSlice({
    name:'photographerfilter',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(filter.pending,(state)=>{
            state.filterLoading=true
        })
        .addCase(filter.fulfilled,(state,action)=>{
            state.filterLoading =false
            state.filterSuccess=true
            state.filterData=action.payload
            
        })
        .addCase(filter.rejected,(state,action)=> {
            state.filterLoading=false
            state.filterError=true
            state.filterMessage=action.payload
            state.filterData=null
        })
    }
})

export const filterData = (state) => state.userFilter.filterData.data
export const isLoading = (state) => state.userFilter.filterLoading
export const filterSuccess = (state) => state.userFilter.filterSuccess
export const filterMessage = (state) => state.userFilter.filterMessage

export default userFilterSlice.reducer
