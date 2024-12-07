import { DataTableCategory, Title } from "@/components";
import ModalCreateCategory from "@/components/category/modal/ModalCreateCategory";
import { columnsCategory } from "@/components/category/table/columns";
import { Label } from "@/components/ui/label";
import { getAllCategories } from "@/helpers/apis/categories/categories-api";
import { cookies } from "next/headers";


export default async function CategoriasPage() {
  const cookieStore = cookies();
  const myCookie = cookieStore.get('authToken');

  const categories = await getAllCategories(myCookie?.value!);

  const categoriesPlain = categories.map(category=>({
    id:category.id,
    name: category.name,
    level: category.level,
    fatherName: category.fatherName
  }));

  return (
    <div className="container mx-auto bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <Title
            title="Mis categorias"
          />
          <Label className="text-muted-foreground">
            Gestiona y crea nuevas categorias
          </Label>
        </div>
        <ModalCreateCategory />
      </div>

      <DataTableCategory columns={columnsCategory} data={categoriesPlain} />
    </div>
  );
}