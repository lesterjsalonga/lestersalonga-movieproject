import axios from 'axios';
import { useCallback, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';
import { AuthContext } from '../../../../utils/context/AuthToken';
import CastandCrew from '../Form/CastandCrew/CastandCrew';
import Photos from '../Form/Photos/Photos';
import Videos from '../Form/Videos/Videos';

const Form = () => {
  const { auth } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('cast'); 
  const navigate = useNavigate();
  const [isMovieSelected, setIsMovieSelected] = useState(false);
  let { movieId } = useParams();

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_HEADERS = {
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTAxODgxZmE3YWRhZTQzYWY0MGFmNDA1YzFjODliNCIsIm5iZiI6MTczMjU5NTU3OS4yMjMwMTI3LCJzdWIiOiI2NzEyZmFiYTI1YzcwYjhiMWQ2N2Y4YjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oJ-YA-BPl-l8XBcp_VYDJDTO66e31OMKA-igarucAqE',
  };

  const generateImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/original/${path}` : '';
  };

  const handleSearch = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    setIsMovieSelected(false);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        { headers: TMDB_HEADERS }
      );

      if (response.data.results.length === 0) {
        setNotFound(true);
        setSearchedMovieList([]);
        setTotalPages(0);
      } else {
        setSearchedMovieList(response.data.results);
        setTotalPages(response.data.total_pages);
        setNotFound(false);
      }
    } catch (err) {
      setError('Error fetching movies. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setIsMovieSelected(true);
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }
  
    const requiredFields = [
      { name: 'title', value: selectedMovie.title },
      { name: 'overview', value: selectedMovie.overview },
      { name: 'popularity', value: selectedMovie.popularity },
      { name: 'release_date', value: selectedMovie.release_date },
      { name: 'vote_average', value: selectedMovie.vote_average },
    ];
  
    const missingFields = requiredFields.filter(field => !field.value);
  
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.map(field => field.name).join(', ')}`);
      return;
    }
  
    const backdropPath = selectedMovie.backdrop_path 
      ? generateImageUrl(selectedMovie.backdrop_path) 
      : generateImageUrl(selectedMovie.poster_path); 
  
    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      popularity: parseFloat(selectedMovie.popularity),
      releaseDate: selectedMovie.release_date,
      voteAverage: parseFloat(selectedMovie.vote_average),
      posterPath: generateImageUrl(selectedMovie.poster_path),
      backdropPath: backdropPath, 
      isFeatured: selectedMovie.isFeatured || false,  
    };
  
    console.log('Data to be sent:', data);
  
    try {
      if (movieId) {
        const response = await axios.patch(`/movies/${movieId}`, data, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log('Movie updated response:', response);
        alert('Movie updated successfully.');
      } else {
        const response = await axios.post('/movies', data, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log('Movie created response:', response);
        alert('Movie created successfully.');
      }
      navigate('/main/movies');
    } catch (err) {
      setError('Error saving movie. Please try again later.');
      console.error('Save movie error:', err.response);
      if (err.response && err.response.data && err.response.data.errors) {
        console.error('Error details:', err.response.data.errors);
        setError(`Validation errors: ${err.response.data.errors.map(error => error.message).join(', ')}`);
      }
    }
  };

  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`/movies/${movieId}`);
          setMovie(response.data);
          setSelectedMovie({
            id: response.data.tmdbId,
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
            backdrop_path: response.data.backdropPath || '', 
            isFeatured: response.data.isFeatured || false, 
          });
        } catch (err) {
          setError('Error fetching movie details. Please try again later.');
          console.error(err);
        }
      };

      fetchMovie();
    }
  }, [movieId]);

  return (
    <div className="moviecontainer mt-5 overflow-auto movieform-container">
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>
  
      {error && <p className="text-danger text-center">{error}</p>}
  
      {!movieId && (
        <>
          <div className="search-container">
          <label>Search Movie:</label>
          <div className="search-input-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter movie title"
              className="search-input"
            />
            <button onClick={() => handleSearch(1)} className="search-button">Search</button>
          </div>
        </div>

        <div className="searched-movie">
          {!isMovieSelected && ( 
            <>
              {isLoading ? (
                <p className="loading-text">Loading...</p>
              ) : notFound ? (
                <p className="not-found-text">No movies found.</p>
              ) : (
                <ul className="movie-list">
                  {searchedMovieList.map((movie) => (
                    <li key={movie.id} className="movie-item" onClick={() => handleSelectMovie(movie)}>
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  handleSearch(currentPage - 1);
                }}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  handleSearch(currentPage + 1);
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
  
      <div className="movie-details">
        <div className="movie-poster-section">
          {selectedMovie?.poster_path && (
            <img
              src={generateImageUrl(selectedMovie.poster_path)}
              alt={selectedMovie.title}
              className="poster-image"
            />
          )}
        </div>
  
        <div className="movie-form-section">
          <form>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={selectedMovie?.title || ''}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
              />
            </div>
  
            <div>
              <label>Popularity</label>
              <input
                type="number"
                value={selectedMovie?.popularity || ''}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, popularity: e.target.value })}
              />
            </div>
  
            <div>
              <label>Release Date</label>
              <input
                type="date"
                value={selectedMovie?.release_date || ''}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, release_date: e.target.value })}
              />
            </div>
  
            <div>
              <label>Vote Average</label>
              <input
                type="number"
                value={selectedMovie?.vote_average || ''}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, vote_average: e.target.value })}
              />
            </div>
  
            <div className="is-featured-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedMovie?.isFeatured || false}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, isFeatured: e.target.checked ? 1 : 0 })}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              Is Featured
            </label>
          </div>
  
            <div style={{ gridColumn: 'span 2' }}>
              <label>Overview</label>
              <textarea
                rows="5"
                value={selectedMovie?.overview || ''}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, overview: e.target.value })}
              ></textarea>
            </div>
  
            <div className="save-button-container">
              <button type="button" className="save-button" onClick={handleSave}>
                {movieId ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
  
      {movieId && selectedMovie && (
        <div>
        <hr />
        <nav>
          <ul className="tabs">
            <li
              className={activeTab === 'cast' ? 'active' : ''}
              onClick={() => setActiveTab('cast')}
            >
              Cast & Crew
            </li>
            <li
              className={activeTab === 'videos' ? 'active' : ''}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </li>
            <li
              className={activeTab === 'photos' ? 'active' : ''}
              onClick={() => setActiveTab('photos')}
            >
              Photos
            </li>
          </ul>
        </nav>
        {activeTab === 'cast' && <CastandCrew />}
        {activeTab === 'videos' && <Videos />}
        {activeTab === 'photos' && <Photos />}
      </div>
      )}
    </div>
  );
};

export default Form;
