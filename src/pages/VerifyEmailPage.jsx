import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const Auth = import.meta.env.VITE_Auth_URL;

export default function VerifyEmailPage() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  const handleVerify = async () => {
    try {
      setStatus("loading");
      const response = await axios.post(
        `${Auth}/verify-email/${verificationToken}`
      );
      if (response.data.message === "Email successfully verified.") {
        setStatus("success");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setStatus("error");
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
                {status === "success" ? (
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                ) : status === "error" ? (
                  <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="16" height="13" x="4" y="5" rx="2" />
                      <path d="m4 8 8 5 8-5" />
                    </svg>
                  </div>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>

              {status === "idle" && (
                <>
                  <p className="text-muted-foreground mb-6">
                    Please click the button below to verify your email address
                    and activate your account.
                  </p>
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={handleVerify}
                  >
                    Verify Email
                  </Button>
                </>
              )}

              {status === "loading" && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-muted-foreground">
                    Verifying your email address...
                  </p>
                  <Loader className="h-8 w-8 text-primary animate-spin" />
                </div>
              )}

              {status === "success" && (
                <div className="space-y-4">
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Your email has been verified successfully!
                  </p>
                  <p className="text-muted-foreground">
                    You will be redirected to the login page in a moment.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="space-y-4">
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    Verification failed
                  </p>
                  <p className="text-muted-foreground mb-4">
                    The verification link may be invalid or expired. Please try
                    again or request a new verification link.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/email-confirmation")}
                  >
                    Request New Link
                  </Button>
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
