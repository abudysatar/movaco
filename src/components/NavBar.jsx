import React, { useState, useRef, useEffect } from "react";
import { Search, Menu, Close } from "@carbon/icons-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSearch } from "../api/fetchMedia";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/movies-shows", label: "Movies & Shows" },
    { path: "/supports", label: "Support" },
    { path: "/subscription", label: "Subscriptions" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["multiSearchResults", searchQuery],
    queryFn: () => fetchSearch(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });

  const searchResults =
    data?.results.filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        (item.title || item.name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <ScrollToTop />
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 md:backdrop-blur-none backdrop-blur-md md:bg-main-black/0 bg-main-black/60 transition-all duration-300 md:mt-2.5">
        <div className="py-5 flex justify-between items-center w-full px-6 md:px-20">
          <a href="/" className="w-[50%] md:w-[100%]">
            <img src="/Logo.png" alt="LOGO" className="h-10" />
          </a>

          <div className="hidden md:flex py-2.5 px-4 gap-4 justify-center items-center border-4 rounded-2xl border-black-12 text-grey75 bg-main-black absolute left-1/2 transform -translate-x-1/2">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `p-3.5 rounded-[8px] transition-all duration-200 hover:bg-black-12 ${
                    isActive ? "bg-black-12 text-white" : "text-grey75"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle Search"
              className="cursor-pointer"
            >
              <Search size={24} />
            </button>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <Close size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div
            ref={searchRef}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-full md:w-3/5 bg-main-black/90 backdrop-blur-lg rounded-xl z-50 shadow-xl"
          >
            <input
              type="text"
              placeholder="Search movies or TV shows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-t-xl border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {isLoading && <p className="mt-3 text-white p-3">Loading...</p>}
            {error && (
              <p className="mt-3 text-red-500 p-3">Error loading results.</p>
            )}

            {searchQuery && searchResults.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((item) => (
                  <div
                    key={`${item.id}-${item.media_type}`}
                    className="flex items-center gap-4 p-3 hover:bg-gray-800 transition-colors cursor-pointer border-b border-gray-700"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(
                        item.media_type === "movie"
                          ? `/movies/${item.id}`
                          : `/shows/${item.id}`
                      );
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-12 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {item.title || item.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {item.media_type === "movie" ? "Movie" : "TV Show"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery && searchResults.length === 0 && !isLoading && (
              <p className="mt-3 text-white p-3">No results found.</p>
            )}
          </div>
        )}

        {menuOpen && (
          <div className="md:hidden flex flex-col bg-main-black border-t border-black-12 px-8 py-6 space-y-3 animate-slideDown">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 rounded-lg text-center transition-all duration-200 hover:bg-black-12 ${
                    isActive ? "bg-black-12 text-white" : "text-grey75"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
