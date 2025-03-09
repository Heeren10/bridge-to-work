
import { useState } from "react";
import { X, Info } from "lucide-react";

interface WelcomePromptProps {
  message?: string;
}

const WelcomePrompt = ({ 
  message = "Say no to cash - Help create sustainable change through opportunities" 
}: WelcomePromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-l-primary animate-fade-in overflow-hidden shadow-md">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Close prompt"
      >
        <X size={16} />
      </button>
      <div className="relative p-4 flex items-center gap-3">
        <div className="p-2.5 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/20 border border-primary/10 animate-float">
          <Info size={18} className="text-primary animate-pulse-subtle" />
        </div>
        <div>
          <p className="pr-6 text-sm font-medium">{message}</p>
          <p className="text-xs text-muted-foreground mt-1">Together we can create pathways to independence</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePrompt;
