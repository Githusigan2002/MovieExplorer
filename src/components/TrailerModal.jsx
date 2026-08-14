import React, { useEffect, useState } from 'react';

export const TrailerModal = ({ movieId, movieTitle, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "8f39312a669841f8a583c34c693dd15c";

  useEffect(() => {
    if (!movieId) return;

    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const officialTrailer = data.results.find(
            (v) => (v.type === "Trailer" || v.type === "Teaser") && v.site === "YouTube"
          ) || data.results[0];

          if (officialTrailer && officialTrailer.key) {
            setTrailerKey(officialTrailer.key);
          }
        }
      } catch (err) {
        console.error("Failed to load trailer:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="trailer-modal-backdrop" onClick={onClose}>
      <div
        className="trailer-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="trailer-modal-close"
          onClick={onClose}
          title="Close Trailer"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {loading ? (
          <div className="p-5 text-center text-light">
            <div className="spinner-border text-danger me-2" role="status"></div>
            <span>Loading Trailer...</span>
          </div>
        ) : trailerKey ? (
          <div>
            <div className="trailer-iframe-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                title={movieTitle || "Movie Trailer"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-3 bg-netflix-dark text-light d-flex justify-content-between align-items-center">
              <h5 className="m-0 font-weight-bold">{movieTitle}</h5>
              <span className="badge bg-netflix-red">Official Trailer</span>
            </div>
          </div>
        ) : (
          <div className="p-5 text-center text-light">
            <i className="bi bi-exclamation-circle text-warning fs-1 d-block mb-3"></i>
            <h5>Trailer not available for this movie</h5>
            <p className="text-secondary mb-0">Search on YouTube for {movieTitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};
