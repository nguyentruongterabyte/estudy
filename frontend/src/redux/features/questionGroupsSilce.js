import { createSlice } from '@reduxjs/toolkit';

const initialState = [
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
];

const questionGroupsSlice = createSlice({
  name: 'questionGroups',
  initialState,
  reducers: {
    changeQuestionGroups: (state, action) => [...action.payload.questionGroups],
    addQuestionGroup: (state, action) => [...state, action.payload.questionGroup],
    changeGroupName: (state, action) => [
      ...state.filter((group) => group.id !== action.payload.id),
      { id: action.payload.id, name: action.payload.name },
    ],
    deleteQuestionGroup: (state, action) => [...state.filter(group => group.id !== action.payload.groupId)],
    sortQuestionGroupsByName: (state) => [...state].sort((a, b) => a.name.localeCompare(b.name)),
  },
});

export const { changeQuestionGroups, addQuestionGroup, changeGroupName, sortQuestionGroupsByName, deleteQuestionGroup } = questionGroupsSlice.actions;

export default questionGroupsSlice.reducer;
export const questionGroupList = (state) => state.questionGroups;
