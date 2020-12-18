import React from "react";
import ReactPlayer from "react-player/lazy";

function DemoPlayer(props) {
  return (
    <ReactPlayer
      url={props.demoURL}
      controls={true}
      width="100%"
      height="100%"
    />
  );
}

export default DemoPlayer;
