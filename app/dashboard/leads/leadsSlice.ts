import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LeadState {
    leads: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LeadState = {
    leads: [],
    status: 'idle',
    error: null
};

// Async thunk for fetching leads
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
    // const response = await axios.get('https://api.example.com/leads');
    const data = [1, 2, 3]
    return data;
});

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.leads = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export default leadsSlice.reducer;
