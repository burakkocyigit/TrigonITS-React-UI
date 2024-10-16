import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getToken } from '../../services/auth/authServices';

export interface TokenState {
  token: {
    accessToken: string | null;
    expiration: string | null;
  };
  validated: boolean;
  isSuccess: boolean;
  errorCode: number;
  message: string | null | undefined;
}

export const fetchToken = createAsyncThunk('account/login', async () => {
  return await getToken();
});

const initialState: TokenState = {
  token: {
    accessToken: null,
    expiration: null,
  },
  validated: false,
  isSuccess: false,
  errorCode: 0,
  message: null,
};

const tokenSlice = createSlice({
  name: 'mytheme',
  initialState,
  reducers: {
    clearToken: (state: TokenState) => {
      state.token = { accessToken: null, expiration: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.validated = false;
        state.isSuccess = false;
        state.errorCode = 0;
        state.message = '';
      })
      .addCase(fetchToken.fulfilled, (state, { payload }) => {
        state.validated = payload.validated;
        state.isSuccess = true;
        state.errorCode = 0;
        state.message = '';
        state.token = payload.token;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.validated = false;
        state.isSuccess = false;
        state.message = action.error.message;
      });
  },
});

export const { clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
