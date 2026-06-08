/**
 * Chat Panel Component
 * Main chat interface for AI Assistant
 */

import { Card } from '../ui/card';
import { MessageBubble } from './MessageBubble';
import { AskAIInput } from './AskAIInput';
import { SuggestedCommands } from './SuggestedCommands';
import { useState } from 'react';
import type { CareerChatResponse } from '../../services/ai.service';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  summary?: CareerChatResponse['summary'];
}

interface ChatPanelProps {
  employeeId?: string;
  onSendMessage?: (message: string) => Promise<any>;
  isLoading?: boolean;
}

export function ChatPanel({ employeeId, onSendMessage, isLoading = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'assistant',
      content:
        "Hello! I'm your Škoda AI Skill Coach assistant. I can help you analyze team skills, predict future gaps, compare departments, and identify candidates for specific roles. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Call parent handler and wait for response
    if (onSendMessage) {
      try {
        const response = await onSendMessage(message);
        if (response) {
          // Add assistant response
          const assistantMessage: ChatMessage = {
            type: 'assistant',
            content: response.assistant || response.summary?.summary || 'Response received',
            timestamp: new Date().toLocaleTimeString(),
            summary: response.summary,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
      } catch (error) {
        // Add error message
        const errorMessage: ChatMessage = {
          type: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
  };

  const handleSuggestedQuery = (query: string) => {
    handleSend(query);
  };

  return (
    <Card className="p-6 border-[hsl(var(--border))] h-[600px] flex flex-col">
      <div className="mb-4">
        <h3>AI Career Coach</h3>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          Ask questions about skills, career paths, and recommendations
        </p>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
            <div className="w-2 h-2 bg-[hsl(var(--skoda-green))] rounded-full animate-pulse" />
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Suggested Commands */}
      {messages.length === 1 && (
        <div className="mb-4">
          <SuggestedCommands onSelectQuery={handleSuggestedQuery} />
        </div>
      )}

      {/* Input */}
      <AskAIInput onSend={handleSend} disabled={isLoading} />
    </Card>
  );
}

