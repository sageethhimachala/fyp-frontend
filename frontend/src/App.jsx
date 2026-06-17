import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProteinLigandViewer from "./assets/ProteinLigandViewer";
import AtomGrid from "./assets/AtomGrid";
import { atomsToPDB } from "./assets/atomsToPDB";
import Landing from "./Landing";
import HistoryPage from "./HistoryPage";
import PredictionsPage from "./PredictionsPage";

export default function App() {
  const [data, setData] = useState(null);
  const [selectedAtomIndex, setSelectedAtomIndex] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    fetch("/10GS.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const coordinates =
    data?.md_frames && data.md_frames.length > 0
      ? data.md_frames[frameIndex]
      : data?.qm_coordinates;

  const atoms = (data?.atoms || []).map((a, i) => ({
    ...a,
    x: coordinates ? coordinates[i][0] : a.x,
    y: coordinates ? coordinates[i][1] : a.y,
    z: coordinates ? coordinates[i][2] : a.z,
  }));

  const pdbData = atomsToPDB(atoms, coordinates);

  return (
    <BrowserRouter>
      <div style={{ padding: 10, fontFamily: "Arial, sans-serif" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/viewer"
            element={
              !data ? (
                <div style={{ padding: 20 }}>Loading MISATO structure...</div>
              ) : (
                <div>
                  <Link to="/">← Back</Link>
                  <h2>GraphMD Viewer</h2>
                  <p>PDB ID: {data.pdbId}</p>

                  {data.md_frames?.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <label>Frame: </label>
                      <button
                        type="button"
                        disabled={frameIndex === 0}
                        onClick={() => setFrameIndex((prev) => Math.max(0, prev - 1))}
                        style={{
                          opacity: frameIndex === 0 ? 0.4 : 1,
                          cursor: frameIndex === 0 ? "not-allowed" : "pointer",
                        }}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="0"
                        max={data.md_frames.length - 1}
                        value={frameIndex}
                        style={{
                          padding: "0 0 0 12px",
                          textAlign: "center",
                          margin: "0px 5px 0px 5px",
                        }}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (
                            !isNaN(value) &&
                            value >= 0 &&
                            value <= data.md_frames.length - 1
                          ) {
                            setFrameIndex(value);
                          }
                        }}
                      />

                      <button
                        type="button"
                        disabled={frameIndex === data.md_frames.length - 1}
                        onClick={() =>
                          setFrameIndex((prev) =>
                            Math.min(data.md_frames.length - 1, prev + 1),
                          )
                        }
                        style={{
                          opacity: frameIndex === data.md_frames.length - 1 ? 0.4 : 1,
                          cursor:
                            frameIndex === data.md_frames.length - 1
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.3fr 1.8fr",
                      gap: 20,
                    }}
                  >
                    <ProteinLigandViewer pdbData={pdbData} atoms={atoms} selectedAtomIndex={selectedAtomIndex} />
                    <AtomGrid atoms={atoms} selectedAtomIndex={selectedAtomIndex} onSelectAtom={setSelectedAtomIndex} />
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/history"
            element={
              <div>
                <Link to="/">← Back</Link>
                <HistoryPage />
              </div>
            }
          />
          <Route
            path="/predictions"
            element={
              <div>
                <Link to="/">← Back</Link>
                <PredictionsPage />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
