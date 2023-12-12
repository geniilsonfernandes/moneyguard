import { api } from '@/http/api/api';
import BudgetDTO from '@/http/api/DTO/BudgetDTO';
import endpoints, { BudgetsResponse } from '@/http/api/endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { RootState } from '..';
import { getUser } from './auth';
import { setExpensesBudgets } from './getExpenses';

interface DataState {
  data: BudgetDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [] as BudgetDTO[],
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

  const { user } = getState().auth;
  const storageUser = getUser();

  try {
    const {
      data: { budgets }
    } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
      params: {
        user_id: user?.id || storageUser?.user.id
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

export const createBudget =
  (payload: createBudgetPayload) => async (dispatch: Dispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    dispatch(fetchDataStart());
    try {
      await api.post<BudgetsResponse>(endpoints.budgets.create(), {
        ...payload,
        user_id: user?.id
      });

      const {
        data: { budgets }
      } = await api.get<BudgetsResponse>(endpoints.budgets.get(), {
        params: {
          user_id: user?.id
        }
      });

      const findBudget = budgets.find((budget) => budget.name === payload.name);

      dispatch(setExpensesBudgets(budgets));
      dispatch(fetchDataSuccess(budgets));
      return findBudget;
    } catch (error) {
      dispatch(fetchDataFailure('Erro ao criar o orçamento'));
    }
  };

export default financialRecordsSlice.reducer;
