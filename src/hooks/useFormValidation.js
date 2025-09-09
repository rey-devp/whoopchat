import { useState } from "react";
import toast from "react-hot-toast";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validatePassword = (password, minLength = 6) => {
    if (!password) return "Password is required";
    if (password.length < minLength)
      return `Password must be at least ${minLength} characters`;
    return null;
  };

  const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  };

  const validateForm = (values, validations) => {
    const newErrors = {};
    let isValid = true;

    for (const [field, rules] of Object.entries(validations)) {
      const value = values[field];

      if (rules.required) {
        const err = validateRequired(value, rules.label || field);
        if (err) {
          newErrors[field] = err;
          isValid = false;
          continue;
        }
      }

      if (rules.email) {
        const err = validateEmail(value);
        if (err) {
          newErrors[field] = err;
          isValid = false;
          continue;
        }
      }

      if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `Must be at least ${rules.minLength} characters`;
        isValid = false;
        continue;
      }

      if (rules.match && value !== values[rules.match]) {
        newErrors[field] = `Must match ${rules.label || rules.match}`;
        isValid = false;
        continue;
      }
    }

    setErrors(newErrors);

    // ✅ Biar gak spam, kasih 1 toast general kalau ada error
    if (!isValid) {
      toast.error("Please fix the errors in the form");
    }

    return isValid;
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateRequired,
    validateForm,
  };
};
