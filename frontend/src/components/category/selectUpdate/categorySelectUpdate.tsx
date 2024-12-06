'use client';

import { useEffect, useState } from "react";
import { CategoriaSelectPropsUpdate } from "../types";
import Cookies from "js-cookie";
import { getCategoriesFather } from "@/helpers/apis/categories/categories-api";
import { CategoriesResponseSelect } from "@/interfaces/categories/categories-response";
import { CategorySelectUIUpdate } from "../categorieSelectUIUpdate";

export default function CategorieSelectUpdate({ onSelect, value }: CategoriaSelectPropsUpdate) {
  const [categoriesFather, setCategoriesFather] = useState<CategoriesResponseSelect[]>([]);
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
        const fetchedCategories = await getCategoriesFather(token);
        console.log("Fetched father categories:", fetchedCategories); // Debug log
        setCategoriesFather(fetchedCategories);
      } catch (error) {
        console.error("Error fetching father categories:", error);
        setError("Failed to fetch father categories");
        setCategoriesFather([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  if (loading) return <div>Loading father categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CategorySelectUIUpdate
      value={value || null}
      onSelect={onSelect}
      categories={categoriesFather}
    />
  );
}