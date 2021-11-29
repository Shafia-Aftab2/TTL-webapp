import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async Signup(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }
}
