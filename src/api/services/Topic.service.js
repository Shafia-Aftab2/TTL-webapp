import HTTPClient from "../HTTPClient";

export default class TopicRoutes {
  static async Query(query) {
    return HTTPClient.get(
      `/topics?${Object.entries(query).map(
        ([key, value]) => `${key}=${encodeURIComponent(value)}&`
      )}`
    );
  }
}
