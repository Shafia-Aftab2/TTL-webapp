import HTTPClient from "../HTTPClient";

export default class AuthRoutes {
  static async GetMyProfile() {
    return HTTPClient.get(`/users/my-profile`);
  }
}
