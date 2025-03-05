
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

interface HeaderProps {
  title?: string;
  showHome?: boolean;
}

const Header = ({ title, showHome = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 w-full bg-white/70 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
        <h1 className="text-lg font-semibold">{title || "Bridge to Work"}</h1>
        {showHome && (
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Home"
          >
            <Home size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
