import React, {useState, useEffect} from 'react';
import axios from "axios";

 const UpdateMovie = (props) => {
    const initialMovie = {
        id: 0,
        title: "",
        director: "",
        metascore: 0,
        stars: []
    }

    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        const id = props.match.params.id;
        const currentMovie = props.movies.find(movie => `${movie.id}` === id)
        if(currentMovie) setMovie(currentMovie)

    }, [props.movies, props.match.params.id]);

    const handleChange = e => {
        e.preventDefault();
        setMovie({...movie, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            console.log('put response', response)
            const newMoviesArr = props.movies.filter(mov => mov.id !== movie.id)
            props.setMovies([...newMoviesArr, response.data])
            props.history.push('/')
        })
        .catch(error => console.log(error))
      };
    
       return (
        <div className="update-movie">
          <h1>Update</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="title"
              value={movie.title}
            />
            <input
              type="text"
              name="director"
              onChange={handleChange}
              placeholder="director"
              value={movie.director}
            />
            <input
              type="number"
              name="metascore"
              onChange={handleChange}
              placeholder="metascore"
              value={movie.metascore}
            />
            {/* Insert subform to edit/add/remove stars */}
            <button className="button">Update</button>
          </form>
        </div>
      );
    };


 export default UpdateMovie;