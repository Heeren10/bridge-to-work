import { useEffect, useRef, useState } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin, Navigation, Compass, ArrowUpRight, Search, Map, Layers, Plus, Minus } from "lucide-react";

interface MapViewProps {
  jobs: JobData[];
  ngos: NGOData[];
  activeType: "jobs" | "services";
}

// More detailed Indian cities data with neighborhoods and local areas
const INDIAN_CITIES = [
  { 
    name: "Mumbai", 
    top: 65, 
    left: 22, 
    mapImage: "/lovable-uploads/7f141b1c-2f50-4c12-95f5-0bdace710a44.png",
    neighborhoods: [
      { name: "Colaba", top: 85, left: 25 },
      { name: "Bandra", top: 55, left: 15 },
      { name: "Andheri", top: 40, left: 20 },
      { name: "Juhu Beach", top: 45, left: 10 },
      { name: "Worli", top: 70, left: 20 },
      { name: "Powai", top: 30, left: 30 }
    ],
    landmarks: ["Gateway of India", "Marine Drive"] 
  },
  { 
    name: "Delhi", 
    top: 30, 
    left: 48, 
    mapImage: "/lovable-uploads/7f141b1c-2f50-4c12-95f5-0bdace710a44.png",
    neighborhoods: [
      { name: "Connaught Place", top: 35, left: 50 },
      { name: "Chandni Chowk", top: 25, left: 45 },
      { name: "Hauz Khas", top: 40, left: 45 },
      { name: "India Gate", top: 35, left: 55 },
      { name: "Dwarka", top: 45, left: 35 },
      { name: "Saket", top: 50, left: 50 }
    ],
    landmarks: ["Red Fort", "Qutub Minar"] 
  },
  { 
    name: "Bangalore", 
    top: 75, 
    left: 38, 
    mapImage: "/lovable-uploads/7f141b1c-2f50-4c12-95f5-0bdace710a44.png",
    neighborhoods: [
      { name: "Indiranagar", top: 70, left: 42 },
      { name: "Koramangala", top: 80, left: 40 },
      { name: "MG Road", top: 75, left: 35 },
      { name: "Electronic City", top: 90, left: 38 },
      { name: "Whitefield", top: 65, left: 50 },
      { name: "Jayanagar", top: 80, left: 30 }
    ],
    landmarks: ["Cubbon Park", "Lalbagh"] 
  },
  { 
    name: "Hyderabad", 
    top: 68, 
    left: 45, 
    mapImage: "/lovable-uploads/7f141b1c-2f50-4c12-95f5-0bdace710a44.png",
    neighborhoods: [
      { name: "Banjara Hills", top: 65, left: 47 },
      { name: "Jubilee Hills", top: 60, left: 43 },
      { name: "Hitech City", top: 55, left: 40 },
      { name: "Charminar", top: 75, left: 48 },
      { name: "Gachibowli", top: 70, left: 35 },
      { name: "Secunderabad", top: 60, left: 50 }
    ],
    landmarks: ["Hussain Sagar", "Golconda Fort"] 
  },
  // Other cities with similar pattern
  { 
    name: "Chennai", 
    top: 80, 
    left: 45, 
    mapImage: "/lovable-uploads/7f141b1c-2f50-4c12-95f5-0bdace710a44.png",
    neighborhoods: [
      { name: "T. Nagar", top: 82, left: 43 },
      { name: "Mylapore", top: 85, left: 47 },
      { name: "Adyar", top: 88, left: 46 },
      { name: "Marina Beach", top: 80, left: 50 },
      { name: "Anna Nagar", top: 75, left: 40 },
      { name: "Velachery", top: 90, left: 42 }
    ],
    landmarks: ["Kapaleeshwarar Temple", "Fort St. George"] 
  }
];

