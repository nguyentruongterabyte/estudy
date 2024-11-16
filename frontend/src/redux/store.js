import { configureStore } from '@reduxjs/toolkit';
import testReducer from './features/testSlice';
import questionGroupsReducer from './features/questionGroupsSilce';

export const store = configureStore({
  reducer: {
    test: testReducer,
    questionGroups: questionGroupsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
