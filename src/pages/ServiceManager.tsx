
import { useState } from "react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobData } from "../components/JobCard";
import { NGOData } from "../components/NGOCard";
import { Eye, EyeOff, Lock } from "lucide-react";

const ServiceManager = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Service Manager" />
      
      <main className="flex-1 container-padding max-w-screen-md mx-auto">
        <div className="mb-6">
          <BackButton to="/select-type" />
        </div>
        
        {showLoginForm ? (
          <div className="glass-card rounded-xl p-6 max-w-md mx-auto animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-primary" size={24} />
              </div>
              <h1 className="heading-2 mb-2">Service Manager Login</h1>
              <p className="text-muted-foreground">
                Access your organization's dashboard
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field w-full"
                  placeholder="your@email.com"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
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
                    className="input-field w-full pr-10"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
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
                className="btn-primary w-full"
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
            <h1 className="heading-2 mb-2">Service Manager Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Manage your organization's services and opportunities
            </p>
            
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="opportunities">Job Opportunities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-4">
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Manage Services</h2>
                  <p className="text-muted-foreground mb-4">
                    Update your organization's services, hours, and contact information.
                  </p>
                  <button className="btn-primary w-full">
                    Edit Services
                  </button>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Service Statistics</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-accent rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Referrals This Week</p>
                    </div>
                    <div className="bg-accent rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold">142</p>
                      <p className="text-sm text-muted-foreground">Total Helped</p>
                    </div>
                  </div>
                  <button className="btn-secondary w-full">
                    View Detailed Reports
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="opportunities" className="space-y-4">
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Posted Opportunities</h2>
                  <p className="text-muted-foreground mb-4">
                    You have 3 active job opportunities.
                  </p>
                  <div className="space-y-4 mb-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">Kitchen Helper</h3>
                          <span className="text-xs bg-accent px-2 py-1 rounded-full">Active</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Posted 3 days ago</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-primary flex-1">
                      Add New
                    </button>
                    <button className="btn-secondary flex-1">
                      View All
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServiceManager;
