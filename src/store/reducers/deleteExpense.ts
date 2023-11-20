import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { financialRecordStorage } from '../storage';

import { NotFoundError } from '@/utils/useStorage';

type Error = {
  message: string | null;
  status: boolean;
  details?: string;
} | null;

// financialRecordStorage.addItem(data);

interface DataState {
  loading: boolean;
  error: Error;
  success: boolean | null;
}

const initialState: DataState = {
  loading: false,
  error: null,
  success: null
};

const deleteExpenseSlice = createSlice({
  name: 'delete/expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    fetchDataSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    fetchDataFailure(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },
    clearDeleteExpense(state) {
      console.log('clearDeleteExpense');

      state.error = null;
      state.success = null;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, clearDeleteExpense } =
  deleteExpenseSlice.actions;

export const deleteExpense =
  ({ id }: { id: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    try {
      financialRecordStorage.removeItem(id);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
          dispatch(fetchDataSuccess());
        }, 1000);
      });
      return true;
    } catch (error) {
      if (error instanceof NotFoundError) {
        dispatch(
          fetchDataFailure({
            message: 'Orçamento não encontrado',
            status: true,
            details: error.message
          })
        );
        return;
      }
      throw error;
    }
  };

export default deleteExpenseSlice.reducer;
