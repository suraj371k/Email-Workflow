"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Suspense, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Mail,
  Brain,
  Calendar,
  CheckCircle2,
  Search,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useGmailStore } from "@/store/gmailStore";

function LandingPageContent() {
  const {  getUser } = useUserStore();

  return (
    <div className="min-h-screen bg-background"> 

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        </div>

        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            AI-Powered Email Management
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Your Inbox, Finally Under Control
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance">
            Save 10+ hours per week with AI that categorizes, prioritizes, and
            responds to emails automatically. Never miss what matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gradient-purple-blue text-white border-0 hover:opacity-90 transition-opacity text-lg px-8 py-6"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-border hover:bg-muted bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 glassmorphism border-border/40">
              <div className="text-4xl font-bold gradient-purple-blue bg-clip-text text-transparent mb-2">
                2M+
              </div>
              <div className="text-muted-foreground">
                Emails Processed Daily
              </div>
            </Card>
            <Card className="p-6 glassmorphism border-border/40">
              <div className="text-4xl font-bold gradient-blue-cyan bg-clip-text text-transparent mb-2">
                10hrs
              </div>
              <div className="text-muted-foreground">
                Average Time Saved/Week
              </div>
            </Card>
            <Card className="p-6 glassmorphism border-border/40">
              <div className="text-4xl font-bold gradient-purple-cyan bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-muted-foreground">Active Users</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2 bg-secondary/10 text-secondary border-secondary/20">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Everything You Need to Master Your Inbox
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI that learns your preferences and adapts to
              your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Smart Categorization",
                description:
                  "Automatically sorts emails into urgent, newsletters, spam, and personal categories",
                color: "from-purple-500 to-blue-500",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Auto-Responses",
                description:
                  "Generate contextual replies based on email content and your writing style",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Smart Scheduling",
                description:
                  "Extract dates and create calendar events automatically from emails",
                color: "from-cyan-500 to-purple-500",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Action Items",
                description:
                  "Identify and track tasks mentioned in your emails with due dates",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Email Summarization",
                description:
                  "Get concise summaries of long email threads in seconds",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: "AI-Powered Search",
                description: "Find any email using natural language queries",
                color: "from-cyan-500 to-blue-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 glassmorphism border-border/40 hover:border-primary/40 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2 bg-accent/10 text-accent border-accent/20">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Email",
                description:
                  "Securely link your email account in under 60 seconds. We support Gmail, Outlook, and more.",
                icon: <Mail className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "AI Learns Your Style",
                description:
                  "Our AI analyzes your email patterns and preferences to personalize your experience.",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Enjoy Automated Inbox",
                description:
                  "Sit back as AI handles categorization, responses, and action items automatically.",
                icon: <Sparkles className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 glassmorphism border-border/40 h-full">
                  <div className="text-6xl font-bold text-primary/20 mb-4">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 rounded-xl gradient-purple-blue flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "/month",
                description: "Perfect for trying out InboxAI",
                features: [
                  "500 emails/month",
                  "Basic categorization",
                  "Email summaries",
                  "3 auto-responses/day",
                  "Basic search",
                ],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Professional",
                price: "$29",
                period: "/month",
                description: "For power users who need more",
                features: [
                  "Unlimited emails",
                  "Advanced AI categorization",
                  "Unlimited auto-responses",
                  "Action item extraction",
                  "Smart scheduling",
                  "Priority support",
                  "Custom categories",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                description: "For teams and organizations",
                features: [
                  "Everything in Professional",
                  "Team collaboration",
                  "Custom AI training",
                  "API access",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "SSO & SAML",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`p-8 ${
                  plan.popular
                    ? "glassmorphism border-primary/60 shadow-lg shadow-primary/20 scale-105"
                    : "glassmorphism border-border/40"
                } transition-all duration-300 hover:border-primary/40 relative`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-purple-blue text-white border-0">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <Link href="/dashboard">
                  <Button
                    className={`w-full mb-6 ${
                      plan.popular
                        ? "gradient-purple-blue text-white border-0 hover:opacity-90"
                        : "border-border hover:bg-muted"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />,
                value: "2.5M+",
                label: "Emails Processed",
              },
              {
                icon: <Clock className="w-8 h-8 mx-auto mb-2 text-secondary" />,
                value: "500K+",
                label: "Hours Saved",
              },
              {
                icon: <Users className="w-8 h-8 mx-auto mb-2 text-accent" />,
                value: "50K+",
                label: "Happy Users",
              },
              {
                icon: (
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                ),
                value: "98%",
                label: "Satisfaction Rate",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="glassmorphism p-6 rounded-lg border border-border/40"
              >
                {stat.icon}
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Ready to Transform Your Email Experience?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've reclaimed their time with
            AI-powered email management
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gradient-purple-blue text-white border-0 hover:opacity-90 transition-opacity text-lg px-8 py-6"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-border hover:bg-muted bg-transparent"
            >
              <Shield className="mr-2 w-5 h-5" />
              Enterprise-Grade Security
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-lg gradient-purple-blue flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">InboxAI</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 InboxAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={null}>
      <LandingPageContent />
    </Suspense>
  );
}
