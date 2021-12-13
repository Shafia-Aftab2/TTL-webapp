import HTTPClient from "../HTTPClient";

export default class FileRoutes {
  static async Upload(query, payload) {
    return HTTPClient.post(
      `/files/upload?${Object.entries(query).map(
        ([key, value]) => `${key}=${value}&`
      )}`,
      payload
    );
  }
}
