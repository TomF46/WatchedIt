import initialState from "../redux/reducers/initialState";
import client from "../api/client";

export const loadState = () => {
  const tokens = localStorage.getItem("tokens");
  let tokensState = tokens == null ? null : JSON.parse(tokens);
  if (tokensState != null) attatchBearerToken(tokensState.token); // If we have access tokens add them as bearer token on axios client;
  let state = initialState;
  state.tokens = tokensState;
  return state;
};

export const saveTokens = (tokens) => {
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

export function attatchBearerToken(token) {
  client.defaults.headers.common = { Authorization: `Bearer ${token}` };
}
