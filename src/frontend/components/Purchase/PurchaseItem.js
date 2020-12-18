import React from "react";
import { Link } from "react-router-dom";
import DemoPlayer from "../Music/Demo";

export default function PurchaseItem(props) {
  return (
    <li
      className="grid px-3 py-3 list-none border rounded-sm md:grid-cols-12 sm:grid-cols-1"
      style={{ backgroundColor: "#b89777" }}
    >
      {props._id !== undefined ? (
        <>
          <div className="px-2 md:col-span-2">
            <img src={props.coverURL} />
          </div>
          <div
            className="border md:flex md:items-center md:content-center md:p-2 sm:mx-2 md:col-span-10"
            style={{ borderColor: "#494949" }}
          >
            <div>
              <Link to={`/music/${props._id}`}>
                <div className="text-3xl font-semibold text-white">
                  {props.name}
                </div>
              </Link>
              <Link to={`/artist/${props.artist._id}`}>
                <div className="text-xl font-normal text-white">
                  By: {props.artist.name}
                </div>
              </Link>
              <div className="text-xl font-normal text-white">
                Price: {props.price}
              </div>
              {props.downloadURL === undefined ? (
                <div className="text-xl font-normal text-white">
                  Purchase is cancelled or pending
                </div>
              ) : (
                <></>
              )}
              <br />
              <div className="text-xl font-normal text-white">
                {props.description}
              </div>
              {props.downloadURL !== undefined ? (
                <>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={props.downloadURL}
                    className="text-xl font-normal text-white underline"
                  >
                    Download URL
                  </a>
                  <br />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="w-1/2 h-full px-5 py-2">
              <DemoPlayer demoURL={props.demoURL} />
            </div>
          </div>
        </>
      ) : (
        <div
          className="border md:p-2 sm:mx-2 md:col-span-12"
          style={{ borderColor: "#494949" }}
        >
          <Link to={`/artist/${props.artist._id}`}>
            <div className="text-3xl font-semibold text-white">
              Support To Artist: {props.artist.name}
            </div>
          </Link>
          <div className="text-xl font-normal text-white">
            Price: {props.price}
          </div>
        </div>
      )}
    </li>
  );
}
