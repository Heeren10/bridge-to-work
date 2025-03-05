
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building, MapPin } from "lucide-react";
import Header from "../components/Header";
import SearchFilter from "../components/SearchFilter";
import JobCard, { JobData } from "../components/JobCard";
import NGOCard, { NGOData } from "../components/NGOCard";
import BackButton from "../components/BackButton";
import ReferModal from "../components/ReferModal";
import MapView from "../components/MapView";

// Fake data for demonstration
const JOBS_DATA: JobData[] = [
  {
    id: "1",
    title: "Garden Assistant",
    description: "Help with basic gardening tasks including weeding, planting, and watering. No experience necessary, tools and guidance provided.",
    company: "Green City Initiative",
    location: "Downtown",
    salary: "$15/hour",
    duration: "1-2 days",
    skills: ["Physical work", "Outdoors"],
    date: "Today"
  },
  {
    id: "2",
    title: "Kitchen Helper",
    description: "Assist in food preparation, cleaning, and serving in a busy community kitchen. Flexible hours, meals provided.",
    company: "Community Eats",
    location: "Westside",
    salary: "$14/hour",
    duration: "Ongoing",
    skills: ["Food prep", "Cleaning"],
    date: "Today"
  },
  {
    id: "3",
    title: "Moving Assistant",
    description: "Help with loading and unloading furniture and boxes. One-time opportunity with immediate payment.",
    company: "QuickMove Services",
    location: "Eastside",
    salary: "$100/day",
    duration: "1 day",
    skills: ["Heavy lifting", "Attention to detail"],
    date: "Tomorrow"
  },
  {
    id: "4",
    title: "Street Cleaning",
    description: "Join a team cleaning up the neighborhood streets. Equipment provided, no experience needed.",
    company: "Clean Streets Program",
    location: "Various",
    salary: "$13/hour",
    duration: "Weekly",
    skills: ["Outdoors", "Community minded"],
    date: "This week"
  }
];

const NGOS_DATA: NGOData[] = [
  {
    id: "1",
    name: "Haven Shelter",
    description: "Emergency shelter providing beds, meals, and basic necessities for individuals experiencing homelessness.",
    address: "123 Main St",
    phone: "(555) 123-4567",
    website: "https://example.com",
    services: ["Shelter", "Meals", "Hygiene"],
    hours: "24/7"
  },
  {
    id: "2",
    name: "New Beginnings Center",
    description: "Support services including counseling, job training, and housing assistance for those in need.",
    address: "456 Oak Ave",
    phone: "(555) 987-6543",
    services: ["Counseling", "Job Training", "Housing Assistance"],
    hours: "Mon-Fri 8am-6pm"
  },
  {
    id: "3",
    name: "Community Health Clinic",
    description: "Free or low-cost healthcare services for uninsured or low-income individuals.",
    address: "789 Elm Blvd",
    phone: "(555) 567-8901",
    website: "https://example.com",
    services: ["Medical Care", "Dental", "Mental Health"],
    hours: "Mon-Sat 9am-5pm"
  },
  {
    id: "4",
    name: "Daily Bread Food Bank",
    description: "Provides emergency food assistance to individuals and families facing food insecurity.",
    address: "321 Pine Rd",
    phone: "(555) 345-6789",
    services: ["Food Distribution", "SNAP Applications"],
    hours: "Tue-Sun 10am-4pm"
  }
];

const NormalPerson = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  const [referItem, setReferItem] = useState<{ item: any; type: "job" | "ngo" } | null>(null);
  const [activeTab, setActiveTab] = useState<"jobs" | "services">("jobs");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter data
  };

  const handleFilter = (filters: Record<string, boolean>) => {
    setActiveFilters(filters);
    // In a real app, this would filter data
  };

  const handleRefer = (item: any, type: "job" | "ngo") => {
    setReferItem({ item, type });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Find Opportunities" />
      
      <main className="flex-1 container max-w-screen-xl mx-auto p-4">
        <div className="mb-6">
          <BackButton to="/select-type" />
        </div>
        
        <div className="mb-6">
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-240px)]">
          {/* Left column - Opportunities list */}
          <div className="lg:col-span-2 overflow-auto pr-2">
            <Tabs 
              defaultValue="jobs" 
              className="w-full"
              onValueChange={(value) => setActiveTab(value as "jobs" | "services")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Jobs</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Building size={16} />
                  <span>Services</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Showing opportunities near you</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {JOBS_DATA.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job}
                      onRefer={() => handleRefer(job, "job")}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Showing services near you</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {NGOS_DATA.map(ngo => (
                    <NGOCard 
                      key={ngo.id} 
                      ngo={ngo}
                      onRefer={() => handleRefer(ngo, "ngo")}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - Map */}
          <div className="lg:col-span-3 hidden lg:block">
            <MapView jobs={JOBS_DATA} ngos={NGOS_DATA} activeType={activeTab} />
          </div>
        </div>
      </main>
      
      {referItem && (
        <ReferModal
          item={referItem.item}
          type={referItem.type}
          onClose={() => setReferItem(null)}
        />
      )}
    </div>
  );
};

export default NormalPerson;
