import { useQuery, useQueries } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Time, View } from "@carbon/icons-react";
import { useRef, useState } from "react";
import MyPagination from "./MyPagination";
import { fetchShowDetails, fetchTrendingShows } from "../api/fetchShow.js";
import { Link } from "react-router";

const TrendingShows = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch trending shows
  const {
    data: trendingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trendingShows"],
    queryFn: fetchTrendingShows,
  });

  // Fetch details for each trending show
  const showDetailsQueries = useQueries({
    queries:
      trendingData?.results?.map((show) => ({
        queryKey: ["showDetails", show.id],
        queryFn: () => fetchShowDetails(show.id),
        enabled: !!trendingData,
      })) || [],
  });

  if (isLoading)
    return <div className="text-center mt-10">Loading trending shows...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to fetch trending shows.
      </div>
    );

  const trendingShows = showDetailsQueries.map((q) => q.data).filter(Boolean);

  // Calculate total runtime of all episodes in "Xh Ym" format
  const getTotalRuntime = (show) => {
    if (!show.number_of_episodes || !show.episode_run_time?.length)
      return "N/A";

    const avgRuntime =
      show.episode_run_time.reduce((a, b) => a + b, 0) /
      show.episode_run_time.length;

    const totalMinutes = avgRuntime * show.number_of_episodes;
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return `${hours}h ${mins}m total`;
  };

  return (
    <div className="md:mt-[7rem]">
      {/* Header + Pagination */}
      <div className="flex justify-between items-center mb-10 gap-4 w-full">
        <h2 className="text-white text-3xl mt-8">Trending Shows</h2>
        <MyPagination
          swiperRef={swiperRef}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          genreMoviePairs={trendingShows}
          none={true}
        />
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={"auto"}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {showDetailsQueries.map((query, idx) => {
          if (query.isLoading)
            return (
              <SwiperSlide key={idx} className="!w-[350px]">
                <div className="text-center text-white">Loading...</div>
              </SwiperSlide>
            );

          const show = query.data;

          return (
            <SwiperSlide className="!w-[300px] md:!w-[350px]" key={show.id}>
              <Link
                to={`/shows/${show.id}`}
                className="hover:scale-100 scale-[95%] transform transition duration-300 border border-black-15 rounded-2xl bg-black-10 px-5 py-8 flex flex-col gap-4"
              >
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/original${show.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={show.name}
                  className="w-full h-[24rem] rounded-[12px] object-cover"
                />
                <div className="px-0.5 py-0.5 text-white flex flex-col gap-2">
                  <h3 className="text-white text-medium-18 font-bold drop-shadow-lg truncate">
                    {show.name}
                  </h3>
                  <div className="flex justify-between">
                    <p className="flex gap-2 border border-black-15 bg-black-8 p-1.5 text-medium-18 tracking-wider rounded-2xl text-grey60">
                      <Time size={"22px"} />
                      {getTotalRuntime(show)}
                    </p>
                    {show.number_of_seasons && (
                      <p className="flex gap-2 border border-black-15 bg-black-8 p-1.5 text-medium-18 tracking-wider rounded-2xl text-grey60">
                        <View size={"22px"} />
                        {show.number_of_seasons} Season
                        {show.number_of_seasons > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TrendingShows;
