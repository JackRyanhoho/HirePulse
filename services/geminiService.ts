import { GoogleGenAI, Type } from "@google/genai";
import type { Candidate } from '../types';

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the candidate." },
    email: { type: Type.STRING, description: "The candidate's primary email address." },
    phone: { type: Type.STRING, description: "The candidate's primary phone number." },
    role: { type: Type.STRING, description: "The candidate's most recent or current job title." },
    location: { type: Type.STRING, description: "The candidate's city and state, e.g., 'San Francisco, CA'." },
    summary: { type: Type.STRING, description: "A brief, one-sentence summary of the candidate's years of experience or key expertise." },
    skills: {
      type: Type.ARRAY,
      description: "A list of the candidate's technical and professional skills.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the skill." },
          years: { type: Type.INTEGER, description: "Optional. The number of years of experience with this skill, if mentioned." },
        },
        required: ["name"],
      },
    },
    experience: {
      type: Type.ARRAY,
      description: "The candidate's professional work experience.",
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "Job title or role." },
          company: { type: Type.STRING, description: "Name of the company." },
          duration: { type: Type.STRING, description: "Dates of employment, e.g., '2021 - Present'." },
          description: {
            type: Type.ARRAY,
            description: "A list of key responsibilities or achievements in this role.",
            items: { type: Type.STRING },
          },
        },
        required: ["role", "company", "duration"],
      },
    },
    education: {
      type: Type.ARRAY,
      description: "The candidate's educational background.",
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING, description: "The degree obtained, e.g., 'B.S. Computer Science'." },
          institution: { type: Type.STRING, description: "The name of the university or institution." },
          year: { type: Type.STRING, description: "The graduation year or years of attendance, e.g., '2013 - 2017'." },
        },
        required: ["degree", "institution", "year"],
      },
    },
    keyProjects: {
      type: Type.ARRAY,
      description: "A list of key projects the candidate has worked on. If not present, return an empty array.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the project." },
          tech: {
            type: Type.ARRAY,
            description: "A list of technologies used in the project.",
            items: { type: Type.STRING },
          },
          description: { type: Type.STRING, description: "A brief description of the project." },
        },
        required: ["name", "tech"],
      },
    },
  },
  required: ["name", "email", "phone", "role", "summary", "skills", "experience", "education", "keyProjects"],
};

export const processResume = async (fileData: { mimeType: string; data: string }): Promise<Partial<Candidate>> => {
    const prompt = `
      Analyze the following resume document and extract the candidate's information in a structured JSON format according to the provided schema.
      - Extract the full name, email address, and phone number.
      - For skills, if years of experience are mentioned, include them. Otherwise, omit the 'years' field.
      - For experience, list key responsibilities and achievements as an array of strings in the 'description' field. If no description is provided, return an empty array.
      - If a section like 'Key Projects' is not present, return an empty array for it.
      - The summary should be a concise one-sentence overview.
      - Ensure all required fields in the schema are populated. If information for a field is not found, use a reasonable default like an empty string or empty array.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                  { inlineData: fileData },
                  { text: prompt }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: resumeSchema
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error processing resume with Gemini API:", error);
        return { name: "Error Processing Resume", summary: "Failed to parse." };
    }
};