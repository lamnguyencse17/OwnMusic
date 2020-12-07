import React from "react";
import MusicCard from "./MusicCard";

const list = [1,2,3,4];

function MusicList(props) {
  return (
    <div className="grid grid-cols-2">
      {list.map((card, index) => <MusicCard key={index}/>)}
    </div>
  );
}

export default MusicList;