import { Notification } from "../../hooks/useNotifications";

/**
 * Generates a notification object with a message and description based on the type, channel, and task details provided.
 *
 * @param {Notification} notification - The notification object containing details about the event.
 * @returns {Object} - An object containing a `message` string and a `description` string.
 *
 * @example
 * const sampleNotification = {
 *   type: "ticket",
 *   channel: "reassigned",
 *   task: { taskId: "#TASK997787" },
 *   title: "Update the landing page content"
 * };
 * const result = generateNotificationMessage(sampleNotification);
 * console.log(result.message); // Output: "Task #TASK997787 has been reassigned to you."
 * console.log(result.description); // Output: "Please review the details and proceed accordingly."
 */
export function generateNotificationMessage(notification: Notification): {
  message: string;
  description: string;
} {
  // Destructuring the relevant properties from the notification object
  const { type, channel, task, title } = notification;

  // Default message and description values
  let message = "Notification: Check the details.";
  let description = "Please check the notification for more information.";

  if (
    type === "ticket" &&
    ["reassigned", "updated", "assigned"].includes(channel)
  ) {
    const taskId = task ? task.taskId : "No Task ID";

    switch (channel) {
      case "reassigned":
        message = `Task ${taskId} has been reassigned to you. Title: "${title}".`;
        description = "Please review the details and proceed accordingly.";
        break;

      case "updated":
        message = `Task ${taskId} has been updated. Title: "${title}".`;
        description = "Check the changes to stay on top of your tasks.";
        break;

      case "assigned":
        message = `Task ${taskId} has been assigned to you. Title: "${title}".`;
        description = "Start working on it to meet the deadlines.";
        break;

      default:
        message = `Notification for Task ${taskId}: ${title}`;
        description = "Please check the task for more information.";
    }
  }

  return { message, description };
}
