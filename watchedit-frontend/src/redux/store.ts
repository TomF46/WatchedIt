import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "../tools/localStorage";
import tokens from "./reducers/authenticationReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminReducer from "./reducers/adminReducer";
import notificationsReducer from "./reducers/notificationsReducer";
const stateWithUser = loadState();

const store = configureStore({
  reducer: {
    tokens: tokens,
    admin: adminReducer,
    notifications: notificationsReducer,
  },
  preloadedState: stateWithUser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
