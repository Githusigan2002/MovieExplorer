import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import movieImg from "../assets/movie1.webp";
import { converMin, getMatchPercentage, toggleMyList, isInMyList } from "../utils/utils";
import { TrailerModal } from "../components/TrailerModal";
import { MovieRow } from "../components/MovieRow";

export const MovieDetails = () => {
  const params = useParams();
  const key = "8f39312a669841f8a583c34c693dd15c";
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    window.scrollTo(0, 0);

    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`);
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        const data = await res.json();
        setMovie(data);
        setInList(isInMyList(data.id));

        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${key}`);
        if (creditsRes.ok) {
          const creditsData = await creditsRes.json();
          setCredits(creditsData.cast ? creditsData.cast.slice(0, 8) : []);
        }

        const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${key}`);
        if (similarRes.ok) {
          const similarData = await similarRes.json();
          setSimilarMovies(similarData.results || []);
        }

        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} - MovieExplorer`;
    }
  }, [movie]);

  if (error) {
    return (
      <div className="container text-danger mt-5 pt-5 text-center">
        <h4>Error loading details</h4>
        <p>{error}</p>
        <Link to="/" className="btn btn-netflix-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center text-light">
        <div className="spinner-border text-danger me-2" role="status"></div>
        <span>Loading Details...</span>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : movieImg;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movieImg;

  const matchScore = getMatchPercentage(movie.vote_average);
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";

  const handleToggleList = () => {
    const status = toggleMyList(movie);
    setInList(status);
  };

  return (
    <main className="netflix-details-page text-light pb-5">
      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          movieTitle={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}

      <div
        className="details-hero"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="details-overlay"></div>

        <div className="details-content-box">
          <div className="hero-badge-n">
            <i className="bi bi-play-btn-fill me-1 fs-5"></i> MOVIEEXPLORER EXCLUSIVE
          </div>
          <h1 className="display-3 fw-bold text-white mb-2">{movie.title}</h1>

          <div className="d-flex align-items-center gap-3 flex-wrap mb-3 fs-6">
            <span className="hero-match-score fw-bold fs-5">{matchScore}</span>
            <span>{year}</span>
            <span className="hero-badge">16+</span>
            <span className="hero-badge">{converMin(movie.runtime)}</span>
            <span className="hero-badge">HD</span>
            <span className="text-warning">
              <i className="bi bi-star-fill me-1"></i>
              {movie.vote_average ? movie.vote_average.toFixed(1) : '8.5'} ({movie.vote_count} votes)
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <button className="btn-netflix-primary fs-5" onClick={() => setShowTrailer(true)}>
              <i className="bi bi-play-fill fs-3"></i> Play Trailer
            </button>

            <button
              className={`btn-netflix-secondary ${inList ? "active" : ""}`}
              onClick={handleToggleList}
            >
              <i className={`bi ${inList ? "bi-check-lg text-success" : "bi-plus-lg"}`}></i>{" "}
              {inList ? "In My List" : "Add to My List"}
            </button>

            {movie.imdb_id && (
              <a
                className="btn btn-warning fw-bold px-3 py-2"
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                IMDb
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 my-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <h4 className="fw-bold mb-3">Overview</h4>
            <p className="fs-5 text-light leading-relaxed">{movie.overview}</p>

            {movie.genres && movie.genres.length > 0 && (
              <div className="d-flex align-items-center gap-2 flex-wrap my-4">
                <span className="text-secondary fw-bold me-2">Genres:</span>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="badge bg-secondary px-3 py-2 fs-6">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {credits && credits.length > 0 && (
              <div className="mt-4">
                <h5 className="fw-bold mb-3">Cast & Crew</h5>
                <div className="details-cast-grid">
                  {credits.map((person) => (
                    <div key={person.id} className="cast-card">
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          className="rounded mb-2"
                          style={{ width: "100%", height: "130px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded mb-2 bg-dark d-flex align-items-center justify-content-center text-secondary"
                          style={{ height: "130px" }}
                        >
                          <i className="bi bi-person-fill fs-1"></i>
                        </div>
                      )}
                      <div className="small fw-bold text-truncate text-white">{person.name}</div>
                      <div className="small text-secondary text-truncate">{person.character}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="bg-dark p-4 rounded border border-secondary">
              <img src={posterUrl} alt={movie.title} className="w-100 rounded mb-4 shadow" />
              <table className="table table-dark table-borderless m-0">
                <tbody>
                  <tr>
                    <td className="text-secondary">Release Date</td>
                    <td className="fw-bold">{movie.release_date}</td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Runtime</td>
                    <td className="fw-bold">{converMin(movie.runtime)}</td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Budget</td>
                    <td className="fw-bold">
                      {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Revenue</td>
                    <td className="fw-bold">
                      {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-secondary">Status</td>
                    <td className="fw-bold">{movie.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {similarMovies && similarMovies.length > 0 && (
        <div className="mt-5">
          <MovieRow
            title="More Like This"
            movies={similarMovies}
            onPlayTrailer={(m) => setShowTrailer(m)}
          />
        </div>
      )}
    </main>
  );
};
