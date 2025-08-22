import { useEffect, useState } from "react";
import React from "react";
import { axios } from "../config/axios";
import Pusher from "pusher-js";
import Notification from "./Notification";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState("mpesa");
  const [submitting, setSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const pusherKey = (import.meta as any).env?.PUSHER_KEY || "";
    const pusherCluster =
      (import.meta as any).env?.PUSHER_CLUSTER || "mt1";
    if (!pusherKey || !pusherCluster) {
      return;
    }

    // Initialize Pusher
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });

    // Subscribe to MPESA payments channel
    const channel = pusher.subscribe("mpesa-payments");

    // Listen for payment completed
    channel.bind("payment-completed", (data) => {
      if (data.checkoutRequestId === checkoutRequestId) {
        setPaymentStatus("completed");
        setStatusMessage("Payment completed successfully!");
      }
    });

    // Listen for payment failed
    channel.bind("payment-failed", (data) => {
      if (data.checkoutRequestId === checkoutRequestId) {
        setPaymentStatus("failed");
        setStatusMessage(`Payment failed: ${data.description}`);
      }
    });

    // Cleanup on unmount
    return () => {
      pusher.unsubscribe("mpesa-payments");
    };
  }, [checkoutRequestId]);

  const onDonate = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !phone) {
      setPaymentStatus("failed");
      setStatusMessage("Please enter a valid amount and phone number");
      return;
    }

    try {
      setSubmitting(true);
      setPaymentStatus("pending");
      setStatusMessage("Processing payment... Please check your phone.");

      const res = await axios.post("/api/payments/stkpush", {
        amount: amount,
        phoneNumber: phone,
        accountReference: "DONATION",
        transactionDesc: "Donation payment",
      });

      const json = res.data;
      if (!json.success) {
        throw new Error(json.message || "STK Push failed");
      }

      // Store checkout request ID for Pusher event matching
      const checkoutId = json.data.CheckoutRequestID;
      setCheckoutRequestId(checkoutId);
      setStatusMessage("STK Push sent! Check your phone and enter PIN.");
    } catch (err) {
      setPaymentStatus("failed");
      setStatusMessage("Failed to initiate STK Push. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus("idle");
    setStatusMessage("");
    setCheckoutRequestId(null);
    setAmount("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="mt-16 w-full max-w-md">
        <div className="bg-white shadow rounded-2xl p-6">
          <Notification
            paymentStatus={paymentStatus}
            statusMessage={statusMessage}
            handleRetry={handleRetry}
          />
          <div className="flex gap-3 mb-4">
            {["mpesa", "paypal", "card"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                disabled={tab !== "mpesa"}
                className={
                    tab === "mpesa"
                      ? active === tab
                        ? "px-4 py-1 rounded-full text-sm capitalize bg-mpesa-green text-white"
                        : "px-4 py-1 rounded-full text-sm capitalize bg-gray-100 text-gray-700"
                      : "px-4 py-1 rounded-full text-sm capitalize bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  }
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h3 className="font-semibold">Enter Amount & Number</h3>
            </div>
          </div>

          <form className="space-y-4" onSubmit={onDonate}>
            <div>
              <label className="block text-sm font-semibold mb-1">Amount</label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-0"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={submitting || paymentStatus === "pending"}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="KE"
                value={phone}
                onChange={(value) => setPhone(value || "")}
                placeholder="Enter Phone Number"
                disabled={submitting || paymentStatus === "pending"}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || paymentStatus === "pending"}
              className="bg-mpesa-green hover:bg-mpesa-dark disabled:opacity-60 text-white font-semibold rounded-md px-4 py-2 w-full"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : paymentStatus === "pending" ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Payment in Progress...</span>
                </div>
              ) : (
                "Donate"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
