import React, { useState, useEffect, useRef } from "react";

/**
 * Component that shows a red offline banner at the top
 * and updates --banner-offset CSS variable so navbar shifts down.
 */
const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const bannerRef = useRef(null);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  // update CSS variable when banner appears/disappears
  useEffect(() => {
    if (!isOnline && bannerRef.current) {
      const height = bannerRef.current.offsetHeight || 0;
      document.documentElement.style.setProperty(
        "--banner-offset",
        `${height}px`
      );
    } else {
      document.documentElement.style.setProperty("--banner-offset", "0px");
    }
  }, [isOnline]);

  if (isOnline) return null;

  return (
    <div ref={bannerRef} className="network-banner">
      ⚠️ You are offline. Please check your internet connection.
    </div>
  );
};

export default NetworkStatus;
