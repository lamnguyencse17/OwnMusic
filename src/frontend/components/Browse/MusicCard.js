import React from "react";
import { Link } from "react-router-dom";

export default function MusicCard(props) {
  return (
    <li className="grid grid-cols-12 px-3 py-3 list-none border rounded-sm">
      <div className="col-span-1">
        <img src={props.coverURL} />
      </div>
      <div className="col-span-11">
        <Link to={`/music/${props._id}`}>{props.name}</Link>
        <br />
        <Link to={`/artist/${props.artist._id}`}>{props.artist.name}</Link>
        <br />
        <p>{props.description}</p>
      </div>
    </li>
  );
}
