import Cookie from "js-cookie";

const config = {
  userCookieConfig: (userObj) => {
    const _userObj = { ...userObj };
    _userObj.id = _userObj?.id || _userObj?._id;
    if (userObj?.stripe) delete _userObj?.stripe; // to save cookies size.
    return _userObj;
  },
};

const setCookie = (key, value, options = {}) => {
  return Cookie.set(key, value, options);
};

const getCookie = (key) => {
  return Cookie.get(key);
};

const deleteCookie = (key) => {
  return Cookie.remove(key);
};

export default {
  config,
  setCookie,
  getCookie,
  deleteCookie,
};
