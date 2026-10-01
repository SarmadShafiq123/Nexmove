import { useState } from 'react';

export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    resetForm,
    setFormData
  };
};
