import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const [pdbId, setPdbId] = useState("");
  const [fileName, setFileName] = useState("");
  const [smiles, setSmiles] = useState("");
  const [virtualScreening, setVirtualScreening] = useState(false);
  const [forceChirality, setForceChirality] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const runDummyPrediction = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 700));
    setResult({ score: Math.random().toFixed(3), label: "OK" });
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFileName(f ? f.name : "");
  };

  const sendToBackend = async () => {
    setSending(true);
    setResult(null);
    try {
      // Build form data (placeholder). Replace URL with your backend endpoint.
      const form = new FormData();
      form.append("pdbId", pdbId);
      form.append("smiles", smiles);
      form.append("virtualScreening", virtualScreening);
      form.append("forceChirality", forceChirality);
      if (fileRef.current && fileRef.current.files[0]) {
        form.append("structure", fileRef.current.files[0]);
      }

      // Simulate network delay and response for now
      await new Promise((r) => setTimeout(r, 900));
      // Example fetch (commented out until real endpoint exists)
      // const resp = await fetch('/api/predict', { method: 'POST', body: form });
      // const data = await resp.json();

      // Dummy response
      const data = { label: "OK", score: Math.random().toFixed(3) };
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
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
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
            Upload target structure and define ligand properties for docking.
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
              Upload structure or query by PDB identifier.
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                alignItems: "center",
              }}
            >
              <input
                placeholder="e.g. 10GS"
                value={pdbId}
                onChange={(e) => setPdbId(e.target.value)}
                style={{
                  background: "#0b1a20",
                  color: "#dbeaf6",
                  border: "1px solid #19303a",
                  padding: 8,
                  borderRadius: 4,
                }}
              />

              <div
                style={{
                  border: "1px dashed #21333a",
                  padding: 8,
                  borderRadius: 6,
                  color: "#9fbcc9",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdb,.mol2"
                  onChange={handleFileChange}
                />
                <div style={{ fontSize: 12 }}>
                  {fileName || "Drag or Browse .PDB / .MOL2"}
                </div>
              </div>
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
              Define small molecule properties for docking.
            </div>

            <div style={{ marginTop: 10 }}>
              <textarea
                placeholder="SMILES string / chemical notation"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  background: "#071722",
                  color: "#dbeaf6",
                  border: "1px solid #15303a",
                  padding: 8,
                  borderRadius: 6,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <label
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  color: "#bcd3df",
                }}
              >
                <input
                  type="checkbox"
                  checked={virtualScreening}
                  onChange={(e) => setVirtualScreening(e.target.checked)}
                />{" "}
                Enable Virtual Screening
              </label>
              <label
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  color: "#bcd3df",
                }}
              >
                <input
                  type="checkbox"
                  checked={forceChirality}
                  onChange={(e) => setForceChirality(e.target.checked)}
                />{" "}
                Force Chirality Match
              </label>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              onClick={runDummyPrediction}
              disabled={loading}
              style={{
                padding: "10px 14px",
                background: "#0f5a8a",
                color: "#fff",
                borderRadius: 6,
                border: "none",
              }}
            >
              {loading ? "Running…" : "Run prediction (dummy)"}
            </button>

            <button
              onClick={sendToBackend}
              disabled={sending}
              style={{
                padding: "10px 14px",
                background: "#1b7bb0",
                color: "#fff",
                borderRadius: 6,
                border: "none",
              }}
            >
              {sending ? "Sending…" : "Send to backend"}
            </button>
          </div>

          {result && (
            <div
              style={{
                marginTop: 12,
                border: "1px solid #23303a",
                padding: 12,
                borderRadius: 8,
                background: "#071722",
              }}
            >
              <strong>Result:</strong>
              <div>Label: {result.label}</div>
              <div>Score: {result.score}</div>
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
              Sending data to backend…
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
