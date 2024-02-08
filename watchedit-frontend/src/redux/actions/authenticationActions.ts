import * as types from "./actionTypes";
import {
  saveTokens,
  removeTokens,
  attatchBearerToken,
} from "../../tools/localStorage";
import * as authenticationApi from "../../api/authenticationApi";
import { LoginCredentials } from "../../types/AuthDefinitions";
import { Tokens } from "../../types/Tokens";
import { Dispatch } from "@reduxjs/toolkit";

const userLoginSuccess = (tokens: Tokens) => {
  return { type: types.USER_LOGIN_SUCCESS, tokens };
};

const userLogoutSuccess = () => {
  return { type: types.USER_LOGOUT_SUCCESS };
};

export const login = (userLoginDetails: LoginCredentials) => {
  return function (dispatch: Dispatch) {
    return authenticationApi
      .login(userLoginDetails)
      .then((tokens) => {
        saveTokens(tokens);
        attatchBearerToken(tokens.token);
        dispatch(userLoginSuccess(tokens));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const logout = () => {
  return function (dispatch: Dispatch) {
    removeTokens();
    dispatch(userLogoutSuccess());
  };
};
