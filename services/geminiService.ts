
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getSmartRecommendations = async (userInput: string, products: Product[]) => {
  try {
    const productListString = products.map(p => `${p.id}: ${p.name} - ${p.category} - ${p.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert shopping assistant for NexusCart. 
      The user says: "${userInput}"
      Available Products:
      ${productListString}
      
      Recommend the top 3 product IDs based on user's input. Return as a JSON array of strings (the IDs).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const recommendedIds = JSON.parse(response.text.trim());
    return products.filter(p => recommendedIds.includes(p.id));
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return products.slice(0, 3);
  }
};

export const getProductSummary = async (product: Product) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a catchy, short marketing summary for this product: ${product.name}. Description: ${product.description}. Keep it under 50 words.`
    });
    return response.text;
  } catch (error) {
    return product.description;
  }
};
