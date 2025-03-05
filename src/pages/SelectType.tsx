
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, Building, HandCoins } from "lucide-react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

const SelectType = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const userTypes = [
    {
      id: "normal-person",
      title: "Normal Person",
      icon: <User size={24} />,
      description: "View jobs, refer people, find support services",
      path: "/normal-person"
    },
    {
      id: "recruiter",
      title: "Recruiter",
      icon: <Briefcase size={24} />,
      description: "Post jobs, find candidates",
      path: "/recruiter"
    },
    {
      id: "service-manager",
      title: "Service Manager",
      icon: <Building size={24} />,
      description: "Manage NGO or shelter services",
      path: "/service-manager"
    },
    {
      id: "direct-donate",
      title: "Direct Donate",
      icon: <HandCoins size={24} />,
      description: "Support organizations helping those in need",
      path: "/direct-donate"
    }
  ];

  const handleSelectType = (path: string) => {
    if (!showPopup) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate(path);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container-padding max-w-screen-md mx-auto">
        <div className="mb-6">
          <BackButton to="/" />
        </div>
        
        <h1 className="heading-2 mb-2">Who are you?</h1>
        <p className="text-muted-foreground mb-8">
          Select your user type to continue
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userTypes.map((type) => (
            <button
              key={type.id}
              className="glass-card rounded-xl p-6 text-left flex items-start gap-4 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]"
              onClick={() => handleSelectType(type.path)}
            >
              <div className="rounded-full bg-accent p-3 text-primary">
                {type.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </main>
      
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-slide-in">
            <h2 className="text-xl font-bold mb-3">Say No to Cash</h2>
            <p className="text-muted-foreground mb-4">
              Direct cash handouts often provide temporary relief but don't address 
              long-term needs. Consider referring to work opportunities or support 
              services instead.
            </p>
            <div className="w-full bg-muted rounded-full h-1.5 mb-1">
              <div className="bg-primary h-1.5 rounded-full animate-pulse-subtle w-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectType;
