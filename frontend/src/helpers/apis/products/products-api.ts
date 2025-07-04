import {
  InitialProduct,
  ProductComboResponse,
  ProductFormInputs,
  ProductsCatalogoResponse,
  UnitProduct,
} from "@interfaces/products";

export const getProducts = async (
  token: string
): Promise<ProductsCatalogoResponse[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export const getProduct = async (
  token: string,
  id: string
): Promise<UnitProduct> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export const createProduct = async (token: string, data: ProductFormInputs) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
};

export const updateProduct = async (
  token: string,
  id: string,
  data: ProductFormInputs
): Promise<InitialProduct> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
};

export const deleteProduct = async (token: string, uuid: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${uuid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export const getComboProducts = async (token: string) : Promise<ProductComboResponse[]> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/codeName`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return resp.json();
};
