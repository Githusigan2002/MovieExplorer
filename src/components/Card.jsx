import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import movieImg from "../assets/movie1.webp";
import { getMatchPercentage, toggleMyList, isInMyList } from '../utils/utils';

export const Card = ({ movie, isTop10 = false, rankNumber = 1, onPlayTrailer }) => {
  const navigate = useNavigate();
  const { id, title, original_title, overview, vote_average, poster_path, backdrop_path, release_date } = movie;
  const movieTitle = title || original_title || "Untitled";

  const [inList, setInList] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setInList(isInMyList(id));

    const handleListUpdate = () => {
      setInList(isInMyList(id));
    };
    window.addEventListener('myListUpdated', handleListUpdate);
    return () => window.removeEventListener('myListUpdated', handleListUpdate);
  }, [id]);

  const handleToggleList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowInList = toggleMyList(movie);
    setInList(nowInList);
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlayTrailer) {
      onPlayTrailer(movie);
    } else {
      navigate(`/${id}`);
    }
  };

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : backdrop_path
    ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
    : movieImg;

  const year = release_date ? release_date.split('-')[0] : '2025';
  const matchScore = getMatchPercentage(vote_average);

  if (isTop10) {
    return (
      <div className="top10-card-item" onClick={() => navigate(`/${id}`)}>
        <span className="top10-number">{rankNumber}</span>
        <div className="top10-poster-wrap">
          <img src={imageUrl} alt={movieTitle} className="netflix-card-poster" loading="lazy" />
          <div className="card-hover-popover" onClick={(e) => e.stopPropagation()}>
            <div className="card-title-text">{movieTitle}</div>
            <div className="card-actions-row">
              <div className="card-actions-left">
                <button className="btn-netflix-icon active" onClick={handlePlayClick} title="Play Trailer">
                  <i className="bi bi-play-fill text-white fs-5"></i>
                </button>
                <button
                  className={`btn-netflix-icon ${inList ? 'active' : ''}`}
                  onClick={handleToggleList}
                  title={inList ? "Remove from My List" : "Add to My List"}
                >
                  <i className={`bi ${inList ? 'bi-check-lg' : 'bi-plus-lg'}`}></i>
                </button>
              </div>
              <Link to={`/${id}`} className="btn-netflix-icon" title="More Info">
                <i className="bi bi-chevron-down"></i>
              </Link>
            </div>
            <div className="card-tags">
              <span className="hero-match-score">{matchScore}</span>
              <span className="hero-badge">HD</span>
              <span>{year}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="netflix-card-item" onClick={() => navigate(`/${id}`)}>
      <div className="netflix-card-poster-wrap">
        <img src={imageUrl} alt={movieTitle} className="netflix-card-poster" loading="lazy" />
        
        <div className="card-hover-popover" onClick={(e) => e.stopPropagation()}>
          <div className="card-title-text">{movieTitle}</div>
          <div className="card-actions-row">
            <div className="card-actions-left">
              <button className="btn-netflix-icon active" onClick={handlePlayClick} title="Play Trailer">
                <i className="bi bi-play-fill text-white fs-5"></i>
              </button>
              <button
                className={`btn-netflix-icon ${inList ? 'active' : ''}`}
                onClick={handleToggleList}
                title={inList ? "Remove from My List" : "Add to My List"}
              >
                <i className={`bi ${inList ? 'bi-check-lg' : 'bi-plus-lg'}`}></i>
              </button>
              <button
                className={`btn-netflix-icon ${liked ? 'active' : ''}`}
                onClick={handleToggleLike}
                title="Like"
              >
                <i className={`bi ${liked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}></i>
              </button>
            </div>
            <Link to={`/${id}`} className="btn-netflix-icon" title="More Info">
              <i className="bi bi-chevron-down"></i>
            </Link>
          </div>

          <div className="card-tags mb-1">
            <span className="hero-match-score">{matchScore}</span>
            <span className="hero-badge">16+</span>
            <span className="hero-badge">HD</span>
            <span>{year}</span>
          </div>

          <div className="text-secondary small text-truncate">
            <i className="bi bi-star-fill text-warning me-1"></i>
            {vote_average ? vote_average.toFixed(1) : '8.5'} Rating
          </div>
        </div>
      </div>
    </div>
  );
};