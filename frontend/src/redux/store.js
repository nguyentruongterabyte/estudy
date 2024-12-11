import { configureStore } from '@reduxjs/toolkit';
import questionsSingleReducer from './features/questionsSingleSlice';
import questionGroupsReducer from './features/questionGroupsSilce';
import questionBundlesReducer from './features/questionBundlesSlice';
import userAnswersReducer from './features/userAnswersSlice';
import vocabularyTopicsReducer from './features/vocabularyTopicsSlice';
import vocabulariesReducer from './features/vocabulariesSlice';
import vocabularyPracticeStatusesReducer from './features/vocabularyPracticeStatusesSlice';
import grammarsReducer from './features/grammarsSlice';
import accountsReducer from './features/accountsSlice';
export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    questionsSingle: questionsSingleReducer,
    questionGroups: questionGroupsReducer,
    questionBundles: questionBundlesReducer,
    userAnswers: userAnswersReducer,
    vocabularyTopics: vocabularyTopicsReducer,
    vocabularies: vocabulariesReducer,
    vocabularyPracticeStatuses: vocabularyPracticeStatusesReducer,
    grammars: grammarsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
