import React from "react";

export default function HistoryPage() {
  return (
    <div
      style={{
        background: "#071018",
        color: "#e6eef8",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: "#ffffff" }}>History</h2>
      <p style={{ color: "#cbd6e3" }}>
        This page will list past analyses, file uploads and prediction runs.
      </p>
      <div
        style={{
          height: 300,
          border: "1px dashed #23303a",
          borderRadius: 8,
          marginTop: 12,
          padding: 12,
        }}
      >
        <p style={{ padding: 12, color: "#9fb0c8" }}>History list (empty)</p>
      </div>
    </div>
  );
}
