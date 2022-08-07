import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photographerService from "./photographerServer";


const initialState = {

    photographerDetails: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    ////
    photographerAlbum: [],
    albumError: false,
    albumSuccess: false,
    albumLoading: false,
    albumMessage: '',
    ////
    fetchAlbum: [],
    fetchError: false,
    fetchSuccess: false,
    fetchLoading: false,
    fetchMessage: '',

    //............

    ReviewData: [],
    ReviewError: false,
    ReviewSuccess: false,
    ReviewLoading: false,
    ReviewMessage: '',
}


export const details = createAsyncThunk(
    'photographerDetails/details',

    async (_, thunkAPI) => {
        try {
            const token = await thunkAPI.getState().photographerauth.photographer.token

            return await photographerService.details(token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const albumsSubmit = createAsyncThunk(
    'photographeralbum/album',

    async (data, thunkAPI) => {
        console.log("lllll/////...",data);
        try {
            const token = await thunkAPI.getState().photographerauth.photographer.token
            return await photographerService.albums(data, token);
        } catch (error) {
            console.log('fuckkkkkkkkkkkkk',error);
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)

export const fetch = createAsyncThunk(
    'photographeralbum/fetchalbum',
    async (_, thunkAPI) => {
        console.log("called........................")
        try {
            const token = await thunkAPI.getState().photographerauth.photographer.token
            console.log("im tokennnn", token)
            return await photographerService.fetch(token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete photos

export const deletephotos = createAsyncThunk(
    'trainerPlan/deleteTrainerPlan',
    async (id, thunkAPI) => {
        try {
            const token = await thunkAPI.getState().photographerauth.photographer.token
            return photographerService.deletephotos(id, token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const fetchReview =createAsyncThunk(
    'user/fetchReview',
    async(data,thunkAPI) => {
  
        try {
            const token = await thunkAPI.getState().photographerauth.photographer.token
            return await photographerService.fetchReview(data,token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)






export const photographerSlice = createSlice({
    name: 'photographerDetails',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = false
            state.isDelete = false
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(details.pending, (state) => {
                state.isLoading = true
            })
            .addCase(details.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.photographerDetails = action.payload

            })
            .addCase(details.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.photographerDetails = null
            })
            .addCase(albumsSubmit.pending, (state) => {
                state.albumLoading = true
            })
            .addCase(albumsSubmit.fulfilled, (state, action) => {
               console.log("...........................",action.payload);
                state.fetchAlbum = action.payload
                state.albumLoading = false
                state.albumError = false
            })
            .addCase(albumsSubmit.rejected, (state, action) => {
                state.albumLoading = false
                state.albumSuccess = false
                state.albumMessage = action.payload
                state.photographerAlbum = action.payload
            })
            .addCase(fetch.pending, (state) => {
                state.fetchLoading = true
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.fetchLoading = false
                state.fetchAlbum = action.payload
                state.fetchError = false

            })
            .addCase(fetch.rejected, (state, action) => {
                state.fetchLoading = false
                state.fetchSuccess = false
                state.fetchMessage = action.payload
                state.fetchAlbum = null
            })
            //...................delete photo.........
            .addCase(deletephotos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletephotos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isDelete = true

            })
            .addCase(deletephotos.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isDelete = false
            })
            //.....................review data ..............
            .addCase(fetchReview.pending, (state) => {
                state.ReviewLoading = true
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.ReviewData = action.payload.Review
                state.ReviewLoading = false
                state.ReviewSuccess = true

            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.ReviewLoading = false
                state.ReviewError = true
                state.ReviewMessage = action.payload
                state.ReviewData = null
            })

    }

})


export const { reset } = photographerSlice.actions

export const photographerDetails = (state) => state.photographerDetails.photographerDetails
export const isLoading = (state) => state.photographerDetails.isLoading
export const message = (state) => state.photographerDetails.message

export const photographerAlbum = (state) => state.photographerDetails.photographerAlbum
export const albumLoading = (state) => state.photographerDetails.albumLoading
export const albumMessage = (state) => state.photographerDetails.albumMessage

export const fetchAlbum = (state) => state.photographerDetails.fetchAlbum
export const fetchLoading = (state) => state.photographerDetails.fetchLoading
export const fetchMessage = (state) => state.photographerDetails.fetchMessage
export const fetchSuccess = (state) => state.photographerDetails.fetchSuccess

export const ReviewData = (state) => state.photographerDetails.ReviewData
export const ReviewLoading = (state) => state.photographerDetails.ReviewLoading
export const ReviewMessage = (state) => state.photographerDetails.ReviewMessage

export default photographerSlice.reducer