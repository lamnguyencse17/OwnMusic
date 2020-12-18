import React from "react";
import { Link } from "react-router-dom";

export default function PurchaseItem(props) {
  return (
    <li className="grid grid-cols-12 px-3 py-3 list-none border rounded-sm">
      <div className="col-span-1">
        <img src={props.coverURL} />
      </div>
      <div className="col-span-11">
        <Link to={`/music/${props._id}`}>Name: {props.name}</Link>
        <br />
        <Link to={`/artist/${props.artist._id}`}>
          Artist: {props.artist.name}
        </Link>
        <br />
        <p>Description: {props.description}</p>
        <a href={props.downloadURL}>Download URL</a>
        <br />
        <a href={props.demoURL}>Demo URL</a>
      </div>
    </li>
  );
}
