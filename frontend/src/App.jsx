import { useEffect, useState } from "react";
import ProteinLigandViewer from "./ProteinLigandViewer";
import AtomGrid from "./AtomGrid";
import { atomsToPDB } from "./atomsToPDB";

export default function App() {
  const [data, setData] = useState(null);
  const [selectedAtomIndex, setSelectedAtomIndex] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    fetch("/10GS.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data)
    return <div style={{ padding: 20 }}>Loading MISATO structure...</div>;

  const coordinates =
    data.md_frames && data.md_frames.length > 0
      ? data.md_frames[frameIndex]
      : data.qm_coordinates;

  const atoms = data.atoms.map((a, i) => ({
    ...a,
    x: coordinates[i][0],
    y: coordinates[i][1],
    z: coordinates[i][2],
  }));

  const pdbData = atomsToPDB(atoms, coordinates);
  console.log(pdbData.split("\n").slice(0, 10).join("\n"));

  return (
    <div style={{ padding: 10, fontFamily: "Arial, sans-serif" }}>
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
        <ProteinLigandViewer
          pdbData={pdbData}
          atoms={atoms}
          selectedAtomIndex={selectedAtomIndex}
        />
        <AtomGrid
          atoms={atoms}
          selectedAtomIndex={selectedAtomIndex}
          onSelectAtom={setSelectedAtomIndex}
        />
      </div>
    </div>
  );
}
