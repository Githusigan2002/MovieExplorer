import React, { useEffect, useState } from "react";
import { Card, HeroSlider, MovieRow, TrailerModal } from "../components";
import { useFetch } from "../hooks/useFetch";

export const MovieList = ({ title, apiPath }) => {
  const { data: movies } = useFetch(apiPath);
  const { data: trendingMovies } = useFetch("movie/popular");
  const { data: topRatedMovies } = useFetch("movie/top_rated");
  const { data: upcomingMovies } = useFetch("movie/upcoming");

  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);

  useEffect(() => {
    document.title = title || "MovieExplorer";
    window.scrollTo(0, 0);
  }, [title]);

  const handlePlayTrailer = (movie) => {
    setSelectedMovieForTrailer(movie);
  };

  const isHome = apiPath === "movie/now_playing";

  return (
    <div className="netflix-page-wrapper">
      {selectedMovieForTrailer && (
        <TrailerModal
          movieId={selectedMovieForTrailer.id}
          movieTitle={selectedMovieForTrailer.title || selectedMovieForTrailer.original_title}
          onClose={() => setSelectedMovieForTrailer(null)}
        />
      )}

      {isHome ? (
        <main>
          {movies && movies.length > 0 && (
            <HeroSlider movies={movies} onPlayTrailer={handlePlayTrailer} />
          )}

          <div className="movie-section">
            {movies && movies.length > 0 && (
              <MovieRow
                title="Movies Today"
                movies={movies.slice(0, 10)}
                isTop10={true}
                onPlayTrailer={handlePlayTrailer}
              />
            )}

            {trendingMovies && trendingMovies.length > 0 && (
              <MovieRow
                title="Trending Now"
                movies={trendingMovies}
                onPlayTrailer={handlePlayTrailer}
              />
            )}

            {topRatedMovies && topRatedMovies.length > 0 && (
              <MovieRow
                title="Top Rated Classics"
                movies={topRatedMovies}
                onPlayTrailer={handlePlayTrailer}
              />
            )}

            {upcomingMovies && upcomingMovies.length > 0 && (
              <MovieRow
                title="Upcoming & New Releases"
                movies={upcomingMovies}
                onPlayTrailer={handlePlayTrailer}
              />
            )}
          </div>
        </main>
      ) : (
        <main className="container-fluid px-3 px-md-5 pt-5 mt-4 min-vh-100">
          <div className="d-flex align-items-center justify-content-between border-bottom border-secondary pb-3 mb-4">
            <h2 className="text-light fw-bold m-0 d-flex align-items-center gap-2">
              <span className="text-netflix-red font-weight-bold">M</span> {title}
            </h2>
            <span className="badge bg-danger fs-6">{movies ? movies.length : 0} Titles</span>
          </div>

          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {movies && movies.map((movie) => (
              <div key={movie.id} className="col">
                <Card movie={movie} onPlayTrailer={handlePlayTrailer} />
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};
