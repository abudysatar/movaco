import api from "./api";

export const fetchMoviesByGenre = async (genreId) => {
  const res = await api.get("/discover/movie", {
    params: {
      with_genres: genreId,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });
  return res.data;
};

export const fetchNowPlaying = async () => {
  const res = await api.get("/movie/now_playing", {
    params: { language: "en-US" },
  });
  return res.data;
};

export const fetchUpcomingMovie = async (number = 1) => {
  const allResults = [];

  for (let page = 1; page <= number; page++) {
    const res = await api.get("movie/upcoming", {
      params: { language: "en-US", page },
    });
    allResults.push(...res.data.results);
  }

  return { results: allResults };
};

export const fetchMovieReviews = async (movieId) => {
  const res = await api.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US" },
  });
  return res.data;
};

export const fetchTrendingMovies = async () => {
  const res = await api.get("/trending/movie/week", {
    params: { language: "en-US" },
  });
  return res.data;
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
  const res = await api.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
  return res.data;
};

// Fetch movie cast & crew
export const fetchMovieCast = async (movieId) => {
  const res = await api.get(`/movie/${movieId}/credits`, {
    params: { language: "en-US" },
  });
  const cast = res.data.cast;
  const director = res.data.crew.find((member) => member.job === "Director");
  const composer = res.data.crew.find(
    (member) => member.job === "Original Music Composer"
  );
  return { cast, director, composer };
};

export const fetchMovieTrailer = async (movieId) => {
  const res = await api.get(`/movie/${movieId}/videos`, {
    params: { language: "en-US" },
  });

  const trailer = res.data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};
