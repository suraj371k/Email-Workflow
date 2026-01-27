"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings } from "lucide-react";
import { useGmailStore } from "@/store/gmailStore";
import clsx from "clsx";
import { useUiStore } from "@/store/uiStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function mapLabelToFilter(labelName: string): string | null {
  switch (labelName.toLowerCase()) {
    case "inbox":
      return "all";
    case "unread":
      return "unread";
    case "starred":
      return "starred";
    case "sent":
      return "sent";
    case "draft":
      return "drafts";
    case "spam":
      return "spam";
    case "trash":
      return "trash";
    case "promotions":
      return "promotions";
    case "updates":
      return "updates";
    case "social":
      return "social";
    default:
      return null;
  }
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openCompose = useUiStore((s) => s.openCompose)
  const { labels, getLabels, currentFilter, setFilter } = useGmailStore();

  useEffect(() => {
    getLabels();
  }, [getLabels]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex pt-18.25 md:pt-14.25">
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed left-0 top-18.25 md:top-14.25 bottom-0 w-64 border-r border-border/40 bg-card/50 backdrop-blur-sm z-40 transition-transform duration-300",
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0",
          )}
        >
          <div className="p-4 space-y-1">
            {/* Compose */}
            <Button
              variant="default"
              className="w-full justify-start gradient-purple-blue text-white border-0 hover:opacity-90"
              onClick={openCompose}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Compose
            </Button>

            {/* Folder Labels */}
            <div className="pt-4 flex flex-col space-y-1">
              {labels
                .filter((label) => label.group === "folder")
                .map((label) => {
                  const filter = mapLabelToFilter(label.name);
                  if (!filter) return null;

                  return (
                    <Button
                      key={label.id}
                      variant={currentFilter === filter ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setFilter(filter)}
                    >
                      {label.icon}
                      {label.name}
                    </Button>
                  );
                })}
            </div>

            {/* Category Labels */}
            <div className="pt-4 border-t border-border/40">
              <p className="text-xs font-semibold text-muted-foreground px-3 py-2">
                CATEGORIES
              </p>

              <div className="space-y-1">
                {labels
                  .filter((label) => label.group === "category")
                  .map((label) => {
                    const filter = mapLabelToFilter(label.name);
                    if (!filter) return null;

                    return (
                      <Button
                        key={label.id}
                        variant={
                          currentFilter === filter ? "secondary" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setFilter(filter)}
                      >
                        {label.name}
                      </Button>
                    );
                  })}
              </div>
            </div>

            {/* Settings */}
            <div className="pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-[calc(100vh-57px)]">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
