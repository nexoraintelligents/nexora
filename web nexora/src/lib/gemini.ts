import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface AIInsight {
  recommendations: string[];
  analysis: string;
  impact: "High" | "Medium" | "Low";
}

export async function generateInsight(problem: string): Promise<AIInsight> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following business problem and provide actionable insights: "${problem}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 actionable recommendations",
            },
            analysis: {
              type: Type.STRING,
              description: "A brief summary of the AI analysis",
            },
            impact: {
              type: Type.STRING,
              enum: ["High", "Medium", "Low"],
              description: "The potential impact of the recommendations",
            },
          },
          required: ["recommendations", "analysis", "impact"],
        },
      },
    });

    return JSON.parse(response.text || "{}") as AIInsight;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendations: ["Optimize resource allocation", "Scale marketing efforts", "Refine target audience"],
      analysis: "Unable to connect to AI engine. Showing default strategic insights based on industry standards.",
      impact: "Medium",
    };
  }
}
