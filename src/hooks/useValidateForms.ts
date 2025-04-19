import { useState } from "react";

export const useValidateForms = (handleSubmit: any, fieldValue: string) => {
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = fieldValue;

    if (!value) {
      setError(true);
      return;
    }

    setError(false);
    handleSubmit(e);
  };

  return { error, setError, onSubmit };
};
