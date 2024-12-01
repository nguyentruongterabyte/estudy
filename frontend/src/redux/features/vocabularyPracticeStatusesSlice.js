import { createSlice } from '@reduxjs/toolkit';

export const statuses = {
  memorized: 1,
  unmemorized: 2,
  unanswered: 3,
};

const initialState = [
  {
    vocabularyId: -55,
    topicId: -55,
    status: 3,
  },
  {
    vocabularyId: -54,
    topicId: -55,
    status: 1,
  },
];

const vocabularyPracticeStatusesSlice = createSlice({
  name: 'vocabularyPracticeStatuses',
  initialState,
  reducers: {
    // change vocabularyPractice statuses
    changeVocabularyPracticeStatuses: (state, action) => action.payload.vocabularyPracticeStatuses,

    // update status
    updateStatus: (state, action) => [
      ...state.map((vocabularyStatus) =>
        vocabularyStatus.vocabularyId === action.payload.vocabularyId
          ? { ...vocabularyStatus, status: action.payload.status }
          : vocabularyStatus,
      ),
    ],
  },
});

export const { changeVocabularyPracticeStatuses, updateStatus } = vocabularyPracticeStatusesSlice.actions;

export default vocabularyPracticeStatusesSlice.reducer;

export const vocabularyPracticeStatusList = (state) => state.vocabularyPracticeStatuses;
