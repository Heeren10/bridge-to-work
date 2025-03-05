
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, Briefcase, Building, Heart } from "lucide-react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import WelcomePrompt from "../components/WelcomePrompt";
import { AppContext } from "../App";

interface UserTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const UserTypeCard = ({ icon, title, description, onClick }: UserTypeCardProps) => (
  <div 
    className="glass-card rounded-xl p-6 cursor-pointer card-hover transition-all duration-300 hover:scale-[1.02]"
    onClick={onClick}
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="p-3 bg-accent rounded-full">
        {icon}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center mt-4 text-primary text-sm">
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
    // Mark that we've shown the prompt
    if (!promptShown) {
      setPromptShown(true);
    }
  }, [promptShown, setPromptShown]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header title="Select User Type" />
      
      <main className="flex-1 container-padding max-w-screen-lg mx-auto">
        <div className="mb-6">
          <BackButton to="/" />
        </div>
        
        {!promptShown && <WelcomePrompt />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <UserTypeCard 
            icon={<User className="h-6 w-6 text-primary" />}
            title="Normal Person"
            description="Find and refer people to job opportunities and support services"
            onClick={() => navigate('/normal-person')}
          />
          
          <UserTypeCard 
            icon={<Briefcase className="h-6 w-6 text-primary" />}
            title="Recruiter"
            description="Post job opportunities and find potential workers"
            onClick={() => navigate('/recruiter')}
          />
          
          <UserTypeCard 
            icon={<Building className="h-6 w-6 text-primary" />}
            title="Service Manager"
            description="Manage your shelter, NGO or support service"
            onClick={() => navigate('/service-manager')}
          />
          
          <UserTypeCard 
            icon={<Heart className="h-6 w-6 text-primary" />}
            title="Direct Donate"
            description="Support organizations helping people in need"
            onClick={() => navigate('/direct-donate')}
          />
        </div>
      </main>
    </div>
  );
};

export default SelectType;
