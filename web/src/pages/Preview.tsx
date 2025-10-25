import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const Preview = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Mode Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4 text-center">
        <p className="text-sm font-medium">
          You're in demo mode — Sign up to see live pricing and book real travel
          <Button variant="secondary" size="sm" asChild className="ml-4">
            <Link to="/signup">Start Free Account</Link>
          </Button>
        </p>
      </div>

      {/* Simulated Dashboard */}
      <div className="container py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Product Preview</h1>
              <p className="text-muted-foreground">Explore LaaSy's features with sample data</p>
            </div>
            <Badge variant="outline">Preview Mode</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Book Travel", desc: "Flights & Hotels" },
            { label: "Team", desc: "Sample data" },
            { label: "Analytics", desc: "Pro feature" },
            { label: "Settings", desc: "Preview" }
          ].map((item, i) => (
            <Card key={i} className="opacity-75 cursor-not-allowed">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-2 border-primary">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Loved the preview?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sign up free to access live bookings, invite your team, and start managing real business travel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">
                  Start Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preview;
