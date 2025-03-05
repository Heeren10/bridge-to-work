
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
    // This would be where we'd initialize the map and markers
    // For this demo, we'll just use a visual representation
  }, [jobs, ngos, activeType]);

  const items = activeType === "jobs" ? jobs : ngos;

  return (
    <div className="rounded-lg overflow-hidden h-full relative bg-gray-100 border border-border">
      {/* Map background with streets pattern */}
      <div ref={mapRef} className="h-full bg-[#e6e9ef] relative" 
           style={{
             backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0,0,10,0,0/800x600?access_token=pk.eyJ1IjoicHVibGljLXRva2VuIiwiYSI6ImNsbjZ1NXZ0dDB4ZW4ya3BqZmU0NmdoNWcifQ.03uqD1Bzbd_-4G7YNrXrwQ')",
             backgroundSize: "cover",
             backgroundPosition: "center"
           }}>
        
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
