import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  active: {
    id: 1,
    code: 'A1',
    name: 'Beginner',
  },
  levels: [],
};

const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    toggleActiveLevel: (state, action) => ({
      ...state,
      active: action.payload.level,
    }),
    changeLevels: (state, action) => ({
      ...state,
      levels: [...action.payload.levels],
    }),
  },
});

export default levelsSlice.reducer;
export const { changeLevels, toggleActiveLevel } = levelsSlice.actions;
export const levelList = (state) => state.levels.levels;
export const activeLevel = (state) => state.levels.active;
