import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface Lead {
    id?: number;
    name: string;
    email: string;
    source: string;
    comments: string;
    state: string;
    phone: string;
    address: string;
    country: string;
}

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
    const response = await axios.get('http://localhost:3001/api/lead/get-all-leads'); // Adjust the URL to your API endpoint
    console.log(response.data,"from backend");
    return response.data;
});

export const createLead = createAsyncThunk('leads/createLead',async(newLead:Lead)=>{
    const response = await axios.post('http://localhost:3001/api/lead/create-lead-table',newLead);  
    return response.data
})

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
            }).addCase(createLead.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.leads.push(action.payload);
            })
            .addCase(createLead.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export default leadsSlice.reducer;
