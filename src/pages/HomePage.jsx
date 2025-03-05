import { Navbar } from "../components/navbar.jsx";
import { Footer } from "../components/footer.jsx";
import { Button } from "../components/ui/button.jsx";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart,
  Recycle,
  Award,
  Shield,
  Globe,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0"></div>
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Your Journey to a{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Sustainable Future
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Track your carbon footprint, learn eco-friendly habits, and
                  earn rewards for making a positive impact on our planet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button variant="gradient" size="lg" className="group">
                      Start Your Eco Journey
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/calculator">
                    <Button variant="outline" size="lg">
                      Calculate Your Footprint
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-primary" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1 text-primary" />
                    <span>100% Carbon Neutral</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl transform scale-95 opacity-30"></div>
                <div className="relative glass-effect rounded-2xl p-2 shadow-xl animate-float">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="EcoQuest Dashboard Preview"
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Features for Your Eco Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to understand your environmental impact and
                take meaningful action.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl p-6 shadow-sm eco-card border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Carbon Footprint Calculator
                </h3>
                <p className="text-muted-foreground mb-4">
                  Track and analyze your carbon emissions with our comprehensive
                  calculator. Get personalized insights and recommendations.
                </p>
                <Link
                  to="/calculator"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Calculate Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm eco-card border border-border">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-6">
                  <Recycle className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recycling Guide</h3>
                <p className="text-muted-foreground mb-4">
                  Instantly check if an item is recyclable in your area. Our
                  smart guide helps you make the right disposal decisions.
                </p>
                <Link
                  to="/recycling"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Check Recyclability <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm eco-card border border-border">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Eco Quests & Rewards
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete fun challenges to earn eco points. Level up your
                  sustainability journey and unlock exclusive rewards.
                </p>
                <Link
                  to="/quests"
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Start Questing <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How EcoQuest Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Your journey to a more sustainable lifestyle in three simple
                steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl transform scale-110"></div>
                  <div className="relative h-20 w-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Track Your Impact
                </h3>
                <p className="text-muted-foreground">
                  Use our carbon calculator to understand your environmental
                  footprint and identify areas for improvement.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl transform scale-110"></div>
                  <div className="relative h-20 w-20 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Complete Eco Quests
                </h3>
                <p className="text-muted-foreground">
                  Take on daily and weekly challenges designed to help you build
                  sustainable habits and reduce your impact.
                </p>
              </div>

              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl transform scale-110"></div>
                  <div className="relative h-20 w-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Collect eco points for your achievements and redeem them for
                  exclusive rewards from our sustainable partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-secondary/5"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-full blur-3xl transform translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Eco Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of eco-conscious individuals making a positive
                impact on our planet. Sign up today and take the first step
                towards a more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="gradient" size="lg" className="group">
                    Create Your Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
