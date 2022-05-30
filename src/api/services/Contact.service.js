import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async SendMessage(payload) {
    return HTTPClient.post(`/contact`, payload);
  }
}
