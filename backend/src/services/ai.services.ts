import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GmailAnalysis, GmailAnalysisSchema } from "../Schema/ai.schema";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  apiKey: process.env.GEMINI_API_KEY,
  maxRetries: 2,
});

export interface GmailMessage {
  subject: string;
  body: string;
  from: string;
  date?: string;
}

export const generateSummary = async (
  message: GmailMessage,
): Promise<GmailAnalysis> => {
  try {
    const agent = createAgent({
      model: llm,
      responseFormat: GmailAnalysisSchema,
      systemPrompt: `
You are an AI assistant that analyzes emails and returns structured output.
Follow the schema exactly.
`,
    });

    const result = await agent.invoke({
      messages: [
        {
          role: "user",
          content: `
From: ${message.from}
Subject: ${message.subject}
Date: ${message.date || "Not specified"}
Body: ${message.body}

Analyze this email.
`,
        },
      ],
    });

    return {
      ...result.structuredResponse,
      language: result.structuredResponse.language ?? "english",
    };
  } catch (error) {
    console.error("Error in generate summary service:", error);
    throw error; // ✅ REQUIRED
  }
};
