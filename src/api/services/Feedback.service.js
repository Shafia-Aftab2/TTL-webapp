import HTTPClient from "../HTTPClient";

export default class FeedbackRoutes {
  static async QueryClassTaskFeedbacks(taskId, query) {
    return HTTPClient.get(
      `/feedbacks/${taskId}?${Object.entries(query).map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}&`
      )}`
    );
  }

  static async CreateIndividualFeedback(responseId, payload) {
    return HTTPClient.post(`/feedbacks/individual/${responseId}`, payload);
  }

  static async CreateWholeClassFeedback(responseId, payload) {
    return HTTPClient.post(`/feedbacks/all/${responseId}`, payload);
  }

  static async MarkFeedbackReadByStudent(id) {
    return HTTPClient.patch(`/feedbacks/${id}/student-read`);
  }
}
