import axios from "axios";
import { useEffect, useReducer } from "react";
import BerandaView from "./BerandaView";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LOADING":
      return { ...state, loading: true, error: null };
    case "FETCH_BERHASIL":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Beranda() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, error } = state;
  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();
  console.log(theme);

  const ambilFilmTrending = async () => {
    dispatch({ type: "FETCH_LOADING" }); // Set loading state
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyOTUwOTYyNC42NzQxOTIsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z9BUy2yBX-TwZ5Xf4NkbUlF8rYNMg2bHntRoiRWZo3s",
          },
        }
      );

      dispatch({ type: "FETCH_BERHASIL", payload: response.data.results });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    ambilFilmTrending();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>; // Error state
  }

  return <BerandaView data={data} />;
}
