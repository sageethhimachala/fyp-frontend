import { useEffect, useRef } from "react";

export default function ProteinLigandViewer({
  pdbData,
  atoms = [],
  selectedAtomIndex = null,
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // initialize model on pdbData change
  useEffect(() => {
    if (!containerRef.current || !window.$3Dmol || !pdbData) return;

    if (!viewerRef.current) {
      viewerRef.current = window.$3Dmol.createViewer(containerRef.current, {
        backgroundColor: "white",
      });
    }

    const viewer = viewerRef.current;
    viewer.clear();

    viewer.addModel(pdbData, "pdb");
    viewer.setStyle({}, { stick: { radius: 0.18 } });
    viewer.zoomTo();
    viewer.render();
  }, [pdbData]);

  // apply selection highlight when selectedAtomIndex or atoms change
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !atoms || atoms.length === 0) return;

    // reset default style for all atoms
    viewer.setStyle({}, { stick: { radius: 0.18 } });

    if (selectedAtomIndex !== null && atoms[selectedAtomIndex]) {
      const atom = atoms[selectedAtomIndex];
      // serial in PDB is 1-based integer; ensure numeric
      const serial = Number(atom.serial ?? selectedAtomIndex + 1);

      // highlight the selected atom with a sphere and slightly thinner sticks
      viewer.setStyle(
        { serial },
        { sphere: { radius: 0.3, color: "red" }, stick: { radius: 0.12 } },
      );

      // zoom to and render
      try {
        viewer.zoomTo({ serial });
      } catch (e) {
        viewer.zoomTo();
      }
    } else {
      viewer.zoomTo();
    }

    viewer.render();
  }, [selectedAtomIndex, atoms]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "620px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        position: "relative",
      }}
    />
  );
}
