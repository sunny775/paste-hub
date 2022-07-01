import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, SingleSavedPaste } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <div>PASTE-HUB!</div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":hash" element={<SingleSavedPaste />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
