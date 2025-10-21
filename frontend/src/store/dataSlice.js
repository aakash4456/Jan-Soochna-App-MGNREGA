import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The async thunk for fetching data
export const fetchData = createAsyncThunk(
    'data/fetchData', 
    async (filters, { rejectWithValue }) => {
        try {
            const { state_name, fin_year, district_name } = filters;
            const response = await axios.get('http://localhost:5000/api/data', {
                params: { state_name, fin_year, district_name }
            });
            // The API returns an empty records array if no data is found
            if (response.data.records.length === 0) {
                return rejectWithValue('No data found for the selected filters.');
            }
            return response.data.records;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch data');
        }
    }
);

// The Redux slice
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        records: [],
        loading: false,
        error: null,
    },
    reducers: {
        // You can add reducers here for synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.records = [];
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.records = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Use payload from rejectWithValue
            });
    },
});

export default dataSlice.reducer;