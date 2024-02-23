import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "../tools/localStorage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminReducer from "./reducers/adminReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import authenticationReducer from "./reducers/authenticationReducer";
const stateWithUser = loadState();

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
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
