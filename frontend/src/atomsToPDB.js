export function atomsToPDB(atoms, coordinates = null) {
  const lines = atoms.map((a, i) => {
    const xyz = coordinates ? coordinates[i] : [a.x, a.y, a.z];

    const record = a.hetflag ? "HETATM" : "ATOM  ";
    const serial = String(a.serial ?? i + 1).padStart(5, " ");
    const atomName = String(a.atom || a.elem || "C").padStart(4, " ");
    const resName = String(a.resn || "UNK").padStart(3, " ");
    const chain = String(a.chain || "A").slice(0, 1);
    const resi = String(a.resi || 1).padStart(4, " ");

    const x = Number(xyz[0]).toFixed(3).padStart(8, " ");
    const y = Number(xyz[1]).toFixed(3).padStart(8, " ");
    const z = Number(xyz[2]).toFixed(3).padStart(8, " ");

    const occupancy = "  1.00";
    const tempFactor = " 20.00";
    const element = String(a.elem || "C").padStart(2, " ");

    return (
      `${record}${serial} ${atomName} ${resName} ${chain}${resi}    ` +
      `${x}${y}${z}${occupancy}${tempFactor}          ${element}`
    );
  });

  return lines.join("\n") + "\nEND\n";
}