import React from "react";
import Logo from "./Navbar/Logo";
import Nav from "./Navbar/Nav";

export default function Navbar() {
  return (
    <div
      className="overflow-hidden md:items-center md:content-center md:grid md:grid-cols-12 md:h-16"
      style={{ backgroundColor: "#b89777" }}
    >
      <div className="lg:col-span-2">
        <Logo />
      </div>
      <div className="lg:col-span-8"></div>
      <div className="lg:col-span-2">
        <Nav />
      </div>
    </div>
  );
}
