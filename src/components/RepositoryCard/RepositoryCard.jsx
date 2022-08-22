import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import starImage from "../../images/star.svg";
import { getRepository } from "../../redux/repositoryReducer/thunk";
import { getRepositoryStargazers } from "../../redux/repositoryStargazersReducer/thunk";
import { formatLastCommitDate } from "../../services/formatLastCommitDate";
import ErrorMessage from "../ErrorMessage/index";
import Header from "../Header/index";
import Loader from "../Loader/index";
import "./repository-card.scss";
import Alert from "react-bootstrap/Alert";

function RepositoryCard(_props)
{
  const { username, repositoryName } = useParams()
  const dispatch                     = useDispatch()
  const repository                   = useSelector((state) => state.repositoryReducer.items)
  const commitDate                   = useSelector(
      (state) => state.repositoryReducer.items['updated_at'],
  )
  const owner                        = useSelector((state) => state.repositoryReducer.owner)
  const serverRespond                = useSelector((state) => state.repositoryReducer.message)
  const stargazers                   = useSelector(
      (state) => state.repositoryStargazersReducer.stargazers,
  )
  const tenTopStargazers             = stargazers.slice(0, 10)

  useEffect(() => {
    dispatch(getRepository(username, repositoryName))
    dispatch(getRepositoryStargazers(username, repositoryName))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, repositoryName])

  const isLoading   = useSelector((state) => state.repositoryReducer.isLoading)
  const description = repository.description

  let formattedLastCommitDate
  if (commitDate) {
    formattedLastCommitDate = formatLastCommitDate(commitDate)
  }

  if (!repository) {
    return <ErrorMessage />
  }

  if (serverRespond === "Not Found") {
    return <ErrorMessage message="You have entered a non-existent page" />;
  } else {
    return (
      <div>
        {!isLoading ? (
          <div>
            <Header />
            <Alert variant="success" className="py-5">
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
                <img
                    src={owner['avatar_url']}
                    alt="Avatar"
                    className="avatar"
                />
                <h3>
                  <a
                      href={owner['html_url']}
                      target="_blank"
                      className="link"
                      rel="noreferrer"
                  >
                    {owner['login']}
                  </a>
                </h3>
              </div>
              <div className="d-flex flex-wrap justify-content-center flex-column align-items-center gap-1 mt-3">
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3 text-break text-center">
                  <h2 className="mb-0">{repositoryName}</h2>
                  <img src={starImage} alt="Star" />
                  <h4 className="m-0">{repository['stargazers_count']}</h4>
                </div>
                <h6>Updated {formattedLastCommitDate} ago</h6>
              </div>
              <div className="text-center mt-2">
                Repository language: {repository.language}
              </div>
            </Alert>
            {description ? (
                <Alert variant="primary" className="text-center">
                  {repository.description}
                </Alert>
            ) : (
                <Alert variant="primary" className="text-center font-italic">
                  Repository doesn't have a description yet
                </Alert>
            )}
            {tenTopStargazers.length < 1 ? (
                <Alert variant="info">
                  <h5 className="text-center font-italic f-16 mb-0">
                    Repository doesn't have contributors yet
                  </h5>
                </Alert>) : (
                <Alert variant="info">
                  <h5 className="text-center mb-5">
                    The best contributors to the repository
                  </h5>
                  <div className="d-flex gap-5 flex-wrap align-items-center justify-content-center">
                    {tenTopStargazers?.map((stargazer, index) => {
                      return (
                          <a
                              href={stargazer['html_url']}
                              target="_blank"
                              className="d-flex flex-wrap flex-column align-items-center justify-content-center gap-2 text-decoration-none"
                              rel="noreferrer"
                              key={index}
                          >
                            <img
                                src={stargazer['avatar_url']}
                                alt="contributor avatar"
                                style={{
                                  width:        80,
                                  borderRadius: 75,
                                }}
                            />
                            <p className="link">{stargazer['login']}</p>
                          </a>
                      )
                    })}
                  </div>
                </Alert>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default RepositoryCard;
