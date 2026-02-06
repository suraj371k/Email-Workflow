import { Request, Response } from "express";
import { gmailClient, getMessageByIdService } from "../services/gmail.services";
import { FILTER_QUERY_MAP, structureEmailText } from "../utils/helper";

//get labels
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

//get the list of messages
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
          format: "metadata",
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

//get full messages
export const getMessageById = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const messageId = typeof req.params.messageId === "string"
      ? req.params.messageId
      : Array.isArray(req.params.messageId)
        ? req.params.messageId[0]
        : "";

    const message = await getMessageByIdService(messageId, userId);
    const structured = structureEmailText(message.textBody);

    // Mark message as read when opened
    const gmail = await gmailClient(userId);
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });

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

//create draft
export const createDraft = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const { to, subject, body } = req.body;

    //build email
    const emailLines = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "",
      body,
    ];

    const email = emailLines.join("\n");

    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const gmail = await gmailClient(userId);
    const draft = await gmail.users.drafts.create({
      userId: "me",
      requestBody: {
        message: {
          raw: encodedEmail,
        },
      },
    });

    return res.status(201).json({
      success: true,
      draftId: draft.data.id,
      messageId: draft.data.message?.id,
    });
  } catch (error) {
    console.log("Error in create draft controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//send email
export const sendEmail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { to, subject, body } = req.body;

    //build email
    const emailLines = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "",
      body,
    ];

    const email = emailLines.join("\n");

    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const gmail = await gmailClient(userId);

    const sendEmail = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log("sendEmail: ", sendEmail.data);

    return res.status(200).json({
      success: true,
      messageId: sendEmail.data.id,
    });
  } catch (error) {
    console.log("Error in send email controller: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//star/unstar message
export const toggleStar = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = (req.user as any)._id;
    const messageId = typeof req.params.messageId === "string"
      ? req.params.messageId
      : Array.isArray(req.params.messageId)
        ? req.params.messageId[0]
        : "";

    const gmail = await gmailClient(userId);

    // Get current message to check if it's starred
    const message = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
      format: "metadata",
    });

    const isStarred = message.data.labelIds?.includes("STARRED");

    // Toggle star status
    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        [isStarred ? "removeLabelIds" : "addLabelIds"]: ["STARRED"],
      },
    });

    return res.status(200).json({
      success: true,
      starred: !isStarred,
    });
  } catch (error) {
    console.error("Error in toggleStar controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//mark message as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = (req.user as any)._id;
    const messageId = typeof req.params.messageId === "string"
      ? req.params.messageId
      : Array.isArray(req.params.messageId)
        ? req.params.messageId[0]
        : "";

    const gmail = await gmailClient(userId);

    await gmail.users.messages.modify({
      userId: "me",
      id: messageId,
      requestBody: {
        removeLabelIds: ["UNREAD"],
      },
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in markAsRead controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

