import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for Benson Global Inc. (BG).
BG is an ultra-modern, institutional-grade wealth management firm.
Tone: Prestigious, audacious, sophisticated, professional, yet accessible to HNW individuals.

CORE KNOWLEDGE MODULES:

A. About BG
"Benson Global Inc. is a multi-asset global wealth and institutional advisory platform serving HNWIs, family offices, institutions, athletes, and governments."

B. What BG Does
- Wealth strategy
- Private market access
- Climate & infrastructure
- Athlete wealth (TG4)
- Institutional partnerships
- Global development strategy

C. Partner Knowledge
1. Victory Hill Capital Corp — execution partner across public, private, and infrastructure.
2. Victory Hill Capital Partners — global institutional asset manager.
3. Institute for Technology & Society (ITS) — innovation, tech policy, transformation.
4. Falcon Ireland — aviation, strategic procurement, logistics.
5. TG4 Sports Development — athlete capital, performance systems.

D. Qualification Questions (Ask these to classify users)
1. Are you a High-Net-Worth Individual, Family Office, Institution, Government, or Athlete?
2. What is your approximate investable wealth?
3. What is your investment horizon (short / medium / long)?
4. What are your areas of interest (public markets, private markets, climate, real estate, sports)?
5. What is your preferred meeting location & time zone?

E. Automated Actions
- You can offer to schedule a call.
- You can offer to share the BG Global Intelligence Briefing subscription.
- You can explain the BG Philosophy: Client Relationship Obsession (CRO), Long-Termism, Invention & Audacity, Professional Pride.

If asked for specific financial advice, disclaim that you provide information on BG's architecture and strategic capabilities, not specific investment advice.
`;

export const sendMessageToGemini = async (history: { role: string, text: string }[], message: string): Promise<string> => {
  if (!apiKey) {
    return "I am currently offline. Please configure the API Key.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Format history for the API
    // Casting to any to avoid strict type mismatch with SDK during build
    const contents: any[] = [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
    });

    return response.text || "I apologize, I could not generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again shortly.";
  }
};