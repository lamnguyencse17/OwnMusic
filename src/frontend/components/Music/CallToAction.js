import React, { useState } from "react";
import { createPurchaseRequest } from "../../requests/purchase";

function CallToAction(props) {
  const { _id, price, artist } = props;
  const handlePurchase = async () => {
    const { status, message, purchase } = await createPurchaseRequest({
      musics: [_id],
      artist,
      amount: price,
    });
    if (!status) {
      alert(message);
      return;
    }
    window.open(purchase.checkout_url);
  };
  return (
    <div className="px-1">
      <div className="text-xl font-normal text-white">Price: {price}</div>
      <button
        className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
        style={{ backgroundColor: "rgb(184, 151, 119)" }}
        onClick={handlePurchase}
      >
        Buy Now!
      </button>
    </div>
  );
}

export default CallToAction;
