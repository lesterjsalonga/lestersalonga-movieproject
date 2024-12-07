import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../../../../utils/context/AuthToken';
import axios from 'axios';
import './CastandCrew.css';
import { useParams } from 'react-router-dom';

function Casts() {
  const { auth } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [cast, setCast] = useState([]);
  const [selectedCast, setSelectedCast] = useState({});
  const searchRef = useRef();
  const [notFound, setNotFound] = useState(false);
  const nameRef = useRef();
  const characterNameRef = useRef();
  const urlRef = useRef();
  const { movieId } = useParams();
  const [importMessage, setImportMessage] = useState('');
  const [tmdbMovieId, setTmdbMovieId] = useState(null);

  const getAll = useCallback((movie_id) => {
    axios({
      method: 'get',
      url: `/movies/${movie_id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => {
        setCast(response.data.casts);
        setTmdbMovieId(response.data.tmdbId);
      })
      .catch((error) => {
        console.error("Error fetching Casts:", error.response?.data || error.message);
      });
  }, [auth.accessToken]);

  useEffect(() => {
    getAll(movieId);
  }, [movieId, getAll]);

  const handleSearchPerson = useCallback(async (page = 1) => {
    setNotFound(true);
    try {
      if (!query || query.trim() === '') {
        searchRef.current.style.border = '2px solid red';
        console.log("Input is empty or undefined");
        setTimeout(() => {
          searchRef.current.style.border = '1px solid #ccc';
          setNotFound(false);
        }, 2000);
        return;
      }
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY0ZjFlMmNhODQ1ZjA3NWY5MmI5ZDRlMGY3ZTEwYiIsIm5iZiI6MTcyOTkyNjY3NC40NzIwOTksInN1YiI6IjY3MTM3ODRmNjUwMjQ4YjlkYjYxZTgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RRJNLOg8pmgYoomiCWKtwkw74T3ZtAs7ZScqxo1bzWg'
        },
      });

      if (response.data.results.lenght === 0) {
        console.log("Not Found");
        setSelectedCast([])
      } else {
        setNotFound(false);
        setSelectedCast(response.data.results[0]);
        console.log(response.data.results);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  }, [query])

  const importCasts = async () => {
    if (!tmdbMovieId) {
      setImportMessage('TMDB Movie ID not found');
      setTimeout(() => setImportMessage(''), 3000);
      return;
    }

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${tmdbMovieId}/credits?language=en-US`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY0ZjFlMmNhODQ1ZjA3NWY5MmI5ZDRlMGY3ZTEwYiIsIm5iZiI6MTcyOTkyNjY3NC40NzIwOTksInN1YiI6IjY3MTM3ODRmNjUwMjQ4YjlkYjYxZTgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RRJNLOg8pmgYoomiCWKtwkw74T3ZtAs7ZScqxo1bzWg'
        },
      });

      const importedCasts = response.data.cast;
      
      const importPromises = importedCasts.map(async (data) => {
        if (data.profile_path) {
          const payload = {
            userId: auth.user.userId,
            movieId: movieId,
            name: data.name,
            characterName: data.character,
            url: `https://image.tmdb.org/t/p/original/${data.profile_path}`,
          };

          try {
            await axios.post('/admin/casts', payload, {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            });
          } catch (error) {
            console.error(`Error importing cast member ${data.name}:`, error);
          }
        }
      });

      await Promise.all(importPromises);

      getAll(movieId);
      setImportMessage(`Successfully imported ${importedCasts.filter(cast => cast.profile_path).length} casts`);
      
      setTimeout(() => {
        setImportMessage('');
      }, 3000);

    } catch (error) {
      console.error("Error importing casts:", error);
      setImportMessage('Failed to import casts');
      
      setTimeout(() => {
        setImportMessage('');
      }, 3000);
    }
  };

  const handleSave = async () => {
    if (!selectedCast || !selectedCast.name || !selectedCast.characterName) {
      alert("Please select a valid cast member.");
      return;
    }

    try {
      const dataCast = {
        userId: auth.user.userId,
        movieId: movieId,
        name: selectedCast.name,
        url: selectedCast.profile_path
          ? `https://image.tmdb.org/t/p/original/${selectedCast.profile_path}`
          : selectedCast.url,
        characterName: selectedCast.characterName,
      };
      await axios({
        method: 'POST',
        url: '/admin/casts',
        data: dataCast,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      alert('Added Successfully');
      setSelectedCast({});
      handleClear();
      getAll(movieId);
    } catch (error) {
      alert("Error: Unable to save cast. Data might be incomplete.");
      console.error(error);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCast({});
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete this cast?");
    if (isConfirm) {
      try {
        await axios({
          method: 'delete',
          url: `/casts/${id}`,
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        getAll(movieId);
        alert("Deleted Successfully!");
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const validateField = (fieldRef, fieldName) => {
    if (!fieldRef.current.value.trim()) {
      fieldRef.current.style.border = '2px solid red';
      setTimeout(() => {
        fieldRef.current.style.border = '1px solid #ccc';
      }, 2000);
      return false;
    }
    return true;
  };

  const castupdate = async (id) => {
    if (!selectedCast?.id) {
      alert("No cast selected to update.");
      return;
    }
  
    const validateFields = () => {
      switch (true) {
        case !validateField(nameRef, "Name"):
          return false;
        case !validateField(characterNameRef, "Character Name"):
          return false;
        case !validateField(urlRef, "URL"):
          return false;
        default:
          return true;
      }
    };
  
    if (!validateFields()) {
      return;
    } else {
      const isConfirm = window.confirm("Are you sure you want to update the cast?");
      if (isConfirm) {
        const datacast = {
          id: selectedCast.id,
          userId: selectedCast.userId,
          movieId: movieId,
          name: selectedCast.name,
          url: selectedCast.url,
          characterName: selectedCast.characterName,
        };
  
        try {
          await axios({
            method: 'patch',
            url: `/casts/${id}`,
            data: datacast,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          alert('Updated Successfully!');
          handleClear();
          getAll(movieId);
        } catch (error) {
          if (error.response) {
            alert(`Error updating cast: ${error.response.data.message || 'Unknown error'}`);
          } else if (error.request) {
            alert("No response received from server. Please try again later.");
          } else {
            alert("An unexpected error occurred. Please try again.");
          }
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="cast-box">
      {importMessage && (
        <div className="import-message">
          {importMessage}
        </div>
      )}
      
      <div className="Cast-View-Box">
        {cast.length > 0 ? (
          <div className="card-display-cast">
           {cast.map((actor) => (
            <div key={actor.id} className="card">
              <div className="buttons-group">
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(actor.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setSelectedCast(actor)}
                >
                  Edit
                </button>
              </div>
              <img src={actor.url} alt={actor.name} className="image-casts" />
              <div className="container">
                <h4>{actor.name}</h4>
                <p>{actor.characterName}</p>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className="no-cast">
            <h3>Cast not found</h3>
          </div>
        )}
      </div>

      <div className="Search-Box">
        <div className="parent-container">
          <div className="search-box-btn">
            <input
              className="input-search-person"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cast name"
              ref={searchRef}
            />
            <button
              className="button-search"
              type="button"
              onClick={() => handleSearchPerson(1)}
              disabled={notFound}
            >
              {notFound ? 'Searching...' : 'Search'}
            </button>
            <button
              className="save-button"
              type="button"
              onClick={handleSave}
              disabled={!selectedCast}
            >
              Add Cast
            </button>
            <button
              className="import-button"
              type="button"
              onClick={importCasts}
            >
              Import from TMDB
            </button>
          </div>

          <div className='cast-detail-box'>
            <div className='image-container-center'>
              <div className='image-container'>
              <img
                alt="image-cast"
                src={selectedCast?.profile_path
                  ? `https://image.tmdb.org/t/p/original/${selectedCast.profile_path}`
                  : selectedCast?.url
                    ? selectedCast.url
                    : require('../../Form/CastandCrew/not_available.jpg')
                }
                className='img-cast'
              />
              </div>
            </div>

            <div className="info-text">
              <div className="input-group">
                <label>Cast Name:</label>
                <input
                  className="cast-name"
                  value={selectedCast.name || ''}
                  onChange={(e) => setSelectedCast({ ...selectedCast, name: e.target.value })}
                  ref={nameRef} />
              </div>
              <div className="input-group">
                <label>Character Name:</label>
                <input
                  className="character-name"
                  value={selectedCast.characterName || ''}
                  onChange={(e) => setSelectedCast({ ...selectedCast, characterName: e.target.value })}
                  ref={characterNameRef}
                />
              </div>
              <div className="input-group">
                <label>URL:</label>
                <input
                  className="url-text-photo"
                  value={selectedCast.url || ''}
                  onChange={(e) => setSelectedCast({ ...selectedCast, url: e.target.value })}
                  ref={urlRef}
                />
              </div>
            </div>
            {selectedCast.id && (
              <div className="edit-back-btn">
                <button className="edit-btn" type="button" onClick={() => castupdate(selectedCast.id)}>
                  Update Cast
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Casts;