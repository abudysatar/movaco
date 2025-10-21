import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import MovieDetails from "../components/MediaPage/MovieDetails";
import { fetchMovieDetails } from "../api/fetchMovie";
import HeroMedia from "../components/MediaPage/HeroMedia";

const MoviesDetails = () => {
  const { movieId } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
  });

  if (isError) return <div>ERROR</div>;
  if (isLoading) return <div>IS LOADING</div>;

  return (
    <div>
      <HeroMedia data={data} />
      <MovieDetails data={data} />
    </div>
  );
};

export default MoviesDetails;
