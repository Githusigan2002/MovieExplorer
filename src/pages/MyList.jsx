import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { TrailerModal } from '../components/TrailerModal';
import { getMyList } from '../utils/utils';

export const MyList = ({ onPlayTrailer }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);

  const refreshList = () => {
    setMovies(getMyList());
  };

  useEffect(() => {
    document.title = "My List - MovieExplorer";
    refreshList();
    window.addEventListener('myListUpdated', refreshList);
    return () => window.removeEventListener('myListUpdated', refreshList);
  }, []);

  const handlePlayTrailer = (movie) => {
    if (onPlayTrailer) {
      onPlayTrailer(movie);
    } else {
      setSelectedMovieForTrailer(movie);
    }
  };

  return (
    <main className="container-fluid px-3 px-md-5 pt-5 mt-4 min-vh-100">
      <div className="d-flex align-items-center justify-content-between border-bottom border-secondary pb-3 mb-4">
        <h2 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
          <i className="bi bi-bookmark-heart text-danger"></i> My List
        </h2>
        <span className="badge bg-secondary fs-6">{movies.length} Saved Titles</span>
      </div>

      {movies.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {movies.map((movie) => (
            <div key={movie.id} className="col">
              <Card movie={movie} onPlayTrailer={handlePlayTrailer} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-secondary py-5 my-5">
          <i className="bi bi-plus-circle display-1 text-secondary d-block mb-3"></i>
          <h4>Your Watchlist is empty</h4>
          <p className="max-w-400 mx-auto">
            Explore trending movies and click the <strong>+ My List</strong> button to save titles here.
          </p>
        </div>
      )}

      {selectedMovieForTrailer && (
        <TrailerModal
          movieId={selectedMovieForTrailer.id}
          movieTitle={selectedMovieForTrailer.title || selectedMovieForTrailer.original_title}
          onClose={() => setSelectedMovieForTrailer(null)}
        />
      )}
    </main>
  );
};
