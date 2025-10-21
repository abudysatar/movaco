import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import HeroMedia from "../components/MediaPage/HeroMedia";
import { fetchTvDetails } from "../api/fetchShow";
import MovieDetails from "../components/MediaPage/MovieDetails";
import SeasonEpisodes from "../components/MediaPage/TvSeason";
import { ArrowDown, ArrowUp } from "@carbon/icons-react";

const TvShowDetails = () => {
  const { showId } = useParams();
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [showAllSeasons, setShowAllSeasons] = useState(false);

  const {
    data: showData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["show", showId],
    queryFn: () => fetchTvDetails(showId),
    enabled: !!showId,
  });

  if (isError)
    return (
      <p className="text-red-400 text-center mt-10">
        Error loading show details.
      </p>
    );

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="w-full h-[24rem] md:h-[38rem] bg-gray-700 animate-pulse rounded-2xl" />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-gray-700 animate-pulse rounded-xl"
              />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 bg-gray-700 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4 md:max-w-[53em]">
          <div className="h-20 bg-gray-700 animate-pulse rounded-lg" />
          <div className="h-64 bg-gray-700 animate-pulse rounded-lg" />
        </div>
      </div>
    );

  return (
    <div className="text-white">
      <HeroMedia data={showData} isShow />

      <section className="mt-10 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4 bg-black-10 border border-black-15 rounded-[12px] p-7">
          <h2 className="font-medium text-grey60 mb-4">Seasons and Episodes</h2>

          {(showAllSeasons
            ? showData?.seasons
            : showData?.seasons?.slice(0, 5)
          )?.map((season) => {
            const isExpanded = expandedSeason === season.season_number;
            return (
              <div
                key={season.id ?? season.season_number}
                className="bg-main-black rounded-xl border border-black-15 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 text-white font-semibold hover:bg-black-15 transition cursor-pointer"
                  onClick={() =>
                    setExpandedSeason(isExpanded ? null : season.season_number)
                  }
                >
                  <div className="flex gap-3.5 text-left">
                    <span className="text-medium-20">{season.name}</span>
                    <span className="text-grey60 text-medium-sm pt-1.5">
                      {season.episode_count} Episodes
                    </span>
                  </div>

                  {isExpanded ? (
                    <ArrowUp
                      className="p-1 w-8 h-8 rounded-2xl bg-black-8 border border-black-15"
                      size={18}
                    />
                  ) : (
                    <ArrowDown
                      className="p-1 w-8 h-8 rounded-2xl bg-black-8 border border-black-15"
                      size={18}
                    />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-black-15">
                    <SeasonEpisodes
                      tvId={showData.id}
                      seasonNumber={season.season_number}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {showData?.seasons?.length > 5 && (
            <button
              onClick={() => setShowAllSeasons(!showAllSeasons)}
              className="text-main-red font-semibold mt-2 w-full text-center py-2 hover:underline cursor-pointer"
            >
              {showAllSeasons ? "Show Less" : "Show All Seasons"}
            </button>
          )}
        </div>

        <div>
          <MovieDetails data={showData} isShow sidebarOnly />
        </div>
      </section>

      <section className="mt-10 md:max-w-[53em]">
        <MovieDetails data={showData} isShow contentOnly />
      </section>
    </div>
  );
};

export default TvShowDetails;
