import authUser from "@/utils/helpers/auth";

const accessControl = ({
  successCallback = () => {},
  failureCallback = () => {},
  blockedRoles = [],
}) => {
  // get current user info
  const user = authUser.getUser();

  // failure case
  if (!user || !user?.role || blockedRoles?.includes(user.role)) {
    return failureCallback();
  }

  // success case
  return successCallback();
};

export default accessControl;
