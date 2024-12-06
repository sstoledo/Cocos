"use client";

import React, { useEffect, useState } from "react";
import { CategorySelectUI } from '../categorieSelectUI';
import { CategoriaSelectProps } from '../types';
import { getCategories } from "@/helpers/apis/categories/categories-api";
import Cookies from "js-cookie";
import { CategoriesResponseSelect } from "@/interfaces/categories/categories-response";

function CategoriaSelect({ onSelect, selectedId }: CategoriaSelectProps) {
  const [categories, setCategories] = useState<CategoriesResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const fetchedCategories = await getCategories(token);
          console.log("Fetched categories:", fetchedCategories); // Debug log
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setError("Failed to fetch categories");
          setCategories([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (selectedId && !categories.find(cate => cate.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, categories, onSelect]);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CategorySelectUI
      onSelect={onSelect}
      selectedId={selectedId}
      categories={categories}
    />
  );
}

export default CategoriaSelect;
