import movieImg from "../assets/movie1.webp";
import { Link } from 'react-router-dom';


export const Card = ({ movie }) => {

  const { backdrop_path, id, original_title, overview, vote_average, vote_count, release_date, poster_path } = movie;

  const images = poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : movieImg;

  return (
    <div className="col">
      <div className="card shadow-sm" title={original_title}>
        <img src={images} alt="" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-primary text-overfolow-1">{original_title}</h5>
          <p className="card-text text-overfolow-2">{overview}</p>

          <div className="d-flex justify-content-between align-item-center">
            <Link to={`/${id}`} className="btn btn-sm btn-outline-primary stretched-link">
              Learn More...
            </Link>
            <small>
              <i className="bi bi-star-fill text-warning"></i>
              {vote_average} | {vote_count}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
} 