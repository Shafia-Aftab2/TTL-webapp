import HTTPClient from "../HTTPClient";

export default class ResponseRoutes {
  static async QueryClassTaskResponses(taskId, query) {
    return HTTPClient.get(
      `/responses/${taskId}?${Object.entries(query).map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}&`
      )}`
    );
  }
}
