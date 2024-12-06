import { DataTableCategory, Title } from "@/components";
import { columnsCategory } from "@/components/category/table/columns";
import { getAllCategories } from "@/helpers/apis/categories/categories-api";
import { cookies } from "next/headers";


export default async function CategoriasPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const categories = await getAllCategories(myCookie?.value!);

  const categoriesPlain = categories.map(category=>({
    id:category.id,
    name: category.name,
    fatherName: category.fatherName
  }));

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <Title
        title="Mis categorias"
      />

      <DataTableCategory columns={columnsCategory} data={categoriesPlain} />
    </div>
  );
}