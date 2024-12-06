import { useState } from "react";
import Cookies from "js-cookie";
import { Inputs } from "./types";

export function useProductSubmit() {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<string | null>(null);

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true);
    const token = Cookies.get("authToken");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedProductId(result.id);
        console.log('Producto creado con éxito');
      } else {
        console.error('Error al crear el producto');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting, createdProductId };
}