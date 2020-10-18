import React from "react";
import SearchBar from "./SearchBar"

class MovieTabs extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextProps.sort_by === this.props.sort_by && nextProps.query === this.props.query);
    }

    render() {
        const {sort_by, updateSortBy, query, searchMovie, updateQueryString} = this.props;
        const handleClick = value => {
            return () => {
                updateSortBy(value);
            }
        };
        return (
            <nav className={'col-12 mt-4 d-flex justify-content-between'}>
                <ul className="tabs nav nav-pills">
                    <li className="nav-item">
                        <div className={`nav-link ${sort_by === 'popularity.desc' ? 'active' : ''}`}
                             onClick={handleClick('popularity.desc')}>
                            Popular
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={`nav-link ${sort_by === 'revenue.desc' ? 'active' : ''}`}
                             onClick={handleClick('revenue.desc')}>
                            Revenue
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={`nav-link ${sort_by === 'vote_average.desc' ? 'active' : ''}`}
                             onClick={handleClick('vote_average.desc')}>
                            Vote average
                        </div>
                    </li>
                </ul>
                <SearchBar
                searchMovie={searchMovie}
                updateSearchBy={updateQueryString}
                query={query}/>
            </nav>)
    }
}

export default MovieTabs;
