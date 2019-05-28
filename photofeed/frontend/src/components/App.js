import React from "react";
import ReactDOM from "react-dom";

import Feed from "./Feed"

const App = () => (
  <div><Feed endpoint="/api/feed/"/></div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;