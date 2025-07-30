import { Route, Routes } from "react-router-dom"
import { MovieList, MovieDetails } from "/src/pages";
import { Search } from "../pages/search";
// import { Login } from "../pages/Login";  


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<MovieList title="MovieExplorer - Home" apiPath="movie/now_playing" />} />
      <Route path='/trending' element={<MovieList title="Trending Movies" apiPath="movie/popular" />} />
      <Route path="/coming-soon" element={<MovieList title="Coming Soon" apiPath="movie/upcoming" />}/>
      <Route path="/top-rated" element={<MovieList title="Coming Soon" apiPath="movie/top_rated" />}/>
      <Route path="/:id" element={<MovieDetails/>}/>  
      <Route path="/search" element={<Search/>}/>  


      {/* <Route path="/login" element={<Login />} /> */}

    </Routes>
  )
}



// export default AllRoutes
