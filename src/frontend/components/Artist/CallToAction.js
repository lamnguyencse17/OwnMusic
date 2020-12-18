import React, { useState } from "react";
import { createPurchaseRequest } from "../../requests/purchase";

function CallToAction(props) {
  const { artist } = props;
  let [price, setPrice] = useState(1);
  const handlePurchase = async () => {
    const { status, message, purchase } = await createPurchaseRequest({
      musics: [],
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
    <div className="flex flex-row px-1 py-5 space-x-3">
      <div className="text-xl font-normal text-white">Price: </div>
      <input
        type="number"
        placeholder=""
        value={price}
        onChange={(event) => setPrice(parseInt(event.target.value))}
      ></input>
      <button
        className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
        style={{ backgroundColor: "rgb(184, 151, 119)" }}
        onClick={handlePurchase}
      >
        Support Now!
      </button>
    </div>
  );
}

export default CallToAction;
