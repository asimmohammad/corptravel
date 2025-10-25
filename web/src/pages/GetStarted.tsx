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

const GetStarted = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await apiClient.request<{ existing: boolean }>('/auth/initiate-registration', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      
      if (response.existing) {
        // Existing user - redirect to login
        navigate(`/login?email=${encodeURIComponent(email)}`);
      } else {
        // New user - redirect to register
        navigate(`/register?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      console.error('Registration initiation failed:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (user: GoogleUser) => {
    setIsLoading(true);
    
    try {
      // Check if Google user exists
      const response = await apiClient.request<{ existing: boolean }>('/auth/initiate-registration', {
        method: 'POST',
        body: JSON.stringify({ email: user.email }),
      });
      
      if (response.existing) {
        // User exists, try to login
        try {
          const loginResponse = await apiClient.request<{ access_token: string; role: string }>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ 
              email: user.email, 
              password: 'google_oauth_' + Math.random().toString(36).substr(2, 9)
            }),
          });
          
          localStorage.setItem("laasy_user", JSON.stringify({ 
            email: user.email,
            name: user.name,
            picture: user.picture,
            role: loginResponse.role,
            token: loginResponse.access_token 
          }));
          
          toast({
            title: "Welcome back!",
            description: `You've successfully logged in as ${user.name}.`,
          });
          
          navigate("/dashboard");
        } catch (loginError) {
          // If login fails, redirect to register
          navigate(`/register?email=${encodeURIComponent(user.email)}`);
        }
      } else {
        // User doesn't exist, redirect to register
        navigate(`/register?email=${encodeURIComponent(user.email)}`);
      }
    } catch (error) {
      console.error('Google authentication failed:', error);
      toast({
        title: "Authentication Failed",
        description: "Please try again or use email registration.",
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
          <CardTitle className="text-2xl">Get Started</CardTitle>
          <CardDescription>
            Enter your email to create your account or sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
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
            
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Checking..." : "Continue"}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <GoogleSignInButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              disabled={isLoading}
              className="w-full mt-4"
            />
          </div>
          
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

export default GetStarted;
