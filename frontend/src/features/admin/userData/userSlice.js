
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isModified: false,
    //....................
    photographer: [],
    photographerError: false,
    photographerSuccess: false,
    photographerLoading: false,
    photographermessage: '',
    photographerModified: false,

    //.......................
    PaymentData: [],
    PaymentDataError: false,
    PaymentDataSuccess: false,
    PaymentDataisLoading: false,
    PaymentDatamessage: '',
}

//fetch user
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
            const token = thunkAPI.getState().adminauth.admin.token;
            return await userService.BlockUsers(data, token);
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);


//fetch photographer
export const fetchPhotographer = createAsyncThunk(
    'photographerDetails/fetchPhotographer',
    async (thunkAPI) => {
        try {
            return await userService.getPhotographer()
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

////fetch fetchPayment
export const fetchPayment = createAsyncThunk(
    'photographerDetails/fetchPayment',
    async (thunkAPI) => {
        try {
            return await userService.fetchPayment()
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//block-User
export const blockPhotographer = createAsyncThunk(
    'Photographer-block',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().adminauth.admin.token;
            return await userService.BlockPhotographer(data, token);
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
            state.isModified = false
        },
        //...............
        photographerreset: (state) => {
            state.photographerLoading = false
            state.photographerSuccess = false
            state.photographerError = false
            state.photographermessage = ''
            state.photographerModified = false
        }

    },
    extraReducers: (builder) => {
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
                state.isModified = true
            })
            .addCase(blockusers.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.user = null
            })
            //............................................................   

            .addCase(fetchPhotographer.pending, (state) => {
                state.photographerLoading = true
            })
            .addCase(fetchPhotographer.fulfilled, (state, action) => {
                state.photographerLoading = false
                state.photographerError = false
                state.photographer = action.payload
            })
            .addCase(fetchPhotographer.rejected, (state, action) => {
                state.photographerLoading = false
                state.photographerSuccess = false
                state.photographermessage = action.payload
                state.photographer = null
            })
            .addCase(blockPhotographer.pending, (state) => {
                state.photographerLoading = true
            })
            .addCase(blockPhotographer.fulfilled, (state, action) => {
                state.photographerLoading = false
                state.photographerError = false
                state.photographerModified = true
            })
            .addCase(blockPhotographer.rejected, (state, action) => {
                state.photographerLoading = false
                state.photographerSuccess = false
                state.photographermessage = action.payload
                state.photographer = null
            })

            //................................................
            .addCase(fetchPayment.pending, (state) => {
                state.photographerLoading = true
            })
            .addCase(fetchPayment.fulfilled, (state, action) => {
                state.PaymentDataisLoading = false
                state.PaymentDataError = false
                state.PaymentData = action.payload
            })
            .addCase(fetchPayment.rejected, (state, action) => {
                state.PaymentDataisLoading = false
                state.PaymentDataSuccess = false
                state.PaymentDatamessage = action.payload
                state.PaymentData = null
            })
    }
})



// export const selectAllPhotographer = (state) => state.userDetails.user
export const selectAllUser = (state) => state.userDetails.user
export const userBlock = (state) => state.userDetails.isModified
export const isloading = (state) => state.userDetails.isLoading
export const message = (state) => state.userDetails.message
// export const selectAllUser = (state)=>state.userDetails.user
export const { reset, photographerreset } = userSlice.actions

//.......................................
export const selectAllPhotographer = (state) => state.userDetails.photographer
export const photographerBlock = (state) => state.userDetails.photographerModified
export const photographerloading = (state) => state.userDetails.photographerLoading
export const photographermessage = (state) => state.userDetails.photographermessage

//....................................
export const  PaymentData = (state) => state.userDetails.PaymentData
export const   PaymentDataisloading = (state) => state.userDetails.PaymentDataisloading

export default userSlice.reducer

