import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import MyPagination from "../components/MyPagination";
import { Link } from "react-router-dom";

import { fetchTrendingMovies, fetchUpcomingMovie } from "../api/fetchMovie";

const NewRelase = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: upComingData,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useQuery({
    queryKey: ["newRelase"],
    queryFn: () => fetchUpcomingMovie(5),
  });

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
  });

  if (isUpcomingLoading || isTrendingLoading)
    return <div className="text-center mt-10">Loading...</div>;
  if (isUpcomingError || isTrendingError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to fetch movies.
      </div>
    );

  const filteredUpcoming = upComingData?.results?.filter(
    (upMovie) =>
      !trendingData?.results?.some((trendMovie) => trendMovie.id === upMovie.id)
  );

  return (
    <div className="md:p-7 mt mt-[4rem] ">
      <div className="flex justify-between items-center mb-10 gap-4 w-full">
        <h2 className="text-white text-3xl">New Movies Releases</h2>

        <div className=" flex justify-center">
          <MyPagination
            swiperRef={swiperRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            genreMoviePairs={filteredUpcoming}
            none={true}
          />
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={"auto"}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {filteredUpcoming?.map((movie) => (
          <SwiperSlide
            className="right-3 md:right-0 !w-[270px] md:!w-[350px]"
            key={movie.id}
          >
            <Link
              to={`/movies/${movie.id}`}
              className="hover:scale-100 scale-[95%] transform transition duration-300 border border-black-15 rounded-2xl bg-black-10 px-5 py-5 flex flex-col gap-4"
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
              <div className="px-0.5 py-0.5 flex flex-col gap-2">
                <p className="text-grey60 border border-black-15 text-medium-18 tracking-wider bg-black-8 p-1.5 rounded-2xl text-center">
                  Release Date: {movie.release_date || "N/A"}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewRelase;
