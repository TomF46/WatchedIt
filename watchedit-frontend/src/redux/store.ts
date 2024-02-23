import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "../tools/localStorage";
import tokens from "./reducers/authenticationReducer";
import notificationCount from "./reducers/notificationCountReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminReducer from "./reducers/adminReducer";
const stateWithUser = loadState();

const store = configureStore({
  reducer: {
    tokens: tokens,
    admin: adminReducer,
    notificationCount: notificationCount,
  },
  preloadedState: stateWithUser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
