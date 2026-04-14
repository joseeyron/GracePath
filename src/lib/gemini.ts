import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Devotional {
  title: string;
  verse: string;
  reflection: string;
  prayer: string;
  application: string;
}

export interface ReadingPlanTask {
  day: number;
  passage: string;
  focus: string;
}

export interface ReadingPlan {
  title: string;
  description: string;
  dailyTasks: ReadingPlanTask[];
}

export async function generateDevotional(goal: string): Promise<Devotional> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a daily devotional based on this faith goal: "${goal}". 
    The devotional should be encouraging, biblically sound, and practical.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          verse: { type: Type.STRING, description: "A relevant Bible verse (Reference and Text)" },
          reflection: { type: Type.STRING, description: "A 2-3 paragraph reflection on the verse and goal" },
          prayer: { type: Type.STRING, description: "A short closing prayer" },
          application: { type: Type.STRING, description: "A practical step to take today" },
        },
        required: ["title", "verse", "reflection", "prayer", "application"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function generateReadingPlan(goal: string, durationDays: number = 7): Promise<ReadingPlan> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Create a ${durationDays}-day Bible reading plan focused on: "${goal}". 
    Include specific passages and a brief focus for each day.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          dailyTasks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                passage: { type: Type.STRING },
                focus: { type: Type.STRING },
              },
              required: ["day", "passage", "focus"],
            },
          },
        },
        required: ["title", "description", "dailyTasks"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
