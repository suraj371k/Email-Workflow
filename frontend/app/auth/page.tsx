"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-zinc-800">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className={`
            w-full flex items-center justify-center gap-3 px-6 py-3.5
            rounded-xl font-medium
            transition-all duration-200
            ${
              isLoading
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
            }
            text-zinc-900
            shadow hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-blue-500 rounded-full animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-zinc-900 text-zinc-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Disabled Providers */}
        <div className="grid grid-cols-2 gap-3">
          <button
            disabled
            className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-500 cursor-not-allowed"
          >
            Facebook
          </button>
          <button
            disabled
            className="px-4 py-3 rounded-lg border border-zinc-700 text-zinc-500 cursor-not-allowed"
          >
            GitHub
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-950 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Terms */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <p className="text-xs text-zinc-500">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-blue-400 hover:text-blue-300">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
};

export default GoogleLogin;
