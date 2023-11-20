import { ExpenseFields } from '@/pages/Expense/shared/schema';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { ExpenseStorageDTO, financialRecordStorage } from '../storage';

import { NotFoundError, StorageError } from '@/utils/useStorage';
import { RootState } from '..';

type Error = {
  message: string | null;
  status: boolean;
  details?: string;
} | null;

type createProps = {
  data: ExpenseFields;
};
type upadateProps = {
  data: ExpenseFields;
  id: string;
};
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

const createExpenseSlice = createSlice({
  name: 'create/expense',
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
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = createExpenseSlice.actions;

function generateDateArray(initialDate: Date, numberOfMonths: number): Date[] {
  const datesArray: Date[] = [];
  let currentDate = dayjs(initialDate);

  for (let i = 0; i < numberOfMonths; i++) {
    datesArray.push(currentDate.toDate());
    currentDate = currentDate.add(1, 'month');
  }

  return datesArray;
}

export const updateExepense =
  ({ data, id }: upadateProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { user_id } = getState().auth;
    console.log(data);

    dispatch(fetchDataStart());
    try {
      const period_date = generateDateArray(data.due_date as Date, data.duration || 1);
      financialRecordStorage.updateItem({
        ...data,
        period_date,
        user_id,
        id
      } as ExpenseStorageDTO);

      new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
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

export const createExpense =
  ({ data }: createProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { user_id } = getState().auth;

    dispatch(fetchDataStart());
    try {
      const period_date = generateDateArray(data.due_date as Date, data.duration || 1);

      const newExpense = {
        ...data,
        period_date,
        user_id
      };

      financialRecordStorage.addItem(newExpense);
      dispatch(fetchDataSuccess());

      return true;
    } catch (error) {
      if (error instanceof StorageError) {
        dispatch(
          fetchDataFailure({
            message: 'Não foi possível criar o orcamento',
            status: true,
            details: error.message
          })
        );
        return;
      }
      throw error;
    }
  };

export default createExpenseSlice.reducer;
