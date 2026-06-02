"use client";

import { useRef } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSend();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 border-t border-white/[0.06]"
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        rows={1}
        className={cn(
          "flex-1 bg-bg-card border border-bg-subtle rounded-[var(--radius-button)] px-3.5 py-2.5 text-sm text-text-primary",
          "placeholder:text-text-muted resize-none max-h-24 overflow-y-auto",
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          "transition-colors duration-200",
          "disabled:opacity-50"
        )}
        style={{
          height: "auto",
          minHeight: "40px",
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = Math.min(target.scrollHeight, 96) + "px";
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
          "bg-primary-600 hover:bg-primary-500 text-white",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary-600"
        )}
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
