import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { budgetStorage, BudgetsWithId } from '../storage';

interface DataState {
  data: BudgetsWithId[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null
};

const financialRecordsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<BudgetsWithId[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = financialRecordsSlice.actions;

export const getBudgets = () => async (dispatch: Dispatch) => {
  dispatch(fetchDataStart());
  try {
    const data = budgetStorage.getData();
    dispatch(fetchDataSuccess(data));
    return data;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao carregar os dados'));
  }
};

export const createBudget = (data: BudgetsWithId) => async (dispatch: Dispatch) => {
  dispatch(fetchDataStart());
  try {
    budgetStorage.addItem(data);
    const dataStorage = budgetStorage.getData();
    dispatch(fetchDataSuccess(dataStorage));
    return dataStorage;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao criar o orçamento'));
  }
};

export default financialRecordsSlice.reducer;
