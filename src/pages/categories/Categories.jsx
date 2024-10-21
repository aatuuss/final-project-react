import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesView } from "./CategoriesView";

export default function Categories() {
  const [kategori, setKategori] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null); // Moved from CategoriesView
  const [movies, setMovies] = useState([]); // Moved from CategoriesView
  const [loadingMovies, setLoadingMovies] = useState(false); // Moved from CategoriesView

  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();
  console.log(theme);

  const ambilFilmKategori = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyODM1ODA4NC40NTY0NjQsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVlj_feH8ZSSppSBQ-J7vEV1ttT93JV1dymFLN1EkXY",
          },
        }
      );
      const data = response.data;
      setKategori(data.genres); // Corrected from 'data.results' to 'data.genres'
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchMoviesByGenre = async (genreId) => {
    setLoadingMovies(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyODM1ODA4NC40NTY0NjQsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XVlj_feH8ZSSppSBQ-J7vEV1ttT93JV1dymFLN1EkXY",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
    setLoadingMovies(false);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchMoviesByGenre(genre.id);
  };

  useEffect(() => {
    ambilFilmKategori();
  }, []);

  return (
    <CategoriesView
      kategori={kategori}
      selectedGenre={selectedGenre}
      movies={movies}
      loadingMovies={loadingMovies}
      onGenreClick={handleGenreClick} // Pass the click handler as prop
    />
  );
}
