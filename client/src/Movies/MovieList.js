import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies.sort(function (a,b) {
        return a.id - b.id;
      })
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.movies !== prevProps.movies){
      this.setState({movies: this.props.movies})
    }
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
