
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8 animate-slide-in">
            <h1 className="heading-1 mb-3 text-balance">Bridge to Work</h1>
            <p className="text-muted-foreground text-balance">
              Connecting opportunities with those who need them most
            </p>
          </div>

          <div className="relative h-[280px] mb-10">
            {[
              {
                title: "Find Work",
                description: "Access nearby job opportunities that match your skills and availability."
              },
              {
                title: "Get Help",
                description: "Discover local resources, shelters, and support services to assist you."
              },
              {
                title: "Build a Future",
                description: "Create sustainable pathways to independence through work and training."
              }
            ].map((section, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full glass-card rounded-2xl p-6 flex flex-col justify-center items-center text-center transition-all duration-500 ${
                  index === activeSection
                    ? "opacity-100 translate-y-0 shadow-lg"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <h2 className="heading-2 mb-4">{section.title}</h2>
                <p className="text-muted-foreground text-lg text-balance">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-6">
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full mx-1 transition-all ${
                  index === activeSection ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                onClick={() => setActiveSection(index)}
                aria-label={`View section ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="btn-primary w-full flex items-center justify-center gap-2"
            onClick={handleNext}
          >
            <span>Get Started</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2023 Bridge to Work - Creating pathways to dignity and independence</p>
      </footer>
    </div>
  );
};

export default Index;
