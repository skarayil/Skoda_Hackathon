/**
 * Streaming Text Loader Component
 * Loading indicator for AI responses
 */

export function StreamingTextLoader() {
  return (
    <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-[hsl(var(--skoda-green))] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[hsl(var(--skoda-green))] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[hsl(var(--skoda-green))] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm">AI is thinking...</span>
    </div>
  );
}

