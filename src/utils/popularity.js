function popularity(movie) {
  if (!movie?.popularity) return null;
  return Math.floor(movie.popularity);
}
export default popularity;
