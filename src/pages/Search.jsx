import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    document.title = `Search results for "${queryTerm}"`;

    const fetchMovies = async () => {
      try {
        const apiKey = "8f39312a669841f8a583c34c693dd15c"; // Replace with your TMDb API key
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(queryTerm)}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setMovies([]); // Clear movies on error
      }
    };

    if (queryTerm) {
      fetchMovies();
    }
  }, [queryTerm]);

  return (
    <main className="container">
      <h5>Search Results for: "{queryTerm}"</h5>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </main>
  );
};
