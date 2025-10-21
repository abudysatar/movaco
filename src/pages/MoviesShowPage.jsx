import React, { useState } from "react";
import NowPlaying from "../components/NowPlaying";
import OurGenres from "../components/OurGenres";
import NewRelase from "../components/NewRelase";
import ShowsGenres from "../components/ShowsGenres";
import TrendingShows from "../components/TrendingShows";
import NewTvRelase from "../components/NewTvRelase";
import TrendingMovies from "../components/TrendingMovies";

const MoviesShowPage = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <div>
      <NowPlaying />

      <div className="flex justify-center gap-4 my-6 md:hidden">
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            activeTab === "movies"
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab("shows")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            activeTab === "shows"
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          Shows
        </button>
      </div>

      <div
        className={`${activeTab === "movies" ? "block" : "hidden"} md:block`}
      >
        <section id="movie-genres">
          <OurGenres />
        </section>
        <section id="movie-trending">
          <TrendingMovies />
        </section>
        <section id="movie-new">
          <NewRelase />
        </section>
      </div>

      <div className={`${activeTab === "shows" ? "block" : "hidden"} md:block`}>
        <section id="show-genres">
          <ShowsGenres />
        </section>

        <section id="show-trending">
          <TrendingShows />
        </section>

        <section id="show-new">
          <NewTvRelase />
        </section>
      </div>
    </div>
  );
};

export default MoviesShowPage;
