import axiosInstance from "../api/connectSurfApi";


const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export class NotificationService {
  static getNotifications(page?: number, size?: number) {
    let query = "";
    if (page || size) {
      const params = new URLSearchParams();
      if (page) params.append("currentPage", page.toString());
      if (size) params.append("size", size.toString());
      query = `?${params.toString()}`;
    }

    const user = getUserFromLocalStorage();
    const tier = user?.tier || "tier-1"; 

    // Determine the appropriate API endpoint based on the tier
    const endpoint =
      tier === "tier-4"
        ? `/notification${query}`
        : `/notification/tier${query}`;

    return axiosInstance.get(endpoint).then((response) => {
      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to fetch notifications"
        );
      }
      return response.data.data;
    });
  }

  // Mark all notifications as read
  static markNotificationAsRead() {
    return axiosInstance
      .post(`/notification`) 
      .then((response) => {
        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to mark notifications as read"
          );
        }
        return response.data.data;
      });
  }

  // Fetch a single notification by its ID
  static getNotificationById(notificationID: string) {
    return axiosInstance
      .get(`/notification/${notificationID}`)
      .then((response) => {
        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch the notification"
          );
        }
        return response.data.data;
      });
  }
}
