import HTTPClient from "../HTTPClient";

export default class TaskTemplateRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/task-template/`, payload);
  }
}
