"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useGmailStore } from "@/store/gmailStore";
import { format } from "date-fns";
import {
  Archive,
  Clock,
  Folder,
  Forward,
  Mail,
  MoreVertical,
  Printer,
  Reply,
  ReplyAll,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getHeader, parseFrom } from "@/utils/helper/getHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Summary from "../summary/page";
import { useAiStore } from "@/store/aiStore";

export default function MessageDetail() {
  const { getMessageById, message, loading, messages, getMessages } =
    useGmailStore();
  const params = useParams();
  const messageId = params?.messageId as string;
  const [isStarred, setIsStarred] = useState(false);
  const [active, setActive] = useState("all");
  const [isEmail, setIsEmail] = useState("email");
  const {
    generateSummary,
    loading: AiLoading,
  } = useAiStore();

  useEffect(() => {
    getMessages(active);
  }, [active]);

  const handleGenerateSummary = async () => {
    generateSummary(messageId);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    if (messageId) getMessageById(messageId);
  }, [messageId]);

  if (loading) {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-black text-gray-100">
      <Tabs defaultValue="email">
        <ScrollArea className="flex-1 mt-20">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            {/* Subject */}
            <div className="mb-8">
              <h1 className="text-2xl font-medium text-white mb-3 tracking-tight">
                {message?.subject || "Email Subject"}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Badge
                  variant="outline"
                  className="font-normal bg-gray-900/30 border-gray-700 text-gray-300"
                >
                  Inbox
                </Badge>
                <span className="text-gray-600">•</span>
                <span>{format(new Date(), "MMM d, yyyy, h:mm a")}</span>
              </div>
            </div>

            {/* Sender Info */}
            <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-800">
              <Avatar className="h-11 w-11 border border-gray-700">
                <AvatarFallback className="bg-linear-to-br from-gray-800 to-gray-900 text-gray-300">
                  {getInitials(message?.subject || "")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-white text-lg">
                        {message?.subject}
                      </span>
                      <span className="text-sm text-gray-400 truncate">
                        &lt;{message?.from}&gt;
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      <span className="text-gray-400">to </span>
                      <span className="text-gray-300">me</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    {format(new Date(), "h:mm a")}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-gray-800/50 text-gray-400 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Button
                
                onClick={handleGenerateSummary}
                className="w-full cursor-pointer"
              >
                {AiLoading ? "Processing..." : "Process with AI"}
              </Button>
            </div>

            {/* tabs */}
            <TabsList className="flex w-full gap-5 justify-between my-5 bg-black items-center">
              <TabsTrigger
                value="email"
                className="
    text-zinc-400 font-semibold cursor-pointer
    bg-black
    py-5
    transition-all

    data-[state=active]:bg-[#1F2937]
    data-[state=active]:text-zinc-300
  "
              >
                Email Content
              </TabsTrigger>

              <TabsTrigger
                value="summary"
                className="
    text-zinc-400 font-semibold cursor-pointer
=    bg-black
py-5
    transition-all

    data-[state=active]:bg-[#1F2937]
    data-[state=active]:text-zinc-300
  "
              >
                AI Analysis
              </TabsTrigger>
            </TabsList>

            {/* Email Body */}
            <TabsContent value="email">
              <div className="mb-10">
                <div
                  className="prose prose-invert max-w-none
      prose-p:leading-relaxed
      prose-p:text-gray-200
      prose-strong:text-white
      prose-a:text-blue-400 hover:prose-a:text-blue-300
      prose-headings:text-white"
                  style={{
                    fontFamily:
                      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    lineHeight: "1.7",
                  }}
                >
                  {/* Intro */}
                  {message?.content.intro && (
                    <p className="text-lg font-medium text-gray-100 mb-6">
                      {message.content.intro}
                    </p>
                  )}

                  {/* Main paragraphs */}
                  {message?.content?.paragraphs &&
                    message.content.paragraphs.length > 0 && (
                      <div className="space-y-4">
                        {message.content.paragraphs.map((para, index) => (
                          <p key={index} className="text-base text-gray-200">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                  {/* Links section */}
                  {message &&
                    message.content &&
                    Array.isArray(message.content.links) &&
                    message.content.links.length > 0 && (
                      <div className="mt-10 not-prose">
                        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                          Related links
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {message.content.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              className="px-3 py-1 rounded-md bg-gray-800 text-sm text-blue-400 hover:bg-gray-700"
                            >
                              {link.text}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Footer */}
                  {message?.content.footer && (
                    <div className="mt-10 not-prose">
                      <p className="text-sm text-gray-500 border-t border-gray-800 pt-4">
                        {message.content.footer}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Reply Buttons */}
              <div className="flex items-center gap-3 mb-10">
                <Button className="rounded-lg gap-2 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg gap-2 border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600"
                >
                  <ReplyAll className="h-4 w-4" />
                  Reply All
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg gap-2 border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-600"
                >
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="summary">
              <Summary />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
