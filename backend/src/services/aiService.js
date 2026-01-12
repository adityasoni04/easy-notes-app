import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateEmbedding = async (text) => {
  try {
    const cleanText = text.replace(/\n/g, " ").trim(); 

    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    
    const result = await model.embedContent(cleanText);
    
    return result.embedding.values;
  } catch (error) {
    console.error("AI Embedding Error:", error);
    throw new Error("Failed to generate AI embedding");
  }
};