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
      <h3>Your Daily Suggestions</h3>
      {error === "" ? <></> : <h3>error</h3>}
      <div className="grid grid-cols-5">
        {suggestion.map((music) => (
          <SuggestionCard key={music._id} {...music} />
        ))}
      </div>
    </div>
  );
}
