
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Lead {
  name: string;
  email: string;
  source: string;
  poc: string;
  company: string;
  phone: string;
  address: string;
  notes: string;
}

interface LeadsState {
  data: Lead[];
}

const initialState = {
  data: {},
};

export const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      console.log(action.payload);
      
      state.data = action.payload;
    },
  },
});



export const { addLead } = leadsSlice.actions;

export const selectLeads = (state: { leads: LeadsState }) => state.leads.data;

export default leadsSlice.reducer;
