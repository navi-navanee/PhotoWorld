import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'


//Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//Register the user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message = (error.response && error.response.data
        && error.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  })

//login user
export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data
        && error.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)

    }
  })

//editUser
export const editUser_Details = createAsyncThunk(
  'auth/editUserDetails',
  async (userDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.editUser(token, userDetails);
    } catch (error) {
        const message = (error.response && error.response.data
          && error.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    console.log("helooooo");
    await authService.logout()
  }
)


export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(editUser_Details.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser_Details.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(editUser_Details.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      

  }
})


export const { reset } = authSlice.actions
export default authSlice.reducer