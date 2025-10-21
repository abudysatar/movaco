import { useQuery, useQueries } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Time, WatsonHealthStackedScrolling_1 } from "@carbon/icons-react";
import { useRef, useState } from "react";
import MyPagination from "./MyPagination";
import { fetchNewTvRelase, fetchTvDetails } from "../api/fetchShow";
import { Link } from "react-router-dom";

const NewTvRelase = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: tvData,
    isLoading: isTvLoading,
    isError: isTvError,
  } = useQuery({
    queryKey: ["newTvRelase"],
    queryFn: fetchNewTvRelase,
  });

  const tvIds = tvData?.results?.slice(0, 10)?.map((show) => show.id) || [];

  const detailsQueries = useQueries({
    queries: tvIds.map((id) => ({
      queryKey: ["tvDetails", id],
      queryFn: () => fetchTvDetails(id),
      enabled: !!tvIds.length,
    })),
  });

  const isDetailsLoading = detailsQueries.some((q) => q.isLoading);

  if (isTvLoading || isDetailsLoading)
    return <div className="text-center mt-10">Loading...</div>;

  if (isTvError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to fetch TV shows.
      </div>
    );

  const showsWithDetails = tvData.results?.slice(0, 10)?.map((show, i) => ({
    ...show,
    details: detailsQueries[i]?.data,
  }));

  return (
    <div className=" md:mt-[7rem]">
      <div className="flex justify-between items-center mb-10 gap-4 w-full">
        {" "}
        <h2 className="text-white text-3xl mt-8 ">New TV Releases</h2>
        <MyPagination
          swiperRef={swiperRef}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          genreMoviePairs={showsWithDetails}
          none={true}
        />
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={"auto"}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {showsWithDetails?.map((show) => (
          <SwiperSlide className=" !max-w-[340px] md:!w-[350px]" key={show.id}>
            <Link
              to={`/shows/${show.id}`}
              className="hover:scale-100 scale-[95%] transform transition duration-300 border border-black-15 rounded-2xl bg-black-10 px-5 py-5 flex flex-col gap-4"
            >
              <img
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/original${show.poster_path}`
                    : "/placeholder.jpg"
                }
                alt={show.name}
                className="w-full h-[22rem] rounded-2xl object-cover"
              />
              <div className="flex justify-between max-w-[600px]">
                <p className="flex gap-2 text-medium-16 tracking-wide border border-black-15 bg-black-8 p-2 rounded-2xl text-grey60">
                  <Time size={"22px"} />
                  Runtime:{" "}
                  {show.details?.episode_run_time?.[0]
                    ? `${show.details.episode_run_time[0]} min`
                    : "N/A"}
                </p>
                <p className="flex gap-2 border border-black-15 bg-black-8 p-1.5 text-medium-18 tracking-wider rounded-2xl text-grey60">
                  <WatsonHealthStackedScrolling_1 size={"22px"} />
                  {show.details?.number_of_seasons || "N/A"} Seasons
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewTvRelase;
