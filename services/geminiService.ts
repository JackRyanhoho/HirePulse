
import { GoogleGenAI } from "@google/genai";
import { CANDIDATE_DATA } from './mockData';
import type { Candidate } from '../types';

// This is a mock setup. In a real application, the API key would be
// managed securely and not hardcoded or exposed on the client-side.
// We are simulating the structure as if it were a real service.
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface MockGenerateContentResponse {
    text: string;
    candidates?: string[];
}

// Mock function to simulate ai.models.generateContent
export const generateContent = (prompt: string): Promise<MockGenerateContentResponse> => {
    console.log("Simulating Gemini API call with prompt:", prompt);
    
    return new Promise(resolve => {
        setTimeout(() => {
            const lowerCasePrompt = prompt.toLowerCase();
            let filteredCandidates: Candidate[] = [];

            // Simple keyword matching for simulation
            const skillKeywords = ['react', 'node', 'python', 'typescript', 'java', 'devops'];
            const foundSkills = skillKeywords.filter(skill => lowerCasePrompt.includes(skill));

            if (foundSkills.length > 0) {
                filteredCandidates = CANDIDATE_DATA.filter(candidate => 
                    candidate.skills.some(skill => foundSkills.includes(skill.name.toLowerCase()))
                );
            } else if (lowerCasePrompt.includes('all candidates') || lowerCasePrompt.includes('show me candidates')) {
                filteredCandidates = CANDIDATE_DATA;
            } else {
                 filteredCandidates = CANDIDATE_DATA.filter(candidate => 
                    candidate.role.toLowerCase().includes(lowerCasePrompt) || 
                    candidate.name.toLowerCase().includes(lowerCasePrompt)
                );
            }

            // Experience matching
            const yearMatch = lowerCasePrompt.match(/(\d+)\+? years?/);
            if (yearMatch) {
                const years = parseInt(yearMatch[1], 10);
                filteredCandidates = filteredCandidates.filter(candidate => 
                    candidate.skills.some(skill => skill.years >= years && foundSkills.includes(skill.name.toLowerCase()))
                );
            }
            
            let responseText = '';
            if (filteredCandidates.length > 0) {
                responseText = `I found ${filteredCandidates.length} candidate(s) that match your criteria. Here are the top results:`;
            } else {
                responseText = "I couldn't find any candidates matching your criteria. Please try a different search.";
            }

            resolve({
                text: responseText,
                candidates: filteredCandidates.map(c => c.id),
            });

        }, 1500); // Simulate network delay
    });
};
