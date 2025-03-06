
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
    <div className="relative mb-6 p-4 bg-accent rounded-lg border border-primary/20 animate-fade-in">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
        aria-label="Close prompt"
      >
        <X size={16} />
      </button>
      <div className="flex items-center gap-2">
        <Heart size={18} className="text-primary shrink-0" />
        <p className="pr-6 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default WelcomePrompt;
