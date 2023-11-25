
import { createSelector } from "@reduxjs/toolkit"
import { AppState } from ".."

const getSelf = (state: AppState) => state

export const sGetLog = createSelector(
  getSelf,
  (state: AppState) => state.log.data
)