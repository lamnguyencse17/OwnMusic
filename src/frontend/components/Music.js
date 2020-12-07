import React from "react";
import Cover from "./Music/Cover";
import Suggestions from "./Landing/Suggestions";
import MusicInfo from "./Music/MusicInfo";
import DemoPlayer from "./Music/Demo";
import CallToAction from "./Music/CallToAction";

function Music(props) {
  return (
    <div style={{ backgroundColor: "#494949" }}>
      <div className="container mx-auto">
        <div className="mb-10">
          <Cover/>
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <DemoPlayer/>
            </div>
            <div className="col-span-1">
              <MusicInfo/>
            </div>
          </div>
          <CallToAction/>
        </div>
        <Suggestions/>
      </div>
    </div>
  );
}

export default Music;