import { PlayFilledAlt } from "@carbon/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieTrailer } from "../../api/fetchMovie";
import { fetchShowTrailer } from "../../api/fetchShow";

const HeroMedia = ({ data, isShow = false }) => {
  const { data: trailerUrl, isLoading } = useQuery({
    queryKey: [isShow ? "showTrailer" : "movieTrailer", data?.id],
    queryFn: () =>
      isShow ? fetchShowTrailer(data.id) : fetchMovieTrailer(data.id),
    enabled: !!data?.id,
  });

  if (!data) return null;

  return (
    <section className="relative mt-34 rounded-2xl overflow-hidden">
      {/* Background image */}
      {isLoading ? (
        <div className="w-full h-[300px] md:h-[500px] bg-black animate-pulse rounded-2xl" />
      ) : (
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
              : "/placeholder.jpg"
          }
          alt={data.title || data.name || "Media"}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f90] to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white px-6 pb-[0.5rem] md:pb-[4rem]">
        <h3 className="text-huge-mob-24 md:text-huge2-38 font-semibold mb-3">
          {data.title || data.name || ""}
        </h3>

        <p className="hidden md:block text-grey60 max-w-[70rem]">
          {data.overview || "No description available."}
        </p>

        {isLoading ? (
          <div className="w-40 h-12 bg-gray-700 rounded-md animate-pulse mt-2" />
        ) : trailerUrl ? (
          <a
            className="bg-main-red hover:bg-red-700 px-4 py-3 rounded-[8px] flex justify-center items-center gap-2 text-medium-18 mt-2 transition duration-300"
            href={trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayFilledAlt size="1.5rem" />
            Watch Trailer
          </a>
        ) : (
          <button
            disabled
            className="bg-gray-600 cursor-not-allowed px-4 py-3 rounded-[8px] flex justify-center items-center gap-2 text-medium-18 mt-2 transition duration-300"
          >
            <PlayFilledAlt size="1.5rem" />
            Trailer Unavailable
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroMedia;
