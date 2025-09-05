import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>AHOJ - test funguje!</div>} />
        <Route path="/login" element={<div>Login stránka</div>} />
      </Routes>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="p-2 bg-gray-200 flex gap-4">
      <Link to="/">Zápasy</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}
