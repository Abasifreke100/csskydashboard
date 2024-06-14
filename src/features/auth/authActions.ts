// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface User {
  username: string;
  email: string;
  // Add more properties if needed
}

interface ErrorResponse {
  errors: string[];
}

export const register = createAsyncThunk<User, FormData>(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post<User>("", userData);
      return response.data;
    } catch (err: unknown) {
      const error: AxiosError<ErrorResponse> = err as AxiosError<ErrorResponse>;
      return thunkAPI.rejectWithValue(error.response?.data.errors);
    }
  }
);

export const login = createAsyncThunk<User, FormData>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post<User>("/login", userData);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;

        console.error("Axios Error:", axiosError?.response);
        if (axiosError.response) {
          return thunkAPI.rejectWithValue(
            axiosError?.response?.status +
              " " +
              axiosError?.response?.statusText
          );
        } else if (axiosError.request) {
          return thunkAPI.rejectWithValue("Network error occurred.");
        } else {
          return thunkAPI.rejectWithValue("Error during request setup.");
        }
      } else {
        console.error("Unknown error:", err);
        return thunkAPI.rejectWithValue("Unknown error occurred.");
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  User | undefined,
  void,
  { rejectValue: string[] }
>("auth/getCurrentUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken") ?? "";
    const response = await axios.get<User>(" ", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err: unknown) {
    const error: AxiosError<ErrorResponse> = err as AxiosError<ErrorResponse>;
    return thunkAPI.rejectWithValue(error.response?.data.errors ?? []);
  }
});

export const loggedOut = createAsyncThunk<void>("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});
