import React from "react";
import Logo from "./Navbar/Logo";
import Nav from "./Navbar/Nav";
import SearchBar from "./Navbar/SearchBar";
import Slogan from "./Navbar/Slogan";

export default function Navbar() {
  return (
    <div
      className="grid grid-cols-2 lg:h-16"
      style={{ backgroundColor: "#b89777" }}
    >
      <Logo />
      <SearchBar />
      <Slogan />
      <Nav />
    </div>
  );
}
