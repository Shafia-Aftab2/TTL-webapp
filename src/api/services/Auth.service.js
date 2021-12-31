import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async Signup(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }

  static async Login(payload) {
    return HTTPClient.post(`/auth/login`, payload);
  }

  static async Logout(payload) {
    return HTTPClient.post(`/auth/logout`, payload);
  }

  static async RefreshTokens(payload) {
    return HTTPClient.post(`/auth/refresh-tokens`, payload);
  }

  static async ForgotPassword(payload) {
    return HTTPClient.post(`/auth/forgot-password`, payload);
  }
}
