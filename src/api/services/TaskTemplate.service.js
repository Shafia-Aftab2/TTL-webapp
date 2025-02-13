import HTTPClient from "../HTTPClient";

export default class TaskTemplateRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/task-templates/`, payload);
  }

  static async CreateBulk(payload) {
    return HTTPClient.post(`/task-templates/create-bulk`, payload);
  }

  static async QueryTaskTemplates(query) {
    return HTTPClient.get(
      `/task-templates/?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        .join("")}`
    );
  }

  static async GetTaskTemplate(taskId) {
    return HTTPClient.get(`/task-templates/${taskId}`);
  }

  static async UpdateTaskTemplate(taskId, payload) {
    return HTTPClient.put(`/task-templates/${taskId}`, payload);
  }

  static async UpdateStatus(taskId, payload) {
    return HTTPClient.patch(`/task-templates/${taskId}/status`, payload);
  }
}
