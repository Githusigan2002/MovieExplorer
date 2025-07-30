import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const HeroSlider = ({ movies }) => {
  return (
    <div className="mb-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="rounded shadow-sm"
      >
        {movies.slice(0, 6).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  color: "white",
                  padding: "20px",
                }}
              >
                <h4>{movie.title}</h4>
                <p className="d-none d-md-block">{movie.overview?.slice(0, 120)}...</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
