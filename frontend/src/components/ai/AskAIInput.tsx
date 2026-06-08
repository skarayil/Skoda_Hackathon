/**
 * Ask AI Input Component
 * Text input with send button for chat
 */

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface AskAIInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function AskAIInput({
  onSend,
  disabled = false,
  placeholder = 'Ask AI about skills, career paths, or recommendations...',
}: AskAIInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-[60px] resize-none"
        rows={2}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="bg-[hsl(var(--skoda-green))] hover:bg-[hsl(var(--skoda-green-dark))]"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}

