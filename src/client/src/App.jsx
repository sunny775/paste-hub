import React from "react";
import "./App.css";

//import { CodeEditor } from "./components/editor";
import SinglePasteWithComments from "./components/routes/SinglePaste";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>PASTE-HUB!</p>
        <SinglePasteWithComments />

        <div className="container"></div>
      </header>
    </div>
  );
}

export default App;
