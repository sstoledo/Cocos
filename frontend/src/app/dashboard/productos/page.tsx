import { getProducts } from "@apis/products";
import { ProductCatalog } from "@product/catalog";
import { ModalCreateProduct } from "@product/modal";
import { Label } from "@ui/label";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const products = await getProducts(myCookie?.value!);

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Title
            title="Catalogos de productos"
          />
          <Label className="text-muted-foreground">
            Gestiona tu catalogo de productos
          </Label>
        </div>
        <ModalCreateProduct />
      </div>
      <ProductCatalog products={products} />
    </div>
  );
}