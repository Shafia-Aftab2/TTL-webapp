import authUser from "@/utils/helpers/auth";
import { UserService } from "@/api/services";

const auth = async ({
  successCallback = () => {},
  failureCallback = () => {},
}) => {
  // get current user info
  const user = authUser.getUser();
  const refreshToken = authUser.getRefreshToken();

  // failure case
  if (!refreshToken) return failureCallback();

  // handle broken user data
  if (!user) {
    // get user profile
    const response = await UserService.GetMyProfile().catch(() => null);

    // failure case
    if (!response) return failureCallback();

    // success case (update user cookie data)
    const { data: user } = response;
    const expires = (date) => ({ expires: new Date(date) });
    const nextDay = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString();
    authUser.setUser(user, expires(nextDay)); // NOTE: expiry date from here is not the same as refresh expiry
  }

  // success case
  return successCallback();
};

export default auth;
