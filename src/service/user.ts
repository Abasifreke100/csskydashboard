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
      const response = await axiosInstance.post('/user/admin/signup', signUpData);
      if (!response.data.success) {
        throw new Error(response.data.message || "Sign-up failed");
      }
      return response.data.data;
    }
  }
  
