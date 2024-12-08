import { createSlice } from '@reduxjs/toolkit';
import logFields from '../logFields';

const initialState = {
  changeLog: [],
  isAddNew: false,
  isEdit: false,
  isComplete: false,
  active: {
    id: -10,
    name: 'Chào',
  },
  grammars: [
    {
      id: -10,
      name: 'Chào',
    },
  ],
};

const grammarsSlice = createSlice({
  name: 'grammars',
  initialState,
  reducers: {
    // change grammar list
    changeGrammars: (state, action) => ({
      ...state,
      grammars: [...action.payload.grammars],
    }),

    // add grammar
    addGrammar: (state, action) => ({
      ...state,
      grammars: [...state.grammars, { id: action.payload.id, name: action.payload.name }],
    }),

    // delete grammar
    deleteGrammar: (state, action) => ({
      ...state,
      grammars: [...state.grammars.filter((grammar) => grammar.id !== action.payload.grammarId)],
    }),

    // sort grammars by name
    sortGrammarsByName: (state) => ({
      ...state,
      grammars: [...state.grammars].sort((a, b) => a.name.localeCompare(b.name)),
    }),

    // set active grammar
    setActive: (state, action) => ({
      ...state,
      active: {
        id: action.payload.id,
        name: action.payload.name,
      },
    }),

    toggleComplete: (state, action) => ({
      ...state,
      isComplete: action.payload.toggle,
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

    // update grammar name
    updateName: (state, action) => {
      const updatedStateWithGrammarName = {
        ...state,
        grammars: state.grammars.map((g) => (g.id === action.payload.id ? { ...g, name: action.payload.name } : g)),
      };

      const changeNameLog = {
        field: logFields.grammarName,
        oldValue: state.grammars.find((g) => g.id === action.payload.id)?.name,
        newValue: action.payload.name,
      };

      return {
        ...updatedStateWithGrammarName,
        changeLog: [...updatedStateWithGrammarName.changeLog, changeNameLog],
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
  changeGrammars,
  addGrammar,
  sortGrammarsByName,
  deleteGrammar,
  setActive,
  toggleEdit,
  toggleAddNew,
  updateName,
  removeChangeLogsByField,
  toggleComplete,
} = grammarsSlice.actions;

export default grammarsSlice.reducer;
export const grammarList = (state) => state.grammars.grammars;

export const activeGrammar = (state) => state.grammars.active;
export const adding = (state) => state.grammars.isAddNew;
export const editing = (state) => state.grammars.isEdit;
export const finished = (state) => state.grammars.isComplete;
export const changeLog = (state) => state.grammars.changeLog;
