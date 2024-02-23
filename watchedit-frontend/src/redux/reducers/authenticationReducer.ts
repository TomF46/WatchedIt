import { Tokens } from "../../types/Tokens";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import * as authenticationApi from "../../api/authenticationApi";
import {
  attatchBearerToken,
  removeTokens,
  saveTokens,
} from "../../tools/localStorage";
import { LoginCredentials } from "../../types/Auth";

interface AuthenticationState {
  tokens: Tokens | null;
}

const initialState: AuthenticationState = {
  tokens: null,
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<Tokens>) => {
      state.tokens = action.payload;
    },
    setUserLoggedOut: (state) => {
      state.tokens = null;
    },
  },
});

const { setUserLoggedIn, setUserLoggedOut } = AuthenticationSlice.actions;

export const login = (userLoginDetails: LoginCredentials) => {
  return function (dispatch: Dispatch) {
    return authenticationApi
      .login(userLoginDetails)
      .then((tokens) => {
        saveTokens(tokens);
        attatchBearerToken(tokens.token);
        dispatch(setUserLoggedIn(tokens));
      })
      .catch((err) => {
        throw err;
      });
  };
};

export const logout = () => {
  return function (dispatch: Dispatch) {
    removeTokens();
    dispatch(setUserLoggedOut());
  };
};

export default AuthenticationSlice.reducer;
