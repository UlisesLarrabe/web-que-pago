import { useState } from "react";

export const useForm = (defaultValue) => {
  const [form, setForm] = useState(defaultValue ? defaultValue : {});

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return { form, handleInput, setForm };
};
