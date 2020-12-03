import React from "react";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import Suggestions from "./Landing/Suggestions";

export default function Landing() {
  return (
    <div style={{ backgroundColor: "#494949" }}>
      <div className="container mx-auto my-10">
        <Suggestions />
      </div>
    </div>
  );
}
