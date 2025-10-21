import { useQuery, useQueries } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import { ArrowRight } from "@carbon/icons-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPagination from "./MyPagination";
import { fetchMoviesByGenre } from "../api/fetchMovie";
import { fetchGenres } from "../api/fetchMedia";
import clsx from "clsx";

const SkeletonCard = () => (
  <div className="animate-pulse scale-[97%] transform border border-black-15 rounded-[10px] bg-black-10 px-5 py-8 flex flex-col gap-4">
    <div className="relative w-full rounded-[10px] overflow-hidden h-[200px] bg-gray-700" />
    <div className="flex justify-between items-center text-center">
      <div className="h-6 bg-gray-600 w-20 rounded" />
      <div className="h-6 w-6 bg-gray-600 rounded-full" />
    </div>
  </div>
);

const OurGenres = ({
  home,
  sectionTitle = "Our Genres",
  categoryLabel = "Movies",
  type = "movie",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  // Fetch genres
  const genresQuery = useQuery({
    queryKey: ["genres", type],
    queryFn: () => fetchGenres(type),
  });

  // Fetch items for each genre
  const moviesQueries = useQueries({
    queries: (genresQuery.data ?? []).map((genre) => ({
      queryKey: [type, genre.id],
      queryFn: () =>
        type === "movie"
          ? fetchMoviesByGenre(genre.id)
          : fetchMoviesByGenre(genre.id),
      enabled: !!genre.id,
    })),
  });

  if (genresQuery.isLoading)
    return (
      <div className="flex gap-4 overflow-x-auto px-4 md:px-8">
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
      </div>
    );
  if (genresQuery.isError) return <p>Error loading genres.</p>;

  const genres = genresQuery.data ?? [];
  const isMoviesLoading = moviesQueries.some((q) => q.isLoading);
  const isMoviesError = moviesQueries.some((q) => q.isError);

  if (isMoviesError) return <p>Error loading some items.</p>;

  const genreMoviePairs = genres.map((genre, i) => ({
    genre,
    movies: moviesQueries[i]?.data?.results?.slice(0, 4) ?? [],
  }));

  return (
    <section className="ourGenres relative md:mt-40 md:px-8">
      <p
        className={clsx(
          "Movies mt-[5rem] md:mt-[11.5rem] tracking-widest text-white bg-main-red px-5 py-3 rounded-[6px] text-center text-medium-20 max-w-[7.25rem]",
          home && "hidden"
        )}
      >
        {categoryLabel}
      </p>

      <div className="flex flex-col mt-7 mb-10 gap-2 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 w-full">
          <h2 className="text-white text-3xl md:text-4xl">{sectionTitle}</h2>
          <MyPagination
            swiperRef={swiperRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            genreMoviePairs={genreMoviePairs}
            none={true}
          />
        </div>

        {home && (
          <p className="text-grey60 max-w-full md:max-w-2xl">
            Whether you're looking for a comedy to make you laugh, a drama to
            make you think, or a documentary to learn something new.
          </p>
        )}
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={24}
        slidesPerView={"auto"}
        className="mySwiper"
      >
        {isMoviesLoading
          ? Array(5)
              .fill(0)
              .map((_, idx) => (
                <SwiperSlide key={idx} className="!w-[250px] md:!w-[300px]">
                  <SkeletonCard />
                </SwiperSlide>
              ))
          : genreMoviePairs.map(({ genre, movies }) => (
              <SwiperSlide
                key={genre.id}
                className={clsx("!w-[250px] md:!w-[300px]")}
              >
                <div
                  className="hover:scale-100 scale-[97%] transform transition duration-300 border border-black-15 rounded-[10px] bg-black-10 px-5 py-8 flex flex-col gap-4 cursor-pointer"
                  onClick={() =>
                    navigate(`/genrespage?type=${type}&genreId=${genre.id}`)
                  }
                >
                  <div className="relative w-full rounded-[10px] overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 auto-rows-auto">
                      {movies.map((movie, idx) => (
                        <div key={idx} className="w-auto aspect-[2/2.5]">
                          <img
                            src={
                              movie?.poster_path
                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                : movie?.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                                : "/placeholder.jpg"
                            }
                            alt={movie.title || movie.name}
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
                  </div>

                  <div className="flex justify-between items-center text-center">
                    <h3 className="text-white text-medium-18 font-bold drop-shadow-lg tracking-wider">
                      {genre.name}
                    </h3>
                    <ArrowRight size={"2rem"} className="text-white" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default OurGenres;
