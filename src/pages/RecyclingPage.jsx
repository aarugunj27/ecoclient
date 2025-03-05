import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  Camera,
  Info,
  CheckCircle,
  XCircle,
  Loader,
  Trash2,
  Leaf,
  Archive,
  Wine,
  FileText,
  Coffee,
} from "lucide-react";

const Model = import.meta.env.VITE_Model_URL;

export default function RecyclingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [activeTab, setActiveTab] = useState("search");

  // Image upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    // In a real app, this would call an API to get recycling information
    // For now, we'll just set a placeholder result
    setSearchResult({
      recyclable: false,
      instructions:
        "Please use the camera feature for accurate recycling information.",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Reset any previous prediction
      setPrediction(null);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPrediction(null);
    // Reset the file input
    document.getElementById("image-upload").value = "";
  };

  const isRecyclable = (className) => {
    // These materials are generally recyclable
    const recyclableClasses = [
      "cardboard",
      "glass",
      "metal",
      "paper",
      "plastic",
    ];
    return recyclableClasses.includes(className);
  };

  // Add this function to get the appropriate icon for each material type
  const getMaterialIcon = (className, size = "h-6 w-6") => {
    const icons = {
      cardboard: <Archive className={size} />,
      glass: <Wine className={size} />,
      metal: <Archive className={size} />,
      organic: <Leaf className={size} />,
      paper: <FileText className={size} />,
      plastic: <Coffee className={size} />,
      trash: <Trash2 className={size} />,
    };
    return icons[className] || <Info className={size} />;
  };

  // Add this function to get recycling instructions for each material
  const getRecyclingInstructions = (className) => {
    const instructions = {
      cardboard:
        "Flatten cardboard boxes and remove any tape or labels before recycling.",
      glass:
        "Rinse glass containers and separate by color if required by your local recycling program.",
      metal:
        "Rinse metal containers and remove any food residue. Most metal cans are highly recyclable.",
      organic:
        "Compost organic waste or use your local green waste collection service if available.",
      paper:
        "Keep paper dry and clean. Remove any plastic wrapping or non-paper materials.",
      plastic:
        "Check the recycling number on the bottom of plastic items. Not all plastics are recyclable in every area.",
      trash:
        "This item should be disposed of in regular waste. Consider if any parts can be reused or recycled separately.",
    };
    return (
      instructions[className] ||
      "Please check your local recycling guidelines for specific instructions."
    );
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch(`${Model}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data);

      // Show the results section
      document.getElementById("results-section").classList.remove("hidden");

      console.log("Prediction result:", data);
    } catch (error) {
      console.error("Error during image analysis:", error);
      alert("An error occurred while analyzing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Recycling Information</h1>

        <div className="mb-4">
          <Button
            onClick={() => setActiveTab("search")}
            variant={activeTab === "search" ? "default" : "outline"}
            className="mr-2"
          >
            Search
          </Button>
          <Button
            onClick={() => setActiveTab("location")}
            variant={activeTab === "location" ? "default" : "outline"}
            className="mr-2"
          >
            Find Recycling Location
          </Button>
          <Button
            onClick={() => setActiveTab("camera")}
            variant={activeTab === "camera" ? "default" : "outline"}
          >
            Camera Search
          </Button>
        </div>

        {activeTab === "search" && (
          <div className="mb-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Enter item to recycle"
                className="flex-grow rounded-l-md border border-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-r-md">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </form>

            {searchResult && (
              <div className="mt-4 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">
                  {searchQuery}:{" "}
                  {searchResult.recyclable ? "Recyclable" : "Not Recyclable"}
                </h2>
                <p className="mt-2">{searchResult.instructions}</p>
                {searchResult.materials && (
                  <p className="mt-2">
                    <strong>Materials:</strong> {searchResult.materials}
                  </p>
                )}
                {searchResult.alternatives && (
                  <p className="mt-2">
                    <strong>Alternatives:</strong> {searchResult.alternatives}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "location" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Find Recycling Locations
            </h2>
            <p>This feature is under development. Check back soon!</p>
          </div>
        )}

        {activeTab === "camera" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Camera Search</h2>
            <p className="text-muted-foreground mb-6">
              Take a photo or upload an image of an item to check if it's
              recyclable
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    {!imagePreview ? (
                      <div id="upload-placeholder">
                        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Camera className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-lg font-medium mb-2">
                          Upload an image
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Take a photo or select an image from your device
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mx-auto"
                        >
                          Choose Image
                        </Button>
                      </div>
                    ) : (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-64 max-w-full mx-auto rounded-lg"
                      />
                    )}
                  </label>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleClearImage}
                    disabled={!selectedImage || loading}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAnalyzeImage}
                    disabled={!selectedImage || loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">How it works</h3>
                <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                  <li>Take a photo or upload an image of the item</li>
                  <li>
                    Our system will analyze the image to identify the material
                  </li>
                  <li>
                    You'll receive information about whether the item is
                    recyclable
                  </li>
                  <li>
                    We'll provide specific disposal instructions for your area
                  </li>
                </ol>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium flex items-center">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    Tips for better results
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li>• Ensure good lighting when taking photos</li>
                    <li>• Center the item in the frame</li>
                    <li>• Take photos of clean items when possible</li>
                    <li>• Include any recycling symbols or markings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Results section - appears after analysis */}
            <div
              className="mt-8 pt-6 border-t border-border hidden"
              id="results-section"
            >
              <h3 className="text-lg font-medium mb-4">Analysis Results</h3>

              {prediction && (
                <div
                  className={`p-4 rounded-lg ${
                    isRecyclable(prediction.predicted_class)
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  <div className="flex items-start">
                    {isRecyclable(prediction.predicted_class) ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
                    )}
                    <div>
                      <div className="flex items-center">
                        <p
                          className={`font-medium ${
                            isRecyclable(prediction.predicted_class)
                              ? "text-green-800 dark:text-green-300"
                              : "text-red-800 dark:text-red-300"
                          }`}
                        >
                          {isRecyclable(prediction.predicted_class)
                            ? "Recyclable"
                            : "Not Recyclable"}
                        </p>
                        <div className="ml-2 px-2 py-1 rounded-full bg-muted text-xs font-medium">
                          {getMaterialIcon(
                            prediction.predicted_class,
                            "h-3 w-3 mr-1 inline"
                          )}
                          <span className="capitalize">
                            {prediction.predicted_class}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Confidence:{" "}
                        {prediction.predicted_prob !== undefined
                          ? prediction.predicted_prob.toFixed(2)
                          : 0}
                        %
                      </p>
                      <div className="mt-4 p-3 bg-muted/50 rounded-md">
                        <h4 className="font-medium mb-1">
                          Recycling Instructions:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {getRecyclingInstructions(prediction.predicted_class)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
