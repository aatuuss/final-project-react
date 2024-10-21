import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailBeranda = () => {
  const { id } = useParams(); // mengambil id dari parameter URL
  const [film, setFilm] = useState(null); // state untuk menyimpan data film
  const [loading, setLoading] = useState(true); // state untuk loading
  const [error, setError] = useState(null); // state untuk menangani error
  const [isFavorite, setIsFavorite] = useState(false); // state untuk menyimpan status favorite
  const [rating, setRating] = useState(null); // state untuk menyimpan rating pengguna

  // Fungsi untuk mendapatkan detail film dari API
  const getFilm = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyODM1ODA4NC40NTY0NjQsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVlj_feH8ZSSppSBQ-J7vEV1ttT93JV1dymFLN1EkXY",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan data film.");
      }

      const data = await response.json(); // mendapatkan hasil JSON dari response
      setFilm(data); // menyimpan data film ke dalam state

      // Cek apakah film sudah ada di localStorage sebagai favorit
      const favoriteMovies =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const isFav = favoriteMovies.some((fav) => fav.id === data.id);
      setIsFavorite(isFav);

      // Cek apakah sudah ada rating untuk film ini di localStorage
      const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
      const currentRating = ratedMovies.find((mov) => mov.id === data.id);
      if (currentRating) {
        setRating(currentRating.rating);
      }
    } catch (error) {
      setError(error.message); // menangani error
    } finally {
      setLoading(false); // menghentikan loading
    }
  };

  // Fungsi untuk toggle favorite status
  const toggleFavorite = () => {
    let favoriteMovies = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Hapus dari favorite
      favoriteMovies = favoriteMovies.filter((fav) => fav.id !== film.id);
    } else {
      // Tambahkan ke favorite
      favoriteMovies.push(film);
    }

    // Simpan kembali ke localStorage
    localStorage.setItem("favorites", JSON.stringify(favoriteMovies));
    setIsFavorite(!isFavorite); // toggle status
  };

  // Fungsi untuk memberikan rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);

    // Simpan rating di localStorage
    let ratedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    const movieIndex = ratedMovies.findIndex((mov) => mov.id === film.id);

    if (movieIndex >= 0) {
      // Jika film sudah dirating, update ratingnya
      ratedMovies[movieIndex].rating = newRating;
    } else {
      // Jika belum, tambahkan film beserta ratingnya
      ratedMovies.push({ id: film.id, rating: newRating });
    }

    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
  };

  useEffect(() => {
    getFilm();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-2xl font-semibold mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-2xl text-red-500 mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex dark:bg-black flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {film ? (
        <div className="bg-white dark:bg-neutral rounded-lg shadow-lg p-6 max-w-4xl flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-2/3 flex flex-col">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">{film.title}</h1>
            <p className="text-gray-700 dark:text-white mb-4">{film.overview}</p>
            <p className="text-gray-700 dark:text-gray-500 mb-2">
              <strong>Tanggal Rilis:</strong> {film.release_date}
            </p>
            <p className="text-gray-500 dark:text-white mb-2">
              <strong>Rating:</strong>
              <span className="text-yellow-500 font-semibold">
                {" "}
                {film.vote_average}
              </span>
              /10
            </p>

            {/* Tombol Favorite */}
            <button
              className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold ${
                isFavorite ? "bg-red-500" : "bg-blue-500"
              }`}
              onClick={toggleFavorite}
            >
              {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
            </button>

            {/* Tombol Rating Bintang */}
            <div className="mt-6">
              <label className="block dark:text-white mb-2 text-lg font-semibold">
                Your Rating:
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-3xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
              {rating && (
                <p className="mt-2 text-gray-600 dark:text-white">
                  You rated this movie: {rating} Stars
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Film tidak ditemukan.</p>
      )}
    </div>
  );
};
