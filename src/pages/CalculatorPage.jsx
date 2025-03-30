import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Car,
  Home,
  Utensils,
  ShoppingBag,
  Plane,
  Info,
  ArrowRight,
  BarChart,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CalculatorPage() {
  const [activeSection, setActiveSection] = useState("transportation");
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    // Transportation
    vehicleType: "",
    milesDriven: 0,
    publicTransport: "",

    // Home
    homeType: "",
    householdSize: 1,
    heatingSource: "",

    // Food
    dietType: "",
    localFood: "",
    foodWaste: "",

    // Shopping
    clothesBuying: "",
    secondHand: "",
    consumptionLevel: "",

    // Travel
    shortFlights: 0,
    longFlights: 0,
    offsetEmissions: "",
  });

  const [results, setResults] = useState({
    totalFootprint: 0,
    transportation: 0,
    home: 0,
    food: 0,
    shopping: 0,
    travel: 0,
    comparisonToAverage: 0,
    recommendations: [],
  });

  // Add these state variables at the top of the component
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseFloat(value) || 0 : value,
    }));
  };

  // Calculate carbon footprint
  const calculateFootprint = () => {
    // Transportation calculation
    let transportationFootprint = 0;

    // Vehicle emissions based on type and miles
    if (formData.vehicleType && formData.milesDriven) {
      const emissionFactors = {
        "Small car (up to 1.4L)": 0.15,
        "Medium car (1.4-2.0L)": 0.19,
        "Large car (over 2.0L)": 0.28,
        "Electric vehicle": 0.05,
        "Hybrid vehicle": 0.11,
        Motorcycle: 0.09,
        "I don't use a vehicle": 0,
      };
      transportationFootprint +=
        (formData.milesDriven * 52 * emissionFactors[formData.vehicleType]) /
        1000;
    }

    // Public transport reduction
    const publicTransportFactors = {
      Daily: -0.5,
      "Several times a week": -0.3,
      "Once a week": -0.1,
      "A few times a month": -0.05,
      Rarely: 0,
      Never: 0.1,
    };
    transportationFootprint +=
      publicTransportFactors[formData.publicTransport] || 0;
    transportationFootprint = Math.max(transportationFootprint, 0.1); // Minimum value

    // Home energy calculation
    let homeFootprint = 0;

    const homeTypeFactors = {
      Apartment: 1.0,
      Townhouse: 1.5,
      "Small house": 2.0,
      "Medium house": 2.5,
      "Large house": 3.5,
    };

    const heatingFactors = {
      "Natural gas": 1.2,
      Electricity: 1.0,
      Oil: 1.5,
      Propane: 1.3,
      Wood: 0.8,
      Solar: 0.2,
      "Other renewable energy": 0.3,
    };

    if (formData.homeType && formData.heatingSource) {
      homeFootprint =
        homeTypeFactors[formData.homeType] *
        heatingFactors[formData.heatingSource];

      // Adjust for household size
      if (formData.householdSize > 1) {
        homeFootprint = homeFootprint / Math.sqrt(formData.householdSize);
      }
    }

    // Food calculation
    let foodFootprint = 0;

    const dietFactors = {
      "Heavy meat eater (daily)": 2.5,
      "Medium meat eater (few times a week)": 1.7,
      "Low meat eater (once a week)": 1.2,
      "Pescatarian (fish, no meat)": 1.0,
      "Vegetarian (no meat or fish)": 0.8,
      "Vegan (no animal products)": 0.5,
    };

    const localFoodFactors = {
      "Almost always": 0.7,
      Often: 0.8,
      Sometimes: 1.0,
      Rarely: 1.2,
      Never: 1.3,
    };

    const wasteFactors = {
      "Very little (I'm careful about waste)": 0.8,
      "Some (average amount)": 1.0,
      "Quite a bit (more than I'd like)": 1.3,
      "A lot (I often throw food away)": 1.6,
    };

    if (formData.dietType && formData.localFood && formData.foodWaste) {
      foodFootprint =
        dietFactors[formData.dietType] *
        localFoodFactors[formData.localFood] *
        wasteFactors[formData.foodWaste];
    }

    // Shopping calculation
    let shoppingFootprint = 0;

    const clothesFactors = {
      Weekly: 1.5,
      Monthly: 1.0,
      "Every few months": 0.7,
      "Twice a year": 0.4,
      "Once a year or less": 0.2,
    };

    const secondHandFactors = {
      "Almost always": 0.3,
      Often: 0.5,
      Sometimes: 0.8,
      Rarely: 1.0,
      Never: 1.2,
    };

    const consumptionFactors = {
      "Minimalist (I buy very little)": 0.3,
      "Conscious consumer (I think before buying)": 0.7,
      "Average consumer": 1.0,
      "Frequent shopper (I buy more than average)": 1.5,
      "Heavy consumer (I buy a lot of products)": 2.0,
    };

    if (
      formData.clothesBuying &&
      formData.secondHand &&
      formData.consumptionLevel
    ) {
      shoppingFootprint =
        clothesFactors[formData.clothesBuying] *
        secondHandFactors[formData.secondHand] *
        consumptionFactors[formData.consumptionLevel] *
        0.3;
    }

    // Travel calculation
    let travelFootprint = 0;

    // Short flights (under 4 hours): ~0.2 tons CO2 per flight
    travelFootprint += (formData.shortFlights || 0) * 0.2;

    // Long flights (over 4 hours): ~0.5 tons CO2 per flight
    travelFootprint += (formData.longFlights || 0) * 0.5;

    // Offset emissions
    if (formData.offsetEmissions === "Yes, always") {
      travelFootprint *= 0.7; // 30% reduction for offsetting
    } else if (formData.offsetEmissions === "Yes, sometimes") {
      travelFootprint *= 0.85; // 15% reduction for sometimes offsetting
    }

    // Calculate total footprint
    const totalFootprint =
      transportationFootprint +
      homeFootprint +
      foodFootprint +
      shoppingFootprint +
      travelFootprint;

    // Round to 1 decimal place
    const roundedTotal = Math.round(totalFootprint * 10) / 10;
    const roundedTransportation = Math.round(transportationFootprint * 10) / 10;
    const roundedHome = Math.round(homeFootprint * 10) / 10;
    const roundedFood = Math.round(foodFootprint * 10) / 10;
    const roundedShopping = Math.round(shoppingFootprint * 10) / 10;
    const roundedTravel = Math.round(travelFootprint * 10) / 10;

    // Compare to average (4.8 tons)
    const comparisonToAverage = Math.round(((roundedTotal - 4.8) / 4.8) * 100);

    // Generate recommendations
    const recommendations = [];

    if (transportationFootprint > 1.5) {
      recommendations.push({
        title: "Reduce car usage",
        description:
          "Try carpooling, public transit, or biking for shorter trips.",
      });
    }

    if (homeFootprint > 1.5) {
      recommendations.push({
        title: "Switch to renewable energy",
        description:
          "Consider solar panels or switch to a green energy provider.",
      });
    }

    if (foodFootprint > 1.0) {
      recommendations.push({
        title: "Reduce meat consumption",
        description: "Try having 1-2 plant-based days per week to start.",
      });
    }

    if (homeFootprint > 1.0) {
      recommendations.push({
        title: "Improve home insulation",
        description: "Better insulation can reduce heating and cooling needs.",
      });
    }

    // Set results
    setResults({
      totalFootprint: roundedTotal,
      transportation: roundedTransportation,
      home: roundedHome,
      food: roundedFood,
      shopping: roundedShopping,
      travel: roundedTravel,
      comparisonToAverage: comparisonToAverage,
      recommendations: recommendations,
    });

    // Show results
    setShowResults(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateFootprint();
  };

  // Calculate percentages for the breakdown chart
  const calculatePercentage = (value) => {
    if (results.totalFootprint === 0) return 0;
    return Math.round((value / results.totalFootprint) * 100);
  };

  const saveFootprintScore = async () => {
    try {
      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to save your score");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API}/save-eco-score`,
        {
          score: results.totalFootprint,
          breakdown: {
            transportation: results.transportation,
            home: results.home,
            food: results.food,
            shopping: results.shopping,
            travel: results.travel,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setNotification({
          type: "success",
          message: "Your carbon footprint has been saved successfully!",
        });

        // Clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        setNotification({
          type: "error",
          message: "Error saving your carbon footprint. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error saving score:", err);
      setNotification({
        type: "error",
        message: "Error saving your carbon footprint. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Carbon Footprint Calculator
              </h1>
              <p className="text-muted-foreground">
                Measure your impact on the planet and discover ways to reduce
                your carbon footprint
              </p>
            </div>

            {!showResults ? (
              <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Sidebar Navigation */}
                  <div className="md:col-span-1 bg-muted/30 p-4 md:p-6 border-b md:border-b-0 md:border-r border-border">
                    <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-1">
                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          activeSection === "transportation"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection("transportation")}
                      >
                        <Car className="h-5 w-5" />
                        <span>Transportation</span>
                      </button>

                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          activeSection === "home"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection("home")}
                      >
                        <Home className="h-5 w-5" />
                        <span>Home Energy</span>
                      </button>

                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          activeSection === "food"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection("food")}
                      >
                        <Utensils className="h-5 w-5" />
                        <span>Food</span>
                      </button>

                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          activeSection === "shopping"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection("shopping")}
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span>Shopping</span>
                      </button>

                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                          activeSection === "travel"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={() => setActiveSection("travel")}
                      >
                        <Plane className="h-5 w-5" />
                        <span>Travel</span>
                      </button>
                    </nav>
                  </div>

                  {/* Form Content */}
                  <div className="md:col-span-4 p-6">
                    <form onSubmit={handleSubmit}>
                      {activeSection === "transportation" && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">
                            Transportation
                          </h2>
                          <p className="text-sm text-muted-foreground mb-6">
                            Tell us about your daily commute and vehicle usage
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                What type of vehicle do you primarily use?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleInputChange}
                              >
                                <option value="">Select vehicle type</option>
                                <option value="Small car (up to 1.4L)">
                                  Small car (up to 1.4L)
                                </option>
                                <option value="Medium car (1.4-2.0L)">
                                  Medium car (1.4-2.0L)
                                </option>
                                <option value="Large car (over 2.0L)">
                                  Large car (over 2.0L)
                                </option>
                                <option value="Electric vehicle">
                                  Electric vehicle
                                </option>
                                <option value="Hybrid vehicle">
                                  Hybrid vehicle
                                </option>
                                <option value="Motorcycle">Motorcycle</option>
                                <option value="I don't use a vehicle">
                                  I don't use a vehicle
                                </option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How many miles do you drive per week?
                              </label>
                              <input
                                type="number"
                                placeholder="Enter miles"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="milesDriven"
                                value={formData.milesDriven}
                                onChange={handleInputChange}
                                min="0"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How often do you use public transportation?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="publicTransport"
                                value={formData.publicTransport}
                                onChange={handleInputChange}
                              >
                                <option value="">Select frequency</option>
                                <option value="Daily">Daily</option>
                                <option value="Several times a week">
                                  Several times a week
                                </option>
                                <option value="Once a week">Once a week</option>
                                <option value="A few times a month">
                                  A few times a month
                                </option>
                                <option value="Rarely">Rarely</option>
                                <option value="Never">Never</option>
                              </select>
                            </div>

                            <div className="flex items-start p-4 bg-muted/30 rounded-lg">
                              <Info className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                Transportation typically accounts for about 29%
                                of an individual's carbon footprint. Using
                                public transit, carpooling, or switching to an
                                electric vehicle can significantly reduce your
                                emissions.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <Button type="button" variant="outline" disabled>
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setActiveSection("home")}
                              className="group"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeSection === "home" && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">Home Energy</h2>
                          <p className="text-sm text-muted-foreground mb-6">
                            Tell us about your home energy usage
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                What type of home do you live in?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="homeType"
                                value={formData.homeType}
                                onChange={handleInputChange}
                              >
                                <option value="">Select home type</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Small house">Small house</option>
                                <option value="Medium house">
                                  Medium house
                                </option>
                                <option value="Large house">Large house</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How many people live in your household?
                              </label>
                              <input
                                type="number"
                                placeholder="Enter number"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="householdSize"
                                value={formData.householdSize}
                                onChange={handleInputChange}
                                min="1"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                What is your primary heating source?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="heatingSource"
                                value={formData.heatingSource}
                                onChange={handleInputChange}
                              >
                                <option value="">Select heating source</option>
                                <option value="Natural gas">Natural gas</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Oil">Oil</option>
                                <option value="Propane">Propane</option>
                                <option value="Wood">Wood</option>
                                <option value="Solar">Solar</option>
                                <option value="Other renewable energy">
                                  Other renewable energy
                                </option>
                              </select>
                            </div>

                            <div className="flex items-start p-4 bg-muted/30 rounded-lg">
                              <Info className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                Home energy use accounts for about 22% of an
                                individual's carbon footprint. Using
                                energy-efficient appliances, improving
                                insulation, and switching to renewable energy
                                can help reduce your impact.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setActiveSection("transportation")}
                            >
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setActiveSection("food")}
                              className="group"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeSection === "food" && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">Food</h2>
                          <p className="text-sm text-muted-foreground mb-6">
                            Tell us about your diet and food consumption habits
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Which best describes your diet?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="dietType"
                                value={formData.dietType}
                                onChange={handleInputChange}
                              >
                                <option value="">Select diet type</option>
                                <option value="Heavy meat eater (daily)">
                                  Heavy meat eater (daily)
                                </option>
                                <option value="Medium meat eater (few times a week)">
                                  Medium meat eater (few times a week)
                                </option>
                                <option value="Low meat eater (once a week)">
                                  Low meat eater (once a week)
                                </option>
                                <option value="Pescatarian (fish, no meat)">
                                  Pescatarian (fish, no meat)
                                </option>
                                <option value="Vegetarian (no meat or fish)">
                                  Vegetarian (no meat or fish)
                                </option>
                                <option value="Vegan (no animal products)">
                                  Vegan (no animal products)
                                </option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How often do you eat locally produced food?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="localFood"
                                value={formData.localFood}
                                onChange={handleInputChange}
                              >
                                <option value="">Select frequency</option>
                                <option value="Almost always">
                                  Almost always
                                </option>
                                <option value="Often">Often</option>
                                <option value="Sometimes">Sometimes</option>
                                <option value="Rarely">Rarely</option>
                                <option value="Never">Never</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How much food do you throw away?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="foodWaste"
                                value={formData.foodWaste}
                                onChange={handleInputChange}
                              >
                                <option value="">Select amount</option>
                                <option value="Very little (I'm careful about waste)">
                                  Very little (I'm careful about waste)
                                </option>
                                <option value="Some (average amount)">
                                  Some (average amount)
                                </option>
                                <option value="Quite a bit (more than I'd like)">
                                  Quite a bit (more than I'd like)
                                </option>
                                <option value="A lot (I often throw food away)">
                                  A lot (I often throw food away)
                                </option>
                              </select>
                            </div>

                            <div className="flex items-start p-4 bg-muted/30 rounded-lg">
                              <Info className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                Food accounts for about 13% of an individual's
                                carbon footprint. Reducing meat consumption,
                                eating locally produced food, and minimizing
                                food waste can significantly lower your carbon
                                footprint.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setActiveSection("home")}
                            >
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setActiveSection("shopping")}
                              className="group"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeSection === "shopping" && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">Shopping</h2>
                          <p className="text-sm text-muted-foreground mb-6">
                            Tell us about your consumption and shopping habits
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How often do you buy new clothes?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="clothesBuying"
                                value={formData.clothesBuying}
                                onChange={handleInputChange}
                              >
                                <option value="">Select frequency</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Every few months">
                                  Every few months
                                </option>
                                <option value="Twice a year">
                                  Twice a year
                                </option>
                                <option value="Once a year or less">
                                  Once a year or less
                                </option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How often do you buy second-hand items?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="secondHand"
                                value={formData.secondHand}
                                onChange={handleInputChange}
                              >
                                <option value="">Select frequency</option>
                                <option value="Almost always">
                                  Almost always
                                </option>
                                <option value="Often">Often</option>
                                <option value="Sometimes">Sometimes</option>
                                <option value="Rarely">Rarely</option>
                                <option value="Never">Never</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How would you describe your overall consumption
                                habits?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="consumptionLevel"
                                value={formData.consumptionLevel}
                                onChange={handleInputChange}
                              >
                                <option value="">
                                  Select consumption level
                                </option>
                                <option value="Minimalist (I buy very little)">
                                  Minimalist (I buy very little)
                                </option>
                                <option value="Conscious consumer (I think before buying)">
                                  Conscious consumer (I think before buying)
                                </option>
                                <option value="Average consumer">
                                  Average consumer
                                </option>
                                <option value="Frequent shopper (I buy more than average)">
                                  Frequent shopper (I buy more than average)
                                </option>
                                <option value="Heavy consumer (I buy a lot of products)">
                                  Heavy consumer (I buy a lot of products)
                                </option>
                              </select>
                            </div>

                            <div className="flex items-start p-4 bg-muted/30 rounded-lg">
                              <Info className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                Consumer goods account for about 26% of an
                                individual's carbon footprint. Buying less,
                                choosing second-hand items, and selecting
                                products with lower environmental impacts can
                                help reduce your carbon footprint.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setActiveSection("food")}
                            >
                              Previous
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setActiveSection("travel")}
                              className="group"
                            >
                              Next
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {activeSection === "travel" && (
                        <div className="space-y-6">
                          <h2 className="text-xl font-semibold">Travel</h2>
                          <p className="text-sm text-muted-foreground mb-6">
                            Tell us about your travel habits
                          </p>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How many short flights (under 4 hours) do you
                                take per year?
                              </label>
                              <input
                                type="number"
                                placeholder="Enter number"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="shortFlights"
                                value={formData.shortFlights}
                                onChange={handleInputChange}
                                min="0"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                How many long flights (over 4 hours) do you take
                                per year?
                              </label>
                              <input
                                type="number"
                                placeholder="Enter number"
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="longFlights"
                                value={formData.longFlights}
                                onChange={handleInputChange}
                                min="0"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Do you offset your flight emissions?
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="offsetEmissions"
                                value={formData.offsetEmissions}
                                onChange={handleInputChange}
                              >
                                <option value="">Select option</option>
                                <option value="Yes, always">Yes, always</option>
                                <option value="Yes, sometimes">
                                  Yes, sometimes
                                </option>
                                <option value="No, never">No, never</option>
                                <option value="I don't know what this means">
                                  I don't know what this means
                                </option>
                              </select>
                            </div>

                            <div className="flex items-start p-4 bg-muted/30 rounded-lg">
                              <Info className="h-5 w-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">
                                Air travel can significantly impact your carbon
                                footprint. A single long-haul flight can
                                generate more CO2 than some people produce in an
                                entire year. Consider offsetting your flights or
                                choosing alternative transportation when
                                possible.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setActiveSection("shopping")}
                            >
                              Previous
                            </Button>
                            <Button
                              type="submit"
                              variant="gradient"
                              className="group"
                            >
                              Calculate Footprint
                              <BarChart className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">
                      Your Carbon Footprint Results
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Based on your responses, here's your estimated carbon
                      footprint
                    </p>
                  </div>

                  <div className="p-6">
                    {notification && (
                      <div
                        className={`mb-6 p-4 rounded-lg flex items-center ${
                          notification.type === "success"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                        }`}
                      >
                        <div className="flex items-center">
                          {notification.type === "success" ? (
                            <CheckCircle className="h-5 w-5 mr-2" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 mr-2" />
                          )}
                          <span>{notification.message}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col items-center justify-center mb-8">
                      <div className="relative mb-4">
                        <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="text-center">
                            <span className="block text-4xl font-bold">
                              {results.totalFootprint}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              tons CO2e/year
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
                            results.comparisonToAverage <= 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          } px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {results.comparisonToAverage <= 0
                            ? `${Math.abs(
                                results.comparisonToAverage
                              )}% below average`
                            : `${results.comparisonToAverage}% above average`}
                        </div>
                      </div>

                      <p className="text-center max-w-md text-sm text-muted-foreground">
                        The average carbon footprint in your country is 4.8 tons
                        CO2e per year. For a sustainable future, the target is
                        2.0 tons per person.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Breakdown by Category
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Transportation</span>
                              <span className="font-medium">
                                {results.transportation} tons
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{
                                  width: `${calculatePercentage(
                                    results.transportation
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Home Energy</span>
                              <span className="font-medium">
                                {results.home} tons
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-secondary h-2.5 rounded-full"
                                style={{
                                  width: `${calculatePercentage(
                                    results.home
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Food</span>
                              <span className="font-medium">
                                {results.food} tons
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-accent h-2.5 rounded-full"
                                style={{
                                  width: `${calculatePercentage(
                                    results.food
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Shopping</span>
                              <span className="font-medium">
                                {results.shopping} tons
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-muted-foreground h-2.5 rounded-full"
                                style={{
                                  width: `${calculatePercentage(
                                    results.shopping
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Travel</span>
                              <span className="font-medium">
                                {results.travel} tons
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-muted-foreground h-2.5 rounded-full"
                                style={{
                                  width: `${calculatePercentage(
                                    results.travel
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          Top Recommendations
                        </h3>
                        <ul className="space-y-3">
                          {results.recommendations.length > 0 ? (
                            results.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                                  <span className="text-xs font-medium">
                                    {index + 1}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium">{rec.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {rec.description}
                                  </p>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-medium">Great job!</p>
                                <p className="text-sm text-muted-foreground">
                                  Your carbon footprint is already below
                                  average. Keep up the good work!
                                </p>
                              </div>
                            </li>
                          )}

                          {results.recommendations.length < 4 && (
                            <li className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                                <span className="text-xs font-medium">
                                  {results.recommendations.length + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  Track your progress
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Regularly monitor your carbon footprint to see
                                  improvements over time.
                                </p>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowResults(false)}
                  >
                    Retake Calculator
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={saveFootprintScore}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Results to Dashboard"}
                  </Button>
                  <Button variant="secondary">Share Results</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
