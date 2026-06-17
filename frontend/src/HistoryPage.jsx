import React from "react";

export default function HistoryPage() {
  return (
    <div>
      <h2>History</h2>
      <p>
        This page will list past analyses, file uploads and prediction runs.
      </p>
      <div style={{ height: 300, border: "1px dashed #ccc", borderRadius: 8 }}>
        <p style={{ padding: 12 }}>History list (empty)</p>
      </div>
    </div>
  );
}
