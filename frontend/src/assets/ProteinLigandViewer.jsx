import { useEffect, useRef } from "react";

export default function ProteinLigandViewer({
  pdbData,
  atoms = [],
  selectedAtomIndex = null,
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const initialLoadedRef = useRef(false);

  // initialize model on pdbData change
  useEffect(() => {
    if (!containerRef.current || !window.$3Dmol || !pdbData) return;

    if (!viewerRef.current) {
      viewerRef.current = window.$3Dmol.createViewer(containerRef.current, {
        backgroundColor: "#071018",
      });
    }

    const viewer = viewerRef.current;
    let savedView = null;
    try {
      if (viewer && typeof viewer.getView === "function") savedView = viewer.getView();
    } catch (e) {
      savedView = null;
    }

    viewer.clear();
    viewer.addModel(pdbData, "pdb");
    viewer.setStyle({}, { stick: { radius: 0.18 } });

    try {
      if (savedView && typeof viewer.setView === "function") {
        viewer.setView(savedView);
      } else if (!initialLoadedRef.current) {
        viewer.zoomTo();
        initialLoadedRef.current = true;
      }
    } catch (e) {
      if (!initialLoadedRef.current) {
        try {
          viewer.zoomTo();
          initialLoadedRef.current = true;
        } catch (e2) {}
      }
    }

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
      const serial = Number(atom.serial ?? selectedAtomIndex + 1);
      viewer.setStyle(
        { serial },
        { sphere: { radius: 0.3, color: "red" }, stick: { radius: 0.12 } },
      );
      // do not zoom to keep camera stable on selection
    }

    viewer.render();
  }, [selectedAtomIndex, atoms]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "620px",
        border: "1px solid #23303a",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#071018",
        position: "relative",
      }}
    />
  );
}
