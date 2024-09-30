import axiosInstance from "../api/connectSurfApi";
import { CommentResponse } from "../types/task";

/**
 * Class-based service to handle comments-related operations.
 */
export class CommentService {
  /**
   * Fetch comments for a given task by task ID.
   *
   * @param {string} taskID - The ID of the task to fetch comments for.
   * @returns {Promise<CommentResponse[]>} - A promise that resolves to an array of comment responses.
   * @throws Will throw an error if the request fails or the response indicates an error.
   */
  static fetchComments(taskID: string): Promise<CommentResponse[]> {
    return axiosInstance.get(`/comment/${taskID}`).then((response) => {
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to fetch comments");
      }
      return response.data.data.response;
    });
  }

  /**
   * Add a new comment to a specific task.
   *
   * @param {string} taskID - The ID of the task to add a comment to.
   * @param {string} content - The content of the new comment.
   * @returns {Promise<CommentResponse>} - A promise that resolves to the newly created comment response.
   * @throws Will throw an error if the request fails or the response indicates an error.
   */
  static addComment(taskID: string, content: string): Promise<CommentResponse> {
    return axiosInstance
      .post(`/comment`, { taskId: taskID, message: content })
      .then((response) => {
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to add comment");
        }
        return response.data.data.response;
      });
  } 

  /**
   * Delete a comment by comment ID.
   *
   * @param {string} commentID - The ID of the comment to delete.
   * @returns {Promise<void>} - A promise that resolves when the comment is successfully deleted.
   * @throws Will throw an error if the request fails or the response indicates an error.
   */
  static deleteComment(commentID: string): Promise<void> {
    return axiosInstance.delete(`/comment/${commentID}`).then((response) => {
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to delete comment");
      }
    });
  }
}
