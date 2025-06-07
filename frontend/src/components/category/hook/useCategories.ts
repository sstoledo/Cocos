import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { CategoriesResponseSelect } from '@interfaces/categories';
import { getCategoriesSelect } from '@apis/categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoriesResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedCategories = await getCategoriesSelect(token);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  return { categories, loading, error };
};