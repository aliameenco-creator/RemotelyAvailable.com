"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Bot } from "lucide-react";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { chatConfig, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now().toString()
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Add welcome message on first open
  function handleOpen() {
    if (!hasBeenOpened) {
      setHasBeenOpened(true);
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: chatConfig.welcomeMessage,
        },
      ]);
    }
    setIsOpen(true);
  }

  function handleToggle() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      handleOpen();
    }
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, chatInput: text }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.output ||
          "I'm sorry, I couldn't process that. Please try again.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Sorry, I'm having trouble connecting right now. Please try our contact form or email us at ${siteConfig.email}.`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, sessionId]);

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed z-[55] flex flex-col",
              "bg-bg-card/95 backdrop-blur-xl border border-white/[0.08] shadow-2xl shadow-black/40",
              // Desktop
              "bottom-24 right-6 w-[380px] h-[520px] rounded-[var(--radius-card)]",
              // Mobile: full screen
              "max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:z-[60]"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06] bg-bg-surface/60 rounded-t-[var(--radius-card)] max-sm:rounded-t-none">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">
                  {chatConfig.botName}
                </p>
                <p className="text-xs text-text-muted">
                  {isLoading ? "Typing..." : "Online"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={sendMessage}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Bubble Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        onClick={handleToggle}
        className={cn(
          "fixed bottom-6 right-6 z-[55] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer",
          "bg-gradient-to-br from-primary-600 to-accent-600 text-white",
          "shadow-lg shadow-primary-600/25 hover:shadow-primary-500/35",
          "hover:scale-105 active:scale-95 transition-transform duration-200",
          !hasBeenOpened && !isOpen && "animate-chat-pulse",
          // Mobile
          "max-sm:bottom-4 max-sm:right-4 max-sm:w-12 max-sm:h-12"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
