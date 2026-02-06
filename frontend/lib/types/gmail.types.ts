export interface Body {
  size: number;
  data?: string;
}

export interface Header {
  name: string;
  value: string;
}

export interface Payload {
  partId: string;
  mimeType: string;
  filename?: string;
  headers: Header[];
  body: Body;
  parts?: Payload[];
  messages: Body;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  sizeEstimate?: number;
  internalDate?: string;
  payload: Payload;
  nextPageToken: string | null;
  hasMore: boolean;
}

export interface Labels {
  id: string;
  name: string;
  messageListVisibility: string;
  labelListVisibility: string;
  messagesTotal: number;
  messagesUnread: number;
  threadsTotal: number;
  threadsUnread: number;
  type: "system" | "user";
}

interface Links {
  text: string;
  url: string;
}
interface Content {
  footer?: string;
  intro: string;
  links?: Links[];
  paragraphs: string[];
  title: string;
}

export interface MessageBody {
  from: string;
  id: string;
  subject: string;
  content: Content;
  date: string;
}

export interface DraftInput {
  to: string;
  subject: string;
  body: string;
}