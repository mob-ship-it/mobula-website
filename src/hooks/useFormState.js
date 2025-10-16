import { useState } from "react";

export const useFormState = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: null,
            }));
        }
    };

    const validateField = (field, value, rules) => {
        if (rules.required && !value.trim()) {
            return "Este campo es obligatorio";
        }

        if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Por favor ingrese un email válido";
        }

        if (rules.phone && value && !/^\d{4}-\d{4}$/.test(value)) {
            return "Formato: 8888-8888";
        }

        return null;
    };

    const validateForm = (validationRules) => {
        const newErrors = {};

        Object.keys(validationRules).forEach((field) => {
            const error = validateField(
                field,
                formData[field] || "",
                validationRules[field]
            );
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setFormData(initialState);
        setErrors({});
        setIsSubmitting(false);
    };

    return {
        formData,
        errors,
        isSubmitting,
        setIsSubmitting,
        updateField,
        validateForm,
        resetForm,
    };
};
