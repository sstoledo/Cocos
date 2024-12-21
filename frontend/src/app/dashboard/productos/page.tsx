import { getProducts } from "@apis/products";
import { ProductCatalog } from "@product/catalog";
import { ModalCreateProduct } from "@product/modal";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
//importar un archivo css
import "@styles/colors.css";

export default async function ProductsPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const products = await getProducts(myCookie?.value!);

  return (
    <div className="container mx-auto bg-primary-light shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1 text-[#1e3a8a]">
          <Title
            title="Catalogos de productos"
            subTitle="Gestiona tu catalogo de productos"
          />
        </div>
        <ModalCreateProduct />
      </div>
      <ProductCatalog products={products} />
    </div>
  );
}