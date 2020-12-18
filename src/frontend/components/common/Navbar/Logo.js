import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <img
          src="https://github.com/lamnguyencse17/OwnMusic/blob/main/public/logo.png?raw=true"
          className="lg:h-24"
        />
      </Link>
    </div>
  );
}
