import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ExpenseFieldsWithId, financialRecordStorage } from '../storage';

type origins = 'create' | 'update' | 'delete' | null;

interface DataState {
  data: ExpenseFieldsWithId[];
  loading: boolean;
  error: string | null;
  origin: origins;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
  origin: null
};

const financialRecordsSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<ExpenseFieldsWithId[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    financialRecordsSetOrigin(state, action: PayloadAction<origins>) {
      state.origin = action.payload;
    },
    financialRecordsClearOrigin(state) {
      state.origin = null;
    }
  }
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  financialRecordsSetOrigin,
  financialRecordsClearOrigin
} = financialRecordsSlice.actions;

// export const getFinancialRecords = () => async (dispatch: Dispatch, getState: () => RootState)
export const getFinancialRecords = () => async (dispatch: Dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = financialRecordStorage.getData();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao carregar os dados'));
  }
};

export default financialRecordsSlice.reducer;
