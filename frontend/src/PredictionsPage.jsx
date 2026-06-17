import React, { useState } from "react";

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const runDummyPrediction = async () => {
    setLoading(true);
    setResult(null);
    // Placeholder: in future call real ML API
    await new Promise((r) => setTimeout(r, 700));
    setResult({ score: Math.random().toFixed(3), label: "OK" });
    setLoading(false);
  };

  return (
    <div>
      <h2>Predictions</h2>
      <p>This widget will call an ML API to compute predictions.</p>
      <div style={{ margin: "12px 0" }}>
        <button onClick={runDummyPrediction} disabled={loading}>
          {loading ? "Running…" : "Run prediction (dummy)"}
        </button>
      </div>
      {result && (
        <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
          <strong>Result:</strong>
          <div>Label: {result.label}</div>
          <div>Score: {result.score}</div>
        </div>
      )}
    </div>
  );
}
