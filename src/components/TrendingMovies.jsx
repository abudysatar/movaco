import { useQuery, useQueries } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Time, View } from "@carbon/icons-react";
import { useRef, useState } from "react";
import MyPagination from "./MyPagination.jsx";
import { Link } from "react-router";
import { fetchMovieDetails, fetchTrendingMovies } from "../api/fetchMovie.js";
import popularity from "../utils/popularity.js";

// Format runtime in "Xh Ym" format
const formatRuntime = (minutes) => {
  if (!minutes || isNaN(minutes)) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const TrendingMovies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Fetch trending movies
  const {
    data: trendingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
  });

  const movieDetailsQueries = useQueries({
    queries: (trendingData?.results ?? []).map((movie) => ({
      queryKey: ["movieDetails", movie.id],
      queryFn: () => fetchMovieDetails(movie.id),
      enabled: !!trendingData,
    })),
  });

  if (isLoading || movieDetailsQueries.some((q) => q.isLoading))
    return <div className="text-center mt-10">Loading...</div>;

  if (isError || movieDetailsQueries.some((q) => q.isError))
    return (
      <div className="text-center mt-10 text-red-500">Error loading movies</div>
    );

  const movieDetails = movieDetailsQueries.map((q) => q.data);

  const genreMoviePairs = movieDetails.map((movie) => ({
    genre: { name: movie.title, id: movie.id },
    movies: [movie],
  }));

  return (
    <div className="md:p-7 mt mt-[4rem] relative">
      {/* Header + Pagination */}
      <div className="flex justify-between items-center mb-10 gap-4 w-full">
        <h2 className="text-white text-3xl">Trending Movies</h2>
        <MyPagination
          swiperRef={swiperRef}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          genreMoviePairs={genreMoviePairs}
          none={true}
        />
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={"auto"}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {movieDetails.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="right-3 md:right-0 !w-[270px] md:!w-[350px]"
          >
            <Link
              to={`/movies/${movie.id}`}
              className="hover:scale-100 scale-[93%] md:scale-[95%] transform transition duration-300 border border-black-15 rounded-2xl bg-black-10 px-5 py-5 flex flex-col gap-4"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "/placeholder.jpg"
                }
                alt={movie.title}
                className="w-full h-[22rem] rounded-2xl object-cover"
              />
              <div className="px-0.5 py-0.5 text-white flex flex-col gap-2">
                <h3 className="text-white text-medium-18 tracking-wider font-bold drop-shadow-lg truncate">
                  {movie.title}
                </h3>
                <div className="flex justify-between">
                  <p className="flex gap-2 border border-black-15 bg-black-8 p-1.5 text-medium-18 tracking-wider rounded-2xl text-grey60">
                    <Time size={"22px"} />
                    {movie.runtime
                      ? formatRuntime(movie.runtime)
                      : "Runtime N/A"}
                  </p>
                  {movie.popularity && (
                    <p className="flex gap-2 border border-black-15 bg-black-8 p-1.5 text-medium-18 tracking-wider rounded-2xl text-grey60">
                      <View size={"22px"} />
                      {popularity(movie)}K
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingMovies;
