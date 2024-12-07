import React, { useState } from 'react'
import './VideoCards.css'

function VideoCards({ video }) {
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getEmbedUrl = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/))?(?:watch\?v=|e(?:mbed)\/)([\w-]{11})|(?:youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        const videoId = match ? (match[1] || match[2]) : null;
        
        return videoId 
            ? `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&autoplay=1` 
            : null;
    };

    const embedUrl = getEmbedUrl(video.url);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (failedToLoad || !embedUrl) {
        return (
            <div className="card-video-data">
                <p>Unable to load video</p>
                <span className="video-name-card">{video.name}</span>
            </div>
        );
    }

    return (
        <>
            <div className="card-video-data" onClick={openModal}>
                <iframe
                    src={embedUrl.replace('autoplay=1', 'autoplay=0')}
                    title={`video-${video.name}`}
                    allowFullScreen
                    frameBorder="0"
                    width="100%"
                    height="315"
                    onError={() => setFailedToLoad(true)}
                />
                <span className="video-name-card">{video.name}</span>
            </div>

            {isModalOpen && (
                <div className="video-modal" onClick={closeModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal-btn" onClick={closeModal}>&times;</span>
                        <iframe
                            src={embedUrl}
                            title={`modal-video-${video.name}`}
                            allowFullScreen
                            frameBorder="0"
                            width="100%"
                            height="100%"
                        />
                        <div className="video-modal-title">{video.name}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default VideoCards;