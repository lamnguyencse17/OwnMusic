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
        <div className="py-10">
          <Cover/>
          <div className="grid grid-cols-4 py-5">
            <div className="col-span-3">
              <DemoPlayer/>
            </div>
            <div className="col-span-1">
              <MusicInfo/>
              <CallToAction/>
            </div>
          </div>
          <Suggestions/>
        </div>
      </div>
    </div>
  );
}

export default Music;