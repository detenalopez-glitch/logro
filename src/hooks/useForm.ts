import { useState, useCallback } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((
    name: keyof T, 
    value: T[keyof T]
  ) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    if (!validationRules) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    (Object.keys(validationRules) as Array<keyof T>).forEach((key) => {
      const validator = validationRules[key];
      if (validator) {
        const errorMessage = validator(values[key]);
        if (errorMessage) {
          newErrors[key] = errorMessage;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    resetForm,
    setValues
  };
}
