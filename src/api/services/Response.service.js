import HTTPClient from "../HTTPClient";

export default class ResponseRoutes {
  static async QueryClassTaskResponses(taskId, query) {
    return HTTPClient.get(
      `/responses/${taskId}?${Object.entries(query).map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}&`
      )}`
    );
  }

  static async CreateResponse(taskId, payload) {
    return HTTPClient.post(`/responses/${taskId}`, payload);
  }

  static async GetResponse(taskId) {
    return HTTPClient.get(`/responses/${taskId}`);
  }

  static async AddResponseScore(responseId, payload) {
    return HTTPClient.put(`/responses/${responseId}/score`, payload);
  }

  static async GetMyStats(classId, query) {
    return HTTPClient.get(
      `/responses/my-score/${classId}?${Object.entries(query).map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}&`
      )}`
    );
  }
}
