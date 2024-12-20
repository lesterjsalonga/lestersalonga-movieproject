import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleNextMovie = () => {
    const nextIndex = (featuredIndex + 1) % movieList.length;
    setFeaturedIndex(nextIndex);
    setFeaturedMovie(movieList[nextIndex]);
  };

  const handlePrevMovie = () => {
    const prevIndex = (featuredIndex - 1 + movieList.length) % movieList.length;
    setFeaturedIndex(prevIndex);
    setFeaturedMovie(movieList[prevIndex]);
  };

  return (
    <div className='main-containerr'>
      <h1 className='page-title'>CINESHPERE</h1>
      {featuredMovie && movieList.length ? (
        <div className='featured-list-container'>
          <div
            className='featured-backdrop'
            style={{
              background: `url(${
                featuredMovie.backdropPath !==
                'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath
              }) no-repeat center center / cover`,
            }}
          >
            <div className='featured-movie-details'>
              <div className='featured-movie-navigation'>
                <button 
                  className='nav-button prev-button' 
                  onClick={handlePrevMovie}
                >
                  <div className="button-top">
                    <span>❮</span>
                  </div>
                  <div className="button-bottom"></div>
                  <div className="button-base"></div>
                </button>
                <button 
                  className='nav-button next-button' 
                  onClick={handleNextMovie}
                >
                  <div className="button-top">
                    <span>❯</span>
                  </div>
                  <div className="button-bottom"></div>
                  <div className="button-base"></div>
                </button>
              </div>
              <div className='featured-movie-info'>
                <h2 className='featured-movie-title'>{featuredMovie.title}</h2>
                <div className='featured-movie-meta'>
                  <span className='featured-movie-year'>
                    {featuredMovie.releaseYear}
                  </span>
                  <span className='featured-movie-rating'>
                    ★ {featuredMovie.rating?.toFixed(1)}
                  </span>
                </div>
                <p className='featured-movie-overview'>
                  {featuredMovie.overview && featuredMovie.overview.length > 200 
                    ? `${featuredMovie.overview.substring(0, 200)}...` 
                    : featuredMovie.overview}
                </p>
                <button 
                  className='view-details-button'
                  onClick={() => {
                    navigate(`/view/${featuredMovie.id}`);
                    setMovie(featuredMovie);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='featured-list-container-loader'></div>
      )}
      <div className='list-container'>
        {movieList.map((movie) => (
          <MovieCards
            key={movie.id}
            movie={movie}
            onClick={() => {
              navigate(`/view/${movie.id}`);
              setMovie(movie);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;