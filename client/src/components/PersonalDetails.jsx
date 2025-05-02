import React from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PersonalDetails({ data, onChange }) {
  const userId = "demo-user-001"; // Replace with Firebase Auth UID in future

  const handleChange = async (e) => {
    const updated = { ...data, [e.target.name]: e.target.value };
    onChange(updated);

    try {
      await setDoc(
        doc(db, "profiles", userId),
        { personal: updated }, // Only update personal section
        { merge: true }
      );
      console.log("Personal info saved!");
    } catch (err) {
      console.error("Error saving personal info:", err);
    }
  };

  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-bold mb-2">Personal Details</h3>
      <input name="name" placeholder="Full Name" value={data.name} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="email" placeholder="Email" value={data.email} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="phone" placeholder="Phone" value={data.phone} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="github" placeholder="GitHub URL" value={data.github} onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="linkedin" placeholder="LinkedIn URL" value={data.linkedin} onChange={handleChange} className="border p-2 rounded w-full" />
    </div>
  );
}
