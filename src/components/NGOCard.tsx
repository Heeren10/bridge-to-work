
import { MapPin, Phone, ExternalLink, Heart } from "lucide-react";
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
      className="glass-card rounded-xl overflow-hidden card-hover transition-all duration-300 border-l-4 border-l-rose-400"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full shadow-sm">
              <Heart size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-lg">{ngo.name}</h3>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-3 ml-10">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} className="text-rose-500" />
            <span>{ngo.address}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone size={14} className="text-blue-500" />
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
                  className="px-2 py-0.5 bg-gradient-to-r from-rose-100 to-rose-50 text-xs rounded-full text-rose-700 font-medium"
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
                  className="ml-auto py-1.5 px-3 text-sm font-medium text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
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
