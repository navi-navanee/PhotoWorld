import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import photographerauthService from "./photographerauthService";


//Get user from localstorage
const photographer = JSON.parse(localStorage.getItem('photographer'))

const initialState = {
    photographer: photographer ? photographer : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register

export const register = createAsyncThunk(
    'photographerauth/register',
    async (photographer, thunkAPI) => {
        try {
            return await photographerauthService.register(photographer)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)

        }
    }
)



//login photographer
export const login = createAsyncThunk(
    'photographerauth/login',
    async (photographer, thunkAPI) => {
        try {
            console.log("im hereee");
            return await photographerauthService.login(photographer)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//logout

export const logout = createAsyncThunk(
    'photographerauth/logout',
    async () => {
        await photographerauthService.logout()
    }
)


export const photographerauthSlice = createSlice({
    name: 'photographerauth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.photographer = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.photographer = null

            })

            .addCase(register.pending, (state) => {
                state.isLoading = false
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.photographer = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.photographer = null
            })

            .addCase(logout.fulfilled, (state, action) => {
                state.photographer = null
            })
    }


})

export const { reset } = photographerauthSlice.actions

export default photographerauthSlice.reducer



