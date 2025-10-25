import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plane } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { GoogleUser } from "@/lib/googleAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid work email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Weak password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiClient.request<{ access_token: string; role: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Store user data in localStorage
      localStorage.setItem("laasy_user", JSON.stringify({ 
        email, 
        role: response.role,
        token: response.access_token 
      }));
      
      toast({
        title: "Account created!",
        description: "Welcome to LaaSy. Let's set up your profile.",
      });
      navigate("/onboarding");
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (user: GoogleUser) => {
    setIsLoading(true);
    
    try {
      // For Google OAuth, we'll create a user with a generated password
      // In a real implementation, you'd handle this differently
      const response = await apiClient.request<{ access_token: string; role: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          email: user.email, 
          password: 'google_oauth_' + Math.random().toString(36).substr(2, 9)
        }),
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
        title: "Account created!",
        description: `Welcome ${user.name}! Let's set up your profile.`,
      });
      navigate("/onboarding");
    } catch (error: any) {
      console.error('Google registration failed:', error);
      const errorMessage = error.message || "Google registration failed. Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
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
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Start managing your business travel in minutes
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
              <p className="text-xs text-muted-foreground">
                We'll send a verification link to your inbox
              </p>
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
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
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
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

export default Signup;
