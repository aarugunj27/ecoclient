"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Award,
  Clock,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  BarChart,
  TrendingUp,
  User,
  Trophy,
  Recycle,
} from "lucide-react";

export default function QuestsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Eco Quests</h1>
                <p className="text-muted-foreground">
                  Complete challenges, build sustainable habits, and earn
                  rewards
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="gradient">
                  <Zap className="h-4 w-4 mr-2" />
                  Start New Quest
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter:</span>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeFilter === "all"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeFilter === "active"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveFilter("active")}
                    >
                      Active
                    </button>
                    <button
                      className={`px-3 py-1 text-sm rounded-full ${
                        activeFilter === "completed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => setActiveFilter("completed")}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search quests..."
                    className="pl-9 pr-4 py-2 w-full sm:w-auto border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="divide-y divide-border">
                {/* Daily Quest */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Meatless Monday</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Daily Quest</span>
                          <span className="mx-2">•</span>
                          <span>30 points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-500 mr-2">
                        In Progress
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Eat plant-based meals for an entire day. Reducing meat
                    consumption is one of the most effective ways to lower your
                    carbon footprint.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Food
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Beginner
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Today
                    </div>
                  </div>
                </div>

                {/* Weekly Quest */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center mr-4">
                        <Award className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Zero Waste Challenge</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Weekly Quest</span>
                          <span className="mx-2">•</span>
                          <span>100 points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-amber-500 mr-2">
                        5 days left
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Produce no landfill waste for 3 days this week. Compost food
                    scraps, recycle properly, and avoid single-use items.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Waste
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Intermediate
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Weekly
                    </div>
                  </div>
                </div>

                {/* Monthly Quest */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mr-4">
                        <BarChart className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium">Reduce Energy Usage</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Monthly Quest</span>
                          <span className="mx-2">•</span>
                          <span>200 points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-blue-500 mr-2">
                        2/4 completed
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reduce your home energy usage by 20% this month. Track your
                    progress and implement energy-saving practices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Energy
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Advanced
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Monthly
                    </div>
                  </div>
                </div>

                {/* Completed Quest */}
                <div className="p-4 sm:p-6 bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Plastic-Free Week</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Weekly Quest</span>
                          <span className="mx-2">•</span>
                          <span>100 points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400 mr-2">
                        Completed
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Avoid single-use plastics for an entire week. Use reusable
                    alternatives and shop plastic-free.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Waste
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Intermediate
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Weekly
                    </div>
                  </div>
                </div>

                {/* Failed Quest */}
                <div className="p-4 sm:p-6 bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mr-4">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">Public Transit Week</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Weekly Quest</span>
                          <span className="mx-2">•</span>
                          <span>75 points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400 mr-2">
                        Expired
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use public transportation, bike, or walk instead of driving
                    for an entire week.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Transportation
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Intermediate
                    </div>
                    <div className="bg-muted px-2 py-1 rounded text-xs">
                      Weekly
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 24 quests
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Your Progress</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Quests</span>
                      <span className="font-medium">3/5</span>
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
                      <span>Weekly Goal</span>
                      <span className="font-medium">2/3</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{ width: "66%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Goal</span>
                      <span className="font-medium">5/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Leaderboard</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 text-center font-medium">1</div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mx-2">
                      <span className="text-xs font-medium">JD</span>
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium">Jane Doe</span>
                    </div>
                    <div className="text-sm font-medium">2,450 pts</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 text-center font-medium">2</div>
                    <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center mx-2">
                      <span className="text-xs font-medium">MS</span>
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium">Mike Smith</span>
                    </div>
                    <div className="text-sm font-medium">2,120 pts</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 text-center font-medium">3</div>
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center mx-2">
                      <span className="text-xs font-medium">AJ</span>
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium">Alex Johnson</span>
                    </div>
                    <div className="text-sm font-medium">1,985 pts</div>
                  </div>
                  <div className="flex items-center bg-muted/30 p-2 rounded-lg">
                    <div className="w-6 text-center font-medium">8</div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mx-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-sm font-medium">You</span>
                    </div>
                    <div className="text-sm font-medium">1,240 pts</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recommended Quests</h3>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center p-2 rounded-lg hover:bg-muted/30 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <Recycle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Recycling Master</h4>
                      <p className="text-xs text-muted-foreground">
                        Recycle correctly for 7 days
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-muted/30 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center mr-3">
                      <Trophy className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Community Clean-up
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Organize or join a local clean-up
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                  <div className="flex items-center p-2 rounded-lg hover:bg-muted/30 cursor-pointer">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Carbon Footprint Challenge
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Reduce your weekly carbon by 10%
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold">Quest Categories</h2>
                <p className="text-muted-foreground">
                  Explore different types of eco challenges
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Recycle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Waste Reduction</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimize waste and improve recycling habits
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                    <BarChart className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-medium mb-1">Energy Saving</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduce energy consumption at home and work
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-medium mb-1">Sustainable Food</h3>
                  <p className="text-sm text-muted-foreground">
                    Eat more plant-based and locally sourced foods
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">Community Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Engage with your community on environmental issues
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-medium mb-1">Daily Habits</h3>
                  <p className="text-sm text-muted-foreground">
                    Small changes that make a big difference
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-medium mb-1">Advanced Challenges</h3>
                  <p className="text-sm text-muted-foreground">
                    For eco warriors looking to go the extra mile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
