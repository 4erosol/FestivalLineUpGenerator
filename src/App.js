import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./home.css";
import Festival from "./Festival";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/festival" element={<Festival />} />
      <Route index element={<Home />} />
    </Routes>
  );
}
export default App;
