import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const [pdbId, setPdbId] = useState(null);
  const [smiles, setSmiles] = useState(null);
  const [virtualScreening, setVirtualScreening] = useState(false);
  const [forceChirality, setForceChirality] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  //dummy function to simulate a prediction run (for testing purposes)
  const runDummyPrediction = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 700));
    const score = Math.random().toFixed(3);
    const affinity = (-(5 + Math.random() * 7)).toFixed(2); // kcal/mol (negative is stronger)
    const stability = (Math.random() * 1.5 + 0.05).toFixed(3); // RMSE (lower is better)
    const label = Number(score) > 0.5 ? "OK" : "LOW";
    setResult({ label, score, affinity, stability, pdbId });
    setLoading(false);
  };

  const sendToBackend = async () => {
    setSending(true);
    setResult(null);
    try {
      // Build form data (placeholder). Replace URL with your backend endpoint.
      const form = new FormData();
      form.append("pdbId", pdbId);
      form.append("smiles", smiles);

      // Simulate network delay and response for now
      await new Promise((r) => setTimeout(r, 900));
      // Example fetch (commented out until real endpoint exists)
      // const resp = await fetch('/api/predict', { method: 'POST', body: form });
      // const data = await resp.json();

      // Dummy response
      const score = Math.random().toFixed(3);
      const affinity = (-(5 + Math.random() * 7)).toFixed(2);
      const stability = (Math.random() * 1.5 + 0.05).toFixed(3);
      const label = Number(score) > 0.5 ? "OK" : "LOW";
      const data = { label, score, affinity, stability, pdbId };
      setResult(data);
    } catch (err) {
      setResult({ label: "ERROR", score: "-" });
    } finally {
      setSending(false);
    }
  };

  const containerStyle = {
    background: "#071018",
    color: "#e6eef8",
    padding: 20,
    borderRadius: 8,
    position: "relative",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    border: "1px solid #122126",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    background: "#071722",
  };

  const stepLabel = (n, title) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          background: "#0f3650",
          color: "#9fe7ff",
          padding: "4px 8px",
          borderRadius: 4,
          fontSize: 12,
        }}
      >
        STEP {n}
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
    </div>
  );

  return (
    <div style={{ ...containerStyle }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: 18 }}>
        <div>
          <p
            style={{
              color: "#cbd6e3",
              marginTop: 0,
              marginBottom: 20,
              textTransform: "uppercase",
              fontSize: 15,
            }}
          >
            ENTER TARGET PROTEIN AND LIGAND IDENTIFIERS TO PREDICT BINDING
            AFFINITY.
          </p>

          <div style={cardStyle}>
            {stepLabel("01", "Target Protein")}
            <div
              style={{
                marginTop: 10,
                color: "#bcd3df",
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              ENTER THE PROTEIN STRUCTURE USING A PDB IDENTIFIER.
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                placeholder="PDB ID (e.g., 6LU7)"
                value={pdbId}
                onChange={(e) => setPdbId(e.target.value)}
                style={{
                  width: "50%",
                  background: "#071722",
                  color: "#dbeaf6",
                  border: "1px solid #15303a",
                  padding: 8,
                  borderRadius: 6,
                }}
              />
            </div>
          </div>

          <div style={cardStyle}>
            {stepLabel("02", "Ligand Selection")}
            <div
              style={{
                marginTop: 10,
                color: "#bcd3df",
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              ENTER THE LIGAND USING ITS IDENTIFIER FROM THE TARGET STRUCTURE.
            </div>

            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                placeholder="Ligand ID (e.g., ATP)"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                style={{
                  width: "50%",
                  background: "#071722",
                  color: "#dbeaf6",
                  border: "1px solid #15303a",
                  padding: 8,
                  borderRadius: 6,
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
              justifyContent: "center",
            }}
          >
            <button
              onClick={sendToBackend}
              disabled={sending}
              style={{
                marginTop: 8,
                width: "50%",
                padding: "12px 10px",
                background: "#10b5b0",
                color: "#00292b",
                fontWeight: 700,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {sending ? "AWAITING RESPONSE" : "PREDICT BINDING AFFINITY"}
            </button>
          </div>

          {result && (
            <div
              style={{
                marginTop: 14,
                padding: 14,
                borderRadius: 10,
                background: "linear-gradient(180deg,#071722,#031017)",
                border: "1px solid rgba(35,48,58,0.6)",
                boxShadow: "0 6px 18px rgba(3,10,16,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{ color: "#9fc7dd", fontWeight: 800, fontSize: 13 }}
                >
                  Prediction Result
                </div>

                <div style={{ fontSize: 13, color: "#cfeffb" }}>
                  <strong style={{ color: "#9fe7ff" }}>PDB:</strong>{" "}
                  {result.pdbId || pdbId || "—"}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      fontWeight: 800,
                      fontSize: 13,
                      color: result.label === "OK" ? "#00292b" : "#fff",
                      background: result.label === "OK" ? "#10b5b0" : "#e11d48",
                    }}
                  >
                    {result.label}
                  </div>

                  <div style={{ color: "#cfeffb", fontSize: 13 }}>
                    {result.label === "OK"
                      ? "Predicted binder — review affinity & stability"
                      : "Low confidence prediction — consider re-running"}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 220,
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{ color: "#9fe7ff", fontSize: 22, fontWeight: 900 }}
                >
                  {result.score}
                </div>
                <div style={{ color: "#9fbcc9", fontSize: 12 }}>
                  Binding score
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color: "#cfeffb",
                        fontSize: 15,
                        fontWeight: 800,
                      }}
                    >
                      {result.affinity} kcal/mol
                    </div>
                    <div style={{ color: "#9fbcc9", fontSize: 12 }}>
                      Affinity
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        color: "#cfeffb",
                        fontSize: 15,
                        fontWeight: 800,
                      }}
                    >
                      {result.stability}
                    </div>
                    <div style={{ color: "#9fbcc9", fontSize: 12 }}>
                      Stability (RMSE)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div
            style={{
              border: "1px solid #122126",
              borderRadius: 8,
              padding: 14,
              background: "#071722",
              textAlign: "center",
            }}
          >
            <div style={{ color: "#9fc7dd", fontWeight: 700, marginBottom: 8 }}>
              PREVIEW RENDER
            </div>
            <div
              style={{
                height: 140,
                background: "linear-gradient(135deg,#07212a,#0c2730)",
                borderRadius: 6,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#95d3e8",
              }}
            >
              WAITING FOR UPLOAD
            </div>

            <div style={{ textAlign: "left", color: "#bcd3df", fontSize: 13 }}>
              <div style={{ marginBottom: 6 }}>
                <strong>COMPUTE BUDGET</strong>
                <div style={{ color: "#9fbcc9" }}>12.5 TFLOPS</div>
              </div>
              <div style={{ marginBottom: 6 }}>
                <strong>EST. TIME</strong>
                <div style={{ color: "#9fbcc9" }}>14m 22s</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <strong>SOLVENT MODEL</strong>
                <div style={{ color: "#9fbcc9" }}>TIP3P (Explicit)</div>
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/viewer", {
                  state: { pdbId, smiles, virtualScreening, forceChirality },
                })
              }
              style={{
                marginTop: 8,
                width: "100%",
                padding: "12px 10px",
                background: "#10b5b0",
                color: "#00292b",
                fontWeight: 700,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
              }}
            >
              LAUNCH SIMULATION
            </button>
          </div>
        </div>
      </div>

      {sending && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(4,10,14,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <div style={{ textAlign: "center", color: "#cfeffb" }}>
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              AWAITING PREDICTION RESULTS...
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                border: "4px solid #16323a",
                borderTopColor: "#57d1ff",
                margin: "0 auto",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
