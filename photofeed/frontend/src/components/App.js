import React from "react";
import ReactDOM from "react-dom";

import Feed from "./Feed/Feed"

const styles = {
  app: {
    width: '100%'
  }
}

const App = () => (
  <div style={styles.app}><Feed endpoint="/api/feed/"/></div>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;