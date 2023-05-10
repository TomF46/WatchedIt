import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '../tools/localStorage';
import tokens from "./reducers/authenticationReducer";
import IsAdmin from './reducers/isAdminReducer';
import notificationCount from "./reducers/notificationCountReducer";
let stateWithUser = loadState();

export default configureStore({
  reducer: {
    tokens: tokens,
    isAdmin: IsAdmin,
    notificationCount: notificationCount
  },
  preloadedState: stateWithUser
})