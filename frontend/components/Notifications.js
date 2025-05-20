window.Notifications = function Notifications({ notification }) {
  if (!notification) return null;
  return (
    <div
      className="notification"
      style={{
        background: notification.type === "error" ? "#EF4444" : "#1E3A8A",
        color: "#E5E7EB"
      }}
    >
      {notification.message}
    </div>
  );
};