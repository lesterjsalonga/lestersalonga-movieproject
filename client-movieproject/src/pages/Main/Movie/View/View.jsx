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

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [currentCap, setCurrentCap] = useState('');

  const openModalImage = (photoUrl, photoCap) => {
    setCurrentImg(photoUrl);
    setCurrentCap(photoCap);
    setModalOpen(true);
  };

  const closeModalImage = () => {
    setModalOpen(false);
    setCurrentImg('');
    setCurrentCap('');
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
                <div style={{
                  display: 'flex', 
                  gap: '10px', 
                  marginBottom: '15px'
                }}>
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre} 
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontSize: '0.8rem'
                      }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
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

          {/* Cast & Crew */}
          {movie.casts && movie.casts.length > 0 ? (
            <div className="section">
              <h2>Cast & Crew</h2>
              <div className="card-display-cast">
                {movie.casts.map((cast) => (
                  <CastsCards
                    key={cast.id}
                    cast={{ 
                      url: cast.url, 
                      name: cast.name, 
                      characterName: cast.characterName 
                    }} 
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Cast & Crew</h2>
              <p>No cast available.</p>
            </div>
          )}

          {/* Videos */}
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
                    <VideoCards
                      key={video.id}
                      video={{ 
                        url: embedUrl, 
                        name: video.title || video.name 
                      }}
                    />
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

          {/* Photos */}
          {movie.photos && movie.photos.length > 0 ? (
            <div className="section">
              <h2>Photos</h2>
              <div className="photo-gallery">
                {movie.photos.map((photo) => (
                  <PhotoCards
                    key={photo.id}
                    photo={{ url: photo.url, description: photo.description }}
                    onClick={() => openModalImage(photo.url, photo.description)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Photos</h2>
              <p>No photos available.</p>
            </div>
          )}
          
          {modalOpen && (
            <div className='modal' onClick={closeModalImage}>
              <span className='close-web-btn' onClick={closeModalImage}>&times;</span>
              <img className="modal-container-content" src={currentImg} alt={currentCap} />
              <div className='caption-photo'>{currentCap}</div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;