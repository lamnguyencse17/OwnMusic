import React from "react";
import { Link } from "react-router-dom";

function MusicCard(props) {
  const { coverURL, _id, name, description } = props;
  return (
    <div
      className="my-5 overflow-hidden rounded-lg lg:w-5/6"
      style={{ backgroundColor: "#e6dbcf" }}
    >
      <img
        className="w-full overflow-hidden lg:h-48"
        src={coverURL}
        alt={description}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <Link to={`/music/${_id}`}>{name}</Link>
        </div>
        <p className="text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
}

export default MusicCard;
