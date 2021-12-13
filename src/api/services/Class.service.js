import HTTPClient from "../HTTPClient";

export default class ClassRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/class`, payload);
  }

  static async AddTopics(id, payload) {
    return HTTPClient.post(`/class/${id}/topics`, payload);
  }
}
