import axiosInstance from "../api/connectSurfApi";

export class TaskService {
  // Method to get task by ticket ID
  static getTaskByTicketId(ticketID: string) {
    return axiosInstance.get(`/task/ticket/${ticketID}`).then((response) => {
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch task data");
      }
      return response.data.data;
    });
  }

  // Existing method to get task by ID
  static getTaskById(taskID: string) {
    return axiosInstance.get(`/task/${taskID}`).then((response) => {
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch task data");
      }
      return response.data.data;
    });
  }
}
