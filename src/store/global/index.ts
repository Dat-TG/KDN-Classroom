import { createSlice } from "@reduxjs/toolkit"
import { globalReducer } from "./reducers"

export interface IGlobalStore {
  isLoading: number
}

const initialState: IGlobalStore = {
  isLoading: 0,
}

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: globalReducer
})

export const { showSpinner, hideSpinner, clearSpinner } = globalSlice.actions

export default globalSlice.reducer