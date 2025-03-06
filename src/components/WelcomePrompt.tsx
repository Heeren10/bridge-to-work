
import { useState } from "react";
import { X, Heart } from "lucide-react";

interface WelcomePromptProps {
  message?: string;
}

const WelcomePrompt = ({ 
  message = "Say no to cash - Help create sustainable change through opportunities" 
}: WelcomePromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-6 glass-card rounded-lg border-primary/20 animate-fade-in overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close prompt"
      >
        <X size={16} />
      </button>
      <div className="relative p-4 flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Heart size={18} className="text-primary animate-pulse-subtle" />
        </div>
        <p className="pr-6 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default WelcomePrompt;
