import { configureStore } from '@reduxjs/toolkit';
import testReducer from './features/testSlice';
import questionGroupsReducer from './features/questionGroupsSilce';
import questionBundlesReducer from './features/questionBundlesSlice';
import userAnswersReducer from './features/userAnswersSlice';
import vocabularyTopicsReducer from './features/vocabularyTopicsSlice';
import vocabulariesReducer from './features/vocabulariesSlice';
export const store = configureStore({
  reducer: {
    test: testReducer,
    questionGroups: questionGroupsReducer,
    questionBundles: questionBundlesReducer,
    userAnswers: userAnswersReducer,
    vocabularyTopics: vocabularyTopicsReducer,
    vocabularies: vocabulariesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
