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
      .then((json) => setData(json));
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
      <h2>MISATO Protein–Ligand Viewer</h2>
      <p>PDB ID: {data.pdbId}</p>

      {data.md_frames?.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label>Frame: {frameIndex}</label>
          <input
            type="range"
            min="0"
            max={data.md_frames.length - 1}
            value={frameIndex}
            onChange={(e) => setFrameIndex(Number(e.target.value))}
            style={{ width: "300px", marginLeft: 12 }}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1.8fr",
          gap: 20,
        }}
      >
        <ProteinLigandViewer pdbData={pdbData} />
        <AtomGrid
          atoms={atoms}
          selectedAtomIndex={selectedAtomIndex}
          onSelectAtom={setSelectedAtomIndex}
        />
      </div>
    </div>
  );
}
