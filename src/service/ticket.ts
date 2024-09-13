import axiosInstance from "../api/connectSurfApi";

export class TicketService {
  static getTickets(userId: string) {
    return axiosInstance
      .get(`/ticket/user/get`, {
        params: { userId },
      })
      .then((response) => {
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch task data");
        }
        return response.data.data;
      });
  }
}
