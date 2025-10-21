import api from "./api";

export const fetchShowByGenre = async (genreId) => {
  const res = await api.get("/discover/tv", {
    params: {
      with_genres: genreId,
      language: "en-US",
      sort_by: "popularity.desc",
    },
  });
  return res.data;
};

export const fetchTvDetails = async (id) => {
  const res = await api.get(`/tv/${id}`, {
    params: { language: "en-US" },
  });
  return res.data;
};

export const fetchNewTvRelase = async () => {
  const res = await api.get("/tv/on_the_air", {
    params: { language: "en-US" },
  });
  return res.data;
};

export const fetchTvShowReviews = async (showId) => {
  const res = await api.get(`/tv/${showId}/reviews`, {
    params: { language: "en-US" },
  });
  return res.data;
};

export const fetchTrendingShows = async () => {
  const res = await api.get("/trending/tv/week", {
    params: { language: "en-US" },
  });
  return res.data;
};

// Fetch TV details
export const fetchShowDetails = async (id) => {
  const res = await api.get(`/tv/${id}`, {
    params: { language: "en-US" },
  });
  return res.data;
};

// Fetch TV cast & crew
export const fetchTvCast = async (tvId) => {
  const res = await api.get(`/tv/${tvId}/credits`, {
    params: { language: "en-US" },
  });
  const cast = res.data.cast;
  const director = res.data.crew.find(
    (member) => member.job === "Director" || member.job === "Series Director"
  );
  const composer = res.data.crew.find(
    (member) => member.job === "Original Music Composer"
  );
  return { cast, director, composer };
};

export const fetchShowTrailer = async (id) => {
  const res = await api.get(`/tv/${id}/videos`, {
    params: { language: "en-US" },
  });
  const trailer = res.data.results.find((v) => v.type === "Trailer");
  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
};

export const fetchSeasonDetails = async (tvId, seasonNumber) => {
  const res = await api.get(`/tv/${tvId}/season/${seasonNumber}`, {
    params: { language: "en-US" },
  });
  return res.data;
};
