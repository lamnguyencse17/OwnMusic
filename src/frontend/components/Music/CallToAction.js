import React from "react";

function CallToAction(props) {
  const { _id, price } = props;
  return (
    <div>
      <h1>Price: {price}</h1>
      <button className="w-20 h-10 bg-white">Buy Now!</button>
    </div>
  );
}

export default CallToAction;
