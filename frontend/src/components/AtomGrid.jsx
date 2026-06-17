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
        <thead
          style={{
            position: "sticky",
            top: 0,
            background: "#071722",
            zIndex: 2,
          }}
        >
          <tr>
            {/* <th style={th}>#</th>
            <th style={th}>Atom</th> */}
            <th style={th}>Element</th>
            {/* <th style={th}>Residue</th>
            <th style={th}>Resi</th>
            <th style={th}>Chain</th> */}
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
                onClick={() => onSelectAtom(index)}
                style={{
                  background: selected
                    ? "linear-gradient(90deg,#0d3940,#08313a)"
                    : index % 2 === 0
                      ? "transparent"
                      : "rgba(8,24,28,0.6)",
                  cursor: "pointer",
                }}
              >
                {/* <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.serial}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.atom}
                </td> */}
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.elem}
                </td>
                {/* <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.resn}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.resi}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.chain}
                </td> */}
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {Number(atom.x).toFixed(3)}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {Number(atom.y).toFixed(3)}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {Number(atom.z).toFixed(3)}
                </td>
                <td style={{ ...td, color: selected ? "#e6f9ff" : td.color }}>
                  {atom.hetflag ? "Ligand" : "Protein"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  padding: "10px",
  borderBottom: "1px solid #23303a",
  color: "#cfe6ff",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #162126",
  color: "#cfe6ff",
};
