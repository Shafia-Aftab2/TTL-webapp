import cookies from "./cookies";

const getUser = () => {
  const user = cookies.getCookie("user");
  return typeof user === "string" ? JSON.parse(user) : user;
};

const setUser = (user, options = {}) => {
  return cookies.setCookie(
    "user",
    JSON.stringify(cookies.config.userCookieConfig(user)),
    options
  );
};

const deleteUser = () => {
  return cookies.deleteCookie("user");
};

const getAccessToken = () => {
  return cookies.getCookie("access_token");
};

const setAccessToken = (token, options = {}) => {
  return cookies.setCookie("access_token", token, options);
};

const deleteAccessToken = () => {
  return cookies.deleteCookie("access_token");
};

const getRefreshToken = () => {
  return cookies.getCookie("refresh_token");
};

const setRefreshToken = (token, options = {}) => {
  return cookies.setCookie("refresh_token", token, options);
};

const deleteRefreshToken = () => {
  return cookies.deleteCookie("refresh_token");
};

export default {
  getUser,
  setUser,
  deleteUser,
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  getRefreshToken,
  setRefreshToken,
  deleteRefreshToken,
};
