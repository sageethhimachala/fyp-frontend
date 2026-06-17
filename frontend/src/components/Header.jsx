import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const current = location.pathname || "/";

  const baseLink = { textDecoration: "none", fontSize: 16 };
  const linkStyle = (path, color) => ({
    ...baseLink,
    color,
    opacity: current === path ? 1 : 0.6,
    shadow: current === path ? "0 0 10px rgba(255,255,255,0.2)" : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
        background: "#0a0f12",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: 1.5,
            color: "#c6f7ff",
          }}
        >
          GraphMD
        </div>
        <nav
          style={{
            display: "flex",
            gap: 22,
            marginLeft: 100,
            fontSize: 16,
            alignItems: "center",
          }}
        >
          <Link to="/" style={linkStyle("/", "#9cd6e6")}>
            DASHBOARD
          </Link>
          <Link to="/viewer" style={linkStyle("/viewer", "#9cd6e6")}>
            VIEW
          </Link>
          <Link to="/predictions" style={linkStyle("/predictions", "#9cd6e6")}>
            ANALYSIS
          </Link>
          <Link to="/history" style={linkStyle("/history", "#9cd6e6")}>
            HISTORY
          </Link>
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <input
          placeholder="QUERY SEQUENCES..."
          style={{
            background: "#071018",
            border: "1px solid #142128",
            color: "#9fd5e9",
            padding: "8px 12px",
            borderRadius: 6,
            outline: "none",
          }}
        />
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "#071018",
            border: "1px solid #142128",
          }}
        />
      </div>
    </div>
  );
}
