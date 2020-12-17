import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const userId = useSelector((state) => state.user._id);
  return (
    <div className="space-x-3">
      {userId === "" ? (
        <>
          {" "}
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </>
      ) : (
        <Link to="/logout">Logout</Link>
      )}
    </div>
  );
}
