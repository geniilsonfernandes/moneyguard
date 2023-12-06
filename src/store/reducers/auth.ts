import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  user_id?: string;
  clerk_user_id?: string;
  email?: string;
  name?: string;
}

const initialState: DataState = {
  user_id: ''
};

type loginPayload = {
  user_id: string;
  clerk_user_id?: string;
  email?: string;
  name?: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<loginPayload>) {
      state.clerk_user_id = action.payload.clerk_user_id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout(state) {
      state.user_id = undefined;
      state.clerk_user_id = undefined;
      state.email = undefined;
      state.name = undefined;
    },
    updateUserId(state, action: PayloadAction<string>) {
      state.user_id = action.payload;
    }
  }
});

export const { login, logout, updateUserId } = authSlice.actions;

export default authSlice.reducer;
