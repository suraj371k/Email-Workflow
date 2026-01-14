"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Star, MoreVertical, ChevronDown, RefreshCw, Filter, Clock, AlertCircle } from "lucide-react"
import { EmailDetail } from "./email-detail"

interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  timestamp: string
  category: "urgent" | "important" | "newsletter" | "personal" | "spam"
  priority: "high" | "medium" | "low"
  read: boolean
  starred: boolean
  hasAttachment: boolean
  fullContent: string
}

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah.johnson@acmecorp.com",
    subject: "Q4 Budget Review - Action Required",
    preview: "Hi team, we need to finalize the Q4 budget by end of week. Please review the attached spreadsheet...",
    timestamp: "2 min ago",
    category: "urgent",
    priority: "high",
    read: false,
    starred: true,
    hasAttachment: true,
    fullContent:
      "Hi team,\n\nWe need to finalize the Q4 budget by end of week. Please review the attached spreadsheet and provide your input on the proposed allocations.\n\nKey areas to focus on:\n- Marketing spend allocation\n- R&D investments\n- Operational costs\n\nPlease reply with your feedback by Friday EOD.\n\nBest regards,\nSarah",
  },
  {
    id: "2",
    sender: "LinkedIn",
    senderEmail: "notifications@linkedin.com",
    subject: "You appeared in 52 searches this week",
    preview: "Your profile is gaining traction! See who's been viewing your profile and connect with them...",
    timestamp: "1 hour ago",
    category: "newsletter",
    priority: "low",
    read: false,
    starred: false,
    hasAttachment: false,
    fullContent:
      "Your profile is gaining traction!\n\nSee who's been viewing your profile and connect with them to expand your network.\n\nYou appeared in 52 searches this week, up 23% from last week.",
  },
  {
    id: "3",
    sender: "Michael Chen",
    senderEmail: "m.chen@techstartup.io",
    subject: "Partnership Opportunity - Let's Connect",
    preview: "Hi there, I came across your company and I'm impressed by your work in AI automation...",
    timestamp: "3 hours ago",
    category: "important",
    priority: "high",
    read: false,
    starred: false,
    hasAttachment: false,
    fullContent:
      "Hi there,\n\nI came across your company and I'm impressed by your work in AI automation. I believe there's a great synergy between our companies.\n\nWould you be available for a call next week to discuss potential partnership opportunities?\n\nLooking forward to hearing from you.\n\nBest,\nMichael",
  },
  {
    id: "4",
    sender: "Netflix",
    senderEmail: "info@netflix.com",
    subject: "New releases you might like",
    preview: "Check out these new shows and movies added this week based on your viewing history...",
    timestamp: "5 hours ago",
    category: "newsletter",
    priority: "low",
    read: true,
    starred: false,
    hasAttachment: false,
    fullContent: "Check out these new shows and movies added this week based on your viewing history.",
  },
  {
    id: "5",
    sender: "David Wilson",
    senderEmail: "david@company.com",
    subject: "Server Maintenance - Critical Alert",
    preview:
      "URGENT: Scheduled maintenance tonight at 11 PM EST. All services will be down for approximately 2 hours...",
    timestamp: "6 hours ago",
    category: "urgent",
    priority: "high",
    read: false,
    starred: true,
    hasAttachment: false,
    fullContent:
      "URGENT: Scheduled maintenance tonight at 11 PM EST.\n\nAll services will be down for approximately 2 hours. Please ensure all critical operations are completed before the maintenance window.\n\nBackup systems will be available if needed.",
  },
  {
    id: "6",
    sender: "Emma Davis",
    senderEmail: "emma.davis@personal.com",
    subject: "Coffee next week?",
    preview: "Hey! It's been a while since we caught up. Would you be free for coffee next week?...",
    timestamp: "Yesterday",
    category: "personal",
    priority: "medium",
    read: true,
    starred: false,
    hasAttachment: false,
    fullContent:
      "Hey!\n\nIt's been a while since we caught up. Would you be free for coffee next week? I'd love to hear about your new project!\n\nLet me know what works for you.\n\nEmma",
  },
  {
    id: "7",
    sender: "Amazon Web Services",
    senderEmail: "no-reply@aws.amazon.com",
    subject: "Your monthly AWS bill is ready",
    preview: "Your bill for December 2025 is $234.56. View your detailed usage report...",
    timestamp: "Yesterday",
    category: "important",
    priority: "medium",
    read: true,
    starred: false,
    hasAttachment: true,
    fullContent:
      "Your bill for December 2025 is $234.56.\n\nView your detailed usage report and download your invoice from the AWS console.",
  },
  {
    id: "8",
    sender: "Spam Bot",
    senderEmail: "noreply@suspicious.xyz",
    subject: "You've won $1,000,000! Claim now!!!",
    preview: "Congratulations! You've been selected as our lucky winner. Click here to claim your prize...",
    timestamp: "2 days ago",
    category: "spam",
    priority: "low",
    read: false,
    starred: false,
    hasAttachment: false,
    fullContent: "Congratulations! You've been selected as our lucky winner. Click here to claim your prize...",
  },
  {
    id: "9",
    sender: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "[Security Alert] New sign-in from unrecognized device",
    preview: "We noticed a new sign-in to your account from a device we don't recognize...",
    timestamp: "2 days ago",
    category: "important",
    priority: "high",
    read: true,
    starred: false,
    hasAttachment: false,
    fullContent:
      "We noticed a new sign-in to your account from a device we don't recognize.\n\nLocation: San Francisco, CA\nDevice: Chrome on macOS\nTime: Jan 3, 2026 at 2:34 PM PST\n\nIf this was you, you can ignore this message. If not, please secure your account immediately.",
  },
  {
    id: "10",
    sender: "Project Management Tool",
    senderEmail: "notifications@projecttool.com",
    subject: "5 tasks due this week",
    preview: "You have 5 tasks approaching their deadline. Review your task list to stay on track...",
    timestamp: "3 days ago",
    category: "important",
    priority: "medium",
    read: true,
    starred: false,
    hasAttachment: false,
    fullContent: "You have 5 tasks approaching their deadline. Review your task list to stay on track.",
  },
]

