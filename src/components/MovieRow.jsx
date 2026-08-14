import React, { useRef } from 'react';
import { Card } from './Card';

export const MovieRow = ({ title, movies = [], isTop10 = false, onPlayTrailer }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row-container">
      <h3 className="row-title">
        {isTop10 && <span className="text-netflix-red font-weight-bold me-1">Top 10</span>}
        {title}
      </h3>

      <div className="row-slider-wrapper">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="row-cards-flex no-scrollbar" ref={rowRef}>
          {movies.map((movie, index) => (
            <Card
              key={movie.id}
              movie={movie}
              isTop10={isTop10}
              rankNumber={index + 1}
              onPlayTrailer={onPlayTrailer}
            />
          ))}
        </div>

        <button
          className="slider-arrow slider-arrow-right"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
