import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  user_id: string;
}

const initialState: DataState = {
  user_id: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.user_id = action.payload;
    },
    logout(state) {
      state.user_id = '';
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
