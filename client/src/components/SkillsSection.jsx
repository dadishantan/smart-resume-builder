import React from "react";

export default function SkillsSection({ data, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value.split(",").map(skill => skill.trim()));
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-bold mb-2">Skills</h3>
      <textarea
        placeholder="Enter skills separated by commas"
        value={data.join(", ")}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
