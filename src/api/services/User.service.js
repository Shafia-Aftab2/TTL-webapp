import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async GetMyProfile() {
    return HTTPClient.get(`/users/my-profile`);
  }

  static async UpdateProfile(payload) {
    return HTTPClient.put(`/users/profile`, payload);
  }
}
