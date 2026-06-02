"use client";

import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 underline underline-offset-2 hover:text-primary-300 transition-colors"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-2.5 px-4", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5",
          isUser
            ? "bg-primary-600"
            : "bg-gradient-to-br from-primary-600 to-accent-600"
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-white" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-primary-600 text-white rounded-2xl rounded-br-md"
            : "bg-bg-surface text-text-primary rounded-2xl rounded-bl-md border border-white/[0.06]"
        )}
      >
        {linkify(content)}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5 px-4"
    >
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 bg-gradient-to-br from-primary-600 to-accent-600">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-bg-surface rounded-2xl rounded-bl-md border border-white/[0.06] px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-dot-1" />
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-dot-2" />
        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-typing-dot-3" />
      </div>
    </motion.div>
  );
}
