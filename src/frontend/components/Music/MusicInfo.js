import React from "react";
import { Link } from "react-router-dom";

function MusicInfo(props) {
  const { name, description, artist } = props;
  return (
    <div className="flex-row items-center content-center px-1">
      <div className="text-3xl font-semibold text-white">{name}</div>
      <div className="text-xl font-normal text-white">{description}</div>
      <hr></hr>
      <div className="py-2">
        <img src={artist.coverURL} className="w-full mx-auto" />
      </div>

      <Link to={{ pathname: `/artist/${artist._id}`, state: { ...artist } }}>
        <div className="text-3xl font-semibold text-white">
          By {artist.name}
        </div>
      </Link>
      <div className="text-xl font-normal text-white">{artist.description}</div>
    </div>
  );
}

export default MusicInfo;
