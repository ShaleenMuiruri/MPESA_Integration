import React from "react";

interface NotificationProps {
  paymentStatus: 'idle' | 'pending' | 'completed' | 'failed';
  statusMessage: string;
  handleRetry: () => void;
}

const Notification = ({ paymentStatus, statusMessage, handleRetry }: NotificationProps) => {
  if (paymentStatus === "idle") return null;

  const getStatusColor = () => {
    switch (paymentStatus) {
      case "pending":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "completed":
        return "bg-green-50 border-green-200 text-green-800";
      case "failed":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (paymentStatus) {
      case "pending":
        return "⏳";
      case "completed":
        return "✅";
      case "failed":
        return "❌";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={`mb-4 p-3 rounded border ${getStatusColor()}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          <p className="font-small">{statusMessage}</p>
        </div>
        {paymentStatus === "failed" && (
          <button
            onClick={handleRetry}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;