import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import JobDescription from "./JobDescription";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeGenerator() {
  const [jobDescription, setJobDescription] = useState("");
  const [profile, setProfile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loadingType, setLoadingType] = useState(null);
  const contentRef = useRef(null);

  const userId = "demo-user-001"; // Replace with actual Firebase Auth UID

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          alert("Profile not found. Please complete your profile first.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleGenerate = async (type) => {
    if (!jobDescription || !profile) {
      alert("Job description and profile are required.");
      return;
    }

    setLoadingType(type);

    try {
      const response = await fetch("http://localhost:4000/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, profile, type }),
      });

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedContent("An error occurred while generating. Please try again.");
    } finally {
      setLoadingType(null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("generated_resume.pdf");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Generate Application Content</h2>

      <JobDescription value={jobDescription} onChange={setJobDescription} />

      <div className="flex gap-4 mb-4 flex-wrap">
        <button
          onClick={() => handleGenerate("resume")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loadingType === "resume"}
        >
          {loadingType === "resume" ? "Generating..." : "Generate Resume"}
        </button>

        <button
          onClick={() => handleGenerate("cover_letter")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loadingType === "cover_letter"}
        >
          {loadingType === "cover_letter" ? "Generating..." : "Generate Cover Letter"}
        </button>

        <button
          onClick={() => handleGenerate("cold_email")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={loadingType === "cold_email"}
        >
          {loadingType === "cold_email" ? "Generating..." : "Generate Cold Email"}
        </button>
      </div>

      {generatedContent && (
        <div className="mt-6">
          <div ref={contentRef} className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
            <h3 className="text-xl font-semibold mb-2">Generated Output</h3>
            {generatedContent}
          </div>

          <button
            onClick={handleDownloadPDF}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            📄 Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
