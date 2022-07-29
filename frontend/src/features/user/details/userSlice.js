import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    filterData: [],
    filterError: false,
    filterSuccess: false,
    filterLoading: false,
    filterMessage: '',

    //............

    singleData: [],
    singleError: false,
    singleSuccess: false,
    singleLoading: false,
    singleMessage: '',

    //......................

    singleFetchAlbum: [],
    singleFetchError: false,
    singleFetchSuccess: false,
    singleFetchLoading: false,
    singleFetchMessage: '',

    //.........................

    weddingImage: [],
    weddingImageError: false,
    weddingImageSuccess: false,
    weddingImageLoading: false,
    weddingImageMessage: '',

    //...........................

    NatureImage: [],
    NatureImageError: false,
    NatureImageSuccess: false,
    NatureImageLoading: false,
    NatureImageMessage: '',



    //...........................

    OtherlImage: [],
    OtherImageError: false,
    OtherImageSuccess: false,
    OtherImageLoading: false,
    OtherImageMessage: '',




}


export const filter = createAsyncThunk(
    'user/filter',
    async (_, thunkAPI) => {

        try {
            const token = await thunkAPI.getState().auth.user.token

            return await userService.filter(token)
        } catch (error) {

        }
    }
)

export const singleSearch = createAsyncThunk(
    'user/singleSearch',
    async (userData, thunkAPI) => {
        try {
            const token = await thunkAPI.getState().auth.user.token
            return await userService.singleSearch(userData, token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const singleFetch = createAsyncThunk(
    'user/singleFetch',
    async (userData, thunkAPI) => {
        try {
            const token = await thunkAPI.getState().auth.user.token
            return await userService.singleFetch(userData, token)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const wedding = createAsyncThunk(
    
    'user/wedding',
    async (_, thunkAPI) => {
        try {
            // const token = await thunkAPI.getState().auth.user.token
            return await userService.wedding()
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)





export const userFilterSlice = createSlice({
    name: 'photographerfilter',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(filter.pending, (state) => {
                state.filterLoading = true
            })
            .addCase(filter.fulfilled, (state, action) => {
                state.filterLoading = false
                state.filterSuccess = true
                state.filterData = action.payload

            })
            .addCase(filter.rejected, (state, action) => {
                state.filterLoading = false
                state.filterError = true
                state.filterMessage = action.payload
                state.filterData = null
            })
            .addCase(singleSearch.pending, (state) => {
                state.singleLoading = true
            })
            .addCase(singleSearch.fulfilled, (state, action) => {
                state.singleLoading = false
                state.singleSuccess = true
                state.singleData = action.payload

            })
            .addCase(singleSearch.rejected, (state, action) => {
                state.singleLoading = false
                state.singleError = true
                state.singleMessage = action.payload
                state.singleData = null
            })
            //..................................................
            .addCase(singleFetch.pending, (state) => {
                state.singleFetchLoading = true
            })
            .addCase(singleFetch.fulfilled, (state, action) => {
                state.singleFetchLoading = false
                state.singleFetchSuccess = true
                state.singleFetchData = action.payload

            })
            .addCase(singleFetch.rejected, (state, action) => {
                state.singleFetchLoading = false
                state.singleFetchError = true
                state.singleFetchMessage = action.payload
                state.singleFetchData = null
            })

            //................................................

            .addCase(wedding.pending, (state) => {
                state.weddingImageLoading = true
            })
            .addCase(wedding.fulfilled, (state, action) => {
                state.weddingImageLoading = false
                state.weddingImageSuccess = true
                state.weddingImage = action.payload

            })
            .addCase(wedding.rejected, (state, action) => {
                state.weddingImageLoading = false
                state.weddingImageError = true
                state.weddingImageMessage = action.payload
                state.weddingImage = null
            })

    }
})

export const filterData = (state) => state.userFilter.filterData.data
export const isLoading = (state) => state.userFilter.filterLoading
export const filterSuccess = (state) => state.userFilter.filterSuccess
export const filterMessage = (state) => state.userFilter.filterMessage
//...............................................
export const singleData = (state) => state.userFilter.singleData
export const singleLoading = (state) => state.userFilter.singleLoading
//...............................................
export const singleFetchData = (state) => state.userFilter.singleFetchData
export const singleFetchLoading = (state) => state.userFilter.singleFetchLoading

//...............................................

export const weddingImage = (state) => state.userFilter.weddingImage
export const weddingImageLoading = (state) => state.userFilter.weddingImageLoading


export default userFilterSlice.reducer
