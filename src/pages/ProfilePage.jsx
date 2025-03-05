import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Calendar,
  Award,
  BarChart,
  Leaf,
  Edit2,
  Camera,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  CheckCircle,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Please log in to view your profile
            </p>
            <Button as="a" href="/login">
              Log In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="relative mb-8">
              {/* Cover Photo */}
              <div className="h-48 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-r from-primary/30 to-secondary/30">
                <img
                  src="/placeholder.svg?height=400&width=1200"
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-background">
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-12 sm:-mt-16 px-4 sm:px-6">
                <div className="flex-shrink-0 relative">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-background bg-muted overflow-hidden">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-background p-1.5 rounded-full shadow-sm border border-border hover:bg-muted">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 sm:mt-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">
                      {user.name || "EcoQuest User"}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-muted-foreground">
                      {user.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          Joined{" "}
                          {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="gradient" size="sm">
                      <Leaf className="h-4 w-4 mr-2" />
                      View Eco Impact
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Tabs & Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1 space-y-6">
                {/* Profile Stats */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="font-semibold mb-4">Eco Stats</h2>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbon Saved</span>
                          <span className="font-medium">1.2 tons</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Eco Points</span>
                          <span className="font-medium">1,240</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quests Completed</span>
                          <span className="font-medium">24/50</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: "48%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Navigation */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <nav className="p-2">
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "overview"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <User className="h-5 w-5" />
                      <span>Overview</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "achievements"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("achievements")}
                    >
                      <Award className="h-5 w-5" />
                      <span>Achievements</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "impact"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("impact")}
                    >
                      <BarChart className="h-5 w-5" />
                      <span>Eco Impact</span>
                    </button>
                  </nav>
                </div>

                {/* Social Links */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6">
                    <h2 className="font-semibold mb-4">Social Profiles</h2>

                    <div className="space-y-3">
                      <a
                        href="#"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                        <span>Twitter</span>
                      </a>

                      <a
                        href="#"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="h-4 w-4 mr-2 text-[#E1306C]" />
                        <span>Instagram</span>
                      </a>

                      <a
                        href="#"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href="#"
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        <span>Website</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3 space-y-6">
                {activeTab === "overview" && (
                  <>
                    {/* About */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">About</h2>
                        <p className="text-muted-foreground">
                          {user.bio || "This user hasn't added a bio yet."}
                        </p>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          Recent Activity
                        </h2>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>

                      <div className="divide-y divide-border">
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                Completed "Plastic-Free Week" Quest
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Earned 100 eco points
                              </p>
                            </div>
                            <span className="ml-auto text-sm text-muted-foreground">
                              2 days ago
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                              <BarChart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                Updated Carbon Footprint
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Reduced by 0.2 tons
                              </p>
                            </div>
                            <span className="ml-auto text-sm text-muted-foreground">
                              1 week ago
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                              <Award className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                Earned "Eco Enthusiast" Badge
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Complete 10 quests
                              </p>
                            </div>
                            <span className="ml-auto text-sm text-muted-foreground">
                              2 weeks ago
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Quests */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                      <div className="p-6 border-b border-border flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Active Quests</h2>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>

                      <div className="divide-y divide-border">
                        <div className="p-4 sm:p-6 flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                            <Zap className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Reduce Water Usage</h4>
                            <p className="text-sm text-muted-foreground">
                              Use 20% less water this week
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-4 hidden sm:block">
                              <span className="text-sm font-medium">
                                50 points
                              </span>
                              <p className="text-xs text-muted-foreground">
                                2 days left
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 sm:p-6 flex items-center">
                          <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mr-4">
                            <Clock className="h-6 w-6 text-secondary" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">Meatless Monday</h4>
                            <p className="text-sm text-muted-foreground">
                              Eat plant-based meals for a day
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-4 hidden sm:block">
                              <span className="text-sm font-medium">
                                30 points
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Today
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === "achievements" && (
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-xl font-semibold">
                        Achievements & Badges
                      </h2>
                      <p className="text-muted-foreground">
                        Badges and awards earned on your eco journey
                      </p>
                    </div>

                    <div className="p-6">
                      <h3 className="font-medium mb-4">Earned Badges</h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <span className="text-sm font-medium">
                            Eco Enthusiast
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Complete 10 quests
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                            <Leaf className="h-8 w-8 text-secondary" />
                          </div>
                          <span className="text-sm font-medium">
                            Green Thumb
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Plant 5 trees
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                            <Zap className="h-8 w-8 text-accent" />
                          </div>
                          <span className="text-sm font-medium">
                            Energy Saver
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Reduce energy by 15%
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center opacity-40">
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                            <Award className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium">
                            Water Warrior
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Locked
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <h3 className="font-medium mb-4">
                          Achievement Progress
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Carbon Master</span>
                              <span className="font-medium">
                                2/3 tons saved
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: "66%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Quest Champion</span>
                              <span className="font-medium">24/50 quests</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-secondary h-2 rounded-full"
                                style={{ width: "48%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Community Leader</span>
                              <span className="font-medium">0/5 referrals</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-accent h-2 rounded-full"
                                style={{ width: "0%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "impact" && (
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h2 className="text-xl font-semibold">Eco Impact</h2>
                      <p className="text-muted-foreground">
                        Track your environmental impact over time
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Carbon Saved
                          </h3>
                          <p className="text-2xl font-bold">1.2 tons</p>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ↓ 15% from last year
                          </span>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Trees Equivalent
                          </h3>
                          <p className="text-2xl font-bold">48 trees</p>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            +12 from last month
                          </span>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Water Saved
                          </h3>
                          <p className="text-2xl font-bold">3,450 gal</p>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ↓ 8% from last year
                          </span>
                        </div>
                      </div>

                      <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center mb-6">
                        <p className="text-muted-foreground">
                          Carbon footprint chart visualization
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-border">
                        <h3 className="font-medium mb-4">Impact Breakdown</h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                              <span className="text-sm">Transportation</span>
                            </div>
                            <p className="text-lg font-medium mt-1">0.5 tons</p>
                          </div>

                          <div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-secondary mr-2"></div>
                              <span className="text-sm">Home Energy</span>
                            </div>
                            <p className="text-lg font-medium mt-1">0.4 tons</p>
                          </div>

                          <div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-accent mr-2"></div>
                              <span className="text-sm">Food</span>
                            </div>
                            <p className="text-lg font-medium mt-1">0.2 tons</p>
                          </div>

                          <div>
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-muted-foreground mr-2"></div>
                              <span className="text-sm">Other</span>
                            </div>
                            <p className="text-lg font-medium mt-1">0.1 tons</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
