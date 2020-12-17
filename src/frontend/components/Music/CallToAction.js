import React from "react";
import { createPurchaseRequest } from "../../requests/purchase";

function CallToAction(props) {
  const { _id, price, artist } = props;
  const handlePurchase = async () => {
    await createPurchaseRequest({ musics: [_id], artist, amount: price });
  };
  return (
    <div>
      <h1>Price: {price}</h1>
      <button className="w-20 h-10 bg-white" onClick={handlePurchase}>
        Buy Now!
      </button>
    </div>
  );
}

export default CallToAction;
