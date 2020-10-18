import React from "react";
import ReactPlayer from "react-player";
import '../star.css';
import Stars from "./Stars";

import {API_URL, API_KEY_3} from "../utils/api";
import MovieDetails from "./MovieDetails";
import {connect} from "react-redux";

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: this.props.match.params.movieId,
            movieDetails: {},
            movieVideos: [],
        }
    }

    componentDidMount() {
        this.getMovieDetails();
        this.getMovieVideos();
    }

    getMovieDetails = () => {
        fetch(`${API_URL}/movie/${this.state.movieId}?api_key=${API_KEY_3}`)
            .then(response => {
                return response.json()
            }).then(data => {
            this.setState({
                movieDetails: data
            })
        })
            .catch(err => console.log(err))
    }

    getMovieVideos = () => {
        if (!this.state.movieVideos.length) {
            fetch(`${API_URL}/movie/${this.state.movieId}/videos?api_key=${API_KEY_3}`)
                .then(response => {
                    return response.json()
                }).then(data => {
                this.setState({
                    movieVideos: data.results
                })
            })
                .catch(err => console.log(err))
        }
    }

     changeRating = (value) =>{
        this.setState({rating: value});
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row mb-4">
                    <div className={'col-4'}>
                        <img
                            className="card-img-top"
                            src={`https://image.tmdb.org/t/p/w500${this.state.movieDetails.poster_path || this.state.movieDetails.backdrop_path}`}
                            alt=""
                        />
                        <div className="d-flex justify-content-between ">
                            <div className="d-flex">
                                <Stars
                                    rating={this.state.movieDetails.vote_average}
                                    isLoggedIn = {this.props.isLoggedIn}
                                    changeRating={this.changeRating}
                                />
                            </div>
                            <div className={'rating-value'}>
                                {this.state.movieDetails.vote_average}
                            </div>
                        </div>

                    </div>
                    <div className={'col-8'}>
                        <h3 className={'movie-title'}>{this.state.movieDetails.title}</h3>
                        <div>
                          <MovieDetails movieDetails={this.state.movieDetails}/>
                            <ReactPlayer
                                url={this.state.movieVideos.length ? `https://www.youtube.com/watch?v=${this.state.movieVideos[0].key}` : ""}
                            width={'100%'}
                            height={'400px'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}


function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(MoviePage);