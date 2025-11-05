import useOnlineStatus from "./useOnlineStatus";   // ✅ add this line



function TestApp() {
  const { isOnline } = useOnlineStatus();   // ✅ fix here

  return (
    <div style={{ padding: "40px", fontSize: "20px" }}>
      <h1>🔌 Online/Offline Test</h1>
      <p>Status: {isOnline ? "🟢 Online" : "🔴 Offline"}</p>
    </div>
  );
}

export default TestApp;