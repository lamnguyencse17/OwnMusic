import React from "react";
import { useSelector } from "react-redux";
import MusicForm from "./Dashboard/MusicForm";
import MusicListDashboard from "./Dashboard/MusicListDashboard";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="container grid grid-cols-3 mx-auto">
      <div className="col-span-2">
        <MusicListDashboard musics={user.musics} />
      </div>
      <div className="col-span-1">
        <MusicForm />
      </div>
    </div>
  );
}
