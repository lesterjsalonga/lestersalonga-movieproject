import React from 'react';

function VideosForm({ videoData, onSubmit, isSaving, onChange, editingVideo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="Video-Search-Box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="url"
          placeholder="Video URL"
          value={videoData.url}
          onChange={onChange}
          className="video-search-input"
        />
        <textarea
          name="description"
          placeholder="Video Description"
          value={videoData.description}
          onChange={onChange}
          className="video-search-input"
        ></textarea>
        <div className="video-search-buttons">
          <button
            type="submit"
            className="search-btn"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : editingVideo ? 'Update Video' : 'Add Video'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideosForm;
