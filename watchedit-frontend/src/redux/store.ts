import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "../tools/localStorage";
import tokens from "./reducers/authenticationReducer";
import IsAdmin from "./reducers/isAdminReducer";
import notificationCount from "./reducers/notificationCountReducer";
import { useDispatch } from "react-redux";
const stateWithUser = loadState();

const store = configureStore({
  reducer: {
    tokens: tokens,
    isAdmin: IsAdmin,
    notificationCount: notificationCount,
  },
  preloadedState: stateWithUser,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
