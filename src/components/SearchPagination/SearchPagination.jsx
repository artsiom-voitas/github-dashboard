import PropTypes from 'prop-types';
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from 'react-redux';

const SearchPagination = React.memo(function SearchPagination(props) {
  const { query, currentPage } = props;

  const totalCount = useSelector((state) => state.searchRepositories.totalCount);
  const perPage = useSelector((state) => state.searchRepositories.perPage);

  const countTotalPages = function (totalCount, reposPerPage) {
    const pagesAmount = Math.ceil(totalCount / reposPerPage);
    if (pagesAmount > 100) {
      return 100;
    } else {
      return pagesAmount;
    }
  };

  const pagesAmount = countTotalPages(totalCount, perPage);

  function setUrl(page) {
    return `/github-dashboard/#/search?query=${query}&page=${page}`;
  }

  return (
    <Pagination className="mt-4 d-flex justify-content-center">
      {currentPage === 1 ? (
        <Pagination.Prev disabled />
      ) : (
        <Pagination.Prev href={setUrl(currentPage - 1)} />
      )}
      {currentPage !== 1 && <Pagination.Item href={setUrl(1)}>1</Pagination.Item>}
      {currentPage < 5 || pagesAmount <= 6 ? null : <Pagination.Ellipsis />}
      {pagesAmount >= 5 && pagesAmount === currentPage ? (
        <Pagination.Item href={setUrl(currentPage - 4)}>{currentPage - 4}</Pagination.Item>
      ) : null}
      {currentPage > pagesAmount - 2 && pagesAmount >= 5 ? (
        <Pagination.Item href={setUrl(currentPage - 3)}>{currentPage - 3}</Pagination.Item>
      ) : null}

      {currentPage > 3 && pagesAmount >= 3 ? (
        <Pagination.Item href={setUrl(currentPage - 2)}>{currentPage - 2}</Pagination.Item>
      ) : null}
      {currentPage > 2 && pagesAmount >= 2 ? (
        <Pagination.Item href={setUrl(currentPage - 1)}>{currentPage - 1}</Pagination.Item>
      ) : null}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {currentPage + 1 > pagesAmount ? null : (
        <Pagination.Item href={setUrl(currentPage + 1)}>{currentPage + 1}</Pagination.Item>
      )}
      {currentPage + 2 > pagesAmount ? null : (
        <Pagination.Item href={setUrl(currentPage + 2)}>{currentPage + 2}</Pagination.Item>
      )}
      {currentPage + 3 <= pagesAmount && currentPage <= 2 ? (
        <Pagination.Item href={setUrl(currentPage + 3)}>{currentPage + 3}</Pagination.Item>
      ) : null}
      {currentPage === 1 && pagesAmount >= 5 ? (
        <Pagination.Item href={setUrl(currentPage + 4)}>{currentPage + 4}</Pagination.Item>
      ) : null}

      {currentPage + 4 > pagesAmount || pagesAmount <= 6 ? null : <Pagination.Ellipsis />}
      {currentPage + 3 > pagesAmount || pagesAmount < 6 ? null : (
        <Pagination.Item href={setUrl(pagesAmount)}>{pagesAmount}</Pagination.Item>
      )}
      {currentPage === pagesAmount ? (
        <Pagination.Next disabled />
      ) : (
        <Pagination.Next href={setUrl(currentPage + 1)} />
      )}
    </Pagination>
  );
});

SearchPagination.propTypes = {
  query: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default SearchPagination;
