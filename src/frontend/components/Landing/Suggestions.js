import React from "react";
import SuggestionCard from "../common/SuggestionCard";

export default function Suggestions() {
  // This mock is where you get data and pass in Suggestion Card
  const mock = [0, 1, 2, 3, 4];
  return (
    <div>
      <h3>Your Daily Suggestions</h3>
      <div className="grid grid-cols-5">
        {mock.map((data) => (
          <SuggestionCard key={data} />
        ))}
      </div>
    </div>
  );
}
