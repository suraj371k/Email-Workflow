"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star,
  MoreVertical,
  Sparkles,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  Mail,
  Zap,
  Copy,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmailDetailProps {
  email: {
    id: string
    sender: string
    senderEmail: string
    subject: string
    timestamp: string
    category: "urgent" | "important" | "newsletter" | "personal" | "spam"
    priority: "high" | "medium" | "low"
    starred: boolean
    fullContent: string
  }
  onClose: () => void
}

interface AIAnalysis {
  category: string
  priority: string
  sentiment: string
  priorityScore: number
  actionItems: Array<{
    task: string
    deadline?: string
  }>
  suggestedResponse: string
  keyPoints: string[]
  extractedDates: Array<{
    date: string
    context: string
  }>
}

export function EmailDetail({ email, onClose }: EmailDetailProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [activeTab, setActiveTab] = useState("content")

  const processWithAI = () => {
    setIsProcessing(true)
    setActiveTab("ai-analysis")

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      // Generate AI analysis based on email content
      const analysis: AIAnalysis = generateAIAnalysis(email)
      setAiAnalysis(analysis)
      setIsProcessing(false)
    }, 2000)
  }

  const generateAIAnalysis = (email: EmailDetailProps["email"]): AIAnalysis => {
    // Generate contextual AI analysis based on email category and content
    const analyses: Record<string, AIAnalysis> = {
      urgent: {
        category: "Urgent - Business Critical",
        priority: "High",
        sentiment: "Professional, Action Required",
        priorityScore: 95,
        actionItems: [
          { task: "Review Q4 budget spreadsheet", deadline: "Friday EOD" },
          { task: "Provide feedback on allocations", deadline: "This week" },
          { task: "Schedule follow-up meeting", deadline: "Next week" },
        ],
        suggestedResponse:
          "Hi Sarah,\n\nThank you for the heads up on the Q4 budget review. I'll review the spreadsheet today and provide my detailed feedback by Thursday.\n\nI have some thoughts on the marketing spend allocation that I'd like to discuss. Would you be available for a quick call tomorrow?\n\nBest regards",
        keyPoints: [
          "Q4 budget finalization deadline: End of week",
          "Focus areas: Marketing, R&D, Operations",
          "Spreadsheet attachment requires review",
        ],
        extractedDates: [{ date: "Friday EOD", context: "Budget review deadline" }],
      },
      important: {
        category: "Important - Requires Attention",
        priority: "High",
        sentiment: "Professional, Opportunity",
        priorityScore: 85,
        actionItems: [
          { task: "Research TechStartup company background", deadline: "This week" },
          { task: "Schedule partnership discussion call", deadline: "Next week" },
          { task: "Prepare partnership proposal outline" },
        ],
        suggestedResponse:
          "Hi Michael,\n\nThank you for reaching out. I'm definitely interested in exploring potential partnership opportunities between our companies.\n\nI'm available for a call next Tuesday or Wednesday afternoon. Would either of those work for you?\n\nLooking forward to our conversation.\n\nBest regards",
        keyPoints: [
          "Partnership opportunity with TechStartup",
          "Interest in AI automation collaboration",
          "Call requested for next week",
        ],
        extractedDates: [{ date: "Next week", context: "Proposed call timing" }],
      },
      newsletter: {
        category: "Newsletter - Informational",
        priority: "Low",
        sentiment: "Marketing, Promotional",
        priorityScore: 35,
        actionItems: [{ task: "Review profile analytics", deadline: "Optional" }],
        suggestedResponse:
          "This is a newsletter email and typically doesn't require a response. You can archive or delete it based on your preferences.",
        keyPoints: ["52 profile views this week", "23% increase from last week", "Network growth opportunity"],
        extractedDates: [{ date: "This week", context: "Profile views timeframe" }],
      },
      personal: {
        category: "Personal - Social",
        priority: "Medium",
        sentiment: "Friendly, Casual",
        priorityScore: 60,
        actionItems: [{ task: "Schedule coffee meeting with Emma", deadline: "Next week" }],
        suggestedResponse:
          "Hey Emma!\n\nIt's great to hear from you! I'd love to catch up over coffee. How about next Tuesday or Thursday around 3 PM at our usual spot?\n\nLet me know what works best for you!\n\nCheers",
        keyPoints: ["Coffee invitation for next week", "Casual catch-up opportunity", "Friend reaching out"],
        extractedDates: [{ date: "Next week", context: "Proposed coffee meeting" }],
      },
      spam: {
        category: "Spam - Suspicious",
        priority: "Low",
        sentiment: "Promotional, Suspicious",
        priorityScore: 5,
        actionItems: [{ task: "Delete and block sender" }],
        suggestedResponse:
          "⚠️ This appears to be a spam email. Do not respond or click any links. Consider marking as spam and blocking the sender.",
        keyPoints: ["Suspicious sender domain", "Unrealistic monetary claims", "Typical spam characteristics detected"],
        extractedDates: [],
      },
    }

    return analyses[email.category] || analyses.important
  }

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.includes("Action Required")) return "text-destructive"
    if (sentiment.includes("Opportunity")) return "text-green-500"
    if (sentiment.includes("Suspicious")) return "text-yellow-500"
    return "text-blue-500"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon">
              <Star className={email.starred ? "fill-yellow-500 text-yellow-500" : ""} />
            </Button>
            <Button variant="ghost" size="icon">
              <Archive className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-foreground">{email.subject}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-purple-blue flex items-center justify-center text-white font-semibold">
                {email.sender.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{email.sender}</p>
                <p className="text-sm text-muted-foreground">{email.senderEmail}</p>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">{email.timestamp}</span>
          </div>

          <Button
            onClick={processWithAI}
            disabled={isProcessing || aiAnalysis !== null}
            className="w-full gradient-purple-blue text-white border-0 hover:opacity-90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing with AI..." : aiAnalysis ? "AI Analysis Complete" : "Process with AI"}
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/40 px-4">
            <TabsList className="w-full justify-start bg-transparent">
              <TabsTrigger value="content" className="data-[state=active]:bg-primary/10">
                <Mail className="w-4 h-4 mr-2" />
                Email Content
              </TabsTrigger>
              <TabsTrigger value="ai-analysis" disabled={!aiAnalysis} className="data-[state=active]:bg-primary/10">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Analysis
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="p-6 m-0">
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">{email.fullContent}</div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button className="flex-1 gradient-purple-blue text-white border-0">
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Forward className="w-4 h-4 mr-2" />
                Forward
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai-analysis" className="p-6 m-0">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-full gradient-purple-blue animate-pulse mb-4"></div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Processing Email...</h3>
                <p className="text-muted-foreground">Analyzing content, extracting insights, and generating response</p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-6">
                {/* Analysis Overview */}
                <Card className="p-6 glassmorphism border-border/40">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">AI Analysis</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold text-foreground">{aiAnalysis.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Priority</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{aiAnalysis.priority}</p>
                        <Badge className="bg-primary/10 text-primary">{aiAnalysis.priorityScore}/100</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sentiment</p>
                      <p className={`font-semibold ${getSentimentColor(aiAnalysis.sentiment)}`}>
                        {aiAnalysis.sentiment}
                      </p>
                    </div>
                  </div>

                  {/* Priority Score Visual */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Priority Score</span>
                      <span>{aiAnalysis.priorityScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-purple-blue transition-all duration-1000"
                        style={{ width: `${aiAnalysis.priorityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>

                {/* Key Points */}
                <Card className="p-6 glassmorphism border-border/40">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Key Points</h3>
                  </div>
                  <ul className="space-y-2">
                    {aiAnalysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Action Items */}
                {aiAnalysis.actionItems.length > 0 && (
                  <Card className="p-6 glassmorphism border-border/40">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-foreground">Action Items</h3>
                    </div>
                    <div className="space-y-3">
                      {aiAnalysis.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-5 h-5 rounded border-2 border-primary mt-0.5 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{item.task}</p>
                            {item.deadline && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" />
                                {item.deadline}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Extracted Dates */}
                {aiAnalysis.extractedDates.length > 0 && (
                  <Card className="p-6 glassmorphism border-border/40">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <h3 className="text-lg font-semibold text-foreground">Extracted Dates</h3>
                    </div>
                    <div className="space-y-2">
                      {aiAnalysis.extractedDates.map((date, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{date.date}</p>
                            <p className="text-sm text-muted-foreground">{date.context}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-3 h-3 mr-1" />
                            Add to Calendar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Suggested Response */}
                <Card className="p-6 glassmorphism border-border/40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold text-foreground">AI-Generated Response</h3>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(aiAnalysis.suggestedResponse)}>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                      {aiAnalysis.suggestedResponse}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button className="flex-1 gradient-purple-blue text-white border-0">
                      <Reply className="w-4 h-4 mr-2" />
                      Use This Response
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </Card>
              </div>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
