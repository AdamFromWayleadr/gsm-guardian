import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Building2, 
  LayoutGrid, 
  Settings, 
  ChevronDown,
  ChevronRight,
  Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
  { id: "acme", name: "Acme Corp" },
  { id: "techstart", name: "TechStart Inc" },
  { id: "globalcom", name: "GlobalCom" },
  { id: "nexgen", name: "NexGen Solutions" },
];

export function Sidebar() {
  const location = useLocation();
  const [companiesOpen, setCompaniesOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isCompanyActive = location.pathname.startsWith("/companies");

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Radio className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">WayHome</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">GSM Monitor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={cn("nav-item", isActive("/") && "nav-item-active")}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>

        <div>
          <button
            onClick={() => setCompaniesOpen(!companiesOpen)}
            className={cn(
              "nav-item w-full justify-between",
              isCompanyActive && "nav-item-active"
            )}
          >
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5" />
              <span>Companies</span>
            </div>
            {companiesOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {companiesOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  to={`/companies/${company.id}`}
                  className={cn(
                    "nav-item text-sm",
                    location.pathname === `/companies/${company.id}` && "nav-item-active"
                  )}
                >
                  {company.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/units"
          className={cn("nav-item", isActive("/units") && "nav-item-active")}
        >
          <LayoutGrid className="h-5 w-5" />
          <span>All Units</span>
        </Link>

        <Link
          to="/settings"
          className={cn("nav-item", isActive("/settings") && "nav-item-active")}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground text-center">
          v1.0.0 • GSM Monitoring
        </p>
      </div>
    </aside>
  );
}
