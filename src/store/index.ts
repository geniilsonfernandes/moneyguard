import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import getExpenses from './reducers/getExpenses';
import createExpense from './reducers/createExpense';
import budgets from './reducers/budgets';
import auth from './reducers/auth';
import getExpense from './reducers/getExpense';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example:
    expenses: getExpenses,
    createExpense: createExpense,
    expense: getExpense,
    budgets: budgets,
    auth: auth
  }
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
