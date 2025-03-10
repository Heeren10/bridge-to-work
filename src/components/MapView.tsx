import { useEffect, useRef, useState } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin, Navigation, Compass, ArrowUpRight, Search, Map, Layers, Plus, Minus, Route, X, Clock } from "lucide-react";

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
  const [selectedItem, setSelectedItem] = useState<{item: JobData | NGOData, type: "job" | "ngo"} | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  
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

  // Function to handle item selection
  const handleItemClick = (itemPos: {item: JobData | NGOData, isJob: boolean}) => {
    setSelectedItem({
      item: itemPos.item,
      type: itemPos.isJob ? "job" : "ngo"
    });
    setShowRoute(false); // Reset route visibility
  };

  // Function to handle neighborhood click to show items in that area
  const handleNeighborhoodClick = (neighborhood: { name: string }) => {
    // Find items in this neighborhood
    const itemsInArea = itemPositions.filter(pos => {
      const isJob = pos.isJob;
      const locationText = isJob 
        ? (pos.item as JobData).location 
        : (pos.item as NGOData).address;
      
      return locationText.includes(neighborhood.name);
    });
    
    if (itemsInArea.length > 0) {
      // Select the first item in this neighborhood
      handleItemClick(itemsInArea[0]);
    }
  };

  // Function to toggle route display
  const toggleRoute = () => {
    setShowRoute(!showRoute);
  };

  // Function to close selected item
  const closeSelectedItem = () => {
    setSelectedItem(null);
    setShowRoute(false);
  };

  // Get user position (fixed for demo)
  const userPosition = { top: 75, left: 45 };

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
                : "linear-gradient to bottom, #f0f8ff, #ffffff",
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
        <div className="absolute inset-0 z-20">
          {currentCity.neighborhoods.map((neighborhood, index) => (
            <div 
              key={`neighborhood-${index}`}
              className="absolute cursor-pointer"
              style={{ 
                top: `${neighborhood.top}%`, 
                left: `${neighborhood.left}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleNeighborhoodClick(neighborhood)}
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
        
        {/* Route between user and selected item */}
        {selectedItem && showRoute && (
          <div className="absolute inset-0 z-25 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              {itemPositions.map((pos, idx) => {
                if (
                  (selectedItem.type === "job" && pos.isJob && (pos.item as JobData).id === (selectedItem.item as JobData).id) ||
                  (selectedItem.type === "ngo" && !pos.isJob && (pos.item as NGOData).id === (selectedItem.item as NGOData).id)
                ) {
                  // Draw route between user position and this item
                  return (
                    <g key={`route-${idx}`}>
                      <path 
                        d={`M${userPosition.left}%,${userPosition.top}% C${userPosition.left+10}%,${userPosition.top-10}% ${pos.left-10}%,${pos.top+10}% ${pos.left}%,${pos.top}%`}
                        stroke="#4338ca" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                        fill="none"
                      />
                      {/* Route markers */}
                      <circle cx={`${userPosition.left}%`} cy={`${userPosition.top}%`} r="3" fill="#4338ca" />
                      <circle cx={`${pos.left}%`} cy={`${pos.top}%`} r="3" fill="#4338ca" />
                      
                      {/* Distance markers */}
                      <circle 
                        cx={`${(userPosition.left + pos.left) / 2}%`} 
                        cy={`${(userPosition.top + pos.top) / 2 - 5}%`} 
                        r="6" 
                        fill="white" 
                        stroke="#4338ca"
                      />
                      <text 
                        x={`${(userPosition.left + pos.left) / 2}%`} 
                        y={`${(userPosition.top + pos.top) / 2 - 5}%`} 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        fontSize="10"
                        fill="#4338ca"
                        fontWeight="bold"
                      >
                        {Math.floor(Math.random() * 5) + 2}km
                      </text>
                    </g>
                  );
                }
                return null;
              })}
            </svg>
          </div>
        )}
        
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
            
            // Check if this item is the selected one
            const isSelected = selectedItem && (
              (selectedItem.type === "job" && isJob && (selectedItem.item as JobData).id === (item as JobData).id) ||
              (selectedItem.type === "ngo" && !isJob && (selectedItem.item as NGOData).id === (item as NGOData).id)
            );
            
            return (
              <div 
                key={`marker-${index}`}
                className={`absolute cursor-pointer ${isSelected ? 'z-50' : ''}`}
                style={{ 
                  top: `${pos.top}%`, 
                  left: `${pos.left}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredLocation(label)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => handleItemClick(pos)}
              >
                {/* Marker */}
                <div className="relative group">
                  <div className={`w-4 h-4 ${isSelected ? 'w-6 h-6 ring-4 ring-white' : ''} ${markerBgClass} rounded-full flex items-center justify-center shadow-md transition-all`}>
                    {isJob ? (
                      <div className={`${isSelected ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'} bg-white rounded-full`} />
                    ) : (
                      <div className={`${isSelected ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'} bg-white rounded-full`} />
                    )}
                  </div>
                  
                  {/* Pulse animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping-slow opacity-70 ${isJob ? 'bg-blue-400' : 'bg-rose-400'}`} />
                  
                  {/* Info tooltip on hover */}
                  {!isSelected && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40 text-left border border-gray-200">
                      <div className="font-bold text-xs truncate">{label}</div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{isJob ? (item as JobData).location : (item as NGOData).address}</p>
                      <p className="text-xs truncate mt-1">{details}</p>
                      {isJob && (
                        <p className="text-green-600 font-medium text-xs mt-1">{(item as JobData).salary}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Selected item details card */}
        {selectedItem && (
          <div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-white rounded-lg shadow-xl border border-blue-100 animate-slide-in z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">
                    {selectedItem.type === "job" 
                      ? (selectedItem.item as JobData).title 
                      : (selectedItem.item as NGOData).name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.type === "job" 
                      ? (selectedItem.item as JobData).company 
                      : (selectedItem.item as NGOData).services.join(', ')}
                  </p>
                </div>
                <button 
                  onClick={closeSelectedItem}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm mt-2">
                <MapPin size={14} className="text-rose-500" />
                <span>
                  {selectedItem.type === "job" 
                    ? (selectedItem.item as JobData).location 
                    : (selectedItem.item as NGOData).address}
                </span>
              </div>
              
              {selectedItem.type === "job" && (
                <>
                  <div className="flex items-center gap-1.5 text-sm mt-1.5 text-green-700 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee">
                      <path d="M6 3h12" />
                      <path d="M6 8h12" />
                      <path d="m6 13 8.5 8" />
                      <path d="M6 13h3" />
                      <path d="M9 13c6.667 0 6.667-10 0-10" />
                    </svg>
                    <span>{(selectedItem.item as JobData).salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm mt-1.5">
                    <Clock size={14} className="text-blue-500" />
                    <span>{(selectedItem.item as JobData).duration}</span>
                  </div>
                </>
              )}
              
              <p className="text-sm mt-3">
                {selectedItem.type === "job" 
                  ? (selectedItem.item as JobData).description 
                  : (selectedItem.item as NGOData).description}
              </p>
              
              {selectedItem.type === "job" && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(selectedItem.item as JobData).skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 bg-blue-50 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={toggleRoute}
                  className={`py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 
                    ${showRoute 
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  <Route size={16} />
                  {showRoute ? 'Hide Route' : 'Show Route'}
                </button>
                <button
                  className="py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center justify-center gap-1.5"
                >
                  <Navigation size={16} />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        )}
        
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
