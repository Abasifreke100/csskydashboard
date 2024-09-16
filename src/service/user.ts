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
}
