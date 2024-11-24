import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const navigate = useNavigate();
  let { movieId } = useParams();

  const handleSearch = useCallback(() => {
    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
    });
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleInputChange = (field, value) => {
    setSelectedMovie({ ...selectedMovie, [field]: value });
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie or fill in the fields.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id || movie.tmdbId,
      title: selectedMovie.title || movie.title,
      overview: selectedMovie.overview || movie.overview,
      popularity: selectedMovie.popularity || movie.popularity,
      releaseDate: selectedMovie.release_date || movie.releaseDate,
      voteAverage: selectedMovie.vote_average || movie.voteAverage,
      backdropPath: selectedMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`
        : movie.backdropPath,
      posterPath: selectedMovie.poster_path
        ? selectedMovie.poster_path.startsWith('https://')
          ? selectedMovie.poster_path
          : `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`
        : movie.posterPath,
      isFeatured: movie ? movie.isFeatured : 0,
    };

    const requestMethod = movieId ? 'put' : 'post';
    const url = movieId ? `/movies/${movieId}` : '/movies';

    axios({
      method: requestMethod,
      url: url,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(() => {
        alert('Movie saved successfully!');
        navigate('/main/movies');
      })
      .catch((error) => {
        console.error('Error saving movie:', error.response || error);
        alert('Failed to save the movie. Please try again.');
      });
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>

      {!movieId && (
        <div className="search-container">
          <label>Search Movie:</label>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
          <div className="searched-movie">
            {searchedMovieList.map((movie) => (
              <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                {movie.original_title || movie.title}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="container">
        <form>
          {selectedMovie?.poster_path && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt="Movie Poster"
            />
          )}
          <div className="field">
            <label>Title:</label>
            <input
              type="text"
              value={selectedMovie?.original_title || ''}
              onChange={(e) => handleInputChange('original_title', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Overview:</label>
            <textarea
              rows={5}
              value={selectedMovie?.overview || ''}
              onChange={(e) => handleInputChange('overview', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Popularity:</label>
            <input
              type="text"
              value={selectedMovie?.popularity || ''}
              onChange={(e) => handleInputChange('popularity', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Release Date:</label>
            <input
              type="text"
              value={selectedMovie?.release_date || ''}
              onChange={(e) => handleInputChange('release_date', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Vote Average:</label>
            <input
              type="text"
              value={selectedMovie?.vote_average || ''}
              onChange={(e) => handleInputChange('vote_average', e.target.value)}
            />
          </div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
