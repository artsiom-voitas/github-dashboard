import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../Loader/';
import SearchItemCard from '../SearchItemCard/';

const RepositoriesList = React.memo(function RepositoriesList(props) {
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
              lastCommitDate={repos['updated_at']}
              stargazers={repos['stargazers_count']}
              owner={repos.owner['login']}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
});

RepositoriesList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      updated_at: PropTypes.string,
      stargazers_count: PropTypes.number,
      owner: PropTypes.object
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default RepositoriesList;
