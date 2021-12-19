import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async Signup(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }

  static async Login(payload) {
    return HTTPClient.post(`/auth/login`, payload);
  }

  static async RefreshTokens(payload) {
    return HTTPClient.post(`/auth/refresh-tokens`, payload);
  }
}
