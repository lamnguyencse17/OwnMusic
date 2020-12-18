import React from "react";
import CallToAction from "./CallToAction";

function ArtistInfo(props) {
  const { name, description, _id } = props;
  return (
    <div>
      <div className="text-3xl font-semibold text-white">{name}</div>
      <div className="text-xl font-normal text-white">{description}</div>
      <CallToAction artist={_id} />
    </div>
  );
}

export default ArtistInfo;
