import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  // Function to fetch movies
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
    getMovies(); // Fetch movies when the component loads
  }, []);

  // Delete movie function
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure that you want to delete this data?')) {
      try {
        const response = await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          // Update the UI by removing the deleted movie from the list
          setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
          alert('Movie deleted successfully.');
        } else {
          alert('Failed to delete the movie. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete the movie. Please try again.');
      }
    }
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
      </div>
      <div className="table-container">
        <table className="movie-lists">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.popularity}</td>
                <td>{movie.voteAverage}</td>
                <td>{movie.releaseDate}</td>
                <td>
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
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
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
