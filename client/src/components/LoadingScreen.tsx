import React from "react";

interface LoadingScreenProps {
  serverUrl: string;
}

export default function LoadingScreen({ serverUrl }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-mpesa-green to-mpesa-dark rounded-full flex items-center justify-center shadow-lg">
              <svg 
                className="w-12 h-12 text-white animate-pulse" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Starting up your payment server...
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-mpesa-green to-mpesa-dark h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Initializing application...</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Starting server...</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span>Preparing payment gateway...</span>
          </div>
        </div>

        {/* Server URL Info */}
        {serverUrl && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Server URL:</p>
            <p className="text-sm font-mono text-gray-700 break-all">{serverUrl}</p>
            <p className="text-xs text-gray-500 mt-2 mb-3">
              💡 <strong>Server Warm-up:</strong> If pop-ups are blocked, click below to manually warm up the server
            </p>
            <button
              onClick={() => {
                window.open(serverUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-full bg-mpesa-green hover:bg-mpesa-dark text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 mb-2"
            >
              🔥 Warm Up Server Manually
            </button>
            <p className="text-xs text-gray-500 text-center">
              This helps ensure the server is ready for payments
            </p>
          </div>
        )}

        {/* Loading Dots */}
        <div className="mt-6 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-mpesa-green rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-mpesa-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-mpesa-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
