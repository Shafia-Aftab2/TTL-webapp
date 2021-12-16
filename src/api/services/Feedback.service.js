import HTTPClient from "../HTTPClient";

export default class FeedbackRoutes {
  static async Create(responseId, payload) {
    return HTTPClient.post(`/feedbacks/${responseId}`, payload);
  }
}
