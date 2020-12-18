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
      artist._id !== artistId ||
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
          <div className="grid grid-cols-5">
            <div className="col-span-1">
              <Cover coverURL={artist.coverURL} />
            </div>
            <div className="col-span-4 px-5">
              <ArtistInfo {...artistInfo} />
            </div>
          </div>

          <div>
            <MusicList musics={artist.musics} />
          </div>
          <Suggestions />
        </div>
      )}
    </div>
  );
}
