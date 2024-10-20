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

// export const fetchToken = createAsyncThunk('account/login', async () => {
//   return await getToken();
// });

export const fetchToken = createAsyncThunk(
  'account/login',
  async ({ email, password }: { email: string; password: string }) => {
    return await getToken(email, password);
  }
);

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

// const tokenSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearToken: (state: TokenState) => {
//       state.token = { accessToken: null, expiration: null };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchToken.pending, (state) => {
//         state.validated = false;
//         state.isSuccess = false;
//         state.errorCode = 0;
//         state.message = '';
//       })
//       .addCase(fetchToken.fulfilled, (state, { payload }) => {
//         state.validated = payload.validated;
//         state.isSuccess = true;
//         state.errorCode = 0;
//         state.message = '';
//         state.token = payload.token;
//       })
//       .addCase(fetchToken.rejected, (state, action) => {
//         state.validated = false;
//         state.isSuccess = false;
//         state.message = action.error.message;
//       });
//   },
// });
const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state: TokenState) => {
      state.token = { accessToken: null, expiration: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state: TokenState) => {
        state.validated = false;
        state.isSuccess = false;
        state.errorCode = 0;
        state.message = '';
      })
      .addCase(fetchToken.fulfilled, (state: TokenState, { payload }) => {
        state.validated = payload.validated;
        state.isSuccess = payload.isSuccess;
        state.errorCode = 0;
        state.message = payload.message;
        state.token = payload.token;
      })
      .addCase(fetchToken.rejected, (state: TokenState, action) => {
        state.validated = false;
        state.isSuccess = false;
        state.errorCode = 1;
        state.message = action.error.message;
      });
  },
});

export const { clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
