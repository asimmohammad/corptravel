import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "@/lib/api";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && (!companyName || !teamSize)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!fullName || !role)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        full_name: fullName,
        role: role,
        company_name: companyName,
        team_size: teamSize
      });
      
      toast({
        title: "Setup complete!",
        description: "Welcome to your LaaSy dashboard.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error('Profile update failed:', error);
      toast({
        title: "Setup Failed",
        description: "Failed to save your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 w-12 rounded-full ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl">
            {step === 1 && "Company Setup"}
            {step === 2 && "Your Profile"}
            {step === 3 && "Travel Policies"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your company"}
            {step === 2 && "Set up your traveler profile"}
            {step === 3 && "Configure basic travel policies"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Select value={teamSize} onValueChange={setTeamSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201+">201+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="e.g., Travel Manager, Operations"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxHotelRate">Max Hotel Rate per Night</Label>
                <Select defaultValue="200">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">$150</SelectItem>
                    <SelectItem value="200">$200</SelectItem>
                    <SelectItem value="300">$300</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="flightClass">Preferred Flight Class</Label>
                <Select defaultValue="economy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium">Premium Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                You can customize these policies later in your dashboard settings.
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="ml-auto">
                Continue
              </Button>
            ) : (
              <Button onClick={handleFinish} className="ml-auto" disabled={isLoading}>
                {isLoading ? "Saving..." : "Finish Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
