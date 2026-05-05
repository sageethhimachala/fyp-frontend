import { useEffect, useRef } from "react";

export default function ProteinLigandViewer({ pdbData }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

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
