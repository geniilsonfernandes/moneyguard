import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { budgetStorage, BudgetsWithId } from '../storage';
import BudgetDTO from '@/http/api/DTO/BudgetDTO';
import { api } from '@/http/api/api';
import endpoints, { BudgetsResponse } from '@/http/api/endpoints';
import { RootState } from '..';

interface DataState {
  data: BudgetDTO[];
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
    fetchDataSuccess(state, action: PayloadAction<BudgetDTO[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setBudgets(state, action: PayloadAction<BudgetDTO[]>) {
      state.data = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure, setBudgets } =
  financialRecordsSlice.actions;

export const getBudgets = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(fetchDataStart());
  const { user_id } = getState().auth;
  try {
    const {
      data: { budgets }
    } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
      params: {
        user_id
      }
    });
    dispatch(fetchDataSuccess(budgets));
    return budgets;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao carregar os dados'));
  }
};

export const createBudget = (data: BudgetsWithId) => async (dispatch: Dispatch) => {
  dispatch(fetchDataStart());
  try {
    budgetStorage.addItem(data);
    const dataStorage = budgetStorage.getData();
    dispatch(fetchDataSuccess([]));
    return dataStorage;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao criar o orçamento'));
  }
};

export default financialRecordsSlice.reducer;
