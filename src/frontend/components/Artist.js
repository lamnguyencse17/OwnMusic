import React from "react";
import Cover from "./Artist/Cover";
import ArtistInfo from "./Artist/Info";
import MusicList from "./Artist/MusicList";

export default function Artist() {
  return (
    <div style={{ backgroundColor: "#494949" }}>
      <div className="container mx-auto">
          <Cover/>
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <MusicList/>
            </div>
            <div className="col-span-1">
              <ArtistInfo/>
            </div>
          </div>
      </div>
    </div>
  );
}
