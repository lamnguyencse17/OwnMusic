import React, { useEffect, useState } from "react";
import { getUserPurchaseRequest } from "../requests/purchase";
import PurchaseItem from "./Purchase/PurchaseItem";

export default function Purchase() {
  const initialControl = { offset: 0, limit: 5 };
  const [controls, setControl] = useState(initialControl);
  const [error, setError] = useState("");
  let [purchases, setPurchases] = useState([]);
  useEffect(() => {
    (async () => {
      const { status, purchase, message } = await getUserPurchaseRequest(
        controls
      );
      if (!status) {
        setError(message);
        return;
      }
      if (purchase.length === 0) {
        setError("No More Results");
        setControl({ ...initialControl });
        return;
      }
      setPurchases(purchase);
    })();
  }, [controls]);
  return (
    <div className="container pb-5 mx-auto">
      {error === "" ? <></> : <h3>{error}</h3>}
      {purchases.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-col items-center content-center ">
          <ul className="px-0 py-10">
            {purchases.map((purchase) => {
              let musicData = purchase.musics[0];
              return (
                <PurchaseItem
                  key={purchase._id}
                  price={purchase.price}
                  {...musicData}
                  artist={purchase.artist}
                />
              );
            })}
          </ul>
          <div className="space-x-5">
            <button
              className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
              style={{ backgroundColor: "rgb(184, 151, 119)" }}
              onClick={() => {
                if (controls.offset - controls.limit > 0) {
                  setControl({
                    offset: controls.offset - controls.limit,
                    limit: 5,
                  });
                }
              }}
            >
              Previous Page
            </button>
            <button
              className="h-10 px-5 text-xl font-normal text-white rounded-md w-30"
              style={{ backgroundColor: "rgb(184, 151, 119)" }}
              onClick={() =>
                setControl({
                  offset: controls.offset + controls.limit,
                  limit: 5,
                })
              }
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
