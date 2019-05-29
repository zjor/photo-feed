import React from "react";
import ReactDOM from "react-dom";

import Feed from "./Feed"

const App = () => (
  <div style={{width: '100%'}}><Feed endpoint="/api/feed/"/></div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;