/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../api/connectSurfApi";

export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async signUpUser(signUpData: SignUpData): Promise<any> {
    const response = await axiosInstance.post("/user/admin/signup", signUpData);
    if (!response.data.success) {
      throw new Error(response.data.message || "Sign-up failed");
    }
    return response.data.data;
  }

  static async getAllUserIds() {
    const response = await axiosInstance.get(`/ticket/get/user/ids`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch user IDs");
    }
    return response.data.data;
  }

  static async deleteUser(userId: string): Promise<void> {
    const response = await axiosInstance.delete(`/user/delete/admin/${userId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete user");
    }
  }

  // CUSTOMER USERS

  static async verifyUser(email: string, type: string): Promise<any> {
    // Dynamically create the endpoint based on `type`
    const endpoint = `/${type}/verify/nin`; // This is now dynamic
    try {
      const response = await axiosInstance.post(endpoint, { email });
      if (!response.data.success) {
        throw new Error(response.data.message || "Verification failed");
      }
      return response.data.data;
    } catch (error) {
      console.error("Verification failed for email:", email, error);
      throw error;
    }
  }
  // Activate a user by activation code
  static async activateUser(code: string): Promise<any> {
    const response = await axiosInstance.post("/user/activate", { code });
    if (!response.data.success) {
      throw new Error(response.data.message || "Activation failed");
    }
    return response.data.data;
  }

  // Create a user profile
  static async createUserProfile(profileData: any): Promise<any> {
    const response = await axiosInstance.post(
      "/user/create-profile",
      profileData
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Profile creation failed");
    }
    return response.data.data;
  }

  // Delete customer(individual  | corporate) by id

  static async deleteCustomer(id: string, type?: string): Promise<any> {
    const response = await axiosInstance.delete(`/${type}/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Deletion failed");
    }
    return response.data.data;
  }
}
