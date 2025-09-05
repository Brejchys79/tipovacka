import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import useAdmin from "./hooks/useAdmin";

// stránky
import Login from "./pages/Login";
import Zapasy from "./pages/Zapasy";
import Zebricek from "./pages/Zebricek";
import PrehledTipu from "./pages/PrehledTipu";
import PridatZapas from "./pages/PridatZapas";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Zapasy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/zebricek" element={<Zebricek />} />
          <Route path="/prehled" element={<PrehledTipu />} />
          <Route path="/pridat" element={<AdminRoute><PridatZapas /></AdminRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function Navbar() {
  const isAdmin = useAdmin();

  return (
    <nav className="p-2 bg-gray-200 flex gap-4">
      <Link to="/">Zápasy</Link>
      <Link to="/zebricek">Žebříček</Link>
      <Link to="/prehled">Přehled tipů</Link>
      {isAdmin && (
        <>
          <Link to="/pridat">Přidat zápas</Link>
          <Link to="/admin">Admin</Link>
        </>
      )}
      <Link to="/login">Login</Link>
    </nav>
  );
}

// komponenta která hlídá admina
function AdminRoute({ children }) {
  const isAdmin = useAdmin();
  if (!isAdmin) return <p className="p-4">Přístup jen pro adminy.</p>;
  return children;
}
