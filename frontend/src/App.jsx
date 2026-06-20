import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ProteinLigandViewer from "./components/ProteinLigandViewer";
import AtomGrid from "./components/AtomGrid";
import { atomsToPDB } from "./components/atomsToPDB";
import Landing from "./Landing";
import HistoryPage from "./HistoryPage";
import PredictionsPage from "./PredictionsPage";
import Header from "./components/Header";

export default function App() {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [selectedAtomIndex, setSelectedAtomIndex] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);

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

  function ViewerWrapper() {
    const location = useLocation();

    useEffect(() => {
      const statePdb = location.state?.pdbId;
      const qs = new URLSearchParams(location.search).get("pdb");
      const targetId = (statePdb || qs || "").toUpperCase();

      if (!data || (id && id.toUpperCase() !== targetId)) {
        fetch(`/${targetId}.json`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch JSON");
            return res.json();
          })
          .then((d) => {
            setData(d);
            setId(targetId);
            setFrameIndex(0);
            setSelectedAtomIndex(null);
          })
          .catch((err) => {
            console.error(err);
            setData(null);
            setId(targetId);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.key, location.search, location.state]);

    return (
      <div>
        {!data ? (
          <div style={{ padding: 20 }}>Loading MISATO structure...</div>
        ) : (
          <div>
            {data.md_frames?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    color: "#c6f7ff",
                    fontSize: "18px",
                    fontWeight: 500,
                    marginRight: "8px",
                    letterSpacing: "0.5px",
                  }}
                >
                  FRAME :{" "}
                </label>
                <button
                  type="button"
                  disabled={frameIndex === 0}
                  onClick={() => setFrameIndex((prev) => Math.max(0, prev - 1))}
                  style={{
                    width: "28px",
                    height: "28px",
                    background: frameIndex === 0 ? "#11161c" : "#1c7a9b",
                    border: "1px solid #2a8fb4",
                    color: "#ffffff",
                    borderRadius: "4px",
                    opacity: frameIndex === 0 ? 0.4 : 1,
                    cursor: frameIndex === 0 ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
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
                    width: "70px",
                    height: "28px",
                    background: "#071018",
                    border: "1px solid #142128",
                    color: "#c6f7ff",
                    borderRadius: "4px",
                    textAlign: "center",
                    margin: "0 6px",
                    padding: "0 0 0 11px",
                    outline: "none",
                    fontSize: "15px",
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
                    width: "28px",
                    height: "28px",
                    background:
                      frameIndex === data.md_frames.length - 1
                        ? "#11161c"
                        : "#1c7a9b",
                    border: "1px solid #2a8fb4",
                    color: "#ffffff",
                    borderRadius: "4px",
                    opacity: frameIndex === data.md_frames.length - 1 ? 0.4 : 1,
                    cursor:
                      frameIndex === data.md_frames.length - 1
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  +
                </button>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                gap: 20,
              }}
            >
              <ProteinLigandViewer
                pdbData={pdbData}
                atoms={atoms}
                selectedAtomIndex={selectedAtomIndex}
              />

              <AtomGrid
                atoms={atoms}
                selectedAtomIndex={selectedAtomIndex}
                onSelectAtom={(index) => {
                  if (selectedAtomIndex === index) {
                    setSelectedAtomIndex(null);
                  } else {
                    setSelectedAtomIndex(index);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div
        style={{
          padding: 0,
          fontFamily: "Arial, sans-serif",
          background: "#0b0f14",
          color: "#e6eef8",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div style={{ padding: 10 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/viewer" element={<ViewerWrapper />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/predictions" element={<PredictionsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
