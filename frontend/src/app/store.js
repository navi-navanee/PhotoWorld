import { configureStore } from '@reduxjs/toolkit';
import adminauthSlice from '../features/admin/auth/adminauthSlice';
import authReducer from '../features/user/auth/authSlice';
import userSlice from '../features/admin/userData/userSlice';
import photographerauthSlice from '../features/photographer/auth/photographerauthSlice';
import  photographerSlice  from   '../features/photographer/details/photographerSlice';


export const store = configureStore({
  reducer: {
    auth:authReducer,
    adminauth:adminauthSlice,
    userDetails:userSlice,
    photographerauth : photographerauthSlice,
    photographerDetails : photographerSlice

  },
});
