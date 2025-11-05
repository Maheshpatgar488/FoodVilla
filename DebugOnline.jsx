import useOnlineStatus from "./useOnlineStatus";

export default function DebugOnline() {
  const { isOnline, isOffline } = useOnlineStatus();

  console.log("🎯 Hook value: isOnline =", isOnline, "isOffline =", isOffline);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        padding: "8px 14px",
        borderRadius: "6px",
        background: isOnline ? "green" : "red",
        color: "white",
        fontWeight: "bold",
        zIndex: 9999,
      }}
    >
      {isOnline ? "🟢 Online" : "🔴 Offline"}
    </div>
  );
}
