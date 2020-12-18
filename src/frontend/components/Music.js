import React, { useEffect, useState } from "react";
import Cover from "./Music/Cover";
import Suggestions from "./Landing/Suggestions";
import MusicInfo from "./Music/MusicInfo";
import DemoPlayer from "./Music/Demo";
import CallToAction from "./Music/CallToAction";
import { useParams } from "react-router-dom";
import { getMusicRequest } from "../requests/music";
import { useSelector } from "react-redux";

function Music(props) {
  const { musicId } = useParams();
  let [music, setMusic] = useState(props.location.state);
  let [error, setError] = useState("");
  const { _id, type } = useSelector((state) => state.user);
  useEffect(() => {
    if (music === undefined || music._id !== musicId) {
      (async () => {
        const { status, message, music } = await getMusicRequest(musicId);
        if (!status) {
          setError(message);
          return;
        }
        setMusic(music);
      })();
    }
  });
  return (
    <div style={{ backgroundColor: "#494949" }}>
      {music === undefined ? (
        <></>
      ) : (
        <div className="container mx-auto">
          {error === "" ? <></> : <h3>{error}</h3>}
          <div className="py-10">
            <Cover coverURL={music.coverURL} />
            <div className="grid py-5 md:grid-cols-4 sm:grid-cols-1">
              <div className="px-3 md:col-span-2">
                <DemoPlayer demoURL={music.demoURL} />
              </div>
              <div className="md:col-span-2">
                <MusicInfo
                  artist={music.artist}
                  name={music.name}
                  description={music.description}
                />
                {_id === "" || type === "artist" ? (
                  <></>
                ) : (
                  <CallToAction
                    price={music.price}
                    _id={music._id}
                    artist={music.artist._id}
                    amount={music.amount}
                  />
                )}
              </div>
            </div>
            <Suggestions />
          </div>
        </div>
      )}
    </div>
  );
}

export default Music;
