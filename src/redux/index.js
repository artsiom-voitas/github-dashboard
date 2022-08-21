import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { mostPopularRepositoriesReducer } from "./mostPopularRepositoriesReducer/mostPopularRepositoriesReducer";
import { repositoryReducer } from "./repositoryReducer/repositoryReducer";
import { repositoryStargazersReducer } from "./repositoryStargazersReducer/repositoryStargazersReducer";
import { searchRepositoriesReducer } from "./searchRepositoriesReducer/searchRepositoriesReducer";

const rootReducer = combineReducers({
  mostPopularRepositoriesReducer,
  searchRepositoriesReducer,
  repositoryReducer,
  repositoryStargazersReducer,
});

const composeEnhancers = composeWithDevTools({
  name: "Github",
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
