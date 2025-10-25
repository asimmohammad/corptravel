import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Upgrade = () => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade initiated",
      description: "Redirecting to secure checkout...",
    });
    // In production, this would redirect to Stripe checkout
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upgrade to LaaSy Pro</h1>
          <p className="text-xl text-muted-foreground">
            Unlock the full power of business travel management
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <Card className="border-2">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">Current Plan</Badge>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for trying out LaaSy</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Up to 3 team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Basic booking search</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Travel policy controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold">
              Popular
            </div>
            <CardHeader>
              <Badge className="w-fit mb-2">
                <Zap className="h-3 w-3 mr-1" />
                Recommended
              </Badge>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For teams that travel frequently</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-muted-foreground">/month per user</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Unlimited team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Live pricing & booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-semibold">Cashback rewards tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Custom approval workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>API access</span>
                </li>
              </ul>
              <Button onClick={handleUpgrade} className="w-full mt-6" size="lg">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Comparison */}
        <div className="max-w-5xl mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Why upgrade to Pro?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Scale Your Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Add unlimited team members without restrictions. Perfect for growing companies.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-Time Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Access live flight and hotel pricing. Book instantly with real-time availability.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Earn Cashback</h3>
                  <p className="text-sm text-muted-foreground">
                    Get rewards on every booking. Track savings and optimize your travel budget.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
