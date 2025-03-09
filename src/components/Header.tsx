
import { useNavigate } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

interface HeaderProps {
  title?: string;
  showHome?: boolean;
}

const Header = ({ title, showHome = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 w-full bg-white/70 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {title || "Bridge to Work"}
          </h1>
          {title && title !== "Bridge to Work" && (
            <div className="flex items-center text-muted-foreground ml-2">
              <ChevronRight size={16} />
              <span className="text-sm">{title}</span>
            </div>
          )}
        </div>
        {showHome && (
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 transition-colors shadow-sm"
            aria-label="Home"
          >
            <Home size={20} className="text-primary" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
