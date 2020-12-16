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
    <div className="container mx-auto">
      {error === "" ? <></> : <h3>{error}</h3>}
      {artistContent.length === 0 ? (
        <></>
      ) : (
        <>
          <ul className="px-0 py-10">
            {artistContent.map((artist) => (
              <ArtistCard {...artist} key={artist._id} />
            ))}
          </ul>
          <button
            className="bg-gray-300"
            onClick={() =>
              setControl({
                offset: controls.offset + controls.limit,
                limit: 5,
              })
            }
          >
            Next Page
          </button>
        </>
      )}
    </div>
  );
}
