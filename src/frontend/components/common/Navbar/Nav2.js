import React from "react";
import { Link } from "react-router-dom";

export default function Nav2() {
  return (
    <div className="flex-row mx-auto space-x-20">
      <Link to="/browse/musics">Music</Link>
      <Link to="/browse/artists">Artists</Link>
    </div>
  );
}
