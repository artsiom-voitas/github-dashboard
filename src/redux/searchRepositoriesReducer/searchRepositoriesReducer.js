import {
  searchRepositoriesError,
  searchRepositoriesRequest,
  searchRepositoriesSuccess,
  setCurrentPage,
  setCurrentSearchQuery,
} from "./actions";

import { handleActions } from "redux-actions";

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  currentPage: 1,
  currentSearchQuery: "",
  perPage: 10,
  totalCount: 0,
};

export const searchRepositoriesReducer = handleActions(
  {
    [searchRepositoriesRequest.toString()]: (state, _action) => {
      return { ...state, isLoading: true };
    },
    [searchRepositoriesSuccess.toString()]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        totalCount: action.payload["total_count"],
      };
    },
    [searchRepositoriesError.toString()]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    [setCurrentPage.toString()]: (state, action) => {
      return { ...state, currentPage: action.payload };
    },
    [setCurrentSearchQuery.toString()]: (state, action) => {
      return { ...state, currentSearchQuery: action.payload };
    },
  },
  initialState
);
