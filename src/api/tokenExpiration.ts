import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../features/auth/authSlice";
import { selectAuth } from "../features/auth/authSlice";

const tokenExpirationMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { token } = selectAuth(getState());

    // Check if the token is expired
    if (token && isTokenExpired(token)) {
      // If token refresh fails, dispatch logout action
      dispatch(logout());
    }

    return next(action);
  };

export function isTokenExpired(token: string): boolean {
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = tokenPayload.exp * 1000; 
  const currentTime = Date.now();
  return currentTime > expirationTime;
}

export default tokenExpirationMiddleware;
