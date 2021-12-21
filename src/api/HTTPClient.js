import Axios from "axios";
import authUser from "../utils/helpers/auth";
import { TALKIE_MONO_API_BASE_URL } from "./config";
import AuthService from "./services/Auth.service";
import UserService from "./services/User.service";

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

// Interceptors
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalReq = error.config;

    // refresh token if expired
    if (error.response.status === 401 && !originalReq.retryAttempt) {
      const refreshToken = authUser.getRefreshToken();

      // refresh request
      const responseTokens = await AuthService.RefreshTokens({
        refreshToken: refreshToken,
      }).catch(() => null);

      // require login if failed to refresh token
      if (!responseTokens) {
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      // update cookies
      const tokens = responseTokens.data;
      const expires = (date) => ({ expires: new Date(date) });
      authUser.setAccessToken(
        tokens.access.token,
        expires(tokens.access.expiry)
      );
      authUser.setRefreshToken(
        tokens.refresh.token,
        expires(tokens.refresh.expiry)
      );

      // update axios header for current instance
      await HTTPClient.setHeader(
        "Authorization",
        `Bearer ${tokens?.access?.token}`
      );

      // user profile request
      const responseUser = await UserService.GetMyProfile().catch(() => null);

      // update user data
      const { data: user } = responseUser;
      authUser.setUser(user, expires(tokens.refresh.expiry));

      // update header for current request
      originalReq.headers.Authorization = `Bearer ${tokens?.access?.token}`;
      originalReq.retryAttempt = true;

      // retry request
      return client(originalReq);
    }

    return Promise.reject(error);
  }
);
