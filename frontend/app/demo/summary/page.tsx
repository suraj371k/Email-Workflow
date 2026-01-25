"use client";

import { useAiStore } from "@/store/aiStore";
import { useParams } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const Summary = () => {
  const params = useParams();
  const messageId = params?.messageId as string;
  
  // Use Zustand selector to subscribe to the specific summary in the map
  const summary = useAiStore((state) => 
    messageId ? state.summaryMap[messageId] : null
  );
  const loading = useAiStore((state) => state.loading);
  const error = useAiStore((state) => state.error);

  console.log("Summary component - messageId:", messageId, "summary:", summary);

  // Priority badge styling
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Category badge styling
  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "urgent":
        return "destructive";
      case "unread":
        return "default";
      case "promotions":
        return "default";
      case "social":
        return "secondary";
      case "newsletter":
        return "outline";
      case "spam":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Separator />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load summary: {error}</AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (!summary) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-2 py-8">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No Summary Available</h3>
            <p className="text-sm text-muted-foreground">
              No summary data found. Try refreshing or check back later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card key={summary._id} className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">Email Summary</CardTitle>
              <CardDescription className="mt-1">
                AI-generated summary and analysis
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityBadgeVariant(summary.priority)}>
                {summary.priority.charAt(0).toUpperCase() + summary.priority.slice(1)}{" "}
                Priority
              </Badge>
              <Badge variant={getCategoryBadgeVariant(summary.categories)}>
                {summary.categories.charAt(0).toUpperCase() + summary.categories.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          {/* Summary Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Summary
              </h3>
              {/* <Badge variant="outline" className="text-xs">
                {summary.language.charAt(0).toUpperCase() + summary.language.slice(1)}
              </Badge> */}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
              {summary.summary}
            </p>
          </div>

          {/* Key Points Section */}
          {summary.keyPoints && summary.keyPoints.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Key Points
              </h3>
              <ul className="space-y-2">
                {summary.keyPoints.map((k, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-3 bg-card border rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm">{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metadata Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="font-medium">ID:</span>
                <code className="text-xs px-1.5 py-0.5 bg-muted rounded">
                  {summary._id.slice(-8)}
                </code>
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Category:</span>
                <span>{summary.categories}</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Priority:</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  summary.priority === "urgent"
                    ? "bg-red-100 text-red-800"
                    : summary.priority === "high"
                      ? "bg-orange-100 text-orange-800"
                      : summary.priority === "medium"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {summary.priority}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
