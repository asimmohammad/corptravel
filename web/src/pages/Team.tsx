import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Mail, UserPlus, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Team = () => {
  const [teamMembers] = useState([
    { name: "You", email: "you@company.com", role: "Admin", initials: "YO" },
    { name: "Sarah Johnson", email: "sarah@company.com", role: "Member", initials: "SJ" },
  ]);
  const { toast } = useToast();

  const handleInvite = () => {
    if (teamMembers.length >= 3) {
      toast({
        title: "Free tier limit reached",
        description: "Upgrade to Pro to invite unlimited team members.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invitation sent!",
        description: "Team member will receive an email invitation.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Team Management</h1>
              <p className="text-muted-foreground">Manage your team members and their travel profiles</p>
            </div>
            <Badge variant="outline">{teamMembers.length} / 3 Members</Badge>
          </div>
        </div>

        {/* Team limit warning */}
        {teamMembers.length >= 2 && (
          <Card className="mb-6 border-orange-500/50 bg-orange-500/5">
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Approaching Team Limit</h3>
                  <p className="text-sm text-muted-foreground">
                    You have {3 - teamMembers.length} team member slot{3 - teamMembers.length !== 1 ? 's' : ''} remaining on the free tier. 
                    Upgrade to Pro for unlimited team members.
                  </p>
                </div>
                <Button size="sm" asChild>
                  <a href="/upgrade">Upgrade</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Members List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>People who can book travel for your company</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your LaaSy workspace
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="inviteEmail">Work Email</Label>
                        <Input id="inviteEmail" type="email" placeholder="colleague@company.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inviteName">Full Name</Label>
                        <Input id="inviteName" placeholder="John Doe" />
                      </div>
                      <Button onClick={handleInvite} className="w-full">
                        Send Invitation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.role === "Admin" && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                    <Badge variant={member.role === "Admin" ? "default" : "outline"}>
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>Travel statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Trips</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="font-semibold">{teamMembers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-semibold">3 trips</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Need More Team Members?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upgrade to Pro for unlimited team members and advanced features
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/upgrade">Upgrade to Pro</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
