"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MoreVertical,
  RefreshCw,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useGmailStore } from "../store/gmailStore";
import { getHeader } from "@/utils/helper/getHeader";
import clsx from "clsx";
import Link from "next/link";

function parseFrom(from: string) {
  const name = from.split("<")[0]?.replace(/"/g, "").trim();
  const email = from.match(/<(.+?)>/)?.[1];

  return {
    name: name || email || "Unknown",
    email: email || "",
  };
}

export function EmailInbox() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { getMessages, messages, loading, hasMore, currentFilter, toggleStar } =
    useGmailStore();

  useEffect(() => {
    getMessages(activeFilter, false);
  }, [getMessages, activeFilter]);

  const items = messages.map((msg) => {
    const headers = msg.payload?.headers;
    const from = getHeader(headers, "From");
    const { name, email } = parseFrom(from);

    return {
      id: msg.id,
      sender: name,
      senderEmail: email,
      subject: getHeader(headers, "Subject") || "(no subject)",
      date: getHeader(headers, "Date"),
      snippet: msg.snippet,
      unread: msg?.labelIds?.includes("UNREAD"),
      starred: msg?.labelIds?.includes("STARRED"),
    };
  });

  const handleRefresh = () => {
    getMessages(currentFilter, false);
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Inbox</h2>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-3 flex gap-2">
          {["all", "unread", "starred"].map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={activeFilter === filter ? "default" : "outline"}
              className={clsx(
                activeFilter === filter &&
                  "gradient-purple-blue text-white border-0",
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter[0].toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y">
        {loading && (
          <div className="p-6 text-center text-muted-foreground">
            Loading messages…
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            Inbox is empty
          </div>
        )}

        {items.map((email) => (
          <Link href={`/demo/${email.id}`} key={email.id}>
            <div
              className={clsx(
                "px-4 py-3 cursor-pointer transition-colors hover:bg-muted/40",
                email.unread && "bg-muted/30",
              )}
            >
              <div className="flex gap-3">
                <button
                  className="mt-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                >
                  <Star
                    className={clsx(
                      "h-4 w-4 transition-colors",
                      email.starred
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground hover:text-yellow-500",
                    )}
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span
                      className={clsx(
                        "truncate",
                        email.unread
                          ? "font-semibold"
                          : "text-muted-foreground",
                      )}
                    >
                      {email.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {email.date}
                    </span>
                  </div>

                  <p
                    className={clsx(
                      "text-sm truncate",
                      email.unread ? "font-semibold" : "text-muted-foreground",
                    )}
                  >
                    {email.subject}
                  </p>

                  <p className="text-sm text-muted-foreground truncate">
                    {email.snippet}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="w-full py-10 flex items-center justify-center">
          {hasMore && (
            <Button
              onClick={() => getMessages(currentFilter, true)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load older emails"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
