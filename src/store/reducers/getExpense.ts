import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ExpenseFieldsWithId, financialRecordStorage } from '../storage';

interface DataState {
  data: ExpenseFieldsWithId;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: {} as ExpenseFieldsWithId,
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
    fetchDataSuccess(state, action: PayloadAction<ExpenseFieldsWithId>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  getExpenseSlice.actions;

// export const getFinancialRecords = () => async (dispatch: Dispatch, getState: () => RootState)
export const getExpenseById =
  ({ id }: { id: string }) =>
    async (dispatch: Dispatch) => {
      dispatch(fetchDataStart());
      try {
        const data = financialRecordStorage.getById(id);

        if (!data) {
          dispatch(fetchDataFailure('Erro ao carregar os dados'));
          return;
        }



        new Promise((resolve) => {
          setTimeout(() => {
            resolve(data);
            dispatch(fetchDataSuccess(data));
          }, 1000);
        });

        return data;
      } catch (error) {
        dispatch(fetchDataFailure('Erro ao carregar os dados'));
      }
    };

export default getExpenseSlice.reducer;
