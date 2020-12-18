import React from "react";
import { Link } from "react-router-dom";

export default function ArtistCard(props) {
  return (
    <li
      className="grid px-3 py-3 list-none border rounded-sm md:grid-cols-12 sm:grid-cols-1"
      style={{ backgroundColor: "#b89777" }}
    >
      <div className="px-2 md:col-span-2">
        <img src={props.coverURL} className="mx-auto" />
      </div>
      <div
        className="border md:col-span-10 md:p-2 sm:mx-2"
        style={{ borderColor: "#494949" }}
      >
        <Link to={`/artist/${props._id}`}>
          <div className="text-3xl font-semibold text-white">{props.name}</div>
        </Link>
        <br />
        <div className="text-xl font-normal text-white">
          {props.description}
        </div>
      </div>
    </li>
  );
}
