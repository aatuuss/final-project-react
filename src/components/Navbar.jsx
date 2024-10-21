import { BookHeart, ChartBarStacked, CircleUser, Film } from "lucide-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toogleTheme } from "../store/action/ThemeAction";
import ThemeContext from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export const Navbar = () => {
  const [cariBaru, setCariBaru] = useSearchParams();
  const [getTheme, setTheme] = useContext(ThemeContext);
  const [hasilCari, setHasilCari] = useState([]); // State untuk hasil pencarian
  const root = window.document.documentElement;

  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();
  console.log(theme);

  const handleTheme = () => {
    if (getTheme === "light") {
      setTheme("dark");
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      setTheme("light");
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const ambilFilmTrending = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing"
    );
    const data = await response.data;
    // setResto(data); // Tidak ada state resto yang didefinisikan
  };

  useEffect(() => {
    ambilFilmTrending();
    if (cariBaru.size > 0) {
      ubahCari(cariBaru.get("caribaru"));
    }
  }, [cariBaru]); // Tambahkan cariBaru sebagai dependency

  const ubahCari = useCallback(
    async (input) => {
      setCariBaru({ caribaru: input });

      try {
        const response = await axios.get(
          `https://restaurant-api.dicoding.dev/search?q=${input}` // Gunakan input langsung
        );

        const data = await response.data;
        setHasilCari(data.restaurants); // Asumsikan data memiliki properti restaurants
      } catch (error) {
        console.error("Error fetching search results:", error);
        setHasilCari([]); // Reset hasil pencarian jika terjadi kesalahan
      }
    },
    [setCariBaru]
  );

  return (
    <div className="navbar dark:bg-black dark:text-white bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Movie</a>
      </div>
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">
              <Film />
              Film
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <BookHeart />
              Favorite
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <ChartBarStacked />
              Kategori
            </Link>
          </li>
        </ul>
      </div>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          onClick={() => dispatchRedux(toogleTheme())}
          onChange={handleTheme}
          checked={getTheme === "dark"}
        />
        {/* Icon sun and moon */}
        <svg className="swap-off h-10 w-10 fill-current" viewBox="0 0 24 24">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg className="swap-on h-10 w-10 fill-current" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={(input) => ubahCari(input.target.value)}
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <Link to="/rating">
              <CircleUser size={30} />
            </Link>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* Here you can map over hasilCari to display search results */}
            {hasilCari.length > 0 ? (
              hasilCari.map((restaurant) => (
                <li key={restaurant.id}>
                  <Link to={`/restaurant/${restaurant.id}`}>
                    {restaurant.name}
                  </Link>
                </li>
              ))
            ) : (
              <li>No results found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
