import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async GetMyProfile() {
    return HTTPClient.get(`/users/my-profile`);
  }

  static async GetUserById(userId) {
    return HTTPClient.get(`/users/${userId}/profile`);
  }

  static async RemoveUserById(userId) {
    return HTTPClient.delete(`/users/${userId}`);
  }

  static async UpdateProfile(payload) {
    return HTTPClient.put(`/users/profile`, payload);
  }

  static async GetUsersList(query) {
    return HTTPClient.get(
      `/users?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        ?.join("")}`
    );
  }

  static async GetUserAnalytics(userId) {
    return HTTPClient.get(`/users/${userId}/analytics`);
  }
}
