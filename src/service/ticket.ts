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

  static async getTicketAndTask(ticketId: string, dontShowToUser = false) {
    try {
      // Create promises for the ticket and task requests
      const ticketPromise = axiosInstance.get(`/ticket/get`, {
        params: {
          ticket_id: ticketId,
          dontShowToUser: dontShowToUser.toString(),
        },
      });

      const taskPromise = axiosInstance.get(`/task/ticket/${ticketId}`);

      // Run both requests in parallel using Promise.allSettled
      const [ticketResponse, taskResponse] = await Promise.allSettled([
        ticketPromise,
        taskPromise,
      ]);

      // Initialize variables to hold responses
      let ticketData = null;
      let taskData = null;

      // Check responses and log errors
      if (ticketResponse.status === "fulfilled") {
        ticketData = ticketResponse.value.data.data; // Extract ticket data
      } else {
        console.warn(`Failed to fetch ticket data: ${ticketResponse.reason}`);
      }

      if (taskResponse.status === "fulfilled") {
        taskData = taskResponse.value.data.data; // Extract task data
      } else {
        console.warn(`Failed to fetch task data: ${taskResponse.reason}`);
      }

      // Return a combined object with available data
      return {
        ticket: ticketData,
        task: taskData,
      };
    } catch (error) {
      console.error("Error fetching ticket or task data:", error);
      throw error; // Re-throw if there's a problem outside of the requests
    }
  }

  static async getSpecificTicket(ticketId: string, dontShowToUser = false) {
    try {
      // Request with dynamic ticket_id and dontShowToUser parameters
      const response = await axiosInstance.get(`/ticket/get`, {
        params: {
          ticket_id: ticketId, // Dynamic ticket ID passed as a parameter
          dontShowToUser: dontShowToUser.toString(), // Dynamic dontShowToUser value
        },
      });

      // Check if the response is successful and return data
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch ticket data");
      }

      return response?.data?.data?.data?.message;
    } catch (error) {
      console.error("Error fetching specific ticket data:", error);
      throw error;
    }
  }
}
