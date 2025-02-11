import { useState, useEffect, useRef } from "react";

export function useFormSaveState<T>(
  initialState: T,
  onSave: (data: T) => Promise<void>,
) {
  const [formState, setFormState] = useState<T>(initialState);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Store the previous initialState in a ref to prevent unnecessary resets
  const prevInitialState = useRef<string>(JSON.stringify(initialState));

  useEffect(() => {
    const currentStateStr = JSON.stringify(initialState);

    if (prevInitialState.current !== currentStateStr) {
      prevInitialState.current = currentStateStr;
      setFormState(initialState);
      setHasChanges(false); // Reset change tracking when new data loads
    }
  }, [initialState]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const newState = { ...prev, [name]: value };
      setHasChanges(JSON.stringify(newState) !== prevInitialState.current);
      return newState;
    });
  };

  // Handle save operation
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(formState);
      prevInitialState.current = JSON.stringify(formState); // Update ref after save
      setHasChanges(false); // Reset save state
    } finally {
      setIsSaving(false);
    }
  };

  return { formState, handleChange, handleSave, hasChanges, isSaving };
}
