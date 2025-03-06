
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Building, Briefcase, Heart, MapPin, Calendar, User } from "lucide-react";
import { AppContext } from "../App";

const Index = () => {
  const navigate = useNavigate();
  const { setPromptShown } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState(0);
  const totalSections = 3;

  // Auto-advance through intro sections
  useEffect(() => {
    if (activeSection < totalSections - 1) {
      const timer = setTimeout(() => {
        setActiveSection(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const handleNext = () => {
    // Reset promptShown to false so it will appear on the select-type page
    setPromptShown(false);
    navigate("/select-type");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-r from-blue-100/30 to-purple-100/30 -z-10 rounded-b-[50%]"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-r from-amber-50/40 to-rose-50/40 -z-10 rounded-t-[30%]"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 animate-slide-in">
            <div className="inline-block p-3 mb-4 bg-gradient-to-br from-primary/10 to-blue-400/20 rounded-full">
              <Briefcase size={32} className="text-primary animate-pulse-subtle" />
            </div>
            <h1 className="text-4xl font-bold mb-3 text-balance bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Bridge to Work
            </h1>
            <p className="text-muted-foreground text-balance text-lg">
              Connecting opportunities with those who need them most
            </p>
          </div>

          <div className="relative h-[340px] mb-10">
            {[
              {
                title: "Find Work",
                description: "Access nearby job opportunities that match your skills and availability. Get connected to meaningful employment with dignity.",
                icon: <Briefcase className="h-10 w-10 text-blue-500" />,
                color: "from-blue-50 to-blue-100",
                iconBg: "bg-blue-100"
              },
              {
                title: "Get Help",
                description: "Discover local resources, shelters, and support services to assist you. Connect with NGOs and government programs offering assistance.",
                icon: <Heart className="h-10 w-10 text-rose-500" />,
                color: "from-rose-50 to-rose-100",
                iconBg: "bg-rose-100"
              },
              {
                title: "Build a Future",
                description: "Create sustainable pathways to independence through work, training, and community support. Your journey to self-reliance starts here.",
                icon: <Building className="h-10 w-10 text-amber-500" />,
                color: "from-amber-50 to-amber-100",
                iconBg: "bg-amber-100"
              }
            ].map((section, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full glass-card rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-500 ${
                  index === activeSection
                    ? "opacity-100 translate-y-0 shadow-lg border-l-4 border-l-primary"
                    : "opacity-0 translate-y-4 pointer-events-none"
                } bg-gradient-to-br ${section.color} border border-white/80`}
              >
                <div className={`p-4 rounded-full ${section.iconBg} mb-4`}>
                  {section.icon}
                </div>
                <h2 className="heading-2 mb-4 text-balance text-gray-800">{section.title}</h2>
                <p className="text-muted-foreground text-lg text-balance mb-6">
                  {section.description}
                </p>
                <div className="flex gap-2 mt-auto">
                  <MapPin size={18} className="text-rose-500" />
                  <span className="text-sm text-gray-600">Location-based services</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                className={`h-2.5 rounded-full mx-1.5 transition-all ${
                  index === activeSection ? "w-10 bg-gradient-to-r from-primary to-blue-500" : "w-2.5 bg-muted"
                }`}
                onClick={() => setActiveSection(index)}
                aria-label={`View section ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button
              className="btn-primary w-full flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-primary to-blue-600"
              onClick={handleNext}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>
            
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100">
                <User size={18} className="text-blue-500 mb-1" />
                <span className="text-xs font-medium">For Individuals</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100">
                <Building size={18} className="text-amber-500 mb-1" />
                <span className="text-xs font-medium">For Organizations</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100">
                <Heart size={18} className="text-green-500 mb-1" />
                <span className="text-xs font-medium">For Donors</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm border-t border-blue-100/30">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">© 2023 Bridge to Work - Creating pathways to dignity and independence</p>
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
            <span>About</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
