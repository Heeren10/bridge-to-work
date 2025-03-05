
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { useState } from "react";

export interface NGOData {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  website?: string;
  services: string[];
  hours: string;
}

interface NGOCardProps {
  ngo: NGOData;
  onRefer?: (ngo: NGOData) => void;
}

const NGOCard = ({ ngo, onRefer }: NGOCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="glass-card rounded-xl overflow-hidden card-hover"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{ngo.name}</h3>
        </div>
        
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>{ngo.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone size={14} />
            <span>{ngo.phone}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-sm mb-3">{ngo.description}</p>
            <p className="text-sm text-muted-foreground mb-2">Hours: {ngo.hours}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ngo.services.map((service, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-accent text-xs rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              {ngo.website && (
                <a 
                  href={ngo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                  <span>Visit Website</span>
                </a>
              )}
              {onRefer && (
                <button 
                  className="ml-auto py-1.5 px-3 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRefer(ngo);
                  }}
                >
                  Refer
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOCard;
