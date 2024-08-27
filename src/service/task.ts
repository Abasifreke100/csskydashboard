import axiosInstance from "../api/connectSurfApi";

export class TaskService {
  static getTaskById(taskID: string) {
    return axiosInstance.get(`/task/${taskID}`).then(response => {
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch task data");
      }
      return response.data.data;
    });
  }
}
