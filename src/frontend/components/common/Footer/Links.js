import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Links() {
  const userId = useSelector((state) => state.user._id);
  return (
    <div className="flex flex-col">
      {userId === "" ? (
        <>
          <Link to="/register/artist">Register As Artist</Link>
          <Link to="/login/artist">Log In As Artist</Link>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
