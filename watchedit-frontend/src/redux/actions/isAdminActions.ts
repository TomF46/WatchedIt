import { Dispatch } from "@reduxjs/toolkit";
import { getCurrentUserIsAdmin } from "../../api/usersApi";
import * as types from "./actionTypes";

const checkUserIsAdminSuccess = (isAdmin: boolean) => {
  return { type: types.CHECK_USER_IS_ADMIN_SUCCESS, isAdmin };
};

export const checkUserIsAdmin = () => {
  return function (dispatch: Dispatch) {
    return getCurrentUserIsAdmin()
      .then((data) => {
        dispatch(checkUserIsAdminSuccess(data.isAdmin));
      })
      .catch(() => {
        dispatch(checkUserIsAdminSuccess(false));
      });
  };
};
