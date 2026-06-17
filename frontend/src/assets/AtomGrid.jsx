export default function AtomGrid({ atoms, selectedAtomIndex, onSelectAtom }) {
  return (
    <div
      style={{
        height: "620px",
        overflow: "auto",
        border: "1px solid #23303a",
        borderRadius: 12,
        background: "#071018",
        color: "#e6eef8",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}
      >
        <thead style={{ position: "sticky", top: 0, background: "#071722" }}>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Atom</th>
            <th style={th}>Elem</th>
            <th style={th}>Residue</th>
            <th style={th}>Resi</th>
            <th style={th}>Chain</th>
            <th style={th}>X</th>
            <th style={th}>Y</th>
            <th style={th}>Z</th>
            <th style={th}>Type</th>
          </tr>
        </thead>
        <tbody>
          {atoms.map((atom, index) => {
            const selected = index === selectedAtomIndex;
            return (
              <tr
                key={index}
                onClick={() => onSelectAtom && onSelectAtom(index === selectedAtomIndex ? null : index)}
                style={{
                  background: selected ? "#dff1ff" : "white",
                  cursor: "pointer",
                }}
              >
                <td style={td}>{atom.serial}</td>
                <td style={td}>{atom.atom}</td>
                <td style={td}>{atom.elem}</td>
                <td style={td}>{atom.resn}</td>
                <td style={td}>{atom.resi}</td>
                <td style={td}>{atom.chain}</td>
                <td style={td}>{Number(atom.x).toFixed(3)}</td>
                <td style={td}>{Number(atom.y).toFixed(3)}</td>
                <td style={td}>{Number(atom.z).toFixed(3)}</td>
                <td style={td}>{atom.hetflag ? "Ligand" : "Protein"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "1px solid #23303a",
  color: "#cfe6ff",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #162126",
  color: "#cfe6ff",
};
