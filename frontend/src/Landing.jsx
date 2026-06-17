import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#071018",
        color: "#e6eef8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: 0, fontSize: "36px", color: "#fff" }}>GraphMD</h1>
        <p style={{ marginTop: 8, color: "#cbd6e3" }}>
          Welcome — select a widget to continue.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link
          to="/viewer"
          className="widget-card"
          aria-label="Open viewer"
          style={{
            background: "#0b1220",
            border: "1px solid #1f2937",
            color: "#e6eef8",
            padding: 20,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          <h3 style={{ margin: 0 }}>Protein / Ligand Viewer</h3>
          <p style={{ marginTop: 8, color: "#cbd6e3" }}>
            Open the 3D structure viewer with atom table.
          </p>
        </Link>

        <Link
          to="/history"
          className="widget-card"
          aria-label="History"
          style={{
            background: "#0b1220",
            border: "1px solid #1f2937",
            color: "#e6eef8",
            padding: 20,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          <h3 style={{ margin: 0 }}>History</h3>
          <p style={{ marginTop: 8, color: "#cbd6e3" }}>
            View previous analyses and logs.
          </p>
        </Link>

        <Link
          to="/predictions"
          className="widget-card"
          aria-label="Predictions"
          style={{
            background: "#0b1220",
            border: "1px solid #1f2937",
            color: "#e6eef8",
            padding: 20,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          <h3 style={{ margin: 0 }}>Predictions</h3>
          <p style={{ marginTop: 8, color: "#cbd6e3" }}>
            Run model predictions (ML API) — coming soon.
          </p>
        </Link>
      </div>
    </div>
  );
}
