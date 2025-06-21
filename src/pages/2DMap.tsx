
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MapPopup } from "@/components/MapPopup";

const TelanganaMap2D = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations = [
    { name: "Hyderabad", x: "45%", y: "60%" },
    { name: "Warangal", x: "65%", y: "45%" },
    { name: "Nizamabad", x: "35%", y: "25%" },
    { name: "Karimnagar", x: "55%", y: "35%" },
    { name: "Khammam", x: "75%", y: "65%" },
    { name: "Mahbubnagar", x: "25%", y: "75%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Telangana Agricultural Map
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore agricultural regions across Telangana. Click on the green dots to view weather conditions and farming information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Map container with proper aspect ratio */}
              <div className="relative w-full h-0 pb-[75%] bg-green-100 rounded-lg overflow-hidden">
                {/* Telangana map background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/lovable-uploads/telangana-map.jpg')",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                  }}
                >
                  {/* Location markers */}
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-125 transition-all duration-200 pulse-animation border-2 border-white"
                      style={{
                        left: location.x,
                        top: location.y,
                      }}
                      onClick={() => setSelectedLocation(location.name)}
                      title={`Click to view ${location.name} details`}
                    >
                      <span className="sr-only">{location.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Map Legend</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Agricultural Regions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">Water Bodies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-700">Urban Areas</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click on green dots to view detailed weather and farming information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapPopup
        isOpen={selectedLocation !== null}
        onClose={() => setSelectedLocation(null)}
        location={selectedLocation || ""}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          .pulse-animation {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
        `
      }} />
    </div>
  );
};

export default TelanganaMap2D;
