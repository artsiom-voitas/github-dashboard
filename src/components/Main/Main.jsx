import React, {
    Fragment,
    useEffect,
} from 'react'
import './main.scss'
import {
    useDispatch,
    useSelector,
} from 'react-redux'
import { getMostPopularRepositories } from '../../redux/mostPopularRepositoriesReducer/thunk'
import ErrorMessage from '../ErrorMessage'
import Header from '../Header/'
import RepositoriesList from '../RepositoriesList/'

const Main = React.memo(
    function Main() {
        const dispatch = useDispatch()
        const repos    = useSelector(
            (state) => state.mostPopularRepositories.items,
        )

        const isLoading = useSelector(
            (state) => state.mostPopularRepositories.isLoading,
        )

        useEffect(() => {
            dispatch(getMostPopularRepositories())
        }, [dispatch])

        return (
            <div>
                {!repos ? (
                    <ErrorMessage />
                ) : (
                    <Fragment>
                        <Header />
                        <div className="main__title mb-3">
                            Top 10 most popular repositories
                        </div>
                        <RepositoriesList repositories={repos} isLoading={isLoading} />
                    </Fragment>
                )}
            </div>
        )
    },
)

export default Main
