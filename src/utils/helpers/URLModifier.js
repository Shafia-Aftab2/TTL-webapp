const _getParams = () => {
  return new URLSearchParams(window.location.search);
};

const _updateURL = (newParams) => {
  const _sanitizedNewParams =
    newParams.toString().length > 0 ? "?" + newParams.toString() : "";

  const newRelativePathQuery = window.location.pathname + _sanitizedNewParams;

  history.pushState(null, "", newRelativePathQuery);
};

const addToURL = (queryParamName, queryParamValue) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  searchParams.set(queryParamName, queryParamValue);

  _updateURL(searchParams);
};

const getURLParam = (queryParamName) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  return searchParams.get(queryParamName);
};

export { addToURL, getURLParam };

export default { addToURL, getURLParam };
