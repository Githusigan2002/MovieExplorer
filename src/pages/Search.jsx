import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { TrailerModal } from "../components/TrailerModal";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);

  useEffect(() => {
    document.title = `Search: "${queryTerm}" - MovieExplorer`;
    window.scrollTo(0, 0);

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const apiKey = "8f39312a669841f8a583c34c693dd15c";
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(queryTerm)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (queryTerm) {
      fetchMovies();
    }
  }, [queryTerm]);

  return (
    <main className="container-fluid px-3 px-md-5 pt-5 mt-4 min-vh-100 text-light">
      {selectedMovieForTrailer && (
        <TrailerModal
          movieId={selectedMovieForTrailer.id}
          movieTitle={selectedMovieForTrailer.title || selectedMovieForTrailer.original_title}
          onClose={() => setSelectedMovieForTrailer(null)}
        />
      )}

      <div className="border-bottom border-secondary pb-3 mb-4">
        <h3 className="fw-bold m-0">
          Search Results for: <span className="text-netflix-red">"{queryTerm}"</span>
        </h3>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger me-2" role="status"></div>
          <span>Searching MovieExplorer catalog...</span>
        </div>
      ) : movies.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {movies.map((movie) => (
            <div key={movie.id} className="col">
              <Card
                movie={movie}
                onPlayTrailer={(m) => setSelectedMovieForTrailer(m)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-secondary py-5 my-5">
          <i className="bi bi-search display-1 text-secondary d-block mb-3"></i>
          <h4>Your search for "{queryTerm}" did not have any matches.</h4>
          <p className="max-w-400 mx-auto text-secondary">
            Suggestions: Try different keywords, check for typos, or search by a popular movie title.
          </p>
        </div>
      )}
    </main>
  );
};
