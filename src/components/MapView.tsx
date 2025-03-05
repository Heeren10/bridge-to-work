
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
  
  // In a real app, this would use a mapping library like Mapbox or Google Maps
  // For now, we'll create a simple visual representation

  useEffect(() => {
    // This would be where we'd initialize the map and markers
    // For this demo, we'll just use a visual representation
  }, [jobs, ngos, activeType]);

  const items = activeType === "jobs" ? jobs : ngos;

  return (
    <div className="rounded-lg overflow-hidden h-full relative bg-gray-100 border border-border">
      {/* Placeholder map */}
      <div ref={mapRef} className="h-full bg-[#e6e9ef] relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="h-[80%] w-[80%] rounded-full border-4 border-gray-300 flex items-center justify-center">
            <div className="h-[60%] w-[60%] rounded-full border-4 border-gray-300 flex items-center justify-center">
              <div className="h-[40%] w-[40%] rounded-full border-4 border-gray-300"></div>
            </div>
          </div>
        </div>
        
        {/* Simulated pins for locations */}
        {items.map((item, index) => {
          // Generate random positions for demo
          const top = 20 + Math.random() * 60;
          const left = 20 + Math.random() * 60;
          const isJob = activeType === "jobs";
          const label = isJob ? (item as JobData).title : (item as NGOData).name;
          const location = isJob ? (item as JobData).location : (item as NGOData).address;
          
          return (
            <div 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className={`p-1 rounded-full ${isJob ? 'bg-primary' : 'bg-green-500'} shadow-lg relative group`}>
                <MapPin className="h-5 w-5 text-white" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[150px] bg-white shadow-lg rounded p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <p className="font-semibold truncate">{label}</p>
                  <p className="text-muted-foreground truncate">{location}</p>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-md text-xs font-medium">
          {activeType === "jobs" ? "Showing job opportunities" : "Showing support services"}
        </div>
      </div>
    </div>
  );
};

export default MapView;
