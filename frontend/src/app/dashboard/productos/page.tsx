import { getProducts } from "@apis/products";
import { ProductCatalog } from "@product/catalog";
import { ModalCreateProduct } from "@product/modal";
import { Title } from "@ui/Title";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function ProductsPage() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get('authToken');

  if (!myCookie?.value) {
    redirect('/auth/login');
  }

  const products = await getProducts(myCookie.value);

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 min-h-[calc(100vh-130px)]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Catalogos de productos"
            subTitle="Gestiona tus productos"
          />
        </div>
        <div>
          <ModalCreateProduct />
        </div>
      </div>
      <ProductCatalog products={products} />
    </div>
  );
}