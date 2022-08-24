import { fetchRepositoriesBySearchQuery } from '../../services/repositories';
import {
  searchRepositoriesError,
  searchRepositoriesRequest,
  searchRepositoriesSuccess
} from './actions';

export function getRepositoriesBySearchQuery(searchQuery, page) {
  return function (dispatch) {
    dispatch(searchRepositoriesRequest());
    fetchRepositoriesBySearchQuery({ searchQuery, page })
      .then((result) => {
        dispatch(searchRepositoriesSuccess(result));
      })
      .catch((error) => {
        dispatch(searchRepositoriesError(error));
      });
  };
}
