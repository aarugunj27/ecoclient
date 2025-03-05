import { Link } from "react-router-dom";
import { Leaf, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                EcoQuest
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Join the journey to a sustainable future. Track your impact, learn
              eco-friendly habits, and earn rewards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/calculator"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/recycling"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Recycling Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/quests"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Eco Quests
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/guides"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Eco Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} EcoQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
