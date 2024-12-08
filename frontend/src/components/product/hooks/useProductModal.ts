import { getProduct } from "@/helpers/apis/products/products-api";
import { InitialProduct, ProductsResponse } from "@/interfaces/products/products-response";
import { useEffect, useState } from "react";

export const useProductModal = (productId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<InitialProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if (!isOpen) {
      setProduct(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(()=> {
    let isMounted = true;

    const fetchProduct = async() => {
      if (!token || !productId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getProduct(token, productId);
        if (isMounted) setProduct(data);
      } catch (error) {
        console.log('Error fetching product:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProduct();

    return () => {
      isMounted = false;
    }
  }, [productId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    product,
    loading,
    setProduct
  }
}