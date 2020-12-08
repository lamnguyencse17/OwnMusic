import React from "react";
import ReactPlayer from "react-player/lazy";

function DemoPlayer(props) {
  return (
    <div>
      <ReactPlayer
        url="https://raw.githubusercontent.com/lamnguyencse17/OwnMusic/main/One%20Way.mp3"
        controls={true}
      />
    </div>
  );
}

export default DemoPlayer;
