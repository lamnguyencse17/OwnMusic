import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="space-x-3">
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </div>
  );
}
