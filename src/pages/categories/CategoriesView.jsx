import React from "react";
import { Link } from "react-router-dom";

export const CategoriesView = ({
  kategori,
  selectedGenre,
  movies,
  loadingMovies,
  onGenreClick,
}) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for poster images

  return (
    <div>
      <h2 className="text-4xl font-semibold dark:bg-black dark:text-white flex justify-center font-mono pt-9">Select Genre</h2>
      <div className="flex flex-wrap dark:bg-black gap-5 pt-5 pb-5 justify-center">
        {kategori.map((genre) => (
          <button
            key={genre.id}
            className="px-4 py-3 bg-gray-200 border dark:text-black  border-gray-300 rounded-md cursor-pointer hover:bg-gray-300"
            onClick={() => onGenreClick(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Display Movies */}
      {selectedGenre && (
        <div className="dark:bg-black">
          <h3 className="text-xl font-medium dark:text-white mb-4">
            Movies in {selectedGenre.name} genre
          </h3>
          {loadingMovies ? (
            <p className="text-gray-600">Loading movies...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="card bg-base-100 dark:bg-current w-96  shadow-xl"
                  >
                    <figure className="px-10  pt-10">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`${imageBaseUrl}${movie.poster_path}`}
                          alt={movie.title}
                          className="rounded-xl "
                        />
                      </Link>
                    </figure>
                    <div className="card-body items-center text-center">
                      <h4 className="card-title dark:text-white text-lg font-bold mb-2">
                        {movie.title}
                      </h4>
                      <p className="text-gray-500 text-sm mb-4">
                        Release Date: {movie.release_date}
                      </p>
                      <div className="card-actions">
                        <Link to={`/movie/${movie.id}`}>
                          <button className="btn btn-primary">View Details</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No movies found for this genre</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
