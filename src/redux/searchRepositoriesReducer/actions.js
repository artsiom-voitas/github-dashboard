import { createActions } from "redux-actions";

export const {
  searchRepositoriesRequest,
  searchRepositoriesSuccess,
  searchRepositoriesError,
  setCurrentPage,
} = createActions({
  SEARCH_REPOSITORIES_REQUEST: (payload) => payload,
  SEARCH_REPOSITORIES_SUCCESS: (payload) => payload,
  SEARCH_REPOSITORIES_ERROR: (payload) => payload,
  SET_CURRENT_PAGE: (payload) => payload,
});
