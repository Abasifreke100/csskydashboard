/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Cookies from "js-cookie";
import { decrypt, encrypt } from "../service/encryption";
import { UserService } from "../service/user";

interface UserState {
  userData: any | null; // Optional state for user data
  verifyUser: (email: string, type: string) => Promise<any>; // Accepting type as parameter
  activateUser: (code: string) => Promise<any>;
  createUserProfile: (profileData: any) => Promise<any>;
}

const currentDate = new Date();
const newDate = new Date(currentDate);
newDate.setHours(currentDate.getHours() + 24);

// Function to save data in cookies
export const saveToCookies = (key: string, data: any): void => {
  Cookies.set(key, encrypt(JSON.stringify(data)), {
    httpOnly: false,
    expires: newDate,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

// Function to get data from cookies
export const getFromCookies = (key: string): any | null => {
  const cookieData = decrypt(Cookies.get(key));
  if (cookieData) {
    if (typeof cookieData === "string") {
      try {
        return JSON.parse(cookieData);
      } catch (error) {
        console.error("Invalid JSON string:", cookieData);
        return cookieData;
      }
    } else {
      return cookieData;
    }
  }
  return null;
};

// Function to remove data from cookies
export const removeFromCookies = (key: string): void => {
  Cookies.remove(key);
};

// Zustand store
export const useStore = create<UserState>((set) => ({
  userData: null, // Initialize userData state

  verifyUser: async (email: string, type: string) => {
    try {
      const response = await UserService.verifyUser(email, type); // Call to API with both email and type
      return response;
    } catch (error) {
      console.error("Error verifying user:", error);
      throw error;
    }
  },

  activateUser: async (code: string) => {
    try {
      const response = await UserService.activateUser(code); // Call to API
      return response;
    } catch (error) {
      console.error("Error activating user:", error);
      throw error;
    }
  },

  createUserProfile: async (profileData: any) => {
    try {
      const response = await UserService.createUserProfile(profileData); // Call to API
      set({ userData: response }); // Optionally update state with new profile
      return response;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  },
}));
