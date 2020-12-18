import React from "react";
import MusicCard from "./MusicCard";

function MusicList(props) {
  const { musics } = props;
  return (
    <div className="grid grid-cols-5">
      {musics.map((music, index) => (
        <MusicCard key={index} {...music} />
      ))}
    </div>
  );
}

export default MusicList;
