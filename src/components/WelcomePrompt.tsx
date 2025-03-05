
import { useState } from "react";
import { X } from "lucide-react";

interface WelcomePromptProps {
  message?: string;
}

const WelcomePrompt = ({ 
  message = "Say no to Cash, Direct them" 
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
      <p className="pr-6 text-sm">{message}</p>
    </div>
  );
};

export default WelcomePrompt;
