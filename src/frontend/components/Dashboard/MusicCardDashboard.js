import React from "react";
import { Link } from "react-router-dom";

export default function MusicCardDashboard(props) {
  return (
    <li className="grid grid-cols-12 list-none border-gray-200 rounded-3xl bg-white m-3">
      <div className="col-span-4 bg-opacity-10 rounded-lg p-1">
        <img src={props.coverURL} className="rounded-3xl"/>
      </div>
      <div className="col-span-6 ml-4 p-4">
        <Link className="text-3xl italic font-mono text-yellow-600 font-medium" to={`/music/${props._id}`}>{props.name}</Link>
        <br />
        <div className="container italic font-mono font-medium ml-5 p-2 ">
        <p>{props.description}</p>
        </div>
        <div className="container font-mono pt-1 text-yellow-600">
        <a className="font-mono font-medium" href={props.downloadURL}>Download URL</a>
        </div>
        <div className="container font-mono pt-1 text-yellow-600">
        <a href={props.demoURL}>Demo URL</a>
        </div>
        <br />

      </div>
    </li>
  );
}
