import React from "react";
import { Link } from "react-router-dom";

function MusicCard(props) {
  const { coverURL, _id, name, description } = props;
  return (
    <div
      className="my-5 overflow-hidden rounded-lg lg:w-5/6"
      style={{ backgroundColor: "#e6dbcf" }}
    >
      <img className="w-full" src={coverURL} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <Link to={`/music/${_id}`}>{name}</Link>
          <h3>{description}</h3>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
