import { getComboProducts } from "@apis/products";
import { ProductComboResponse } from "@interfaces/products";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useProducts = () => {
  const [productos, setProductos] = useState<ProductComboResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError("No hay token");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await getComboProducts(token);
        setProductos(fetchedProducts);
      } catch (error) {
        setError("Failed to fetch products");
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  return {
    productos,
    loading,
    error,
  };
};
