import { google } from "googleapis";
import User from "../models/user.model";
import { extractEmailText } from "../utils/helper";

export const gmailClient = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user || !user.accessToken || !user.refreshToken) {
    throw new Error("User tokens not found");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
};

export const getMessageByIdService = async (
  messageId: string,
  userId: string,
) => {
  const gmail = await gmailClient(userId);

  const res = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });

  const payload = res.data.payload;

  const textBody = extractEmailText(payload);

  console.log("body: ", textBody);

  return {
    id: res.data.id,
    threadId: res.data.threadId,
    snippet: res.data.snippet,
    subject:
      payload?.headers?.find((h: any) => h.name === "Subject")?.value ?? "",
    from: payload?.headers?.find((h: any) => h.name === "From")?.value ?? "",
    textBody,
  };
};
