import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createQueryString,
  IQueryOptions,
  queryStringToObject,
} from "../../helpers";

export function useQueryParams() {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Get query params
  const queryParams = React.useMemo(
    () => queryStringToObject(search),
    [search]
  );

  // Updates the query params
  function setQueryParams(queryObj: IQueryOptions) {
    const newSearch = createQueryString(queryObj);
    navigate({ search: newSearch });
  }

  function appendQueryParams(queryObj: IQueryOptions) {
    const newQuery = { ...queryParams, ...queryObj };
    setQueryParams(newQuery);
  }

  return { queryParams, setQueryParams, appendQueryParams };
}
