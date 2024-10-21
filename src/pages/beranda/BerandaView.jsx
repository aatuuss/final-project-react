import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const BerandaView = ({ data }) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-[500px] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/originals/a3/bd/38/a3bd3813ffa40f6307a285a7a778fbb8.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <h1 className="relative text-6xl font-extrabold text-white z-10 drop-shadow-lg mb-4">
          Trending Movies
        </h1>
      </div>

      {/* Title Section */}
      <div className="bg-gradient-to-t dark:bg-black to-slate-600 py-6">
        <div className="text-5xl font-extrabold text-center dark:bg-black text-black">
          <span className="border-b-4 dark:text-white">Top Movies</span>
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid dark:bg-black xl:grid-cols-4 lg:grid-cols-5 md:grid-cols-2 gap-10 pb-14 p-10">
        {data?.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 w-[290px] h[69px] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out rounded-lg"
          >
            <figure className="px-10 dark:bg-neutral pt-10 relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="rounded-xl object-cover dark:bg-neutral p-2 w-full h-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
            </figure>
            <div className="card-body dark:bg-neutral items-center text-center pt-1">
              <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm mt-2 pt-1">
                Release Date: {item.release_date}
              </p>
              <p className="line-clamp-1 text-gray-500 text-sm mt-2">
                {item.overview}
              </p>
              <div className="card-actions mt-4">
                <Link to={`/detail/${item.id}`}>
                  <Button className="btn btn-primary transition duration-300 ease-in-out transform hover:scale-105">
                    Detail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BerandaView;
