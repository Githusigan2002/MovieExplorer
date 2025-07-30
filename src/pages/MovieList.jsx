import { useEffect } from "react";
import { Card } from "../components";
import { useFetch } from "../hooks/useFetch";
import { HeroSlider } from "../components/HeroSlider";

export const MovieList = ({ title, apiPath }) => {
  const { data: movies } = useFetch(apiPath);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <main className="container">
        <h5 className="text-danger py-2 border-bottom">{title}</h5>

        {title === "MovieExplorer - Home" && movies.length > 0 && (
          <HeroSlider movies={movies} />
        )}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};
