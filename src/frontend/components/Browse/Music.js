import React, { useEffect, useState } from "react";
import { getMusicByPageRequest } from "../../requests/music";
import MusicCard from "./MusicCard";

export default function Music() {
  const initialControl = { offset: 0, limit: 5 };
  const [controls, setControl] = useState(initialControl);
  const [musicContent, setContent] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      const { status, music, message } = await getMusicByPageRequest(controls);
      if (!status) {
        setError(message);
        return;
      }
      if (music.length === 0) {
        setError("No More Results");
        setControl({ ...initialControl });
        return;
      }
      setContent(music);
    })();
  }, [controls]);
  return (
    <div className="container mx-auto">
      {error === "" ? <></> : <h3>{error}</h3>}
      {musicContent.length === 0 ? (
        <></>
      ) : (
        <>
          <ul className="px-0 py-10">
            {musicContent.map((music) => (
              <MusicCard {...music} key={music._id} />
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
