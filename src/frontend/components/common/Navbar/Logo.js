import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="px-2">
      <Link to="/">
        <img
          src="https://github.com/lamnguyencse17/OwnMusic/blob/main/public/logo.png?raw=true"
          className="py-2 lg:h-12"
        />
      </Link>
    </div>
  );
}
