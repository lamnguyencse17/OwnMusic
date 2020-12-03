import React from "react";

export default function SuggestionCard(props) {
  return (
    <div
      className="overflow-hidden rounded-lg lg:w-5/6"
      style={{ backgroundColor: "#e6dbcf" }}
    >
      <img
        className="w-full"
        src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p className="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
}
