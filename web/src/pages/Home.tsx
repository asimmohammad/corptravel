import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Shield, TrendingUp, CheckCircle, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Plane,
      title: "Book Smarter",
      description: "Search and book flights and hotels with live pricing and instant confirmations."
    },
    {
      icon: Users,
      title: "Invite Your Team",
      description: "Add team members, manage traveler profiles, and centralize all bookings."
    },
    {
      icon: Shield,
      title: "Set Travel Policies",
      description: "Create approval rules, budget caps, and preferred vendors in minutes."
    },
    {
      icon: TrendingUp,
      title: "Earn Cashback",
      description: "Get rewards on every booking and track savings across your organization."
    }
  ];

  const benefits = [
    "Live flight and hotel search",
    "Team management up to 3 members",
    "Basic travel policy controls",
    "Mobile-responsive dashboard",
    "Email support",
    "Secure payment processing"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Simplify business travel for your whole team
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Book flights, hotels, and manage travel policies — all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="yellow" asChild className="text-lg">
                  <Link to="/get-started">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/preview">Preview Product</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need to manage business travel
              </h2>
              <p className="text-xl text-muted-foreground">
                Powerful features designed for growing teams
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover-lift border-2">
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Free Tier Benefits */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start free, upgrade when ready
                </h2>
                <p className="text-xl text-muted-foreground">
                  Try all core features at no cost
                </p>
              </div>
              
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button size="lg" variant="yellow" asChild>
                      <Link to="/get-started">Get Started Free</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Trusted by growing teams
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Building className="h-8 w-8" />
                  <span className="font-semibold text-lg">Company {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card className="border-2 bg-primary text-primary-foreground">
              <CardContent className="py-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to simplify your business travel?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join teams who trust LaaSy for their travel management
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/get-started">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">
                    <Link to="/preview">See Product Demo</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
