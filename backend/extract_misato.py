import h5py
import json
import numpy as np
from pathlib import Path

PDB_ID = "1A30"
QM_FILE = "../data/tiny_qm.hdf5"
MD_FILE = "../data/tiny_md.hdf5"
OUT_FILE = f"../frontend/public/{PDB_ID}.json"

def safe_list(x):
    if isinstance(x, np.ndarray):
        return x.tolist()
    return x

data = {
    "pdbId": PDB_ID,
    "atoms": [],
    "qm_coordinates": [],
    "md_frames": []
}

with h5py.File(QM_FILE, "r") as f:
    grp = f[PDB_ID]

    # MISATO docs show coordinates in atom_properties_values[:,0:3]
    xyz = grp["atom_properties"]["atom_properties_values"][:, 0:3]
    data["qm_coordinates"] = xyz.tolist()

    # Optional metadata if present in your file layout
    atom_props = grp["atom_properties"]

    atom_names = atom_props["atom_names"][:] if "atom_names" in atom_props else None
    elements = atom_props["elements"][:] if "elements" in atom_props else None
    residue_names = atom_props["residue_names"][:] if "residue_names" in atom_props else None
    residue_ids = atom_props["residue_ids"][:] if "residue_ids" in atom_props else None
    chains = atom_props["chain_ids"][:] if "chain_ids" in atom_props else None
    hetflags = atom_props["hetflags"][:] if "hetflags" in atom_props else None

    n = xyz.shape[0]
    for i in range(n):
        def decode(v, default):
            if v is None:
                return default
            item = v[i]
            if isinstance(item, bytes):
                return item.decode("utf-8")
            return str(item)

        atom = {
            "serial": i + 1,
            "atom": decode(atom_names, f"A{i+1}"),
            "elem": decode(elements, "C"),
            "resn": decode(residue_names, "UNK"),
            "resi": int(residue_ids[i]) if residue_ids is not None else 1,
            "chain": decode(chains, "A"),
            "hetflag": bool(hetflags[i]) if hetflags is not None else False,
            "x": float(xyz[i, 0]),
            "y": float(xyz[i, 1]),
            "z": float(xyz[i, 2]),
        }
        data["atoms"].append(atom)

with h5py.File(MD_FILE, "r") as f:
    grp = f[PDB_ID]

    # MISATO docs show trajectory_coordinates[frame,:,:]
    if "trajectory_coordinates" in grp:
        frames = grp["trajectory_coordinates"]
        max_frames = min(20, frames.shape[0])  # keep frontend small at first
        for i in range(max_frames):
            data["md_frames"].append(frames[i, :, :].tolist())

Path("../frontend/public").mkdir(parents=True, exist_ok=True)
with open(OUT_FILE, "w") as f:
    json.dump(data, f)

print(f"Saved {OUT_FILE}")
print(f"Atoms: {len(data['atoms'])}, frames: {len(data['md_frames'])}")