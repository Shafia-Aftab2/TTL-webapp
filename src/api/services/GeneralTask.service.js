import HTTPClient from "../HTTPClient";

export default class TaskRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/general-tasks/`, payload);
  }
}
