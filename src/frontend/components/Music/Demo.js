import React from "react";
import ReactPlayer from "react-player/lazy";

function DemoPlayer(props) {
  return (
    <div>
      <ReactPlayer url={props.demoURL} controls={true} />
    </div>
  );
}

export default DemoPlayer;
