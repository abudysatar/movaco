import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { PlayFilledAlt, ChevronLeft, ChevronRight } from "@carbon/icons-react";
import { Link } from "react-router";
import { fetchNowPlaying } from "../api/fetchMovie";

const SkeletonSlide = () => (
  <div className="relative md:h-[53rem] h-[29.25rem] animate-pulse bg-gray-800 rounded-2xl flex flex-col justify-end p-4">
    <div className="h-8 bg-gray-700 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-2/3 mb-1"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    <div className="bg-gray-700 w-32 h-10 rounded mt-4"></div>
  </div>
);

const MovieSlide = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className="relative md:h-[53rem] h-[29.25rem]">
      <img
        src={
          movie.backdrop_path
            ? `${imageBaseUrl}${movie.backdrop_path}`
            : "/fallback-bg.jpg"
        }
        alt={movie.title || "No title available"}
        className="w-full h-full object-cover absolute left-0 top-0 -z-20 rounded-2xl"
      />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-full bg-gradient-to-t from-[#0f0f0f] to-transparent rounded-2xl"></div>

      <div className="p-3 text-white flex flex-col gap-2 justify-end items-center text-center pb-[2rem] md:pb-[10rem] h-full">
        <h3 className="text-huge-mob-24 md:text-huge2-38 font-semibold text-center break-words">
          {movie.title || "No Title"}
        </h3>
        <p className="hidden md:block text-grey60 max-w-[70rem]">
          {movie.overview || "No description available."}
        </p>
        <Link
          to={`/movies/${movie.id}`}
          className="bg-main-red px-16 md:px-2.5 py-3 rounded-[6px] flex justify-center items-center gap-2 text-medium-18 mt-2 hover:bg-red-700 cursor-pointer"
        >
          <PlayFilledAlt size="1.5rem" /> Go For Details
        </Link>
      </div>
    </div>
  );
};

const NowPlaying = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: fetchNowPlaying,
  });

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  const slides = isLoading ? Array(5).fill(0) : data.results;

  return (
    <div className="relative mt-36 ">
      {/* Navigation buttons */}
      <button
        aria-label="Previous slide"
        className="custom-prev hidden md:flex absolute bottom-1 left-6 z-20 -translate-y-1/2 bg-black/40 hover:bg-main-red text-white rounded-sm p-3 backdrop-blur-sm transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        aria-label="Next slide"
        className="custom-next hidden md:flex absolute bottom-1 right-6 z-20 -translate-y-1/2 bg-black/40 hover:bg-main-red text-white rounded-sm p-3 backdrop-blur-sm transition-all duration-300 cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: window.innerWidth < 768 ? 3000 : 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={32}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((movie, index) => (
          <SwiperSlide key={isLoading ? index : movie.id}>
            {isLoading ? <SkeletonSlide /> : <MovieSlide movie={movie} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NowPlaying;
