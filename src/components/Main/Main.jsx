import React, { useEffect } from "react";
import "./main.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMostPopularRepositories } from "../../redux/mostPopularRepositoriesReducer/thunk";
import ErrorMessage from "../ErrorMessage";
import Header from "../Header/index";
import RepositoriesList from "../RepositoriesList/RepositoriesList";

function Main(_props) {
  const dispatch = useDispatch();
  const repos = useSelector(
    (state) => state.mostPopularRepositoriesReducer.items
  );

  const isLoading = useSelector(
    (state) => state.mostPopularRepositoriesReducer.isLoading
  );

  useEffect(() => {
    dispatch(getMostPopularRepositories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!repos ? (
        <ErrorMessage />
      ) : (
        <div>
          <Header />
          <div className="main__title mb-3">
            Top 10 most popular repositories
          </div>
          <RepositoriesList repositories={repos} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}

export default Main;
