"use client";

import { Sparkles, LogOut, User } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useUserStore();

  const router = useRouter();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/auth");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 glassmorphism-dark">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-purple-blue flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">InboxAI</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "How It Works"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Info */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-background/40 border border-border/50">
                <div className="w-9 h-9 rounded-full gradient-purple-blue flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-foreground">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              {/* Logout */}
              <Button
                variant="outline"
                onClick={() => handleLogout()}
                className="flex items-center gap-2 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-500 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link href="/auth">
                <Button variant="ghost" className="text-foreground">
                  Sign In
                </Button>
              </Link>

              {/* CTA */}
              <Link href="/dashboard">
                <Button className="gradient-purple-blue text-white border-0 hover:opacity-90 transition-opacity">
                  Start Free Trial
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
