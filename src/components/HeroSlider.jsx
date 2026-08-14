import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { getMatchPercentage, toggleMyList, isInMyList } from "../utils/utils";

export const HeroSlider = ({ movies = [], onPlayTrailer }) => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [myListStatus, setMyListStatus] = useState({});

  useEffect(() => {
    const updateListState = () => {
      const statusMap = {};
      movies.forEach((m) => {
        statusMap[m.id] = isInMyList(m.id);
      });
      setMyListStatus(statusMap);
    };

    updateListState();
    window.addEventListener("myListUpdated", updateListState);
    return () => window.removeEventListener("myListUpdated", updateListState);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const handleToggleMyList = (movie, e) => {
    e.stopPropagation();
    const nowInList = toggleMyList(movie);
    setMyListStatus((prev) => ({ ...prev, [movie.id]: nowInList }));
  };

  return (
    <div className="hero-billboard-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={movies.length > 1}
        className="hero-swiper"
      >
        {movies.slice(0, 6).map((movie) => {
          const { id, title, original_title, overview, backdrop_path, release_date, vote_average } = movie;
          const movieTitle = title || original_title;
          const backdrop = backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80";
          const year = release_date ? release_date.split("-")[0] : "2025";
          const matchScore = getMatchPercentage(vote_average);
          const inList = myListStatus[id] || false;

          return (
            <SwiperSlide key={id}>
              <div
                className="hero-billboard"
                style={{
                  backgroundImage: `url(${backdrop})`,
                }}
              >
                <div className="hero-vignette-bottom"></div>
                <div className="hero-vignette-left"></div>

                <div className="hero-content">
                  <div className="hero-badge-n">
                    <i className="bi bi-play-btn-fill fs-4 me-1"></i>
                    <span>M O V I E E X P L O R E R &nbsp; O R I G I N A L</span>
                  </div>

                  <h1 className="hero-title">{movieTitle}</h1>

                  <div className="hero-meta-row">
                    <span className="hero-match-score">{matchScore}</span>
                    <span className="hero-badge">16+</span>
                    <span className="hero-badge">4K Ultra HD</span>
                    <span className="hero-badge">5.1</span>
                    <span>{year}</span>
                  </div>

                  <p className="hero-overview">{overview}</p>

                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <button
                      className="btn-netflix-primary"
                      onClick={() => onPlayTrailer && onPlayTrailer(movie)}
                    >
                      <i className="bi bi-play-fill fs-4"></i> Play
                    </button>

                    <button
                      className="btn-netflix-secondary"
                      onClick={() => navigate(`/${id}`)}
                    >
                      <i className="bi bi-info-circle fs-5"></i> More Info
                    </button>

                    <button
                      className={`btn-netflix-icon ${inList ? "active" : ""}`}
                      onClick={(e) => handleToggleMyList(movie, e)}
                      title={inList ? "Remove from My List" : "Add to My List"}
                    >
                      <i className={`bi ${inList ? "bi-check-lg" : "bi-plus-lg"}`}></i>
                    </button>
                  </div>
                </div>

                <div className="hero-controls-right pe-3 pe-md-5">
                  <button
                    className="btn-netflix-icon"
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    <i className={`bi ${isMuted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`}></i>
                  </button>
                  <div className="hero-rating-box">16+</div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
