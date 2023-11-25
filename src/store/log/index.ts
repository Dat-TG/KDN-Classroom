import { ILogStore } from '../../types/log';
import { extraReducers } from './thunkApi';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: ILogStore = {
  data: {
    data: [],
    pageCount: 0,
  },
};
const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {},
  extraReducers,
});

export default logSlice.reducer;