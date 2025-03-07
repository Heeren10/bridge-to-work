
import { useEffect, useRef, useState, useMemo, memo } from "react";
import { JobData } from "./JobCard";
import { NGOData } from "./NGOCard";
import { MapPin, Navigation, Compass, ArrowUpRight, Search, Map, Layers } from "lucide-react";

interface MapViewProps {
  jobs: JobData[];
  ngos: NGOData[];
  activeType: "jobs" | "services";
}

// More detailed Indian cities data with neighborhoods - moved outside component to prevent recreations
const INDIAN_CITIES = [
  { name: "Mumbai", top: 65, left: 22, neighborhoods: ["Colaba", "Bandra", "Andheri", "Juhu Beach"], landmarks: ["Gateway of India", "Marine Drive"] },
  { name: "Delhi", top: 30, left: 48, neighborhoods: ["Connaught Place", "Chandni Chowk", "Hauz Khas", "India Gate"], landmarks: ["Red Fort", "Qutub Minar"] },
  { name: "Bangalore", top: 75, left: 38, neighborhoods: ["Indiranagar", "Koramangala", "MG Road", "Electronic City"], landmarks: ["Cubbon Park", "Lalbagh"] },
  { name: "Hyderabad", top: 68, left: 45, neighborhoods: ["Banjara Hills", "Jubilee Hills", "Hitech City", "Charminar"], landmarks: ["Hussain Sagar", "Golconda Fort"] },
  { name: "Chennai", top: 80, left: 45, neighborhoods: ["T. Nagar", "Mylapore", "Adyar", "Marina Beach"], landmarks: ["Kapaleeshwarar Temple", "Fort St. George"] },
  { name: "Kolkata", top: 45, left: 75, neighborhoods: ["Park Street", "Salt Lake", "New Town", "Howrah"], landmarks: ["Victoria Memorial", "Howrah Bridge"] },
  { name: "Pune", top: 67, left: 28, neighborhoods: ["Koregaon Park", "Camp", "Kothrud", "Viman Nagar"], landmarks: ["Shaniwar Wada", "Aga Khan Palace"] },
  { name: "Ahmedabad", top: 50, left: 20, neighborhoods: ["Navrangpura", "Bodakdev", "Satellite", "Prahlad Nagar"], landmarks: ["Sabarmati Ashram", "Kankaria Lake"] },
  { name: "Jaipur", top: 40, left: 35, neighborhoods: ["Pink City", "Malviya Nagar", "Jawahar Nagar", "C-Scheme"], landmarks: ["Hawa Mahal", "Amber Fort"] },
  { name: "Lucknow", top: 38, left: 55, neighborhoods: ["Hazratganj", "Gomti Nagar", "Aliganj", "Chowk"], landmarks: ["Bara Imambara", "Rumi Darwaza"] },
];

// Roads connecting major cities - moved outside component
const ROADS = [
  { from: "Delhi", to: "Jaipur", width: 2 },
  { from: "Delhi", to: "Lucknow", width: 2 },
  { from: "Mumbai", to: "Pune", width: 2 },
  { from: "Bangalore", to: "Chennai", width: 2 },
  { from: "Bangalore", to: "Hyderabad", width: 2 },
  { from: "Ahmedabad", to: "Mumbai", width: 2 },
  { from: "Kolkata", to: "Lucknow", width: 2 },
  { from: "Jaipur", to: "Ahmedabad", width: 1 },
  { from: "Pune", to: "Hyderabad", width: 1 },
  { from: "Chennai", to: "Hyderabad", width: 1 },
];

// Geographic features - moved outside component
const GEO_FEATURES = [
  { type: "river", name: "Ganges", path: "M80,30 C85,35 90,45 85,55 C80,65 75,70 70,75", color: "#A5D8FF", width: 3 },
  { type: "river", name: "Yamuna", path: "M48,30 C50,40 45,50 50,60", color: "#A5D8FF", width: 2 },
  { type: "mountain", name: "Western Ghats", path: "M20,60 L25,55 L30,60 L35,56 L40,61", color: "#A98B73", width: 2 },
  { type: "mountain", name: "Eastern Ghats", path: "M60,75 L65,70 L70,75 L75,70", color: "#A98B73", width: 2 },
  { type: "sea", name: "Arabian Sea", center: { x: 15, y: 75 }, color: "#D6F0FF" },
  { type: "sea", name: "Bay of Bengal", center: { x: 80, y: 75 }, color: "#D6F0FF" },
];

