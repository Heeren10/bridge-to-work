
import { X } from "lucide-react";
import { useState } from "react";

interface ReferModalProps {
  item: any;
  type: "job" | "ngo";
  onClose: () => void;
}

const ReferModal = ({ item, type, onClose }: ReferModalProps) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  const itemDetails = type === "job" 
    ? {
        title: item.title,
        organization: item.company,
        details: `${item.location} • ${item.salary}`
      }
    : {
        title: item.name,
        organization: "Support Service",
        details: item.address
      };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bridge to Work - ${itemDetails.title}`,
        text: `Check out this opportunity with ${itemDetails.organization}: ${itemDetails.title}. ${itemDetails.details}`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    const text = `Bridge to Work - ${itemDetails.title} with ${itemDetails.organization}. ${itemDetails.details}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an SMS service
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setPhone("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl animate-slide-in overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Refer {type === "job" ? "Opportunity" : "Service"}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <h3 className="font-medium text-lg">{itemDetails.title}</h3>
            <p className="text-muted-foreground">{itemDetails.organization}</p>
            <p className="text-sm">{itemDetails.details}</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleShare}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium"
            >
              Share
            </button>
            
            <button
              onClick={handleCopy}
              className="w-full py-2.5 border border-input rounded-lg font-medium hover:bg-muted/50 transition-colors"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or send via SMS</span>
              </div>
            </div>
            
            <form onSubmit={handleSendSMS} className="space-y-2">
              <input
                type="tel"
                placeholder="Enter phone number"
                className="input-field w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                {sent ? "Sent!" : "Send SMS"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferModal;
