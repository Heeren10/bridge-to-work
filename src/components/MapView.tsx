
import { useEffect, useRef } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin } from "lucide-react";

interface MapViewProps {
  jobs: JobData[];
  ngos: NGOData[];
  activeType: "jobs" | "services";
}

const MapView = ({ jobs, ngos, activeType }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be where we'd initialize an interactive map 
    // For this demo, we're using a static image
  }, [jobs, ngos, activeType]);

  const items = activeType === "jobs" ? jobs : ngos;

  return (
    <div className="rounded-lg overflow-hidden h-full relative bg-gray-100 border border-border">
      {/* Map background with real street map */}
      <div 
        ref={mapRef} 
        className="h-full relative" 
        style={{
          backgroundImage: "url('/lovable-uploads/165c8b71-2cca-4b61-99b2-3c5414e1c0ec.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        
        {/* Pins for locations */}
        {items.map((item, index) => {
          // Generate positions for demo that look more realistic on the map
          const top = 15 + Math.random() * 70;
          const left = 15 + Math.random() * 70;
          const isJob = activeType === "jobs";
          const label = isJob ? (item as JobData).title : (item as NGOData).name;
          const location = isJob ? (item as JobData).location : (item as NGOData).address;
          
          // All pins use the primary red color for better visibility
          const pinColorClass = "bg-red-500";
          
          return (
            <div 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in z-10"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className={`${pinColorClass} shadow-lg relative group`} style={{ width: "24px", height: "36px", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}>
                <div className="absolute inset-0 m-auto bg-white rounded-full" style={{ width: "12px", height: "12px", transform: "rotate(45deg)" }}></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 rotate-45 mb-3 w-max max-w-[180px] bg-white shadow-lg rounded p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <p className="font-semibold truncate">{label}</p>
                  <p className="text-muted-foreground truncate">{location}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* User location indicator (blue dot with pulse effect) */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ bottom: '30%', left: '45%' }}
        >
          <div className="relative">
            <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse-subtle"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-full shadow-md text-xs font-medium">
          {activeType === "jobs" ? "Showing job opportunities nearby" : "Showing support services nearby"}
        </div>
      </div>
    </div>
  );
};

export default MapView;
