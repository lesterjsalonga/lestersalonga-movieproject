import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../../../../utils/context/AuthToken';
import './Photos.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Photos() {
  const { auth } = useContext(AuthContext);
  const [photoid, setPhotoId] = useState(undefined);
  const urlRef = useRef();
  const descriptionRef = useRef();
  const [photos, setPhotos] = useState([]);
  const [selectedphoto, setSelectedPhoto] = useState({});
  const [tmdbMovieId, setTmdbMovieId] = useState(null);
  const [importMessage, setImportMessage] = useState('');
  let { movieId } = useParams();

  const getAll = useCallback((movieId) => {
    axios({
      method: 'get',
      url: `/movies/${movieId}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => {
        setPhotos(response.data.photos);
        setTmdbMovieId(response.data.tmdbId);
      })
      .catch((error) => {
        console.error("Error fetching Photos:", error.response.data);
      });
  }, [auth.accessToken]);

  useEffect(() => {
    getAll(movieId);
  }, [movieId, getAll]);

  const importPhotosFromTMDB = async () => {
    if (!tmdbMovieId) {
      setImportMessage('TMDB Movie ID not found');
      setTimeout(() => setImportMessage(''), 3000);
      return;
    }

    try {
      // Fetch photos from TMDB
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${tmdbMovieId}/images`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY0ZjFlMmNhODQ1ZjA3NWY5MmI5ZDRlMGY3ZTEwYiIsIm5iZiI6MTcyOTkyNjY3NC40NzIwOTksInN1YiI6IjY3MTM3ODRmNjUwMjQ4YjlkYjYxZTgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RRJNLOg8pmgYoomiCWKtwkw74T3ZtAs7ZScqxo1bzWg'
        },
      });

      const importedPhotos = [
        ...response.data.backdrops.slice(0, 5),
        ...response.data.posters.slice(0, 5)
      ];
      
      const importPromises = importedPhotos.map(async (photo) => {
        const payload = {
          userId: auth.user.userId,
          movieId: movieId,
          url: `https://image.tmdb.org/t/p/original${photo.file_path}`,
          description: `TMDB ${photo.type || 'Image'}`,
        };

        try {
          await axios.post('/admin/photos', payload, {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
        } catch (error) {
          console.error(`Error importing photo:`, error);
        }
      });

      await Promise.all(importPromises);

      // Refresh photos list
      getAll(movieId);

      setImportMessage(`Successfully imported ${importedPhotos.length} photos`);
      
      setTimeout(() => {
        setImportMessage('');
      }, 3000);

    } catch (error) {
      console.error("Error importing photos:", error);
      setImportMessage('Failed to import photos');
      
      setTimeout(() => {
        setImportMessage('');
      }, 3000);
    }
  };

  const validateField = (fieldRef, fieldName) => {
    if (!fieldRef.current.value.trim()) {
      fieldRef.current.style.border = '2px solid red';
      setTimeout(() => {
        fieldRef.current.style.border = '1px solid #ccc';
      }, 2000);
      console.log(`${fieldName} cannot be empty.`);
      return false;
    }
    return true;
  };

  const handlesave = async () => {
    const validateFields = () => {
      const isUrlValid = validateField(urlRef, "URL");
      const isDescriptionValid = validateField(descriptionRef, "Description");

      return isUrlValid && isDescriptionValid;
    };

    if (!validateFields()) {
      return;
    } else {
      try {
        const dataphoto = {
          userId: auth.user.userId,
          movieId: movieId,
          url: selectedphoto.url,
          description: selectedphoto.description,
        };

        await axios({
          method: 'POST',
          url: '/admin/photos',
          data: dataphoto,
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        alert('Added Success');
        setSelectedPhoto({});
        getAll(movieId);
      } catch (error) {
        console.log("Error Saving Photo", error.response?.data || error.message);
      }
    }
  };

  const handledelete = (id) => {
    const isConfirm = window.confirm("Are you Sure to Delete this Photo?");
    if (isConfirm) {
      axios({
        method: 'delete',
        url: `/photos/${id}`,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }).then(() => {
        alert("Delete Success");
        getAll(movieId);
      }).catch((err) => {
        console.log("Error Deleting Photo", err);
      });
    }
  };

  const handleclear = useCallback(() => {
    setSelectedPhoto({});
    setPhotoId(undefined);
  }, [setSelectedPhoto, setPhotoId]);

  const photofetch = async (id) => {
    axios({
      method: 'get',
      url: `/photos/${id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => {
        setSelectedPhoto(response.data);
        setPhotoId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const photoUpdate = async (id) => {
    const validateFields = () => {
      const isUrlValid = validateField(urlRef, "URL");
      const isDescriptionValid = validateField(descriptionRef, "Description");

      return isUrlValid && isDescriptionValid;
    };

    if (!validateFields()) {
      return;
    } else {
      const isConfirm = window.confirm("Are you sure you want to update the Photo?");
      if (isConfirm) {
        const dataphoto = {
          userId: auth.user.userId,
          movieId: selectedphoto.movieId,
          description: selectedphoto.description,
          url: selectedphoto.url,
        };

        console.log("Updating photo with data:", dataphoto);

        try {
          await axios({
            method: 'patch',
            url: `/photos/${id}`,
            data: dataphoto,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
          alert('Updated successfully!');
          handleclear();
          getAll(movieId);
        } catch (error) {
          console.log("Error Updating Photo", error.response?.data || error.message);
        }
      }
    }
  };

  return (
    <div className='photo-box'>
      {importMessage && (
        <div className="import-message">
          {importMessage}
        </div>
      )}

      <div className='Photo-View-Box'>
        {photos.length > 0 ? (
          <div className='card-display-photo'>
            {photos.map((image) => (
              <div key={image.id} className='card-photo'>
                <div className='buttons-group'>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handledelete(image.id)}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='edit-button'
                    onClick={() => photofetch(image.id)}
                  >
                    Edit
                  </button>
                </div>
                <img src={image.url} alt={image.description} style={{ width: '100%' }} className='image-style' />
                <div className='container-photo'>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-photo'>
            <h3>Photos not Found</h3>
          </div>
        )}
      </div>

      <div className='Search-Box'>
        <div className='search-box-btn'>
          <button
            className='import-button'
            type='button'
            onClick={importPhotosFromTMDB}
          >
            Import from TMDB
          </button>
        </div>
      </div>

      <div className='Photo-Search-Box'>
        <div className='parent-container'>
          <div className='photo-detail-box'>
            <div className='photo-container-center'>
              <div className='photo-image-container'>
                <img
                  alt='photo-movies'
                  src={selectedphoto.url
                    ? selectedphoto.url
                    : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                  }
                  className='photo-img'
                />
              </div>
            </div>
          </div>

          <div className='photo-info-text'>
            <div className='input-group'>
              <label className='label-photo'>Url Image:</label>
              <input
                className='photo-url'
                value={selectedphoto.url || ''}
                onChange={(e) => setSelectedPhoto(prev => ({ ...prev, url: e.target.value }))}
                ref={urlRef}
              />
            </div>

            <div className='input-group'>
              <label className='label-photo'>Description:</label>
              <textarea
                className='photo-description'
                value={selectedphoto.description || ''}
                onChange={(e) => setSelectedPhoto(prev => ({ ...prev, description: e.target.value }))}
                ref={descriptionRef}
              />
            </div>
          </div>

          <div className='save-edit-back-btn'>
            {!photoid ? (
              <button className='edit-save-btn' type='button' onClick={handlesave}>
                Save
              </button>
            ) : (
              <button className='edit-save-btn' type='button' onClick={() => photoUpdate(photoid)}>
                Update
              </button>
            )}

            <button className='clear-btn' type='button' onClick={handleclear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Photos;