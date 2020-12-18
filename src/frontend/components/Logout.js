import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../actions/user";
import { logOutRequest } from "../requests/user";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const loggedOut = await logOutRequest();
        if (loggedOut) {
          dispatch(clearUser());
        }
      }, 2000);
    })();
  });
  return (
    <div className="container mx-auto">
      <div className="loader"></div>
    </div>
  );
}
