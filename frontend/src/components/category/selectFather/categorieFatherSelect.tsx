'use client';

import { useEffect, useState } from "react";
import { CategoriaSelectProps } from "../types";
import { CategorySelectUI } from "../categorieSelectUI";
import Cookies from "js-cookie";
import { getCategoriesFather } from "@/helpers/apis/categories/categories-api";
import { CategoriesResponseSelect } from "@/interfaces/categories/categories-response";

export default function CategorieFatherSelect({ onSelect, selectedId }: CategoriaSelectProps) {
  const [categoriesFather, setCategoriesFather] = useState<CategoriesResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      if (token) {
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
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (selectedId && !categoriesFather.find(cate => cate.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, categoriesFather, onSelect]);

  if (loading) return <div>Loading father categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CategorySelectUI
      onSelect={onSelect}
      selectedId={selectedId}
      categories={categoriesFather}
    />
  );
}