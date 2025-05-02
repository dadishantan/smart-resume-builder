import { OPENAI_API_KEY } from "../config/openai";

export const extractProfileFromResume = async (resumeText) => {
  const prompt = `
You are a resume parser. Extract the following fields from this resume text and return a strict JSON object (no explanation or formatting):

{
  personal: { name, email, phone, github, linkedin },
  education: [{ school, degree, startDate, endDate, coursework }],
  experience: [{ company, title, startDate, endDate, description }],
  skills: [ ... ],
  projects: [{ title, description }],
  certifications: [{ title, issuer, date }]
}

Resume:
${resumeText}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or gpt-4 if your quota allows
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ GPT API error:", error);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    try {
      return JSON.parse(content);
    } catch (err) {
      console.warn("⚠️ GPT returned unparseable JSON:");
      console.warn(content);
      return null;
    }
  } catch (error) {
    console.error("❌ Network/API error:", error);
    return null;
  }
};
