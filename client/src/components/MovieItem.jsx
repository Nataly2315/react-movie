import React from "react";
import {Link} from 'react-router-dom';

class MovieItem extends React.Component {

    state = {
        willWatch: false
    };

    render() {
        const {
            data,
            deleteMovie,
            deleteMovieFromWillWatch
        } = this.props;

        return (
            <div className="card">
                <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
                    data.poster_path}`}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{data.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {data.vote_average}</p>
                        <Link to={`/${data.id}`}>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.setState({
                                        willWatch: false
                                    });
                                    deleteMovieFromWillWatch(data);
                                }}
                            >
                                Watch
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieItem;
