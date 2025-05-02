import React from "react";

export default function JobDescription({ value, onChange }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Target Job Description</h3>
      <textarea
        rows="10"
        className="w-full border p-2 rounded"
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
