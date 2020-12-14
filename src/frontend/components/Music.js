import React, { useEffect, useState } from "react";
import Cover from "./Music/Cover";
import Suggestions from "./Landing/Suggestions";
import MusicInfo from "./Music/MusicInfo";
import DemoPlayer from "./Music/Demo";
import CallToAction from "./Music/CallToAction";
import { useParams } from "react-router-dom";
import { getMusicRequest } from "../requests/music";

function Music(props) {
  const { musicId } = useParams();
  let [music, setMusic] = useState(props.location.state);
  let [error, setError] = useState("");
  useEffect(() => {
    if (music === undefined) {
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
            <Cover />
            <div className="grid grid-cols-4 py-5">
              <div className="col-span-3">
                <DemoPlayer demoURL={music.demoURL} />
              </div>
              <div className="col-span-1">
                <MusicInfo
                  artist={music.artist}
                  name={music.name}
                  description={music.description}
                />
                <CallToAction price={music.price} _id={music._id} />
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
