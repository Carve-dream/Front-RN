import { configureStore } from '@reduxjs/toolkit';
import diaryReducer from './features/diary/diarySlice';

export const store = configureStore({
  reducer: {
    diary: diaryReducer
  },
});
