import React, { useEffect, useState } from "react";
import { getArtistByPageRequest } from "../../requests/artist";
import ArtistCard from "./ArtistCard";

export default function Artist() {
  const initialControl = { offset: 0, limit: 5 };
  const [controls, setControl] = useState(initialControl);
  const [artistContent, setContent] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      const { status, artist, message } = await getArtistByPageRequest(
        controls
      );
      if (!status) {
        setError(message);
        return;
      }
      if (artist.length === 0) {
        setError("No More Results");
        setControl({ ...initialControl });
        return;
      }
      setContent(artist);
    })();
  }, [controls]);
  return (
    <div className="container pb-5 mx-auto">
      {error === "" ? <></> : <h3>{error}</h3>}
      {artistContent.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-col items-center content-center ">
          <ul className="px-0 py-10">
            {artistContent.map((artist) => (
              <ArtistCard {...artist} key={artist._id} />
            ))}
          </ul>
          <div className="space-x-5">
            <button
              className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
              style={{ backgroundColor: "rgb(184, 151, 119)" }}
              onClick={() => {
                if (controls.offset - controls.limit > 0) {
                  setControl({
                    offset: controls.offset - controls.limit,
                    limit: 5,
                  });
                }
              }}
            >
              Previous Page
            </button>
            <button
              className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
              style={{ backgroundColor: "rgb(184, 151, 119)" }}
              onClick={() =>
                setControl({
                  offset: controls.offset + controls.limit,
                  limit: 5,
                })
              }
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
