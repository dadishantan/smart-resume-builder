import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import CertificationsSection from "./CertificationsSection";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/auth/AuthContext";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { extractProfileFromResume } from "../gpt/gptService";
import { useNavigate } from "react-router-dom";

export default function ProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const [profile, setProfile] = useState({
    personal: { name: "", email: "", phone: "", github: "", linkedin: "" },
    education: [{ school: "", degree: "", startDate: "", endDate: "", coursework: "" }],
    experience: [{ company: "", title: "", startDate: "", endDate: "", description: "" }],
    skills: [],
    projects: [{ title: "", description: "" }],
    certifications: [{ title: "", issuer: "", date: "" }],
  });

  const updateProfile = (section, value) => {
    setProfile((prev) => ({ ...prev, [section]: value }));
  };

  const isProfileValid = () => {
    const { name, email, phone } = profile.personal;
    if (!name || !email || !phone) return false;
    if (profile.education.length === 0 || !profile.education[0].school) return false;
    if (profile.experience.length === 0 || !profile.experience[0].company) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus("❌ User not logged in.");
      return;
    }

    if (!isProfileValid()) {
      setStatus("⚠️ Please fill all required fields before saving.");
      return;
    }

    try {
      await setDoc(doc(db, "profiles", user.uid), { ...profile, profileCompleted: true }, { merge: true });
      setStatus("✅ Profile saved successfully!");
      navigate("/generate"); // Redirect immediately
    } catch (error) {
      console.error("Error saving profile:", error);
      setStatus("❌ Failed to save profile.");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    const reader = new FileReader();
    reader.onload = async () => {
      const typedarray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      const gptExtracted = await extractProfileFromResume(fullText);
      if (gptExtracted) {
        setProfile(gptExtracted);
        setStatus("✅ Resume processed and fields populated.");
      } else {
        setStatus("⚠️ GPT could not extract profile data.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto grid gap-6">
      <div className="flex flex-col mb-4">
        <label className="font-medium mb-1">📎 Pull from Resume (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <PersonalDetails data={profile.personal} onChange={(val) => updateProfile("personal", val)} />
      <EducationSection data={profile.education} onChange={(val) => updateProfile("education", val)} />
      <ExperienceSection data={profile.experience} onChange={(val) => updateProfile("experience", val)} />
      <SkillsSection data={profile.skills} onChange={(val) => updateProfile("skills", val)} />
      <ProjectsSection data={profile.projects} onChange={(val) => updateProfile("projects", val)} />
      <CertificationsSection data={profile.certifications} onChange={(val) => updateProfile("certifications", val)} />

      {status && (
        <p className={`text-sm mt-2 ${status.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {status}
        </p>
      )}

      <button type="submit" className="mt-6 bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Save Profile
      </button>
    </form>
  );
}
