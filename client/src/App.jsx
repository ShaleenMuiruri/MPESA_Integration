import { useEffect, useState } from "react";
import PaymentForm from "./components/PaymentForm";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [serverUrl, setServerUrl] = useState("");

  useEffect(() => {
    // Get the server URL from environment variable
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiBaseUrl) {
      setServerUrl(apiBaseUrl);
      
      // Try to open server URL in new tab (may be blocked by pop-up blocker)
      try {
        const newTab = window.open(apiBaseUrl, '_blank');
        if (newTab) {
          // Close the tab after 10 seconds if it was successfully opened
          setTimeout(() => {
            if (newTab && !newTab.closed) {
              newTab.close();
            }
          }, 10000);
        }
      } catch (error) {
        // Pop-up blocked or failed to open
      }
    }
    
    // Show loading screen for 10 seconds for better UX
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      // Add a small delay for the fade-out effect
      setTimeout(() => {
        setIsLoading(false);
        setIsTransitioning(false);
      }, 300);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <LoadingScreen serverUrl={serverUrl} />
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-300 opacity-100">
      <PaymentForm />
    </div>
  );
}
