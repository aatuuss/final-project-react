import React from "react";
import { Link } from "react-router-dom";

export default function FilmCard({ title, overview, id }) {
  try {
    return (
      <Link to={`/detail/${id}`}>
        <div className="flex transition-all hover:scale-[1.05] border-[1px] border-gray-400 rounded-xl p-4 flex-col space-y-1">
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="line-clamp-2 text-sm w-full">{overview}</p>
        </div>
      </Link>
    );
  } catch (error) {
    console.log(error);
  }
}
