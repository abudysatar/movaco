import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import GenreSelector from "../components/GenreSelector";
import MediaGrid from "../components/MediaGrid";
import { fetchGenres } from "../api/fetchMedia";
import { fetchMoviesByGenre } from "../api/fetchMovie";
import { fetchShowByGenre } from "../api/fetchShow";

const GenresPage = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get("type") || "movie";
  const genreIdFromUrl = searchParams.get("genreId");

  const [type, setType] = useState(typeFromUrl);
  const [selectedGenre, setSelectedGenre] = useState(genreIdFromUrl || null);

  const { data: genres } = useQuery({
    queryKey: ["genres", type],
    queryFn: () => fetchGenres(type),
  });

  const { data: mediaData, isLoading } = useQuery({
    queryKey: ["media", type, selectedGenre],
    queryFn: () =>
      type === "movie"
        ? fetchMoviesByGenre(selectedGenre)
        : fetchShowByGenre(selectedGenre),
    enabled: !!selectedGenre,
  });

  const mediaItems = mediaData?.results || [];

  useEffect(() => {
    if (genreIdFromUrl) setSelectedGenre(genreIdFromUrl);
  }, [genreIdFromUrl]);

  return (
    <section className="min-h-screen bg-main-black text-white pt-28">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setType("movie");
            setSelectedGenre(null);
          }}
          className={`px-5 py-2 rounded-md cursor-pointer ${
            type === "movie" ? "bg-main-red" : "bg-gray-700"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => {
            setType("tv");
            setSelectedGenre(null);
          }}
          className={`px-5 py-2 rounded-md cursor-pointer ${
            type === "tv" ? "bg-main-red" : "bg-gray-700"
          }`}
        >
          TV Shows
        </button>
      </div>

      <GenreSelector
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6 animate-pulse">
          {[...Array(10)].map((_, idx) => (
            <div key={idx} className="h-60 bg-gray-700 rounded-lg" />
          ))}
        </div>
      ) : selectedGenre ? (
        <MediaGrid items={mediaItems} type={type} />
      ) : (
        <p className="text-center text-gray-400">
          Select a genre to view content.
        </p>
      )}
    </section>
  );
};

export default GenresPage;
