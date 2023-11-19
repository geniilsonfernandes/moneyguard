import { ExpenseFields } from '@/pages/Expense/shared/schema';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { Dispatch } from 'redux';
import { financialRecordStorage } from '../storage';

import { RootState } from '..';


type createProps = {
  data: ExpenseFields;
};
// financialRecordStorage.addItem(data);

interface DataState {
  loading: boolean;
  error: string | null;
  success: boolean | null;
}

const initialState: DataState = {
  loading: false,
  error: null,
  success: null
};

const createFinancialRecordsSlice = createSlice({
  name: 'create/financialRecords',
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
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  createFinancialRecordsSlice.actions;




function generateDateArray(initialDate: Date, numberOfMonths: number): Date[] {
  const datesArray: Date[] = [];
  let currentDate = dayjs(initialDate);

  for (let i = 0; i < numberOfMonths; i++) {
    datesArray.push(currentDate.toDate());
    currentDate = currentDate.add(1, 'month');
  }

  return datesArray;
}

export const createFinancialRecords =
  ({ data }: createProps) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
      const { user_id } = getState().auth

      dispatch(fetchDataStart());
      try {
        
        const period_date = generateDateArray(data.due_date as Date, data.duration || 1);
        financialRecordStorage.addItem({ ...data, period_date, user_id });
        
        dispatch(fetchDataSuccess());
        return true;
      } catch (error) {
        console.log(error);

        dispatch(fetchDataFailure('Erro ao criar o orçamento'));
      }
    };

export default createFinancialRecordsSlice.reducer;
