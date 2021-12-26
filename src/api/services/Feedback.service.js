import HTTPClient from "../HTTPClient";

export default class FeedbackRoutes {
  static async CreateIndividualFeedback(responseId, payload) {
    return HTTPClient.post(`/feedbacks/individual/${responseId}`, payload);
  }

  static async CreateWholeClassFeedback(responseId, payload) {
    return HTTPClient.post(`/feedbacks/all/${responseId}`, payload);
  }
}
