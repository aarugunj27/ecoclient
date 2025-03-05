"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  Trash2,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    appNotifications: true,
    marketingEmails: false,
    publicProfile: true,
    darkMode: false,
    language: "english",
  });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteFormValues, setDeleteFormValues] = useState({
    email: "",
    password: "",
  });
  const [deleteFormErrors, setDeleteFormErrors] = useState({});

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Pre-fill form with user data
      setFormData((prevData) => ({
        ...prevData,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        bio: parsedUser.bio || "",
        location: parsedUser.location || "",
        darkMode: localStorage.theme === "dark",
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Update user in localStorage (in a real app, you'd update the backend)
      const updatedUser = {
        ...user,
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setNotification({
        type: "success",
        message: "Account settings updated successfully!",
      });

      setLoading(false);

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({
        type: "error",
        message: "New passwords don't match!",
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      setNotification({
        type: "error",
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Password updated successfully!",
      });

      // Clear password fields
      setFormData((prevData) => ({
        ...prevData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setLoading(false);

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Notification preferences updated successfully!",
      });

      setLoading(false);

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  const handleSavePrivacy = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: "success",
        message: "Privacy settings updated successfully!",
      });

      setLoading(false);

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !formData.darkMode;

    // Update localStorage and document class
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }

    // Update state
    setFormData((prevData) => ({
      ...prevData,
      darkMode: newDarkMode,
    }));

    setNotification({
      type: "success",
      message: `${newDarkMode ? "Dark" : "Light"} mode activated!`,
    });

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Show delete account form in a modal or section
      setActiveTab("deleteAccount");
    }
  };

  const handleDeleteInput = (event) => {
    setDeleteFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const validateDeleteForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!deleteFormValues.email) {
      tempErrors.email = "Email is required";
    } else if (!emailPattern.test(deleteFormValues.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!deleteFormValues.password) {
      tempErrors.password = "Password is required";
    }

    setDeleteFormErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    if (validateDeleteForm()) {
      setLoading(true);
      axios
        .post("http://localhost:5000/auth/delete-account", deleteFormValues)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
            window.location.href = "/";
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            if (err.response.status === 401) {
              const errorMessage = err.response.data.message;
              setDeleteFormErrors((prevErrors) => ({
                ...prevErrors,
                [errorMessage.includes("Email") ? "email" : "password"]:
                  errorMessage,
              }));
            } else {
              setDeleteFormErrors((prevErrors) => ({
                ...prevErrors,
                general: "An error occurred while deleting your account.",
              }));
            }
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            {notification && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
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
                <button
                  onClick={() => setNotification(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                  <nav className="p-2">
                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "account"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("account")}
                    >
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "security"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("security")}
                    >
                      <Lock className="h-5 w-5" />
                      <span>Security</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "notifications"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "privacy"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("privacy")}
                    >
                      <Globe className="h-5 w-5" />
                      <span>Privacy</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm ${
                        activeTab === "appearance"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setActiveTab("appearance")}
                    >
                      {formData.darkMode ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Sun className="h-5 w-5" />
                      )}
                      <span>Appearance</span>
                    </button>

                    <button
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`}
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Delete Account</span>
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-3">
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                  {/* Account Settings */}
                  {activeTab === "account" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Account Settings
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Update your account information and profile details
                      </p>

                      <form onSubmit={handleSaveAccount}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <label
                                htmlFor="name"
                                className="text-sm font-medium"
                              >
                                Full Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor="email"
                                className="text-sm font-medium"
                              >
                                Email Address
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled
                                className="w-full px-3 py-2 border border-input rounded-md bg-muted/50 cursor-not-allowed"
                              />
                              <p className="text-xs text-muted-foreground">
                                Email cannot be changed. Contact support for
                                assistance.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="bio"
                              className="text-sm font-medium"
                            >
                              Bio
                            </label>
                            <textarea
                              id="bio"
                              name="bio"
                              value={formData.bio}
                              onChange={handleInputChange}
                              rows="4"
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="Tell us about yourself..."
                            ></textarea>
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="location"
                              className="text-sm font-medium"
                            >
                              Location
                            </label>
                            <input
                              id="location"
                              name="location"
                              type="text"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="City, Country"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeTab === "security" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Security Settings
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Update your password and security preferences
                      </p>

                      <form onSubmit={handleSavePassword}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="currentPassword"
                              className="text-sm font-medium"
                            >
                              Current Password
                            </label>
                            <input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={formData.currentPassword}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="newPassword"
                              className="text-sm font-medium"
                            >
                              New Password
                            </label>
                            <input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="confirmPassword"
                              className="text-sm font-medium"
                            >
                              Confirm New Password
                            </label>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                          </Button>
                        </div>
                      </form>

                      <div className="mt-8 pt-6 border-t border-border">
                        <h3 className="text-lg font-medium mb-4">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Add an extra layer of security to your account by
                          enabling two-factor authentication.
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                    </div>
                  )}

                  {/* Notification Settings */}
                  {activeTab === "notifications" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Notification Settings
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Manage how and when you receive notifications
                      </p>

                      <form onSubmit={handleSaveNotifications}>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                              Email Notifications
                            </h3>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Quest Updates</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about new quests and updates
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="emailNotifications"
                                  checked={formData.emailNotifications}
                                  onChange={handleInputChange}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Marketing Emails</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about new features and
                                  promotions
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="marketingEmails"
                                  checked={formData.marketingEmails}
                                  onChange={handleInputChange}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>

                          <div className="space-y-4 pt-6 border-t border-border">
                            <h3 className="text-lg font-medium">
                              App Notifications
                            </h3>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  Push Notifications
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Receive push notifications on your device
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="appNotifications"
                                  checked={formData.appNotifications}
                                  onChange={handleInputChange}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Preferences"}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeTab === "privacy" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Privacy Settings
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Control your privacy and data sharing preferences
                      </p>

                      <form onSubmit={handleSavePrivacy}>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                              Profile Visibility
                            </h3>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Public Profile</p>
                                <p className="text-sm text-muted-foreground">
                                  Allow other users to see your profile and
                                  achievements
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="publicProfile"
                                  checked={formData.publicProfile}
                                  onChange={handleInputChange}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>

                          <div className="space-y-4 pt-6 border-t border-border">
                            <h3 className="text-lg font-medium">Data Usage</h3>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Analytics</p>
                                <p className="text-sm text-muted-foreground">
                                  Allow us to collect anonymous usage data to
                                  improve the app
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={true}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Preferences"}
                          </Button>
                        </div>
                      </form>

                      <div className="mt-8 pt-6 border-t border-border">
                        <h3 className="text-lg font-medium mb-4">
                          Data Export
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Download a copy of your personal data
                        </p>
                        <Button variant="outline">Request Data Export</Button>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === "appearance" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Appearance Settings
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Customize how EcoQuest looks for you
                      </p>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Theme</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                              className={`p-4 rounded-lg border cursor-pointer ${
                                !formData.darkMode
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() =>
                                formData.darkMode && handleToggleDarkMode()
                              }
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                                  <span className="font-medium">
                                    Light Mode
                                  </span>
                                </div>
                                {!formData.darkMode && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div className="h-24 bg-white rounded border border-gray-200 shadow-sm"></div>
                            </div>

                            <div
                              className={`p-4 rounded-lg border cursor-pointer ${
                                formData.darkMode
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() =>
                                !formData.darkMode && handleToggleDarkMode()
                              }
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <Moon className="h-5 w-5 mr-2 text-indigo-400" />
                                  <span className="font-medium">Dark Mode</span>
                                </div>
                                {formData.darkMode && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div className="h-24 bg-gray-900 rounded border border-gray-700 shadow-sm"></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-border">
                          <h3 className="text-lg font-medium">Language</h3>

                          <div className="space-y-2">
                            <label
                              htmlFor="language"
                              className="text-sm font-medium"
                            >
                              Select Language
                            </label>
                            <select
                              id="language"
                              name="language"
                              value={formData.language}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                              <option value="english">English</option>
                              <option value="spanish">Spanish</option>
                              <option value="french">French</option>
                              <option value="german">German</option>
                              <option value="chinese">Chinese</option>
                              <option value="japanese">Japanese</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Delete Account Form */}
                  {activeTab === "deleteAccount" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Delete Account
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Please confirm your credentials to delete your account.
                        This action cannot be undone.
                      </p>

                      <form
                        onSubmit={handleDeleteSubmit}
                        className="space-y-4 max-w-md"
                      >
                        {deleteFormErrors.general && (
                          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-md">
                            {deleteFormErrors.general}
                          </div>
                        )}

                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={deleteFormValues.email}
                            onChange={handleDeleteInput}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm your email"
                          />
                          {deleteFormErrors.email && (
                            <p className="text-sm text-red-500 mt-1">
                              {deleteFormErrors.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium"
                          >
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={deleteFormValues.password}
                            onChange={handleDeleteInput}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Confirm your password"
                          />
                          {deleteFormErrors.password && (
                            <p className="text-sm text-red-500 mt-1">
                              {deleteFormErrors.password}
                            </p>
                          )}
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            variant="destructive"
                            disabled={loading}
                          >
                            {loading
                              ? "Deleting..."
                              : "Permanently Delete Account"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="ml-2"
                            onClick={() => setActiveTab("account")}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
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
