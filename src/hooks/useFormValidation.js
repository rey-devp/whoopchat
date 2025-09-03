import { useState } from "react";
import toast from "react-hot-toast";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    return true;
  };

  const validatePassword = (password, minLength = 6) => {
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < minLength) {
      toast.error(`Password must be at least ${minLength} characters`);
      return false;
    }
    return true;
  };

  const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      toast.error(`${fieldName} is required`);
      return false;
    }
    return true;
  };

  const validateForm = (values, validations) => {
    const newErrors = {};
    let isValid = true;

    for (const [field, rules] of Object.entries(validations)) {
      const value = values[field];

      if (rules.required && !validateRequired(value, rules.label || field)) {
        newErrors[field] = "This field is required";
        isValid = false;
        continue;
      }

      if (rules.email && !validateEmail(value)) {
        newErrors[field] = "Invalid email format";
        isValid = false;
        continue;
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
