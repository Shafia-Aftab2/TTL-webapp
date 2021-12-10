import HTTPClient from "../HTTPClient";

export default class ClassRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/class`, payload);
  }
}
