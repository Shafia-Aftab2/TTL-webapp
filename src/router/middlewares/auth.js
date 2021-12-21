import authUser from "@/utils/helpers/auth";

const auth = ({ successCallback = () => {}, failureCallback = () => {} }) => {
  // get current user info
  const user = authUser.getAccessToken();
  const accessToken = authUser.getAccessToken();
  const refreshToken = authUser.getRefreshToken();

  // failure case
  if (!refreshToken) return failureCallback();

  // success case
  return successCallback();
};

export default auth;
