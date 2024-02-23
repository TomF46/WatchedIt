import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getUnreadNotificationCount } from "../../api/notificationApi";

interface NotificationsState {
  count: number;
}

const initialState: NotificationsState = {
  count: 0,
};

export const NotificationsSlice = createSlice({
  name: "isAdmin",
  initialState,
  reducers: {
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    decrementNotificationCount: (state) => {
      state.count -= 1;
    },
  },
});

const { setNotificationCount, decrementNotificationCount } =
  NotificationsSlice.actions;

export const loadNotificationCount = () => {
  return function (dispatch: Dispatch) {
    return getUnreadNotificationCount()
      .then((res) => {
        dispatch(setNotificationCount(res.count));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const decrementNotificationsCount = () => {
  return function (dispatch: Dispatch) {
    dispatch(decrementNotificationCount());
  };
};

export default NotificationsSlice.reducer;
