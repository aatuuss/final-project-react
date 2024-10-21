import React, { useEffect, useState } from "react";

export const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Function to get favorite movies from localStorage
  const getFavoriteMovies = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(favorites);
  };

  // Function to remove a movie from favorites
  const removeFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter((movie) => movie.id !== movieId);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    getFavoriteMovies(); // Call this function when the component is rendered
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black bg-slate-200 p-6">
      <h1 className="text-4xl dark:text-white font-bold font-mono mb-6">Favorite Movies</h1>

      {favoriteMovies.length > 0 ? (
        <div className="grid dark:bg-dark grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMovies.map((movie) => (
            <div
              key={movie.id}
              className="card bg-base-100 dark:bg-neutral w-96 shadow-xl transition-transform transform hover:scale-105"
            >
              <figure className="px-10 pt-10">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl object-cover  h-64 w-full"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title dark:text-white font-bold">{movie.title}</h2>
                <p className="text-gray-500 dark:text-white text-sm mt-2">
                  Release Date: {movie.release_date}
                </p>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => removeFavorite(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-white">You have no favorite movies yet.</p>
      )}
    </div>
  );
};
