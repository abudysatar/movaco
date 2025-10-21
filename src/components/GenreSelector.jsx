import React from "react";

const GenreSelector = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      {genres?.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-4 py-2 rounded-full border transition cursor-pointer ${
            selectedGenre === genre.id
              ? "bg-main-red text-white border-main-red"
              : "bg-transparent text-gray-300 border-gray-500 hover:bg-gray-700"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;
