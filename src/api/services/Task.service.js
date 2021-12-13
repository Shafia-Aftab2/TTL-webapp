import HTTPClient from "../HTTPClient";

export default class TaskRoutes {
  static async Create(classId, payload) {
    return HTTPClient.post(`/tasks/${classId}`, payload);
  }
}
