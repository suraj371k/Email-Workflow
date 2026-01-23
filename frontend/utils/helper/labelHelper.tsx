import {
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  AlertOctagon,
  Star,
} from "lucide-react";
import { JSX } from "react";


export type LabelGroup =
  | "folder"
  | "category"
  | "status"
  | "primary";

export interface NormalizedLabel {
  id: string;
  name: string;
  group: LabelGroup;
  icon?: JSX.Element;
  priority: number;
}


function capitalize(text: string) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

function formatCategory(name: string) {
  return name
    .replace("CATEGORY_", "")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function folderIcon(name: string) {
  switch (name) {
    case "INBOX":
      return <Inbox className="w-4 h-4 mr-2" />;
    case "SENT":
      return <Send className="w-4 h-4 mr-2" />;
    case "DRAFT":
      return <FileText className="w-4 h-4 mr-2" />;
    case "TRASH":
      return <Trash2 className="w-4 h-4 mr-2" />;
    case "SPAM":
      return <AlertOctagon className="w-4 h-4 mr-2" />;
    default:
      return <Archive className="w-4 h-4 mr-2" />;
  }
}


export function normalizeGmailLabel(label: {
  id: string;
  name: string;
  type: "system" | "user";
}): NormalizedLabel | null {
  const { id, name, type } = label;

  // Hide Gmail internals
  if (name.startsWith("[Imap]")) return null;

  // Folders
  if (["INBOX", "SENT", "DRAFT", "TRASH", "SPAM"].includes(name)) {
    return {
      id,
      name: capitalize(name),
      group: "folder",
      icon: folderIcon(name),
      priority: 1,
    };
  }

  // Categories
  if (name.startsWith("CATEGORY_")) {
    return {
      id,
      name: formatCategory(name),
      group: "category",
      priority: 3,
    };
  }

  // Status labels
  if (name === "STARRED") {
    return {
      id,
      name: "Starred",
      group: "status",
      icon: <Star className="w-4 h-4 mr-2" />,
      priority: 2,
    };
  }

  if (name === "UNREAD") {
    return {
      id,
      name: "Unread",
      group: "status",
      priority: 2,
    };
  }

  // User-created labels
  if (type === "user") {
    return {
      id,
      name,
      group: "primary",
      priority: 4,
    };
  }

  return null;
}
