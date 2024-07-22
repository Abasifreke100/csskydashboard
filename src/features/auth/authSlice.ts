import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { register, login, getCurrentUser, loggedOut } from "./authActions";
import { User } from "../../types";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const storedUserString = localStorage.getItem("user");
const storedUser = storedUserString
  ? (JSON.parse(storedUserString) as User)
  : null;

const initialState: AuthState = {
  token: localStorage.getItem("accessToken"),
  user: storedUser,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store user object
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("accessToken"); // Clear accessToken from localStorage
      localStorage.removeItem("user"); // Clear user from localStorage
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload; // Set error message
    },
    clearError: (state) => {
      state.error = null; // Clear error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? "An error occurred during registration."; // Error message on registration failure
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user)); // Store user object
        localStorage.setItem("accessToken", action.payload.data.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          "An error occurred during login."; // Error message on login failure
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload as User;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = "Failed to fetch current user data."; // Error message on fetch current user failure
      })
      .addCase(loggedOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("accessToken"); // Clear accessToken from localStorage
        localStorage.removeItem("user"); // Clear user from localStorage
      });
  },
});

// Export the actions
export const { setCredentials, logout, setError, clearError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

export const selectAuth = (state: RootState): AuthState => state.auth;
export const isAuthenticated = (state: RootState): boolean => {
  const token = state.auth.token;
  return !!token; // Return true if token exists, false otherwise
};
