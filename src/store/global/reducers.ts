import { IGlobalStore } from "."


export const globalReducer = {
  showSpinner: (state: IGlobalStore) => {
    state.isLoading++
  },
  hideSpinner: (state: IGlobalStore) => {
    state.isLoading--
  },
  clearSpinner: (state: IGlobalStore) => {
    state.isLoading = 0
  }
}