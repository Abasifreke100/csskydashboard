import { Notification } from "../../hooks/useNotifications";
import { User } from "../../types";
import { formatTier } from "../text";


/**
 * Generates a notification object with a message and description based on the type, channel, and task details provided.
 *
 * @param {Notification} notification - The notification object containing details about the event.
 * @param {User} user - The user object containing details about the current user's tier and other information.
 * @returns {Object} - An object containing a `message` string and a `description` string.
 *
 * @example
 * const sampleNotification = {
 *   type: "ticket",
 *   channel: "reassigned",
 *   task: { taskId: "#TASK997787" },
 *   title: "Update the landing page content"
 * };
 * const result = generateNotificationMessage(sampleNotification, user);
 * console.log(result.message); // Output: "Task #TASK997787 has been reassigned to John Doe."
 * console.log(result.description); // Output: "Please review the details and proceed accordingly."
 */
export function generateNotificationMessage(
  notification: Notification,
  user: User
): { message: string; description: string } {
  // Destructuring the relevant properties from the notification object
  const { type, channel, task, title, assignee } = notification;

  // Default message and description values
  let message = "Notification: Check the details.";
  let description = "Please check the notification for more information.";

  // Handle "ticket" type notifications
  if (
    type === "ticket" &&
    ["reassigned", "updated", "assigned"].includes(channel)
  ) {
    const taskId = task ? task.taskId : "No Task ID";

    // Custom message for "reassigned" channel if `user.tier` is "tier-4"
    if (
      user.tier === "tier-4" &&
      channel === "reassigned" &&
      assignee?.firstName &&
      assignee?.lastName
    ) {
      message = `Task ${taskId} has been reassigned to ${assignee.firstName} ${assignee.lastName}.`;
      description = "Please review the details and proceed accordingly.";
    } else {
      switch (channel) {
        case "reassigned":
          message = `Task ${taskId} has been reassigned to you.`;
          description = "Please review the details and proceed accordingly.";
          break;

        case "updated":
          message = `Task ${taskId} has been updated.`;
          description = "Check the changes to stay on top of your tasks.";
          break;

        case "assigned":
          message = `Task ${taskId} has been assigned to you.`;
          description = "Start working on it to meet the deadlines.";
          break;

        default:
          message = `Notification for Task ${taskId}: ${title}`;
          description = "Please check the task for more information.";
      }
    }
  }

  // Handle "tier" type notifications
  if (type === "tier" && assignee?.tier) {
    message = "Access Upgrade Successful";
    description = `Your request was approved. You’re now in ${formatTier(
      assignee.tier
    )}.`;
  }

  return { message, description };
}
