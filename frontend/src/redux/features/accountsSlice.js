import { createSlice } from '@reduxjs/toolkit';
const initialState = [
  {
    id: 1,
    firstName: 'Trưởng',
    lastName: 'Nguyễn',
    email: 'nguyenthaitruong1223@gmail.com',
    phoneNumber: '0948915051',
    photoId: 174,
    createdAt: '2024-11-18T15:45:56.000Z',
    updatedAt: '2024-12-09T01:52:58.000Z',
    roles: [30001, 52456, 78643],
  },
  {
    id: 2,
    firstName: null,
    lastName: null,
    email: 'nguyenthaitruong.entertainment@gmail.com',
    phoneNumber: null,
    photoId: null,
    createdAt: '2024-11-27T10:38:59.000Z',
    updatedAt: '2024-11-27T10:38:59.000Z',
    roles: [30001],
  },
  {
    id: 4,
    firstName: null,
    lastName: null,
    email: 'nguyenthaitruong.entertainment1@gmail.com',
    phoneNumber: null,
    photoId: 176,
    createdAt: '2024-12-08T13:30:07.000Z',
    updatedAt: '2024-12-08T13:35:48.000Z',
    roles: [30001],
  },
];

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    changeAccounts: (state, action) => [...action.payload.accounts],
    deleteAccount: (state, action) => [...state.filter((account) => account.id !== action.payload.id)],
  },
});

export default accountsSlice.reducer;

export const { changeAccounts, deleteAccount } = accountsSlice.actions;

export const accountList = (state) => state.accounts;
