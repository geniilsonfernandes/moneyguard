import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
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

const key = {
  user: '@money/user'
};

function saveUser(user_id: DataState) {
  localStorage.setItem(key.user, JSON.stringify(user_id));
}

function getUser(): DataState | null {
  const user = localStorage.getItem(key.user);
  return user ? JSON.parse(user) : null;
}

function removeUser() {
  localStorage.removeItem(key.user);
}

export const loginUser = (payload: loginPayload) => (dispatch: Dispatch) => {
  dispatch(login(payload));
};

export const logoutUser = () => (dispatch: Dispatch) => {
  removeUser();
  dispatch(logout());
};

export { saveUser, getUser, removeUser };

export default authSlice.reducer;
