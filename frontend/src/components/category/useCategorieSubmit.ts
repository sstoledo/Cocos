import { useState } from "react";
import { Inputs } from "./types";
import Cookies from "js-cookie";

export function useCategorieSubmit() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdCategoryId, setCreatedCategoryId] = useState<string | null>(null);

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true);
    const token = Cookies.get("authToken");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedCategoryId(result.id);
        console.log('Categoría creada con éxito');
      } else {
        console.error('Error al crear la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting, createdCategoryId };
}