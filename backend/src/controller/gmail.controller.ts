import { Request, Response } from "express";
import { gmailClient, getMessageByIdService } from "../services/gmail.services";
import { FILTER_QUERY_MAP, structureEmailText } from "../utils/helper";

export const getLabels = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = (req.user as any)._id;

    const gmail = await gmailClient(userId);

    const response = await gmail.users.labels.list({
      userId: "me",
    });

    const labels = response.data.labels ?? [];

    let fullLables = await Promise.all(
      labels.map(async (label) => {
        const res = await gmail.users.labels.get({
          userId: "me",
          id: label.id!,
        });
        return res.data;
      }),
    );

    return res.status(200).json({
      success: true,
      data: fullLables,
    });
  } catch (error) {
    console.error("Error in get labels:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = (req.user as any)._id;
    const gmail = await gmailClient(userId);

    const filter = (req.query.filter as string) || "all";
    const pageToken = req.query.pageToken as string | undefined;

    let q = FILTER_QUERY_MAP[filter] || "in:inbox";

    const listRes = await gmail.users.messages.list({
      userId: "me",
      q,
      maxResults: 50,
      pageToken,
    });

    const messages = listRes.data.messages || [];

    const fullMessages = await Promise.all(
      messages.map(({ id }) =>
        gmail.users.messages.get({
          userId: "me",
          id: id!,
          format: "full",
        }),
      ),
    );

    return res.status(200).json({
      success: true,
      filter,
      count: fullMessages.length,
      nextPageToken: listRes.data.nextPageToken ?? null,
      data: fullMessages.map((m) => m.data),
    });
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const { messageId } = req.params;

    const message = await getMessageByIdService(messageId, userId);
    const structured = structureEmailText(message.textBody);

    return res.status(200).json({
      success: true,
      data: {
        id: message.id,
        subject: message.subject,
        from: message.from,
        content: structured,
      },
    });
  } catch (error) {
    console.error("Error in getMessageById controller:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
