import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get('/movies', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      alert('Failed to fetch movies. Please try again.');
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDeleteSelected = async () => {
    if (window.confirm('Are you sure you want to delete the selected movies?')) {
      try {
        await Promise.all(
          selectedMovies.map((id) =>
            axios.delete(`/movies/${id}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
          )
        );

        setLists((prevLists) =>
          prevLists.filter((movie) => !selectedMovies.includes(movie.id))
        );
        setSelectedMovies([]);
        alert('Selected movies deleted successfully.');
      } catch (error) {
        console.error('Error deleting movies:', error);
        alert('Failed to delete some or all movies. Please try again.');
      }
    }
  };

  const handleDeleteSingle = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
        alert('Movie deleted successfully.');
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete the movie. Please try again.');
      }
    }
  };

  const handleSelect = (id) => {
    setSelectedMovies((prev) =>
      prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]
    );
  };

  return (
    <div className="lists-container">
      <div className="create-container">
        <button
          className="button-list"
          type="button"
          onClick={() => navigate('/main/movies/form')}
        >
          Create new
        </button>
        {selectedMovies.length > 0 && (
          <button
            className="button-delete"
            type="button"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        )}
      </div>
      <div className="table-container">
        <table className="movie-lists">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedMovies(
                      e.target.checked ? lists.map((movie) => movie.id) : []
                    )
                  }
                  checked={selectedMovies.length === lists.length && lists.length > 0}
                />
              </th>
              <th>ID</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Popularity</th>
              <th>Vote Average</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie.id)}
                    onChange={() => handleSelect(movie.id)}
                  />
                </td>
                <td>{movie.id}</td>
                <td>
                  <img
                    src={movie.posterPath}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.popularity}</td>
                <td>{movie.voteAverage}</td>
                <td>{movie.releaseDate}</td>
                <td>
                <div className="button-container">
                  <button
                    className="button-edit"
                    type="button"
                    onClick={() => navigate('/main/movies/form/' + movie.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-delete"
                    type="button"
                    onClick={() => handleDeleteSingle(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
