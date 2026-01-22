import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import movieImg from "../assets/movie1.webp";
import { converMin } from "../utils/utils";

export const MovieDetails = () => {
  const params = useParams();
  const key = "8f39312a669841f8a583c34c693dd15c";
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  console.log("Movie ID:", params.id);
  console.log("API Key:", key);

  useEffect(() => {
    if (!params.id) return;

    const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;

    async function fetchMovie() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        const jsonData = await res.json();
        setMovie(jsonData);
        setError(null);
        console.log(jsonData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    }

    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    if (movie?.title) {
      document.title = movie.title;
    }
  }, [movie]);

  const imageUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : movieImg;

  if (error) {
    return <div className="container text-danger mt-4">{error}</div>;
  }

  if (!movie) {
    return <div className="container mt-4">Loading movie details...</div>;
  }

  return (
    <main className="container">
      <h5 className="text-primary py-2 border-bottom mb-3">{movie.title}</h5>
      <div className="row">
        <div className="col-md-4">
          <img src={imageUrl} alt={movie.title} className="img-fluid img-thumbnail" />
        </div>

        <div className="col-md-8">
          <h3>{movie.title}</h3>
          <p className="mt-3">{movie.overview}</p>

          {movie.genres && (
            <p className="d-flex gap-3 flex-wrap">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="badge bg-primary">{genre.name}</span>
              ))}
            </p>
          )}

          <p className="mt-2">
            <i className="bi bi-star-fill text-warning"> </i>{movie.vote_average} |
            <i className="bi bi-people-fill text-success"> </i>{movie.vote_count} Reviews
          </p>

          <table className="table table-bordered w-50 mt-2">
            <tbody>
              <tr>
                <th>Runtime</th>
                <td>{converMin(movie.runtime)}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>${movie.budget.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Release Date </th>
                <td>{movie.release_date}</td>
              </tr>
            </tbody>
          </table>

          {movie.imdb_id && (
            <a className="btn btn-warning" href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">
              IMDB
            </a>
          )}
        </div>
      </div>
    </main>
  );
};
