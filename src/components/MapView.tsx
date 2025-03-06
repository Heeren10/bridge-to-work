
import { useEffect, useRef } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin, Navigation, Compass } from "lucide-react";

interface MapViewProps {
  jobs: JobData[];
  ngos: NGOData[];
  activeType: "jobs" | "services";
}

// More detailed Indian cities data with neighborhoods
const INDIAN_CITIES = [
  { name: "Mumbai", top: 65, left: 22, neighborhoods: ["Colaba", "Bandra", "Andheri", "Juhu Beach"] },
  { name: "Delhi", top: 30, left: 48, neighborhoods: ["Connaught Place", "Chandni Chowk", "Hauz Khas", "India Gate"] },
  { name: "Bangalore", top: 75, left: 38, neighborhoods: ["Indiranagar", "Koramangala", "MG Road", "Electronic City"] },
  { name: "Hyderabad", top: 68, left: 45, neighborhoods: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Charminar"] },
  { name: "Chennai", top: 80, left: 45, neighborhoods: ["T. Nagar", "Mylapore", "Adyar", "Marina Beach"] },
  { name: "Kolkata", top: 45, left: 75, neighborhoods: ["Park Street", "Salt Lake", "New Town", "Howrah"] },
  { name: "Pune", top: 67, left: 28, neighborhoods: ["Koregaon Park", "Camp", "Kothrud", "Viman Nagar"] },
  { name: "Ahmedabad", top: 50, left: 20, neighborhoods: ["Navrangpura", "Bodakdev", "Satellite", "Prahlad Nagar"] },
  { name: "Jaipur", top: 40, left: 35, neighborhoods: ["Pink City", "Malviya Nagar", "Jawahar Nagar", "C-Scheme"] },
  { name: "Lucknow", top: 38, left: 55, neighborhoods: ["Hazratganj", "Gomti Nagar", "Aliganj", "Chowk"] },
];

// Roads connecting major cities for more map-like feel
const ROADS = [
  { from: "Delhi", to: "Jaipur" },
  { from: "Delhi", to: "Lucknow" },
  { from: "Mumbai", to: "Pune" },
  { from: "Bangalore", to: "Chennai" },
  { from: "Bangalore", to: "Hyderabad" },
  { from: "Ahmedabad", to: "Mumbai" },
  { from: "Kolkata", to: "Lucknow" },
];

const MapView = ({ jobs, ngos, activeType }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be where we'd initialize an interactive map 
    // For this demo, we're using a static image with enhanced features
  }, [jobs, ngos, activeType]);

  const items = activeType === "jobs" ? jobs : ngos;

  // Function to find city coordinates by name
  const getCityCoordinates = (cityName: string) => {
    const city = INDIAN_CITIES.find(c => c.name === cityName);
    if (city) return { top: city.top, left: city.left };
    
    // Default to center if city not found
    return { top: 50, left: 50 };
  };

  // Draw roads between cities
  const renderRoads = () => {
    return ROADS.map((road, index) => {
      const fromCity = INDIAN_CITIES.find(c => c.name === road.from);
      const toCity = INDIAN_CITIES.find(c => c.name === road.to);
      
      if (!fromCity || !toCity) return null;
      
      // Calculate the road path
      const x1 = fromCity.left;
      const y1 = fromCity.top;
      const x2 = toCity.left;
      const y2 = toCity.top;
      
      // Road styling
      return (
        <div 
          key={`road-${index}`} 
          className="absolute bg-gray-400/30 z-5"
          style={{
            width: `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}%`,
            height: '1px',
            top: `${y1}%`,
            left: `${x1}%`,
            transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}deg)`,
            transformOrigin: '0 0',
          }}
        />
      );
    });
  };

  return (
    <div className="rounded-lg overflow-hidden h-full relative bg-gray-100 border border-border shadow-lg">
      {/* Map background with real street map and gradient overlay for depth */}
      <div 
        ref={mapRef} 
        className="h-full relative" 
        style={{
          backgroundImage: "url('/lovable-uploads/165c8b71-2cca-4b61-99b2-3c5414e1c0ec.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/10 to-transparent pointer-events-none"></div>
        
        {/* Road network */}
        {renderRoads()}
        
        {/* City labels on the map */}
        {INDIAN_CITIES.map((city, index) => (
          <div key={`city-${index}`} className="absolute z-10" style={{ top: `${city.top}%`, left: `${city.left}%` }}>
            {/* City name with highlight */}
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold bg-white/90 px-2 py-1 rounded-md shadow-md border border-gray-300 text-gray-800">
              {city.name}
            </div>
            
            {/* Neighborhoods as smaller labels */}
            {city.neighborhoods.map((hood, hoodIndex) => {
              // Position neighborhoods around the city
              const angle = (hoodIndex * (360 / city.neighborhoods.length)) * (Math.PI / 180);
              const distance = 4; // % distance from city center
              const hoodTop = distance * Math.sin(angle);
              const hoodLeft = distance * Math.cos(angle);
              
              return (
                <div 
                  key={`hood-${city.name}-${hoodIndex}`}
                  className="absolute text-[8px] font-medium bg-white/70 px-1 py-0.5 rounded-sm transform -translate-x-1/2 -translate-y-1/2 border border-gray-200 whitespace-nowrap"
                  style={{ 
                    top: `calc(${hoodTop}% + 0%)`, 
                    left: `calc(${hoodLeft}% + 0%)` 
                  }}
                >
                  {hood}
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Pins for locations */}
        {items.map((item, index) => {
          // Find the city for this item
          const isJob = activeType === "jobs";
          const location = isJob ? (item as JobData).location : (item as NGOData).address;
          const cityName = location.split(',')[0].trim();
          
          // Get city coordinates
          const basedOnCity = INDIAN_CITIES.find(c => c.name === cityName) || 
                            INDIAN_CITIES[index % INDIAN_CITIES.length];
          
          // Add small variance to avoid exact overlaps
          const variance = 3;
          const top = basedOnCity.top + (Math.random() * variance * 2 - variance);
          const left = basedOnCity.left + (Math.random() * variance * 2 - variance);
          
          const label = isJob ? (item as JobData).title : (item as NGOData).name;
          const details = isJob ? (item as JobData).company : (item as NGOData).services.join(', ');
          
          // Use different pin colors for jobs vs services
          const pinColorClass = isJob 
            ? "bg-gradient-to-b from-blue-500 to-blue-600" 
            : "bg-gradient-to-b from-rose-500 to-rose-600";
          const pulseColorClass = isJob ? "bg-blue-400" : "bg-rose-400";
          
          return (
            <div 
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in z-10 cursor-pointer"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div className={`${pinColorClass} shadow-lg relative group`} style={{ width: "20px", height: "30px", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}>
                <div className="absolute inset-0 m-auto bg-white rounded-full" style={{ width: "10px", height: "10px", transform: "rotate(45deg)" }}></div>
                
                {/* Pulse animation ring */}
                <div className={`absolute -inset-2 ${pulseColorClass}/30 rounded-full animate-pulse-subtle opacity-60`} style={{ transform: "rotate(45deg)" }}></div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 rotate-45 mb-3 w-max max-w-[200px] bg-white shadow-lg rounded-md p-2.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <div className="font-bold text-sm mb-1 truncate">{label}</div>
                  <p className="text-muted-foreground truncate">{location}</p>
                  <p className="text-xs mt-1 truncate">{details}</p>
                  {isJob && (
                    <p className="text-green-600 font-medium mt-1">{(item as JobData).salary}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* User location indicator with improved styling */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ bottom: '25%', left: '45%' }}
        >
          <div className="relative">
            <div className="h-5 w-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Navigation size={10} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-blue-400/60 rounded-full animate-pulse-subtle"></div>
            <div className="absolute -inset-2 bg-blue-300/30 rounded-full animate-pulse-subtle"></div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-0.5 rounded-full mt-1 font-medium shadow-sm">
            You are here
          </div>
        </div>
        
        {/* Enhanced compass rose decoration */}
        <div className="absolute bottom-6 left-6 h-16 w-16 opacity-80">
          <div className="relative h-full w-full">
            <div className="absolute h-full w-full rounded-full border-2 border-gray-700/30 bg-white/50 backdrop-blur-sm shadow-inner"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700/50 transform -translate-y-1/2"></div>
            <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-700/50 transform -translate-x-1/2"></div>
            {/* Diagonal lines */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-0.5 bg-gray-700/30 absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45"></div>
              <div className="w-full h-0.5 bg-gray-700/30 absolute top-1/2 left-0 transform -translate-y-1/2 rotate-[135deg]"></div>
            </div>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-red-500 transform -translate-x-1/2 translate-y-2 z-10"></div>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-500 transform -translate-x-1/2 -translate-y-2 z-10"></div>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-gray-700 transform -translate-y-1/2 translate-x-2 z-10"></div>
            <div className="absolute top-1/2 right-0 w-1 h-1 bg-gray-700 transform -translate-y-1/2 -translate-x-2 z-10"></div>
            
            {/* Direction letters */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-red-600">N</div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-blue-600">S</div>
            <div className="absolute top-1/2 left-1 transform -translate-y-1/2 text-[10px] font-bold text-gray-700">W</div>
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2 text-[10px] font-bold text-gray-700">E</div>
            
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
          </div>
        </div>
        
        {/* Enhanced legend */}
        <div className="absolute bottom-6 right-6 bg-white/90 px-4 py-2 rounded-lg shadow-lg text-xs font-medium border border-gray-200">
          {activeType === "jobs" ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-b from-blue-500 to-blue-600 rounded-sm"></div>
              <span>Job opportunities</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-b from-rose-500 to-rose-600 rounded-sm"></div>
              <span>Support services</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
