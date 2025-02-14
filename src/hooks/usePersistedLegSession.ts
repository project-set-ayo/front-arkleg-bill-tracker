import { useState, useEffect } from "react";
import { Session } from "../types/session";

export default function usePersistedLegSession() {
  const [selectedLegSession, setSelectedLegSession] = useState<Session | null>(
    null,
  );

  useEffect(() => {
    // Retrieve session from localStorage if available
    const storedSession = localStorage.getItem("selectedLegSession");
    if (storedSession) {
      setSelectedLegSession(JSON.parse(storedSession));
    }
  }, []);

  const updateLegSession = (session: Session) => {
    setSelectedLegSession(session);
    localStorage.setItem("selectedLegSession", JSON.stringify(session)); // Store in localStorage
  };

  return { selectedLegSession, updateLegSession };
}
