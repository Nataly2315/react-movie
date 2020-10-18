import React from "react";
import {API_KEY_3, API_URL} from "../utils/api";
import Stars from "./Stars";
import ReactPlayer from "react-player";

class MovieSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popularMovies: []
        }
    }

    componentDidMount() {
        this.getPopularMovies();

    }

    getMovieDetails = () => {
        fetch(`${API_URL}/movie/popular?api_key=${API_KEY_3}`)
            .then(response => {
                return response.json()
            }).then(data => {
            this.setState({
                popularMovies: data
            })
        })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className={'col-1'}>
                <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${this.state.popularMovies.poster_path || this.state.movieDetails.backdrop_path}`}
                    alt=""
                />

            </div>


        );
    }


}

export default MovieSideBar;
