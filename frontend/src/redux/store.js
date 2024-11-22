import { configureStore } from '@reduxjs/toolkit';
import testReducer from './features/testSlice';
import questionGroupsReducer from './features/questionGroupsSilce';
import questionBundlesReducer from './features/questionBundlesSlice';
export const store = configureStore({
  reducer: {
    test: testReducer,
    questionGroups: questionGroupsReducer,
    questionBundles: questionBundlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
