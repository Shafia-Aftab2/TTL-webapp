import Axios from "axios";
import authUser from "../utils/helpers/auth";
import { TALKIE_MONO_API_BASE_URL } from "./config";

let baseURL = TALKIE_MONO_API_BASE_URL;

const client = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json, text/plain, */*",
  },
});

const refreshHeaders = () => {
  HTTPClient.setHeader("Authorization", `Bearer ${authUser.getAccessToken()}`);
};

export default class HTTPClient {
  static async head(path) {
    return client.head(path);
  }

  static async get(path, params = {}, headers = {}) {
    refreshHeaders();
    return client.get(path, {
      params,
      headers,
    });
  }

  static async post(
    path,
    data = {},
    headers = {},
    baseURL = TALKIE_MONO_API_BASE_URL,
    onUploadProgress
  ) {
    refreshHeaders();
    return client.post(path, data, {
      headers,
      onUploadProgress,
      baseURL,
    });
  }

  static async patch(path, data = {}, headers = {}) {
    refreshHeaders();
    return client.patch(path, data, {
      headers,
    });
  }

  static async put(path, data = {}, headers = {}) {
    refreshHeaders();
    return client.put(path, data, {
      headers,
    });
  }

  static async delete(path, data = {}, headers = {}) {
    refreshHeaders();
    return client.delete(path, {
      data,
      headers,
    });
  }

  static setHeader(key, value) {
    client.defaults.headers.common[key] = value;
  }

  static setBaseURL(url) {
    client.defaults.baseURL = url;
  }
}
