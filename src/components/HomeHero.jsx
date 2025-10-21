import { fetchMoviesByGenre } from "../api/fetchMovie";
import { fetchShowByGenre } from "../api/fetchShow";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { PlayFilledAlt } from "@carbon/icons-react";

const HomeHero = ({ genreId }) => {
  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ["moviesByGenre", genreId],
    queryFn: () => fetchMoviesByGenre(genreId),
  });

  const { data: showsData, isLoading: showsLoading } = useQuery({
    queryKey: ["showsByGenre", genreId],
    queryFn: () => fetchShowByGenre(genreId),
  });

  if (moviesLoading || showsLoading) return <p>Loading...</p>;

  const allMedia = [
    ...(moviesData?.results || []),
    ...(showsData?.results || []),
  ];
  const shuffledMedia = allMedia.sort(() => Math.random() - 0.5);

  return (
    <div className="w-full  flex items-center h-[100vh]">
      <div className="absolute -z-20 w-full h-[100vh] overflow-hidden left-0 top-0 grid gap-2 grid-cols-[repeat(11,minmax(300px,1fr))]">
        {shuffledMedia.slice(0, 30).map((item) => (
          <div key={item.id} className="w-full  overflow-hidden ">
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute -z-10 inset-0 bg-gradient-to-t from-black via-[#010101c4] to-transparent"></div>

      <div className="flex flex-col items-center gap-4 ">
        <div>
          <img
            src="/Abstract Design.png"
            alt="logo"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 mb-6"
          />
        </div>
        <div className="text-center text-white flex flex-col items-center  px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            The Best Streaming Experience
          </h1>
          <p className="text-xs  md:text-base text-grey60 leading-relaxed">
            Movaco is the best streaming experience for watching your favorite
            movies and shows on demand, anytime, anywhere. With Movaco, you can
            enjoy a wide variety of content, including the latest blockbusters,
            classic movies, popular TV shows, and more. You can also create your
            own watchlists, so you can easily find the content you want to
            watch.
          </p>
          <Link to={"/movies-shows"}>
            <button className="bg-main-red px-6 sm:px-10 md:px-16 py-2 sm:py-3 md:py-3 rounded-[6px] flex justify-center items-center gap-2 text-sm sm:text-base md:text-medium-18 hover:bg-red-700 cursor-pointer mt-6 sm:mt-8 md:mt-10">
              <PlayFilledAlt size="1.5rem" /> Start Watching Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
