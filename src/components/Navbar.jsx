import {
  BookHeart,
  ChartBarStacked,
  CircleUser,
  Film,
  Search,
} from "lucide-react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toogleTheme } from "../store/action/ThemeAction";
import ThemeContext from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FilmCard from "./FilmCard";

export const Navbar = () => {
  const [getTheme, setTheme] = useContext(ThemeContext);
  const [hasilCari, setHasilCari] = useState([]);
  const [cari, setCari] = useState("");
  const root = window.document.documentElement;
  const theme = useSelector((state) => state.theme.theme);
  const dispatchRedux = useDispatch();

  const fetchCari = async (cari) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${cari}`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmIyZDQ3MTUzOWYzMjljMGZiOTdjMGQ2MDk5MWZhNyIsIm5iZiI6MTcyOTUwOTYyNC42NzQxOTIsInN1YiI6IjY3MDQ4MzllMWI5NmI4ZWY0YzY5YjY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z9BUy2yBX-TwZ5Xf4NkbUlF8rYNMg2bHntRoiRWZo3s",
          },
        }
      );
      setHasilCari(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  useEffect(() => {
    fetchCari(cari);
  }, [cari]);

  useEffect(() => {
    console.log(hasilCari);
  }, [hasilCari]);

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

      <div className="flex-none gap-2 px-6">
        <div className="form-control">
          <button
            className="flex btn btn-outline pr-24"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <Search />
            cari
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box h-[500px] overflow-y-scroll">
              <div className="flex flex-col">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    onChange={(e) => setCari(e.target.value)}
                    className="grow"
                    placeholder="Cari"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <div className="flex flex-col space-y-3 py-4">
                  {hasilCari.map((item, index) => {
                    return (
                      <FilmCard
                        key={index}
                        title={item.title}
                        overview={item.overview}
                        id={item.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={(input) => ubahCari(input.target.value)}
          /> */}
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
      </div>
    </div>
  );
};
