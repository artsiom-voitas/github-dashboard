import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import repositoryImage from '../../images/repository-img.svg';
import './search-item-card.scss';
import starImage from '../../images/star.svg';
import { getRepository } from '../../redux/repositoryCardReducer/thunk';
import { getRepositoryStargazers } from '../../redux/repositoryStargazersReducer/thunk';
import { formatLastCommitDate } from '../../services/formatLastCommitDate';

const SearchItemCard = React.memo(function SearchItemCard(props) {
  const { title, description, lastCommitDate, stargazers, owner } = props;
  const dispatch = useDispatch();

  const formattedLastCommitDate = formatLastCommitDate(lastCommitDate);

  function handleClick() {
    dispatch(getRepository(owner, title));
    dispatch(getRepositoryStargazers(owner, title));
  }

  return (
    <div className="item-card">
      <div className="item-card__header">
        <img className="item-card__image" src={repositoryImage} alt="Repository" />
        <Link
          to={`/repository/${owner}/${title}`}
          className="item-card__title"
          onClick={handleClick}>
          {title}
        </Link>
      </div>
      <div className="item-card__description">{description}</div>
      <span className="item-card__footer footer">
        <span className="footer__item">
          <div className="item-card__link">
            <img src={starImage} alt="Star" />
            <h6 className="item-card__stargazers">{stargazers}</h6>
          </div>
        </span>
        <span className="footer__item">Updated {formattedLastCommitDate} ago</span>
      </span>
    </div>
  );
});

SearchItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastCommitDate: PropTypes.string.isRequired,
  stargazers: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired
};

export default SearchItemCard;
