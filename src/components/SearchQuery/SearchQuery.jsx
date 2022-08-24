import * as queryString from 'query-string';
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRepositoriesBySearchQuery } from '../../redux/searchRepositoriesReducer/thunk';
import ErrorMessage from '../ErrorMessage/';
import Header from '../Header/';
import RepositoriesList from '../RepositoriesList/';
import SearchPagination from '../SearchPagination/';

const SearchQuery = React.memo(function SearchQuery() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { query, page } = queryString.parse(search);
  const pageNumber = Number(page);

  const repos = useSelector((state) => state.searchRepositories.items);
  const totalCount = useSelector((state) => state.searchRepositories.totalCount);

  const isLoading = useSelector((state) => state.searchRepositories.isLoading);

  useEffect(() => {
    dispatch(getRepositoriesBySearchQuery(query, page));
  }, [query, page, dispatch]);

  return (
    <div>
      {!repos ? (
        <ErrorMessage />
      ) : (
        <div>
          <Header />
          {totalCount === 0 && !isLoading ? (
            <Alert variant="warning" className="text-center my-5">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We haven't found anything on your request:
              <span className="main__title--bold"> {query} </span>
              <div>Please try again.</div>
            </Alert>
          ) : (
            <div>
              <div className="main__title mb-3">
                Look what we found on your request:
                <span className="main__title--bold"> {query} </span>
              </div>
              <RepositoriesList repositories={repos} isLoading={isLoading} />
              {!isLoading ? <SearchPagination query={query} currentPage={pageNumber} /> : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default SearchQuery;
