import { useQuery } from "@tanstack/react-query";
import { Time, PlayFilledAlt } from "@carbon/icons-react";
import { fetchSeasonDetails, fetchShowTrailer } from "../../api/fetchShow";

const SeasonEpisodes = ({ tvId, seasonNumber }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["seasonDetails", tvId, seasonNumber],
    queryFn: () => fetchSeasonDetails(tvId, seasonNumber),
    enabled: tvId != null && seasonNumber != null, // fixed
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse ">
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-4 bg-black-15 p-4 rounded-lg "
          >
            <div className="w-full md:w-40 h-28 bg-gray-700 rounded border border-black-15 " />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 w-3/4 bg-gray-600 rounded" />
              <div className="h-3 w-full bg-gray-600 rounded" />
              <div className="h-3 w-5/6 bg-gray-600 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-400">Error loading episodes.</p>;
  if (!data?.episodes?.length)
    return <p className="text-gray-400">No episodes found.</p>;

  return (
    <div className="space-y-4">
      {data.episodes.map((ep) => (
        <EpisodeCard
          key={ep.id}
          tvId={tvId}
          seasonNumber={seasonNumber}
          episode={ep}
        />
      ))}
    </div>
  );
};

const EpisodeCard = ({ tvId, seasonNumber, episode }) => {
  const { data: trailerUrl, isLoading: trailerLoading } = useQuery({
    queryKey: ["episodeTrailer", tvId, seasonNumber, episode.episode_number],
    queryFn: () => fetchShowTrailer(tvId, seasonNumber, episode.episode_number),
  });

  if (trailerLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 bg-black-15 p-4 rounded-lg animate-pulse ">
        <div className="w-full md:w-40 h-28 bg-gray-700 rounded border border-black-15" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 w-3/4 bg-gray-600 rounded" />
          <div className="h-3 w-full bg-gray-600 rounded" />
          <div className="h-3 w-5/6 bg-gray-600 rounded" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={trailerUrl || "#"}
      target={trailerUrl ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`flex flex-col md:flex-row items-start md:items-center gap-4 bg-main-black p-4 border-b border-black-15 relative transition hover:scale-[1.01] ${
        trailerUrl
          ? "cursor-pointer hover:bg-black-15"
          : "opacity-70 cursor-not-allowed"
      }`}
    >
      {episode.still_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
          alt={episode.name}
          className="w-full md:w-40 h-28 object-cover rounded-[12px] border-2 border-black-15 flex-shrink-0"
        />
      ) : (
        <div className="w-full md:w-40 h-28 flex items-center justify-center bg-black-15 text-grey60 rounded-[12px] border-2 border-black-15">
          <span className="text-sm">No Image</span>
        </div>
      )}

      {/* Episode Details */}
      <div className="flex-1 text-white mt-2 md:mt-0 relative">
        {/* Upper right corner: duration or air date */}
        <span className="absolute flex gap-1 items-center text-[14px] -top-2 right-0 text-grey80 bg-black-8 px-2 py-1 rounded border border-black-15">
          <Time size={18} />
          {episode.runtime
            ? `${episode.runtime} min`
            : episode.air_date || "N/A"}
        </span>

        <h4 className="font-semibold text-medium-18 md:text-base flex items-center gap-2">
          {episode.episode_number}. {episode.name}
          {trailerUrl && <PlayFilledAlt size={16} className="text-red-500" />}
        </h4>

        <p className="text-grey60 text-sm md:text-sm line-clamp-3 mt-1">
          {episode.overview || "No description available."}
        </p>
      </div>
    </a>
  );
};

export default SeasonEpisodes;
