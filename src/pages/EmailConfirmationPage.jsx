import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Mail, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";

const Auth = import.meta.env.VITE_Auth_URL;

export default function EmailConfirmationPage() {
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);
  const navigate = useNavigate();

  // Get the unverified user email from localStorage
  const unverifiedUser = JSON.parse(
    localStorage.getItem("unverifiedUser") || "{}"
  );
  const email = unverifiedUser.email;

  const handleResendEmail = async () => {
    if (!email) {
      setResendStatus("error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${Auth}/resend-verification`, {
        email,
      });
      if (response.data.message === "Verification email sent") {
        setResendStatus("success");
      }
    } catch (error) {
      setResendStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
              <p className="text-muted-foreground mb-6">
                We've sent a verification link to{" "}
                <span className="font-medium">
                  {email || "your email address"}
                </span>
                . Please check your inbox and click the link to verify your
                account.
              </p>

              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                  Next Steps
                </h3>
                <ol className="text-sm text-muted-foreground text-left space-y-2">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>
                      Check your email inbox for a message from EcoQuest
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <span>Click the verification link in the email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <span>Once verified, you can log in to your account</span>
                  </li>
                </ol>
              </div>

              {resendStatus === "success" && (
                <div className="mb-6 p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-md text-sm">
                  Verification email has been resent successfully!
                </div>
              )}

              {resendStatus === "error" && (
                <div className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md text-sm">
                  Failed to resend verification email. Please try again.
                </div>
              )}

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>

                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    Go to Login
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
