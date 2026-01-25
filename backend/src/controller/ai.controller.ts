import { Request, Response } from "express";
import { getMessageByIdService } from "../services/gmail.services";
import { structureEmailText } from "../utils/helper";
import { generateSummary } from "../services/ai.services";
import AI from "../models/ai.model";

export const summarizeMessage = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const { messageId } = req.params;

    const message = await getMessageByIdService(messageId, userId);

    const structuredBody = structureEmailText(message.textBody);

    const aiResponse = await generateSummary({
      from: message.from,
      subject: message.subject,
      body: JSON.stringify(structuredBody),
    });

    const data = await AI.create({
      userId,
      summary: aiResponse.summary,
      priority: aiResponse.priority || "medium",
      categories: aiResponse.categories || "unread",
      keyPoints: aiResponse.keyPoints || [],
      language: aiResponse.language || "english",
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in summarize message controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const summary = await AI.findById(id);

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error in get summary message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