export function EmailInbox() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [emails, setEmails] = useState(mockEmails)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const getCategoryColor = (category: Email["category"]) => {
    switch (category) {
      case "urgent":
        return "bg-destructive text-white"
      case "important":
        return "bg-yellow-500 text-white"
      case "newsletter":
        return "bg-blue-500 text-white"
      case "personal":
        return "bg-green-500 text-white"
      case "spam":
        return "bg-gray-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority: Email["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-destructive" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "low":
        return null
      default:
        return null
    }
  }

  const toggleStar = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, starred: !email.starred } : email)))
  }

  const filteredEmails = emails.filter((email) => {
    if (activeFilter === "all") return true
    if (activeFilter === "unread") return !email.read
    if (activeFilter === "starred") return email.starred
    return email.category === activeFilter
  })

  return (
    <div className="flex h-full">
      {/* Email List */}
      <div className={`${selectedEmail ? "hidden lg:block" : "block"} lg:w-2/5 border-r border-border/40 bg-card/30`}>
        <div className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Inbox</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "gradient-purple-blue text-white border-0" : ""}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("unread")}
                className={activeFilter === "unread" ? "gradient-purple-blue text-white border-0" : ""}
              >
                Unread
              </Button>
              <Button
                variant={activeFilter === "starred" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter("starred")}
                className={activeFilter === "starred" ? "gradient-purple-blue text-white border-0" : ""}
              >
                Starred
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-3 h-3 mr-1" />
                More
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Email List Items */}
        <div className="divide-y divide-border/40">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                !email.read ? "bg-muted/30" : ""
              } ${selectedEmail?.id === email.id ? "bg-muted/50 border-l-4 border-primary" : ""}`}
            >
              <div className="flex items-start gap-3">
                <button onClick={(e) => toggleStar(email.id, e)} className="mt-1">
                  <Star
                    className={`w-4 h-4 ${email.starred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${!email.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {email.sender}
                    </span>
                    <Badge className={`text-xs ${getCategoryColor(email.category)}`}>{email.category}</Badge>
                    {getPriorityIcon(email.priority)}
                  </div>
                  <h3
                    className={`text-sm mb-1 ${!email.read ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {email.subject}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                    {email.hasAttachment && (
                      <Badge variant="outline" className="text-xs">
                        📎
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Detail */}
      <div className={`${selectedEmail ? "block" : "hidden lg:block"} flex-1 bg-background`}>
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} onClose={() => setSelectedEmail(null)} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Select an email to read</h3>
              <p className="text-muted-foreground">Choose an email from the list to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
