import React from "react";
import About from "./Footer/About";
import Links from "./Footer/Links";

export default function Footer() {
  return (
    <div
      className="grid grid-cols-2 lg:h-16"
      style={{ backgroundColor: "#b89777" }}
    >
      <About />
      <Links />
    </div>
  );
}
