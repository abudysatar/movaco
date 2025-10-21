import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToHashElement from "./components/MediaPage/Dialog/ScrollToHashElement.jsx";

import MoviesShowPage from "./pages/MoviesShowPage.jsx";
import MoviesDetails from "./pages/MoviesDetails.jsx";
import TvShowDetails from "./pages/TvShowDetails.jsx";
import GenresPage from "./pages/GenresPage.jsx";
import HomePage from "./pages/HomePage .jsx";
import SupportPage from "./pages/SupportPage.jsx";
import Subscription from "./pages/Subscription.jsx";
import Trial from "./components/Trial.jsx";
import { fetchMoviesByGenre } from "./api/fetchMovie.js";
import { fetchShowByGenre } from "./api/fetchShow.js";
import NotFound from "./components/404.jsx";

const queryClient = new QueryClient();

// Prefetch generic lists
async function prefetchAll() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["moviesList", "trending"],
      queryFn: () => fetchMoviesByGenre("28"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["showsList", "trending"],
      queryFn: () => fetchShowByGenre("10759"),
    }),
  ]);
}

async function initApp() {
  await prefetchAll();

  createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToHashElement />
        <Routes>
          {/* All normal pages inside Layout */}
          <Route
            path="/"
            element={
              <Layout>
                <NavBar />
                <HomePage />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/movies-shows"
            element={
              <Layout>
                <NavBar />
                <MoviesShowPage />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <Layout>
                <NavBar />
                <MoviesDetails />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/shows/:showId"
            element={
              <Layout>
                <NavBar />
                <TvShowDetails />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/genrespage"
            element={
              <Layout>
                <NavBar />
                <GenresPage />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/supports"
            element={
              <Layout>
                <NavBar />
                <SupportPage />
                <Trial />
                <Footer />
              </Layout>
            }
          />
          <Route
            path="/subscription"
            element={
              <Layout>
                <NavBar />
                <Subscription />
                <Trial />
                <Footer />
              </Layout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

initApp();
