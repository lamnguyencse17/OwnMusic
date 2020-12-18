import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Artists from "./Browse/Artists";
import Music from "./Browse/Music";

export default function Browse(props) {
  const { path } = useRouteMatch();
  return (
    <div style={{ backgroundColor: "#494949" }}>
      <Route path={`${path}/music`} render={() => <Music {...props} />} />
      <Route path={`${path}/artists`} render={() => <Artists {...props} />} />
    </div>
  );
}
