import { createAsyncThunk } from '@reduxjs/toolkit';

// A helper function help avoiding re-create 'createAsyncThunk'
const thunk = {
  request: (name, fn) =>
    createAsyncThunk(name, async (params, { rejectWithValue }) => {
    
      try {
        const data = await fn(params);
        
        return data;
      } catch (error) {
        
        return rejectWithValue(error);
      }
    }),
};

export default thunk;
