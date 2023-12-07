import { api } from '@/http/api/api';
import ExpenseDTO from '@/http/api/DTO/ExpenseDTO';
import endpoints, { ExpenseResponse } from '@/http/api/endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

interface DataState {
  data: ExpenseDTO;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: {} as ExpenseDTO,
  loading: false,
  error: null
};

const getExpenseSlice = createSlice({
  name: 'get/expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<ExpenseDTO>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.data = {} as ExpenseDTO;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = getExpenseSlice.actions;

// export const getFinancialRecords = () => async (dispatch: Dispatch, getState: () => RootState)
export const getExpenseById =
  ({ id }: { id: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());
    try {
      const {
        data: { expense }
      } = await api.get<ExpenseResponse>(endpoints.expenses.getById(id));

      console.log(expense);

      dispatch(fetchDataSuccess(expense));

      return expense;
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao carregar os dados'));
    }
  };

export default getExpenseSlice.reducer;
