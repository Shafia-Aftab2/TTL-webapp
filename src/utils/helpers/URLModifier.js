const _getParams = () => {
  return new URLSearchParams(window.location.search);
};

const getURLParam = (queryParamName) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  return searchParams.get(queryParamName);
};

export { getURLParam };

export default { getURLParam };
