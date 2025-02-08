import { useState, useEffect } from "react";

export function useDelayedAction(action: () => void, delay: number = 3) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        action();
        setTrigger(false); // Reset trigger after action runs
      }, delay * 1000);

      return () => clearTimeout(timer); // Cleanup if re-triggered
    }
  }, [trigger, action, delay]);

  return () => setTrigger(true);
}
