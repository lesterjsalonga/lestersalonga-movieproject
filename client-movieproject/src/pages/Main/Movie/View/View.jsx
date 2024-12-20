import { useEffect, useState } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css'; 
import CastsCards from '../../../../components/CastsCards/CastsCards';
import VideoCards from '../../../../components/VideoCards/VideoCards';
import PhotoCards from '../../../../components/PhotoCards/PhotoCards';

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type, content) => {
    setModalType(type);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalType(null);
    setModalContent(null);
  };

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.error(error);
          navigate('/');
        });
    }
  }, [movieId, setMovie, navigate]);

  const renderModal = () => {
    switch(modalType) {
      case 'cast':
        return (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-web-btn" onClick={closeModal}>&times;</span>
              <div className="modal-cast-details">
                <img 
                  src={modalContent.url} 
                  alt={modalContent.name} 
                  className="modal-cast-image"
                />
                <div className="modal-cast-info">
                  <h2>{modalContent.name}</h2>
                  <p>Character: {modalContent.characterName}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-web-btn" onClick={closeModal}>&times;</span>
              <iframe 
                src={modalContent.url}
                title={modalContent.name}
                className="modal-video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      
      case 'photo':
        return (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-web-btn" onClick={closeModal}>&times;</span>
              <img 
                src={modalContent.url} 
                alt={modalContent.description || 'Movie Photo'} 
                className="modal-photo"
              />
              {modalContent.description && (
                <div className="caption-photo">{modalContent.description}</div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="view-container">
      {movie ? (
        <>
          <div 
            className="movie-banner" 
            style={{ 
              backgroundImage: `url(${movie.bannerImage || ''})`,
              backgroundColor: movie.dominantColor || '#121212' 
            }}
          >
            <div className="banner-overlay">
              <div className="banner-content">

                <div className="movie-banner-details">
                  <h1 className="movie-title">
                    {movie.title}
                    {movie.releaseYear && (
                      <span style={{ 
                        fontSize: '0.5em', 
                        marginLeft: '10px', 
                        color: 'rgba(255,255,255,0.7)' 
                      }}>
                        ({movie.releaseYear})
                      </span>
                    )}
                  </h1>
                  {movie.genres && (
                    <div className="genre-tags">
                      {movie.genres.map((genre) => (
                        <span key={genre} className="genre-tag">
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="movie-details">
            {movie.tagline && (
              <div style={{
                textAlign: 'center', 
                fontStyle: 'italic', 
                color: '#ff6b6b', 
                marginBottom: '20px'
              }}>
                "{movie.tagline}"
              </div>
            )}
            <h3 className="movie-overview">{movie.overview}</h3>
          </div>

          {movie.casts && movie.casts.length > 0 ? (
            <div className="section">
              <h2>Cast & Crew</h2>
              <div className="card-display-cast">
                {movie.casts.map((cast) => (
                  <div 
                    key={cast.id} 
                    onClick={() => openModal('cast', { 
                      url: cast.url, 
                      name: cast.name, 
                      characterName: cast.characterName 
                    })}
                  >
                    <CastsCards
                      cast={{ 
                        url: cast.url, 
                        name: cast.name, 
                        characterName: cast.characterName 
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Cast & Crew</h2>
              <p>No cast available.</p>
            </div>
          )}

          {movie.videos && movie.videos.length > 0 ? (
            <div className="section">
              <h2>Videos</h2>
              <div className="video-gallery">
                {movie.videos.map((video) => {
                  const getEmbedUrl = (url) => {
                    if (!url) return null;
                    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/))?(?:watch\?v=|e(?:mbed)\/)([\w-]{11})|(?:youtu\.be\/)([\w-]{11})/;
                    const match = url.match(regex);
                    const videoId = match ? (match[1] || match[2]) : null;
                    
                    return videoId 
                      ? `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1` 
                      : null;
                  };

                  const embedUrl = getEmbedUrl(video.url);

                  return embedUrl ? (
                    <div 
                      key={video.id} 
                      onClick={() => openModal('video', { 
                        url: embedUrl, 
                        name: video.title || video.name 
                      })}
                    >
                      <VideoCards
                        video={{ 
                          url: embedUrl, 
                          name: video.title || video.name 
                        }}
                      />
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Videos</h2>
              <p>No videos available.</p>
            </div>
          )}

          {movie.photos && movie.photos.length > 0 ? (
            <div className="section">
              <h2>Photos</h2>
              <div className="photo-gallery">
                {movie.photos.map((photo) => (
                  <div 
                    key={photo.id} 
                    onClick={() => openModal('photo', { 
                      url: photo.url, 
                      description: photo.description 
                    })}
                  >
                    <PhotoCards
                      photo={{ url: photo.url, description: photo.description }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Photos</h2>
              <p>No photos available.</p>
            </div>
          )}
          {modalType && renderModal()}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;