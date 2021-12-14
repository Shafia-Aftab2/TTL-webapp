import HTTPClient from "../HTTPClient";

export default class ClassRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/class`, payload);
  }

  static async GetMyClasses() {
    return HTTPClient.get(`/class/mine`);
  }

  static async GetDetails(id) {
    return HTTPClient.get(`/class/${id}/details`);
  }

  static async AddTopics(id, payload) {
    return HTTPClient.post(`/class/${id}/topics`, payload);
  }

  static async JoinAsStudent(id) {
    return HTTPClient.patch(`/class/${id}/join`);
  }
}
