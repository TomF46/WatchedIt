import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '../tools/localStorage';
import tokens from "./reducers/authenticationReducer";
let stateWithUser = loadState();

export default configureStore({
  reducer: {
    tokens: tokens
  },
  preloadedState: stateWithUser
})