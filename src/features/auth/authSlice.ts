// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { register, login, getCurrentUser, loggedOut } from './authActions'
import { isTokenExpired } from '../../api/tokenExpiration'

// Define a type for the slice state
interface AuthState {
  token: string | null
  user: unknown | null  // You can replace 'any' with a specific type if you know the structure of the user object
  isLoading: boolean
  isAuthenticated: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: localStorage.getItem('accessToken'),
  user: null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  error:null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string, user: unknown }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token);
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false;
      state.error = null; 
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
        state.error = null; // Clear error on register attempt
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state,action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred during registration.'; //  error message on registration failure
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'An error occurred during registration.'; //  error message on login failure
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = 'Failed to fetch current user data.'; // error message on fetch current user failure
      })
      .addCase(loggedOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
})

// Export the actions
export const { setCredentials, logout, setError , clearError } = authSlice.actions

// Export the reducer
export default authSlice.reducer

// Export a selector to access the auth state
export const selectAuth = (state: RootState): AuthState => state.auth
export const isAuthenticated = (state: RootState): boolean => {
    const token = state.auth.token;
    if (token) {
      return !isTokenExpired(token);
    return true
    } else {
      return false;
    }
  };
  