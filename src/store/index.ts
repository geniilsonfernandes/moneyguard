import { configureStore } from '@reduxjs/toolkit';
import financialRecords from './reducers/financialRecords';
import createFinancialRecords from './reducers/createFinancialRecords';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import budgets from './reducers/budgets';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // Example:
    financialRecords: financialRecords,
    createFinancialRecords: createFinancialRecords,
    budgets: budgets
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
