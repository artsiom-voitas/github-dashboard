import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../images/github-logo.svg";
import "./header.scss";
import { getRepositoriesBySearchQuery } from "../../redux/searchRepositoriesReducer/thunk";

function Header(_props)
{
  const [searchValue, setSearchValue] = useState('')
  const dispatch                      = useDispatch()
  const currentPage                   = useSelector(
      (state) => state.searchRepositoriesReducer.currentPage,
  )

  function onInputChange(event)
  {
    setSearchValue(event.target.value)
  }

  function searchHandler() {
    dispatch(getRepositoriesBySearchQuery(searchValue, currentPage))
  }
  const searchPlaceholder = "Search or jump to...";
  return (
    <header>
      <Link to="/">
        <img className="logo" src={logo} alt="Github logo" />
      </Link>
      <InputGroup className="search mb-3">
        <Form.Control
          aria-label="Text input with dropdown button"
          type="text"
          placeholder={searchPlaceholder}
          className="search__input"
          value={searchValue}
          onChange={onInputChange}
        />
        <Link
          to={`/search?query=${searchValue}&page=${currentPage}`}
          className="ms-2"
        >
          <Button variant="primary" onClick={searchHandler}>
            Search
          </Button>
        </Link>
      </InputGroup>
    </header>
  );
}

export default Header;
