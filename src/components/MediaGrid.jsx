import React from "react";
import { useNavigate } from "react-router-dom";

const MediaGrid = ({ items, type = "movie" }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:p-6">
      {items?.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            navigate(
              type === "movie" ? `/movies/${item.id}` : `/shows/${item.id}`
            )
          }
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="w-full md:h-[300px] object-cover hover:scale-105 transition-transform"
          />
          <p className="text-center text-sm mt-2 text-white">
            {item.title || item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
