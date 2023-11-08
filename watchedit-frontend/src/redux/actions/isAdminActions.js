import { getCurrentUserIsAdmin } from "../../api/usersApi";
import * as types from "./actionTypes";

const checkUserIsAdminSuccess = (isAdmin) => {
  return { type: types.CHECK_USER_IS_ADMIN_SUCCESS, isAdmin };
};

export const checkUserIsAdmin = () => {
  return function (dispatch) {
    return getCurrentUserIsAdmin()
      .then((data) => {
        dispatch(checkUserIsAdminSuccess(data.isAdmin));
      })
      .catch(() => {
        dispatch(checkUserIsAdminSuccess(false));
      });
  };
};
