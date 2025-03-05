import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Leaf, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password validation regex

    if (!values.name) {
      tempErrors.name = "Name is required";
    }

    if (!values.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!values.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      tempErrors.password =
        "Password must be at least 8 characters long, contain one uppercase, one lowercase, one number, and one special character";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      axios
        .post("http://localhost:5000/auth/signup", values)
        .then((res) => {
          setLoading(false);
          if (res.data.message === "User created, verification email sent") {
            // Store user email temporarily
            localStorage.setItem(
              "unverifiedUser",
              JSON.stringify({ email: values.email })
            );
            // Show verification prompt
            navigate("/email-confirmation"); // Navigate to a page prompting email verification
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response && err.response.status === 409) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email already exists",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: "An error occurred during signup.",
            }));
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center md:justify-start mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center md:text-left mb-2">
                Create Your Account
              </h1>
              <p className="text-muted-foreground text-center md:text-left mb-6">
                Join the community of eco-conscious individuals
              </p>

              {errors.general && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
                  {errors.general}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={values.name}
                    onChange={handleInput}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={values.email}
                    onChange={handleInput}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={values.password}
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Apple
                  </Button>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground text-center md:text-left">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="hidden md:block relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50"></div>
              <div className="relative h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-6">Join EcoQuest Today</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Track and reduce your carbon footprint</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Get personalized sustainability recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete eco quests and earn rewards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Join a community of eco-conscious individuals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Make a positive impact on our planet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
