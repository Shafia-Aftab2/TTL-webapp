import HTTPClient from "../HTTPClient";

export default class TaskTemplateRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/task-templates/`, payload);
  }

  static async QueryTaskTemplates(query) {
    return HTTPClient.get(
      `/task-templates/?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        .join("")}`
    );
  }
}
