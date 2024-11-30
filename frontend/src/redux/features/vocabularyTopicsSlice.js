import { createSlice } from '@reduxjs/toolkit';
import logFields from '../logFields';

const initialState = {
  changeLog: [],
  isAddNew: false,
  isEdit: false,
  active: {
    id: 1,
    name: 'Chào',
  },
  vocabularyTopics: [
    {
      id: 1,
      name: 'Chào',
    },
    {
      id: 2,
      name: 'Mừng',
    },
    {
      id: 3,
      name: 'Trở',
    },
    {
      id: 4,
      name: 'Lại',
    },
  ],
};

const vocabularyTopicsSlice = createSlice({
  name: 'vocabularyTopics',
  initialState,
  reducers: {
    // change vocabulary list
    changeVocabularyTopics: (state, action) => ({
      ...state,
      vocabularyTopics: [...action.payload.vocabularyTopics],
    }),

    // add vocabulary
    addVocabularyTopic: (state, action) => ({
      ...state,
      vocabularyTopics: [...state.vocabularyTopics, { id: action.payload.id, name: action.payload.name }],
    }),

    // delete vocabulary
    deleteVocabularyTopic: (state, action) => ({
      ...state,
      vocabularyTopics: [...state.vocabularyTopics.filter((group) => group.id !== action.payload.topicId)],
    }),

    // sort vocabularys by name
    sortvocabularyTopicsByName: (state) => ({
      ...state,
      vocabularyTopics: [...state.vocabularyTopics].sort((a, b) => a.name.localeCompare(b.name)),
    }),

    // set active vocabulary
    setActive: (state, action) => ({
      ...state,
      active: {
        id: action.payload.id,
        name: action.payload.name,
      },
    }),

    // is add new false/true
    toggleAddNew: (state, action) => ({
      ...state,
      isAddNew: action.payload.toggle,
    }),

    // is edit false/true
    toggleEdit: (state, action) => ({
      ...state,
      isEdit: action.payload.toggle,
    }),

    // update question group name
    updateName: (state, action) => {
      const updatedStateWithTopicName = {
        ...state,
        active: {
          ...state.active,
          name: action.payload.name,
        },
        vocabularyTopics: state.vocabularyTopics.map((g) =>
          g.id === action.payload.id ? { ...g, name: action.payload.name } : g,
        ),
      };

      const changeNameLog = {
        field: logFields.vocabularyTopicName,
        oldValue: state.vocabularyTopics.find((g) => g.id === action.payload.id).name,
        newValue: action.payload.name,
      };

      return {
        ...updatedStateWithTopicName,
        changeLog: [...updatedStateWithTopicName.changeLog, changeNameLog],
      };
    },

    // remove change log field
    removeChangeLogsByField: (state, action) => ({
      ...state,
      changeLog: state.changeLog.filter((log) => log.field !== action.payload.field),
    }),
  },
});

export const {
  changeVocabularyTopics,
  addVocabularyTopic,
  sortvocabularyTopicsByName,
  deleteVocabularyTopic,
  setActive,
  toggleEdit,
  toggleAddNew,
  updateName,
  removeChangeLogsByField,
} = vocabularyTopicsSlice.actions;

export const vocabularyPracticeStatuses = {
  memorized: 1,
  unmemorized: 2,
  unanswered: 3,
};

export default vocabularyTopicsSlice.reducer;
export const vocabularyTopicList = (state) => state.vocabularyTopics.vocabularyTopics;

export const activeTopic = (state) => state.vocabularyTopics.active;
export const adding = (state) => state.vocabularyTopics.isAddNew;
export const editing = (state) => state.vocabularyTopics.isEdit;

export const changeLog = (state) => state.vocabularyTopics.changeLog;
