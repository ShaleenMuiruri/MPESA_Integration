import { useEffect } from "react";
import PaymentForm from "./components/PaymentForm";
import { getAuthToken } from "./hooks/getAuthToken";

export default function App() {
  useEffect(() => {
    getAuthToken();
  }, []);

  return <PaymentForm />;
}
