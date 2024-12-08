import { Title } from "@/components";
import ProductCatalog from "@/components/product/catalog/product-catalog";
import { ModalCreateProduct } from "@/components/product/modal/ModalCreateProduct";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProducts } from "@/helpers/apis/products/products-api";
import { Link2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

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
        <Button
          variant="default"
        >
          <Link href="/dashboard/productos/nuevo-producto" className="flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Nuevo producto
          </Link>
        </Button>
        <ModalCreateProduct />
      </div>
      <ProductCatalog products={products} />
    </div>
  );
}