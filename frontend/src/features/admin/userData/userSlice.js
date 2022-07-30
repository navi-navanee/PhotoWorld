
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isModified: false
}
export const fetchUser = createAsyncThunk(
    'userDetails/fetchUser',
    async (thunkAPI) => {
        try {
            return await userService.getUser()
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//block-User
export const blockusers = createAsyncThunk(
    'block-Users',
    async (data, thunkAPI) => {
        try {
            console.log("im hereeeeeeeeee");
            const token = thunkAPI.getState().adminauth.admin.token;
            console.log("im hereeeeeeeeee", token);
            return await userService.BlockUsers(data, token);
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);



export const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        reset: (state) => {
         state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
        state.isModified=false
        }
    
},
    extraReducers : (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
            .addCase(blockusers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(blockusers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isModified=true
            })
            .addCase(blockusers.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
    }
})



export const selectAllUser = (state) => state.userDetails.user
export const userBlock = (state) => state.userDetails.isModified
export const isloading = (state) => state.userDetails.isLoading
export const message = (state) => state.userDetails.message
// export const selectAllUser = (state)=>state.userDetails.user
export const {reset} =userSlice.actions

export default userSlice.reducer

