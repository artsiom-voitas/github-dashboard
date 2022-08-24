import React, {
    useCallback,
    useState,
} from 'react'
import {
    InputGroup,
    Form,
    Button,
} from 'react-bootstrap'
import {
    useDispatch,
    useSelector,
} from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../images/github-logo.svg'
import './header.scss'
import { getRepositoriesBySearchQuery } from '../../redux/searchRepositoriesReducer/thunk'

const Header = React.memo(
    function Header() {
        const [searchValue, setSearchValue] = useState('')
        const dispatch                      = useDispatch()
        const currentPage                   = useSelector(
            (state) => state.searchRepositories.currentPage,
        )

        const handleChange = useCallback(
            (event) => {
                setSearchValue(event.target.value)
            },
            [],
        )

        const handleSearch = useCallback(
            () => {
                dispatch(getRepositoriesBySearchQuery(searchValue, currentPage))
            },
            [searchValue, currentPage, dispatch],
        )

        return (
            <header>
                <Link to="/">
                    <img className="logo" src={logo} alt="Github logo" />
                </Link>
                <InputGroup className="search mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search or jump to..."
                        className="search__input"
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <Link
                        to={`/search?query=${searchValue}&page=${currentPage}`}
                        className="ms-2"
                    >
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Link>
                </InputGroup>
            </header>
        )
    },
)

export default Header
