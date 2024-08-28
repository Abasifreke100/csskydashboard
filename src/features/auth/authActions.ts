// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import axiosInstance from "../../api/connectSurfApi";
import { User, UsersResponse } from "../../types";
import { errorToast, successToast } from "../../utils/toast";

interface ErrorResponse {
  errors: string[];
  message?: string; // Add this line
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

export const login = createAsyncThunk<UsersResponse, FormData>(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post<UsersResponse>(
        "/auth/login",
        userData
      );
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;

        console.error("Axios Error:", axiosError?.response?.data.message);
        if (axiosError.response) {
          return thunkAPI.rejectWithValue(
            axiosError?.response?.status +
              " " +
              axiosError?.response?.data.message
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
  try {
    await axiosInstance.post("/user/logout");
    successToast({
      title: "Logged Out",
      message: "You've been successfully logged out.",
    })
  } catch (error) {
    console.error("Error logging out:", error);
    errorToast({
      title: "Error",
      message: "Failed to log out",
    })
    throw error;
  }
});
