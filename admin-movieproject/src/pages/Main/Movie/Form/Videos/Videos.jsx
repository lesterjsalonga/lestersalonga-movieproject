import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../../utils/context/AuthToken';
import { useParams } from 'react-router-dom';
import VideosForm from './VideosForm';
import './Videos.css';

function Videos() {
  const { auth } = useContext(AuthContext);
  const { movieId } = useParams();
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    url: '',
    description: '',
    site: 'YouTube',
    videoKey: '',
    videoType: 'Trailer',
    official: false
  });
  const [editingVideo, setEditingVideo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [importMessage, setImportMessage] = useState('');
  const [tmdbMovieId, setTmdbMovieId] = useState(null);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/))?(?:watch\?v=|e(?:mbed)\/)([\w-]{11})|(?:youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? (match[1] || match[2]) : null;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/movies/${movieId}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        setTmdbMovieId(response.data.tmdbId);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/movies/${movieId}/videos`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });

        if (Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
        } else {
          console.error("Error: No videos found or videos is not an array");
          setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      }
    };

    fetchMovieDetails();
    fetchVideos();
  }, [movieId, auth.accessToken]);

  const importVideosFromTMDB = async () => {
    if (!tmdbMovieId) {
      setImportMessage('TMDB Movie ID not found');
      setTimeout(() => setImportMessage(''), 3000);
      return;
    }

    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${tmdbMovieId}/videos?language=en-US`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGY0ZjFlMmNhODQ1ZjA3NWY5MmI5ZDRlMGY3ZTEwYiIsIm5iZiI6MTcyOTkyNjY3NC40NzIwOTksInN1YiI6IjY3MTM3ODRmNjUwMjQ4YjlkYjYxZTgxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RRJNLOg8pmgYoomiCWKtwkw74T3ZtAs7ZScqxo1bzWg', 
        },
      });

      const importedVideos = response.data.results;

      const importPromises = importedVideos.map(async (video) => {
        if (video.site === 'YouTube') {
          const videoKey = video.key;
          const videoType = video.type || 'Trailer'; 
          const official = video.official || false; 

          const payload = {
            userId: auth.user.userId,
            movieId: movieId,
            url: `https://www.youtube.com/watch?v=${videoKey}`,
            description: video.name || 'No description',
            site: video.site || 'YouTube',
            videoKey: videoKey,
            videoType: videoType,
            official: official
          };

          try {
            await axios.post('/videos', payload, {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            });
          } catch (error) {
            console.error(`Error importing video ${video.name}:`, error);
          }
        }
      });

      await Promise.all(importPromises);

      const updatedVideosResponse = await axios.get(`/movies/${movieId}/videos`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      setVideos(updatedVideosResponse.data.videos);

      setImportMessage(`Successfully imported ${importedVideos.filter(v => v.site === 'YouTube').length} videos`);

      setTimeout(() => {
        setImportMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error importing videos:", error);
      setImportMessage('Failed to import videos');
      
      setTimeout(() => {
        setImportMessage('');
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    if (editingVideo) {
      setEditingVideo((prev) => ({ ...prev, [name]: fieldValue }));
    } else {
      setNewVideo((prev) => ({ ...prev, [name]: fieldValue }));
    }
  };

  const handleAddVideo = async () => {
    if (!newVideo.url || !newVideo.description) {
      alert("Please provide both a URL and a description for the video.");
      return;
    }

    const videoId = getYouTubeVideoId(newVideo.url);

    if (!videoId) {
      alert("Please provide a valid YouTube URL.");
      return;
    }

    setIsSaving(true);
    try {
      const videoData = {
        movieId,
        url: newVideo.url,
        description: newVideo.description,
        userId: auth.user.userId,
        site: 'YouTube',
        videoKey: videoId,
        videoType: newVideo.videoType || 'Trailer',
        official: newVideo.official || false
      };

      const response = await axios.post('/videos', videoData, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      setVideos((prevVideos) => [...prevVideos, {
        ...response.data,
        url: videoData.url,
        videoKey: videoData.videoKey,
        description: videoData.description,
        site: videoData.site,
        videoType: videoData.videoType,
        official: videoData.official,
        dateCreated: new Date().toISOString()
      }]);

      setNewVideo({ url: '', description: '', site: 'YouTube', videoKey: '', videoType: 'Trailer', official: false });

      alert("Video added successfully!");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await axios.delete(`/videos/${id}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });

        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
        alert("Video deleted successfully!");
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("Failed to delete video.");
      }
    }
  };

  const handleUpdateVideo = async () => {
    const validateFields = () => {
      if (!editingVideo.url) {
        alert("Please provide a valid URL.");
        return false;
      }
      if (!editingVideo.description) {
        alert("Please provide a description.");
        return false;
      }
      return true;
    };
  
    if (!validateFields()) {
      return;
    } else {
      const isConfirm = window.confirm("Are you sure you want to update the video?");
      if (isConfirm) {
        const updatedData = {
          id: editingVideo.id,
          url: editingVideo.url,
          description: editingVideo.description,
          movieId: editingVideo.movieId,
          site: editingVideo.site || 'YouTube',
          videoKey: getYouTubeVideoId(editingVideo.url) || editingVideo.videoKey,
          videoType: editingVideo.videoType || 'Trailer',
          official: editingVideo.official || false
        };
  
        try {
          const response = await axios({
            method: 'patch',
            url: `/videos/${editingVideo.id}`,
            data: updatedData,
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${auth.accessToken}`,
            },
          });
  
          alert("Video updated successfully!");
  
          setVideos((prevVideos) =>
            prevVideos.map((video) =>
              video.id === editingVideo.id ? { ...video, ...updatedData } : video
            )
          );
  
          setEditingVideo(null);
        } catch (error) {
          alert(`Error updating video: ${error.message}`);
        }
      }
    }
  };

  return (
    <div className="video-box">
      {importMessage && (
        <div className="import-message">
          {importMessage}
        </div>
      )}

      <div className="Video-View-Box">
        <h2>Videos for Movie</h2>

        <div className="card-display-videos">
          {videos.length === 0 ? (
            <p>No videos found for this movie.</p>
          ) : (
            videos.map((video) => {
              const videoId = getYouTubeVideoId(video.url) || video.videoKey;
              return (
                <div key={video.id} className="card-video">
                  {videoId ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p>Invalid video URL</p>
                  )}
                  <div className="container-video">
                    <h4>{video.description}</h4>
                    <p>Added on: {video.dateCreated ? new Date(video.dateCreated).toLocaleDateString() : 'Unknown'}</p>
                    <p>Site: {video.site || 'YouTube'}</p>
                    <p>Type: {video.videoType || 'Trailer'}</p>
                    <p>Official: {video.official ? 'Yes' : 'No'}</p>
                    <div className="buttons-group">
                      <button className="edit-button" onClick={() => setEditingVideo(video)}>
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteVideo(video.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="Search-Box">
        <div className="search-box-btn">
          <button
            className="import-button"
            type="button"
            onClick={importVideosFromTMDB}
          >
            Import from TMDB
          </button>
        </div>
      </div>

      <VideosForm
        videoData={editingVideo ? editingVideo : newVideo}
        onSubmit={editingVideo ? handleUpdateVideo : handleAddVideo}
        onChange={handleInputChange}
        isSaving={isSaving}
        editingVideo={editingVideo}
      />
    </div>
  );
}

export default Videos;