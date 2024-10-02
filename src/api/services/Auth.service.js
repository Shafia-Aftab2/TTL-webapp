import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async Signup(payload) {
    return HTTPClient.post(`/auth/signup`, payload);
  }

  static async PrivateStudentSignup(payload) {
    return HTTPClient.post(`/private-students/signup`, payload);
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

  static async ResetPassword(resetToken, payload) {
    return HTTPClient.patch(`/auth/reset-password/${resetToken}`, payload);
  }

  static async GenerateClientSecret() {
    return HTTPClient.get(`/auth/stripe/client-secret`);
  }

  static async SetDefaultPaymentMethod(id) {
    return HTTPClient.patch(`/auth/payment-methods/${id}/set-default`);
  }

  static async RemovePaymentMethod(id) {
    return HTTPClient.delete(`/auth/payment-methods/${id}`);
  }
}
