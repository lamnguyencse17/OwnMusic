import React from "react";
import MusicCardDashboard from "./MusicCardDashboard";

export default function MusicListDashboard(props) {
  const { musics } = props;
  return (
    <div className="px-5">
      {musics.length === 0 ? (
        <></>
      ) : (
        <>
          <ul className="px-0 py-10">
            {musics.map((music) => (
              <MusicCardDashboard {...music} key={music._id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
