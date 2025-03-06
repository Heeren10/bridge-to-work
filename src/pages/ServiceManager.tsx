
import { useState } from "react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobData } from "../components/JobCard";
import { NGOData } from "../components/NGOCard";
import { Eye, EyeOff, Lock, MapPin, Building, Plus, BarChart3 } from "lucide-react";
import MapView from "../components/MapView";

// Mock data for the map display
const SAMPLE_JOBS: JobData[] = [
  {
    id: "sm1",
    title: "Kitchen Helper",
    description: "Assist in food preparation, cleaning, and serving in a busy community kitchen. Flexible hours, meals provided.",
    company: "Community Eats",
    location: "Delhi",
    salary: "₹1,000/hour",
    duration: "Ongoing",
    skills: ["Food prep", "Cleaning"],
    date: "Today"
  },
  {
    id: "sm2",
    title: "Street Cleaning",
    description: "Join a team cleaning up the neighborhood streets. Equipment provided, no experience needed.",
    company: "Clean Streets Program",
    location: "Mumbai",
    salary: "₹900/hour",
    duration: "Weekly",
    skills: ["Outdoors", "Community minded"],
    date: "This week"
  }
];

const SAMPLE_NGOS: NGOData[] = [
  {
    id: "sm1",
    name: "Haven Shelter",
    description: "Emergency shelter providing beds, meals, and basic necessities for individuals experiencing homelessness.",
    address: "Colaba, Mumbai",
    phone: "022-12345678",
    website: "https://example.com",
    services: ["Shelter", "Meals", "Hygiene"],
    hours: "24/7"
  },
  {
    id: "sm2",
    name: "New Beginnings Center",
    description: "Support services including counseling, job training, and housing assistance for those in need.",
    address: "Connaught Place, Delhi",
    phone: "011-98765432",
    services: ["Counseling", "Job Training", "Housing Assistance"],
    hours: "Mon-Fri 8am-6pm"
  }
];

const ServiceManager = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"services" | "opportunities">("services");

  // In a real app, this would connect to a backend
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoginForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-blue-50">
      <Header title="Service Manager" />
      
      <main className="flex-1 container-padding max-w-screen-xl mx-auto">
        <div className="mb-6">
          <BackButton to="/select-type" />
        </div>
        
        {showLoginForm ? (
          <div className="glass-card rounded-xl p-8 max-w-md mx-auto animate-fade-in bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="text-white" size={28} />
              </div>
              <h1 className="heading-2 mb-2 text-gradient-primary bg-gradient-to-r from-primary to-blue-600">Service Manager Login</h1>
              <p className="text-muted-foreground">
                Access your organization's dashboard
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field w-full pl-10"
                    placeholder="your@email.com"
                    value={credentials.email}
                    onChange={handleInputChange}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="input-field w-full pl-10 pr-10"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
              >
                Log In
              </button>
              
              <p className="text-center text-sm text-muted-foreground">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </p>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h1 className="heading-2 mb-2 text-gradient-primary bg-gradient-to-r from-primary to-blue-600">Service Manager Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Manage your organization's services and opportunities
            </p>
            
            <Tabs 
              defaultValue="services" 
              className="w-full"
              onValueChange={(value) => setActiveTab(value as "services" | "opportunities")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Building size={16} />
                  <span>Services</span>
                </TabsTrigger>
                <TabsTrigger value="opportunities" className="flex items-center gap-2">
                  <Plus size={16} />
                  <span>Job Opportunities</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left column - Management tools */}
                <div className="lg:col-span-2 space-y-4">
                  <TabsContent value="services" className="space-y-4 mt-0">
                    <div className="glass-card rounded-xl p-6 bg-white/80">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Building size={18} className="text-primary" />
                        Manage Services
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        Update your organization's services, hours, and contact information.
                      </p>
                      <button className="btn-primary w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                        Edit Services
                      </button>
                    </div>
                    
                    <div className="glass-card rounded-xl p-6 bg-white/80">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 size={18} className="text-primary" />
                        Service Statistics
                      </h2>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
                          <p className="text-2xl font-bold text-blue-600">24</p>
                          <p className="text-sm text-blue-700">Referrals This Week</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200">
                          <p className="text-2xl font-bold text-green-600">142</p>
                          <p className="text-sm text-green-700">Total Helped</p>
                        </div>
                      </div>
                      <button className="btn-secondary w-full">
                        View Detailed Reports
                      </button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="opportunities" className="space-y-4 mt-0">
                    <div className="glass-card rounded-xl p-6 bg-white/80">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        Posted Opportunities
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        You have 3 active job opportunities.
                      </p>
                      <div className="space-y-4 mb-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="border border-border rounded-lg p-4 bg-white">
                            <div className="flex justify-between">
                              <h3 className="font-medium">Kitchen Helper</h3>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="btn-primary flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                          Add New
                        </button>
                        <button className="btn-secondary flex-1">
                          View All
                        </button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
                
                {/* Right column - Map */}
                <div className="lg:col-span-3 h-[500px]">
                  <div className="glass-card rounded-xl p-4 h-full bg-white/80">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      {activeTab === "services" ? "Your Service Locations" : "Your Job Opportunities"}
                    </h2>
                    <div className="h-[calc(100%-40px)]">
                      <MapView 
                        jobs={SAMPLE_JOBS} 
                        ngos={SAMPLE_NGOS} 
                        activeType={activeTab === "services" ? "services" : "jobs"} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServiceManager;
