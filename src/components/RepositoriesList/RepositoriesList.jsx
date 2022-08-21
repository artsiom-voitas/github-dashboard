import PropTypes from "prop-types";
import React from "react";
import Loader from "../Loader/index";
import SearchItemCard from "../SearchItemCard/index";

function RepositoriesList(props) {
  const { repositories, isLoading } = props;

  return (
    <div>
      {!isLoading ? (
        repositories.map((repos) => {
          return (
            <SearchItemCard
              key={repos.id}
              title={repos.name}
              description={repos.description}
              lastCommitDate={repos["updated_at"]}
              stargazers={repos["stargazers_count"]}
              owner={repos.owner["login"]}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

RepositoriesList.propTypes = {
  repositories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RepositoriesList;
