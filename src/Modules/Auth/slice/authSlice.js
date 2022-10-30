import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPIs from '../../../app/apis/auth/authAPIs';


const initialState = {
  data: JSON.parse(localStorage.getItem('user')) || null,
  isLoading: false,
  error: '',
};
const { signIn, signUp } = authAPIs;
export const signInHandler = createAsyncThunk(
  'auth/signIn',
  async (user, { rejectWithValue }) => {
    try {
      const data = await signIn(user);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const signUpHandler = createAsyncThunk(
  'auth/signUp',
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await signUp(userInfo);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInHandler.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(signInHandler.rejected, (state, { payload }) => {
        state.error = payload;
      });

    builder
      .addCase(signUpHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, { payload }) => {
        state.data = payload;
      })
      .addCase(signUpHandler.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
