import React from "react";

function MusicCard(props) {
  return (
    <div
      className="overflow-hidden rounded-lg lg:w-5/6 my-5"
      style={{ backgroundColor: "#e6dbcf" }}
    >
      <img
        className="w-full"
        src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
      </div>
    </div>
  );
}

export default MusicCard;