import initialState from "../redux/reducers/initialState";
import client from "../api/client";
import { Tokens } from "../types/Tokens";

export const loadState = () => {
  const tokens = localStorage.getItem("tokens");
  const tokensState = tokens == null ? null : JSON.parse(tokens);
  if (tokensState != null) attatchBearerToken(tokensState.token); // If we have access tokens add them as bearer token on axios client;
  const state = initialState;
  state.tokens = tokensState;
  return state;
};

export const saveTokens = (tokens: Tokens) => {
  try {
    const serializedState = JSON.stringify(tokens);
    localStorage.setItem("tokens", serializedState);
  } catch {
    // ignore write errors
  }
};

export const removeTokens = () => {
  try {
    localStorage.removeItem("tokens");
  } catch {
    //
  }
};

export function attatchBearerToken(token: string): void {
  client.defaults.headers.common = { Authorization: `Bearer ${token}` };
}