const MapView = ({ jobs, ngos, activeType }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapView, setMapView] = useState<"street" | "satellite" | "standard">("street");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  // Find the currently selected city
  const currentCity = INDIAN_CITIES.find(city => city.name === selectedCity) || INDIAN_CITIES[0];
  
  // Filter items based on selected city
  const filteredItems = activeType === "jobs" 
    ? jobs.filter(job => job.location.includes(currentCity.name) || 
        currentCity.neighborhoods.some(n => job.location.includes(n.name)))
    : ngos.filter(ngo => ngo.address.includes(currentCity.name) || 
        currentCity.neighborhoods.some(n => ngo.address.includes(n.name)));

  // Calculate item positions for the current city based on their locations
  const getItemPositions = () => {
    return filteredItems.map(item => {
      const isJob = activeType === "jobs";
      const locationText = isJob ? (item as JobData).location : (item as NGOData).address;
      
      // Try to find matching neighborhood
      const neighborhoodMatch = currentCity.neighborhoods.find(n => 
        locationText.includes(n.name)
      );
      
      if (neighborhoodMatch) {
        return {
          item,
          top: neighborhoodMatch.top,
          left: neighborhoodMatch.left,
          isJob
        };
      }
      
      // If no neighborhood match, place it randomly within the city area
      const variance = 15;
      return {
        item,
        top: currentCity.top + (Math.random() * variance - variance/2),
        left: currentCity.left + (Math.random() * variance - variance/2),
        isJob
      };
    });
  };

  const itemPositions = getItemPositions();

  // Function to handle zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 3) {
      setZoomLevel(prev => prev + 0.5);
    } else if (direction === 'out' && zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.5);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden h-full relative shadow-xl border border-blue-200/50 bg-[#F1F0FB]">
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
          <button
            className={`p-1.5 rounded-md transition-colors ${mapView === 'street' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setMapView('street')}
            title="Street view"
          >
            <Map size={16} />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${mapView === 'standard' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setMapView('standard')}
            title="Standard view"
          >
            <Compass size={16} />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${mapView === 'satellite' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setMapView('satellite')}
            title="Satellite view"
          >
            <Layers size={16} />
          </button>
        </div>
        
        {/* Zoom controls */}
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col gap-2">
          <button
            className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
            onClick={() => handleZoom('in')}
            title="Zoom in"
          >
            <Plus size={16} />
          </button>
          <button
            className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
            onClick={() => handleZoom('out')}
            title="Zoom out"
          >
            <Minus size={16} />
          </button>
        </div>
        
        {/* City selection */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-2 bg-blue-50 border-b border-gray-200 flex items-center">
            <Search size={14} className="text-blue-500 mr-1" />
            <span className="text-xs font-medium text-blue-700">Select City</span>
          </div>
          <div className="max-h-32 overflow-y-auto py-1">
            {INDIAN_CITIES.map((city, i) => (
              <button
                key={`search-${i}`}
                className={`w-full text-left px-3 py-1 text-xs hover:bg-blue-50 transition-colors flex items-center ${selectedCity === city.name ? 'bg-blue-50 font-medium text-primary' : ''}`}
                onClick={() => setSelectedCity(city.name)}
              >
                <MapPin size={10} className="text-rose-500 mr-1.5" />
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map container with styling based on selected view */}
      <div 
        ref={mapRef} 
        className="h-full relative overflow-hidden" 
      >
        {/* Base map layer */}
        <div 
          className="absolute inset-0 transition-transform duration-300 origin-center"
          style={{
            backgroundImage: mapView === 'street' 
              ? `url('${currentCity.mapImage}')` 
              : mapView === 'satellite' 
                ? "url('/lovable-uploads/165c8b71-2cca-4b61-99b2-3c5414e1c0ec.png')" 
                : "linear-gradient(to bottom, #f0f8ff, #ffffff)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(${zoomLevel})`,
          }}
        />
        
        {/* Street grid overlay for standard view */}
        {mapView === 'standard' && (
          <div className="absolute inset-0 z-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              {/* Horizontal streets */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line 
                  key={`h-${i}`} 
                  x1="0" 
                  y1={`${(i + 1) * 5}%`} 
                  x2="100%" 
                  y2={`${(i + 1) * 5}%`} 
                  stroke="#DDDDDD" 
                  strokeWidth="1" 
                />
              ))}
              
              {/* Vertical streets */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line 
                  key={`v-${i}`} 
                  x1={`${(i + 1) * 5}%`} 
                  y1="0" 
                  x2={`${(i + 1) * 5}%`} 
                  y2="100%" 
                  stroke="#DDDDDD" 
                  strokeWidth="1" 
                />
              ))}
              
              {/* Major roads */}
              <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#CCCCCC" strokeWidth="2" />
              <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#CCCCCC" strokeWidth="2" />
            </svg>
          </div>
        )}
        
        {/* Neighborhoods */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {currentCity.neighborhoods.map((neighborhood, index) => (
            <div 
              key={`neighborhood-${index}`}
              className="absolute"
              style={{ 
                top: `${neighborhood.top}%`, 
                left: `${neighborhood.left}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                {/* Only show label in street or standard view */}
                {(mapView === 'street' || mapView === 'standard') && (
                  <div 
                    className="absolute whitespace-nowrap px-2 py-0.5 bg-white/70 rounded-sm text-xs font-medium border border-gray-200 shadow-sm"
                    style={{ 
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '4px'
                    }}
                  >
                    {neighborhood.name}
                  </div>
                )}
                
                {/* Area highlight */}
                <div 
                  className="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 opacity-30"
                  style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Job/Service markers */}
        <div className="absolute inset-0 z-30">
          {itemPositions.map((pos, index) => {
            const isJob = pos.isJob;
            const item = pos.item;
            const label = isJob ? (item as JobData).title : (item as NGOData).name;
            const details = isJob ? (item as JobData).company : (item as NGOData).services.join(', ');
            
            // Different styling for jobs vs services
            const markerBgClass = isJob 
              ? "bg-blue-500" 
              : "bg-rose-500";
            
            return (
              <div 
                key={`marker-${index}`}
                className="absolute cursor-pointer"
                style={{ 
                  top: `${pos.top}%`, 
                  left: `${pos.left}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredLocation(label)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Marker */}
                <div className="relative group">
                  <div className={`w-4 h-4 ${markerBgClass} rounded-full flex items-center justify-center shadow-md`}>
                    {isJob ? (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                  
                  {/* Pulse animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping-slow opacity-70 ${isJob ? 'bg-blue-400' : 'bg-rose-400'}`} />
                  
                  {/* Info tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40 text-left border border-gray-200">
                    <div className="font-bold text-xs truncate">{label}</div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{isJob ? (item as JobData).location : (item as NGOData).address}</p>
                    <p className="text-xs truncate mt-1">{details}</p>
                    {isJob && (
                      <p className="text-green-600 font-medium text-xs mt-1">{(item as JobData).salary}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* User location indicator */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{ bottom: '25%', left: '45%' }}
        >
          <div className="relative">
            <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Navigation size={12} className="text-white" />
            </div>
            <div className="absolute inset-0 bg-blue-400/60 rounded-full animate-pulse"></div>
            <div className="absolute -inset-2 bg-blue-300/30 rounded-full animate-pulse-slow"></div>
          </div>
          <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full mt-1 font-medium shadow-sm">
            You are here
          </div>
        </div>
        
        {/* Map legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-lg text-xs font-medium border border-gray-200 z-40">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary font-medium">Legend</span>
          </div>
          
          <div className="h-px bg-gray-200 my-1.5"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Job opportunities</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span>Support services</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-primary/70"></div>
            <span>Local areas</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span>Your location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
