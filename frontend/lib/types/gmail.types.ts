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
}


export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  sizeEstimate?: number;
  internalDate?: string;
  payload: Payload;
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