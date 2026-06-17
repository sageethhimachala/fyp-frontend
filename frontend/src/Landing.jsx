import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0f12",
        color: "#e6eef8",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header rendered globally via Header component */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr 300px",
          gap: 20,
          padding: 28,
        }}
      >
        {/* Left sidebar */}
        <aside
          style={{
            background: "#071018",
            borderRadius: 12,
            padding: 18,
            border: "1px solid #15242a",
            height: "calc(100vh - 120px)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#aeeefb",
              marginBottom: 20,
            }}
          >
            Project Helix
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link
              to="/"
              style={{
                color: "#9fd5e9",
                textDecoration: "none",
                background: "linear-gradient(90deg,#0f2a2f,transparent)",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/viewer"
              style={{
                color: "#9fd5e9",
                textDecoration: "none",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              Molecular View
            </Link>
            <Link
              to="/predictions"
              style={{
                color: "#9fd5e9",
                textDecoration: "none",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              Binding Affinity
            </Link>
            <Link
              to="/history"
              style={{
                color: "#9fd5e9",
                textDecoration: "none",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              Sequence Analysis
            </Link>
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.03)",
                margin: "12px 0",
              }}
            />
            <Link
              to="/history"
              style={{
                color: "#9fd5e9",
                textDecoration: "none",
                padding: "10px",
                borderRadius: 8,
              }}
            >
              Archive
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ minHeight: 600 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#c6f7ff",
                  fontSize: 36,
                  letterSpacing: 2,
                }}
              >
                CENTRAL_DASHBOARD
              </h2>
              <div style={{ color: "#8fbac4", marginTop: 8, fontSize: 12 }}>
                SYSTEM STATUS: OPTIMAL | CORE LOAD 24% | GENOMIC PIPELINE ONLINE
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "#102228",
                  color: "#9fd5e9",
                  borderRadius: 6,
                  padding: "8px 12px",
                  border: "1px solid #18333a",
                }}
              >
                REAL-TIME
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "#6ea2ab",
                  borderRadius: 6,
                  padding: "8px 12px",
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                HISTORICAL
              </button>
            </div>
          </div>

          {/* stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                background: "#071018",
                border: "1px solid #152e33",
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div style={{ color: "#9fd5e9", fontSize: 12 }}>
                ACTIVE PREDICTIONS
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#dffcff",
                  marginTop: 8,
                }}
              >
                1,284{" "}
                <span style={{ color: "#7ff57f", fontSize: 14, marginLeft: 8 }}>
                  +12.4%
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#071018",
                border: "1px solid #152e33",
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div style={{ color: "#9fd5e9", fontSize: 12 }}>AVG AFFINITY</div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#dffcff",
                  marginTop: 8,
                }}
              >
                8.2{" "}
                <span style={{ color: "#9fd5e9", fontSize: 14, marginLeft: 8 }}>
                  pKd
                </span>
              </div>
            </div>
            <div
              style={{
                background: "#071018",
                border: "1px solid #152e33",
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div style={{ color: "#9fd5e9", fontSize: 12 }}>SUCCESS RATE</div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#7ff57f",
                  marginTop: 8,
                }}
              >
                94.8 %
              </div>
            </div>
          </div>

          {/* lower area: logs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            <div
              style={{
                background: "#071018",
                border: "1px solid #152e33",
                borderRadius: 8,
                padding: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontWeight: 700, color: "#c6f7ff" }}>
                  REAL-TIME MOLECULAR LOGS
                </div>
                <div style={{ color: "#8fbac4", fontSize: 12 }}>
                  FILTER: ALL_STREAMS
                </div>
              </div>
              <div
                style={{
                  height: 260,
                  overflow: "auto",
                  color: "#9fd5e9",
                  fontSize: 13,
                  paddingRight: 8,
                }}
              >
                <div
                  style={{
                    marginBottom: 10,
                    color: "#7ff57f",
                    fontFamily: "monospace",
                  }}
                >
                  [16:25:57] [STABILITY_CHECK] Ligand-7728 Binding Event — VALID
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    color: "#9fd5e9",
                    fontFamily: "monospace",
                  }}
                >
                  [16:26:12] [BINDING_CALC] Affinity: -9.4 kcal/mol
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    color: "#9fd5e9",
                    fontFamily: "monospace",
                  }}
                >
                  [16:27:01] [SIMULATION] Trajectory saved to /data/run_322
                </div>
                <div
                  style={{
                    marginBottom: 10,
                    color: "#9fd5e9",
                    fontFamily: "monospace",
                  }}
                >
                  [16:28:44] [ANALYSIS] Structure aligned to reference model
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right trending/insights */}
        <aside
          style={{
            background: "#071018",
            borderRadius: 12,
            padding: 18,
            border: "1px solid #15242a",
            height: "calc(100vh - 120px)",
          }}
        >
          <div style={{ fontWeight: 700, color: "#c6f7ff", marginBottom: 10 }}>
            TRENDING TARGETS
          </div>
          <div
            style={{
              background: "#091317",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <div style={{ color: "#9fd5e9", fontWeight: 700 }}>CDK9_Kina</div>
            <div style={{ color: "#7ff57f", fontSize: 18, marginTop: 6 }}>
              9.4 pKd
            </div>
            <div style={{ color: "#8fbac4", fontSize: 12, marginTop: 6 }}>
              +18.2% trending
            </div>
          </div>
          <div style={{ height: 10 }} />
          <Link
            to="/viewer"
            style={{
              display: "inline-block",
              marginTop: 6,
              padding: "10px 12px",
              background: "#0e2d32",
              color: "#9fd5e9",
              textDecoration: "none",
              borderRadius: 8,
            }}
          >
            Open Molecular View
          </Link>
        </aside>
      </div>
    </div>
  );
}
