import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Modules/Auth/slice/authSlice';
import projectReducer from '../Modules/Project/slice/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
});

export const projectSelector = (state) => state.project;

export const authSelector = (state) => state.auth;
