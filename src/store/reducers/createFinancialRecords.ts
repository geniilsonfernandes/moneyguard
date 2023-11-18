import { ExpenseFields } from '@/pages/Expense/shared/schema';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { financialRecordStorage } from '../storage';

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

export const createFinancialRecords =
  ({ data }: createProps) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    try {
      financialRecordStorage.addItem(data);
      dispatch(fetchDataSuccess());
      return true;
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao criar o orçamento'));
    }
  };

export default createFinancialRecordsSlice.reducer;
