import HTTPClient from "../HTTPClient";

export default class TaskRoutes {
  static async Create(classId, payload) {
    return HTTPClient.post(`/tasks/${classId}`, payload);
  }

  static async Update(taskId, payload) {
    return HTTPClient.put(`/tasks/${taskId}`, payload);
  }

  static async GetDetails(taskId) {
    return HTTPClient.get(`/tasks/${taskId}/details`);
  }

  static async QueryClassTasks(classId, query) {
    return HTTPClient.get(
      `/tasks/${classId}?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        .join("")}`
    );
  }

  static async GetTasksFromAllClasses(query = {}) {
    return HTTPClient.get(
      `/tasks/all?${Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}&`)
        .join("")}`
    );
  }

  static async Delete(id) {
    return HTTPClient.delete(`/tasks/${id}`);
  }

  static async GetStudentInbox(taskId) {
    return HTTPClient.get(`/tasks/student-inbox/${taskId}`);
  }

  static async GetTeacherInbox(taskId, studentId) {
    return HTTPClient.get(`/tasks/teacher-inbox/${taskId}/${studentId}`);
  }
}
