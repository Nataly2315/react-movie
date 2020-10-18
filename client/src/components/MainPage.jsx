import React from "react";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";

import {API_URL, API_KEY_3} from "../utils/api";

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            moviesWillWatch: [],
            sort_by: "popularity.desc",
            page: 1,
            total_pages: 1,
            query: null
        };

    }

    deleteMovie = movie => {
        const updateMovies = this.state.movies.filter(item => item.id !== movie.id);

        this.setState({
            movies: updateMovies
        });
    };

    addMovieToWillWatch = movie => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    componentDidMount() {
        this.getMovies();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
            return this.getMovies();
        }
    }

    getMovies = () => {
        if (this.state.query) {
            return this.searchMovie();
        }
        fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
            .then(response => {
                return response.json()
            }).then(data => {
            this.setState({
                movies: data.results,
                total_pages: data.total_pages
            })
        })
            .catch(err => console.log(err))
    }

    searchMovie = () => {
        if (!this.state.query) {
            return this.getMovies();
        }
        fetch(`${API_URL}/search/movie?api_key=${API_KEY_3}&query=${this.state.query}&page=${this.state.page}`,
        )
            .then(response => {
                return response.json()
            }).then(data => {
            this.setState({
                movies: data.results,
                total_pages: data.total_pages
            })
        })
            .catch(err => console.log(err))
    }

    updateSortBy = value => {
        this.setState({
            query: null,
            sort_by: value,
            page: 1
        });
    }

    prevPage = () => {
        const newPage = this.state.page - 1;
        this.setState({
            page: newPage
        });
    }

    nextPage = () => {
        const newPage = this.state.page + 1;
        this.setState({
            page: newPage
        });
    }

    updateQueryString = (value) => {
        this.setState({
            query: value
        })
    }

    deleteMovieFromWillWatch = movie => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            item => item.id !== movie.id
        );

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <div className="row mb-4">
                        <MovieTabs
                            sort_by={this.state.sort_by}
                            query={this.state.query}
                            updateQueryString={this.updateQueryString}
                            updateSortBy={this.updateSortBy}
                            searchMovie={this.searchMovie}/>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="row">
                                {this.state.movies.map(movie => {
                                    return (
                                        <div className="col-6 mb-4" key={movie.id}>
                                            <MovieItem
                                                data={movie}
                                                deleteMovie={this.deleteMovie}
                                                addMovieToWillWatch={this.addMovieToWillWatch}
                                                deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                                            />
                                        </div>
                                    );
                                })}
                                <div className={'col-12 d-flex justify-content-between mb-4'}>
                                    <button className={'btn'} disabled={this.state.page === 1}
                                            onClick={this.prevPage}>Previous
                                    </button>
                                    <div>{this.state.page}</div>
                                    <button className={'btn'} disabled={this.state.page === this.state.total_pages}
                                            onClick={this.nextPage}>Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default MainPage;
