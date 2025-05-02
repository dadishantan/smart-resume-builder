import React from "react";

export default function ProjectsSection({ data, onChange }) {
  const handleChange = (index, e) => {
    const updated = [...data];
    updated[index][e.target.name] = e.target.value;
    onChange(updated);
  };

  const addEntry = () => {
    onChange([...data, { title: "", description: "" }]);
  };

  const removeEntry = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-bold mb-2">Projects</h3>
      {data.map((entry, index) => (
        <div key={index} className="border p-3 rounded mb-4 grid gap-2">
          <input name="title" placeholder="Project Title" value={entry.title} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" />
          <textarea name="description" placeholder="Description" value={entry.description} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" />
          {data.length > 1 && (
            <button type="button" onClick={() => removeEntry(index)} className="bg-red-500 text-white px-3 py-1 rounded w-fit">Delete</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addEntry} className="bg-blue-500 text-white px-3 py-1 rounded w-fit">+ Add Project</button>
    </div>
  );
}
