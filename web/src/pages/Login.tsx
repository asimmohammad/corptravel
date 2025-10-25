import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/api";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { GoogleUser } from "@/lib/googleAuth";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("admin@acme.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await login({ email, password });
      
      // Store user data in localStorage
      localStorage.setItem("laasy_user", JSON.stringify({ 
        email, 
        role: response.role,
        token: response.access_token 
      }));
      
      toast({
        title: "Welcome back!",
        description: `You've successfully logged in as ${response.role}.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (user: GoogleUser) => {
    setIsLoading(true);
    
    try {
      // For Google OAuth login, we'll try to login with the Google email
      // In a real implementation, you'd have a separate Google OAuth endpoint
      const response = await login({ 
        email: user.email, 
        password: 'google_oauth_' + Math.random().toString(36).substr(2, 9)
      });
      
      // Store user data in localStorage
      localStorage.setItem("laasy_user", JSON.stringify({ 
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: response.role,
        token: response.access_token 
      }));
      
      toast({
        title: "Welcome back!",
        description: `You've successfully logged in as ${user.name}.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Google login failed:', error);
      toast({
        title: "Login Failed",
        description: "Google account not found. Please sign up first.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = (error: string) => {
    toast({
      title: "Google Sign-In Failed",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <Plane className="h-8 w-8 text-primary" />
              <span>LaaSy</span>
            </Link>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-6">
                <Separator />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  OR
                </div>
              </div>

              <GoogleSignInButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                disabled={isLoading}
              />
              
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up free
                </Link>
              </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
