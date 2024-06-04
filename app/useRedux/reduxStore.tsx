
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '../useRedux/leadSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
