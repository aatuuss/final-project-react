import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const DetailFilm = () => {
  const { movieId } = useParams(); // Get movieId from URL
  const [movieDetails, setMovieDetails] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // Base URL for poster images

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyODM1ODA4NC40NTY0NjQsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVlj_feH8ZSSppSBQ-J7vEV1ttT93JV1dymFLN1EkXY",
          },
        }
      );
      setMovieDetails(response.data);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="flex dark:bg-black flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {movieDetails ? (
        <div className="bg-white dark:bg-neutral rounded-lg shadow-lg p-6 max-w-4xl flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={`${imageBaseUrl}${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-2/3 flex flex-col">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">{movieDetails.title}</h1>
            <p className="text-gray-700 dark:text-white mb-4">{movieDetails.overview}</p>
            <p className="text-gray-200 dark:text-gray-500 mb-2">
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p className="text-gray-500 dark:text-white mb-2">
              <strong>Rating:</strong>
              <span className="text-yellow-500 font-semibold"> {movieDetails.vote_average}</span>/10
            </p>
            <p className="text-gray-500 dark:text-white mb-2">
              <strong>Runtime:</strong> {movieDetails.runtime} mins
            </p>
          </div>
        </div>
      ) : (
        <p>No movie details available.</p>
      )}
    </div>
  );
};

export default DetailFilm;
