import { htmlToText } from "html-to-text";


export const decodeBase64Url = (data: string): string => {
  if (!data) return "";

  const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf-8");
};


export const extractParts = (
  part: any,
  result: { text?: string; html?: string }
) => {
  if (!part) return;

  // Capture body
  if (part.body?.data) {
    if (part.mimeType === "text/plain" && !result.text) {
      result.text = decodeBase64Url(part.body.data);
    }

    if (part.mimeType === "text/html" && !result.html) {
      result.html = decodeBase64Url(part.body.data);
    }
  }

  // Walk nested parts
  if (part.parts?.length) {
    for (const subPart of part.parts) {
      extractParts(subPart, result);
    }
  }
};


export const extractEmailText = (payload: any): string => {
  const result: { text?: string; html?: string } = {};

  extractParts(payload, result);

  // Prefer plain text
  if (result.text) {
    return result.text.trim();
  }

  // Fallback: HTML → text
  if (result.html) {
    return htmlToText(result.html, {
      wordwrap: false,
      selectors: [
        { selector: "a", options: { hideLinkHrefIfSameAsText: true } },
        { selector: "img", format: "skip" },
        { selector: "style", format: "skip" },
        { selector: "script", format: "skip" },
      ],
    }).trim();
  }

  return "";
};



export const FILTER_QUERY_MAP: Record<string, string> = {
  all: "in:inbox",
  unread: "is:unread",
  starred: "is:starred",
  sent: "in:sent",
  drafts: "is:draft",
  spam: "in:spam",
  trash: "in:trash",
  promotions: "category:promotions",
  updates: "category:updates",
  social: "category:social",
};

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const structureEmailText = (text: string) => {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  const links: { text: string; url: string }[] = [];

  for (const line of lines) {
    const urls = line.match(urlRegex);
    if (urls) {
      urls.forEach(url => {
        links.push({ text: "Open link", url });
      });
    } else {
      paragraphs.push(line);
    }
  }

  return {
    title: paragraphs.shift(),        
    intro: paragraphs.shift(),       
    paragraphs,
    links,
    footer: paragraphs.slice(-3).join(" "),
  };
};