// Memoized components for better performance
const MapControls = memo(({ mapView, setMapView }: { mapView: string, setMapView: (view: any) => void }) => (
  <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
    <button
      className={`p-1.5 rounded-md transition-colors ${mapView === 'standard' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={() => setMapView('standard')}
      title="Standard view"
    >
      <Map size={16} />
    </button>
    <button
      className={`p-1.5 rounded-md transition-colors ${mapView === 'satellite' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={() => setMapView('satellite')}
      title="Satellite view"
    >
      <Layers size={16} />
    </button>
    <button
      className={`p-1.5 rounded-md transition-colors ${mapView === 'terrain' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={() => setMapView('terrain')}
      title="Terrain view"
    >
      <Compass size={16} />
    </button>
  </div>
));

// Memoized city search component
const CitySearch = memo(({ cities, highlightedCity, setHighlightedCity }: { 
  cities: typeof INDIAN_CITIES, 
  highlightedCity: string | null, 
  setHighlightedCity: (city: string | null) => void 
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-2 bg-blue-50 border-b border-gray-200 flex items-center">
      <Search size={14} className="text-blue-500 mr-1" />
      <span className="text-xs font-medium text-blue-700">Find on map</span>
    </div>
    <div className="max-h-32 overflow-y-auto py-1">
      {cities.map((city, i) => (
        <button
          key={`search-${i}`}
          className="w-full text-left px-3 py-1 text-xs hover:bg-blue-50 transition-colors flex items-center"
          onMouseEnter={() => setHighlightedCity(city.name)}
          onMouseLeave={() => setHighlightedCity(null)}
        >
          <MapPin size={10} className="text-rose-500 mr-1.5" />
          {city.name}
        </button>
      ))}
    </div>
  </div>
));

// Memoized road renderer component
const RoadNetwork = memo(({ roads, cities }: { roads: typeof ROADS, cities: typeof INDIAN_CITIES }) => (
  <>
    {roads.map((road, index) => {
      const fromCity = cities.find(c => c.name === road.from);
      const toCity = cities.find(c => c.name === road.to);
      
      if (!fromCity || !toCity) return null;
      
      const x1 = fromCity.left;
      const y1 = fromCity.top;
      const x2 = toCity.left;
      const y2 = toCity.top;
      
      return (
        <div 
          key={`road-${index}`} 
          className="absolute z-5"
          style={{
            width: `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}%`,
            height: `${road.width}px`,
            top: `${y1}%`,
            left: `${x1}%`,
            transform: `rotate(${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}deg)`,
            transformOrigin: '0 0',
            background: "linear-gradient(90deg, rgba(156,163,175,0.6) 0%, rgba(156,163,175,0.8) 100%)",
            boxShadow: "0 0 2px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        />
      );
    })}
  </>
));

// Memoized geo features component
const GeoFeatures = memo(({ features }: { features: typeof GEO_FEATURES }) => (
  <>
    {features.map((feature, index) => {
      if (feature.type === "river" || feature.type === "mountain") {
        return (
          <svg
            key={`geo-${index}`}
            className="absolute top-0 left-0 w-full h-full z-5 pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <path
              d={feature.path}
              stroke={feature.color}
              strokeWidth={feature.width}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={feature.type === "mountain" ? "1 2" : "none"}
            />
          </svg>
        );
      } else if (feature.type === "sea") {
        return (
          <div
            key={`geo-${index}`}
            className="absolute rounded-full opacity-20 z-0"
            style={{
              background: feature.color,
              width: "25%",
              height: "25%",
              top: `${feature.center.y - 12.5}%`,
              left: `${feature.center.x - 12.5}%`,
              filter: "blur(10px)",
            }}
          />
        );
      }
      return null;
    })}
  </>
));

// City Component for better performance
const City = memo(({ city, isHighlighted, index }: { 
  city: typeof INDIAN_CITIES[0], 
  isHighlighted: boolean,
  index: number
}) => (
  <div key={`city-${index}`} className="absolute z-10" style={{ top: `${city.top}%`, left: `${city.left}%` }}>
    {/* City marker */}
    <div 
      className={`absolute w-3 h-3 bg-gradient-to-r ${isHighlighted ? 'from-primary to-blue-500 scale-150' : 'from-gray-500 to-gray-600'} rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md transition-all duration-300 border border-white`}
      style={{ 
        boxShadow: isHighlighted ? '0 0 0 4px rgba(59, 130, 246, 0.3)' : 'none'
      }}
    ></div>
    
    {/* City name with highlight */}
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 mt-4 text-xs font-bold ${isHighlighted ? 'bg-white text-primary' : 'bg-white/90 text-gray-800'} px-2 py-1 rounded-md shadow-md border transition-all duration-300`}
      style={{
        borderColor: isHighlighted ? 'rgb(59, 130, 246)' : 'rgb(209, 213, 219)',
        zIndex: isHighlighted ? 40 : 30
      }}
    >
      {city.name}
      {isHighlighted && (
        <div className="absolute top-full left-0 w-full mt-1">
          <div className="bg-white px-2 py-1.5 rounded-md shadow-md border border-gray-200 text-[9px] font-normal">
            <div className="flex items-center text-gray-700">
              <span className="font-medium">Areas:</span> 
              <span className="ml-1">{city.neighborhoods.slice(0, 2).join(', ')}</span>
            </div>
            {city.landmarks && (
              <div className="flex items-center text-gray-700 mt-1">
                <span className="font-medium">Landmarks:</span>
                <span className="ml-1">{city.landmarks.slice(0, 2).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    
    {/* Neighborhoods as smaller labels */}
    {!isHighlighted && city.neighborhoods.slice(0, 2).map((hood, hoodIndex) => {
      // Position neighborhoods around the city
      const angle = (hoodIndex * (360 / 4)) * (Math.PI / 180);
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
));

// Location Pins Component
const LocationPins = memo(({ items, activeType }: { 
  items: JobData[] | NGOData[], 
  activeType: "jobs" | "services" 
}) => {
  return (
    <>
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
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-fade-in z-20 cursor-pointer"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <div className={`${pinColorClass} shadow-lg relative group`} style={{ width: "20px", height: "30px", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" }}>
              <div className="absolute inset-0 m-auto bg-white rounded-full" style={{ width: "10px", height: "10px", transform: "rotate(45deg)" }}></div>
              
              {/* Pulse animation ring */}
              <div className={`absolute -inset-2 ${pulseColorClass}/30 rounded-full animate-pulse-subtle opacity-60`} style={{ transform: "rotate(45deg)" }}></div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 rotate-45 mb-3 w-max max-w-[200px] bg-white shadow-lg rounded-md p-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 border border-gray-200">
                <div className="font-bold text-sm mb-1 truncate">{label}</div>
                <p className="text-muted-foreground truncate">{location}</p>
                <p className="text-xs mt-1 truncate">{details}</p>
                {isJob && (
                  <p className="text-green-600 font-medium mt-1">{(item as JobData).salary}</p>
                )}
                <div className="flex items-center mt-2 text-primary text-[10px] gap-0.5 font-medium">
                  <span>View details</span>
                  <ArrowUpRight size={8} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
});

const MapView = ({ jobs, ngos, activeType }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "standard">("standard");
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);
  
  // Use memoized items to prevent unnecessary re-renders
  const items = useMemo(() => activeType === "jobs" ? jobs : ngos, [jobs, ngos, activeType]);
  
  return (
    <div className="rounded-xl overflow-hidden h-full relative shadow-xl border border-blue-200/50">
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <MapControls mapView={mapView} setMapView={setMapView} />
        <CitySearch 
          cities={INDIAN_CITIES} 
          highlightedCity={highlightedCity} 
          setHighlightedCity={setHighlightedCity} 
        />
      </div>
      
      {/* Map background with styling based on selected view */}
      <div 
        ref={mapRef} 
        className="h-full relative" 
        style={{
          backgroundImage: mapView === 'satellite' 
            ? "url('/lovable-uploads/165c8b71-2cca-4b61-99b2-3c5414e1c0ec.png')" 
            : mapView === 'terrain'
              ? "linear-gradient(to bottom, #e0eafc, #fafbfc)"
              : "linear-gradient(to bottom, #f0f8ff, #ffffff)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Overlay for terrain/standard view */}
        {mapView !== 'satellite' && (
          <div 
            className="absolute inset-0 bg-repeat opacity-10" 
            style={{ 
              backgroundImage: "url('data:image/png;base64,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')" 
            }}
          ></div>
        )}
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/5 to-transparent pointer-events-none"></div>
        
        {/* Geographic features */}
        {mapView !== 'satellite' && <GeoFeatures features={GEO_FEATURES} />}
        
        {/* Road network */}
        <RoadNetwork roads={ROADS} cities={INDIAN_CITIES} />
        
        {/* City labels on the map */}
        {INDIAN_CITIES.map((city, index) => (
          <City 
            key={`city-${index}`}
            city={city}
            isHighlighted={highlightedCity === city.name}
            index={index}
          />
        ))}
        
        {/* Pins for locations */}
        <LocationPins items={items} activeType={activeType} />
        
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
        
        {/* Map scale indicator and legend */}
        <div className="absolute bottom-6 right-6 bg-white/90 px-3 py-2 rounded-lg shadow-lg text-xs font-medium border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-sm border border-gray-300 grid place-items-center">
              <span className="text-[6px] font-bold">i</span>
            </div>
            <span className="text-primary">Map Legend</span>
          </div>
          
          <div className="h-px bg-gray-200 my-1.5"></div>
          
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
          
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-[1px] bg-gray-400"></div>
            <span>Roads</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <span>Your location</span>
          </div>
        </div>
        
        {/* Enhanced compass rose decoration */}
        <div className="absolute bottom-6 left-6 h-16 w-16 opacity-80">
          <div className="relative h-full w-full">
            <div className="absolute h-full w-full rounded-full border-2 border-gray-700/30 bg-white/60 backdrop-blur-sm shadow-inner"></div>
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
      </div>
    </div>
  );
};

export default MapView;
