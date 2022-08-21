import * as queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getRepositoriesBySearchQuery } from "../../redux/searchRepositoriesReducer/thunk";
import ErrorMessage from "../ErrorMessage/index";
import Header from "../Header/index";
import RepositoriesList from "../RepositoriesList/index";
import SearchPagination from "../SearchPagination/index";

function SearchQuery(props) {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { query, page } = queryString.parse(search);
  const pageNumber = Number(page);

  const repos = useSelector((state) => state.searchRepositoriesReducer.items);

  const isLoading = useSelector(
    (state) => state.searchRepositoriesReducer.isLoading
  );

  useEffect(() => {
    dispatch(getRepositoriesBySearchQuery(query, page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      {!repos ? (
        <ErrorMessage />
      ) : (
        <div>
          <Header />
          <div className="main__title mb-3">
            Look what we found on your request:
            <span className="main__title--bold"> {query} </span>
          </div>
          <RepositoriesList repositories={repos} isLoading={isLoading} />
          {!isLoading ? (
            <SearchPagination query={query} currentPage={pageNumber} />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchQuery;
