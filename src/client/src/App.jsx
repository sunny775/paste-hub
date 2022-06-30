import React from "react";
import "./App.css";

import SinglePasteWithComments from "./components/routes/SinglePaste";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div>PASTE-HUB!</div>
      </header>
      <SinglePasteWithComments />
    </div>
  );
}

export default App;
