"use client";

import React, { useState } from "react";
import {
  Globe,
  Info,
  ChevronDown,
  Bot,
  UserCircle,
  User,
  Mic,
  Send,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

interface Message {
  id: string;
  sender: "ai" | "patient";
  text: string;
  timestamp: string;
}

export default function TriageChat() {
  const { language, setLanguage } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello Rahul, I am your HomeoAssist AI. Please describe your symptoms in detail...",
      timestamp: "10:00 AM",
    },
    {
      id: "2",
      sender: "patient",
      text: "I have a severe throbbing headache on the right side.",
      timestamp: "10:02 AM",
    },
    {
      id: "3",
      sender: "ai",
      text: "I understand. Does the headache feel better with cold application or warm application?",
      timestamp: "10:03 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "patient",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Thank you for the details. I have forwarded your symptom profile to a specialist.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-surface flex flex-col min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-surface dark:bg-inverse-surface w-full z-50 border-b border-outline-variant dark:border-outline hidden md:flex sticky top-0">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-max-width mx-auto">
          <div className="flex items-center gap-md">
            <Link
              href="/"
              className="text-title-lg font-title-lg font-bold text-primary dark:text-primary-fixed"
            >
              HomeoAssist AI
            </Link>
            <div className="hidden md:flex gap-md ml-lg">
              <Link
                href="/"
                className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2"
              >
                Consult
              </Link>
              <Link
                href="/patient/triage"
                className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 opacity-80 transition-opacity text-label-md font-label-md py-2"
              >
                AI Triage
              </Link>
              <Link
                href="/patient/checkout"
                className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2"
              >
                Order
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-primary hover:bg-surface-variant transition-colors text-label-md font-label-md">
              <Globe className="w-5 h-5" />
              Language
            </button>
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-label-md font-label-md"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 h-[calc(100vh-80px)]">
        {/* Action Banner */}
        <div className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-sm mb-md flex items-center justify-center gap-sm shadow-sm shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
          <Info className="text-primary w-5 h-5" />
          <p className="text-body-sm font-body-sm text-on-surface">
            Once triage is complete, your assigned doctor will review this chat.
          </p>
        </div>

        {/* Chat Header Area */}
        <div className="w-full flex justify-between items-center mb-md pb-sm border-b border-outline-variant">
          <div>
            <h1 className="text-headline-md font-headline-md text-primary">
              Symptom Triage
            </h1>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Describe your symptoms to the AI assistant
            </p>
          </div>
          {/* Language Selector Dropdown Mockup */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="appearance-none bg-surface border border-outline-variant text-on-surface text-label-md font-label-md py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm focus:shadow-[0_0_0_2px_rgba(0,104,95,0.1)]"
            >
              <option value="en">English</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="hi">Hindi (हिंदी)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-full flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden relative min-h-0">
          {/* Chat Messages Area */}
          <div className="chat-container flex-grow overflow-y-auto p-md flex flex-col gap-md">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-sm max-w-[85%] ${
                  msg.sender === "patient" ? "self-end flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "patient"
                      ? "bg-surface-variant text-on-surface"
                      : "bg-primary-container text-on-primary-container"
                  }`}
                >
                  {msg.sender === "patient" ? (
                    <UserCircle className="w-6 h-6" />
                  ) : (
                    <Bot className="w-6 h-6" />
                  )}
                </div>
                <div
                  className={`p-sm rounded-2xl ${
                    msg.sender === "patient"
                      ? "bg-primary text-on-primary rounded-tr-sm shadow-[0px_4px_12px_rgba(15,23,42,0.05)]"
                      : "bg-surface-container-low text-on-surface rounded-tl-sm shadow-[0px_4px_12px_rgba(15,23,42,0.02)] border border-outline-variant/30"
                  }`}
                >
                  <p className="text-body-md font-body-md">{msg.text}</p>
                  <span
                    className={`text-[10px] mt-1 block ${
                      msg.sender === "patient"
                        ? "text-on-primary/80 text-right"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-sm max-w-[85%] opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-on-surface" />
                </div>
                <div className="bg-surface text-on-surface px-4 py-2 rounded-2xl rounded-tr-sm border border-outline-variant flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Area */}
          <div className="bg-surface-container-lowest p-sm border-t border-outline-variant flex items-end gap-sm z-10 shadow-[0px_-4px_12px_rgba(15,23,42,0.02)]">
            <button
              className="p-2 md:p-3 rounded-full bg-surface hover:bg-surface-variant text-primary border border-outline-variant transition-colors flex-shrink-0 shadow-sm"
              title="Voice Input"
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-grow relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_0_2px_rgba(0,104,95,0.1)] resize-none"
                placeholder="Type your symptoms here..."
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              ></textarea>
            </div>
            <button
              onClick={handleSend}
              className="p-2 md:p-3 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors flex-shrink-0 shadow-[0px_4px_12px_rgba(15,23,42,0.05)]"
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
