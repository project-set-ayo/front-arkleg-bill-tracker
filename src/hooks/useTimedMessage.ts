import { useState } from "react";

export function useTimedMessage(duration = 3000) {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);

  const showMessage = (
    text: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), duration);
  };

  return { message, showMessage };
}
