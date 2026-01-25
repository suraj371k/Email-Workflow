import { z } from "zod";

export const GmailAnalysisSchema = z.object({
  priority: z.enum(["high", "medium", "low", "urgent"]),
  categories: z.enum([
    "spam",
    "newsletter",
    "urgent",
    "unread",
    "social",
    "promotions",
  ]),
  summary: z.string().describe("A concise summary of the email"),
  keyPoints: z.array(z.string()).describe("3-5 key points from the email"),
  language: z.enum(["english", "hindi"]).default("english"),
});

export type GmailAnalysis = z.infer<typeof GmailAnalysisSchema>;
