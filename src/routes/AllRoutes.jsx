import { Route, Routes } from "react-router-dom";
import { MovieList, MovieDetails, Search, MyList, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList title="Home - MovieExplorer" apiPath="movie/now_playing" />} />
      <Route path="/trending" element={<MovieList title="Trending Now" apiPath="movie/popular" />} />
      <Route path="/top-rated" element={<MovieList title="Top Rated Classics" apiPath="movie/top_rated" />} />
      <Route path="/coming-soon" element={<MovieList title="Coming Soon & New Releases" apiPath="movie/upcoming" />} />
      <Route path="/my-list" element={<MyList />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:id" element={<MovieDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
