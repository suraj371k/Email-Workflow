"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Inbox, Send, FileText, Archive, Trash2, Settings, Search, Bell, User, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">     

      <div className="flex pt-18.25 md:pt-14.25">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-18.25 md:top-14.25 bottom-0 w-64 border-r border-border/40 bg-card/50 backdrop-blur-sm z-40 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-1">
            <Button
              variant="default"
              className="w-full justify-start gradient-purple-blue text-white border-0 hover:opacity-90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Compose
            </Button>

            <div className="pt-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Inbox className="w-4 h-4 mr-2" />
                Inbox
                <Badge className="ml-auto bg-primary text-primary-foreground">24</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Sent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Drafts
                <Badge className="ml-auto bg-muted text-muted-foreground">3</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash2 className="w-4 h-4 mr-2" />
                Trash
              </Button>
            </div>

            <div className="pt-4 border-t border-border/40">
              <p className="text-xs font-semibold text-muted-foreground px-3 py-2">CATEGORIES</p>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <div className="w-2 h-2 rounded-full bg-destructive mr-3"></div>
                  Urgent
                  <Badge className="ml-auto bg-destructive/10 text-destructive">8</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                  Important
                  <Badge className="ml-auto bg-yellow-500/10 text-yellow-500">12</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                  Newsletter
                  <Badge className="ml-auto bg-blue-500/10 text-blue-500">45</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  Personal
                  <Badge className="ml-auto bg-green-500/10 text-green-500">6</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mr-3"></div>
                  Spam
                  <Badge className="ml-auto bg-gray-500/10 text-gray-500">23</Badge>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glassmorphism p-4 rounded-lg border border-border/40">
              <p className="text-sm font-medium text-foreground mb-2">AI Processing</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>487 / 500 emails</span>
                <span>97%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-purple-blue" style={{ width: "97%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">13 emails remaining this month</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 min-h-[calc(100vh-57px)]">{children}</main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
