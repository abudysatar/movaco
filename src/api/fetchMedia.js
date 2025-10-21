import api from "./api";

export const fetchGenres = async (entertainment = "movie") => {
  const res = await api.get(`/genre/${entertainment}/list`, {
    params: { language: "en-US" },
  });
  return res.data.genres;
};

export const fetchSearch = async (query) => {
  if (!query) return { results: [] };
  const res = await api.get("/search/multi", {
    params: {
      language: "en-US",
      query,
    },
  });
  return res.data;
};
