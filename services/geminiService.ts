import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Safely access process.env to prevent ReferenceError in browser environments
const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    // process is not defined
  }
  return '';
};

const API_KEY = getApiKey();

// Helper to get a safe instance. 
// In a real app, we might handle missing keys more gracefully in the UI.
const getAIInstance = () => {
  if (!API_KEY) {
    console.warn("No API Key found. Ensure process.env.API_KEY is set.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const createChatSession = (): Chat => {
  const ai = getAIInstance();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a helpful, encouraging, and knowledgeable PCMB + CS Tutor for Pre-University (high school) students. 
      Your goal is to explain complex scientific concepts simply.
      - Use analogies.
      - If a student asks about a lab experiment (Physics, Chem, Bio), explain the theory and safety precautions.
      - For Math and CS, provide step-by-step logic.
      - Keep responses concise but complete.
      - Be friendly and use emojis occasionally to keep the mood light.`,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string) => {
  try {
    const response = await chat.sendMessageStream({ message });
    return response;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};