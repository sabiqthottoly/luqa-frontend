// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface Lead {
//     id?: number;
//     name: string;
//     email: string;
//     source: string;
//     comments: string;
//     state: string;
//     phone: string;
//     address: string;
//     country: string;
// }

// interface LeadState {
//     leads: any[];
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | null;
// }

// const initialState: LeadState = {
//     leads: [],
//     status: 'idle',
//     error: null
// };

// // Async thunk for fetching leads
// export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
//     const response = await axios.get('http://localhost:3001/api/lead/get-all-leads'); // Adjust the URL to your API endpoint
//     console.log(response.data,"from backend");
//     return response.data;
// });

// export const createLead = createAsyncThunk('leads/createLead',async(newLead:Lead)=>{
//     const response = await axios.post('http://localhost:3001/api/lead/create-lead-table',newLead);
//     return response.data
// })

// const leadsSlice = createSlice({
//     name: 'leads',
//     initialState,
//     reducers: {},
//     extraReducers(builder) {
//         builder
//             .addCase(fetchLeads.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchLeads.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.leads = action.payload;
//             })
//             .addCase(fetchLeads.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || null;
//             }).addCase(createLead.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(createLead.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.leads.push(action.payload);
//             })
//             .addCase(createLead.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message || null;
//             });
//     }
// });

// export default leadsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const initialState: LeadState = {
  leads: [],
  status: "idle",
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 1,
};

// Async thunk for fetching leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async ({
    page,
    pageSize,
    filters,
  }: {
    page: number;
    pageSize: number;
    filters?: any;
  }) => {
    const response = await axios.get(
      "http://localhost:3001/api/lead/get-all-leads",
      {
        params: { page, pageSize, ...filters },
      }
    );
    console.log(response.data, "from backend");
    return response.data;
  }
);

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (newLead: Lead) => {
    const response = await axios.post(
      "http://localhost:3001/api/lead/create-lead-table",
      newLead
    );
    return response.data;
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, leadData }) => {
    const response = await axios.put(
      `http://localhost:3001/api/lead/update-lead/${id}`,
      leadData
    );
    return response.data;
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async (leadId) => {
    await axios.delete(`http://localhost:3001/api/lead/delete-lead/${leadId}`);
    return leadId;
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = action.payload.leads;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads.push(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = state.leads.filter((lead) => lead.id !== action.payload);
      })
      .addCase(deleteLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default leadsSlice.reducer;
