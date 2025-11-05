import { useEffect } from "react";

export default function DebugEvents() {
  useEffect(() => {

    console.log("Initial navigator.onLine =", navigator.onLine);

    const logOnline = () => console.log("🔵 EVENT FIRED: online");
    const logOffline = () => console.log("🔴 EVENT FIRED: offline");

    window.addEventListener("online", logOnline);
    window.addEventListener("offline", logOffline);

    return () => {
      window.removeEventListener("online", logOnline);
      window.removeEventListener("offline", logOffline);
    };
  }, []);

  return <div style={{ padding: 8, background: "#333", color: "#fff" }}>DebugEvents mounted</div>;
}
