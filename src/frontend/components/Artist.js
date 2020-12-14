import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistRequest } from "../requests/artist";
import Cover from "./Artist/Cover";
import ArtistInfo from "./Artist/Info";
import MusicList from "./Artist/MusicList";
import Suggestions from "./Landing/Suggestions";

export default function Artist(props) {
  let artistInfo;
  const { artistId } = useParams();
  let [artist, setArtist] = useState(props.location.state);
  let [error, setError] = useState("");
  useEffect(() => {
    if (
      artist === undefined ||
      artist.musics.length === 0 ||
      typeof artist.musics[0] !== "object"
    ) {
      (async () => {
        const { status, message, artist } = await getArtistRequest(artistId);
        if (!status) {
          setError(message);
          return;
        }
        setArtist(artist);
      })();
    }
  });
  if (artist !== undefined) {
    artistInfo = { ...artist };
    delete artistInfo.musics;
  }
  return (
    <div style={{ backgroundColor: "#494949" }}>
      {artist === undefined ? (
        <></>
      ) : (
        <div className="container py-10 mx-auto">
          {error === "" ? <></> : <h3>{error}</h3>}
          <Cover coverURL={artist.coverURL} />
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <MusicList musics={artist.musics} />
            </div>
            <div className="col-span-1">
              <ArtistInfo {...artistInfo} />
            </div>
          </div>
          <Suggestions />
        </div>
      )}
    </div>
  );
}
