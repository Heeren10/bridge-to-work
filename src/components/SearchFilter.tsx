
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Record<string, boolean>) => void;
  filterOptions?: { id: string; label: string }[];
}

const SearchFilter = ({ 
  onSearch, 
  onFilter,
  filterOptions = [
    { id: "jobs", label: "Jobs" },
    { id: "ngos", label: "NGOs" },
    { id: "shelters", label: "Shelters" },
    { id: "training", label: "Training" }
  ]
}: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>(
    filterOptions.reduce((acc, option) => ({ ...acc, [option.id]: false }), {})
  );

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilterToggle = (filterId: string) => {
    const updatedFilters = {
      ...selectedFilters,
      [filterId]: !selectedFilters[filterId]
    };
    setSelectedFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities..."
            className="input-field w-full pl-10 pr-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`p-3 rounded-lg border ${isFilterOpen ? 'bg-accent border-primary/30' : 'border-border'} transition-colors`}
          aria-label="Filter"
        >
          <Filter size={20} className={isFilterOpen ? 'text-primary' : 'text-muted-foreground'} />
        </button>
      </div>

      {isFilterOpen && (
        <div className="flex flex-wrap gap-2 p-3 bg-accent rounded-lg animate-fade-in">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleFilterToggle(option.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedFilters[option.id] 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white border border-border hover:bg-secondary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
