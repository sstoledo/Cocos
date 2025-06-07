import { getCategoryById } from "@apis/categories";
import { CategoryByIdResponse } from "@interfaces/categories";
import { useState, useEffect } from "react";

export const useCategoryModal = (categoryId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<CategoryByIdResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setCategory(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategory = async () => {
      if (!token || !categoryId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getCategoryById(token, categoryId);
        if (isMounted) setCategory(data);
      } catch (error) {
        console.error('Error fetching presentacion:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategory();

    return () => {
      isMounted = false;
    };
  }, [categoryId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    category,
    loading,
    setCategory
  };
};