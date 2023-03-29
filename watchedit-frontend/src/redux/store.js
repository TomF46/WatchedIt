import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '../tools/localStorage';
import tokens from "./reducers/authenticationReducer";
import IsAdmin from './reducers/isAdminReducer';
let stateWithUser = loadState();

export default configureStore({
  reducer: {
    tokens: tokens,
    isAdmin: IsAdmin
  },
  preloadedState: stateWithUser
})