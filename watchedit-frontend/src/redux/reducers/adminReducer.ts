import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUserIsAdmin } from "../../api/usersApi";

interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

export const AdminSlice = createSlice({
  name: "isAdmin",
  initialState,
  reducers: {
    setUserIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
      console.log(state);
    },
  },
});

const { setUserIsAdmin } = AdminSlice.actions;

export const checkUserIsAdmin = () => {
  return function (dispatch: Dispatch) {
    return getCurrentUserIsAdmin()
      .then((data) => {
        dispatch(setUserIsAdmin(data.isAdmin));
      })
      .catch(() => {
        dispatch(setUserIsAdmin(false));
      });
  };
};

export default AdminSlice.reducer;
