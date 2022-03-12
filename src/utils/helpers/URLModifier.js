const _getParams = () => {
  return new URLSearchParams(getSearchParams());
};

const _updateURL = (newParams) => {
  const _sanitizedNewParams =
    newParams.toString().length > 0 ? "?" + newParams.toString() : "";

  const newRelativePathQuery = getPathname() + _sanitizedNewParams;

  history.pushState(null, "", newRelativePathQuery);
};

const addToURL = (queryParamName, queryParamValue) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  searchParams.set(queryParamName, queryParamValue);

  _updateURL(searchParams);
};

const removeFromURL = (queryParamName) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  searchParams.delete(queryParamName);

  _updateURL(searchParams);
};

const getURLParam = (queryParamName) => {
  if (!queryParamName) return;

  const searchParams = _getParams();

  return searchParams.get(queryParamName);
};

const getOrigin = () => window.location.origin;

const getDomain = () => window.location.origin; // NOTE: will reflect domain or file hosting

const getHref = () => window.location.href;

const getPathname = () => window.location.pathname;

const getSearchParams = () => window.location.search;

export {
  addToURL,
  removeFromURL,
  getURLParam,
  getOrigin,
  getDomain,
  getHref,
  getPathname,
  getSearchParams,
};

export default {
  addToURL,
  removeFromURL,
  getURLParam,
  getOrigin,
  getDomain,
  getHref,
  getPathname,
  getSearchParams,
};
