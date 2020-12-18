import React from "react";

export default function Cover(props) {
  return (
    <div className="w-full">
      <img src={props.coverURL} />
    </div>
  );
}
