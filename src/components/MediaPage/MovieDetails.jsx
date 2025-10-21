import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MyPagination from "/src/components/MyPagination";

import { fetchMovieCast } from "../../api/fetchMovie";
import { fetchTvCast } from "../../api/fetchShow";
import MovieReviews from "./MovieReviews ";

const MovieDetails = ({
  data,
  isShow,
  sidebarOnly = false,
  contentOnly = false,
}) => {
  const {
    data: credits,
    isLoading,
    error,
  } = useQuery({
    queryKey: [isShow ? "tvCredits" : "movieCredits", data?.id],
    queryFn: () => (isShow ? fetchTvCast(data.id) : fetchMovieCast(data.id)),
    enabled: !!data?.id,
  });

  function getRandomDecimal(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  const cast = credits?.cast || [];
  const director = credits?.director || null;
  const composer = credits?.composer || null;

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p>Failed to load cast.</p>;

  /* ------------------------
     SIDEBAR-ONLY (right column)
     ------------------------ */
  if (sidebarOnly) {
    return (
      <div className="bg-black-10 border border-[#1F1F22] rounded-xl p-6 flex flex-col gap-6 max-h-fit">
        {/* Released Year */}
        <div>
          <p className="text-grey60 text-sm mb-1">Released Year</p>
          <p className="text-white font-semibold">
            {data?.release_date
              ? data.release_date.slice(0, 4)
              : data?.first_air_date
              ? data.first_air_date.slice(0, 4)
              : "—"}
          </p>
        </div>

        {/* Languages */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Available Languages</p>
          <div className="flex flex-wrap gap-2">
            {data?.spoken_languages?.length > 0 ? (
              data.spoken_languages.map((lang) => (
                <span
                  key={lang.iso_639_1}
                  className="bg-black-10 border border-[#2A2A2D] px-3 py-1 rounded-lg text-sm text-white"
                >
                  {lang.english_name}
                </span>
              ))
            ) : (
              <span className="text-grey60 text-sm">
                No language data available
              </span>
            )}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <p className="text-grey60 text-sm mb-2">Ratings</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-black-10 border border-[#2A2A2D] px-4 py-2 rounded-lg flex items-center justify-between w-[120px]">
              <span className="font-semibold">IMDb</span>
              <span className="text-red-400 font-semibold">
                ★ {data?.vote_average?.toFixed(1) ?? "—"}
              </span>
            </div>
            <div className="bg-black-10 border border-[#2A2A2D] px-4 py-2 rounded-lg flex items-center justify-between w-auto gap-2.5">
              <span className="font-semibold">Movaco</span>
              <span className="text-red-400 font-semibold">
                {" "}
                ★ {getRandomDecimal(3.7, 8)}
              </span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Genres</p>
          <div className="flex flex-wrap gap-2">
            {data?.genres?.length > 0 ? (
              data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-black-10 border border-[#2A2A2D] px-3 py-1 rounded-lg text-sm text-white"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-grey60 text-sm">No genres available</span>
            )}
          </div>
        </div>

        {/* Director */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Director</p>
          {director ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                    : "/blank-profile-picture-973460_1280.png"
                }
                alt={director.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{director.name}</p>
                <p className="text-xs text-grey60">
                  {director.known_for_department}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-grey60 text-sm">
              No director information available
            </p>
          )}
        </div>

        {/* Music */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Music</p>
          {composer ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  composer.profile_path
                    ? `https://image.tmdb.org/t/p/w185${composer.profile_path}`
                    : "/blank-profile-picture-973460_1280.png"
                }
                alt={composer.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{composer.name}</p>
                <p className="text-xs text-grey60">
                  {composer.known_for_department}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-grey60 text-sm">
              No music information available
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ------------------------
     CONTENT-ONLY (description, cast, reviews)
     ------------------------ */
  if (contentOnly) {
    return (
      <div className="col-span-2 flex flex-col gap-8">
        {/* Description */}
        <div className="md:max-w-[850px] description text-medium-18 rounded-[12px] bg-black-10 border border-black-15 p-10">
          <h2 className="font-medium mb-2 text-grey60">Description</h2>
          <p className="text-white">
            {data?.overview || "No description available."}
          </p>
        </div>

        {/* Cast */}
        <div className="cast rounded-[12px] bg-black-10 border border-black-15 p-10">
          <div className="flex justify-between items-center pb-7">
            <h2 className="text-medium-18 font-medium text-grey60">Cast</h2>
            {cast && cast.length > 0 && (
              <MyPagination
                details={true}
                circled={true}
                swiperRef={swiperRef}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                genreMoviePairs={cast}
                none={true}
              />
            )}
          </div>

          {cast && cast.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 3 },
                640: { slidesPerView: 5, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 10 },
              }}
              className="select-none"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {cast.map((actor) => (
                <SwiperSlide key={actor.id}>
                  <div className="w-auto h-auto mb-3 mx-auto">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                          : "/blank-profile-picture-973460_1280.png"
                      }
                      alt={actor.name}
                      className="rounded-[12px] w-[4.5rem] md:w-full h-full object-cover cursor-grab"
                    />
                  </div>
                  <div className="md:text-center">
                    <p className="font-semibold text-sm text-white mb-1">
                      {actor.name}
                    </p>
                    <p className="text-xs tracking-wider text-grey60 max-w-20 ">
                      {actor.character}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No cast available.
            </p>
          )}
        </div>

        {/* Reviews */}
        <div className="Reviews">
          <MovieReviews id={data?.id} isShow={isShow} />
        </div>
      </div>
    );
  }

  return (
    <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 text-white rounded-2xl">
      <div className="col-span-2 flex flex-col gap-8">
        <div className="md:max-w-[850px] description text-medium-18 rounded-[12px] bg-black-10 border border-black-15 p-10">
          <h2 className="font-medium mb-2 text-grey60">Description</h2>
          <p className="text-white">
            {data?.overview || "No description available."}
          </p>
        </div>

        <div className="cast rounded-[12px] bg-black-10 border border-black-15 p-10">
          <div className="flex justify-between items-center pb-7">
            <h2 className="text-medium-18 font-medium text-grey60">Cast</h2>
            {cast && cast.length > 0 && (
              <MyPagination
                details={true}
                circled={true}
                swiperRef={swiperRef}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                genreMoviePairs={cast}
              />
            )}
          </div>

          {cast && cast.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 3 },
                640: { slidesPerView: 5, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 10 },
              }}
              className="select-none"
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {cast.map((actor) => (
                <SwiperSlide key={actor.id}>
                  <div className="w-auto h-auto mb-3 mx-auto">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                          : "/blank-profile-picture-973460_1280.png"
                      }
                      alt={actor.name}
                      className="rounded-[12px] w-[4.5rem] md:w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:text-center">
                    <p className="font-semibold text-sm text-white mb-1">
                      {actor.name}
                    </p>
                    <p className="text-xs tracking-wider text-gray-400">
                      {actor.character}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No cast available.
            </p>
          )}
        </div>

        <div className="Reviews">
          <MovieReviews id={data?.id} isShow={isShow} />
        </div>
      </div>

      {/* Right: sidebar (non-recursive) */}
      <div className="bg-black-10 border border-[#1F1F22] rounded-xl p-6 flex flex-col gap-6">
        {/* Released Year */}
        <div>
          <p className="text-grey60 text-sm mb-1">Released Year</p>
          <p className="text-white font-semibold">
            {data?.release_date
              ? data.release_date.slice(0, 4)
              : data?.first_air_date
              ? data.first_air_date.slice(0, 4)
              : "—"}
          </p>
        </div>

        {/* Languages */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Available Languages</p>
          <div className="flex flex-wrap gap-2">
            {data?.spoken_languages?.length > 0 ? (
              data.spoken_languages.map((lang) => (
                <span
                  key={lang.iso_639_1}
                  className="bg-black-10 border border-[#2A2A2D] px-3 py-1 rounded-lg text-sm text-white"
                >
                  {lang.english_name}
                </span>
              ))
            ) : (
              <span className="text-grey60 text-sm">
                No language data available
              </span>
            )}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <p className="text-grey60 text-sm mb-2">Ratings</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-black-10 border border-[#2A2A2D] px-4 py-2 rounded-lg flex items-center justify-between w-[120px]">
              <span className="font-semibold">IMDb</span>
              <span className="text-red-400 font-semibold">
                ★ {data?.vote_average?.toFixed(1) ?? "—"}
              </span>
            </div>
            <div className="bg-black-10 border border-[#2A2A2D] px-4 py-2 rounded-lg flex items-center justify-between w-auto gap-2.5">
              <span className="font-semibold">Movaco</span>
              <span className="text-red-400 font-semibold">
                ★ {getRandomDecimal(4.7, 9)}
              </span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Genres</p>
          <div className="flex flex-wrap gap-2">
            {data?.genres?.length > 0 ? (
              data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-black-10 border border-[#2A2A2D] px-3 py-1 rounded-lg text-sm text-white"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="text-grey60 text-sm">No genres available</span>
            )}
          </div>
        </div>

        {/* Director */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Director</p>
          {director ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                    : "/blank-profile-picture-973460_1280.png"
                }
                alt={director.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{director.name}</p>
                <p className="text-xs text-grey60">
                  {director.known_for_department}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-grey60 text-sm">
              No director information available
            </p>
          )}
        </div>

        {/* Music */}
        <div className="mt-4">
          <p className="text-grey60 text-sm mb-2">Music</p>
          {composer ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  composer.profile_path
                    ? `https://image.tmdb.org/t/p/w185${composer.profile_path}`
                    : "/blank-profile-picture-973460_1280.png"
                }
                alt={composer.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{composer.name}</p>
                <p className="text-xs text-grey60">
                  {composer.known_for_department}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-grey60 text-sm">
              No music information available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
