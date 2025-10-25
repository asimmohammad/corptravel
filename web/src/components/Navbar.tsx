import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("laasy_user");
  const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 font-bold text-xl">
            <span>LaaSy</span>
            <span className="text-[hsl(var(--laasy-yellow))] text-2xl">°</span>
          </Link>
          
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Travel <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background z-50">
                <DropdownMenuItem asChild>
                  <Link to="/book-travel">Book Travel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <div className="hidden md:flex gap-6">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Trips
                </Link>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Rewards
                </Link>
                <Link to="/team" className="text-sm font-medium hover:text-primary transition-colors">
                  Groups
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link to="/help" className="text-sm font-medium hover:text-primary transition-colors">
                  Help
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
                  🇺🇸 USD <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background z-50">
                  <DropdownMenuItem>🇺🇸 USD</DropdownMenuItem>
                  <DropdownMenuItem>🇪🇺 EUR</DropdownMenuItem>
                  <DropdownMenuItem>🇬🇧 GBP</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                View Policy
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 bg-foreground">
                    <AvatarFallback className="bg-foreground text-background text-xs font-semibold">
                      {user?.email?.substring(0, 2).toUpperCase() || "DP"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background z-50">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/team">Team</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/upgrade">Upgrade</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("laasy_user");
                      window.location.href = "/login";
                    }}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/get-started">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
