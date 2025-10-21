import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MyPagination from "/src/components/MyPagination";
import DialogDemo from "./Dialog/Dialog";

import { fetchMovieDetails, fetchMovieReviews } from "../../api/fetchMovie";
import { fetchShowDetails, fetchTvShowReviews } from "../../api/fetchShow";

const StarRating = ({ rating = 0 }) => {
  const totalStars = 5;
  const filledStars = Math.round((rating / 10) * totalStars);

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < filledStars ? "#E50000" : "#444"}
          className="w-4 h-4"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.722 1.548 8.269L12 18.897l-7.484 4.4 1.548-8.269L0 9.306l8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard = ({ author, content, url, rating }) => {
  const isLong = content.length > 200;
  const displayedContent = isLong ? content.slice(0, 200) + "..." : content;

  return (
    <div className="relative bg-main-black p-4 rounded-2xl shadow-md border border-black-15 flex flex-col gap-2 w-[250px] md:w-full min-h-[220px]">
      <div className="flex justify-between">
        <p className="tracking-wide text-medium-12 text-white">{author}</p>
        <StarRating rating={rating} />
      </div>

      <p className="text-grey60 flex-1 text-[12px] md:text-sm">
        {displayedContent}
      </p>

      {isLong && <DialogDemo author={author} content={content} />}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-400 hover:underline mt-1"
      >
        View on TMDb
      </a>
    </div>
  );
};

const MovieReviews = ({ id, isShow = false }) => {
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [isShow ? "tvReviews" : "movieReviews", id],
    queryFn: () => (isShow ? fetchTvShowReviews(id) : fetchMovieReviews(id)),
    enabled: !!id,
  });

  const { data: mediaData } = useQuery({
    queryKey: [isShow ? "tvDetails" : "movieDetails", id],
    queryFn: () => (isShow ? fetchShowDetails(id) : fetchMovieDetails(id)),
    enabled: !!id,
  });

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) return <p className="text-white">Loading reviews...</p>;
  if (error) return <p className="text-red-500">Error loading reviews</p>;
  if (!reviewsData?.results?.length)
    return <p className="text-gray-400">No reviews yet.</p>;

  const avgRating = mediaData?.vote_average || 0;

  return (
    <div className="reviews-section border border-black-15 rounded-2xl p-4 bg-black-10">
      <h3 className="text-lg font-bold mb-4 text-white">
        {isShow ? "TV Show Reviews" : "Movie Reviews"}
      </h3>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          1100: { slidesPerView: 2, spaceBetween: 1 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="py-4"
      >
        {reviewsData.results.map((review) => (
          <SwiperSlide key={review.id} className="mx-auto w-auto">
            <ReviewCard
              author={review.author}
              content={review.content}
              url={review.url}
              rating={review.author_details?.rating ?? avgRating}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {reviewsData.results.length > 2 && (
        <div className="flex justify-center mt-4">
          <MyPagination
            circled={true}
            details={true}
            swiperRef={swiperRef}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            genreMoviePairs={reviewsData.results}
            none={true}
          />
        </div>
      )}
    </div>
  );
};

export default MovieReviews;
