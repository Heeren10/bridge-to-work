
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Briefcase, Building, Heart, CheckCircle, Calendar, MapPin, DollarSign } from "lucide-react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import WelcomePrompt from "../components/WelcomePrompt";
import { AppContext } from "../App";

interface UserTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  onClick: () => void;
}

const UserTypeCard = ({ icon, title, description, features, color, onClick }: UserTypeCardProps) => (
  <div 
    className={`glass-card rounded-xl p-6 cursor-pointer card-hover transition-all duration-300 hover:scale-[1.02] border-l-4 ${color} overflow-hidden relative`}
    onClick={onClick}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10" />
    
    <div className="flex flex-col items-center text-center space-y-4">
      <div className={`p-3 ${color.replace('border-l-', 'bg-')} bg-opacity-20 rounded-full`}>
        {icon}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      <div className="space-y-2 w-full mt-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center text-sm">
            <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-left text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mt-4 text-primary text-sm font-medium">
        <span>Continue</span>
        <ArrowRight size={16} className="ml-2" />
      </div>
    </div>
  </div>
);

const SelectType = () => {
  const navigate = useNavigate();
  const { promptShown, setPromptShown } = useContext(AppContext);

  useEffect(() => {
    console.log("Select Type rendered, promptShown:", promptShown);
  }, [promptShown]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 -z-10"></div>
      <Header title="Select User Type" />
      
      <main className="flex-1 container-padding max-w-screen-lg mx-auto">
        <div className="mb-6">
          <BackButton to="/" />
        </div>
        
        {promptShown === false && <WelcomePrompt />}
        
        <h1 className="text-3xl font-bold mb-6 text-gradient-primary">Find Your Path</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Bridge to Work connects people to opportunities and resources. Select your role below to get started on your journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <UserTypeCard 
            icon={<User className="h-6 w-6 text-blue-500" />}
            title="Normal Person"
            description="Find and refer people to job opportunities and support services"
            features={[
              "Find nearby job opportunities",
              "Connect with support services",
              "Refer friends to opportunities"
            ]}
            color="border-l-blue-400"
            onClick={() => navigate('/normal-person')}
          />
          
          <UserTypeCard 
            icon={<Briefcase className="h-6 w-6 text-amber-500" />}
            title="Recruiter"
            description="Post job opportunities and find potential workers"
            features={[
              "Post new job listings",
              "Review applications",
              "Connect with candidates"
            ]}
            color="border-l-amber-400"
            onClick={() => navigate('/recruiter')}
          />
          
          <UserTypeCard 
            icon={<Building className="h-6 w-6 text-green-500" />}
            title="Service Manager"
            description="Manage your shelter, NGO or support service"
            features={[
              "List your services",
              "Manage availability",
              "Connect with those in need"
            ]}
            color="border-l-green-400"
            onClick={() => navigate('/service-manager')}
          />
          
          <UserTypeCard 
            icon={<Heart className="h-6 w-6 text-rose-500" />}
            title="Direct Donate"
            description="Support organizations helping people in need"
            features={[
              "Make secure donations",
              "Choose your cause",
              "Track your impact"
            ]}
            color="border-l-rose-400"
            onClick={() => navigate('/direct-donate')}
          />
        </div>
        
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">How Bridge to Work Makes a Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-full mr-3">
                <MapPin size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Local Focus</h3>
                <p className="text-sm text-gray-600">All opportunities and services are mapped to your location</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-amber-100 rounded-full mr-3">
                <Calendar size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Immediate Help</h3>
                <p className="text-sm text-gray-600">Same-day opportunities and emergency services</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Dignity First</h3>
                <p className="text-sm text-gray-600">Creating independence through meaningful work</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectType;
