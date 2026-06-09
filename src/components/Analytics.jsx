import { useEffect } from "react";
import { initAnalytics } from "../services/analytics";

export default function Analytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
