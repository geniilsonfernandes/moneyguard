import { api } from '@/http/api/api';
import BudgetDTO from '@/http/api/DTO/BudgetDTO';
import endpoints, { BudgetsResponse } from '@/http/api/endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { getUser } from './auth';

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
  const user = getUser();
  const hasBudgets = getState().budgets.data.length > 0;

  if (hasBudgets) {
    dispatch(fetchDataSuccess(getState().budgets.data));
    return;
  }

  try {
    const {
      data: { budgets }
    } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
      params: {
        user_id: user?.user_id || ''
      }
    });
    dispatch(fetchDataSuccess(budgets));
    return budgets;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao carregar os dados'));
  }
};

type createBudgetPayload = {
  name: string;
  amount: number;
};

export const createBudget = (payload: createBudgetPayload) => async (dispatch: Dispatch) => {
  const user = getUser();
  dispatch(fetchDataStart());
  try {
    const {
      data: { budgets }
    } = await api.post<BudgetsResponse>(endpoints.budgets.create(), {
      ...payload,

      user_id: user?.user_id
    });

    dispatch(fetchDataSuccess(budgets));
    return budgets;
  } catch (error) {
    dispatch(fetchDataFailure('Erro ao criar o orçamento'));
  }
};

export default financialRecordsSlice.reducer;
