import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProteinLigandViewer from "./components/ProteinLigandViewer";
import { atomsToPDB } from "./components/atomsToPDB";

export default function PredictionsPage() {
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  const [pdbId, setPdbId] = useState(null);
  const [ligandCsv, setLigandCsv] = useState(null);
  const [ligandTxt, setLigandTxt] = useState(null);
  const [virtualScreening, setVirtualScreening] = useState(false);
  const [forceChirality, setForceChirality] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const previewHeight = 320;

  useEffect(() => {
    const id = pdbId ? pdbId.trim().toUpperCase() : "";
    if (id.length === 4) {
      setPreviewLoading(true);
      setPreviewError(null);
      fetch(`/${id}.json`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((d) => setPreviewData(d))
        .catch((err) => {
          console.error(err);
          setPreviewData(null);
          setPreviewError(err.message || "Failed to load preview");
        })
        .finally(() => setPreviewLoading(false));
    } else {
      setPreviewData(null);
      setPreviewError(null);
      setPreviewLoading(false);
    }
  }, [pdbId]);

  // derive preview PDB string and atoms/coordinates for rendering (use frame 0)
  const previewHasAtoms =
    previewData &&
    Array.isArray(previewData.atoms) &&
    previewData.atoms.length > 0;
  let previewPdbString = null;
  let previewAtoms = [];
  if (previewHasAtoms) {
    previewAtoms = previewData.atoms;
    const coords =
      previewData.md_frames && previewData.md_frames.length
        ? previewData.md_frames[0]
        : previewData.qm_coordinates || null;
    previewPdbString = atomsToPDB(
      previewAtoms.map((a, i) => ({
        ...a,
        x: coords ? coords[i][0] : a.x,
        y: coords ? coords[i][1] : a.y,
        z: coords ? coords[i][2] : a.z,
      })),
      coords,
    );
  }

  //dummy function to simulate a prediction run (for testing purposes)
  const runDummyPrediction = async () => {
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 700));
    const score = Math.random().toFixed(3);
    const label = Number(score) > 0.5 ? "OK" : "LOW";
    // generate dummy affinity in pKa (0-14) and stability in RMSE
    const affinity_pKa = (Math.random() * 14).toFixed(2);
    const stability_rmse = (Math.random() * 1.5 + 0.05).toFixed(3);
    const message =
      label === "OK" ? "Prediction successful" : "Low confidence prediction";
    setResult({ message, affinity_pKa, stability_rmse });
    setLoading(false);
  };

  const sendToBackend = async () => {
    setSending(true);
    setResult(null);
    try {
      // Build form data (placeholder). Replace URL with your backend endpoint.
      const form = new FormData();
      form.append("pdbId", pdbId || "");
      // attach ligand files (CSV + TXT) if provided
      if (ligandCsv) form.append("ligand_csv", ligandCsv);
      if (ligandTxt) form.append("ligand_txt", ligandTxt);

      // Simulate network delay and response for now
      await new Promise((r) => setTimeout(r, 900));
      // Example fetch (commented out until real endpoint exists)
      // const resp = await fetch('/api/predict', { method: 'POST', body: form });
      // const data = await resp.json();

      // Dummy response
      const score = Math.random().toFixed(3);
      const label = Number(score) > 0.5 ? "OK" : "LOW";
      const affinity_pKa = (Math.random() * 14).toFixed(2);
      const stability_rmse = (Math.random() * 1.5 + 0.05).toFixed(3);
      const message =
        label === "OK" ? "Prediction successful" : "Low confidence prediction";
      const data = {
        message,
        affinity_pKa,
        stability_rmse,
      };
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

            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "flex-start",
              }}
            >
              <label style={{ fontSize: 12, color: "#cfeffb" }}>
                Upload ligand CSV
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) =>
                  setLigandCsv(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                  )
                }
                style={{
                  width: "80%",
                  background: "#071722",
                  color: "#dbeaf6",
                  border: "1px solid #15303a",
                  padding: 6,
                  borderRadius: 6,
                }}
              />

              <div style={{ color: "#9fbcc9", fontSize: 12 }}>
                {ligandCsv ? `CSV: ${ligandCsv.name}` : "No CSV selected"}
              </div>

              <label style={{ fontSize: 12, color: "#cfeffb" }}>
                Upload ligand TXT
              </label>
              <input
                type="file"
                accept=".txt"
                onChange={(e) =>
                  setLigandTxt(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null,
                  )
                }
                style={{
                  width: "80%",
                  background: "#071722",
                  color: "#dbeaf6",
                  border: "1px solid #15303a",
                  padding: 6,
                  borderRadius: 6,
                }}
              />

              <div style={{ color: "#9fbcc9", fontSize: 12 }}>
                {ligandTxt ? `TXT: ${ligandTxt.name}` : "No TXT selected"}
              </div>
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
                padding: 16,
                borderRadius: 12,
                background: "linear-gradient(180deg,#081620,#04141a)",
                border: "1px solid rgba(20,40,50,0.6)",
                boxShadow: "0 8px 30px rgba(2,10,14,0.6)",
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color:
                      result.message === "Prediction successful"
                        ? "#00292b"
                        : "#fff",
                    background:
                      result.message === "Prediction successful"
                        ? "#10b5b0"
                        : "#e11d48",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
                    fontSize: 20,
                  }}
                >
                  {result.message === "Prediction successful" ? "✓" : "!"}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{ color: "#9fc7dd", fontWeight: 800, fontSize: 13 }}
                  >
                    Prediction Result
                  </div>
                  <div style={{ color: "#cfeffb", fontSize: 14, marginTop: 6 }}>
                    {result.message}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
                <div
                  style={{
                    minWidth: 160,
                    padding: 12,
                    borderRadius: 10,
                    background: "linear-gradient(180deg,#041e24,#032028)",
                    border: "1px solid rgba(18,45,52,0.6)",
                  }}
                >
                  <div
                    style={{ color: "#9fe7ff", fontSize: 20, fontWeight: 900 }}
                  >
                    {result.affinity_pKa} pKa
                  </div>
                  <div style={{ color: "#8fb9c6", fontSize: 12, marginTop: 6 }}>
                    Binding affinity
                  </div>
                </div>

                <div
                  style={{
                    minWidth: 140,
                    padding: 12,
                    borderRadius: 10,
                    background: "linear-gradient(180deg,#041e24,#032028)",
                    border: "1px solid rgba(18,45,52,0.6)",
                  }}
                >
                  <div
                    style={{ color: "#9fe7ff", fontSize: 20, fontWeight: 900 }}
                  >
                    {result.stability_rmse}
                  </div>
                  <div style={{ color: "#8fb9c6", fontSize: 12, marginTop: 6 }}>
                    Stability (RMSE)
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
                height: previewHeight,
                background: "linear-gradient(135deg,#07212a,#0c2730)",
                borderRadius: 6,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#95d3e8",
              }}
            >
              {previewLoading ? (
                "LOADING PREVIEW..."
              ) : previewError ? (
                <div style={{ color: "#ffb4b4", textTransform: "uppercase" }}>
                  Invalid PDB ID
                </div>
              ) : previewHasAtoms && previewPdbString ? (
                <div style={{ width: "100%", height: "100%" }}>
                  <ProteinLigandViewer
                    pdbData={previewPdbString}
                    atoms={previewAtoms}
                    height={previewHeight}
                  />
                </div>
              ) : (
                "ENTER A VALID PDB ID TO PREVIEW"
              )}
            </div>

            <button
              onClick={() =>
                navigate("/viewer", {
                  state: {
                    pdbId,
                    ligandFiles: {
                      csv: ligandCsv ? ligandCsv.name : null,
                      txt: ligandTxt ? ligandTxt.name : null,
                    },
                    virtualScreening,
                    forceChirality,
                  },
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
