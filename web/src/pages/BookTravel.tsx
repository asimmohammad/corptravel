import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plane, Hotel, Car, Train, MapPin, Calendar, Users, Search, Heart, Shield, ChevronRight, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchFlights, searchHotels, searchCars, getTrips, createBooking } from "@/lib/api";
import { Offer, Trip } from "@/lib/api";

const BookTravel = () => {
  const [searchMode, setSearchMode] = useState<"search" | "results">("search");
  const [searchResults, setSearchResults] = useState<Offer[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departDate: "",
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "1"
  });
  
  const user = JSON.parse(localStorage.getItem("laasy_user") || "{}");
  const firstName = user?.email?.split("@")[0] || "Erin";

  useEffect(() => {
    const fetchUpcomingTrips = async () => {
      try {
        const trips = await getTrips();
        setUpcomingTrips(trips.filter(trip => trip.status === 'upcoming'));
      } catch (error) {
        console.error('Failed to fetch upcoming trips:', error);
      }
    };

    fetchUpcomingTrips();
  }, []);

  const handleSearch = async (mode: 'flights' | 'hotels' | 'cars') => {
    setIsLoading(true);
    try {
      let results: Offer[] = [];
      
      switch (mode) {
        case 'flights':
          results = await searchFlights({
            origin: searchParams.origin,
            destination: searchParams.destination,
            departDate: searchParams.departDate
          });
          break;
        case 'hotels':
          results = await searchHotels({
            city: searchParams.city,
            checkIn: searchParams.checkIn,
            checkOut: searchParams.checkOut
          });
          break;
        case 'cars':
          results = await searchCars({
            city: searchParams.city,
            pickup: searchParams.checkIn,
            dropoff: searchParams.checkOut
          });
          break;
      }
      
      setSearchResults(results);
      setSearchMode("results");
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async (offer: Offer) => {
    try {
      const bookingData = {
        items: [{
          name: offer.name,
          price: offer.price,
          currency: offer.currency,
          mode: offer.mode
        }]
      };
      
      const booking = await createBooking(bookingData);
      console.log('Booking created:', booking);
      // You could show a success message or redirect to confirmation page
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {searchMode === "search" ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Hi <span className="text-foreground">{firstName}</span>, <span className="text-muted-foreground">where to?</span>
              </h1>
            </div>

            {/* AI Search Toggle */}
            <Card className="mb-6 bg-muted/30">
              <CardContent className="py-4 flex items-center gap-3">
                <Switch id="ai-search" />
                <label htmlFor="ai-search" className="text-sm font-medium flex items-center gap-2">
                  AI Search ✨ <Badge variant="secondary" className="text-xs">New</Badge>
                </label>
              </CardContent>
            </Card>

            {/* Travel Mode Tabs */}
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <Tabs defaultValue="hotels" className="w-full">
                  <TabsList className="w-full grid grid-cols-4 h-auto rounded-none border-b bg-transparent">
                    <TabsTrigger value="flights" className="flex flex-col gap-2 py-4 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
                      <Plane className="h-5 w-5" />
                      <span className="text-sm">Flights</span>
                    </TabsTrigger>
                    <TabsTrigger value="hotels" className="flex flex-col gap-2 py-4 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
                      <Hotel className="h-5 w-5" />
                      <span className="text-sm">Hotels</span>
                    </TabsTrigger>
                    <TabsTrigger value="cars" className="flex flex-col gap-2 py-4 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
                      <Car className="h-5 w-5" />
                      <span className="text-sm">Cars</span>
                    </TabsTrigger>
                    <TabsTrigger value="trains" className="flex flex-col gap-2 py-4 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none">
                      <Train className="h-5 w-5" />
                      <span className="text-sm">Trains</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="hotels" className="p-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Where to?</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="Search destination" 
                            value={searchParams.city}
                            onChange={(e) => setSearchParams(prev => ({ ...prev, city: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-in</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="date"
                            value={searchParams.checkIn}
                            onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Check-out</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="date"
                            value={searchParams.checkOut}
                            onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Add a flight
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Add a car
                      </label>
                    </div>

                    <Button 
                      size="lg" 
                      variant="yellow" 
                      className="w-full md:w-auto px-12"
                      onClick={() => handleSearch('hotels')}
                      disabled={isLoading}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      {isLoading ? "Searching..." : "Search"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="flights" className="p-6">
                    <p className="text-muted-foreground">Flight search coming soon...</p>
                  </TabsContent>

                  <TabsContent value="cars" className="p-6">
                    <p className="text-muted-foreground">Car rental search coming soon...</p>
                  </TabsContent>

                  <TabsContent value="trains" className="p-6">
                    <p className="text-muted-foreground">Train search coming soon...</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Upcoming Trips */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Upcoming trips</h2>
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip) => (
                  <Card key={trip.id} className="hover-lift cursor-pointer mb-4">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-lg">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{trip.trip_title || 'Business Trip'}</h3>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{trip.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" className="gap-2">
                        View details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="hover-lift cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p className="text-muted-foreground">No upcoming trips</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link to="/book">Book your first trip</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Search Results View */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                All filters <Badge variant="secondary" className="ml-1">1</Badge>
              </Button>
              
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search by name" size={1} />
              </div>
              
              <div className="flex items-center gap-2">
                <Switch id="policy-only" />
                <label htmlFor="policy-only" className="text-sm">In-policy only</label>
              </div>

              <Select defaultValue="recommended">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="any">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="any">Any price</SelectItem>
                  <SelectItem value="under-100">Under $100</SelectItem>
                  <SelectItem value="100-200">$100-$200</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="any-rating">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="any-rating">Any rating</SelectItem>
                  <SelectItem value="4plus">4+ stars</SelectItem>
                  <SelectItem value="3plus">3+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Policy Banner */}
            <Card className="mb-6 bg-muted/50 border-l-4 border-l-green-500">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <p className="text-sm">
                    Your policy is up to <span className="font-semibold">$375/day</span> and <span className="font-semibold">1-5 stars</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Searching for the best options...</p>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((offer, i) => (
                  <Card key={i} className="overflow-hidden hover-lift">
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-4">
                        <div className="relative w-64 h-48 bg-muted rounded-lg overflow-hidden shrink-0">
                          <div className="absolute top-2 left-2 z-10">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between py-2">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">{offer.mode} option</p>
                                <h3 className="text-xl font-semibold mb-1">{offer.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{offer.description || 'Great option for your trip'}</p>
                                
                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">✓ Instant confirmation</span>
                                  <span className="flex items-center gap-1">✓ Free cancellation</span>
                                </div>
                              </div>
                              
                              <Badge variant={offer.policyStatus === 'in' ? "default" : "destructive"} className={offer.policyStatus === 'in' ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                                {offer.policyStatus === 'in' ? "✓ In policy" : "⚠ Out of policy"}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-end justify-between">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-[hsl(var(--laasy-yellow))] text-black font-bold hover:bg-[hsl(var(--laasy-yellow))]">
                                {Math.floor(Math.random() * 2) + 8}.{Math.floor(Math.random() * 9) + 1}
                              </Badge>
                              <span className="text-sm font-medium">Excellent</span>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                              <p className="text-3xl font-bold mb-1">${offer.price}</p>
                              <p className="text-xs text-muted-foreground mb-3">{offer.currency}</p>
                              <Button 
                                variant="default" 
                                className="bg-foreground text-background hover:bg-foreground/90"
                                onClick={() => handleBooking(offer)}
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No results found. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setSearchMode("search")}>
                Back to Search
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookTravel;
