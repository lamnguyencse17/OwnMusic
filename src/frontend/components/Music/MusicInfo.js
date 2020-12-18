import React from "react";
import { Link } from "react-router-dom";

function MusicInfo(props) {
  console.log(props);
  const { name, description, artist } = props;
  return (
    <div>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <hr></hr>
      <h1>Artist</h1>
      <img src={artist.coverURL} />
      <h2>
        <Link to={{ pathname: `/artist/${artist._id}`, state: { ...artist } }}>
          {artist.name}
        </Link>
      </h2>
      <h2>{artist.description}</h2>
    </div>
  );
}

export default MusicInfo;
