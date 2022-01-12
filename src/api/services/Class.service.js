import HTTPClient from "../HTTPClient";

export default class ClassRoutes {
  static async Create(payload) {
    return HTTPClient.post(`/class`, payload);
  }

  static async GetMyClasses() {
    return HTTPClient.get(`/class/mine`);
  }

  static async GetDetails(id) {
    return HTTPClient.get(`/class/${id}/details`);
  }

  static async AddTopics(id, payload) {
    return HTTPClient.post(`/class/${id}/topics`, payload);
  }

  static async JoinAsStudent(id) {
    return HTTPClient.patch(`/class/${id}/join`);
  }

  static async LeaveAsStudent(id) {
    return HTTPClient.delete(`/class/${id}/leave`);
  }

  static async RemoveStudents(id, payload) {
    return HTTPClient.delete(`/class/${id}/remove-students`, payload);
  }

  static async Update(id, payload) {
    return HTTPClient.put(`/class/${id}/update`, payload);
  }

  static async Delete(id) {
    return HTTPClient.delete(`/class/${id}/delete`);
  }
}
