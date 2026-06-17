import React from "react";
import { Link } from "react-router-dom";

export default function Landing({
  onOpenViewer,
  onOpenHistory,
  onOpenPredictions,
}) {
  return (
    <div className="landing">
      <div className="intro">
        <h1 style={{ margin: 0 }}>GraphMD</h1>
        <p style={{ marginTop: 8 }}>Welcome — select a widget to continue.</p>
      </div>

      <div className="widget-grid">
        <Link to="/viewer" className="widget-card" aria-label="Open viewer">
          <h3>Protein / Ligand Viewer</h3>
          <p>Open the 3D structure viewer with atom table.</p>
        </Link>

        <Link to="/history" className="widget-card" aria-label="History">
          <h3>History</h3>
          <p>View previous analyses and logs.</p>
        </Link>

        <Link
          to="/predictions"
          className="widget-card"
          aria-label="Predictions"
        >
          <h3>Predictions</h3>
          <p>Run model predictions (ML API) — coming soon.</p>
        </Link>
      </div>
    </div>
  );
}
