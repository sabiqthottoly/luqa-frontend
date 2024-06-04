
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '../useRedux/leadSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export default store;
