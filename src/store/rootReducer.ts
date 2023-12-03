import { AnyAction, combineReducers, Reducer } from "redux";
import globalSlice from "./global";
import userSlice from "./user";
import logSlice from "./log";
import { AppState } from ".";

export const DESTROY_ACTION = "DESTROY_STORE";

export const combinedReducer = combineReducers({
  global: globalSlice,
  user: userSlice,
  log: logSlice,
});

const rootReducer: Reducer = (state: AppState, action: AnyAction) => {
  if (action.type === DESTROY_ACTION) {
    state = {} as AppState;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
