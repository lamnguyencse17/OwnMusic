import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const { _id, type } = useSelector((state) => state.user);
  return (
    <div className="space-x-3">
      {_id === "" ? (
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
        <>
          {type !== "artist" ? <></> : <Link to="/dashboard">Dashboard</Link>}
          {type !== "user" ? <></> : <Link to="/purchases">Purchases</Link>}
          <Link to="/logout">Logout</Link>
        </>
      )}
    </div>
  );
}
