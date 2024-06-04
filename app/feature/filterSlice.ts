import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filterDetails: any; // Define your filter data type
}

const initialState: FilterState = {
  filterDetails: null, 
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterDetails(state, action: PayloadAction<any>) {
      state.filterDetails = action.payload;
    },
  },
});

export const { setFilterDetails } = filterSlice.actions;
export default filterSlice.reducer;
