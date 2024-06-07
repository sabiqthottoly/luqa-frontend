import { combineReducers } from '@reduxjs/toolkit';
import leadsReducer from '../app/dashboard/leads/leadsSlice';
import authReducer from './slices/authSlice';

export const rootReducer = combineReducers({
    leads: leadsReducer,
    auth: authReducer
});
