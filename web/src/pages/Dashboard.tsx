import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Users, Settings, CreditCard, BarChart, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getTrips, getTravelers, getPolicies } from "@/lib/api";
import { Trip, Traveler, Policy } from "@/lib/api";

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsData, travelersData, policiesData] = await Promise.all([
          getTrips(),
          getTravelers(),
          getPolicies()
        ]);
        
        setTrips(tripsData);
        setTravelers(travelersData);
        setPolicies(policiesData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const user = JSON.parse(localStorage.getItem("laasy_user") || "{}");
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const totalTrips = trips.length;
  const teamMembers = travelers.length;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back{user.email ? `, ${user.email.split('@')[0]}` : ''}!</h1>
              <p className="text-muted-foreground">Manage your business travel in one place</p>
            </div>
            <Badge variant="outline" className="text-sm">{user.role || 'Traveler'}</Badge>
          </div>
        </div>

        {/* Upgrade Banner */}
        <Card className="mb-6 border-primary bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Unlock Advanced Features</h3>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Pro for unlimited team members, live pricing, and cashback rewards
                </p>
              </div>
              <Button asChild>
                <Link to="/upgrade">
                  Upgrade Now
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover-lift cursor-pointer">
            <Link to="/book">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Book Travel</h3>
                    <p className="text-sm text-muted-foreground">Flights & Hotels</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover-lift cursor-pointer">
            <Link to="/team">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Team</h3>
                    <p className="text-sm text-muted-foreground">{teamMembers} members</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover-lift cursor-pointer opacity-60">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <BarChart className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Pro feature</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer">
            <Link to="/settings">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Settings</h3>
                    <p className="text-sm text-muted-foreground">Policies & More</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Trips */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Next Trip</CardTitle>
              <CardDescription>Upcoming travel bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p>Loading trips...</p>
                  </div>
                ) : upcomingTrips.length > 0 ? (
                  upcomingTrips.map((trip) => (
                    <div key={trip.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{trip.trip_title || 'Business Trip'}</h4>
                          <Badge>{trip.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>Trip ID: {trip.id}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Plane className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>No upcoming trips</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/book">Book your next trip</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Company Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
              <CardDescription>Travel activity summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Trips</span>
                <span className="font-semibold">{totalTrips}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Team Members</span>
                <span className="font-semibold">{teamMembers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Policies</span>
                <span className="font-semibold">{policies.length}</span>
              </div>
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/team">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Team Members
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
