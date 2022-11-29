import * as React from "react";
import { render } from "react-dom";

import Items from "./Items";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>La vida según Rafa</h1>
      <Items />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
