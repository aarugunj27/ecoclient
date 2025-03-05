import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Recycle,
  Award,
  Settings,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Zap,
  Loader,
  AlertTriangle,
  LineChart,
  ArrowRight,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast"; // Make sure to install react-hot-toast if not already installed

const Api = import.meta.env.VITE_API_URL;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [ecoScores, setEcoScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuests, setActiveQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

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

    // Fetch eco scores
    fetchEcoScores();

    // Mock data for quests
    setActiveQuests([
      {
        id: 1,
        title: "Reduce Water Usage",
        description: "Use 20% less water this week",
        points: 50,
        daysLeft: 2,
        icon: "Zap",
        progress: 60,
      },
      {
        id: 2,
        title: "Zero Waste Challenge",
        description: "Produce no landfill waste for 3 days",
        points: 100,
        daysLeft: 5,
        icon: "Recycle",
        progress: 40,
      },
      {
        id: 3,
        title: "Meatless Monday",
        description: "Eat plant-based meals for a day",
        points: 30,
        daysLeft: 0,
        icon: "Clock",
        progress: 80,
      },
    ]);

    setCompletedQuests([
      {
        id: 4,
        title: "Plastic-Free Week",
        description: "Avoid single-use plastics for an entire week",
        points: 100,
        completedDate: "2023-04-15",
        icon: "CheckCircle",
      },
      {
        id: 5,
        title: "Energy Saver",
        description: "Reduce electricity usage by 15%",
        points: 75,
        completedDate: "2023-04-02",
        icon: "Zap",
      },
    ]);
  }, []);

  const fetchEcoScores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API}/get-eco-scores`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEcoScores(response.data.ecoScores || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Eco Scores:", error);
      setError("Failed to load your eco scores. Please try again later.");
      setLoading(false);
    }
  };

  const deleteEcoScore = async (scoreId) => {
    // Add a check to ensure scoreId is defined
    if (!scoreId) {
      console.error("No score ID provided for deletion");
      toast.error("Unable to delete score: Invalid ID");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete-eco-score/${scoreId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state to remove the deleted score
      setEcoScores((prevScores) =>
        prevScores.filter((score) => score.id !== scoreId)
      );

      // Optional: Show success toast/notification
      toast.success("Eco score deleted successfully");
    } catch (error) {
      console.error("Error deleting eco score:", error);
      // Optional: Show error toast/notification
      toast.error(
        error.response?.data?.message || "Failed to delete eco score"
      );
    }
  };

  // Get the latest eco score
  const getLatestScore = () => {
    if (ecoScores.length === 0) return null;
    return ecoScores[0];
  };

  // Calculate average score
  const calculateAverageScore = () => {
    if (ecoScores.length === 0) return 0;
    const sum = ecoScores.reduce((total, score) => total + score.score, 0);
    return (sum / ecoScores.length).toFixed(1);
  };

  // Calculate score trend (compared to previous)
  const calculateScoreTrend = () => {
    if (ecoScores.length < 2) return 0;
    const latest = ecoScores[0].score;
    const previous = ecoScores[1].score;
    return Math.round(((latest - previous) / previous) * 100);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get icon component by name
  const getIconComponent = (iconName, className = "h-5 w-5") => {
    const icons = {
      Zap: <Zap className={className} />,
      Recycle: <Recycle className={className} />,
      Clock: <Clock className={className} />,
      CheckCircle: <CheckCircle className={className} />,
      XCircle: <XCircle className={className} />,
      BarChart: <BarChart className={className} />,
    };
    return icons[iconName] || <Zap className={className} />;
  };

  // Get the latest score breakdown
  const getLatestScoreBreakdown = () => {
    const latest = getLatestScore();
    if (!latest || !latest.breakdown) return null;

    return latest.breakdown;
  };

  // Calculate category percentages
  const calculateCategoryPercentage = (category) => {
    const breakdown = getLatestScoreBreakdown();
    if (!breakdown) return 0;

    const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
    if (total === 0) return 0;

    return Math.round((breakdown[category] / total) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Dashboard Header */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {user?.name?.split(" ")[0] || "User"}
                </h1>
                <p className="text-muted-foreground">
                  Track your eco progress and complete quests
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link to="/settings">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link to="/quests">
                  <Button variant="gradient" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    New Quest
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                <div className="p-6 flex items-center space-x-4 border-b border-border">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user?.name || "User"}</h3>
                    <p className="text-sm text-muted-foreground">
                      Eco Enthusiast
                    </p>
                  </div>
                </div>

                <nav className="p-2">
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                      activeTab === "overview"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Overview</span>
                  </button>

                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                      activeTab === "calculator"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveTab("calculator")}
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Carbon Calculator</span>
                  </button>

                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                      activeTab === "recycling"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveTab("recycling")}
                  >
                    <Recycle className="h-5 w-5" />
                    <span>Recycling Guide</span>
                  </button>

                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                      activeTab === "quests"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveTab("quests")}
                  >
                    <Award className="h-5 w-5" />
                    <span>Eco Quests</span>
                  </button>

                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                      activeTab === "settings"
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </nav>

                <div className="p-4 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Carbon Footprint
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {getLatestScore()
                              ? `${getLatestScore().score} tons`
                              : "No data"}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BarChart className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        {calculateScoreTrend() < 0 ? (
                          <>
                            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-medium">
                              {Math.abs(calculateScoreTrend())}% lower
                            </span>
                          </>
                        ) : calculateScoreTrend() > 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-500 font-medium">
                              {calculateScoreTrend()}% higher
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            No change
                          </span>
                        )}
                        <span className="text-muted-foreground ml-1">
                          than previous
                        </span>
                      </div>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Eco Points
                          </p>
                          <h3 className="text-2xl font-bold mt-1">1,240</h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Award className="h-5 w-5 text-secondary" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-500 font-medium">
                          230 points
                        </span>
                        <span className="text-muted-foreground ml-1">
                          this month
                        </span>
                      </div>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Quests Completed
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {completedQuests.length}
                          </h3>
                        </div>
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-accent" />
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-muted-foreground">
                          {activeQuests.length} active quests
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Carbon Footprint Chart */}
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-semibold">
                        Carbon Footprint History
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your emissions over time
                      </p>
                    </div>
                    <div className="p-6">
                      {loading ? (
                        <div className="h-64 w-full flex items-center justify-center">
                          <Loader className="h-8 w-8 text-primary animate-spin" />
                        </div>
                      ) : error ? (
                        <div className="h-64 w-full flex flex-col items-center justify-center text-center">
                          <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                          <p className="text-muted-foreground">{error}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={fetchEcoScores}
                          >
                            Try Again
                          </Button>
                        </div>
                      ) : ecoScores.length === 0 ? (
                        <div className="h-64 w-full flex flex-col items-center justify-center text-center">
                          <BarChart className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            No carbon footprint data available yet.
                          </p>
                          <Link to="/calculator">
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                            >
                              Calculate Your Footprint
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center mb-6">
                            <LineChart className="h-10 w-10 text-muted-foreground" />
                            <p className="text-muted-foreground ml-2">
                              Carbon footprint history visualization
                            </p>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                            {getLatestScoreBreakdown() ? (
                              <>
                                <div>
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                                    <span className="text-sm">
                                      Transportation
                                    </span>
                                  </div>
                                  <p className="text-lg font-medium mt-1">
                                    {getLatestScoreBreakdown()
                                      ?.transportation || 0}{" "}
                                    tons
                                  </p>
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-secondary mr-2"></div>
                                    <span className="text-sm">Home Energy</span>
                                  </div>
                                  <p className="text-lg font-medium mt-1">
                                    {getLatestScoreBreakdown()?.home || 0} tons
                                  </p>
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-accent mr-2"></div>
                                    <span className="text-sm">Food</span>
                                  </div>
                                  <p className="text-lg font-medium mt-1">
                                    {getLatestScoreBreakdown()?.food || 0} tons
                                  </p>
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 rounded-full bg-muted-foreground mr-2"></div>
                                    <span className="text-sm">Other</span>
                                  </div>
                                  <p className="text-lg font-medium mt-1">
                                    {(getLatestScoreBreakdown()?.shopping ||
                                      0) +
                                      (getLatestScoreBreakdown()?.travel ||
                                        0)}{" "}
                                    tons
                                  </p>
                                </div>
                              </>
                            ) : (
                              <div className="col-span-4 text-center text-muted-foreground">
                                No breakdown data available
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Active Quests */}
                  <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Active Quests</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete quests to earn eco points
                        </p>
                      </div>
                      <Link to="/quests">
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>
                    <div className="divide-y divide-border">
                      {activeQuests.map((quest) => (
                        <div
                          key={quest.id}
                          className="p-4 sm:p-6 flex items-center"
                        >
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                            {getIconComponent(
                              quest.icon,
                              "h-6 w-6 text-primary"
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{quest.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {quest.description}
                            </p>
                            <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${quest.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-4 hidden sm:block">
                              <span className="text-sm font-medium">
                                {quest.points} points
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {quest.daysLeft > 0
                                  ? `${quest.daysLeft} days left`
                                  : "Today"}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {activeQuests.length === 0 && (
                        <div className="p-8 text-center">
                          <p className="text-muted-foreground mb-4">
                            You don't have any active quests.
                          </p>
                          <Link to="/quests">
                            <Button variant="outline" size="sm">
                              Find New Quests
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Carbon Calculator Tab */}
              {activeTab === "calculator" && (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Carbon Footprint History</h3>
                    <p className="text-sm text-muted-foreground">
                      Your past carbon footprint calculations
                    </p>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      <div className="h-40 w-full flex items-center justify-center">
                        <Loader className="h-8 w-8 text-primary animate-spin" />
                      </div>
                    ) : error ? (
                      <div className="h-40 w-full flex flex-col items-center justify-center text-center">
                        <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                        <p className="text-muted-foreground">{error}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={fetchEcoScores}
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : ecoScores.length === 0 ? (
                      <div className="h-40 w-full flex flex-col items-center justify-center text-center">
                        <BarChart className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          No carbon footprint data available yet.
                        </p>
                        <Link to="/calculator">
                          <Button variant="outline" size="sm" className="mt-4">
                            Calculate Your Footprint
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-muted/30 rounded-lg p-4 text-center">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Latest Score
                            </h4>
                            <p className="text-2xl font-bold">
                              {getLatestScore()?.score || 0} tons
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {getLatestScore()
                                ? formatDate(getLatestScore().created_at)
                                : ""}
                            </span>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 text-center">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Average Score
                            </h4>
                            <p className="text-2xl font-bold">
                              {calculateAverageScore()} tons
                            </p>
                            <span className="text-xs text-muted-foreground">
                              All time
                            </span>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-4 text-center">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                              Calculations
                            </h4>
                            <p className="text-2xl font-bold">
                              {ecoScores.length}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              Total entries
                            </span>
                          </div>
                        </div>

                        <h4 className="font-medium">Your Eco Score History</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-border">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Score (tons CO2e)
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Breakdown
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {ecoScores.map((score, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 0 ? "bg-muted/10" : ""
                                  }
                                >
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    {formatDate(score.created_at)}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    {score.score}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    {score.breakdown ? (
                                      <div className="flex space-x-2">
                                        {score.breakdown.transportation && (
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                            Transport:{" "}
                                            {score.breakdown.transportation}
                                          </span>
                                        )}
                                        {score.breakdown.home && (
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/10 text-secondary">
                                            Home: {score.breakdown.home}
                                          </span>
                                        )}
                                        {score.breakdown.food && (
                                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                                            Food: {score.breakdown.food}
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-muted-foreground">
                                        No breakdown
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="ghost" size="sm">
                                        Details
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              "Are you sure you want to delete this eco score? This action cannot be undone."
                                            )
                                          ) {
                                            deleteEcoScore(score.id);
                                          }
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="flex justify-center mt-6">
                          <Link to="/calculator">
                            <Button variant="gradient">
                              Calculate New Footprint
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recycling Guide Tab */}
              {activeTab === "recycling" && (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Recycling Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to properly recycle different materials and
                      reduce waste
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-4">
                          Common Recyclable Items
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">Paper & Cardboard</p>
                              <p className="text-sm text-muted-foreground">
                                Newspapers, magazines, office paper, cardboard
                                boxes
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Plastic Bottles & Containers
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Water bottles, food containers (check for
                                recycling symbols)
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">Glass</p>
                              <p className="text-sm text-muted-foreground">
                                Bottles and jars (rinse before recycling)
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-medium">Metal</p>
                              <p className="text-sm text-muted-foreground">
                                Aluminum cans, steel cans, clean aluminum foil
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">
                          Non-Recyclable Items
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium">Plastic Bags</p>
                              <p className="text-sm text-muted-foreground">
                                Take to grocery store collection points instead
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium">Food-Soiled Items</p>
                              <p className="text-sm text-muted-foreground">
                                Pizza boxes with grease, paper plates with food
                                residue
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium">Styrofoam</p>
                              <p className="text-sm text-muted-foreground">
                                Most curbside programs don't accept styrofoam
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-2 mt-0.5">
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="font-medium">Electronics</p>
                              <p className="text-sm text-muted-foreground">
                                Requires special e-waste recycling
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="font-medium mb-4">Recycling Tips</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Rinse Containers</h5>
                          <p className="text-sm text-muted-foreground">
                            Always rinse food containers before recycling to
                            prevent contamination.
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Remove Lids</h5>
                          <p className="text-sm text-muted-foreground">
                            Remove and separate plastic lids from glass
                            containers.
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">
                            Flatten Cardboard
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Break down boxes to save space in your recycling
                            bin.
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">
                            Check Local Guidelines
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Recycling rules vary by location. Check your local
                            guidelines.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-8">
                      <Link to="/recycling">
                        <Button variant="gradient">
                          Go to Recycling Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Eco Quests Tab */}
              {activeTab === "quests" && (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Eco Quests</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete challenges to earn eco points and make a positive
                      impact
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <h4 className="font-medium">Active Quests</h4>
                      <div className="space-y-4">
                        {activeQuests.map((quest) => (
                          <div
                            key={quest.id}
                            className="bg-muted/30 p-4 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  {getIconComponent(
                                    quest.icon,
                                    "h-4 w-4 text-primary"
                                  )}
                                </div>
                                <h5 className="font-medium">{quest.title}</h5>
                              </div>
                              <span className="text-sm font-medium">
                                {quest.points} points
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {quest.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="w-full max-w-md mr-4">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{quest.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${quest.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Update
                              </Button>
                            </div>
                          </div>
                        ))}

                        {activeQuests.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                              You don't have any active quests.
                            </p>
                            <Link to="/quests">
                              <Button variant="outline">Find New Quests</Button>
                            </Link>
                          </div>
                        )}
                      </div>

                      <h4 className="font-medium pt-6 border-t border-border">
                        Completed Quests
                      </h4>
                      <div className="space-y-4">
                        {completedQuests.map((quest) => (
                          <div
                            key={quest.id}
                            className="bg-muted/10 p-4 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <h5 className="font-medium">{quest.title}</h5>
                              </div>
                              <span className="text-sm font-medium">
                                {quest.points} points
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              {quest.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Completed on {formatDate(quest.completedDate)}
                            </p>
                          </div>
                        ))}

                        {completedQuests.length === 0 && (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">
                              You haven't completed any quests yet.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-center mt-6">
                        <Link to="/quests">
                          <Button variant="gradient">
                            Explore All Quests
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your account preferences and settings
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <div>
                          <h4 className="font-medium">Account Information</h4>
                          <p className="text-sm text-muted-foreground">
                            Update your personal details
                          </p>
                        </div>
                        <Link to="/settings">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>

                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <div>
                          <h4 className="font-medium">
                            Notification Preferences
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Manage how you receive notifications
                          </p>
                        </div>
                        <Link to="/settings">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>

                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <div>
                          <h4 className="font-medium">Privacy Settings</h4>
                          <p className="text-sm text-muted-foreground">
                            Control your data and privacy options
                          </p>
                        </div>
                        <Link to="/settings">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and data
                          </p>
                        </div>
                        <Link to="/settings">
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </Link>
                      </div>

                      <div className="flex justify-center mt-6">
                        <Link to="/settings">
                          <Button variant="gradient">
                            Go to Settings
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
