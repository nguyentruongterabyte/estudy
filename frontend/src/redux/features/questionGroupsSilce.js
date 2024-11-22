import { createSlice } from '@reduxjs/toolkit';

export const logFields = {
  questionGroupName: 'questionGroupName',
};


const initialState = {
  changeLog: [],
  isAddNew: false,
  isEdit: false,
  active: {
    id: 1,
    name: 'Chào',
  },
  questionGroups: [
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

const questionGroupsSlice = createSlice({
  name: 'questionGroups',
  initialState,
  reducers: {
    // change question group list
    changeQuestionGroups: (state, action) => ({
      ...state,
      questionGroups: [...action.payload.questionGroups],
    }),

    // add question group
    addQuestionGroup: (state, action) => ({
      ...state,
      questionGroups: [...state.questionGroups, { id: action.payload.id, name: action.payload.name }],
    }),

    // change group name
    changeGroupName: (state, action) => ({
      ...state,
      questionGroups: [
        ...state.questionGroups.filter((group) => group.id !== action.payload.id),
        { id: action.payload.id, name: action.payload.name },
      ],
    }),

    // delete question group
    deleteQuestionGroup: (state, action) => ({
      ...state,
      questionGroups: [...state.questionGroups.filter((group) => group.id !== action.payload.groupId)],
    }),

    // sort question groups by name
    sortQuestionGroupsByName: (state) => ({
      ...state,
      questionGroups: [...state.questionGroups].sort((a, b) => a.name.localeCompare(b.name)),
    }),

    // set active question group
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
      const updatedStateWithGroupName = {
        ...state,
        questionGroups: state.questionGroups.map((g) =>
          g.id === action.payload.id ? { ...g, name: action.payload.name } : g,
        ),
      };

      const changeNameLog = {
        field: logFields.questionGroupName,
        oldValue: state.questionGroups.find((g) => g.id === action.payload.id).name,
        newValue: action.payload.name,
      };
      return {
        ...updatedStateWithGroupName,
        changeLog: [...updatedStateWithGroupName.changeLog, changeNameLog],
      };
    },
  },
});

export const {
  changeQuestionGroups,
  addQuestionGroup,
  changeGroupName,
  sortQuestionGroupsByName,
  deleteQuestionGroup,
  setActive,
  toggleEdit,
  toggleAddNew,
  updateName,
} = questionGroupsSlice.actions;

export default questionGroupsSlice.reducer;
export const questionGroupList = (state) => state.questionGroups.questionGroups;

export const activeGroup = (state) => state.questionGroups.active;
export const adding = (state) => state.questionGroups.isAddNew;
export const editing = (state) => state.questionGroups.isEdit;
