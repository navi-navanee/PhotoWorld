import { configureStore } from '@reduxjs/toolkit';
import adminauthSlice from '../features/admin/auth/adminauthSlice';
import authReducer from '../features/user/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    adminauth:adminauthSlice,
  },
});
