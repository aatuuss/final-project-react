import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Rating = () => {
  const [ratedMovies, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState([]);

  const getRating = async () => {
    try {
      const storedRating = JSON.parse(localStorage.getItem("ratedMovies")) || [];
      if (storedRating.length > 0) {
        setRating(storedRating);
        
        const movieDetailsPromises = storedRating.map(async (movie) => {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer YOUR_API_KEY",
            },
          });
          return await response.json();
        });

        const details = await Promise.all(movieDetailsPromises);
        setMovieDetails(details);
      } else {
        throw new Error("Belum ada film yang diberi rating.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRating();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl font-semibold mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-6">
      <h1 className="text-3xl font-mono font-bold dark:text-white mb-6">Movies You've Rated</h1>
      {ratedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ratedMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="card bg-white dark:bg-current rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Cek jika detail movie ada dan menampilkan poster */}
              {movieDetails[index]?.poster_path ? (
                <figure className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails[index].poster_path}`}
                    alt={movie.title}
                    className="rounded-t-lg object-cover w-full h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-110"
                  />
                </figure>
              ) : (
                <div className="w-full h-[300px] bg-gray-300 rounded-t-lg"></div> // Placeholder jika tidak ada poster
              )}
              <div className="card-body p-4 text-center">
                <h2 className="text-xl font-bold dark:text-white">{movieDetails[index]?.title}</h2>
                <p className="text-gray-700 mt-2 dark:text-white">Your Rating: {movie.rating} Stars</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">You haven't rated any movies yet.</p>
      )}
    </div>
  );
};
