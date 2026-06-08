/**
 * Message Bubble Component
 * Individual chat message display
 */

import { Avatar, AvatarFallback } from '../ui/avatar';
import { Sparkles, User } from 'lucide-react';
import type { CareerChatResponse } from '../../services/ai.service';

interface ChatMessage {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  summary?: CareerChatResponse['summary'];
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="w-8 h-8">
        <AvatarFallback
          className={
            isUser
              ? 'bg-[hsl(var(--skoda-navy))] text-white'
              : 'bg-[hsl(var(--skoda-green))] text-white'
          }
        >
          {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block p-3 rounded-lg ${
            isUser
              ? 'bg-[hsl(var(--skoda-navy))] text-white'
              : 'bg-[hsl(var(--skoda-gray-50))] text-[hsl(var(--foreground))]'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
          {message.timestamp}
        </p>
        {message.summary && !isUser && (
          <div className="mt-3 p-3 bg-white rounded-lg border border-[hsl(var(--border))]">
            <p className="text-xs font-medium mb-2">Summary:</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Next Role: {message.summary.next_role} · Readiness: {message.summary.readiness_score}% · Time: {message.summary.time_to_readiness_months} months
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

