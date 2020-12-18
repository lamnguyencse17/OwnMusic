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
    <div>
      <h1>Price: {price}</h1>
      <button className="w-20 h-10 bg-white" onClick={handlePurchase}>
        Buy Now!
      </button>
    </div>
  );
}

export default CallToAction;
