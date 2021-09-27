import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { paletteReducer } from "./palette";

export const store = createStore(
  combineReducers({
    palettes: paletteReducer,
  }),
  applyMiddleware(thunk)
);
