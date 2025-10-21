import { useQueries, useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "./MyPagination";
import { fetchShowByGenre } from "../api/fetchShow";
import { fetchGenres } from "../api/fetchMedia";

const ShowsGenres = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch TV genres
  const genresQuery = useQuery({
    queryKey: ["genres", "tv"],
    queryFn: () => fetchGenres("tv"),
  });

  // Fetch shows for each genre
  const showQueries = useQueries({
    queries: (genresQuery.data ?? []).map((genre) => ({
      queryKey: ["show", genre.id],
      queryFn: () => fetchShowByGenre(genre.id),
      enabled: !!genre.id,
    })),
  });

  if (genresQuery.isLoading) return <p>Loading genres...</p>;
  if (genresQuery.isError) return <p>Error loading genres.</p>;

  const genres = genresQuery.data ?? [];
  const isShowsLoading = showQueries.some((q) => q.isLoading);
  const isShowsError = showQueries.some((q) => q.isError);

  if (isShowsLoading) return <p>Loading shows...</p>;
  if (isShowsError) return <p>Error loading some shows.</p>;

  const genreShowPairs = genres.map((genre, i) => ({
    genre,
    shows: showQueries[i]?.data?.results?.slice(0, 4) ?? [],
  }));

  return (
    <section className="ourGenres relative ">
      <p className="mt-[5rem] md:mt-[11.5rem] tracking-widest text-white bg-main-red px-5 py-3 rounded-[6px] text-center text-medium-20 max-w-[7.25rem]">
        Shows
      </p>

      <div className="flex justify-between items-center mb-10 gap-4 w-full">
        <h2 className="text-white text-3xl mt-8">Our Genres</h2>
        <div className="mt-5">
          <MyPagination
            swiperRef={swiperRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            genreMoviePairs={genreShowPairs}
            none={true}
          />
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={"auto"}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="mySwiper"
      >
        {genreShowPairs.map(({ genre, shows }) => (
          <SwiperSlide key={genre.id} className="!w-[270px] md:!w-[350px]">
            <div
              className="hover:scale-100 scale-[95%] transform transition duration-300 border border-black-15 rounded-2xl bg-black-10 px-5 py-8 flex flex-col gap-4 cursor-pointer"
              onClick={() =>
                navigate(`/genrespage?type=tv&genreId=${genre.id}`)
              }
            >
              <div className="relative w-full rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 gap-4 auto-rows-auto">
                  {shows.map((show, idx) => (
                    <div key={idx} className="w-auto aspect-[2/2.5]">
                      <img
                        src={
                          show?.poster_path
                            ? `https://image.tmdb.org/t/p/original${show.poster_path}`
                            : show?.backdrop_path
                            ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                            : "/placeholder.jpg"
                        }
                        alt={show.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
              </div>

              <div className="flex justify-between items-center text-center">
                <h3 className="text-white text-medium-18 tracking-wider font-bold drop-shadow-lg">
                  {genre.name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShowsGenres;
