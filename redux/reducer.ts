import { combineReducers } from '@reduxjs/toolkit';
import leadsReducer from '../app/dashboard/leads/leadsSlice';

export const rootReducer = combineReducers({
    leads: leadsReducer
});
