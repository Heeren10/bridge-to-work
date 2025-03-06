
import { useEffect, useRef } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
  jobs: JobData[];
  ngos: NGOData[];
  activeType: "jobs" | "services";
}

// Indian cities data for the map
const INDIAN_CITIES = [
  { name: "Mumbai", top: 65, left: 22 },
  { name: "Delhi", top: 30, left: 48 },
  { name: "Bangalore", top: 75, left: 38 },
  { name: "Hyderabad", top: 68, left: 45 },
  { name: "Chennai", top: 80, left: 45 },
  { name: "Kolkata", top: 45, left: 75 },
  { name: "Pune", top: 67, left: 28 },
  { name: "Ahmedabad", top: 50, left: 20 },
  { name: "Jaipur", top: 40, left: 35 },
  { name: "Lucknow", top: 38, left: 55 },
];

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
        {/* City labels on the map */}
        {INDIAN_CITIES.map((city, index) => (
          <div 
            key={`city-${index}`}
            className="absolute text-xs font-semibold bg-white/80 px-1.5 py-0.5 rounded-sm shadow-sm transform -translate-x-1/2 -translate-y-1/2 border border-gray-300"
            style={{ top: `${city.top}%`, left: `${city.left}%` }}
          >
            {city.name}
          </div>
        ))}
        
        {/* Pins for locations */}
        {items.map((item, index) => {
          // Generate semi-realistic positions for demo
          const basedOnCity = INDIAN_CITIES[index % INDIAN_CITIES.length];
          const variance = 5; // Small variance to show multiple items in same city
          const top = basedOnCity.top + (Math.random() * variance * 2 - variance);
          const left = basedOnCity.left + (Math.random() * variance * 2 - variance);
          
          const isJob = activeType === "jobs";
          const label = isJob ? (item as JobData).title : (item as NGOData).name;
          const location = isJob ? (item as JobData).location : (item as NGOData).address;
          
          // Use different pin colors for jobs vs services
          const pinColorClass = isJob ? "bg-primary" : "bg-red-500";
          
          return (
            <div 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in z-10"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className={`${pinColorClass} shadow-lg relative group`} style={{ width: "24px", height: "36px", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}>
                <div className="absolute inset-0 m-auto bg-white rounded-full" style={{ width: "12px", height: "12px", transform: "rotate(45deg)" }}></div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 rotate-45 mb-3 w-max max-w-[200px] bg-white shadow-lg rounded-md p-2.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <p className="font-semibold truncate">{label}</p>
                  <p className="text-muted-foreground truncate">{location}</p>
                  {isJob && (
                    <p className="text-primary font-medium mt-1">{(item as JobData).salary}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* User location indicator with directional pulse */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ bottom: '25%', left: '45%' }}
        >
          <div className="relative">
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Navigation size={10} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-blue-400/60 rounded-full animate-pulse-subtle"></div>
          </div>
          <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full mt-1 font-medium shadow-sm">
            You are here
          </div>
        </div>
        
        {/* Compass rose decoration */}
        <div className="absolute bottom-4 left-4 h-12 w-12 opacity-70">
          <div className="relative h-full w-full">
            <div className="absolute h-full w-full rounded-full border-2 border-gray-700/30"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700/30 transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-700/30 transform -translate-x-1/2"></div>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
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
