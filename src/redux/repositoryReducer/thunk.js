import { fetchRepository } from "../../services/repositories";
import {
  getRepositoryRequest,
  getRepositorySuccess,
  getRepositoryError,
} from "./actions";

export function getRepository(owner, repositoryName) {
  return function (dispatch, _getState) {
    dispatch(getRepositoryRequest());
    fetchRepository(owner, repositoryName)
      .then((result) => {
        dispatch(getRepositorySuccess(result));
      })
      .catch((error) => {
        dispatch(getRepositoryError(error));
      });
  };
}
