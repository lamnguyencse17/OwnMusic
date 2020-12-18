import React, { useEffect, useState } from "react";
import { getMusicSuggestions } from "../../requests/music";
import SuggestionCard from "../common/SuggestionCard";

export default function Suggestions() {
  let [error, setError] = useState("");
  let [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    (async () => {
      const { status, suggestions, message } = await getMusicSuggestions();
      if (!status) {
        setError(message);
      }
      setSuggestion(suggestions);
    })();
  }, []);
  return (
    <div>
      <div className="py-5 text-2xl text-white">Your Daily Suggestions</div>
      {error === "" ? <></> : <h3>error</h3>}
      <div className="grid grid-cols-5">
        {suggestion.map((music) => (
          <SuggestionCard key={music._id} {...music} />
        ))}
      </div>
    </div>
  );
}
